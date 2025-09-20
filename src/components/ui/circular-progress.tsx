'use client';

import { cn } from '@/lib/utils';

interface CircularProgressProps {
  value: number;
  size?: 'sm' | 'default';
  className?: string;
}

export function CircularProgress({
  value,
  size = 'default',
  className,
}: CircularProgressProps) {
  const radius = size === 'sm' ? 16 : 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const width = size === 'sm' ? 40 : 100;
  const height = size === 'sm' ? 40 : 100;
  const strokeWidth = size === 'sm' ? 3 : 8;

  let colorClass = 'text-green-500';
  if (value < 25) {
    colorClass = 'text-red-500';
  } else if (value < 75) {
    colorClass = 'text-orange-500';
  }

  return (
    <div
      className={cn('relative', size === 'sm' ? 'h-10 w-10' : 'h-24 w-24', className)}
    >
      <svg className="h-full w-full" viewBox={`0 0 ${width} ${height}`}>
        <circle
          className="text-gray-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={width / 2}
          cy={height / 2}
        />
        <circle
          className={cn('transition-all duration-500 ease-in-out', colorClass)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={width / 2}
          cy={height / 2}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {size === 'default' && (
          <span className="text-xs text-muted-foreground">Fairness Score</span>
        )}
        <span
          className={cn(
            'font-bold',
            size === 'sm' ? 'text-sm' : 'text-3xl'
          )}
        >
          {size === 'sm' ? value : `${value}/100`}
        </span>
      </div>
    </div>
  );
}
