'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DocumentView } from '@/components/dashboard/document-view';
import { FileText, Loader2 } from 'lucide-react';

export default function AnalysisPage() {
  const router = useRouter();
  const [documentText, setDocumentText] = useState<string | null>(null);
  const [documentName, setDocumentName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const text = sessionStorage.getItem('documentText');
    const name = sessionStorage.getItem('documentName');

    if (text && name) {
      setDocumentText(text);
      setDocumentName(name);
    } else {
      // If no document is in storage, redirect to upload page
      router.replace('/dashboard');
    }
    setIsLoading(false);
  }, [router]);

  const handleReset = () => {
    sessionStorage.removeItem('documentText');
    sessionStorage.removeItem('documentName');
    router.push('/dashboard');
  };

  if (isLoading || !documentText) {
    return (
      <div className="flex h-full min-h-[calc(100vh-12rem)] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading Analysis...</p>
        </div>
      </div>
    );
  }

  return (
    <DocumentView
      documentText={documentText}
      documentName={documentName}
      onReset={handleReset}
    />
  );
}
