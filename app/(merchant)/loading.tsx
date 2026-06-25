import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function MerchantLoading() {
  return (
    <div className="space-y-8 pb-8">
      {/* Welcome Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          {/* Tagline */}
          <Skeleton className="h-3 w-28 bg-slate-200" />
          {/* Title */}
          <Skeleton className="h-9 w-64 bg-slate-200" />
          {/* Subtitle */}
          <Skeleton className="h-4 w-96 bg-slate-200 max-w-full" />
        </div>
        <div>
          {/* Header Action Button */}
          <Skeleton className="h-10 w-44 rounded-xl bg-slate-200" />
        </div>
      </div>

      {/* KPI Stat Cards Skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="border border-slate-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-3 w-24 bg-slate-200" />
              <Skeleton className="h-8 w-8 rounded-lg bg-slate-200" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-8 w-32 bg-slate-200" />
              <Skeleton className="h-3.5 w-28 bg-slate-200" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts + Recent Transactions Skeleton */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Revenue Chart Card */}
        <Card className="lg:col-span-4 border border-slate-200 bg-white shadow-sm">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-36 bg-slate-200" />
                <Skeleton className="h-3 w-56 bg-slate-200" />
              </div>
              <Skeleton className="h-7 w-28 bg-slate-200" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Chart Area Placeholder */}
            <Skeleton className="h-[260px] w-full bg-slate-100/70" />
            <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-16 bg-slate-200" />
                <Skeleton className="h-4 w-28 bg-slate-200" />
              </div>
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-16 bg-slate-200" />
                <Skeleton className="h-4 w-20 bg-slate-200" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions Card */}
        <Card className="lg:col-span-3 border border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-28 bg-slate-200" />
              <Skeleton className="h-6 w-16 bg-slate-200" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="w-9 h-9 rounded-xl bg-slate-200 flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3.5 w-full max-w-[140px] bg-slate-200" />
                    <Skeleton className="h-3 w-full max-w-[100px] bg-slate-200" />
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <Skeleton className="h-3.5 w-12 bg-slate-200" />
                    <Skeleton className="h-4.5 w-16 rounded-full bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions + Payment Link Performance Skeleton */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Quick Actions Card */}
        <Card className="lg:col-span-3 border border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <Skeleton className="h-4 w-24 bg-slate-200" />
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                <Skeleton className="w-5 h-5 rounded-md bg-slate-200" />
                <Skeleton className="h-3 w-20 bg-slate-200" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Payment Link Performance Card */}
        <Card className="lg:col-span-4 border border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-44 bg-slate-200" />
              <Skeleton className="h-6 w-16 bg-slate-200" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-slate-100">
                  <Skeleton className="w-10 h-10 rounded-xl bg-slate-200 flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3.5 w-28 bg-slate-200" />
                    <Skeleton className="h-3 w-36 bg-slate-200" />
                    <div className="flex items-center gap-2 mt-1">
                      <Skeleton className="flex-1 h-1.5 rounded-full bg-slate-200" />
                      <Skeleton className="h-3 w-6 bg-slate-200" />
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <Skeleton className="h-3.5 w-8 bg-slate-200" />
                    <Skeleton className="h-3 w-14 bg-slate-200" />
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
