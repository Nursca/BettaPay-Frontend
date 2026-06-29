"use client";

import dynamic from 'next/dynamic';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CurrencyDisplay } from "@/components/shared/CurrencyDisplay";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Copy,
  ExternalLink,
} from "lucide-react";
import { useNotify } from "@/lib/hooks/useNotify";
import { useAuthStore } from "@/lib/store/authStore";
import Image from "next/image";

const WalletActivityHistory = dynamic(() => import('@/components/wallet/WalletActivityHistory').then(m => ({ default: m.WalletActivityHistory })), {
  loading: () => <Skeleton className="h-64 rounded-xl" />,
});

export default function WalletPage() {
  const { user } = useAuthStore();
  const address =
    user?.id ?? "GCCHHKNI7GRA5QWC7RCTT3OHO7SKAUMKQA6IBWEQEO2SXI3GF376UHDD";
  const shortAddress = `${address.substring(0, 8)}...${address.slice(-6)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    success("Address copied");
  };

  const { success } = useNotify();

  return (
    <div className="space-y-8 pb-8">
      <div>
        <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-1">
          Stellar Wallet
        </p>
        <h1 className="text-3xl font-bold text-foreground">My Wallet</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Your non-custodial Stellar wallet for receiving crypto payments.
        </p>
      </div>

      {/* Wallet Card */}
      <div className="relative rounded-2xl overflow-hidden bg-foreground p-4 sm:p-6 text-background shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full -ml-16 -mb-16 blur-3xl pointer-events-none" />

        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt=""
                width={32}
                height={32}
                className="w-8 h-8 rounded-lg object-contain bg-background/10"
              />
              <span className="font-bold text-lg">BettaPay</span>
            </div>
            <span className="text-xs bg-background/10 px-3 py-1 rounded-full font-medium">
              Stellar Network
            </span>
          </div>

          <div className="mb-6">
            <p className="text-xs text-background/50 uppercase tracking-wider mb-1">
              Total Balance
            </p>
            <p className="text-4xl font-bold">
              <CurrencyDisplay amount={12450.0} />{" "}
              <span className="text-lg font-normal text-background/60">USDC</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs text-background/50 mb-1">Wallet Address</p>
              <p className="font-mono text-xs sm:text-sm text-background/80 break-all">{shortAddress}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleCopy}
                variant="ghost"
                aria-label="Copy wallet address"
                className="h-8 w-8 p-0 rounded-lg bg-background/10 hover:bg-background/20 text-primary-foreground"
              >
                <Copy className="w-3.5 h-3.5" />
              </Button>
              <a
                href={`https://stellar.expert/explorer/testnet/account/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View on Stellar Expert"
                className="h-8 w-8 p-0 rounded-lg bg-background/10 hover:bg-background/20 text-primary-foreground flex items-center justify-center transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Balances */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "USDC", amount: 12450.0, icon: "💵", change: "+12.4%" },
          { label: "XLM", amount: 245.89, icon: "⭐", change: "-2.1%" },
          {
            label: "NGN (Pending)",
            amount: 19297500,
            icon: "🇳🇬",
            change: null,
          },
        ].map(({ label, amount, icon, change }) => (
          <Card
            key={label}
            className="border border-border bg-card shadow-sm"
          >
            <CardContent className="flex items-center gap-3 p-4">
              <div className="text-2xl" aria-hidden="true">
                {icon}
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground font-medium">{label}</p>
                <p className="text-lg font-bold text-foreground">
                  {label === "NGN (Pending)"
                    ? `₦${amount.toLocaleString()}`
                    : amount.toFixed(2)}
                </p>
              </div>
              {change && (
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${change.startsWith("+") ? "text-emerald-600 bg-emerald-50" : "text-red-500 bg-red-50"}`}
                >
                  {change}
                </span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Transaction history */}
      <WalletActivityHistory />
    </div>
  );
}
