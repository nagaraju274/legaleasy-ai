'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadCloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState, useRef, ChangeEvent } from 'react';

interface DocumentUploadProps {
  onUploadSuccess: (text: string, name: string) => void;
}

export function DocumentUpload({ onUploadSuccess }: DocumentUploadProps) {
  const { toast } = useToast();
  const [isParsing, setIsParsing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith('audio/') || file.type.startsWith('video/')) {
      toast({
        variant: 'destructive',
        title: 'Unsupported File Type',
        description: 'Audio and video files are not supported.',
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }
    
    setIsParsing(true);
    try {
      // For this demo, we will simulate reading all file types as text.
      // In a real app, you would use libraries like pdf-parse or mammoth.
      const text = await file.text();
      onUploadSuccess(text, file.name);

    } catch (error) {
      console.error('Error parsing file:', error);
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: 'There was an error processing your file. Only text-based files are fully supported in this demo.',
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
            Upload a file to get started. Audio and video files are not supported.
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
              Any file type except audio/video
            </p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="*/*"
              disabled={isParsing}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
