'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { RiskBadge } from '@/components/ui/risk-badge';
import { detectRiskyClauses, DetectRiskyClausesOutput } from '@/ai/flows/clause-highlighting-and-risk-detection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CriticalRisksPage() {
  const router = useRouter();
  const [risks, setRisks] = useState<DetectRiskyClausesOutput>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const documentText = sessionStorage.getItem('documentText');
    if (!documentText) {
      setError('No document found in session. Please upload a document first.');
      setLoading(false);
      return;
    }

    async function analyzeRisks() {
      try {
        setLoading(true);
        const result = await detectRiskyClauses({ documentText });
        const criticalRisks = result.filter(
          (item) => item.riskLevel === '🔴 Risk'
        );
        setRisks(criticalRisks);
      } catch (e) {
        console.error(e);
        setError('Failed to analyze document risks.');
      } finally {
        setLoading(false);
      }
    }

    analyzeRisks();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Critical Risks</h1>
          <p className="text-muted-foreground">
            Review clauses that pose a significant risk.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Identified Critical Clauses</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-4 text-muted-foreground">Analyzing clauses...</p>
            </div>
          )}
          {error && <p className="text-destructive text-center">{error}</p>}
          {!loading && !error && (
            <Accordion type="single" collapsible className="w-full">
              {risks.length > 0 ? (
                risks.map((item, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-4">
                        <RiskBadge riskLevel={item.riskLevel} />
                        <span className="flex-1 text-left">{item.clause.substring(0, 100)}...</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="font-semibold mb-2">Full Clause:</p>
                      <p className="mb-4 text-muted-foreground">{item.clause}</p>
                      <p className="font-semibold mb-2">Explanation:</p>
                      <p className="text-muted-foreground">{item.explanation}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-12">
                  No critical risks were detected in this document.
                </p>
              )}
            </Accordion>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
