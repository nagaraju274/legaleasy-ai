'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check, CheckCircle, Circle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

function SathyaAIChat() {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md w-full max-w-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-accent rounded-full p-2">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h3 className="font-bold text-lg">SATHYA</h3>
      </div>
      <div className="text-sm text-muted-foreground mb-4">
        <p>Explain the liability clause. What are my termination rights?</p>
      </div>
      <div className="flex gap-2">
        <Input placeholder="Ask SATHYA..." />
        <Button>Ask</Button>
      </div>
    </div>
  );
}

export function ActiveLease() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Hillview Apartment Lease <span className="text-green-500">(Active)</span></CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h3 className="font-semibold mb-4">Clarity Checklist</h3>
          <ul className="space-y-3">
            <li className="flex items-center justify-between">
              <span>Review Critical Risks</span>
              <CheckCircle className="text-green-500" />
            </li>
            <li className="flex items-center justify-between">
              <span>Check Renewal Date</span>
              <CheckCircle className="text-green-500" />
            </li>
            <li className="flex items-center justify-between">
              <span>Confirm Payment Terms</span>
              <Circle className="text-gray-300" />
            </li>
          </ul>

          <Card className="mt-6 p-4 bg-gray-50 max-w-xs">
            <CardContent className="p-0">
              <p className="font-bold text-lg">Renewal notice</p>
              <p className="text-muted-foreground">due in 45 days</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-center">
            <SathyaAIChat />
        </div>
      </CardContent>
    </Card>
  );
}
