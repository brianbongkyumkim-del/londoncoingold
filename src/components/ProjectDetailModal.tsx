import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Copy, 
  CheckCircle2, 
  ShieldCheck, 
  Coins, 
  Zap, 
  Layers, 
  ArrowRightLeft,
  Activity,
  Award
} from 'lucide-react';
import { EcosystemProject } from '../types';
import { ProjectBadge } from './ProjectBadge';
import { LdxgLogo } from './LdxgLogo';

interface ProjectDetailModalProps {
  project: EcosystemProject | null;
  onClose: () => void;
  onOpenSwap: (targetTokenSymbol: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onOpenSwap,
}) => {
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const copyContract = () => {
    navigator.clipboard.writeText(project.contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div 
        className="relative w-full max-w-3xl rounded-3xl bg-[#0c101a] border border-amber-500/30 p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="flex flex-wrap items-center gap-4 mb-6 pr-12">
          <ProjectBadge id={project.id} size="md" highlighted={true} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                {project.omnexStandard}
              </span>
              <span className="text-xs font-mono text-slate-400">
                OMNEX Mainnet Verified
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mt-1">
              {project.name} ({project.tokenSymbol})
            </h3>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
          {project.fullDescription}
        </p>

        {/* Role of LDXG in this Project - Highlight Card */}
        <div className="p-5 rounded-2xl bg-[#121929] border border-amber-500/30 mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold mb-2">
            <Coins className="w-4 h-4 text-amber-400" />
            <span>ROLE OF LONDONCOINGOLD (LDXG) IN THIS CHAIN</span>
          </div>
          <p className="text-sm text-amber-100/90 leading-relaxed font-normal">
            {project.ldxgRole}
          </p>
        </div>

        {/* Perpetual Gold Profit Contribution Card */}
        {project.goldProfitContribution && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/50 via-[#161f32] to-amber-950/40 border border-amber-500/50 mb-6 shadow-lg shadow-amber-500/10">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-300 font-bold">
                <Coins className="w-4 h-4 text-amber-400" />
                <span>PERPETUAL GOLD PROFIT CONTRIBUTION</span>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                ACCUMULATED FOREVER
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-black/40 border border-white/5 mb-3 text-xs font-mono">
              <div>
                <span className="text-slate-400 text-[10px] block">EST. ANNUAL PROFIT INFLOW</span>
                <span className="text-base font-bold text-emerald-400">{project.goldProfitContribution.annualEstUsd}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">QUARTERLY GOLD PURCHASES</span>
                <span className="text-base font-bold text-amber-300">{project.goldProfitContribution.quarterlyGoldGramsEst}</span>
              </div>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed mb-1 font-normal">
              <strong className="text-amber-300">Revenue Stream: </strong>{project.goldProfitContribution.profitSource}
            </p>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              <strong className="text-white">Mechanism: </strong>{project.goldProfitContribution.mechanism}
            </p>
          </div>
        )}

        {/* 10% LDXG Allocation Clause Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-[#131b2c] to-amber-950/30 border border-amber-500/40 mb-6">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-300 font-bold">
              <LdxgLogo size={18} />
              <span>10% LDXG HOLDER SOVEREIGN ALLOCATION</span>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
              PRO-RATA ENTITLEMENT
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-black/40 border border-white/5 mb-3 text-xs font-mono">
            <div>
              <span className="text-slate-500 text-[10px] block">TOTAL ALLOCATED POOL</span>
              <span className="text-sm font-bold text-amber-300">{project.tenPercentAllocation.totalAllocatedTokens}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">RATIO PER 1 LDXG</span>
              <span className="text-sm font-bold text-emerald-400">{project.tenPercentAllocation.ratioPerLdxg} {project.tokenSymbol.split('/')[0].trim()}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">EST. VALUE / 1,000 LDXG</span>
              <span className="text-sm font-bold text-white">${project.tenPercentAllocation.valuePer1000LdxgUsd.toLocaleString()} USD</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-2 font-normal">
            <strong>Entitlement Rule: </strong>{project.tenPercentAllocation.entitlementClause}
          </p>
          <div className="text-[11px] font-mono text-slate-400">
            Source: <span className="text-amber-300">{project.tenPercentAllocation.whitepaperRef}</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-black/40 border border-white/5 mb-6 text-xs font-mono">
          <div>
            <span className="text-slate-500 block text-[10px]">PRICE (IN LDXG)</span>
            <span className="text-base font-bold text-amber-400">{project.metrics.priceInLdxg} LDXG</span>
            <span className="text-[10px] text-slate-400">≈ ${project.metrics.priceUsd.toFixed(2)} USD</span>
          </div>

          <div>
            <span className="text-slate-500 block text-[10px]">LDXG POOL LIQUIDITY</span>
            <span className="text-base font-bold text-white">{project.metrics.ldxgPoolLiquidity}</span>
            <span className="text-[10px] text-emerald-400">Zero Slippage Depth</span>
          </div>

          <div>
            <span className="text-slate-500 block text-[10px]">24H TRADING VOLUME</span>
            <span className="text-base font-bold text-slate-200">{project.metrics.volume24h}</span>
            <span className="text-[10px] text-slate-400">On OMNEX DEX</span>
          </div>

          <div>
            <span className="text-slate-500 block text-[10px]">PEAK NETWORK TPS</span>
            <span className="text-base font-bold text-emerald-400">{project.metrics.tpsPeak.toLocaleString()} TPS</span>
            <span className="text-[10px] text-slate-400">{project.metrics.holders.toLocaleString()} Active Wallets</span>
          </div>
        </div>

        {/* Key Features & Architecture Specifications */}
        <div className="mb-6">
          <h4 className="text-xs font-mono uppercase text-slate-400 font-bold mb-3 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Key Protocol Features on OMNEX</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {project.keyFeatures.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 p-2.5 rounded-xl bg-white/5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contract & Security Audit */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 text-xs font-mono mb-8">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">OMNEX Smart Contract:</span>
            <span className="text-sky-300 font-bold">{project.contractAddress}</span>
            <button
              onClick={copyContract}
              className="p-1 rounded bg-white/10 text-slate-300 hover:text-white"
              title="Copy Contract Hash"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Audit: <strong className="text-slate-200">{project.auditStatus}</strong></span>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white/5 text-slate-300 hover:bg-white/10 text-xs font-semibold"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenSwap(project.tokenSymbol.split('/')[0].trim());
            }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-xs font-bold hover:brightness-110 flex items-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>Swap {project.tokenSymbol} with LDXG</span>
          </button>
        </div>
      </div>
    </div>
  );
};
