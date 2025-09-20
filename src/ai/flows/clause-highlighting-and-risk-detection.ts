'use server';
/**
 * @fileOverview Detects and highlights potentially risky clauses within legal documents.
 *
 * - detectRiskyClauses - A function that handles the clause highlighting and risk detection process.
 * - DetectRiskyClausesInput - The input type for the detectRiskyClauses function.
 * - DetectRiskyClausesOutput - The return type for the detectRiskyClauses function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectRiskyClausesInputSchema = z.object({
  documentText: z.string().describe('The text content of the legal document.'),
});
export type DetectRiskyClausesInput = z.infer<typeof DetectRiskyClausesInputSchema>;

const RiskLevelSchema = z.enum(['🟢 Safe', '🟡 Caution', '🔴 Risk']);

const ClauseWithRiskSchema = z.object({
  clause: z.string().describe('A clause from the legal document.'),
  riskLevel: RiskLevelSchema.describe('The risk level associated with the clause.'),
  explanation: z.string().describe('Explanation of why the clause is risky (or not).'),
});

const DetectRiskyClausesOutputSchema = z.array(ClauseWithRiskSchema).describe("An array of clauses with their associated risk levels and explanations.");
export type DetectRiskyClausesOutput = z.infer<typeof DetectRiskyClausesOutputSchema>;

export async function detectRiskyClauses(input: DetectRiskyClausesInput): Promise<DetectRiskyClausesOutput> {
  return detectRiskyClausesFlow(input);
}

const detectRiskyClausesPrompt = ai.definePrompt({
  name: 'detectRiskyClausesPrompt',
  input: {schema: DetectRiskyClausesInputSchema},
  output: {schema: DetectRiskyClausesOutputSchema},
  prompt: `You are an AI legal assistant tasked with identifying potentially risky clauses in legal documents.

  Analyze the following document and identify clauses that could be disadvantageous, unclear, or pose a risk to the user.
  For each clause, determine its risk level (🟢 Safe, 🟡 Caution, 🔴 Risk) and provide a brief explanation.

  Document:
  {{documentText}}

  Format your response as a JSON array of objects, where each object contains the clause, its risk level, and explanation.
  Example:
  [
    {
      "clause": "The company may terminate this agreement at any time without notice.",
      "riskLevel": "🔴 Risk",
      "explanation": "This clause allows the company to terminate the agreement without any prior notice, which is a significant risk to the user."
    },
  {
      "clause": "All disputes arising out of or in connection with this agreement shall be resolved through binding arbitration.",
      "riskLevel": "🟡 Caution",
      "explanation": "While arbitration can be faster than litigation, it also limits your right to sue in court."
    },
   {
      "clause": "Governing Law. This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of laws principles.",
      "riskLevel": "🟢 Safe",
      "explanation": "Standard governing law clause. No immediate risk."
    }
  ]
  Ensure the output is a valid JSON.
  `,
});

const detectRiskyClausesFlow = ai.defineFlow(
  {
    name: 'detectRiskyClausesFlow',
    inputSchema: DetectRiskyClausesInputSchema,
    outputSchema: DetectRiskyClausesOutputSchema,
  },
  async input => {
    const {output} = await detectRiskyClausesPrompt(input);
    return output!;
  }
);
