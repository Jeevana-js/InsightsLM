
"use client";

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { CheckCircle, Loader2, XCircle, RefreshCw, ArrowRight, ArrowLeft } from 'lucide-react';
import { subjects } from '@/lib/data';
import { generateQuiz, type GenerateQuizOutput } from '@/ai/flows/generate-quiz';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useSearchParams, notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { generateLessonId } from '@/lib/utils';

type QuizQuestion = GenerateQuizOutput['questions'][0];

export default function LessonQuizPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lessonId = searchParams.get('lessonId');
  const subjectSlug = searchParams.get('subject');

  const subject = useMemo(() => subjects.find(s => s.slug === subjectSlug), [subjectSlug]);
  
  const lesson = useMemo(() => {
    if (!subject || !lessonId) return null;
    return subject.textbookContent
      .split('\n\n')
      .map(p => {
        const lines = p.split('\n');
        const fullTitle = lines[0].trim();
        const [category, ...titleParts] = fullTitle.split(' - ');
        const cleanTitle = titleParts.join(' - ').trim();
        const id = generateLessonId(subject.slug, category, cleanTitle);
        return { id, title: cleanTitle, content: lines.slice(1).join('\n').trim() };
      })
      .find(t => t.id === lessonId);
  }, [subject, lessonId]);

  const [quizData, setQuizData] = useState<GenerateQuizOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const handleGenerateQuiz = async () => {
    if (!lesson) {
        setIsLoading(false);
        return;
    };

    setIsLoading(true);
    setQuizData(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);

    try {
      const response = await generateQuiz({ textbookContent: lesson.content, questionCount: 5 });
      if (response.questions && response.questions.length > 0) {
        setQuizData(response);
      } else {
        throw new Error("Failed to generate quiz questions.");
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate quiz. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    handleGenerateQuiz();
  }, [lessonId, subjectSlug]);


  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) {
      toast({
        variant: "destructive",
        title: "No answer selected",
        description: "Please select an answer before submitting.",
      });
      return;
    }
    const currentQuestion = quizData!.questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const restartQuiz = () => {
    handleGenerateQuiz();
  };

  if (!lesson || !subject) {
      if (!isLoading) return notFound();
      return null;
  }
  
  if (isLoading) {
    return (
       <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Generating Quiz...</CardTitle>
          </CardHeader>
          <CardContent className="text-center min-h-[400px] flex flex-col justify-center items-center">
            <div className="space-y-4 py-8 w-full max-w-md">
              <div className="flex items-center justify-center">
                  <Loader2 className="w-12 h-12 animate-spin text-primary"/>
              </div>
              <p className="text-muted-foreground">Generating your quiz for {lesson.title}, please wait...</p>
              <div className="space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-8 w-1/2 mx-auto" />
              </div>
            </div>
          </CardContent>
        </Card>
    )
  }

  if (quizData) {
    const isQuizFinished = currentQuestionIndex >= quizData.questions.length;
    
    if (isQuizFinished) {
      return (
        <Card className="max-w-2xl mx-auto text-center">
            <CardHeader>
                <CardTitle className="font-headline text-3xl">Quiz Complete!</CardTitle>
                 <p className="text-muted-foreground pt-2">You finished the quiz for "{lesson.title}"</p>
            </CardHeader>
            <CardContent>
                <p className="text-lg">Your score:</p>
                <p className="text-5xl font-bold my-4">{score} / {quizData.questions.length}</p>
                <Progress value={(score / quizData.questions.length) * 100} className="w-full" />
            </CardContent>
            <CardFooter className="flex-col sm:flex-row justify-center gap-4">
                <Button onClick={restartQuiz}>
                    <RefreshCw className="mr-2" />
                    Take Again
                </Button>
                <Button asChild variant="outline">
                    <a onClick={() => router.back()} className="cursor-pointer">
                        <ArrowLeft className="mr-2" />
                        Back to Lesson
                    </a>
                </Button>
            </CardFooter>
        </Card>
      )
    }

    const currentQuestion = quizData.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / quizData.questions.length) * 100;

    return (
       <Card className="max-w-4xl mx-auto">
         <CardHeader>
           <CardTitle className="font-headline text-xl">Quiz: {lesson.title}</CardTitle>
           <div className="flex items-center gap-4 mt-2">
                <Progress value={progress} className="w-full" />
                <span>{currentQuestionIndex + 1} / {quizData.questions.length}</span>
           </div>
         </CardHeader>
         <CardContent className="min-h-[350px]">
            <p className="text-lg font-semibold mb-4">{currentQuestion.question}</p>
            <RadioGroup 
              value={selectedAnswer !== null ? String(selectedAnswer) : undefined} 
              onValueChange={(val) => setSelectedAnswer(Number(val))}
              disabled={isAnswered}
              className="space-y-3"
            >
              {currentQuestion.options.map((option, index) => {
                const isCorrect = index === currentQuestion.correctAnswerIndex;
                const isSelected = index === selectedAnswer;
                return (
                  <Label 
                    key={index} 
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors",
                      isAnswered && isCorrect && "bg-green-500/10 border-green-500 text-green-700",
                      isAnswered && isSelected && !isCorrect && "bg-red-500/10 border-red-500 text-red-700",
                      !isAnswered && "hover:bg-secondary/50"
                    )}
                  >
                    <RadioGroupItem value={String(index)} id={`option-${index}`} />
                    <span>{option}</span>
                    {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500 ml-auto"/>}
                    {isAnswered && isCorrect && <CheckCircle className="w-5 h-5 text-green-500 ml-auto"/>}
                  </Label>
                )
              })}
            </RadioGroup>
            {isAnswered && (
                <div className="mt-4 p-4 rounded-md bg-secondary">
                    <h4 className="font-bold">Explanation:</h4>
                    <p className="text-muted-foreground">{currentQuestion.explanation}</p>
                </div>
            )}
         </CardContent>
         <CardFooter className="justify-end">
          {!isAnswered ? (
             <Button onClick={handleAnswerSubmit} disabled={selectedAnswer === null}>Submit Answer</Button>
          ) : (
            <Button onClick={handleNextQuestion}>
                Next Question <ArrowRight className="ml-2" />
            </Button>
          )}
         </CardFooter>
      </Card>
    )
  }

  return (
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Quiz not available</CardTitle>
          </CardHeader>
          <CardContent>
            <p>We couldn't generate a quiz for this lesson. Please try again later or go back to the lesson.</p>
             <div className="flex justify-center gap-4 mt-4">
                <Button onClick={handleGenerateQuiz}>
                    <RefreshCw className="mr-2" />
                    Try Again
                </Button>
                <Button asChild variant="outline">
                    <a onClick={() => router.back()} className="cursor-pointer">
                        <ArrowLeft className="mr-2" />
                        Back to Lesson
                    </a>
                </Button>
            </div>
          </CardContent>
        </Card>
  );
}
