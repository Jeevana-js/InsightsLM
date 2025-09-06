
'use client';

import { useParams, notFound, useRouter } from 'next/navigation';
import { subjects } from '@/lib/data';
import { useMemo, useState, useEffect } from 'react';
import { summarizeChapter, type SummarizeChapterOutput } from '@/ai/flows/summarize-chapter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Lightbulb, ListChecks, Star, Loader2, CheckCircle, FileQuestion } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useProgress } from '@/hooks/use-progress';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { generateLessonId } from '@/lib/utils';

type Topic = {
  id: string;
  title: string;
  content: string;
};

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { subject: subjectSlug, lessonId } = params;

  const subject = useMemo(() => subjects.find(s => s.slug === subjectSlug), [subjectSlug]);

  const topics: Topic[] = useMemo(() => {
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
        
        return { 
          id: generateLessonId(subject.slug, category, cleanTitle), 
          title: cleanTitle, 
          content: lines.slice(1).join('\n').trim() 
        };
      }).filter((topic): topic is Topic => !!topic.title && !!topic.content);
  }, [subject]);

  const currentTopic = useMemo(() => topics.find(t => t.id === lessonId), [topics, lessonId]);
  const currentIndex = useMemo(() => topics.findIndex(t => t.id === lessonId), [topics, lessonId]);

  const [summary, setSummary] = useState<SummarizeChapterOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { completedLessons, toggleLesson, isLoaded } = useProgress();

  useEffect(() => {
    if (currentTopic) {
      setIsLoading(true);
      summarizeChapter({ chapterContent: currentTopic.content })
        .then(res => {
          setSummary(res);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [currentTopic]);

  if (!isLoaded && !currentTopic) {
    return (
       <div className="p-4 sm:p-6 md:p-8">
        <header className="mb-8 flex items-center justify-between">
          <Skeleton className="h-10 w-40" />
          <div className="text-right">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-8 w-64" />
          </div>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-[70vh] w-full" />
            </div>
            <div className="space-y-4">
               <Skeleton className="h-[70vh] w-full" />
            </div>
        </div>
      </div>
    );
  }
  
  if (!subject || !currentTopic) {
    return notFound();
  }

  const isCompleted = completedLessons[currentTopic.id];


  const handleNextLesson = () => {
    if (currentIndex < topics.length - 1) {
      const nextTopic = topics[currentIndex + 1];
      router.push(`/subjects/${subjectSlug}/lesson/${nextTopic.id}`);
    }
  };

  const handlePrevLesson = () => {
    if (currentIndex > 0) {
      const prevTopic = topics[currentIndex - 1];
      router.push(`/subjects/${subjectSlug}/lesson/${prevTopic.id}`);
    }
  };

  const SummarySkeleton = () => (
    <div className="space-y-6">
        <div className="space-y-2">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
             <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="space-y-2">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
        </div>
         <div className="space-y-2">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
             <Skeleton className="h-4 w-5/6" />
        </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <header className="mb-8 flex items-center justify-between">
         <Button asChild variant="outline">
            <Link href={`/subjects/${subjectSlug}`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Lessons
            </Link>
        </Button>
        <div className="text-right">
            <p className="text-sm text-muted-foreground">{subject.name}</p>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold">
              {currentTopic.title}
            </h1>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card className="h-[70vh]">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="w-6 h-6"/>
                        <span>Textbook Content</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[60vh] pr-6">
                        <div className="whitespace-pre-wrap font-body text-base leading-relaxed text-muted-foreground">
                            {currentTopic.content}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
        <div>
           <Card className="h-[70vh]">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="w-6 h-6"/>
                        <span>AI Summary & Highlights</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                     <ScrollArea className="h-[60vh] pr-6">
                        {isLoading ? (
                            <SummarySkeleton />
                        ) : (
                            summary && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                                            <ListChecks />
                                            Summary
                                        </h3>
                                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                                            {summary.summary.map((point, i) => <li key={i}>{point}</li>)}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                                            <Star />
                                            Key Highlights
                                        </h3>
                                         <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                                            {summary.highlights.map((point, i) => <li key={i}>{point}</li>)}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                                            <Star />
                                            Important Points
                                        </h3>
                                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                                            {summary.importantPoints.map((point, i) => <li key={i}>{point}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            )
                        )}
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
      </div>
      
       <div className="mt-8 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
            <div className="flex justify-start">
                <Button onClick={handlePrevLesson} disabled={currentIndex === 0}>
                    <ArrowLeft className="mr-2" />
                    Previous Lesson
                </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
                 <Button onClick={() => toggleLesson(currentTopic.id)} variant={isCompleted ? 'secondary' : 'default'} className="w-full">
                    <CheckCircle className="mr-2" />
                    {isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
                </Button>
            </div>
            <div className="flex justify-end">
                <Button onClick={handleNextLesson} disabled={currentIndex === topics.length - 1}>
                    Next Lesson
                    <ArrowLeft className="ml-2 transform rotate-180" />
                </Button>
            </div>
        </div>
    </div>
  );
}
