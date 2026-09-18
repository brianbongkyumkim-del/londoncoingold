import React from 'react';
import { LdxgLogo } from './LdxgLogo';

interface ProjectBadgeProps {
  id: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  highlighted?: boolean;
}

export const ProjectBadge: React.FC<ProjectBadgeProps> = ({ 
  id, 
  size = 'md', 
  className = '', 
  highlighted = false 
}) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  const basePadding = isSm ? 'h-9 text-xs' : isLg ? 'h-14 text-base' : 'h-11 text-sm';
  const leftWidth = isSm ? 'px-2.5' : isLg ? 'px-4' : 'px-3.5';
  const rightWidth = isSm ? 'px-3' : isLg ? 'px-5' : 'px-4';

  switch (id) {
    case 'glbx':
      return (
        <div className={`inline-flex items-center rounded-xl overflow-hidden shadow-lg border transition-all duration-300 font-semibold tracking-wide ${basePadding} ${highlighted ? 'ring-2 ring-sky-400 shadow-sky-500/30' : 'border-sky-500/30'} ${className}`}>
          <div className={`h-full flex items-center justify-center bg-[#0d2238] text-white font-bold tracking-wider ${leftWidth} border-r border-sky-800/60`}>
            <span>GLBX</span>
          </div>
          <div className={`h-full flex items-center justify-center bg-[#ffdcb3] text-[#1c2a38] font-bold ${rightWidth}`}>
            <span>LDXT / LDXU</span>
          </div>
        </div>
      );

    case 'blc':
      return (
        <div className={`inline-flex items-center rounded-xl overflow-hidden shadow-lg border transition-all duration-300 font-semibold tracking-wide ${basePadding} ${highlighted ? 'ring-2 ring-amber-400 shadow-amber-500/30' : 'border-neutral-600/40'} ${className}`}>
          <div className={`h-full flex items-center justify-center bg-black text-white font-black italic tracking-wider ${leftWidth} border-r border-neutral-700`}>
            <span>BLC</span>
          </div>
          <div className={`h-full flex items-center justify-center bg-[#e4ebf5] text-[#111827] font-bold ${rightWidth}`}>
            <span>BLC</span>
          </div>
        </div>
      );

    case 'ksb':
      return (
        <div className={`inline-flex items-center rounded-xl overflow-hidden shadow-lg border transition-all duration-300 font-semibold tracking-wide ${basePadding} ${highlighted ? 'ring-2 ring-cyan-400 shadow-cyan-500/30' : 'border-cyan-500/30'} ${className}`}>
          <div className={`h-full flex items-center justify-center bg-gradient-to-r from-[#173a5e] to-[#2563eb] text-white font-medium ${leftWidth} border-r border-blue-400/40 gap-1.5`}>
            <svg className="w-4 h-4 text-cyan-300 animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span className="text-[10px] uppercase font-mono tracking-tighter opacity-80">KEYTO</span>
          </div>
          <div className={`h-full flex items-center justify-center bg-[#b9d5f7] text-[#0f243d] font-bold ${rightWidth}`}>
            <span>KSB</span>
          </div>
        </div>
      );

    case 'fly':
    case 'flysafe':
      return (
        <div className={`inline-flex items-center rounded-xl overflow-hidden shadow-lg border transition-all duration-300 font-semibold tracking-wide ${basePadding} ${highlighted ? 'ring-2 ring-blue-400 shadow-blue-500/30' : 'border-blue-400/30'} ${className}`}>
          <div className={`h-full flex items-center justify-center bg-[#1c446c] text-white font-serif italic ${leftWidth} border-r border-blue-300/30`}>
            <span>FlySafe</span>
          </div>
          <div className={`h-full flex items-center justify-center bg-[#fed6b8] text-[#1e293b] font-bold ${rightWidth}`}>
            <span>FLY</span>
          </div>
        </div>
      );

    case 'fsc':
      return (
        <div className={`inline-flex items-center rounded-xl overflow-hidden shadow-lg border transition-all duration-300 font-semibold tracking-wide ${basePadding} ${highlighted ? 'ring-2 ring-slate-300 shadow-slate-400/30' : 'border-slate-500/30'} ${className}`}>
          <div className={`h-full flex items-center justify-center bg-[#294261] text-white font-black tracking-widest ${leftWidth} border-r border-slate-400/40`}>
            <span>FSC</span>
          </div>
          <div className={`h-full flex items-center justify-center bg-[#ffedc8] text-[#1e293b] font-bold ${rightWidth}`}>
            <span>FSC</span>
          </div>
        </div>
      );

    case 'msa':
    case 'mesocialize':
      return (
        <div className={`inline-flex items-center rounded-xl overflow-hidden shadow-lg border transition-all duration-300 font-semibold tracking-wide ${basePadding} ${highlighted ? 'ring-2 ring-amber-400 shadow-amber-500/30' : 'border-amber-400/40'} ${className}`}>
          <div className={`h-full flex items-center justify-center bg-white px-3 border-r border-neutral-200`}>
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#d946ef] via-[#ec4899] to-[#3b82f6] text-xs sm:text-sm tracking-tight">
              MeSocialize
            </span>
          </div>
          <div className={`h-full flex items-center justify-center bg-[#ffea00] text-[#111827] font-black ${rightWidth}`}>
            <span>MSA</span>
          </div>
        </div>
      );

    case 'milk':
    case 'firstpure':
      return (
        <div className={`inline-flex items-center rounded-xl overflow-hidden shadow-lg border transition-all duration-300 font-semibold tracking-wide ${basePadding} ${highlighted ? 'ring-2 ring-emerald-400 shadow-emerald-500/30' : 'border-emerald-500/30'} ${className}`}>
          <div className={`h-full flex flex-col justify-center items-center bg-[#8cb194] text-white px-2.5 py-0.5 border-r border-emerald-900/30 leading-tight`}>
            <span className="text-[10px] font-bold tracking-tight">FirstPure</span>
            <span className="text-[9px] font-medium tracking-tight opacity-90">PureFerma</span>
          </div>
          <div className={`h-full flex items-center justify-center bg-[#fed6b8] text-[#1e293b] font-bold ${rightWidth}`}>
            <span>MILK</span>
          </div>
        </div>
      );

    case 'asa':
    case 'aisa':
      return (
        <div className={`inline-flex items-center rounded-xl overflow-hidden shadow-lg border transition-all duration-300 font-semibold tracking-wide ${basePadding} ${highlighted ? 'ring-2 ring-sky-400 shadow-sky-500/30' : 'border-sky-500/30'} ${className}`}>
          <div className={`h-full flex items-center justify-center bg-[#3b82f6] text-white ${leftWidth} border-r border-blue-300/40`}>
            <div className="w-5 h-5 rounded-full border border-white/70 flex items-center justify-center text-[9px] font-bold">
              AISA
            </div>
          </div>
          <div className={`h-full flex items-center justify-center bg-[#fed6b8] text-[#1e293b] font-bold ${rightWidth}`}>
            <span>ASA</span>
          </div>
        </div>
      );

    case 'omnex':
      return (
        <div className={`inline-flex items-center rounded-2xl overflow-hidden bg-[#a6e297] text-[#0f2913] border-2 border-[#3d7a31] shadow-xl font-bold ${basePadding} px-4 gap-2.5 ${highlighted ? 'ring-4 ring-emerald-400/50' : ''} ${className}`}>
          {/* Hexagon icon like the PDF */}
          <div className="relative w-6 h-6 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-6 h-6 drop-shadow">
              <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="#143118" stroke="#3d7a31" strokeWidth="6" />
              <circle cx="50" cy="50" r="24" fill="#a6e297" />
              <circle cx="50" cy="50" r="14" fill="#143118" />
              <circle cx="50" cy="50" r="6" fill="#3cd070" />
            </svg>
          </div>
          <span className="text-base tracking-widest font-black uppercase text-[#0d2812]">OMNEX</span>
        </div>
      );

    case 'ldxg':
      return (
        <div className={`inline-flex items-center rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/80 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold ${basePadding} transition-all duration-300 ${highlighted ? 'ring-4 ring-amber-400/60 shadow-amber-500/30' : ''} ${className}`}>
          {/* Gold Coin Emblem */}
          <div className="h-full bg-[#0d121c] px-3 flex items-center justify-center border-r-2 border-amber-400/80">
            <LdxgLogo size={isSm ? 22 : isLg ? 34 : 26} />
          </div>
          <div className={`h-full flex items-center justify-center bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black ${rightWidth} tracking-wider`}>
            <span>LDXG</span>
          </div>
        </div>
      );

    default:
      return null;
  }
};
