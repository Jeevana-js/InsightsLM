
'use client';

import { subjects } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Book, Bot, FileQuestion } from 'lucide-react';
import { useProgress } from '@/hooks/use-progress';
import { useMemo } from 'react';
import { generateLessonId } from '@/lib/utils';

export default function DashboardPage() {
  const socialScience = subjects.find(s => s.slug === 'social-science');
  const { completedLessons, isLoaded } = useProgress();

  if (!socialScience) {
    return <div>Social Science subject not found.</div>;
  }

  const { totalLessons, progressPercentage, totalDuration } = useMemo(() => {
    if (!isLoaded) return { totalLessons: 0, progressPercentage: 0, totalDuration: 0 };
    
    const topics = socialScience.textbookContent
      .split('\n\n')
      .map(p => p.trim())
      .filter(p => p)
      .map(p => {
        const lines = p.split('\n');
        const fullTitle = lines[0].trim();
        const [category, ...titleParts] = fullTitle.split(' - ');
        const cleanTitle = titleParts.join(' - ');
        if (!category || !cleanTitle) return null;
        return { 
            id: generateLessonId(socialScience.slug, category, cleanTitle),
            content: lines.slice(1).join('\n').trim() 
        };
      })
      .filter((topic): topic is { id: string; content: string } => topic !== null && !!topic.content);

    const total = topics.length;
    
    const completedCount = topics.filter(topic => completedLessons[topic.id]).length;
    const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;
    
    // Assuming ~1.5 hours per lesson for duration
    const duration = Math.round(total * 1.5);

    return { totalLessons: total, progressPercentage: percentage, totalDuration: duration };

  }, [socialScience, completedLessons, isLoaded]);

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
        <div className="w-full max-w-4xl">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold font-headline">Class 10 Subjects</h1>
                <p className="text-muted-foreground mt-2">Select a subject to start your learning journey</p>
            </header>

            <Card className="bg-card-foreground/5 p-6">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-md bg-primary/10 text-primary">
                            <socialScience.icon className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold font-headline">{socialScience.name}</h2>
                            <p className="text-muted-foreground">History, Geography, Civics, and Economics</p>
                        </div>
                    </div>
                     <Button asChild variant="ghost" size="icon">
                        <Link href={`/subjects/${socialScience.slug}`}>
                            <ArrowRight />
                        </Link>
                    </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-6 my-6 text-center">
                    <div>
                        <p className="text-3xl font-bold">{totalLessons}</p>
                        <p className="text-muted-foreground">Lessons</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold">{totalDuration}h</p>
                        <p className="text-muted-foreground">Duration</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold">{progressPercentage}%</p>
                        <p className="text-muted-foreground">Progress</p>
                    </div>
                </div>

                <Progress value={progressPercentage} className="mb-6 h-2" />

                <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild className="flex-1" size="lg">
                        <Link href={`/subjects/${socialScience.slug}`}>
                            <Book className="mr-2" />
                            Start Learning
                        </Link>
                    </Button>
                    <div className="flex-1 grid grid-cols-2 gap-4">
                       <Button asChild variant="secondary" className="w-full">
                         <Link href="/dashboard/ai-tutor">
                            <Bot className="mr-2" />
                            AI Help
                         </Link>
                       </Button>
                       <Button asChild variant="secondary" className="w-full">
                          <Link href="/dashboard/quizzes">
                             <FileQuestion className="mr-2" />
                             Quiz
                          </Link>
                       </Button>
                    </div>
                </div>
            </Card>
        </div>
    </div>
  );
}
