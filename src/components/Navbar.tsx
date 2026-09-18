import React, { useState } from 'react';
import { 
  Coins, 
  Layers, 
  ExternalLink, 
  Wallet, 
  CheckCircle2, 
  ChevronDown, 
  Copy, 
  ArrowUpRight,
  ShieldCheck,
  FileText,
  Menu,
  X
} from 'lucide-react';
import { OMNEX_NETWORK_INFO } from '../data/ecosystemData';
import { WalletState } from '../types';
import { LdxgLogo } from './LdxgLogo';

interface NavbarProps {
  wallet: WalletState;
  onConnectWallet: () => void;
  onOpenWhitepaper: () => void;
  onOpenDeveloperModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  wallet,
  onConnectWallet,
  onOpenWhitepaper,
  onOpenDeveloperModal,
}) => {
  const [copied, setCopied] = useState(false);
  const [showWalletMenu, setShowWalletMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(wallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-500/15 bg-[#080b11]/90 backdrop-blur-xl">
      {/* Network Status Ticker Bar */}
      <div className="w-full bg-gradient-to-r from-emerald-950/40 via-amber-950/30 to-emerald-950/40 border-b border-white/5 py-1.5 px-4 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-slate-300">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              OMNEX Mainnet Layer-1 • Active
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-400">
              TPS: <strong className="text-white">{OMNEX_NETWORK_INFO.tpsLive.toLocaleString()}</strong>
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-400">
              Finality: <strong className="text-emerald-300">{OMNEX_NETWORK_INFO.finalityTime}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-amber-300 flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              LDXG: <strong className="text-white">${OMNEX_NETWORK_INFO.ldxgPriceUsd.toFixed(2)}</strong>
              <span className="text-emerald-400 text-[10px] ml-0.5">+3.4%</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-amber-200 hidden lg:inline font-semibold">
              Perpetual Gold Backing: <strong className="text-white">1.308g/LDXG</strong> (Accumulated Forever)
            </span>
            <span className="text-slate-600 hidden lg:inline">|</span>
            <span className="text-slate-400 hidden xl:inline">
              Vaulted: <strong className="text-slate-200">84,120 kg ($6.34B USD)</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center">
            <LdxgLogo size={42} className="group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_12px_rgba(245,158,11,0.25)]" />
            {/* OMNEX mini badge overlay */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#10b981] border-2 border-[#0a0e17] flex items-center justify-center shadow">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif-gold font-bold text-lg text-slate-100 tracking-wider">LondonCoinGold</span>
              <span className="text-xs px-1.5 py-0.5 rounded font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
                LDXG
              </span>
            </div>
            <p className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
              <span className="text-emerald-400">●</span> on OMNEX Mainnet
            </p>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1 font-medium text-sm text-slate-300">
          <a 
            href="#perpetual-gold" 
            className="px-3 py-1.5 rounded-lg text-amber-300 bg-amber-500/20 border border-amber-500/50 hover:bg-amber-500/30 transition-all flex items-center gap-1.5 font-bold shadow-sm shadow-amber-500/20"
          >
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span>Perpetual Gold Engine</span>
          </a>
          <a 
            href="#ten-percent-ownership" 
            className="px-3 py-1.5 rounded-lg text-slate-200 hover:text-amber-300 hover:bg-white/5 transition-colors flex items-center gap-1"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>10% Ownership</span>
          </a>
          <a 
            href="#network-diagram" 
            className="px-3 py-2 rounded-lg hover:text-amber-300 hover:bg-white/5 transition-colors"
          >
            Ecosystem Map
          </a>
          <a 
            href="#omnex-mainnet" 
            className="px-3 py-2 rounded-lg hover:text-emerald-300 hover:bg-white/5 transition-colors flex items-center gap-1"
          >
            <span>OMNEX Mainnet</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </a>
          <a 
            href="#projects" 
            className="px-3 py-2 rounded-lg hover:text-amber-300 hover:bg-white/5 transition-colors"
          >
            8 Allied Projects
          </a>
          <a 
            href="#liquidity-bridge" 
            className="px-3 py-2 rounded-lg hover:text-amber-300 hover:bg-white/5 transition-colors"
          >
            Bridge & Swap
          </a>
          <a 
            href="#tokenomics" 
            className="px-3 py-2 rounded-lg hover:text-amber-300 hover:bg-white/5 transition-colors"
          >
            Gold Reserves
          </a>
          <button 
            onClick={onOpenWhitepaper} 
            className="px-3 py-2 rounded-lg hover:text-amber-300 hover:bg-white/5 transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4 text-amber-400/80" />
            <span>Whitepaper</span>
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenDeveloperModal}
            className="hidden md:flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-emerald-500/30 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-900/40 transition-colors"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Deploy on OMNEX</span>
          </button>

          {/* Wallet Action */}
          {wallet.isConnected ? (
            <div className="relative">
              <button
                onClick={() => setShowWalletMenu(!showWalletMenu)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-200 hover:bg-amber-500/25 transition-all text-xs font-mono"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{wallet.address}</span>
                <ChevronDown className="w-3.5 h-3.5 text-amber-400" />
              </button>

              {showWalletMenu && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#0e141f] border border-amber-500/30 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-xs text-slate-400 font-mono">Connected to OMNEX</span>
                    <button 
                      onClick={copyAddress}
                      className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300"
                    >
                      {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="py-3 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">LDXG Balance</span>
                      <span className="font-bold text-amber-300 font-mono">
                        {wallet.balances.LDXG?.toLocaleString()} LDXG
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">OMNEX Gas (OMNX)</span>
                      <span className="font-bold text-emerald-300 font-mono">
                        {wallet.balances.OMNX?.toLocaleString()} OMNX
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">FLY (FlySafe)</span>
                      <span className="font-medium text-slate-200 font-mono">
                        {wallet.balances.FLY?.toLocaleString()} FLY
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">MILK (FirstPure)</span>
                      <span className="font-medium text-slate-200 font-mono">
                        {wallet.balances.MILK?.toLocaleString()} MILK
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[11px]">
                    <a 
                      href="#liquidity-bridge" 
                      onClick={() => setShowWalletMenu(false)}
                      className="text-amber-400 hover:underline flex items-center gap-1"
                    >
                      Swap in Bridge <ArrowUpRight className="w-3 h-3" />
                    </a>
                    <button 
                      onClick={() => {
                        onConnectWallet();
                        setShowWalletMenu(false);
                      }}
                      className="text-rose-400 hover:underline"
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onConnectWallet}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-xs sm:text-sm hover:from-amber-400 hover:to-yellow-400 transition-all shadow-md shadow-amber-500/20 active:scale-95"
            >
              <Wallet className="w-4 h-4" />
              <span>Connect Wallet</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0e17] border-b border-amber-500/20 px-4 py-4 space-y-2 text-sm font-medium">
          <a 
            href="#perpetual-gold" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-amber-300 font-bold flex items-center gap-2 bg-amber-500/10 px-3 rounded-lg border border-amber-500/30"
          >
            <Coins className="w-4 h-4 text-amber-400" />
            <span>Perpetual Gold Engine</span>
          </a>
          <a 
            href="#ten-percent-ownership" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 hover:text-amber-300 flex items-center gap-2 px-3"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>10% Coin Ownership Protocol</span>
          </a>
          <a 
            href="#network-diagram" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 hover:text-amber-300"
          >
            Ecosystem Map (PDF Diagram)
          </a>
          <a 
            href="#omnex-mainnet" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 hover:text-emerald-300"
          >
            OMNEX Mainnet Architecture
          </a>
          <a 
            href="#projects" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 hover:text-amber-300"
          >
            Allied Projects (9)
          </a>
          <a 
            href="#liquidity-bridge" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 hover:text-amber-300"
          >
            Liquidity Bridge & Swap
          </a>
          <a 
            href="#tokenomics" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 hover:text-amber-300"
          >
            Gold Reserves & Tokenomics
          </a>
          <div className="pt-2 border-t border-white/10 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWhitepaper();
              }}
              className="flex-1 py-2 text-center text-xs font-semibold rounded-lg bg-white/5 text-amber-300"
            >
              Whitepaper
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDeveloperModal();
              }}
              className="flex-1 py-2 text-center text-xs font-semibold rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-500/40"
            >
              Deploy on OMNEX
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
