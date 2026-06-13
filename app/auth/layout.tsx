import { ShieldCheck } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Pane - Form Area */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center relative p-6 sm:p-12 bg-white">
        {/* Logo */}
        <div className="absolute top-8 left-8 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-slate-900 text-lg">BettaPay</span>
        </div>

        {/* Content Wrapper */}
        <div className="w-full max-w-[440px]">
          {children}
        </div>
      </div>

      {/* Right Pane - Visual Area (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />

        {/* Branding Content */}
        <div className="relative z-10 p-16 max-w-xl">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">BettaPay</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Global settlement,{' '}
            <span className="text-amber-400">zero friction.</span>
          </h2>

          <p className="text-lg text-slate-400 leading-relaxed mb-10">
            Join thousands of modern businesses across Africa accepting USDC natively. Real-time fiat conversion via Stellar anchors, powered by trustless Soroban contracts.
          </p>

          <div className="flex items-center gap-4 text-sm font-medium">
            <span className="flex items-center gap-2 text-slate-400">
              <div className="w-2 h-2 rounded-full bg-green-400" /> System Operational
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">Soroban Testnet</span>
          </div>
        </div>
      </div>
    </div>
  );
}
