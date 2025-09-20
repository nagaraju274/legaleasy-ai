'use server';

/**
 * @fileOverview A question answering AI agent for legal documents.
 *
 * - askQuestion - A function that handles the question answering process.
 * - QAInput - The input type for the askQuestion function.
 * - QAOutput - The return type for the askQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QAInputSchema = z.object({
  documentText: z.string().describe('The text content of the legal document.'),
  question: z.string().describe('The natural language question about the document.'),
});
export type QAInput = z.infer<typeof QAInputSchema>;

const QAOutputSchema = z.object({
  answer: z.string().describe('The answer to the question based on the document.'),
});
export type QAOutput = z.infer<typeof QAOutputSchema>;

export async function askQuestion(input: QAInput): Promise<QAOutput> {
  return qaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'qaPrompt',
  input: {schema: QAInputSchema},
  output: {schema: QAOutputSchema},
  prompt: `You are an expert legal assistant. Answer the following question based on the provided legal document. If the answer is not in the document, respond that you cannot answer the question.

Document:
{{documentText}}

Question:
{{question}}`,
});

const qaFlow = ai.defineFlow(
  {
    name: 'qaFlow',
    inputSchema: QAInputSchema,
    outputSchema: QAOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
