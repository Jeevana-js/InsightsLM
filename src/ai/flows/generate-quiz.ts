
'use server';
/**
 * @fileOverview Generates a quiz from the official textbook.
 *
 * - generateQuiz - A function that handles the quiz generation process.
 * - GenerateQuizInput - The input type for the generateQuiz function.
 * - GenerateQuizOutput - The return type for the generateQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuizInputSchema = z.object({
  textbookContent: z.string().describe('The content of the official textbook.'),
  questionCount: z.number().describe('The number of questions to generate.').min(1).max(20),
});
export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

const GenerateQuizOutputSchema = z.object({
  questions: z.array(z.object({
    question: z.string().describe('The multiple-choice question.'),
    options: z.array(z.string()).length(4).describe('An array of 4 possible answers.'),
    correctAnswerIndex: z.number().min(0).max(3).describe('The index (0-3) of the correct answer in the options array.'),
    explanation: z.string().describe('A brief explanation for the correct answer, based on the textbook.'),
  })).describe('An array of multiple-choice questions generated from the textbook content.'),
});
export type GenerateQuizOutput = z.infer<typeof GenerateQuizOutputSchema>;

export async function generateQuiz(input: GenerateQuizInput): Promise<GenerateQuizOutput> {
  return generateQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: {schema: GenerateQuizInputSchema},
  output: {schema: GenerateQuizOutputSchema},
  prompt: `You are a quiz generator. Your task is to create a set of multiple-choice questions based **only** on the provided official textbook content. You must not use any external knowledge.

Create {{questionCount}} questions. For each question:
1.  Write a clear question.
2.  Provide 4 distinct options. One option must be correct, and the other three must be plausible but incorrect distractors.
3.  Identify the index of the correct answer (from 0 to 3).
4.  Provide a brief explanation for why the answer is correct, quoting or referencing the textbook content.

Textbook Content:
{{{textbookContent}}}
`,
});

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: GenerateQuizOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
