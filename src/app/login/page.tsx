'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BrainCircuit, FileText, Shield } from 'lucide-react';
import { GoogleIcon } from '@/components/icons/google-icon';

export default function LoginPage() {
  const { login, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <div className="w-full max-w-4xl">
        <Card className="grid grid-cols-1 overflow-hidden shadow-2xl md:grid-cols-2">
          <div className="flex flex-col justify-center p-8">
            <CardHeader>
              <div className="mb-4 flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold tracking-tighter">
                  LegalEase AI
                </h1>
              </div>
              <CardTitle className="text-2xl font-bold">
                Your AI-powered legal assistant
              </CardTitle>
              <CardDescription className="text-md">
                Sign in to upload documents, get summaries, and analyze legal
                text with ease.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={login} className="w-full" size="lg">
                <GoogleIcon className="mr-2" />
                Sign in with Google
              </Button>
            </CardContent>
          </div>
          <div className="hidden flex-col justify-center bg-muted/50 p-8 md:flex">
            <h3 className="mb-6 text-xl font-semibold">
              Transforming Legal Document Analysis
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <BrainCircuit className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold">AI Summarization</h4>
                  <p className="text-sm text-muted-foreground">
                    Understand complex documents in seconds.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Risk Detection</h4>
                  <p className="text-sm text-muted-foreground">
                    Identify risky clauses and protect your interests.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Q&amp;A Chatbot</h4>
                  <p className="text-sm text-muted-foreground">
                    Ask questions and get instant answers about your documents.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
