'use server';

/**
 * @fileOverview Extracts key highlights and checklist items from a legal document.
 *
 * - getDocumentHighlights - A function that handles the highlight extraction process.
 * - DocumentHighlightsInput - The input type for the getDocumentHighlights function.
 * - DocumentHighlightsOutput - The return type for the getDocumentHighlights function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const DocumentHighlightsInputSchema = z.object({
  documentText: z
    .string()
    .describe('The text content of the legal document.'),
});
export type DocumentHighlightsInput = z.infer<
  typeof DocumentHighlightsInputSchema
>;

const DocumentHighlightsOutputSchema = z.object({
  renewalNoticeDays: z
    .number()
    .optional()
    .describe(
      'The number of days for the renewal notice, if mentioned. Otherwise null.'
    ),
  isCriticalRisksReviewed: z
    .boolean()
    .describe(
      'Whether there are critical risks that require review in the document.'
    ),
  isRenewalDateChecked: z
    .boolean()
    .describe('Whether a renewal date or period is specified in the document.'),
  isPaymentTermsConfirmed: z
    .boolean()
    .describe(
      'Whether specific payment terms (amount, due dates) are clearly defined.'
    ),
});
export type DocumentHighlightsOutput = z.infer<
  typeof DocumentHighlightsOutputSchema
>;

export async function getDocumentHighlights(
  input: DocumentHighlightsInput
): Promise<DocumentHighlightsOutput> {
  return documentHighlightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'documentHighlightsPrompt',
  input: { schema: DocumentHighlightsInputSchema },
  output: { schema: DocumentHighlightsOutputSchema },
  prompt: `You are an AI legal assistant. Analyze the document provided to extract key information for a "Clarity Checklist".

Based on the document text, determine the following:
1.  **renewalNoticeDays**: If a renewal notice period is mentioned in days, extract that number. If not, the value should be null.
2.  **isCriticalRisksReviewed**: Determine if the document contains any clauses that would be considered high-risk (e.g., automatic renewal without notice, broad liability waivers, unilateral termination rights). Set to true if such risks exist, otherwise false.
3.  **isRenewalDateChecked**: Determine if the document specifies a renewal date, a notice period for renewal, or any clause related to contract extension or renewal. Set to true if it does, otherwise false.
4.  **isPaymentTermsConfirmed**: Determine if the document clearly outlines payment terms, including amounts, due dates, and payment methods. Set to true if payment terms are specified, otherwise false.

Document:
{{documentText}}
`,
});

const documentHighlightsFlow = ai.defineFlow(
  {
    name: 'documentHighlightsFlow',
    inputSchema: DocumentHighlightsInputSchema,
    outputSchema: DocumentHighlightsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
