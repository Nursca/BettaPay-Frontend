"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import dynamic from 'next/dynamic';

import { loginSchema, LoginFormValues } from '@/lib/utils/validation';
import { useAuthStore } from '@/lib/store/authStore';
import { useWalletStore } from '@/lib/store/walletStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const WalletModal = dynamic(() => import('@/components/wallet/WalletModal').then(m => m.WalletModal), { ssr: false });

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const { connect } = useWalletStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isWalletLoading, setIsWalletLoading] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const isMockAdmin = data.email.includes('admin');
      const role = isMockAdmin ? 'admin' : 'merchant';
      
      let merchantId = 'GCCHHKNI7GRA5QWC7RCTT3OHO7SKAUMKQA6IBWEQEO2SXI3GF376UHDD';
      let merchantName = isMockAdmin ? 'System Admin' : 'Merchant User';

      try {
        // Try fetching the seeded merchant from the backend
        const { apiClient } = await import('@/lib/api/axios');
        const response = await apiClient.get(`/api/merchants/${merchantId}`);
        if (response.data && !response.data.error) {
          merchantId = response.data.id;
          merchantName = response.data.name;
        }
      } catch {
        console.warn('Backend unavailable, falling back to mock auth for Vercel preview.');
      }

      const mockToken = 'mock_jwt_token_12345';
      const mockUser = {
        id: merchantId,
        email: data.email,
        name: merchantName,
        role,
      };

      // Ask the backend to set an HttpOnly auth cookie and store minimal user info client-side
      try {
        await fetch('/api/auth/session', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: mockToken, role }),
        });
      } catch (error) {
        // Backend unavailable; continue without setting insecure client cookies.
        console.warn('Auth session API unavailable; continuing without HttpOnly cookie.', error);
      }

      // Keep token in-memory for current session only (not persisted)
      login(mockToken, mockUser as import('@/lib/types').User);
      toast.success('Login successful');
      
      router.push(role === 'admin' ? '/overview' : '/dashboard');
    } catch (err) {
      console.error(err);
      toast.error('Failed to authenticate');
    } finally {
      setIsLoading(false);
    }
  };

  // When WalletModal reports a connected address, perform the merchant login flow
  const onWalletConnected = async (address: string) => {
    setIsWalletLoading(true);
    try {
      const mockToken = 'mock_jwt_token_12345';
      const role = 'merchant';
      try {
        await fetch('/api/auth/session', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: mockToken, role }),
        });
      } catch (error) {
        console.warn('Auth session API unavailable; continuing without HttpOnly cookie.', error);
      }

      login(mockToken, { 
        id: address, 
        email: `${address.substring(0,6)}...${address.slice(-4)}@freighter.app`, 
        name: 'Web3 Merchant', 
        role 
      });
      toast.success('Wallet connected & Logged in!');
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      toast.error('Failed to complete wallet-login flow');
    } finally {
      setIsWalletLoading(false);
    }
  };

  // kept for backward compatibility but no longer used directly
  const handleFreighterLogin = async () => {
    setIsWalletLoading(true);
    try {
      await connect();
      const address = useWalletStore.getState().address;
      if (address) {
        await onWalletConnected(address);
      } else {
        toast.error('Wallet connection was cancelled or Freighter is not installed.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to connect wallet');
    } finally {
      setIsWalletLoading(false);
    }
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <WalletModal open={walletModalOpen} onOpenChange={setWalletModalOpen} onConnected={onWalletConnected} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back</h1>
        <p className="text-slate-500 mt-2 text-base">Sign in to manage your payments</p>
      </div>

      <Card className="rounded-2xl bg-white border border-slate-200 shadow-sm">
        <CardHeader className="px-8 pt-8 pb-0">
          <div />
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-5 px-8 pt-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium text-sm">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@company.com" 
                  {...register('email')} 
                  className="bg-slate-50 h-11 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-amber-400/50 focus-visible:border-amber-400 transition-all rounded-lg"
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-slate-700 font-medium text-sm">Password</Label>
                  <Link href="#" className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  {...register('password')} 
                  className="bg-slate-50 h-11 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-amber-400/50 focus-visible:border-amber-400 transition-all rounded-lg"
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
              </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pb-8 pt-4 px-8">
            <Button 
              type="submit" 
              className="w-full h-11 text-base font-semibold bg-amber-500 text-white hover:bg-amber-600 shadow-md shadow-amber-500/20 transition-all rounded-lg" 
              disabled={isLoading || isWalletLoading}
            >
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
              Sign In
            </Button>
            
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-slate-400 font-medium tracking-wider">Or continue with</span>
              </div>
            </div>

            <Button 
              type="button" 
              variant="outline"
              className="w-full h-11 text-base font-medium bg-white border-slate-200 text-slate-700 hover:bg-slate-50 transition-all rounded-lg"
              onClick={() => setWalletModalOpen(true)}
              disabled={isLoading || isWalletLoading}
            >
              {isWalletLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
              Freighter Wallet
            </Button>

            <p className="text-sm text-center text-slate-500">
              Don&apos;t have an account?{' '}
              <Link href="/auth/register" className="text-blue-600 hover:text-blue-700 transition-colors font-semibold">
                Create one now
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
