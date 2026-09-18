import React from 'react';
import { ShieldCheck, Coins, ExternalLink, Globe, Github, Twitter, Disc as Discord } from 'lucide-react';
import { OMNEX_NETWORK_INFO } from '../data/ecosystemData';
import { LdxgLogo } from './LdxgLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#06080d] text-slate-400 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <LdxgLogo size={36} className="shadow-md" />
              <div>
                <span className="font-serif-gold font-bold text-white text-base">LondonCoinGold</span>
                <span className="text-amber-400 font-mono font-bold text-xs ml-1.5">(LDXG)</span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm text-xs">
              The sovereign, 1:1 physical gold-backed reserve and universal liquidity settlement backbone deployed natively on the <strong>OMNEX Mainnet Layer-1</strong>.
            </p>

            <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>OMNEX Mainnet v2.4 Active • 128 Global Validators</span>
            </div>
          </div>

          {/* Col 2: Ecosystem Projects */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs font-mono uppercase tracking-wider">
              Connected Chains
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#projects" className="hover:text-amber-300 transition-colors">GLBX (LDXT/LDXU)</a></li>
              <li><a href="#projects" className="hover:text-amber-300 transition-colors">BLC (Business Ledger)</a></li>
              <li><a href="#projects" className="hover:text-amber-300 transition-colors">KSB (Keyto Banking)</a></li>
              <li><a href="#projects" className="hover:text-amber-300 transition-colors">FlySafe (FLY)</a></li>
              <li><a href="#projects" className="hover:text-amber-300 transition-colors">FSC (Financial Chain)</a></li>
              <li><a href="#projects" className="hover:text-amber-300 transition-colors">MeSocialize (MSZ)</a></li>
              <li><a href="#projects" className="hover:text-amber-300 transition-colors">FirstPure PureFerma (MILK)</a></li>
              <li><a href="#projects" className="hover:text-amber-300 transition-colors">AISA (AI Smart Assets)</a></li>
            </ul>
          </div>

          {/* Col 3: OMNEX Mainnet */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs font-mono uppercase tracking-wider">
              OMNEX Network
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#omnex-mainnet" className="hover:text-emerald-400 transition-colors">Mainnet Explorer</a></li>
              <li><a href="#omnex-mainnet" className="hover:text-emerald-400 transition-colors">Validator Telemetry</a></li>
              <li><a href="#liquidity-bridge" className="hover:text-emerald-400 transition-colors">Liquidity Bridge</a></li>
              <li><a href="#tokenomics" className="hover:text-emerald-400 transition-colors">Proof-of-Reserve (PoR)</a></li>
              <li><a href="#tokenomics" className="hover:text-emerald-400 transition-colors">LBMA Bullion Custody</a></li>
            </ul>
          </div>

          {/* Col 4: Resources */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs font-mono uppercase tracking-wider">
              Resources & Developers
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-amber-300 transition-colors">OMNEX-20 Standard</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">TypeScript SDK</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Solidity Router ABI</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Security Audits</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Brand Assets & Logos</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & disclaimers */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} LondonCoinGold (LDXG) & OMNEX Mainnet Foundation. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              1.00g Fine Gold LBMA Backed
            </span>
            <span className="hover:underline cursor-pointer">Terms of Settlement</span>
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
