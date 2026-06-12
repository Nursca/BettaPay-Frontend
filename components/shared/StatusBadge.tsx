import { Badge } from '@/components/ui/badge';
import { PAYMENT_STATUS } from '@/lib/utils/constants';
import { cn } from '@/lib/utils';
import { CheckCircle2, Clock, XCircle, Loader2 } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const normalizedStatus = status.toLowerCase();

  const config: Record<string, { label: string; icon: React.ElementType; className: string }> = {
    [PAYMENT_STATUS.SUCCESS]: {
      label: 'Success',
      icon: CheckCircle2,
      className: 'bg-brand-success/10 text-brand-success hover:bg-brand-success/20 border-brand-success/20',
    },
    [PAYMENT_STATUS.PENDING]: {
      label: 'Pending',
      icon: Clock,
      className: 'bg-brand-warning/10 text-brand-warning hover:bg-brand-warning/20 border-brand-warning/20',
    },
    [PAYMENT_STATUS.PROCESSING]: {
      label: 'Processing',
      icon: Loader2,
      className: 'bg-brand-accent/10 text-brand-accent hover:bg-brand-accent/20 border-brand-accent/20',
    },
    [PAYMENT_STATUS.FAILED]: {
      label: 'Failed',
      icon: XCircle,
      className: 'bg-brand-error/10 text-brand-error hover:bg-brand-error/20 border-brand-error/20',
    },
  };

  const currentConfig = config[normalizedStatus] || {
    label: status,
    icon: Clock,
    className: 'bg-muted text-muted-foreground',
  };

  const Icon = currentConfig.icon;

  return (
    <Badge variant="outline" className={cn('gap-1 font-medium', currentConfig.className, className)}>
      <Icon className={cn('w-3 h-3', normalizedStatus === PAYMENT_STATUS.PROCESSING && 'animate-spin')} />
      {currentConfig.label}
    </Badge>
  );
};
