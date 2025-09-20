'use client';
import { useState } from 'react';
import { DocumentUpload } from '@/components/dashboard/document-upload';
import { DocumentView } from '@/components/dashboard/document-view';

export default function DashboardPage() {
  const [documentText, setDocumentText] = useState<string | null>(null);
  const [documentName, setDocumentName] = useState<string>('');

  return (
    <div className="h-full">
      {!documentText ? (
        <DocumentUpload
          onUploadSuccess={(text, name) => {
            setDocumentText(text);
            setDocumentName(name);
          }}
        />
      ) : (
        <DocumentView
          documentText={documentText}
          documentName={documentName}
          onReset={() => {
            setDocumentText(null);
            setDocumentName('');
          }}
        />
      )}
    </div>
  );
}
