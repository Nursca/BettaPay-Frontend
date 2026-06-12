"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CurrencyDisplay } from '@/components/shared/CurrencyDisplay';
import { Users, AlertTriangle, ArrowUpRight, Activity, DollarSign } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const mockChartData = [
  { name: 'Mon', volume: 45000, fee: 450 },
  { name: 'Tue', volume: 52000, fee: 520 },
  { name: 'Wed', volume: 38000, fee: 380 },
  { name: 'Thu', volume: 61000, fee: 610 },
  { name: 'Fri', volume: 59000, fee: 590 },
  { name: 'Sat', volume: 72000, fee: 720 },
  { name: 'Sun', volume: 68000, fee: 680 },
];

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Platform Overview</h1>
        <p className="text-muted-foreground mt-1">
          Monitor system health, total volume, and compliance alerts.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-brand-surface border-border/50 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent/5 rounded-full -mr-10 -mt-10 blur-xl"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 z-10 relative">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Processed (30d)</CardTitle>
            <Activity className="h-4 w-4 text-brand-accent" />
          </CardHeader>
          <CardContent className="z-10 relative">
            <div className="text-2xl font-bold text-brand-text-primary">
              <CurrencyDisplay amount={1452310.89} />
            </div>
            <p className="text-xs text-brand-success flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-brand-surface border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Platform Fees Generated</CardTitle>
            <DollarSign className="h-4 w-4 text-brand-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-text-primary">
              <CurrencyDisplay amount={14523.10} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              1.0% flat fee across volume
            </p>
          </CardContent>
        </Card>

        <Card className="bg-brand-surface border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Merchants</CardTitle>
            <Users className="h-4 w-4 text-brand-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-text-primary">142</div>
            <p className="text-xs text-brand-success flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +12 new this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-brand-error/10 border-brand-error/20 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-brand-error">Pending KYB Reviews</CardTitle>
            <AlertTriangle className="h-4 w-4 text-brand-error" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-error">8</div>
            <p className="text-xs text-brand-error/80 mt-1">
              Requires immediate action
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4 bg-brand-surface border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>Platform Volume vs Fees</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockChartData}>
                  <XAxis 
                    dataKey="name" 
                    stroke="#94A3B8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    yAxisId="left"
                    stroke="#94A3B8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `$${value/1000}k`} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111D35', borderColor: '#1E2D4A', color: '#F0F4FF' }}
                    cursor={{ fill: '#162040' }}
                  />
                  <Bar yAxisId="left" dataKey="volume" fill="#1E2D4A" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="left" dataKey="fee" fill="#F0A500" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-brand-surface border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-success"></div>
                  <div>
                    <p className="text-sm font-medium">Stellar Horizon API</p>
                    <p className="text-xs text-muted-foreground">Operational</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-muted-foreground">14ms ping</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-success"></div>
                  <div>
                    <p className="text-sm font-medium">Soroban RPC</p>
                    <p className="text-xs text-muted-foreground">Operational</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-muted-foreground">42ms ping</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-success"></div>
                  <div>
                    <p className="text-sm font-medium">SEP-24 Anchor (NGN)</p>
                    <p className="text-xs text-muted-foreground">Operational</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-muted-foreground">Syncing</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-warning"></div>
                  <div>
                    <p className="text-sm font-medium">PostgreSQL Database</p>
                    <p className="text-xs text-muted-foreground">High Load</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-brand-warning">82% CPU</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
