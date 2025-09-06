
"use client";

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Loader2, XCircle, RefreshCw, ArrowRight, BookOpen, FileQuestion, AlertCircle } from 'lucide-react';
import { subjects, type Subject } from '@/lib/data';
import { generateQuiz, type GenerateQuizOutput } from '@/ai/flows/generate-quiz';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type Topic = {
  id: string;
  title: string;
  content: string;
  category: string;
};

type CategorizedTopics = {
  [key: string]: Topic[];
};

export default function QuizzesPage() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [quizData, setQuizData] = useState<GenerateQuizOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  const socialScience = subjects.find(s => s.slug === 'social-science');

  const categorizedTopics: CategorizedTopics = useMemo(() => {
    if (!socialScience) return {};
    const topics: Topic[] = socialScience.textbookContent
      .split('\n\n')
      .map(p => {
        const lines = p.split('\n');
        const title = lines[0].trim();
        const [category, ...titleParts] = title.split(' - ');
        const cleanTitle = titleParts.join(' - ');
        const id = `${socialScience.slug}-${category.toLowerCase().replace(/\s+/g, '-')}-${cleanTitle.toLowerCase().replace(/\s+/g, '-')}`;
        return { id, title: cleanTitle, content: lines.slice(1).join('\n').trim(), category };
      })
      .filter((t): t is Topic => !!t.category && !!t.title && !!t.content);

    return topics.reduce((acc: CategorizedTopics, topic) => {
      if (!acc[topic.category]) {
        acc[topic.category] = [];
      }
      acc[topic.category].push(topic);
      return acc;
    }, {});
  }, [socialScience]);

  const handleGenerateQuiz = async (topic: Topic) => {
    setSelectedTopic(topic);
    setIsLoading(true);
    setQuizData(null);
    setError(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);

    try {
      const response = await generateQuiz({ textbookContent: topic.content, questionCount: 10 });
      if (response.questions && response.questions.length > 0) {
        setQuizData(response);
      } else {
        throw new Error("Failed to generate quiz questions.");
      }
    } catch (error) {
      console.error(error);
      setError("Could not generate quiz. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) return;
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
    if(selectedTopic) {
        handleGenerateQuiz(selectedTopic);
    }
  };
  
  const clearQuiz = () => {
    setSelectedTopic(null);
    setQuizData(null);
    setError(null);
  }

  if (isLoading) {
    return (
       <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Generating Quiz...</CardTitle>
          </CardHeader>
          <CardContent className="text-center min-h-[400px] flex flex-col justify-center items-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mb-4"/>
            <p className="text-muted-foreground">Generating your quiz for {selectedTopic?.title}, please wait...</p>
          </CardContent>
        </Card>
    )
  }

  if (quizData && selectedTopic) {
    const isQuizFinished = currentQuestionIndex >= quizData.questions.length;
    
    if (isQuizFinished) {
      return (
        <Card className="max-w-2xl mx-auto text-center">
            <CardHeader>
                <CardTitle className="font-headline text-3xl">Quiz Complete!</CardTitle>
                <p className="text-muted-foreground pt-2">You finished the quiz for "{selectedTopic.title}"</p>
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
                <Button onClick={clearQuiz} variant="outline">
                    Choose Another Lesson
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
           <CardTitle className="font-headline text-2xl">Quiz: {selectedTopic.title}</CardTitle>
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
         <CardFooter className="justify-between">
          <Button onClick={clearQuiz} variant="outline">Back to Lessons</Button>
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
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold font-headline">Chapter Quizzes</h1>
        <p className="text-muted-foreground mt-2">
          Select a lesson to generate a quiz from the {socialScience?.name} textbook.
        </p>
      </header>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-primary"/>
                    <span>Select a Lesson</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                 {error && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                <Accordion type="single" collapsible className="w-full">
                    {Object.entries(categorizedTopics).map(([category, topics]) => (
                        <AccordionItem value={category} key={category}>
                            <AccordionTrigger className="text-lg font-semibold">{category}</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-2 pl-4">
                                    {topics.map((topic) => (
                                        <Button 
                                            key={topic.id} 
                                            variant="ghost" 
                                            className="w-full justify-start text-left h-auto py-2"
                                            onClick={() => handleGenerateQuiz(topic)}
                                        >
                                          <FileQuestion className="mr-2 h-4 w-4" />
                                          {topic.title}
                                        </Button>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    </div>
  );
}
