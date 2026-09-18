import React, { useState } from 'react';
import { 
  ArrowDownUp, 
  Settings, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  Coins, 
  Sparkles, 
  RefreshCw,
  Info
} from 'lucide-react';
import { ECOSYSTEM_PROJECTS, OMNEX_NETWORK_INFO } from '../data/ecosystemData';
import { WalletState } from '../types';
import { LdxgLogo } from './LdxgLogo';

interface LiquidityBridgeSimulatorProps {
  wallet: WalletState;
  onUpdateWalletBalances: (newBalances: Record<string, number>) => void;
  onConnectWallet: () => void;
  preselectedToken?: string;
}

export const LiquidityBridgeSimulator: React.FC<LiquidityBridgeSimulatorProps> = ({
  wallet,
  onUpdateWalletBalances,
  onConnectWallet,
  preselectedToken = 'FLY',
}) => {
  const [fromToken, setFromToken] = useState<'LDXG' | string>('LDXG');
  const [toToken, setToToken] = useState<string>(preselectedToken || 'FLY');
  const [amount, setAmount] = useState<string>('50');
  const [slippage, setSlippage] = useState<number>(0.1);
  const [isSwapping, setIsSwapping] = useState<boolean>(false);
  const [swapStep, setSwapStep] = useState<string>('');
  const [successTx, setSuccessTx] = useState<{
    hash: string;
    fromText: string;
    toText: string;
    timestamp: string;
  } | null>(null);

  // Available tokens: LDXG + the 8 ecosystem project tokens + OMNX
  const availableTokens = [
    { symbol: 'LDXG', name: 'LondonCoinGold (Gold Reserve)', priceUsd: OMNEX_NETWORK_INFO.ldxgPriceUsd },
    { symbol: 'OMNX', name: 'OMNEX Mainnet Gas Token', priceUsd: 1.25 },
    ...ECOSYSTEM_PROJECTS.map(p => ({
      symbol: p.tokenSymbol.includes('/') ? p.tokenSymbol.split('/')[0].trim() : p.tokenSymbol,
      name: `${p.name} (${p.sectorLabel})`,
      priceUsd: p.metrics.priceUsd,
    })),
  ];

  const getPrice = (sym: string) => {
    const t = availableTokens.find(token => token.symbol === sym);
    return t ? t.priceUsd : 1;
  };

  const fromPrice = getPrice(fromToken);
  const toPrice = getPrice(toToken);

  const numAmount = parseFloat(amount) || 0;
  const totalValueUsd = numAmount * fromPrice;
  const estimatedOutput = toPrice > 0 ? (totalValueUsd / toPrice) : 0;
  const rate = toPrice > 0 ? (fromPrice / toPrice) : 0;

  const handleInvertTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  const handleExecuteSwap = () => {
    if (!wallet.isConnected) {
      onConnectWallet();
      return;
    }

    if (numAmount <= 0) return;

    setIsSwapping(true);
    setSwapStep('Routing through OMNEX FastBridge...');

    setTimeout(() => {
      setSwapStep('Querying LondonCoinGold (LDXG) Liquidity Reserve...');
    }, 800);

    setTimeout(() => {
      setSwapStep('Minting block on OMNEX Mainnet...');
    }, 1600);

    setTimeout(() => {
      // Execute balance update
      const currentFromBal = wallet.balances[fromToken] ?? 0;
      const currentToBal = wallet.balances[toToken] ?? 0;

      const newBalances = {
        ...wallet.balances,
        [fromToken]: Math.max(0, currentFromBal - numAmount),
        [toToken]: Number((currentToBal + estimatedOutput).toFixed(2)),
      };

      onUpdateWalletBalances(newBalances);

      setIsSwapping(false);
      setSwapStep('');
      setSuccessTx({
        hash: `0x${Math.random().toString(16).substring(2, 8)}...${Math.random().toString(16).substring(2, 6)}`,
        fromText: `${numAmount.toLocaleString()} ${fromToken}`,
        toText: `${estimatedOutput.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${toToken}`,
        timestamp: 'Just now',
      });
    }, 2400);
  };

  return (
    <section id="liquidity-bridge" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Context & Value Anchor */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium">
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span>INSTANT LIQUIDITY ENGINE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display leading-tight">
            Seamless Cross-Project Swaps via <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">LondonCoinGold</span>
          </h2>

          <p className="text-slate-300 text-base leading-relaxed">
            On the OMNEX Mainnet, LondonCoinGold (LDXG) serves as the universal automated market maker base currency. Projects like <strong>FlySafe (FLY)</strong>, <strong>FirstPure (MILK)</strong>, <strong>GLBX</strong>, and <strong>MeSocialize (MSZ)</strong> can be converted instantaneously with near-zero gas and mathematically protected against slippage.
          </p>

          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#0c101a] border border-amber-500/20 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">100% Gold Collateral Backing</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Every 1 LDXG in liquidity pools is matched with segregated 1.00g fine gold custody in London vaults, preventing bridge de-pegging.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0c101a] border border-emerald-500/20 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 mt-0.5">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">OMNEX Atomic Finality</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Cross-token swaps settle within 1.2 seconds across OMNEX validator nodes without requiring custodial wrapped tokens or complex multi-sig delay gates.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Swap & Bridge Widget */}
        <div className="lg:col-span-6">
          <div className="relative rounded-3xl bg-[#0b0f19] border border-amber-500/30 p-6 sm:p-8 shadow-2xl shadow-amber-500/5">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base">OMNEX Liquidity Bridge</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
                  v2.4 Router
                </span>
              </div>

              {/* Slippage Selector */}
              <div className="flex items-center gap-1 text-xs">
                <span className="text-slate-400 text-[11px]">Slippage:</span>
                {[0.1, 0.5, 1.0].map(s => (
                  <button
                    key={s}
                    onClick={() => setSlippage(s)}
                    className={`px-2 py-0.5 rounded ${slippage === s ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-white/5 text-slate-400 hover:text-white'}`}
                  >
                    {s}%
                  </button>
                ))}
              </div>
            </div>

            {/* FROM TOKEN BOX */}
            <div className="p-4 rounded-2xl bg-[#111726] border border-white/5 space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                <span>You Pay</span>
                <span>
                  Balance: {wallet.balances[fromToken]?.toLocaleString() ?? 0} {fromToken}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.0"
                  className="w-full bg-transparent text-2xl sm:text-3xl font-bold text-white focus:outline-none font-mono"
                />

                <div className="flex items-center gap-2">
                  {fromToken === 'LDXG' && <LdxgLogo size={24} />}
                  <select
                    value={fromToken}
                    onChange={(e) => setFromToken(e.target.value)}
                    className="bg-[#1b253b] text-white border border-white/10 rounded-xl px-3 py-2 text-sm font-bold font-mono focus:outline-none cursor-pointer"
                  >
                    {availableTokens.map(t => (
                      <option key={t.symbol} value={t.symbol}>
                        {t.symbol}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-slate-400 font-mono pt-1">
                <span>≈ ${totalValueUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</span>
                <button
                  onClick={() => setAmount(String(wallet.balances[fromToken] || 100))}
                  className="text-amber-400 hover:underline font-medium text-[11px]"
                >
                  MAX
                </button>
              </div>
            </div>

            {/* Invert Button */}
            <div className="flex justify-center -my-3 relative z-10">
              <button
                onClick={handleInvertTokens}
                className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg border-2 border-[#0b0f19] transition-transform active:rotate-180"
                title="Switch direction"
              >
                <ArrowDownUp className="w-4 h-4 font-bold" />
              </button>
            </div>

            {/* TO TOKEN BOX */}
            <div className="p-4 rounded-2xl bg-[#111726] border border-white/5 space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                <span>You Receive (Estimated)</span>
                <span>
                  Balance: {wallet.balances[toToken]?.toLocaleString() ?? 0} {toToken}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="w-full text-2xl sm:text-3xl font-bold text-emerald-400 font-mono truncate">
                  {estimatedOutput.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>

                <div className="flex items-center gap-2">
                  {toToken === 'LDXG' && <LdxgLogo size={24} />}
                  <select
                    value={toToken}
                    onChange={(e) => setToToken(e.target.value)}
                    className="bg-[#1b253b] text-white border border-white/10 rounded-xl px-3 py-2 text-sm font-bold font-mono focus:outline-none cursor-pointer"
                  >
                    {availableTokens.map(t => (
                      <option key={t.symbol} value={t.symbol}>
                        {t.symbol}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-slate-400 font-mono pt-1">
                <span>1 {fromToken} ≈ {rate.toFixed(4)} {toToken}</span>
                <span className="text-emerald-400">Zero Slippage Guarantee</span>
              </div>
            </div>

            {/* Route Details Box */}
            <div className="mt-4 p-3.5 rounded-xl bg-white/5 border border-white/5 text-xs font-mono space-y-2">
              <div className="flex justify-between items-center text-slate-400">
                <span>Liquidity Pathway:</span>
                <span className="text-amber-300">
                  {fromToken} ➔ LDXG Gold Vault ➔ {toToken}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>OMNEX Network Gas:</span>
                <span className="text-emerald-400 font-semibold">0.00028 OMNX (~$0.00035)</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Settlement Time:</span>
                <span className="text-white">1.2 seconds</span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="mt-6">
              <button
                onClick={handleExecuteSwap}
                disabled={isSwapping || numAmount <= 0}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 font-extrabold text-base hover:brightness-110 active:scale-[0.99] transition-all shadow-xl shadow-amber-500/20 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
              >
                {isSwapping ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>{swapStep}</span>
                  </>
                ) : !wallet.isConnected ? (
                  <span>Connect Wallet to Swap</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Swap via OMNEX Mainnet</span>
                  </>
                )}
              </button>
            </div>

            {/* Success Notification Modal / Overlay */}
            {successTx && (
              <div className="mt-4 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-xs animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-center justify-between pb-2 border-b border-emerald-500/30">
                  <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Swap Successfully Confirmed!
                  </span>
                  <button 
                    onClick={() => setSuccessTx(null)}
                    className="text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                <div className="pt-2 text-slate-300 space-y-1 font-mono">
                  <div>Swapped: <strong className="text-white">{successTx.fromText}</strong> for <strong className="text-amber-300">{successTx.toText}</strong></div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Tx Hash: <span className="text-emerald-400">{successTx.hash}</span></span>
                    <a href="#omnex-mainnet" className="text-amber-400 hover:underline flex items-center gap-0.5">
                      Explorer <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};
