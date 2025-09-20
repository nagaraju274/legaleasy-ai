'use client';

import { Shield, BrainCircuit, FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Footer } from '@/components/footer';


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

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Logo />
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Button onClick={() => router.push('/login')}>
                Sign In with Google
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-24 text-center">
          <div className="container">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl">
              Simplify Complex{' '}
              <span className="text-primary">Legal Documents</span> with AI
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Upload any legal document and get instant AI-powered summaries,
              risk analysis, and plain-English explanations. No legal expertise
              required.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" onClick={() => router.push('/login')}>
                Get Started Free
              </Button>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-muted py-24">
          <div className="container text-center">
            <h2 className="text-3xl font-bold">Powerful AI Legal Analysis</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Our advanced AI breaks down complex legal language into clear,
              actionable insights.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center">
                <BrainCircuit className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-semibold">AI Summarization</h3>
                <p className="mt-2 text-muted-foreground">
                  Get concise summaries of long documents in seconds.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Shield className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-semibold">Risk Detection</h3>
                <p className="mt-2 text-muted-foreground">
                  Identify potentially risky clauses and understand their
                  implications.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <FileText className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-semibold">Q&A Chatbot</h3>
                <p className="mt-2 text-muted-foreground">
                  Ask questions about your document in natural language.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold">How It Works</h2>
              <p className="mt-4 text-muted-foreground">
                Our simple 3-step process makes legal document analysis
                effortless.
              </p>
              <ul className="mt-8 space-y-6">
                <li className="flex items-start">
                  <CheckCircle className="mr-4 mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                  <div>
                    <h4 className="font-semibold">1. Upload Your Document</h4>
                    <p className="text-muted-foreground">
                      Securely upload your legal file in various formats like
                      .pdf, .docx, or .txt.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-4 mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                  <div>
                    <h4 className="font-semibold">2. AI Analysis</h4>
                    <p className="text-muted-foreground">
                      Our AI gets to work, summarizing, identifying risks, and
                      preparing for your questions.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-4 mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                  <div>
                    <h4 className="font-semibold">3. Get Insights</h4>
                    <p className="text-muted-foreground">
                      Explore the summary, review risky clauses, and chat with
                      the AI to clarify any point.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="flex h-80 items-center justify-center rounded-lg bg-muted p-8">
              <p className="text-center text-muted-foreground">
                [Visual representation of the process]
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
}
