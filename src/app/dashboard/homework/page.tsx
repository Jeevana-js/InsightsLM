
"use client";

import { useState, useRef, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { aiTutor, type AiTutorOutput } from '@/ai/flows/ai-tutor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Pencil, Bot, User, Loader2, Sparkles, MessageSquareQuote, Bookmark, History, Trash2 } from 'lucide-react';
import { subjects } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const formSchema = z.object({
  question: z.string().min(10, 'Please enter a question with at least 10 characters.'),
});
type FormValues = z.infer<typeof formSchema>;

type Homework = {
  id: string;
  question: string;
  answer: AiTutorOutput;
  timestamp: string;
};

const HOMEWORK_STORAGE_KEY = 'homework-history';

export default function HomeworkPage() {
  const [homeworkHistory, setHomeworkHistory] = useState<Homework[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(HOMEWORK_STORAGE_KEY);
      if (savedHistory) {
        setHomeworkHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error("Failed to load homework history from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(HOMEWORK_STORAGE_KEY, JSON.stringify(homeworkHistory));
    } catch (error) {
      console.error("Failed to save homework history to localStorage", error);
    }
  }, [homeworkHistory]);


  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const socialScienceSubject = subjects.find(s => s.slug === 'social-science');

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!socialScienceSubject) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Social Science textbook content not found.',
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await aiTutor({
        textbookContent: socialScienceSubject.textbookContent,
        question: data.question,
        subjectName: 'Social Science',
      });
      
      const newHomework: Homework = {
        id: new Date().toISOString(),
        question: data.question,
        answer: response,
        timestamp: new Date().toLocaleString(),
      };

      setHomeworkHistory(prev => [newHomework, ...prev]);

    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not get an answer. Please try again later.',
      });
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  const handleClearHistory = () => {
    setHomeworkHistory([]);
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Homework Helper</h1>
        <p className="text-muted-foreground">Get AI assistance for Class 10 Social Science homework</p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pencil className="w-6 h-6" />
              <span>Ask Your Question</span>
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <Textarea
                {...register('question')}
                onKeyDown={handleKeyDown}
                placeholder="Type your homework question here... (e.g., 'Explain the causes of World War I', 'What are the functions of the Prime Minister?')"
                className="min-h-[150px] text-lg"
                disabled={isLoading}
              />
              {errors.question && <p className="text-sm text-destructive mt-2">{errors.question.message}</p>}
              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 animate-spin" /> : <Sparkles className="mr-2" />}
                  Get AI Help
                </Button>
              </div>
            </CardContent>
          </form>
        </Card>

        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                        <History className="w-6 h-6" />
                        <span>Recent Homework</span>
                    </CardTitle>
                    {homeworkHistory.length > 0 && (
                        <Button variant="destructive" size="sm" onClick={handleClearHistory}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Clear History
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[45vh] w-full pr-4">
                     {isLoading && homeworkHistory.length === 0 && (
                        <div className="flex items-center gap-4">
                            <Avatar>
                                <AvatarFallback><Bot /></AvatarFallback>
                            </Avatar>
                            <div className="rounded-lg p-3 bg-secondary text-secondary-foreground">
                                <Loader2 className="w-5 h-5 animate-spin" />
                            </div>
                        </div>
                    )}
                    
                    {homeworkHistory.length > 0 ? (
                        <Accordion type="single" collapsible className="w-full">
                            {homeworkHistory.map((item) => (
                                <AccordionItem value={item.id} key={item.id}>
                                    <AccordionTrigger>
                                        <div className="text-left">
                                            <p className="font-semibold truncate max-w-md">{item.question}</p>
                                            <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                       <div className="space-y-4">
                                            <div className="flex justify-end items-start gap-4 mb-4">
                                                <div className="max-w-xl rounded-lg p-3 bg-primary text-primary-foreground">
                                                    <p className="whitespace-pre-wrap">{item.question}</p>
                                                </div>
                                                <Avatar>
                                                    <AvatarFallback><User /></AvatarFallback>
                                                </Avatar>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <Avatar>
                                                    <AvatarFallback><Bot /></AvatarFallback>
                                                </Avatar>
                                                <div className="max-w-xl rounded-lg p-3 bg-secondary text-secondary-foreground">
                                                    <p className="whitespace-pre-wrap">{item.answer.answer}</p>
                                                    {item.answer.chapter && (
                                                     <div className="mt-4 p-3 rounded-md bg-background/50">
                                                        <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                                                            <Bookmark className="w-4 h-4" />
                                                            Source Chapter
                                                        </h4>
                                                        <p className="text-sm text-muted-foreground">{item.answer.chapter}</p>
                                                     </div>
                                                   )}
                                                    {item.answer.citations && item.answer.citations.length > 0 && (
                                                      <div className="mt-4">
                                                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                          <MessageSquareQuote className="w-4 h-4" />
                                                          Source Citations
                                                        </h4>
                                                        <div className="space-y-2">
                                                          {item.answer.citations.map((citation, i) => (
                                                            <blockquote key={i} className="border-l-4 border-muted-foreground/50 pl-4 text-sm text-muted-foreground italic">
                                                              {citation}
                                                            </blockquote>
                                                          ))}
                                                        </div>
                                                      </div>
                                                    )}
                                                </div>
                                            </div>
                                       </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    ) : (
                         <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground py-10">
                            <Bot className="w-12 h-12 mb-4" />
                            <p>Your recent AI-assisted homework will appear here.</p>
                        </div>
                    )}
                </ScrollArea>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

    