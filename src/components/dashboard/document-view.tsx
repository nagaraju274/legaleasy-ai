'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText } from 'lucide-react';
import { SummaryCard } from './summary-card';
import { RiskAnalysis } from './risk-analysis';
import { QAChatbot } from './qa-chatbot';
import { Card } from '../ui/card';

interface DocumentViewProps {
  documentText: string;
  documentName: string;
  onReset: () => void;
}

export function DocumentView({
  documentText,
  documentName,
  onReset,
}: DocumentViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={onReset} aria-label="Go back to upload">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold">
              <FileText className="h-6 w-6 text-muted-foreground" />
              {documentName}
            </h1>
            <p className="text-muted-foreground">Analysis ready</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          <SummaryCard documentText={documentText} />
          <RiskAnalysis documentText={documentText} />
        </div>
        <Card className="lg:col-span-2">
          <QAChatbot documentText={documentText} />
        </Card>
      </div>
    </div>
  );
}
