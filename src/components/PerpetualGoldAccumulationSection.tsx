import React, { useState } from 'react';
import { 
  Coins, 
  TrendingUp, 
  ShieldCheck, 
  Building2, 
  Infinity as InfinityIcon, 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  Lock, 
  ArrowRight,
  Calculator,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { PERPETUAL_GOLD_ACCUMULATION_DATA, OMNEX_NETWORK_INFO } from '../data/ecosystemData';
import { LdxgLogo } from './LdxgLogo';
import { ProjectBadge } from './ProjectBadge';

export const PerpetualGoldAccumulationSection: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('glbx');
  const [userLdxgBalance, setUserLdxgBalance] = useState<number>(2500);

  const selectedStream = PERPETUAL_GOLD_ACCUMULATION_DATA.revenueStreams.find(
    (s) => s.id === selectedProjectId
  ) || PERPETUAL_GOLD_ACCUMULATION_DATA.revenueStreams[0];

  // Calculations for holder's perpetual gold ownership
  // Base 1.00g + accumulation gives currently ~1.308g per LDXG
  const currentGramsPerLdxg = 1.308;
  const currentGoldPricePerGram = 74.85; // ~$2,328 / oz
  
  const userCurrentGoldGrams = (userLdxgBalance * currentGramsPerLdxg);
  const userCurrentGoldOz = (userCurrentGoldGrams / 31.1035);
  const userCurrentGoldValueUsd = userCurrentGoldGrams * currentGoldPricePerGram;

  // Projected 1-year, 3-year, and 5-year accumulation based on $391M annual profit gold acquisition across 64.28M circulating supply
  // Annual added gold per LDXG = 5,216,000g / 64,280,000 LDXG = ~0.0811g / LDXG / year
  const annualGoldGramsAddedPerLdxg = 0.0811;
  const projected1YrGrams = userLdxgBalance * (currentGramsPerLdxg + annualGoldGramsAddedPerLdxg);
  const projected3YrGrams = userLdxgBalance * (currentGramsPerLdxg + annualGoldGramsAddedPerLdxg * 3.4); // factoring compound ecosystem growth
  const projected5YrGrams = userLdxgBalance * (currentGramsPerLdxg + annualGoldGramsAddedPerLdxg * 6.5);

  return (
    <section id="perpetual-gold" className="py-20 relative overflow-hidden bg-gradient-to-b from-[#080d16] via-[#0d121f] to-[#080d16]">
      {/* Background ambient gold lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/10 border border-amber-500/40 text-amber-300 text-xs font-mono font-semibold mb-4 shadow-lg shadow-amber-500/10">
            <InfinityIcon className="w-4 h-4 text-amber-400" />
            <span>CORE ECONOMIC ARCHITECTURE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>ACCUMULATED FOREVER</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Perpetual Gold Accumulation <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">Engine</span>
          </h2>

          {/* User's Exact Core Manifesto Banner */}
          <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950/60 via-[#182032] to-amber-950/60 border-2 border-amber-500/50 shadow-2xl shadow-amber-500/10 text-left">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
              <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-400/40 shrink-0">
                <LdxgLogo size={42} withGlow={true} />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 tracking-wider uppercase block">
                  Fundamental Economic Sovereign Guarantee
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                  100% Of Accumulated Gold Belongs To LDXG Holders Forever
                </h3>
              </div>
            </div>

            <p className="text-base sm:text-lg text-amber-100/95 leading-relaxed font-medium bg-black/30 p-4 sm:p-5 rounded-2xl border border-amber-500/20">
              <span className="text-amber-400 font-bold">"LondonCoinGold</span> is based on accumulating physical gold where profits from <strong className="text-white">GLBX, BLC, KSB, FLY, FSC, MSA, MILK, and ASA</strong> are continuously converted into physical gold. The accumulated gold <strong className="text-amber-300 underline decoration-amber-400/60 decoration-2">belongs to the holders of LDXG</strong> which will be <strong className="text-white">accumulated forever."</strong>
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400 pt-2 border-t border-white/5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>LBMA London Good Delivery 999.9 Fine Gold Bullion</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400" />
                <span>Zero Founder Dilution • Irrevocable Smart Contract Treasury</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Vault Macro Indicators */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          <div className="p-5 rounded-2xl bg-[#0e1524] border border-amber-500/30 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase">Total Vaulted Gold</span>
              <Coins className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono">
              84,120 <span className="text-sm font-normal text-amber-400/80">kg</span>
            </div>
            <div className="text-xs text-slate-400 mt-1 font-mono">
              ≈ 2,704,530 Fine Troy Oz
            </div>
            <div className="mt-2.5 text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+14.8% YoY Reserve Expansion</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0e1524] border border-amber-500/30 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase">Current Gold Per LDXG</span>
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              1.308 <span className="text-sm font-normal text-slate-400">grams</span>
            </div>
            <div className="text-xs text-slate-400 mt-1 font-mono">
              Up from 1.00g Genesis Base
            </div>
            <div className="mt-2.5 text-[11px] font-semibold text-amber-400 flex items-center gap-1">
              <InfinityIcon className="w-3.5 h-3.5" />
              <span>Grows continuously forever</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0e1524] border border-amber-500/30 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase">Annual Profit Inflow</span>
              <Building2 className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-sky-300 font-mono">
              $391.2M <span className="text-sm font-normal text-slate-400">USD</span>
            </div>
            <div className="text-xs text-slate-400 mt-1 font-mono">
              From 8 Commercial Enterprises
            </div>
            <div className="mt-2.5 text-[11px] font-semibold text-slate-300 flex items-center gap-1">
              <span>≈ 5,216 kg Gold Bought / Year</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0e1524] border border-amber-500/30 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase">Physical Vault Valuation</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
              $6.34B <span className="text-sm font-normal text-slate-400">USD</span>
            </div>
            <div className="text-xs text-slate-400 mt-1 font-mono">
              London & Zurich Segregated Vaults
            </div>
            <div className="mt-2.5 text-[11px] font-semibold text-emerald-300 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Zero Debt • 100% Unencumbered</span>
            </div>
          </div>
        </div>

        {/* Interactive Inflow Matrix: 8 Allied Projects Fueling Perpetual Gold */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-[#0c121e] border border-white/10 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider mb-1">
                The 8 Revenue Feeder Streams
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                How Profits Stream From Allied Projects Into Physical Gold
              </h3>
            </div>
            <div className="text-xs font-mono text-slate-400 bg-white/5 px-3 py-2 rounded-xl border border-white/5">
              Select any project to inspect its gold purchase mechanism:
            </div>
          </div>

          {/* Project Selector Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 mb-8">
            {PERPETUAL_GOLD_ACCUMULATION_DATA.revenueStreams.map((proj) => {
              const isActive = selectedProjectId === proj.id;
              return (
                <button
                  key={proj.id}
                  onClick={() => setSelectedProjectId(proj.id)}
                  className={`p-3 rounded-2xl border transition-all text-left flex flex-col items-center justify-center gap-1.5 ${
                    isActive
                      ? 'bg-amber-500/20 border-amber-500 text-white shadow-lg shadow-amber-500/20 scale-[1.03]'
                      : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:border-white/10'
                  }`}
                >
                  <ProjectBadge id={proj.id} size="sm" highlighted={isActive} />
                  <span className="text-[11px] font-mono font-bold mt-1 text-amber-300">
                    {proj.contributionRate.split(' ')[0]} Profit
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Project Details Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#11192b] via-[#141e33] to-[#11192b] border border-amber-500/30">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <ProjectBadge id={selectedStream.id} size="lg" highlighted={true} />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-bold text-white">{selectedStream.name}</h4>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {selectedStream.contributionRate} To Gold
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                    {selectedStream.profitSource}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full lg:w-auto shrink-0 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-slate-400 text-[10px] block">EST. ANNUAL REVENUE SWEEP</span>
                  <span className="text-base font-bold text-emerald-400">{selectedStream.estAnnualUsd}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Automated smart contract</span>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-slate-400 text-[10px] block">ANNUAL GOLD PURCHASED</span>
                  <span className="text-base font-bold text-amber-300">{selectedStream.estAnnualGoldKg}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Physical bullion vaulted</span>
                </div>
              </div>
            </div>

            {/* Inflow visual bar */}
            <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-amber-200">
                <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
                <span>
                  <strong>Perpetual Cycle: </strong> 
                  Revenue generated in {selectedStream.token} is paired on OMNEX DEX, converted to LBMA bullion, and locked in the LDXG holder reserve forever.
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                Protocol standard: <span className="text-white">OMNEX-GOLD-ACCUM-V2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Holder Gold Calculator: "My Share of the Perpetual Gold" */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#101728] to-[#0d121f] border border-amber-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold mb-2">
                <Calculator className="w-4 h-4" />
                <span>PORTFOLIO ACCUMULATION CALCULATOR</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                Your Share of the Perpetual Gold Treasury
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Calculate your exact physical gold grams ownership and watch how your gold holdings grow continuously over time as the 8 projects scale enterprise revenue.
              </p>

              {/* Input for LDXG Balance */}
              <div className="mb-6">
                <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
                  Enter Your LDXG Token Holdings:
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    step="100"
                    value={userLdxgBalance}
                    onChange={(e) => setUserLdxgBalance(Math.max(1, Number(e.target.value) || 0))}
                    className="w-full pl-4 pr-24 py-3.5 rounded-2xl bg-black/60 border border-amber-500/40 text-white font-mono text-lg font-bold focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold font-mono">
                    <LdxgLogo size={18} />
                    <span>LDXG</span>
                  </div>
                </div>

                {/* Preset quick buttons */}
                <div className="flex items-center gap-2 mt-2.5">
                  {[500, 1000, 2500, 5000, 10000, 25000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setUserLdxgBalance(amt)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                        userLdxgBalance === amt 
                          ? 'bg-amber-500 text-black font-bold' 
                          : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {amt.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Current Real-Time Gold Ownership Output */}
            <div className="p-5 rounded-2xl bg-black/50 border border-amber-500/40 font-mono">
              <span className="text-[10px] text-amber-400 uppercase block font-bold mb-1">
                Your Current Physical Gold Grams Owned:
              </span>
              <div className="text-3xl font-extrabold text-amber-300">
                {userCurrentGoldGrams.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-base font-normal text-amber-400">g Fine Gold</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-300 mt-2 pt-2 border-t border-white/10">
                <span>Weight in Troy Ounces:</span>
                <span className="font-bold text-white">{userCurrentGoldOz.toFixed(2)} oz</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-300 mt-1">
                <span>Gold Bullion Valuation:</span>
                <span className="font-bold text-emerald-400">${userCurrentGoldValueUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })} USD</span>
              </div>
            </div>
          </div>

          {/* Perpetual Trajectory Cards */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4">
            <div className="p-6 rounded-3xl bg-[#0c121e] border border-white/10 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-base font-bold text-white">
                    Perpetual Trajectory (Accumulated Forever)
                  </h4>
                  <p className="text-xs text-slate-400">
                    Projected expansion of your physical gold reserve as GLBX, BLC, KSB, FLY, FSC, MSA, MILK, and ASA generate commercial revenue:
                  </p>
                </div>
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
                {/* 1-Year Horizon */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400">1-YEAR HORIZON</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">+0.081g / token</span>
                  </div>
                  <div className="text-xl font-bold text-white">
                    {projected1YrGrams.toLocaleString(undefined, { maximumFractionDigits: 1 })} g
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1">
                    ≈ ${(projected1YrGrams * currentGoldPricePerGram).toLocaleString(undefined, { maximumFractionDigits: 0 })} USD
                  </div>
                </div>

                {/* 3-Year Horizon */}
                <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400">3-YEAR HORIZON</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">Scaling Multiplier</span>
                  </div>
                  <div className="text-xl font-bold text-amber-300">
                    {projected3YrGrams.toLocaleString(undefined, { maximumFractionDigits: 1 })} g
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1">
                    ≈ ${(projected3YrGrams * currentGoldPricePerGram).toLocaleString(undefined, { maximumFractionDigits: 0 })} USD
                  </div>
                </div>

                {/* 5-Year Horizon */}
                <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/50 shadow-lg shadow-amber-500/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400">5-YEAR HORIZON</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-400/20 text-yellow-300 font-bold">Mature Network</span>
                  </div>
                  <div className="text-xl font-bold text-yellow-300">
                    {projected5YrGrams.toLocaleString(undefined, { maximumFractionDigits: 1 })} g
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1">
                    ≈ ${(projected5YrGrams * currentGoldPricePerGram).toLocaleString(undefined, { maximumFractionDigits: 0 })} USD
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Pillars of Perpetual Accumulation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {PERPETUAL_GOLD_ACCUMULATION_DATA.accumulationPillars.map((pillar, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/5 text-xs">
                  <div className="flex items-center gap-2 font-bold text-amber-300 mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{pillar.title}</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Global Vault Custody & Auditing Proof */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="text-slate-400">Vault Custody Partners:</span>
              <div className="text-white font-bold flex flex-wrap gap-2 mt-0.5">
                <span className="px-2 py-0.5 rounded bg-white/10">LBMA London Vaults (Brink's)</span>
                <span className="px-2 py-0.5 rounded bg-white/10">Malca-Amit Zurich High Security</span>
                <span className="px-2 py-0.5 rounded bg-white/10">Le Freeport Singapore</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Quarterly Physical Weight Audits & Merkle Proofs on OMNEX</span>
          </div>
        </div>
      </div>
    </section>
  );
};
