'use client';

import { RiskSnapshot } from '@/components/dashboard/risk-snapshot';
import { ActiveLease } from '@/components/dashboard/active-lease';
import { LiveDocuments } from '@/components/dashboard/live-documents';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function AnalysisPage() {
  const router = useRouter();
  const handleReset = () => {
    sessionStorage.removeItem('documentText');
    sessionStorage.removeItem('documentName');
    router.push('/dashboard');
  };
  return (
    <div className="space-y-6">
       <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={handleReset} aria-label="Go back to upload">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold">
              Analysis
            </h1>
            <p className="text-muted-foreground">Dashboard overview</p>
          </div>
        </div>
      </div>
      <RiskSnapshot />
      <ActiveLease />
      <LiveDocuments />
    </div>
  );
}
