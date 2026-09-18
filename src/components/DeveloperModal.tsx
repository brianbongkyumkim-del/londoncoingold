import React, { useState } from 'react';
import { X, Layers, CheckCircle2, Terminal, ArrowRight, ShieldCheck } from 'lucide-react';

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperModal: React.FC<DeveloperModalProps> = ({ isOpen, onClose }) => {
  const [projectName, setProjectName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [sector, setSector] = useState('enterprise');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div 
        className="relative w-full max-w-xl rounded-3xl bg-[#0c101a] border border-emerald-500/30 p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Deploy on OMNEX Mainnet</h3>
            <p className="text-xs text-slate-400 font-mono">Connect to the LDXG Universal Gold Liquidity Hub</p>
          </div>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-white">Application Received!</h4>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Your test project <strong>{projectName} ({tokenSymbol})</strong> has been registered in the OMNEX Developer Testbed. Our integration engineers will issue testnet LDXG liquidity faucet tokens to your wallet.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
            <p className="text-slate-300 font-sans text-xs leading-relaxed">
              Register your sovereign dApp, enterprise consortium, or consumer token to establish an automated liquidity pool with LondonCoinGold on OMNEX.
            </p>

            <div>
              <label className="block text-slate-400 mb-1">PROJECT NAME</label>
              <input
                type="text"
                required
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g. AeroChain, MedLedger, EcoToken"
                className="w-full bg-[#111726] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/60"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 mb-1">TOKEN SYMBOL</label>
                <input
                  type="text"
                  required
                  value={tokenSymbol}
                  onChange={(e) => setTokenSymbol(e.target.value.toUpperCase())}
                  placeholder="e.g. AERO"
                  className="w-full bg-[#111726] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/60"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">PRIMARY INDUSTRY</label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full bg-[#111726] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500/60"
                >
                  <option value="enterprise">Real-World Assets (RWA)</option>
                  <option value="finance">Banking & Fintech</option>
                  <option value="logistics">Supply Chain & Freight</option>
                  <option value="aviation">Mobility & Aviation</option>
                  <option value="social">Web3 Social & Creator</option>
                  <option value="ai">AI & Autonomous Compute</option>
                </select>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-[11px] text-slate-300 space-y-1 font-sans">
              <span className="font-bold text-amber-400 font-mono">Included in OMNEX Mainnet Onboarding:</span>
              <ul className="list-disc list-inside space-y-0.5 text-slate-400">
                <li>Automated AMM pool pairing with LDXG gold liquidity</li>
                <li>0.85s sub-second block finality with parallelized EVM execution</li>
                <li>Zero-cost developer faucet and gas sponsorship program</li>
              </ul>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20"
              >
                Submit Project
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
