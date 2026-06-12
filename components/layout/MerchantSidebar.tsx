"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Link as LinkIcon, 
  ListOrdered, 
  Wallet, 
  RefreshCcw, 
  Settings, 
  Code2,
  ShieldCheck,
  Building2
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/payments', label: 'Payments', icon: LinkIcon },
  { href: '/transactions', label: 'Transactions', icon: ListOrdered },
  { href: '/settlement', label: 'Settlement', icon: Building2 },
  { href: '/wallet', label: 'Wallet', icon: Wallet },
  { href: '/fx', label: 'FX Rates', icon: RefreshCcw },
  { href: '/developers', label: 'Developers', icon: Code2 },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export const MerchantSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-sidebar border-r border-sidebar-border hidden md:flex">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-brand-accent flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-brand-primary" />
          </div>
          <span className="font-bold text-xl tracking-tight text-sidebar-foreground">BettaPay</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                  : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-brand-surface-alt flex items-center justify-center text-xs font-bold text-brand-text-primary">
            MC
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-sidebar-foreground">Merchant Corp</span>
            <span className="text-xs text-brand-success flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-success"></span>
              Verified
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
