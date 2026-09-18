import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Coins, 
  Activity, 
  Layers, 
  CheckCircle, 
  Search, 
  ShieldCheck,
  ArrowRightLeft
} from 'lucide-react';
import { ECOSYSTEM_PROJECTS } from '../data/ecosystemData';
import { EcosystemProject, ProjectSector } from '../types';
import { ProjectBadge } from './ProjectBadge';

interface ProjectsGridProps {
  onSelectProject: (project: EcosystemProject) => void;
  onOpenSwap: (targetTokenSymbol: string) => void;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({
  onSelectProject,
  onOpenSwap,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('all');

  const filteredProjects = ECOSYSTEM_PROJECTS.filter(project => {
    const matchesSearch = 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tokenSymbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.sectorLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tagline.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSector = selectedSector === 'all' || project.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium mb-3">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>CONNECTED SOVEREIGN ALLIANCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            The 9 Allied Projects — 10% Owned by LDXG Holders
          </h2>
          <p className="text-slate-400 max-w-2xl mt-2 text-sm sm:text-base">
            Every sovereign enterprise token in the network reserves <strong>10% of its total coin supply</strong> exclusively for LondonCoinGold (LDXG) holders, distributed in proportion to LDXG ownership.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects or tokens..."
            className="w-full bg-[#0c101a] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500/50"
          />
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group rounded-3xl bg-[#0c101a] border border-white/10 p-6 flex flex-col justify-between hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-300 relative overflow-hidden"
          >
            {/* Top Badge & Standard */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <ProjectBadge id={project.id} size="sm" />
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                  {project.omnexStandard}
                </span>
              </div>

              {/* 10% LDXG Holder Golden Banner */}
              <div className="mb-4 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-amber-500/15 border border-amber-500/30 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1.5 text-amber-300 font-bold text-[11px]">
                  <Coins className="w-3.5 h-3.5 text-amber-400" />
                  <span>10% LDXG POOL:</span>
                </div>
                <span className="text-emerald-400 font-bold text-[11px]">
                  {project.tenPercentAllocation.totalAllocatedTokens}
                </span>
              </div>

              {/* Title & Tagline */}
              <div className="mb-4">
                <div className="text-xs text-amber-400 font-mono font-medium mb-1">
                  {project.sectorLabel}
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {project.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {project.tagline}
                </p>
              </div>

              {/* LDXG Integration Role highlight box */}
              <div className="p-3 rounded-xl bg-[#121826] border border-white/5 mb-4 text-xs">
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                  10% Entitlement Rule:
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {project.tenPercentAllocation.entitlementClause}
                </p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-2 py-2 border-t border-white/5 text-xs font-mono mb-4">
                <div>
                  <span className="text-[10px] text-slate-500 block">RATE PER 1 LDXG</span>
                  <span className="font-bold text-emerald-400">
                    {project.tenPercentAllocation.ratioPerLdxg} {project.tokenSymbol.split('/')[0].trim()}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">EST. TOKEN PRICE</span>
                  <span className="font-bold text-slate-200">${project.metrics.priceUsd.toFixed(2)} USD</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-white/5">
              <button
                onClick={() => onSelectProject(project)}
                className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white transition-colors flex items-center justify-center gap-1"
              >
                <span>Whitepaper Details</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                onClick={() => onOpenSwap(project.tokenSymbol.split('/')[0].trim())}
                className="px-3 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-bold transition-colors flex items-center gap-1"
                title="Swap with LDXG"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>Swap</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
