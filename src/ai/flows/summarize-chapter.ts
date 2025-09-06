
'use server';
/**
 * @fileOverview Summarizes a chapter's content into key points.
 *
 * - summarizeChapter - A function that handles the chapter summarization process.
 * - SummarizeChapterInput - The input type for the summarizeChapter function.
 * - SummarizeChapterOutput - The return type for the summarizeChapter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeChapterInputSchema = z.object({
  chapterContent: z.string().describe('The full content of the textbook chapter.'),
});
export type SummarizeChapterInput = z.infer<typeof SummarizeChapterInputSchema>;

const SummarizeChapterOutputSchema = z.object({
  summary: z.array(z.string()).describe('A concise summary of the chapter as a list of bullet points.'),
  highlights: z.array(z.string()).describe('A list of key highlights from the chapter.'),
  importantPoints: z.array(z.string()).describe('A list of important points or facts from the chapter.'),
});
export type SummarizeChapterOutput = z.infer<typeof SummarizeChapterOutputSchema>;

export async function summarizeChapter(input: SummarizeChapterInput): Promise<SummarizeChapterOutput> {
  return summarizeChapterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeChapterPrompt',
  input: {schema: SummarizeChapterInputSchema},
  output: {schema: SummarizeChapterOutputSchema},
  prompt: `You are an expert in creating educational content. From the following textbook chapter, please generate:
1.  A concise summary of the main topics, presented as a list of bullet points.
2.  A list of 3-5 key highlights.
3.  A list of important points, facts, or definitions.

Chapter Content:
{{chapterContent}}
`,
});

const summarizeChapterFlow = ai.defineFlow(
  {
    name: 'summarizeChapterFlow',
    inputSchema: SummarizeChapterInputSchema,
    outputSchema: SummarizeChapterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("Failed to generate summary from AI.");
    }
    return output;
  }
);
