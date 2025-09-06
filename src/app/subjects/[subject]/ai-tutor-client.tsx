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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot, Loader2, Send, User, MessageSquareQuote, Bookmark } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { Subject } from '@/lib/data';

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

export default function AITutorClient({ subject }: { subject: Subject }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    const userMessage: Message = { role: 'user', content: data.question };
    setMessages((prev) => [...prev, userMessage]);
    reset();

    try {
      const response = await aiTutor({
        textbookContent: subject.textbookContent,
        question: data.question,
        subjectName: subject.name,
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
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">AI Tutor for {subject.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[50vh] w-full rounded-md border p-4 pr-6">
          <div className="space-y-6">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <Bot className="w-12 h-12 mb-4" />
                <p>Ask a question about the textbook content to get started.</p>
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
              placeholder={`Ask anything from ${subject.name}...`}
              disabled={isLoading}
              className="bg-card"
            />
            {errors.question && <p className="text-sm text-destructive mt-1">{errors.question.message}</p>}
          </div>
          <Button type="submit" disabled={isLoading} size="icon" aria-label="Send message">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
