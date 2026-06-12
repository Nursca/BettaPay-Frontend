"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CurrencyDisplay } from '@/components/shared/CurrencyDisplay';
import { ArrowUpRight, ArrowDownRight, Wallet, Activity, CreditCard, RefreshCcw } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const mockChartData = [
  { name: 'Mon', total: 1200 },
  { name: 'Tue', total: 2100 },
  { name: 'Wed', total: 1800 },
  { name: 'Thu', total: 3200 },
  { name: 'Fri', total: 2800 },
  { name: 'Sat', total: 4100 },
  { name: 'Sun', total: 3800 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground mt-1">
          Here is what is happening with your BettaPay account today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-brand-surface border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Volume (30d)</CardTitle>
            <Activity className="h-4 w-4 text-brand-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-text-primary">
              <CurrencyDisplay amount={45231.89} />
            </div>
            <p className="text-xs text-brand-success flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-brand-surface border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Payment Links</CardTitle>
            <CreditCard className="h-4 w-4 text-brand-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-text-primary">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              +3 new links this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-brand-surface border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Available to Settle</CardTitle>
            <Wallet className="h-4 w-4 text-brand-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-text-primary">
              <CurrencyDisplay amount={12450.00} />
            </div>
            <p className="text-xs text-brand-error flex items-center mt-1">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              Pending NGN conversion
            </p>
          </CardContent>
        </Card>

        <Card className="bg-brand-surface border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current FX Rate</CardTitle>
            <RefreshCcw className="h-4 w-4 text-brand-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-text-primary">₦1,550 / USDC</div>
            <p className="text-xs text-muted-foreground mt-1">
              Updated 5 mins ago
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4 bg-brand-surface border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F0A500" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#F0A500" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    stroke="#94A3B8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#94A3B8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `$${value}`} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111D35', borderColor: '#1E2D4A', color: '#F0F4FF' }}
                    itemStyle={{ color: '#F0A500' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#F0A500" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorTotal)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-brand-surface border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center">
                  <div className="w-9 h-9 rounded-full bg-brand-surface-alt flex items-center justify-center mr-4">
                    <span className="text-xs text-muted-foreground font-mono">GBX{i}</span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none text-brand-text-primary">
                      Payment Received
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {i} hour{i > 1 ? 's' : ''} ago
                    </p>
                  </div>
                  <div className="text-sm font-medium text-brand-success">
                    +<CurrencyDisplay amount={150 * i} showDecimals={false} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
