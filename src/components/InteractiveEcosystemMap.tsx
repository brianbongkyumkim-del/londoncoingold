import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ProjectBadge 
} from './ProjectBadge';
import { ECOSYSTEM_PROJECTS } from '../data/ecosystemData';
import { EcosystemProject } from '../types';
import { 
  Activity, 
  Sparkles, 
  Layers, 
  ArrowRightLeft, 
  Info, 
  Maximize2,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

interface InteractiveEcosystemMapProps {
  onSelectProject: (project: EcosystemProject) => void;
  onOpenSwap: (targetTokenSymbol: string) => void;
}

export const InteractiveEcosystemMap: React.FC<InteractiveEcosystemMapProps> = ({
  onSelectProject,
  onOpenSwap,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'finance' | 'real-world' | 'tech'>('all');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [isSimulatingTraffic, setIsSimulatingTraffic] = useState(true);

  const getProject = (id: string) => ECOSYSTEM_PROJECTS.find(p => p.id === id);

  // Sector filtering
  const isNodeVisible = (id: string) => {
    if (activeFilter === 'all') return true;
    const p = getProject(id);
    if (!p) return true;
    if (activeFilter === 'finance') return ['glbx', 'ksb', 'fsc'].includes(id);
    if (activeFilter === 'real-world') return ['blc', 'flysafe', 'firstpure'].includes(id);
    if (activeFilter === 'tech') return ['mesocialize', 'aisa'].includes(id);
    return true;
  };

  const selectedOrHoveredProject = hoveredNodeId ? getProject(hoveredNodeId) : null;

  return (
    <section id="network-diagram" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background radial accent */}
      <div className="absolute inset-0 bg-radial from-amber-500/5 via-transparent to-transparent pointer-events-none" />

      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>OFFICIAL ECOSYSTEM TOPOLOGY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
          OMNEX Mainnet & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">LondonCoinGold</span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          As mapped in the architectural document: <strong>OMNEX</strong> provides the high-performance Layer-1 consensus, while <strong>LDXG (LondonCoinGold)</strong> operates as the universal gold-anchored liquidity & settlement hub across all 8 enterprise chains.
        </p>

        {/* Filter controls & interactive toggles */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs font-medium">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-lg border transition-all ${activeFilter === 'all' ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md shadow-amber-500/20' : 'bg-[#0f1523] text-slate-400 border-white/10 hover:border-white/20'}`}
          >
            All 8 Connected Chains
          </button>
          <button
            onClick={() => setActiveFilter('finance')}
            className={`px-3.5 py-1.5 rounded-lg border transition-all ${activeFilter === 'finance' ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md shadow-amber-500/20' : 'bg-[#0f1523] text-slate-400 border-white/10 hover:border-white/20'}`}
          >
            Institutional & Banking (GLBX, KSB, FSC)
          </button>
          <button
            onClick={() => setActiveFilter('real-world')}
            className={`px-3.5 py-1.5 rounded-lg border transition-all ${activeFilter === 'real-world' ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md shadow-amber-500/20' : 'bg-[#0f1523] text-slate-400 border-white/10 hover:border-white/20'}`}
          >
            Supply Chain & Mobility (BLC, FlySafe, FirstPure)
          </button>
          <button
            onClick={() => setActiveFilter('tech')}
            className={`px-3.5 py-1.5 rounded-lg border transition-all ${activeFilter === 'tech' ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md shadow-amber-500/20' : 'bg-[#0f1523] text-slate-400 border-white/10 hover:border-white/20'}`}
          >
            Social & AI Networks (MeSocialize, AISA)
          </button>

          <button
            onClick={() => setIsSimulatingTraffic(!isSimulatingTraffic)}
            className={`ml-2 px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all ${isSimulatingTraffic ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' : 'bg-slate-900 border-white/10 text-slate-400'}`}
            title="Toggle live animated cross-token liquidity stream"
          >
            <Activity className={`w-3.5 h-3.5 ${isSimulatingTraffic ? 'animate-pulse text-emerald-400' : ''}`} />
            <span>{isSimulatingTraffic ? 'Live Liquidity Pulses' : 'Animation Paused'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Diagram Canvas */}
      <div className="relative w-full rounded-3xl bg-[#0b0f19]/90 border border-amber-500/20 shadow-2xl p-4 sm:p-8 lg:p-12 overflow-hidden radial-grid">
        {/* Soft atmospheric gradient halos */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-96 h-40 bg-emerald-500/10 blur-[90px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-amber-500/10 blur-[130px] pointer-events-none rounded-full" />

        {/* TOP LAYER: OMNEX MAINNET ANCHOR */}
        <div className="flex flex-col items-center justify-center mb-8 relative z-20">
          <a
            href="#omnex-mainnet"
            className="group transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none"
            title="Click to view OMNEX Mainnet details"
          >
            <ProjectBadge id="omnex" size="lg" className="gold-glow hover:omnex-glow cursor-pointer" />
          </a>
          <div className="mt-2 flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>LAYER-1 MAINNET CONSENSUS & VALIDATION ENGINE</span>
          </div>

          {/* Conduit connection line from OMNEX down to LDXG */}
          <div className="relative w-1 h-12 my-2 flex justify-center">
            <div className="w-[2px] h-full bg-gradient-to-b from-emerald-500 via-amber-400 to-amber-500" />
            {isSimulatingTraffic && (
              <motion.div
                className="absolute w-2 h-2 rounded-full bg-emerald-300 shadow-[0_0_8px_#34d399]"
                animate={{ y: [0, 48, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </div>
        </div>

        {/* 3x3 GRID REPRESENTATION FAITHFUL TO THE DOCUMENT */}
        <div className="relative max-w-5xl mx-auto">
          {/* SVG Overlay for the dashed bidirectional connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden sm:block">
            <defs>
              <linearGradient id="goldBeam" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
              </linearGradient>
              <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <polygon points="0 0, 6 3, 0 6" fill="#f59e0b" />
              </marker>
              <marker id="arrowhead-blue" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <polygon points="0 0, 6 3, 0 6" fill="#38bdf8" />
              </marker>
            </defs>

            {/* Radial connections from center (50%, 50%) to 8 positions */}
            {/* Note: In responsive flex/grid below, SVG lines provide the visual connection motif */}
          </svg>

          {/* Radial Grid Nodes matching diagram */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-y-12 sm:gap-x-8 items-center relative z-20">
            
            {/* ROW 1: GLBX, BLC, KSB */}
            
            {/* Top-Left: GLBX (LDXT / LDXU) */}
            <div 
              className={`flex flex-col items-center sm:items-start transition-all duration-300 ${isNodeVisible('glbx') ? 'opacity-100' : 'opacity-25 pointer-events-none'}`}
              onMouseEnter={() => setHoveredNodeId('glbx')}
              onMouseLeave={() => setHoveredNodeId(null)}
            >
              <div 
                onClick={() => {
                  const p = getProject('glbx');
                  if (p) onSelectProject(p);
                }}
                className="cursor-pointer group relative"
              >
                <ProjectBadge 
                  id="glbx" 
                  size="md" 
                  highlighted={hoveredNodeId === 'glbx'} 
                  className="hover:scale-105 transition-transform" 
                />
                <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded bg-blue-900 border border-blue-400 text-[10px] font-mono text-sky-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  Dual-Token
                </span>
              </div>
              <div className="mt-2 text-[11px] text-slate-400 font-mono flex items-center gap-1">
                <span>Liquidity:</span>
                <span className="text-amber-300 font-semibold">8.4M LDXG</span>
              </div>
            </div>

            {/* Top-Center: BLC (BLC) */}
            <div 
              className={`flex flex-col items-center transition-all duration-300 ${isNodeVisible('blc') ? 'opacity-100' : 'opacity-25 pointer-events-none'}`}
              onMouseEnter={() => setHoveredNodeId('blc')}
              onMouseLeave={() => setHoveredNodeId(null)}
            >
              <div 
                onClick={() => {
                  const p = getProject('blc');
                  if (p) onSelectProject(p);
                }}
                className="cursor-pointer group relative"
              >
                <ProjectBadge 
                  id="blc" 
                  size="md" 
                  highlighted={hoveredNodeId === 'blc'} 
                  className="hover:scale-105 transition-transform" 
                />
              </div>
              <div className="mt-2 text-[11px] text-slate-400 font-mono flex items-center gap-1">
                <span>Maritime Logistics:</span>
                <span className="text-amber-300 font-semibold">5.2M LDXG</span>
              </div>
            </div>

            {/* Top-Right: KSB (KSB) */}
            <div 
              className={`flex flex-col items-center sm:items-end transition-all duration-300 ${isNodeVisible('ksb') ? 'opacity-100' : 'opacity-25 pointer-events-none'}`}
              onMouseEnter={() => setHoveredNodeId('ksb')}
              onMouseLeave={() => setHoveredNodeId(null)}
            >
              <div 
                onClick={() => {
                  const p = getProject('ksb');
                  if (p) onSelectProject(p);
                }}
                className="cursor-pointer group relative"
              >
                <ProjectBadge 
                  id="ksb" 
                  size="md" 
                  highlighted={hoveredNodeId === 'ksb'} 
                  className="hover:scale-105 transition-transform" 
                />
              </div>
              <div className="mt-2 text-[11px] text-slate-400 font-mono flex items-center gap-1">
                <span>Private Banking:</span>
                <span className="text-amber-300 font-semibold">11.8M LDXG</span>
              </div>
            </div>

            {/* ROW 2: FlySafe, LDXG (CENTER HUB), FSC */}

            {/* Middle-Left: FlySafe (FLY) */}
            <div 
              className={`flex flex-col items-center sm:items-start transition-all duration-300 ${isNodeVisible('flysafe') ? 'opacity-100' : 'opacity-25 pointer-events-none'}`}
              onMouseEnter={() => setHoveredNodeId('flysafe')}
              onMouseLeave={() => setHoveredNodeId(null)}
            >
              <div 
                onClick={() => {
                  const p = getProject('flysafe');
                  if (p) onSelectProject(p);
                }}
                className="cursor-pointer group relative"
              >
                <ProjectBadge 
                  id="flysafe" 
                  size="md" 
                  highlighted={hoveredNodeId === 'flysafe'} 
                  className="hover:scale-105 transition-transform" 
                />
              </div>
              <div className="mt-2 text-[11px] text-slate-400 font-mono flex items-center gap-1">
                <span>Flight Insurance:</span>
                <span className="text-amber-300 font-semibold">3.6M LDXG</span>
              </div>
            </div>

            {/* Center Hub: LondonCoinGold (LDXG) */}
            <div className="flex flex-col items-center justify-center my-4 sm:my-0 relative">
              {/* Outer pulsing glow ring */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-amber-500/20 via-yellow-400/30 to-amber-600/20 blur-xl animate-pulse pointer-events-none" />

              <div 
                className="relative cursor-pointer group"
                onClick={() => {
                  const firstProj = ECOSYSTEM_PROJECTS[0];
                  if (firstProj) onSelectProject(firstProj);
                }}
              >
                <ProjectBadge 
                  id="ldxg" 
                  size="lg" 
                  highlighted={true}
                  className="gold-glow-intense transform group-hover:scale-105 transition-all duration-300" 
                />
              </div>

              <div className="mt-3 text-center">
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-950/80 border border-amber-500/50 px-3 py-1 rounded-full">
                  <Sparkles className="w-3 h-3 text-yellow-400" />
                  Central Liquidity & Gold Hub
                </span>
                <p className="text-[11px] text-slate-400 font-mono mt-1">
                  1 LDXG = 1.00g Fine Gold (LBMA Vault)
                </p>
              </div>
            </div>

            {/* Middle-Right: FSC (FSC) */}
            <div 
              className={`flex flex-col items-center sm:items-end transition-all duration-300 ${isNodeVisible('fsc') ? 'opacity-100' : 'opacity-25 pointer-events-none'}`}
              onMouseEnter={() => setHoveredNodeId('fsc')}
              onMouseLeave={() => setHoveredNodeId(null)}
            >
              <div 
                onClick={() => {
                  const p = getProject('fsc');
                  if (p) onSelectProject(p);
                }}
                className="cursor-pointer group relative"
              >
                <ProjectBadge 
                  id="fsc" 
                  size="md" 
                  highlighted={hoveredNodeId === 'fsc'} 
                  className="hover:scale-105 transition-transform" 
                />
              </div>
              <div className="mt-2 text-[11px] text-slate-400 font-mono flex items-center gap-1">
                <span>Credit & Capital:</span>
                <span className="text-amber-300 font-semibold">7.9M LDXG</span>
              </div>
            </div>

            {/* ROW 3: MeSocialize, FirstPure, AISA */}

            {/* Bottom-Left: MeSocialize (MSZ) */}
            <div 
              className={`flex flex-col items-center sm:items-start transition-all duration-300 ${isNodeVisible('mesocialize') ? 'opacity-100' : 'opacity-25 pointer-events-none'}`}
              onMouseEnter={() => setHoveredNodeId('mesocialize')}
              onMouseLeave={() => setHoveredNodeId(null)}
            >
              <div 
                onClick={() => {
                  const p = getProject('mesocialize');
                  if (p) onSelectProject(p);
                }}
                className="cursor-pointer group relative"
              >
                <ProjectBadge 
                  id="mesocialize" 
                  size="md" 
                  highlighted={hoveredNodeId === 'mesocialize'} 
                  className="hover:scale-105 transition-transform" 
                />
              </div>
              <div className="mt-2 text-[11px] text-slate-400 font-mono flex items-center gap-1">
                <span>Social Creator:</span>
                <span className="text-amber-300 font-semibold">4.1M LDXG</span>
              </div>
            </div>

            {/* Bottom-Center: FirstPure PureFerma (MILK) */}
            <div 
              className={`flex flex-col items-center transition-all duration-300 ${isNodeVisible('firstpure') ? 'opacity-100' : 'opacity-25 pointer-events-none'}`}
              onMouseEnter={() => setHoveredNodeId('firstpure')}
              onMouseLeave={() => setHoveredNodeId(null)}
            >
              <div 
                onClick={() => {
                  const p = getProject('firstpure');
                  if (p) onSelectProject(p);
                }}
                className="cursor-pointer group relative"
              >
                <ProjectBadge 
                  id="firstpure" 
                  size="md" 
                  highlighted={hoveredNodeId === 'firstpure'} 
                  className="hover:scale-105 transition-transform" 
                />
              </div>
              <div className="mt-2 text-[11px] text-slate-400 font-mono flex items-center gap-1">
                <span>AgriTech Provenance:</span>
                <span className="text-amber-300 font-semibold">3.1M LDXG</span>
              </div>
            </div>

            {/* Bottom-Right: AISA (ASA) */}
            <div 
              className={`flex flex-col items-center sm:items-end transition-all duration-300 ${isNodeVisible('aisa') ? 'opacity-100' : 'opacity-25 pointer-events-none'}`}
              onMouseEnter={() => setHoveredNodeId('aisa')}
              onMouseLeave={() => setHoveredNodeId(null)}
            >
              <div 
                onClick={() => {
                  const p = getProject('aisa');
                  if (p) onSelectProject(p);
                }}
                className="cursor-pointer group relative"
              >
                <ProjectBadge 
                  id="aisa" 
                  size="md" 
                  highlighted={hoveredNodeId === 'aisa'} 
                  className="hover:scale-105 transition-transform" 
                />
              </div>
              <div className="mt-2 text-[11px] text-slate-400 font-mono flex items-center gap-1">
                <span>AI Agent Compute:</span>
                <span className="text-amber-300 font-semibold">6.7M LDXG</span>
              </div>
            </div>

          </div>
        </div>

        {/* Dynamic Project Quick Inspector Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          {selectedOrHoveredProject ? (
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-slate-400">Selected Node:</span>
              <span className="text-white font-bold">{selectedOrHoveredProject.name} ({selectedOrHoveredProject.tokenSymbol})</span>
              <span className="text-slate-500">•</span>
              <span className="text-amber-400 font-mono">1 {selectedOrHoveredProject.tokenSymbol} ≈ {selectedOrHoveredProject.metrics.priceInLdxg} LDXG</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300 font-mono">24h Vol: {selectedOrHoveredProject.metrics.volume24h}</span>
            </div>
          ) : (
            <div className="text-slate-400 flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-400" />
              <span>Hover or click any project node above to inspect its real-time liquidity role and OMNEX contract.</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            {selectedOrHoveredProject && (
              <>
                <button
                  onClick={() => onOpenSwap(selectedOrHoveredProject.tokenSymbol.split('/')[0].trim())}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 flex items-center gap-1 transition-all"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  <span>Swap with LDXG</span>
                </button>
                <button
                  onClick={() => onSelectProject(selectedOrHoveredProject)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 flex items-center gap-1 transition-all"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Full Profile</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
