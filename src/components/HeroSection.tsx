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

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-8">
            The sovereign, gold-anchored settlement reserve and liquidity routing hub powering all decentralized projects on the <strong className="text-emerald-400 font-semibold">OMNEX Mainnet</strong>.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold mb-14">
            <a
              href="#network-diagram"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 font-bold hover:brightness-110 transition-all shadow-xl shadow-amber-500/20 flex items-center gap-2"
            >
              <span>Explore Ecosystem Map</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#liquidity-bridge"
              className="px-6 py-3.5 rounded-xl bg-[#0e1422] hover:bg-[#151e33] text-amber-300 border border-amber-500/30 transition-all flex items-center gap-2"
            >
              <ArrowRightLeft className="w-4 h-4 text-amber-400" />
              <span>Cross-Project Swap</span>
            </a>

            <button
              onClick={onOpenWhitepaper}
              className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-slate-400" />
              <span>Whitepaper & Specs</span>
            </button>
          </div>

          {/* Key Metric Highlights Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {/* Stat 1 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0c101a]/80 border border-amber-500/20 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-1.5 text-xs text-amber-400 font-mono mb-1">
                <Coins className="w-4 h-4 text-amber-400" />
                <span>GOLD PEG RATIO</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">1.00g</div>
              <div className="text-[11px] text-slate-400 mt-1">LBMA 999.9 Fine Gold</div>
            </div>

            {/* Stat 2 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0c101a]/80 border border-emerald-500/20 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-mono mb-1">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>CONNECTED CHAINS</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">8 Projects</div>
              <div className="text-[11px] text-slate-400 mt-1">GLBX, FLY, MILK, BLC...</div>
            </div>

            {/* Stat 3 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0c101a]/80 border border-amber-500/20 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-1.5 text-xs text-amber-400 font-mono mb-1">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>TOTAL RESERVE VALUE</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">{OMNEX_NETWORK_INFO.totalReserveValueUsd}</div>
              <div className="text-[11px] text-slate-400 mt-1">100% On-Chain Proof (PoR)</div>
            </div>

            {/* Stat 4 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0c101a]/80 border border-emerald-500/20 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-mono mb-1">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>OMNEX SPEED</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">0.85s</div>
              <div className="text-[11px] text-slate-400 mt-1">{OMNEX_NETWORK_INFO.tpsLive.toLocaleString()} TPS Live</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
