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
import { FileText } from 'lucide-react';
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
    <div className="flex min-h-screen w-full items-center justify-center bg-muted/50 p-4">
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
          <Button onClick={login} className="w-full" size="lg">
            <GoogleIcon className="mr-2" />
            Sign in with Google
          </Button>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            By continuing, you agree to our Terms of Service.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
