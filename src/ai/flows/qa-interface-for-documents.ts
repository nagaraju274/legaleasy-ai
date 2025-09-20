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
  prompt: `You are an expert legal assistant AI. Your role is to answer questions about the provided legal document accurately and thoroughly.

When answering, follow these instructions:
1.  **Analyze the entire document** to find the most relevant information to answer the user's question.
2.  **Cite specific clauses or sections** from the document in your answer. For example, "According to Section 4 (Confidentiality)..."
3.  **Provide a clear, direct answer** to the user's question based on the information in the document.
4.  If the document does not contain the information needed to answer the question, **explicitly state that the answer cannot be found** in the document. Do not make assumptions or provide external information.
5.  Be helpful and conversational in your response, but remain professional and focused on the legal context.

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
