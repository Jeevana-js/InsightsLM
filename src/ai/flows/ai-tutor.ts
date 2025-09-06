
'use server';

/**
 * @fileOverview Provides an AI tutor that answers questions based on the content of a given textbook.
 *
 * - aiTutor - A function that handles the AI tutoring process.
 * - AiTutorInput - The input type for the aiTutor function.
 * - AiTutorOutput - The return type for the aiTutor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiTutorInputSchema = z.object({
  textbookContent: z
    .string()
    .describe('The content of the official textbook.'),
  question: z.string().describe('The question from the student.'),
  subjectName: z.string().describe('The name of the subject.'),
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "An optional photo related to the question, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AiTutorInput = z.infer<typeof AiTutorInputSchema>;

const AiTutorOutputSchema = z.object({
  answer: z.string().describe('The synthesized answer to the question, based on the provided citations.'),
  citations: z.array(z.string()).optional().default([]).describe('Direct quotes from the textbook content that support the answer.'),
  chapter: z.string().optional().describe('The chapter title from the textbook where the information was found.'),
});

export type AiTutorOutput = z.infer<typeof AiTutorOutputSchema>;

export async function aiTutor(input: AiTutorInput): Promise<AiTutorOutput> {
  return aiTutorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiTutorPrompt',
  input: {schema: AiTutorInputSchema},
  output: {schema: AiTutorOutputSchema},
  prompt: `You are an AI tutor, designed to function like NotebookLM. Your task is to answer a student's question for the subject {{subjectName}} based **only** on the provided textbook content.

Your process must be as follows:
1.  Carefully analyze the student's question and any provided image.
2.  Search the provided "Textbook Content" to find passages that are directly relevant to anwering the question.
3.  From these relevant passages, select a few direct quotes that will serve as citations.
4.  Identify the full chapter title (e.g., "History - Chapter 1: Outbreak of World War I and Its Aftermath") where the answer was found and set it in the 'chapter' output field.
5.  Synthesize a detailed and comprehensive answer to the question, integrating information **only** from the quotes you selected. The answer should be elaborate and cover the topic in depth.
6.  If the textbook content does not contain an answer, you must state that the information is not available and provide no citations or chapter.

Textbook Content:
{{{textbookContent}}}

{{#if photoDataUri}}
Image context:
{{media url=photoDataUri}}
{{/if}}

Question: {{question}}`,
});

const aiTutorFlow = ai.defineFlow(
  {
    name: 'aiTutorFlow',
    inputSchema: AiTutorInputSchema,
    outputSchema: AiTutorOutputSchema,
    cache: {
      ttl: 60 * 60 * 24, // Cache for 24 hours
      key: (input) => JSON.stringify(input),
    },
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) throw new Error("No output from AI Tutor");
    return output;
  }
);
