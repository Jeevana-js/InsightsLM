
"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { aiTutor, type AiTutorOutput } from '@/ai/flows/ai-tutor';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, Loader2, Send, User, BookOpen, MessageSquareQuote, Bookmark } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { subjects, Subject } from '@/lib/data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  citations?: string[];
  chapter?: string;
};

const formSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters."),
});
type FormValues = z.infer<typeof formSchema>;

export default function AITutorPage() {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const handleSubjectChange = (slug: string) => {
    const subject = subjects.find(s => s.slug === slug);
    setSelectedSubject(subject || null);
    setMessages([]);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!selectedSubject) return;

    setIsLoading(true);
    const userMessage: Message = { role: 'user', content: data.question };
    setMessages((prev) => [...prev, userMessage]);
    reset();

    try {
      const response = await aiTutor({
        textbookContent: selectedSubject.textbookContent,
        question: data.question,
        subjectName: selectedSubject.name,
      });

      if (response.answer) {
        const assistantMessage: Message = { role: 'assistant', content: response.answer, citations: response.citations, chapter: response.chapter };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error("Failed to get a response from the AI tutor.");
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not get an answer. Please try again.",
      });
      setMessages((prev) => prev.slice(0, -1)); // Remove user message on error
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
            <CardTitle className="font-headline text-2xl">AI Tutor</CardTitle>
            <p className="text-muted-foreground">Powered by InsightsLM</p>
        </div>
         <Badge variant={selectedSubject ? 'default' : 'secondary'}>
            {selectedSubject ? 'Online' : 'Offline'}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Subject</label>
            <Select onValueChange={handleSubjectChange} defaultValue={selectedSubject?.slug}>
                <SelectTrigger className="w-full md:w-1/3">
                    <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                    {subjects.map(subject => (
                        <SelectItem key={subject.slug} value={subject.slug}>
                            <div className="flex items-center gap-2">
                                <subject.icon className="w-4 h-4" />
                                {subject.name}
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
        <ScrollArea className="h-[50vh] w-full rounded-md border p-4 pr-6">
          <div className="space-y-6">
            {messages.length === 0 && (
              <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarFallback><Bot /></AvatarFallback>
                  </Avatar>
                  <div className="max-w-md rounded-lg p-3 bg-secondary text-secondary-foreground">
                    <p className="whitespace-pre-wrap">Hello! I'm your AI tutor from InsightsLM. Please select a subject first to get personalized help with your Samacheer Kalvi curriculum.</p>
                </div>
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-4",
                  message.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                {message.role === 'assistant' && (
                  <Avatar>
                    <AvatarFallback><Bot /></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-xl rounded-lg p-3",
                    message.role === 'user'
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                   {message.chapter && (
                     <div className="mt-4 p-3 rounded-md bg-background/50">
                        <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                            <Bookmark className="w-4 h-4" />
                            Source Chapter
                        </h4>
                        <p className="text-sm text-muted-foreground">{message.chapter}</p>
                     </div>
                   )}
                   {message.citations && message.citations.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <MessageSquareQuote className="w-4 h-4" />
                        Source Citations
                      </h4>
                      <div className="space-y-2">
                        {message.citations.map((citation, i) => (
                           <blockquote key={i} className="border-l-4 border-muted-foreground/50 pl-4 text-sm text-muted-foreground italic">
                            {citation}
                          </blockquote>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {message.role === 'user' && (
                  <Avatar>
                    <AvatarFallback><User /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-4 justify-start">
                <Avatar>
                  <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
                <div className="max-w-md rounded-lg p-3 bg-secondary text-secondary-foreground">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full items-start gap-2">
          <div className="flex-1">
            <Input
              {...register('question')}
              onKeyDown={handleKeyDown}
              placeholder={selectedSubject ? `Ask anything from ${selectedSubject.name}...` : 'Please select a subject first'}
              disabled={isLoading || !selectedSubject}
              className="bg-card"
            />
            {errors.question && <p className="text-sm text-destructive mt-1">{errors.question.message}</p>}
          </div>
          <Button type="submit" disabled={isLoading || !selectedSubject} size="icon" aria-label="Send message">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
