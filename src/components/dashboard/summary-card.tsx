'use client';

import { useState, useEffect } from 'react';
import {
  summarizeDocument,
  type SummarizeDocumentOutput,
} from '@/ai/flows/ai-summarization-flow';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

interface SummaryCardProps {
  documentText: string;
}

export function SummaryCard({ documentText }: SummaryCardProps) {
  const [summary, setSummary] = useState<SummarizeDocumentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getSummary() {
      if (!documentText) return;
      try {
        setIsLoading(true);
        setError(null);
        const result = await summarizeDocument({ documentText });
        setSummary(result);
      } catch (e) {
        setError('Failed to generate summary. Please try again.');
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    getSummary();
  }, [documentText]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        )}
        {error && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {summary && (
          <p className="leading-relaxed text-muted-foreground">
            {summary.summary}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
