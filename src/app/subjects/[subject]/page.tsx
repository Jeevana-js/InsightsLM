

'use client';

import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { subjects } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Book, CheckCircle, ChevronRight, Clock, FileText, Target, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProgress } from '@/hooks/use-progress';
import { useMemo } from 'react';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { generateLessonId } from '@/lib/utils';

type Topic = {
  id: string;
  title: string;
  content: string;
};

type CategorizedTopics = {
  [key: string]: Topic[];
};

const CategoryCard = ({ category, topics, subjectSlug }: { category: string, topics: Topic[], subjectSlug: string }) => {
    const { completedLessons, isLoaded } = useProgress();

    const { progressPercentage, completedCount } = useMemo(() => {
        if (!isLoaded) return { progressPercentage: 0, completedCount: 0 };

        const total = topics.length;
        const completed = topics.filter(topic => completedLessons[topic.id]).length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        return { progressPercentage: percentage, completedCount: completed };

    }, [topics, completedLessons, isLoaded]);

    const categoryDescriptions: { [key: string]: string } = {
        'History': 'World Wars, Indian Independence, and Social Transformation',
        'Geography': "India's Physical Features, Climate, and Resources",
        'Civics': 'Indian Constitution, Government, and Democracy',
        'Economics': 'Development, Trade, Employment, and Planning',
    };

    return (
        <Card className="flex flex-col">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="font-headline text-2xl">{category}</CardTitle>
                    <Badge variant="secondary">{topics.length} lessons</Badge>
                </div>
                <p className="text-muted-foreground text-sm">{categoryDescriptions[category]}</p>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-sm text-muted-foreground">Progress</p>
                        <p className="text-sm font-bold">{progressPercentage}%</p>
                    </div>
                    <Progress value={progressPercentage} />
                </div>
                <ScrollArea className="flex-grow h-64 pr-4">
                    <div className="space-y-2">
                        {topics.map((topic, index) => (
                            <Link href={`/subjects/${subjectSlug}/lesson/${topic.id}`} key={topic.id} passHref>
                               <div className="flex items-center justify-between p-3 rounded-md bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-secondary-foreground ${completedLessons[topic.id] ? 'bg-primary' : 'bg-muted'}`}>
                                            {index + 1}
                                        </div>
                                        <span className="font-medium text-sm">{topic.title}</span>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                               </div>
                            </Link>
                        ))}
                    </div>
                </ScrollArea>
                <div className="mt-6 flex gap-2">
                    <Button asChild className="w-full">
                        <Link href={`/subjects/${subjectSlug}/lesson/${topics[0].id}`}>
                            <Book className="mr-2" /> Start Learning
                        </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/dashboard/textbooks">
                          <FileText />
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default function SubjectPage() {
  const params = useParams();
  const subject = subjects.find((s) => s.slug === params.subject);
  const { completedLessons, isLoaded } = useProgress();

  if (!subject) {
    notFound();
  }

  const topics = useMemo(() => {
    if (!subject) return [];
    return subject.textbookContent
      .split('\n\n')
      .map(p => p.trim())
      .filter(p => p)
      .map(p => {
        const lines = p.split('\n');
        const fullTitle = lines[0].trim();
        const [category, ...titleParts] = fullTitle.split(' - ');
        const cleanTitle = titleParts.join(' - ').trim();
        if (!category || !cleanTitle) return null;
        
        return {
          id: generateLessonId(subject.slug, category, cleanTitle),
          category: category.trim(),
          title: cleanTitle,
          content: lines.slice(1).join('\n').trim(),
        };
      })
      .filter((topic): topic is { id: string; category: string; title: string; content: string } => topic !== null && !!topic.content);
  }, [subject]);

  const categorizedTopics = useMemo(() => 
    topics.reduce((acc: CategorizedTopics, topic) => {
      if (!acc[topic.category]) {
        acc[topic.category] = [];
      }
      acc[topic.category].push(topic);
      return acc;
    }, {} as CategorizedTopics), [topics]);

    const { totalLessons, progressPercentage, totalDuration } = useMemo(() => {
        if (!isLoaded) return { totalLessons: 0, progressPercentage: 0, totalDuration: 0 };
        const total = topics.length;
        const completedCount = Object.keys(completedLessons).filter(id => completedLessons[id]).length;
        const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;
        const duration = Math.round(total * 1.5);
        return { totalLessons: total, progressPercentage: percentage, totalDuration: duration };
    }, [topics, completedLessons, isLoaded]);

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <header className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-primary/20 text-primary">
                <subject.icon className="w-7 h-7" />
            </div>
            <h1 className="font-headline text-3xl sm:text-4xl font-bold">
                {subject.name}
            </h1>
        </div>
        <Button asChild variant="outline">
            <Link href="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
        </Button>
      </header>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
            <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-md">
                    <Book className="w-6 h-6 text-primary"/>
                </div>
                <div>
                    <p className="text-muted-foreground">Total Lessons</p>
                    <p className="text-2xl font-bold">{totalLessons}</p>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardContent className="p-6 flex items-center gap-4">
                 <div className="p-3 bg-primary/10 rounded-md">
                    <Clock className="w-6 h-6 text-primary"/>
                </div>
                <div>
                    <p className="text-muted-foreground">Est. Hours</p>
                    <p className="text-2xl font-bold">{totalDuration}h</p>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardContent className="p-6 flex items-center gap-4">
                 <div className="p-3 bg-primary/10 rounded-md">
                    <Target className="w-6 h-6 text-primary"/>
                </div>
                <div>
                    <p className="text-muted-foreground">Difficulty</p>
                    <p className="text-2xl font-bold">Intermediate</p>
                </div>
            </CardContent>
        </Card>
         <Card>
            <CardContent className="p-6 flex items-center gap-4">
                 <div className="p-3 bg-primary/10 rounded-md">
                    <UserCheck className="w-6 h-6 text-primary"/>
                </div>
                <div>
                    <p className="text-muted-foreground">Progress</p>
                    <p className="text-2xl font-bold">{progressPercentage}%</p>
                </div>
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {Object.entries(categorizedTopics).map(([category, categoryTopics]) => (
          <CategoryCard key={category} category={category} topics={categoryTopics} subjectSlug={subject.slug} />
        ))}
      </div>
    </div>
  );
}
