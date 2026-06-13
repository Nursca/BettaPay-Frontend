"use client";

import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="w-full border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between h-16">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <Link href="/" className="text-lg font-bold text-slate-900">BettaPay</Link>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-500">
          <Link href="#features" className="hover:text-slate-900 transition-colors">Features</Link>
          <Link href="#developers" className="hover:text-slate-900 transition-colors">Developers</Link>
          <Link href="#company" className="hover:text-slate-900 transition-colors">Company</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/auth/login">
            <Button variant="ghost" className="text-slate-600 hover:text-slate-900 font-medium">Log in</Button>
          </Link>
          <Link href="/auth/register">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-sm shadow-amber-500/20">Get started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
