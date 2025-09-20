'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { UploadCloud } from 'lucide-react';
import { SAMPLE_LEGAL_DOCUMENT } from '@/lib/placeholder-data';

interface DocumentUploadProps {
  onUploadSuccess: (text: string, name: string) => void;
}

export function DocumentUpload({ onUploadSuccess }: DocumentUploadProps) {
  const handleSimulatedUpload = () => {
    onUploadSuccess(SAMPLE_LEGAL_DOCUMENT, 'sample-agreement.txt');
  };

  return (
    <div className="flex h-full min-h-[calc(100vh-12rem)] w-full items-center justify-center">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Upload Your Document</CardTitle>
          <CardDescription>
            Upload a PDF, DOCX, or TXT file to get started. For this demo,
            we'll use a sample document.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            onClick={handleSimulatedUpload}
            className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-12 transition-colors hover:border-primary hover:bg-accent/50"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleSimulatedUpload();
            }}
          >
            <UploadCloud className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 font-semibold text-foreground">
              Click to analyze a sample document
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              (File upload is simulated for this demo)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
