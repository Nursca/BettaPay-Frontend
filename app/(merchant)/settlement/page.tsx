"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { NetworkTooltip } from '@/components/ui/network-tooltip';
import { CurrencyDisplay } from '@/components/shared/CurrencyDisplay';
import { StatusBadge } from '@/components/shared/StatusBadge';
import {
  Building2,
  Clock,
  CheckCircle2,
  AlertCircle,
  Banknote,
  ChevronRight,
  Download,
  Receipt,
} from 'lucide-react';
import { EmptyState } from '@/components/shared/EmptyState';
import { useOfflineStore } from '@/lib/store/offlineStore';
import { SettlementConfirmation } from '@/components/settlement/SettlementConfirmation';
import { memo } from 'react';
import { mockSettlements, type Settlement } from '@/lib/mock/settlements';

interface SettlementItemProps {
  settlement: Settlement;
}

const SettlementItem = memo(function SettlementItem({ settlement: s }: SettlementItemProps) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-border hover:bg-muted/50 transition-all">
      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
        <Building2 className="w-5 h-5 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground">{s.bank} · {s.accountNo}</p>
        <p className="text-xs text-muted-foreground">{s.date}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold text-foreground"><CurrencyDisplay amount={s.amount} /></p>
        <p className="text-xs text-muted-foreground">₦{s.amountNgn.toLocaleString()}</p>
      </div>
      <StatusBadge status={s.status as 'completed' | 'pending' | 'failed'} />
    </div>
  );
});

export default function SettlementPage() {
  const isOnline = useOfflineStore((s) => s.isOnline);
  const [settlementOpen, setSettlementOpen] = useState(false);

  return (
    <div className="space-y-8 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-1">Finance</p>
          <h1 className="text-3xl font-bold text-foreground">Settlement</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Convert your USDC balance to Nigerian Naira and settle to your bank account.
          </p>
        </div>
        <NetworkTooltip show={!isOnline}>
          <Button
            disabled={!isOnline}
            aria-disabled={!isOnline}
            onClick={() => setSettlementOpen(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl h-10 px-5 text-sm shadow-button"
          >
            <Banknote className="w-4 h-4 mr-2" />
            Initiate Settlement
          </Button>
        </NetworkTooltip>
      </div>

      <SettlementConfirmation
        isOpen={settlementOpen}
        onClose={() => setSettlementOpen(false)}
      />

      {/* Balance summary */}
      <div className="grid gap-4 sm:grid-cols-3 mb-2">
        <div className="sm:col-span-2">
          <Card className="h-full border border-border bg-card shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
            <CardContent className="p-6 relative flex flex-col justify-center h-full">
              <div className="flex items-center gap-2 mb-4">
                <Wallet className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Available to Settle</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-6">
                <div>
                  <p className="text-4xl font-bold text-foreground"><CurrencyDisplay amount={12450.00} /></p>
                </div>
                <div className="flex items-center gap-2 pb-1">
                  <div className="h-6 w-px bg-border hidden sm:block" />
                  <p className="text-lg font-medium text-muted-foreground">≈ ₦19,297,500</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="sm:col-span-1 flex flex-col gap-4">
          <Card className="border border-border bg-card shadow-sm flex-1">
            <CardContent className="p-4 flex flex-col justify-center h-full">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Pending Settlement</p>
              <div className="flex items-end justify-between">
                <p className="text-xl font-bold text-foreground"><CurrencyDisplay amount={8200.50} /></p>
                <span className="text-xs text-primary font-medium flex items-center bg-primary/10 px-2 py-1 rounded-md">
                  <Clock className="w-3 h-3 mr-1" /> Processing
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-border bg-card shadow-sm flex-1">
            <CardContent className="p-4 flex flex-col justify-center h-full">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Total Settled (30d)</p>
              <div className="flex items-end justify-between">
                <p className="text-xl font-bold text-foreground"><CurrencyDisplay amount={38750.00} /></p>
                <span className="text-xs text-success font-medium flex items-center bg-success/10 px-2 py-1 rounded-md">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Completed
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Settlement history */}
      <Card className="border border-border bg-card shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold text-foreground">Settlement History</CardTitle>
            <CardDescription>All your past USDC → NGN conversions</CardDescription>
          </div>
          <NetworkTooltip show={!isOnline}>
            <Button
              variant="outline"
              disabled={!isOnline}
              aria-disabled={!isOnline}
              className="border-border text-muted-foreground rounded-xl text-xs h-8 px-3"
            >
              <Download className="w-3 h-3 mr-1.5" /> Export
            </Button>
          </NetworkTooltip>
        </CardHeader>
        <CardContent>
          {mockSettlements.length === 0 ? (
            <EmptyState
              icon={Receipt}
              title="No settlements yet"
              description="Your USDC → NGN conversion history will appear here once you initiate a settlement."
            />
          ) : (
            <div className="space-y-3">
              {mockSettlements.map((s) => (
                <SettlementItem key={s.id} settlement={s} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bank account config notice */}
      <Card className="border border-primary/30 bg-primary/10">
        <CardContent className="flex items-start gap-4 p-5">
          <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-primary">Bank account not configured</p>
            <p className="text-xs text-primary mt-0.5">
              Add your Nigerian bank account in Settings to enable automatic settlements.
            </p>
          </div>
          <Button variant="ghost" className="text-primary hover:bg-primary/20 rounded-xl text-xs h-8 px-3 flex-shrink-0">
            Go to Settings <ChevronRight className="w-3 h-3 ml-1" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
