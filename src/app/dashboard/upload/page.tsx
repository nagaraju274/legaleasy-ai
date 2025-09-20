'use client';
import { DocumentUpload } from '@/components/dashboard/document-upload';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const router = useRouter();

  return (
    <div className="h-full">
      <DocumentUpload
        onUploadSuccess={(text, name) => {
          // Store document in session storage and redirect
          sessionStorage.setItem('documentText', text);
          sessionStorage.setItem('documentName', name);
          router.push('/dashboard/analysis');
        }}
      />
    </div>
  );
}
