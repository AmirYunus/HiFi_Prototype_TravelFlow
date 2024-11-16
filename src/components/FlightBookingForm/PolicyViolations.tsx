import { AlertCircle } from 'lucide-react';
import { PolicyRule } from '@/types/flight';
import { cn } from '@/lib/utils';

interface PolicyViolationsProps {
  violations: PolicyRule[];
}

export function PolicyViolations({ violations }: PolicyViolationsProps) {
  if (violations.length === 0) return null;

  return (
    <div className="space-y-2">
      {violations.map((violation) => (
        <div
          key={violation.id}
          className={cn(
            "p-4 rounded-lg flex items-center space-x-3",
            {
              'bg-red-50 text-red-800': violation.severity === 'error',
              'bg-yellow-50 text-yellow-800': violation.severity === 'warning',
              'bg-blue-50 text-blue-800': violation.severity === 'info',
            }
          )}
        >
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span className="text-sm font-medium">{violation.message}</span>
        </div>
      ))}
    </div>
  );
}