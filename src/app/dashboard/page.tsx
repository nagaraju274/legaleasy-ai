'use client';
import { DocumentUpload } from '@/components/dashboard/document-upload';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const router = useRouter();

  // This page is now a redirect handler.
  // The actual upload UI is at /dashboard/upload
  useEffect(() => {
    router.replace('/dashboard/contracts');
  }, [router]);


  return null;
}
