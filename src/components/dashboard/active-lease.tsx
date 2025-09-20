'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  CheckCircle,
  Circle,
  Loader2,
  Send,
  MessageSquare,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useState, useEffect, FormEvent } from 'react';
import {
  getDocumentHighlights,
  DocumentHighlightsOutput,
} from '@/ai/flows/document-highlights-flow';
import { askQuestion, QAOutput } from '@/ai/flows/qa-interface-for-documents';
import { ScrollArea } from '../ui/scroll-area';

function SathyaAIChat({ documentText }: { documentText: string }) {
  const [question, setQuestion] = useState('');
  const [history, setHistory] = useState<
    { role: 'user' | 'assistant'; content: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const handleAskQuestion = async (e: FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    const newHistory = [...history, { role: 'user' as const, content: question }];
    setHistory(newHistory);
    setQuestion('');
    setLoading(true);

    try {
      const result: QAOutput = await askQuestion({ documentText, question });
      setHistory([...newHistory, { role: 'assistant' as const, content: result.answer }]);
    } catch (error) {
      console.error('Error asking question:', error);
       setHistory([
        ...newHistory,
        { role: 'assistant' as const, content: 'Sorry, I encountered an error. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-lg p-4 shadow-md w-full h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-primary rounded-full p-2">
          <MessageSquare className="w-6 h-6 text-primary-foreground" />
        </div>
        <h3 className="font-bold text-lg">Ask a Question</h3>
      </div>
      <ScrollArea className="flex-1 pr-4 mb-4">
        <div className="space-y-4">
          {history.map((entry, index) => (
            <div
              key={index}
              className={`flex items-start gap-2 ${
                entry.role === 'user' ? 'justify-end' : ''
              }`}
            >
              <div
                className={`max-w-xs rounded-lg px-4 py-2 ${
                  entry.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{entry.content}</p>
              </div>
            </div>
          ))}
          {loading && (
             <div className="flex items-start gap-2">
                <div className="max-w-xs rounded-lg px-4 py-2 bg-muted flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin"/>
                </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <form onSubmit={handleAskQuestion} className="flex gap-2">
        <Input
          placeholder="Ask about the document..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}

export function ActiveLease() {
  const [documentName, setDocumentName] = useState('Your Document');
  const [highlights, setHighlights] =
    useState<DocumentHighlightsOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [documentText, setDocumentText] = useState<string | null>(null);

  useEffect(() => {
    const docText = sessionStorage.getItem('documentText');
    const docName = sessionStorage.getItem('documentName');

    if (docName) {
      setDocumentName(docName);
    }
    if (!docText) {
      setError('No document found. Please upload a new one.');
      setLoading(false);
      return;
    }
    setDocumentText(docText);

    async function fetchHighlights() {
      try {
        setLoading(true);
        const result = await getDocumentHighlights({ documentText: docText! });
        setHighlights(result);
      } catch (e) {
        console.error(e);
        setError('Failed to load document highlights.');
      } finally {
        setLoading(false);
      }
    }

    fetchHighlights();
  }, []);

  const ChecklistItem = ({
    label,
    checked,
  }: {
    label: string;
    checked: boolean;
  }) => (
    <li className="flex items-center gap-3">
      {checked ? (
        <CheckCircle className="h-5 w-5 text-green-500" />
      ) : (
        <Circle className="h-5 w-5 text-gray-300" />
      )}
      <span>{label}</span>
    </li>
  );

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>
          {documentName}{' '}
          <span className="text-green-500 font-medium">(Active Analysis)</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          <div className="md:col-span-3 flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-4 text-muted-foreground">Analyzing highlights...</p>
          </div>
        ) : error ? (
          <div className="md:col-span-3 text-center py-12">
            <p className="text-destructive">{error}</p>
          </div>
        ) : (
          <>
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="font-semibold mb-4 text-lg">Clarity Checklist</h3>
                <ul className="space-y-3">
                  <ChecklistItem
                    label="Review Critical Risks"
                    checked={highlights?.isCriticalRisksReviewed ?? false}
                  />
                  <ChecklistItem
                    label="Check Renewal Date"
                    checked={highlights?.isRenewalDateChecked ?? false}
                  />
                  <ChecklistItem
                    label="Confirm Payment Terms"
                    checked={highlights?.isPaymentTermsConfirmed ?? false}
                  />
                </ul>
              </div>

              {highlights?.renewalNoticeDays && (
                <Card className="p-4 bg-muted max-w-xs">
                  <CardContent className="p-0">
                    <p className="font-bold text-lg">Renewal Notice</p>
                    <p className="text-muted-foreground">
                      Due in {highlights.renewalNoticeDays} days
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="flex items-center justify-center min-h-[300px]">
              {documentText && <SathyaAIChat documentText={documentText} />}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
