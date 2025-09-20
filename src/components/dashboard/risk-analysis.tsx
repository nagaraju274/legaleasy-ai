'use client';
import { useState, useEffect } from 'react';
import {
  detectRiskyClauses,
  type DetectRiskyClausesOutput,
} from '@/ai/flows/clause-highlighting-and-risk-detection';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { RiskBadge } from '@/components/ui/risk-badge';

interface RiskAnalysisProps {
  documentText: string;
}

export function RiskAnalysis({ documentText }: RiskAnalysisProps) {
  const [analysis, setAnalysis] = useState<DetectRiskyClausesOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getAnalysis() {
      if (!documentText) return;
      try {
        setIsLoading(true);
        setError(null);
        const result = await detectRiskyClauses({ documentText });
        setAnalysis(result);
      } catch (e) {
        setError('Failed to analyze clauses. Please try again.');
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    getAnalysis();
  }, [documentText]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Clause Risk Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-12 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        )}
        {error && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {analysis && (
          <Accordion type="single" collapsible className="w-full">
            {analysis.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left hover:no-underline">
                  <div className="flex w-full items-start justify-between gap-4">
                    <p className="flex-1 font-medium">{item.clause}</p>
                    <RiskBadge riskLevel={item.riskLevel} />
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{item.explanation}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}
