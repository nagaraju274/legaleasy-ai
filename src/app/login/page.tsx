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
import { FileText, Loader2 } from 'lucide-react';
import { GoogleIcon } from '@/components/icons/google-icon';
import Link from 'next/link';
import { Footer } from '@/components/footer';
import { Shield } from 'lucide-react';


function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Shield className="h-8 w-8 text-primary" />
      <div>
        <h1 className="text-xl font-bold">LegalEase AI</h1>
        <p className="text-xs text-muted-foreground">
          Legal Document Intelligence
        </p>
      </div>
    </Link>
  );
}


export default function LoginPage() {
  const { login, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
     return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Logo />
          <div className="flex flex-1 items-center justify-end space-x-4">
          </div>
        </div>
      </header>
      <main className="flex flex-1 w-full items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Welcome to LegalEase AI
            </CardTitle>
            <CardDescription>
              Sign in to continue to your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={login} className="w-full" size="lg" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon className="mr-2" />}
              Sign in with Google
            </Button>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              By continuing, you agree to our Terms of Service.
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer/>
    </div>
  );
}
