'use client';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CircularProgress } from '../ui/circular-progress';

function DocumentCard({
  title,
  score,
  date,
}: {
  title: string;
  score: number;
  date: string;
}) {
  return (
    <Card className="shadow-sm hover:shadow-lg transition-shadow">
      <CardContent className="p-4 flex items-center gap-4">
        <CircularProgress value={score} size="sm" />
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function LiveDocuments() {
  const documents = [
    { title: 'NDA - Acme Corp.', score: 4, date: 'Reviewal Date' },
    { title: 'NDA - Acme Corp.', score: 6, date: 'Reviewal Date' },
    { title: 'NDA - Acme Corp.', score: 14, date: 'Reviewal Date' },
    { title: 'Freelance Agreement - V2', score: 30, date: 'Reviewal Date' },
    { title: 'Reelene Agreement', score: 80, date: 'Reviewal Date' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Live Document Cards</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {documents.map((doc, index) => (
          <DocumentCard key={index} {...doc} />
        ))}
      </div>
    </div>
  );
}
