import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  ArrowRightLeft, 
  Coins, 
  Layers, 
  Zap, 
  Globe, 
  FileText 
} from 'lucide-react';
import { OMNEX_NETWORK_INFO } from '../data/ecosystemData';
import { LdxgLogo } from './LdxgLogo';

interface HeroSectionProps {
  onOpenWhitepaper: () => void;
  onOpenDeveloperModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenWhitepaper,
  onOpenDeveloperModal,
}) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] bg-gradient-to-b from-amber-500/10 via-emerald-500/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Authentic LDXG Logo Emblem */}
          <div className="flex justify-center mb-6">
            <div className="relative group">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-amber-500/30 via-yellow-400/40 to-amber-600/30 blur-xl group-hover:blur-2xl transition-all pointer-events-none" />
              <div className="relative p-1.5 rounded-full bg-gradient-to-tr from-amber-500/40 via-yellow-400/30 to-amber-600/40 border border-amber-400/40 shadow-2xl shadow-amber-500/20">
                <LdxgLogo size={76} className="transform group-hover:scale-105 transition-transform duration-300" />
              </div>
            </div>
          </div>

          {/* Mainnet badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-950/80 via-[#0d171b] to-amber-950/80 border border-amber-500/30 text-xs font-mono text-amber-300 mb-6 shadow-lg shadow-amber-500/5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-semibold text-emerald-300">OMNEX Mainnet</span>
            <span className="text-slate-600">|</span>
            <span>Enterprise Layer-1 Multi-Project Backbone</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-display mb-6 leading-[1.1]">
            LondonCoinGold{' '}
            <span className="font-serif-gold font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-600">
              (LDXG)
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto font-normal leading-relaxed mb-4">
            LondonCoinGold is built on <strong className="text-amber-300 font-semibold">perpetually accumulating physical gold</strong>, funded by enterprise profits from <strong className="text-white">GLBX, BLC, KSB, FLY, FSC, MSA, MILK, and ASA</strong> on the OMNEX Mainnet.
          </p>

          <p className="text-sm sm:text-base text-amber-200/90 font-medium max-w-2xl mx-auto mb-8 bg-amber-500/10 py-2 px-4 rounded-xl border border-amber-500/30">
            All accumulated physical gold <strong className="text-white underline decoration-amber-400">belongs 100% to the holders of LDXG</strong> and will be <strong className="text-white">accumulated forever</strong>.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold mb-14">
            <a
              href="#perpetual-gold"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 font-bold hover:brightness-110 transition-all shadow-xl shadow-amber-500/20 flex items-center gap-2"
            >
              <Coins className="w-4 h-4" />
              <span>Perpetual Gold Engine</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#holders-ownership"
              className="px-6 py-3.5 rounded-xl bg-[#0e1422] hover:bg-[#151e33] text-amber-300 border border-amber-500/30 transition-all flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>10% Sovereign Allocation</span>
            </a>

            <a
              href="#network-diagram"
              className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-all flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-slate-400" />
              <span>Ecosystem Map</span>
            </a>

            <button
              onClick={onOpenWhitepaper}
              className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-slate-400" />
              <span>Whitepaper</span>
            </button>
          </div>

          {/* Key Metric Highlights Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {/* Stat 1 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0c101a]/80 border border-amber-500/30 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-1.5 text-xs text-amber-400 font-mono mb-1">
                <Coins className="w-4 h-4 text-amber-400" />
                <span>GOLD PER TOKEN</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-amber-300">1.308g+</div>
              <div className="text-[11px] text-slate-400 mt-1">Accumulated Forever</div>
            </div>

            {/* Stat 2 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0c101a]/80 border border-emerald-500/20 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-mono mb-1">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>PROFIT FEEDERS</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">8 Projects</div>
              <div className="text-[11px] text-slate-400 mt-1">GLBX, BLC, KSB, FLY...</div>
            </div>

            {/* Stat 3 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0c101a]/80 border border-amber-500/30 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-1.5 text-xs text-amber-400 font-mono mb-1">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>VAULTED PHYSICAL GOLD</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">84,120 kg</div>
              <div className="text-[11px] text-emerald-400 mt-1">$6.34B USD in LBMA Vaults</div>
            </div>

            {/* Stat 4 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0c101a]/80 border border-emerald-500/20 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-mono mb-1">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>HOLDER OWNERSHIP</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400">100%</div>
              <div className="text-[11px] text-slate-400 mt-1">Deeded to LDXG Holders</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
