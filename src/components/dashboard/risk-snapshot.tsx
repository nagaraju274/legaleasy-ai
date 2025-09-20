'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert, ShieldCheck, ShieldQuestion } from 'lucide-react';
import { CircularProgress } from '@/components/ui/circular-progress';
import Link from 'next/link';

export function RiskSnapshot() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Risk Snapshot</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
        <div className="flex justify-center">
          <CircularProgress value={78} />
        </div>
        <div className="md:col-span-3 grid grid-cols-3 gap-4 text-center">
          <Link href="/dashboard/analysis/critical-risks" className="flex flex-col items-center gap-2 hover:bg-muted p-4 rounded-lg transition-colors">
            <ShieldAlert className="w-8 h-8 text-red-500" />
            <p className="font-semibold">2 Critical Risks</p>
            <div className="w-8 h-2 bg-red-200 rounded-full" />
          </Link>
          <Link href="/dashboard/analysis/negotiation-points" className="flex flex-col items-center gap-2 hover:bg-muted p-4 rounded-lg transition-colors">
            <ShieldQuestion className="w-8 h-8 text-orange-500" />
            <p className="font-semibold">5 Points to Negotiate</p>
            <div className="w-8 h-2 bg-orange-200 rounded-full" />
          </Link>
          <Link href="/dashboard/analysis/standard-clauses" className="flex flex-col items-center gap-2 hover:bg-muted p-4 rounded-lg transition-colors">
            <ShieldCheck className="w-8 h-8 text-green-500" />
            <p className="font-semibold">18 Standard Clauses</p>
            <div className="w-8 h-2 bg-green-200 rounded-full" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
