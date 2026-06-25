"use client";

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

export function WalletModalFallback({ open, onOpenChange }: { open: boolean; onOpenChange?: (v: boolean) => void }) {
  if (!open) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Skeleton className="h-5 w-36 bg-slate-200" />
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-10 w-full bg-slate-200 rounded-lg" />
            <Skeleton className="h-10 w-full bg-slate-200 rounded-lg" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-3 w-full bg-slate-200" />
            <Skeleton className="h-3 w-5/6 bg-slate-200" />
          </div>
        </div>

        <DialogFooter>
          <Skeleton className="h-10 w-16 bg-slate-200 rounded-lg" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
