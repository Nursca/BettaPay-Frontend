import { formatCurrency } from '@/lib/utils/format';
import { cn } from '@/lib/utils';

interface CurrencyDisplayProps {
  amount: number;
  currency?: string;
  className?: string;
  showDecimals?: boolean;
}

export const CurrencyDisplay = ({ 
  amount, 
  currency = 'USDC', 
  className,
  showDecimals = true 
}: CurrencyDisplayProps) => {
  const formatted = formatCurrency(amount, currency);
  
  // If not showing decimals for USDC/USD, we can strip them
  const displayValue = !showDecimals && currency !== 'NGN' && formatted.endsWith('.00') 
    ? formatted.replace('.00', '') 
    : formatted;

  return (
    <span className={cn('font-medium', className)}>
      {displayValue}
    </span>
  );
};
