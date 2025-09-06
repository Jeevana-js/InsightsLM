"use client";

import { useState } from 'react';
import { generateQuiz } from '@/ai/flows/generate-quiz';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { FileQuestion, Lightbulb, Loader2, RefreshCw, ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Flashcard = {
  front: string;
  back: string;
};

export default function QuizGeneratorClient({ textbookContent }: { textbookContent: string }) {
  const [flashcards, setFlashcards] = useState<Flashcard[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const { toast } = useToast();

  const handleGenerateQuiz = async () => {
    setIsLoading(true);
    setFlashcards(null);
    setCurrentCardIndex(0);
    setIsFlipped(false);

    try {
      const response = await generateQuiz({ textbookContent });
      if (response.flashcards && response.flashcards.length > 0) {
        setFlashcards(response.flashcards);
      } else {
        throw new Error("Failed to generate flashcards.");
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate flashcards. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextCard = () => {
    if (flashcards && currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Flashcard Generator</CardTitle>
      </CardHeader>
      <CardContent className="text-center min-h-[350px] flex flex-col justify-center items-center">
        {!flashcards && !isLoading && (
          <div className="flex flex-col items-center gap-4 py-8">
             <div className="p-4 rounded-full bg-primary/20 text-primary">
                <FileQuestion className="w-12 h-12" />
             </div>
            <p className="text-muted-foreground">Click the button to generate flashcards from the textbook.</p>
            <Button onClick={handleGenerateQuiz} disabled={isLoading} size="lg">
              <Lightbulb className="mr-2 h-5 w-5" />
              Generate Flashcards
            </Button>
          </div>
        )}

        {isLoading && (
          <div className="space-y-4 py-8 w-full">
             <div className="flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-primary"/>
             </div>
            <p className="text-muted-foreground">Generating your flashcards, please wait...</p>
            <Skeleton className="h-48 w-full" />
          </div>
        )}

        {flashcards && flashcards.length > 0 && (
          <div className="w-full">
            <div 
              className="relative w-full h-64 perspective-1000"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div 
                className={cn(
                  "absolute w-full h-full transition-transform duration-700 transform-style-3d cursor-pointer",
                  isFlipped ? "rotate-y-180" : ""
                )}
              >
                {/* Front of the card */}
                <div className="absolute w-full h-full backface-hidden flex items-center justify-center p-6 rounded-lg border bg-card shadow-lg">
                  <p className="text-xl font-semibold">{flashcards[currentCardIndex].front}</p>
                </div>
                {/* Back of the card */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center p-6 rounded-lg border bg-secondary shadow-lg">
                  <p className="text-lg text-secondary-foreground">{flashcards[currentCardIndex].back}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-6">
                <span className="text-sm font-medium text-muted-foreground">
                    Card {currentCardIndex + 1} of {flashcards.length}
                </span>
            </div>
             <div className="flex items-center justify-center gap-4 mt-2">
                <Button onClick={handlePrevCard} disabled={currentCardIndex === 0} size="icon" variant="outline">
                    <ArrowLeft />
                </Button>
                 <Button onClick={() => setIsFlipped(!isFlipped)} size="icon">
                    <RefreshCw />
                </Button>
                <Button onClick={handleNextCard} disabled={currentCardIndex === flashcards.length - 1} size="icon" variant="outline">
                    <ArrowRight />
                </Button>
            </div>
          </div>
        )}
      </CardContent>
      {flashcards && (
        <CardFooter className="justify-center">
           <Button onClick={handleGenerateQuiz} disabled={isLoading} className="mt-4">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
              Generate New Set
            </Button>
        </CardFooter>
      )}
    </Card>
  );
}

// Add these styles to globals.css or a suitable style file
/*
.perspective-1000 { perspective: 1000px; }
.transform-style-3d { transform-style: preserve-3d; }
.rotate-y-180 { transform: rotateY(180deg); }
.backface-hidden { backface-visibility: hidden; }
*/
