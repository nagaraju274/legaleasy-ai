'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, UploadCloud } from 'lucide-react';
import { SAMPLE_LEGAL_DOCUMENT } from '@/lib/placeholder-data';
import { useToast } from '@/hooks/use-toast';
import { useState, useRef, ChangeEvent } from 'react';

interface DocumentUploadProps {
  onUploadSuccess: (text: string, name: string) => void;
}

export function DocumentUpload({ onUploadSuccess }: DocumentUploadProps) {
  const { toast } = useToast();
  const [isParsing, setIsParsing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUseSample = () => {
    onUploadSuccess(SAMPLE_LEGAL_DOCUMENT, 'sample-agreement.txt');
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsParsing(true);
    try {
      // For this demo, we'll just read the text content.
      // In a real app you might use a library like pdf-parse or mammoth.
      if (file.type === 'text/plain') {
        const text = await file.text();
        onUploadSuccess(text, file.name);
      } else {
        toast({
          variant: 'destructive',
          title: 'Unsupported File Type',
          description: `For this demo, only .txt files are supported for direct reading. Using sample document instead.`,
        });
        // Fallback to sample for other types in this demo
        onUploadSuccess(SAMPLE_LEGAL_DOCUMENT, file.name);
      }
    } catch (error) {
      console.error('Error parsing file:', error);
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: 'There was an error processing your file.',
      });
    } finally {
      setIsParsing(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex h-full min-h-[calc(100vh-12rem)] w-full items-center justify-center">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Upload Your Document</CardTitle>
          <CardDescription>
            Upload a TXT file to get started, or use our sample document.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            onClick={handleUploadClick}
            className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-12 transition-colors hover:border-primary hover:bg-accent/50"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleUploadClick();
            }}
          >
            <UploadCloud className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 font-semibold text-foreground">
              Click to upload a file
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              TXT files supported for this demo
            </p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".txt"
              disabled={isParsing}
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">OR</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <Button
            variant="outline"
            onClick={handleUseSample}
            disabled={isParsing}
          >
            <FileText className="mr-2 h-4 w-4" />
            Analyze Sample Document
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
