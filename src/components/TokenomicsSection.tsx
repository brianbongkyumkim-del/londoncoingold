import React from 'react';
import { 
  ShieldCheck, 
  Coins, 
  Lock, 
  FileCheck2, 
  Layers, 
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { TOKENOMICS_DISTRIBUTION, OMNEX_NETWORK_INFO } from '../data/ecosystemData';

export const TokenomicsSection: React.FC = () => {
  return (
    <section id="tokenomics" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>GOLD RESERVE & TOKENOMICS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          LondonCoinGold (LDXG) Reserve Backing
        </h2>
        <p className="text-slate-400 mt-3 text-sm sm:text-base leading-relaxed">
          Unlike unbacked or synthetic algorithmic stable tokens, each LondonCoinGold (LDXG) token is backed 1:1 by audited physical fine gold (1.00g LBMA Good Delivery) in segregated institutional vaults.
        </p>
      </div>

      {/* Gold Reserve Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="p-6 rounded-3xl bg-[#0c101a] border border-amber-500/20">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
            <Coins className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">LBMA 999.9 Fine Bullion</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Allocated gold bars adhering to the London Bullion Market Association (LBMA) standard, individually serialized with on-chain bar list certificates.
          </p>
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-500">Purity Spec:</span>
            <span className="text-amber-300 font-bold">99.99% Fine Gold</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[#0c101a] border border-emerald-500/20">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">Dual-Vault Segregated Custody</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Gold reserves are secured in class-3 deep subterranean vaults in London (UK) and Zurich (Switzerland) with 100% Lloyds of London underwritten insurance.
          </p>
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-500">Custody Audit:</span>
            <span className="text-emerald-300 font-bold">Quarterly Inspectorate</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[#0c101a] border border-sky-500/20">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-4">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">Real-Time Proof of Reserve (PoR)</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Automated cryptographic oracle feeds verify vault balances against circulating OMNEX supply every 15 minutes, published transparently on-chain.
          </p>
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-500">Reserve Ratio:</span>
            <span className="text-sky-300 font-bold">103.4% Over-collateralized</span>
          </div>
        </div>
      </div>

      {/* Distribution Breakdown */}
      <div className="p-8 rounded-3xl bg-[#0b0f19] border border-amber-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-white/10 gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">LDXG Token Distribution (100,000,000 Total Supply)</h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">Fixed Supply Cap • Minting Prohibited • Deflationary Buyback Engine</p>
          </div>
          <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300">
            Current Circulating: {OMNEX_NETWORK_INFO.ldxgCirculatingSupply}
          </span>
        </div>

        {/* Stacked Visual Bar */}
        <div className="h-6 w-full rounded-full overflow-hidden flex shadow-inner bg-slate-900 mb-8">
          {TOKENOMICS_DISTRIBUTION.map((item, idx) => (
            <div
              key={idx}
              style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
              className="h-full hover:brightness-125 transition-all cursor-pointer relative group"
              title={`${item.name}: ${item.percentage}%`}
            />
          ))}
        </div>

        {/* Breakdown Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
          {TOKENOMICS_DISTRIBUTION.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.name}
                  </span>
                  <span className="font-mono font-bold text-amber-400 text-sm">{item.percentage}%</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed mb-3">
                  {item.desc}
                </p>
              </div>
              <div className="pt-2 border-t border-white/5 font-mono text-slate-300 font-medium">
                {item.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
