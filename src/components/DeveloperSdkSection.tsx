import React, { useState } from 'react';
import { 
  Terminal, 
  Code2, 
  Copy, 
  CheckCircle2, 
  ExternalLink, 
  Cpu, 
  BookOpen,
  ArrowRight
} from 'lucide-react';

export const DeveloperSdkSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ts' | 'solidity' | 'cli'>('ts');
  const [copied, setCopied] = useState(false);

  const snippets = {
    ts: `import { OmnexClient, LondonCoinGold } from '@omnex/sdk';

// 1. Initialize connection to OMNEX Mainnet
const omnex = new OmnexClient({
  rpcUrl: 'https://rpc.omnex.network',
  chainId: 8920, // OMNEX Mainnet
});

// 2. Connect your Project Token to LDXG Liquidity Vault
const ldxgPool = await LondonCoinGold.getLiquidityPool({
  targetToken: 'FLY', // e.g., FlySafe, MILK, MSZ, etc.
  slippageTolerance: 0.001,
});

// 3. Execute atomic cross-project settlement
const tx = await ldxgPool.swap({
  fromAmount: '150.00', // 150 LDXG (~150g Fine Gold)
  recipient: '0x32df...54b2',
  fastBridge: true, // 1.2s BFT finality
});

console.log('OMNEX Transaction Confirmed:', tx.hash);`,
    
    solidity: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@omnex/contracts/token/OMNEX20.sol";
import "@omnex/contracts/interfaces/ILDXGRouter.sol";

contract EnterpriseProjectToken is OMNEX20 {
    ILDXGRouter public immutable ldxgRouter;

    constructor(address _ldxgRouter) OMNEX20("Aviation Mobility Token", "FLY") {
        ldxgRouter = ILDXGRouter(_ldxgRouter);
    }

    /// @notice Instantly settle claim in LondonCoinGold (LDXG)
    function settleFlightDisruption(address passenger, uint256 claimAmount) external {
        _burn(passenger, claimAmount);
        
        // Disburse gold-backed settlement via LDXG Liquidity Vault
        ldxgRouter.disburseLiquidity(passenger, claimAmount);
    }
}`,

    cli: `# 1. Install OMNEX Mainnet Toolchain
curl -sSf https://install.omnex.network | sh

# 2. Verify connection to OMNEX Mainnet nodes
omnex-cli status --network mainnet

# 3. Deploy an enterprise project token with LDXG gold liquidity
omnex-cli deploy --token-standard OMNEX-20 \\
  --symbol MILK \\
  --name "FirstPure PureFerma" \\
  --pair-ldxg true \\
  --initial-liquidity-grams 50000`,
  };

  const copyCode = () => {
    navigator.clipboard.writeText(snippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-3xl bg-[#0c101a] border border-emerald-500/20 p-6 sm:p-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium mb-3">
              <Terminal className="w-3.5 h-3.5" />
              <span>BUILD ON OMNEX MAINNET</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Connect Your Project to the LDXG Gold Hub
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
              Any decentralized application, fintech service, or industrial enterprise can deploy as a sovereign token on OMNEX and plug into LDXG automated liquidity.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-2">
            <div className="flex rounded-xl bg-black/40 border border-white/10 p-1 text-xs font-mono">
              <button
                onClick={() => setActiveTab('ts')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === 'ts' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                TypeScript SDK
              </button>
              <button
                onClick={() => setActiveTab('solidity')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === 'solidity' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                Solidity Hook
              </button>
              <button
                onClick={() => setActiveTab('cli')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === 'cli' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                CLI Deploy
              </button>
            </div>

            <button
              onClick={copyCode}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 text-xs transition-colors flex items-center gap-1.5"
              title="Copy code"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Code Snippet Box */}
        <div className="relative rounded-2xl bg-[#070a10] border border-white/10 p-5 font-mono text-xs overflow-x-auto shadow-inner">
          <pre className="text-emerald-300/90 leading-relaxed">
            <code>{snippets[activeTab]}</code>
          </pre>
        </div>

        {/* Developer Perks Footer */}
        <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-4 text-slate-400">
            <span>• Sub-cent gas fees</span>
            <span>• 100% LBMA Gold Liquidity pairing</span>
            <span>• Full EVM & WASM compatibility</span>
          </div>
          <a
            href="https://docs.omnex.network"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Developer Documentation & RPC Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
