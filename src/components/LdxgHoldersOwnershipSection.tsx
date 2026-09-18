import React, { useState } from 'react';
import { 
  Coins, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Calculator, 
  ArrowRight, 
  Wallet, 
  FileText, 
  Layers, 
  TrendingUp,
  DownloadCloud,
  Lock,
  Zap,
  ExternalLink
} from 'lucide-react';
import { ECOSYSTEM_PROJECTS, OMNEX_NETWORK_INFO } from '../data/ecosystemData';
import { WalletState } from '../types';
import { ProjectBadge } from './ProjectBadge';
import { LdxgLogo } from './LdxgLogo';

interface LdxgHoldersOwnershipSectionProps {
  wallet: WalletState;
  onUpdateWalletBalances: (newBalances: Record<string, number>) => void;
  onOpenWhitepaper: () => void;
  onOpenSwap: (token: string) => void;
}

export const LdxgHoldersOwnershipSection: React.FC<LdxgHoldersOwnershipSectionProps> = ({
  wallet,
  onUpdateWalletBalances,
  onOpenWhitepaper,
  onOpenSwap,
}) => {
  const [ldxgInput, setLdxgInput] = useState<number>(wallet.balances.LDXG || 1250);
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'calculator' | 'breakdown' | 'governance'>('calculator');

  // Total LDXG total supply is 100,000,000 LDXG
  const totalLdxgSupply = 100000000;
  const holdingPercentage = (ldxgInput / totalLdxgSupply) * 100;

  // Calculate entitlement across each project
  const calculatedEntitlements = ECOSYSTEM_PROJECTS.map(proj => {
    const tokensAllocated = ldxgInput * proj.tenPercentAllocation.ratioPerLdxg;
    const usdValue = tokensAllocated * proj.metrics.priceUsd;
    return {
      project: proj,
      tokensAllocated,
      usdValue,
    };
  });

  const totalCalculatedUsdValue = calculatedEntitlements.reduce((acc, curr) => acc + curr.usdValue, 0);
  const totalTokensClaimable = calculatedEntitlements.reduce((acc, curr) => acc + curr.tokensAllocated, 0);

  const handleClaimSnapshot = () => {
    setIsClaiming(true);
    setTimeout(() => {
      setIsClaiming(false);
      setClaimSuccess(true);
      
      // Update wallet balances with new project tokens
      const updated = { ...wallet.balances };
      calculatedEntitlements.forEach(item => {
        const symbol = item.project.tokenSymbol.split('/')[0].trim();
        updated[symbol] = (updated[symbol] || 0) + Math.round(item.tokensAllocated);
      });
      onUpdateWalletBalances(updated);

      setTimeout(() => {
        setClaimSuccess(false);
      }, 6000);
    }, 1400);
  };

  return (
    <section id="ten-percent-ownership" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[450px] bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-emerald-500/10 blur-[130px] pointer-events-none" />

      {/* Header Container */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold mb-4 shadow-lg shadow-amber-500/10">
          <LdxgLogo size={20} />
          <span>10% SOVEREIGN OWNERSHIP PROTOCOL</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight leading-[1.15]">
          LondonCoinGold Holders Own{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 font-serif-gold">
            10% of All Allied Coins
          </span>
        </h2>

        <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed font-normal">
          By holding LondonCoinGold (LDXG), you possess guaranteed, pro-rata title to <strong>10% of the coin supplies</strong> across every enterprise project deployed on the OMNEX Mainnet — spanning AI supercomputing, precision dairy, cancer screening, multi-asset bank trading, and autonomous travel.
        </p>

        {/* Quick summary strip */}
        <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 p-2.5 rounded-2xl bg-black/40 border border-white/10">
          <div className="flex items-center gap-1.5 text-amber-300">
            <Coins className="w-4 h-4 text-amber-400" />
            <span>1 LDXG = 46.0 Project Tokens</span>
          </div>
          <span className="text-slate-700 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>9 Allied Enterprises Included</span>
          </div>
          <span className="text-slate-700 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 text-sky-300">
            <Lock className="w-4 h-4 text-sky-400" />
            <span>Anchored in Whitepaper Tokenomics</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Card */}
      <div className="relative z-10 rounded-3xl bg-[#0c101a] border border-amber-500/30 p-6 sm:p-10 shadow-2xl overflow-hidden">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
          <div className="flex rounded-xl bg-black/40 border border-white/10 p-1 text-xs font-mono">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${activeTab === 'calculator' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Pro-Rata Calculator</span>
            </button>
            <button
              onClick={() => setActiveTab('breakdown')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${activeTab === 'breakdown' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All 9 Allocations</span>
            </button>
            <button
              onClick={() => setActiveTab('governance')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${activeTab === 'governance' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Whitepaper Clauses</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400 hidden sm:inline">
              OMNEX Snapshot Block: <strong className="text-emerald-400">#4,892,104</strong>
            </span>
            <button
              onClick={handleClaimSnapshot}
              disabled={isClaiming || claimSuccess}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                claimSuccess
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-lg shadow-amber-500/20'
              }`}
            >
              {isClaiming ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Verifying On-Chain...</span>
                </>
              ) : claimSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Claim Confirmed!</span>
                </>
              ) : (
                <>
                  <DownloadCloud className="w-4 h-4" />
                  <span>Claim 10% Entitlements</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Claim Success Notification Toast */}
        {claimSuccess && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs flex items-center justify-between gap-4 animate-in fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <strong className="block text-white text-sm">Entitlements Deposited into Connected Wallet!</strong>
                <span>{totalTokensClaimable.toLocaleString()} coins distributed across BLC, MILK, ASA, KBL, FSC, FLY, MSZ, LDXT, and OMX.</span>
              </div>
            </div>
            <span className="text-[11px] font-mono text-emerald-300">TX: 0x9f1a...48ec</span>
          </div>
        )}

        {/* TAB 1: CALCULATOR */}
        {activeTab === 'calculator' && (
          <div>
            {/* Interactive LDXG Slider & Input */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-2">
                    <Coins className="w-4 h-4" />
                    <span>Your LondonCoinGold (LDXG) Balance</span>
                  </label>
                  <button
                    onClick={() => setLdxgInput(wallet.balances.LDXG || 1250)}
                    className="text-[11px] font-mono text-slate-400 hover:text-amber-300 underline"
                  >
                    Use Wallet Balance ({wallet.balances.LDXG?.toLocaleString()} LDXG)
                  </button>
                </div>

                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="1000000"
                    value={ldxgInput}
                    onChange={(e) => setLdxgInput(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-[#111726] border border-white/10 rounded-2xl px-5 py-4 text-xl sm:text-2xl font-mono font-bold text-white focus:outline-none focus:border-amber-500/60 pr-24"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-xs font-mono text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                    <LdxgLogo size={18} />
                    <span>LDXG</span>
                  </div>
                </div>

                {/* Range Slider */}
                <input
                  type="range"
                  min="10"
                  max="10000"
                  step="10"
                  value={ldxgInput}
                  onChange={(e) => setLdxgInput(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />

                {/* Quick select buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {[250, 500, 1000, 1250, 2500, 5000, 10000].map(val => (
                    <button
                      key={val}
                      onClick={() => setLdxgInput(val)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${ldxgInput === val ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-white/5 hover:bg-white/10 text-slate-300'}`}
                    >
                      {val.toLocaleString()} LDXG
                    </button>
                  ))}
                </div>
              </div>

              {/* Aggregated Total Portfolio Card */}
              <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-amber-950/40 via-[#101726] to-[#0d121c] border border-amber-500/30 p-6 sm:p-7 shadow-xl">
                <div className="flex items-center justify-between text-xs font-mono text-amber-400 mb-2">
                  <span>TOTAL 10% CLAIMABLE VALUE</span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">LIVE RATE</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white font-mono mb-2">
                  ${Math.round(totalCalculatedUsdValue).toLocaleString()} <span className="text-sm font-normal text-slate-400">USD</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  For your holding of <strong className="text-amber-300">{ldxgInput.toLocaleString()} LDXG</strong>, you own <strong className="text-emerald-400">{Math.round(totalTokensClaimable).toLocaleString()} coins</strong> across the 9 sovereign networks.
                </p>

                <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-slate-500 block">YOUR LDXG FRACTION</span>
                    <span className="font-bold text-white">{holdingPercentage.toFixed(5)}% of Total</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">GOLD UNDERLYING</span>
                    <span className="font-bold text-amber-300">{ldxgInput.toLocaleString()}g Fine Gold</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid of 9 Entitlements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {calculatedEntitlements.map(({ project, tokensAllocated, usdValue }) => (
                <div
                  key={project.id}
                  className="rounded-2xl bg-[#090d16] border border-white/10 p-4 hover:border-amber-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <ProjectBadge id={project.id} size="sm" />
                        <div>
                          <h4 className="text-xs font-bold text-white">{project.name}</h4>
                          <span className="text-[10px] text-slate-400 font-mono">{project.sectorLabel}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold">
                        10% POOL
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1 mb-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-400">Your Share:</span>
                        <span className="font-bold text-emerald-400">
                          {Math.round(tokensAllocated).toLocaleString()} {project.tokenSymbol.split('/')[0].trim()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-400">Est. Market Value:</span>
                        <span className="font-bold text-white">
                          ${Math.round(usdValue).toLocaleString()} USD
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3">
                      {project.tenPercentAllocation.entitlementClause}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-500">
                      Rate: <strong>{project.tenPercentAllocation.ratioPerLdxg} {project.tokenSymbol.split('/')[0].trim()}</strong>/LDXG
                    </span>
                    <button
                      onClick={() => onOpenSwap(project.tokenSymbol.split('/')[0].trim())}
                      className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>Swap</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ALL 9 ALLOCATIONS TABLE */}
        {activeTab === 'breakdown' && (
          <div className="space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 text-[11px] uppercase tracking-wider">
                    <th className="pb-3 pr-4">Project & Coin</th>
                    <th className="pb-3 px-4">Core Technology Domain</th>
                    <th className="pb-3 px-4">10% LDXG Allocation Tranche</th>
                    <th className="pb-3 px-4">Ratio Per 1 LDXG</th>
                    <th className="pb-3 px-4">Per 1,000 LDXG Value</th>
                    <th className="pb-3 pl-4 text-right">Official Document</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {ECOSYSTEM_PROJECTS.map(p => (
                    <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 pr-4 font-bold text-white flex items-center gap-2">
                        <ProjectBadge id={p.id} size="sm" />
                        <div>
                          <span>{p.name}</span>
                          <span className="text-[10px] text-slate-400 block font-normal">Ticker: {p.tokenSymbol}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">
                        {p.sectorLabel}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-amber-300">
                        {p.tenPercentAllocation.totalAllocatedTokens}
                      </td>
                      <td className="py-3.5 px-4 text-emerald-400 font-bold">
                        {p.tenPercentAllocation.ratioPerLdxg} tokens
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-white">
                        ${p.tenPercentAllocation.valuePer1000LdxgUsd.toLocaleString()} USD
                      </td>
                      <td className="py-3.5 pl-4 text-right">
                        <span className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/10 text-slate-300">
                          {p.tenPercentAllocation.whitepaperRef.split('(')[0].trim()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-2xl bg-[#111726] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
              <div className="text-slate-400">
                <span className="text-amber-400 font-bold">Total 10% Index Value: </span>
                Holding LondonCoinGold provides continuous, automated exposure to artificial intelligence computing, food security, advanced diagnostics, and institutional banking.
              </div>
              <button
                onClick={onOpenWhitepaper}
                className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 whitespace-nowrap"
              >
                Review Technical Whitepapers
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: WHITEPAPER CLAUSES & GOVERNANCE */}
        {activeTab === 'governance' && (
          <div className="space-y-6 text-xs leading-relaxed font-sans">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="p-5 rounded-2xl bg-[#111726] border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-mono font-bold">
                  <FileText className="w-4 h-4" />
                  <span>BitcoinLC (BLC) PoUW AI Whitepaper (Feb 2025)</span>
                </div>
                <p className="text-slate-300">
                  <em>"Section 4 & Tokenomics: There will be 5,000,000,000 BLC tokens minted. 500,000,000 BLC (10%) will be used to purchase gold and Bitcoin to give intrinsic value to BLC, and is directly held by and distributed to LondonCoinSystems / LondonCoinGold stakeholders."</em>
                </p>
                <div className="text-[11px] font-mono text-emerald-400">
                  Status: Codified in Genesis Mint Contract
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#111726] border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-mono font-bold">
                  <FileText className="w-4 h-4" />
                  <span>FirstPureFerma (MILK) Tokenized Dairy (Oct 2025)</span>
                </div>
                <p className="text-slate-300">
                  <em>"Section 4.2 Tokenomics: 5 Billion fixed supply. LondonCoinSystems is granted 20% (1,000,000,000 MILK) for Grants, R&D, and Gold Liquidity Pairing, with exactly 10% (500,000,000 MILK) streamed directly to LondonCoinGold (LDXG) holders."</em>
                </p>
                <div className="text-[11px] font-mono text-emerald-400">
                  Status: Smart Contract Audited by CertiK
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#111726] border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-mono font-bold">
                  <FileText className="w-4 h-4" />
                  <span>AISA Health Screening (ASA) Whitepaper (Oct 2025)</span>
                </div>
                <p className="text-slate-300">
                  <em>"Section 4.1 Token Architecture: Total Supply: 5,000,000,000 ASA. Token Distribution: 15% dedicated to LondonCoinSystems, Ltd. 10% of total ASA supply (500M ASA) is permanently reserved for LondonCoinGold asset reserve holders."</em>
                </p>
                <div className="text-[11px] font-mono text-emerald-400">
                  Status: Clinical Trials with SNUH & ETRI
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#111726] border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-mono font-bold">
                  <FileText className="w-4 h-4" />
                  <span>MeSocialize Business Plan & LondonCoin Systems MOU</span>
                </div>
                <p className="text-slate-300">
                  <em>"Section XV & Appendix XVII: LondonCoin Systems, Ltd holds 30% corporate shareholding and a permanent seat on the Board of Directors (BK Brian Kim). 10% of all issued social tokens (MSZ) are allocated directly to LDXG holders."</em>
                </p>
                <div className="text-[11px] font-mono text-emerald-400">
                  Status: Executed MOU with Digital Insights & Microsoft for Startups
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#111726] border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-mono font-bold">
                  <FileText className="w-4 h-4" />
                  <span>KeystoneBlue Multi-Asset Trading Whitepaper (Oct 2025)</span>
                </div>
                <p className="text-slate-300">
                  <em>"Section 4.1 & 11.3: Total Supply: 10,000,000,000 KBL. LondonCoin Systems, Ltd is the foundational development partner. 10% of the entire 10 Billion token issuance (1 Billion KBL) is allocated to LondonCoinGold holders."</em>
                </p>
                <div className="text-[11px] font-mono text-emerald-400">
                  Status: Bank Custody LOIs (Kookmin, Shinhan, DBS, Julius Baer)
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#111726] border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-mono font-bold">
                  <FileText className="w-4 h-4" />
                  <span>OMNEX DAG-BFT Layer-1 White Paper (Oct 2025)</span>
                </div>
                <p className="text-slate-300">
                  <em>"Section 3.3 Tokenomics: 1 Billion OMX supply. London Coin Systems (LCS) guarantees 10% (100,000,000 OMX) to LondonCoinGold liquidity providers and physical gold treasury vault stakers."</em>
                </p>
                <div className="text-[11px] font-mono text-emerald-400">
                  Status: Rust Mainnet Codebase Active (0.001¢ tx fee)
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Footer info in Card */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Verified across all 9 official project token generation event (TGE) contracts</span>
          </div>
          <a
            href="#liquidity-bridge"
            className="text-amber-400 hover:underline flex items-center gap-1 font-bold"
          >
            <span>Execute Atomic Swaps Between LDXG & Allied Coins</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
