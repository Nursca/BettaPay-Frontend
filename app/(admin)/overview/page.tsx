"use client";

import { memo } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CurrencyDisplay } from '@/components/shared/CurrencyDisplay';
import { Users, AlertTriangle, ArrowUpRight, Activity, DollarSign } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const PlatformVolumeChart = dynamic(() => import('@/components/charts/PlatformVolumeChart'), {
  ssr: false,
  loading: () => <Skeleton className="h-[300px] w-full rounded-xl" />,
});

// Memoised so future additions of state to the parent won't re-render the chart.
const AdminChartSection = memo(function AdminChartSection() {
  return (
    <Card className="col-span-4 bg-card border shadow-sm">
      <CardHeader>
        <CardTitle>Platform Volume vs Fees</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="mt-4">
          <PlatformVolumeChart height={300} />
        </div>
      </CardContent>
    </Card>
  );
});

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Platform Overview</h1>
        <p className="text-muted-foreground mt-1">
          Monitor system health, total volume, and compliance alerts.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-2">
        {/* Main Hero Card */}
        <div className="md:col-span-2">
          <Card className="h-full bg-card border shadow-sm relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
            <CardContent className="p-6 relative z-10 flex flex-col justify-between h-full">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Total Processed (30d)</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-6">
                <div className="text-4xl font-bold text-foreground">
                  <CurrencyDisplay amount={1452310.89} />
                </div>
                <div className="flex items-center gap-4 pb-1">
                  <span className="text-xs font-semibold text-success bg-success/10 px-2 py-1 rounded-md flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" /> +12.5%
                  </span>
                  <div className="h-6 w-px bg-border hidden sm:block" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Platform Fees</span>
                    <span className="text-sm font-bold text-success"><CurrencyDisplay amount={14523.10} /></span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stacked Secondary Stats */}
        <div className="md:col-span-1 flex flex-col gap-4">
          <Card className="bg-card border shadow-sm flex-1">
            <CardContent className="p-4 flex flex-col justify-center h-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Active Merchants</span>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold text-foreground">142</p>
                <span className="text-xs text-primary font-medium flex items-center bg-primary/10 px-2 py-1 rounded-md">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> +12 this week
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-destructive/5 border-destructive/20 shadow-sm flex-1">
            <CardContent className="p-4 flex flex-col justify-center h-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-destructive uppercase tracking-wider">Pending KYB</span>
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </div>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold text-destructive">8</p>
                <span className="text-xs text-destructive/80 font-medium bg-destructive/10 px-2 py-1 rounded-md">
                  Action needed
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        {/* Chart section is memoised */}
        <AdminChartSection />

        <Card className="col-span-3 bg-card border shadow-sm">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                  <div>
                    <p className="text-sm font-medium">Stellar Horizon API</p>
                    <p className="text-xs text-muted-foreground">Operational</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-muted-foreground">14ms ping</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                  <div>
                    <p className="text-sm font-medium">Soroban RPC</p>
                    <p className="text-xs text-muted-foreground">Operational</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-muted-foreground">42ms ping</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                  <div>
                    <p className="text-sm font-medium">SEP-24 Anchor (NGN)</p>
                    <p className="text-xs text-muted-foreground">Operational</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-muted-foreground">Syncing</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div>
                    <p className="text-sm font-medium">PostgreSQL Database</p>
                    <p className="text-xs text-muted-foreground">High Load</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-warning">82% CPU</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
