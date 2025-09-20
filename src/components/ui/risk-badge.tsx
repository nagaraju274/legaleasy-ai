import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const riskBadgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      riskLevel: {
        '🟢 Safe':
          'border-transparent bg-risk-safe text-risk-safe-foreground',
        '🟡 Caution':
          'border-transparent bg-risk-caution text-risk-caution-foreground',
        '🔴 Risk':
          'border-transparent bg-risk-high text-risk-high-foreground',
      },
    },
  }
);

export interface RiskBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof riskBadgeVariants> {
  riskLevel: '🟢 Safe' | '🟡 Caution' | '🔴 Risk';
}

function RiskBadge({ className, riskLevel, ...props }: RiskBadgeProps) {
  return (
    <div
      className={cn(riskBadgeVariants({ riskLevel }), className)}
      {...props}
    >
      {riskLevel.split(' ')[1]}
    </div>
  );
}

export { RiskBadge, riskBadgeVariants };
