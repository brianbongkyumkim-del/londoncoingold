import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Download, 
  FileText, 
  ShieldCheck, 
  Coins, 
  Network, 
  Layers, 
  CheckCircle2,
  Printer
} from 'lucide-react';

interface WhitepaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhitepaperModal: React.FC<WhitepaperModalProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState<number>(0);

  if (!isOpen) return null;

  const sections = [
    {
      title: '1. Executive Summary',
      subtitle: 'The Need for an Asset-Backed Layer-1 Settlement Fabric',
      content: `The modern decentralized landscape is severely fragmented across siloed application-specific chains and volatile gas assets. When enterprises in logistics (BLC), aviation (FlySafe), agritech (FirstPure), and private banking (KSB) launch sovereign tokens, they face two systemic bottlenecks: excessive cross-chain bridge vulnerabilities and extreme price volatility in non-backed settlement currencies.
      
OMNEX solves this by functioning as a high-throughput, sovereign Layer-1 Mainnet, while LondonCoinGold (LDXG) serves as the canonical, gold-anchored settlement reserve and universal liquidity router for every affiliated project.`,
    },
    {
      title: '2. OMNEX Mainnet Consensus & VM',
      subtitle: 'Sub-second Finality via Parallel DPoS + BFT',
      content: `OMNEX employs a dual-pipelined Delegated Proof-of-Stake with Byzantine Fault Tolerant (BFT) deterministic finality. 

Key Architectural Highlights:
• Block Time: 0.85 seconds deterministic.
• Throughput: Exceeds 65,000 TPS under parallel VM state execution.
• Native Inter-Token Protocol: OMNEX-20 tokens exchange value natively on-chain without wrapped synthetic contracts.
• Zero Front-Running (MEV-Resistant): Transaction ordering enforced by randomized verifiable threshold cryptographic lotteries.`,
    },
    {
      title: '3. LondonCoinGold (LDXG) Reserve Mechanics',
      subtitle: '1:1 LBMA Physical Gold Custody & Proof of Reserve',
      content: `Each LondonCoinGold (LDXG) represents exactly 1.00 gram of 999.9 Fine Allocated Bullion held under legal bailment in insured, accredited vaults in London (UK) and Zurich (Switzerland).

Reserve Verification Protocol:
• Chainlink / Pyth decentralized oracle multi-signatures poll bullion custodian ledger weights every 900 seconds.
• If circulating LDXG supply exceeds audited vault ounces, smart contract minting functions automatically pause until vault rebalancing is notarized.
• Instant redeemability: Qualified enterprise holders can redeem LDXG for physical LBMA bars (minimum 1kg tranche) or settle directly in fiat currency at London spot fix rates.`,
    },
    {
      title: '4. The 8 Connected Ecosystem Pillars',
      subtitle: 'Mapping Industrial Value to LDXG Liquidity',
      content: `The architectural topology establishes LDXG as the central liquidity nexus for 8 sovereign projects:

1. GLBX (LDXT / LDXU): Institutional crypto & commodities exchange settling spot and derivatives margins in LDXG.
2. BLC (BLC): Business Ledger automating international maritime bills of lading with customs release escrow locked in LDXG.
3. KSB (KSB): Sovereign digital private banking and interbank messaging maintaining tier-1 capital adequacy in LDXG.
4. FlySafe (FLY): Decentralized flight delay insurance protocol underwriting catastrophic disruption claims via LDXG vaults.
5. FSC (FSC): Structured real-world credit syndication and over-collateralized corporate debt financing.
6. MeSocialize (MSZ): Web3 creator economy, social tipping, and anti-censorship feeds with inflation-hedged gold tip jars.
7. FirstPure PureFerma (MILK): Dairy supply chain traceability and fair-trade agricultural futures stabilized against seasonal commodity shocks.
8. AISA (ASA): Autonomous AI agent swarms and GPU compute clusters settling model inference fees in real time.`,
    },
    {
      title: '5. Economic Distribution & Staking',
      subtitle: 'Deflationary Mechanisms & Validator Rewards',
      content: `LondonCoinGold features a hard cap of 100,000,000 LDXG. No additional tokens can ever be minted beyond physical vault allocations.

Staking & Fee Redistribution:
• 0.01% of all cross-token swaps transacted over OMNEX DEX pools are utilized to buy back and burn LDXG from open markets.
• OMNEX Validator nodes stake both OMNX and LDXG, receiving quarterly physical gold dividend distributions.`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div 
        className="relative w-full max-w-4xl rounded-3xl bg-[#0c101a] border border-amber-500/30 p-6 sm:p-8 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-serif-gold">
                LondonCoinGold (LDXG) Whitepaper
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Technical Specification v2.4 • OMNEX Mainnet Integration
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
              title="Print Document"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body with Sidebar Index */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-6 pt-6">
          {/* Section Index list */}
          <div className="md:col-span-4 space-y-1.5 overflow-y-auto pr-2 border-r border-white/5">
            {sections.map((sec, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSection(idx)}
                className={`w-full text-left p-3 rounded-xl text-xs transition-all flex flex-col ${activeSection === idx ? 'bg-amber-500/15 border border-amber-500/40 text-amber-300 font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                <span className="font-mono text-[10px] opacity-70">SECTION 0{idx + 1}</span>
                <span className="truncate">{sec.title}</span>
              </button>
            ))}
          </div>

          {/* Active Section Content */}
          <div className="md:col-span-8 overflow-y-auto pr-4 space-y-4 text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
            <div>
              <span className="text-xs font-mono text-amber-400 font-bold">CHAPTER 0{activeSection + 1}</span>
              <h4 className="text-2xl font-bold text-white mt-1 mb-1 font-display">
                {sections[activeSection].title}
              </h4>
              <p className="text-xs text-slate-400 font-mono italic">
                {sections[activeSection].subtitle}
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 whitespace-pre-line text-slate-200 leading-relaxed font-sans">
              {sections[activeSection].content}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Audited by CertiK, KPMG Cyber & LBMA Standards</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors"
            >
              Done Reading
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
