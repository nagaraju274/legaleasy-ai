'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  Loader2,
} from 'lucide-react';
import { CircularProgress } from '@/components/ui/circular-progress';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  detectRiskyClauses,
  DetectRiskyClausesOutput,
} from '@/ai/flows/clause-highlighting-and-risk-detection';

type RiskCounts = {
  critical: number;
  caution: number;
  safe: number;
};

export function RiskSnapshot() {
  const [counts, setCounts] = useState<RiskCounts>({
    critical: 0,
    caution: 0,
    safe: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fairnessScore, setFairnessScore] = useState(0);

  useEffect(() => {
    const documentText = sessionStorage.getItem('documentText');
    if (!documentText) {
      setError('No document text found in session storage.');
      setLoading(false);
      return;
    }

    async function analyzeAndSetCounts() {
      try {
        setLoading(true);
        const result = await detectRiskyClauses({ documentText });
        const critical = result.filter(
          (item) => item.riskLevel === '🔴 Risk'
        ).length;
        const caution = result.filter(
          (item) => item.riskLevel === '🟡 Caution'
        ).length;
        const safe = result.filter(
          (item) => item.riskLevel === '🟢 Safe'
        ).length;
        
        setCounts({ critical, caution, safe });
        
        const total = critical + caution + safe;
        if (total > 0) {
          const score = Math.round((safe / total) * 100);
          setFairnessScore(score);
        }

      } catch (e) {
        console.error(e);
        setError('Failed to analyze document risks.');
      } finally {
        setLoading(false);
      }
    }

    analyzeAndSetCounts();
  }, []);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Risk Snapshot</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
        {loading ? (
          <div className="md:col-span-4 flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-4 text-muted-foreground">Generating analysis...</p>
          </div>
        ) : error ? (
           <div className="md:col-span-4 text-center py-12">
            <p className="text-destructive">{error}</p>
          </div>
        ) : (
          <>
            <div className="flex justify-center">
              <CircularProgress value={fairnessScore} />
            </div>
            <div className="md:col-span-3 grid grid-cols-3 gap-4 text-center">
              <Link
                href="/dashboard/analysis/critical-risks"
                className="flex flex-col items-center gap-2 hover:bg-muted p-4 rounded-lg transition-colors"
              >
                <ShieldAlert className="w-8 h-8 text-red-500" />
                <p className="font-semibold">{counts.critical} Critical Risks</p>
                <div className="w-8 h-2 bg-red-200 rounded-full" />
              </Link>
              <Link
                href="/dashboard/analysis/negotiation-points"
                className="flex flex-col items-center gap-2 hover:bg-muted p-4 rounded-lg transition-colors"
              >
                <ShieldQuestion className="w-8 h-8 text-orange-500" />
                <p className="font-semibold">{counts.caution} Points to Negotiate</p>
                <div className="w-8 h-2 bg-orange-200 rounded-full" />
              </Link>
              <Link
                href="/dashboard/analysis/standard-clauses"
                className="flex flex-col items-center gap-2 hover:bg-muted p-4 rounded-lg transition-colors"
              >
                <ShieldCheck className="w-8 h-8 text-green-500" />
                <p className="font-semibold">{counts.safe} Standard Clauses</p>
                <div className="w-8 h-2 bg-green-200 rounded-full" />
              </Link>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
