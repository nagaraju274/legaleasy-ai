'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, UploadCloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { parseDocument } from '@/app/actions/parse-document';

interface DocumentUploadProps {
  onUploadSuccess: (text: string, name: string) => void;
}

export function DocumentUpload({ onUploadSuccess }: DocumentUploadProps) {
  const { toast } = useToast();
  const [isParsing, setIsParsing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Basic client-side validation for unsupported types
    if (file.type.startsWith('audio/') || file.type.startsWith('video/')) {
      toast({
        variant: 'destructive',
        title: 'Unsupported File Type',
        description: 'Audio and video files are not supported.',
      });
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }
    
    setSelectedFile(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) {
      toast({
        variant: 'destructive',
        title: 'No File Selected',
        description: 'Please select a document to upload.',
      });
      return;
    }

    setIsParsing(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const result = await parseDocument(formData);
      if (result.error) {
        throw new Error(result.error);
      }
      onUploadSuccess(result.text, selectedFile.name);
    } catch (error) {
      console.error('Error parsing file:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An unknown error occurred during parsing.';
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: `Could not process the file. ${errorMessage}`,
      });
    } finally {
      setIsParsing(false);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="flex h-full min-h-[calc(100vh-12rem)] w-full items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Upload Your Document</CardTitle>
          <CardDescription>
            Supports PDF, DOCX, and plain text files.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div
              onClick={handleUploadClick}
              className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-12 text-center transition-colors hover:border-primary hover:bg-accent/50"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleUploadClick();
              }}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,text/plain,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                disabled={isParsing}
              />
              <UploadCloud className="h-12 w-12 text-muted-foreground" />
              {selectedFile ? (
                <p className="mt-4 font-semibold text-foreground">
                  {selectedFile.name}
                </p>
              ) : (
                <>
                  <p className="mt-4 font-semibold text-foreground">
                    Click to upload a file
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    PDF, DOCX, or TXT
                  </p>
                </>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isParsing || !selectedFile}
            >
              {isParsing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Document'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
