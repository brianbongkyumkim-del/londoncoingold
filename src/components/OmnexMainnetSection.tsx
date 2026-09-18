import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Database, 
  ShieldCheck, 
  Network, 
  Zap, 
  ArrowUpRight, 
  CheckCircle2, 
  Layers, 
  Activity,
  Server
} from 'lucide-react';
import { OMNEX_NETWORK_INFO, INITIAL_MAINNET_BLOCKS, INITIAL_MAINNET_TXS } from '../data/ecosystemData';
import { OmnexBlock, OmnexTransaction } from '../types';

export const OmnexMainnetSection: React.FC = () => {
  const [blocks, setBlocks] = useState<OmnexBlock[]>(INITIAL_MAINNET_BLOCKS);
  const [txs, setTxs] = useState<OmnexTransaction[]>(INITIAL_MAINNET_TXS);
  const [activeTab, setActiveTab] = useState<'architecture' | 'blocks' | 'txs' | 'validators'>('architecture');

  // Simulated live block stream
  useEffect(() => {
    const interval = setInterval(() => {
      setBlocks(prev => {
        const topHeight = prev[0]?.height || 4892105;
        const newBlock: OmnexBlock = {
          height: topHeight + 1,
          hash: `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`,
          proposer: ['London-Validator-01', 'Tokyo-Apex-Node', 'Zurich-GoldVault-Staker', 'Frankfurt-Core-04', 'Singapore-Nexus-02', 'NewYork-Liberty-Node'][Math.floor(Math.random() * 6)],
          txCount: Math.floor(Math.random() * 250) + 120,
          timestamp: 'Just now',
          gasUsed: `${(Math.random() * 40 + 30).toFixed(1)}%`,
          rewardLdxg: 2.5
        };
        return [newBlock, ...prev.slice(0, 4)];
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="omnex-mainnet" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium mb-3">
            <Network className="w-3.5 h-3.5" />
            <span>LAYER-1 MAINNET INFRASTRUCTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            OMNEX as the Mainnet for Global Projects
          </h2>
          <p className="text-slate-400 max-w-2xl mt-2 text-sm sm:text-base">
            OMNEX provides sovereign execution, instant finality, and zero-slippage cross-token liquidity pools anchored directly by LondonCoinGold (LDXG).
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0c101a] border border-white/10 text-xs font-medium">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3.5 py-2 rounded-lg transition-all ${activeTab === 'architecture' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            Architecture
          </button>
          <button
            onClick={() => setActiveTab('blocks')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1 ${activeTab === 'blocks' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            <span>Live Blocks</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </button>
          <button
            onClick={() => setActiveTab('txs')}
            className={`px-3.5 py-2 rounded-lg transition-all ${activeTab === 'txs' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            Cross-Token Txs
          </button>
          <button
            onClick={() => setActiveTab('validators')}
            className={`px-3.5 py-2 rounded-lg transition-all ${activeTab === 'validators' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            Validators (128)
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'architecture' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-3xl bg-[#0c101a] border border-emerald-500/20 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Sub-Second Finality & 65,000 TPS</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              OMNEX runs a parallelized BFT consensus engine capable of processing micro-transactions for social feeds (MeSocialize), IoT telematics (FirstPure), and aviation telemetry (FlySafe) simultaneously without congestion.
            </p>
            <ul className="space-y-2 text-xs text-slate-400 font-mono">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>0.85s average block generation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Average transaction fee: $0.00028 USD</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero MEV front-running exploitation</span>
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-3xl bg-[#0c101a] border border-amber-500/20 relative overflow-hidden group hover:border-amber-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-950/80 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">LDXG Universal Settlement Layer</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Instead of volatile gas assets or fragmented wrapped stables, LondonCoinGold (LDXG) serves as the canonical base reserve for every token deployed on OMNEX, backed 1:1 by LBMA-allocated gold.
            </p>
            <ul className="space-y-2 text-xs text-slate-400 font-mono">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Unified AMM liquidity pools for all 8 projects</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Automated multi-token collateral liquidation buffer</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Instant cross-project settlements with zero slippage</span>
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-3xl bg-[#0c101a] border border-sky-500/20 relative overflow-hidden group hover:border-sky-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-6 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Modular OMNEX-20 Token Engine</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Projects deploy customized token logic using OMNEX standard presets: Dual-Token (GLBX), Real-World Asset (MILK, FSC), AI Autonomous Agents (AISA), and Micro-Utility (FLY, MSZ).
            </p>
            <ul className="space-y-2 text-xs text-slate-400 font-mono">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Native EVM & WASM dual-runtime compatibility</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Built-in zk-oracle triggers (flight radar, IoT)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                <span>1-click liquidity bootstrap with LDXG vaults</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Live Blocks Stream Tab */}
      {activeTab === 'blocks' && (
        <div className="rounded-3xl bg-[#0c101a] border border-white/10 p-6 overflow-x-auto">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <Activity className="w-4 h-4 animate-spin" />
              <span>Real-time OMNEX Mainnet Block Stream</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">Consensus Epoch #892</span>
          </div>

          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="text-slate-400 border-b border-white/5 pb-2">
                <th className="py-2.5">BLOCK HEIGHT</th>
                <th>HASH</th>
                <th>PROPOSER VALIDATOR</th>
                <th>TXS COUNT</th>
                <th>GAS CAPACITY</th>
                <th>REWARD</th>
                <th>TIMESTAMP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {blocks.map(block => (
                <tr key={block.height} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 font-bold text-emerald-400">#{block.height.toLocaleString()}</td>
                  <td className="text-slate-400">{block.hash}</td>
                  <td className="font-semibold text-white">{block.proposer}</td>
                  <td>{block.txCount} txs</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: block.gasUsed }} />
                      </div>
                      <span className="text-slate-400">{block.gasUsed}</span>
                    </div>
                  </td>
                  <td className="text-amber-400 font-semibold">+{block.rewardLdxg} LDXG</td>
                  <td className="text-slate-400">{block.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Cross-Token Transactions Tab */}
      {activeTab === 'txs' && (
        <div className="rounded-3xl bg-[#0c101a] border border-white/10 p-6 overflow-x-auto">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
            <span className="text-xs font-mono text-amber-400">Recent Inter-Token Settled Transactions via LDXG</span>
            <span className="text-xs text-slate-400 font-mono">Zero Slippage Routing</span>
          </div>

          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="text-slate-400 border-b border-white/5 pb-2">
                <th className="py-2.5">TX HASH</th>
                <th>ACTION</th>
                <th>SWAP / SETTLEMENT ROUTE</th>
                <th>VALUE (USD)</th>
                <th>OMNEX FEE</th>
                <th>STATUS</th>
                <th>TIME</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {txs.map(tx => (
                <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 text-sky-400">{tx.hash}</td>
                  <td>
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px]">
                      {tx.action}
                    </span>
                  </td>
                  <td className="font-semibold text-white">{tx.tokens}</td>
                  <td className="text-slate-300">{tx.amount}</td>
                  <td className="text-emerald-400">{tx.fee}</td>
                  <td>
                    <span className="inline-flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" />
                      {tx.status}
                    </span>
                  </td>
                  <td className="text-slate-400">{tx.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Validators Tab */}
      {activeTab === 'validators' && (
        <div className="p-6 rounded-3xl bg-[#0c101a] border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
              <span className="text-xs text-slate-400 font-mono">ACTIVE VALIDATORS</span>
              <div className="text-2xl font-bold text-white mt-1">128 Nodes</div>
              <div className="text-[11px] text-emerald-400 mt-0.5">100% Uptime</div>
            </div>
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
              <span className="text-xs text-slate-400 font-mono">TOTAL STAKED</span>
              <div className="text-2xl font-bold text-emerald-400 mt-1">{OMNEX_NETWORK_INFO.totalStakedOmnex}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">+ 15M LDXG Reserve</div>
            </div>
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
              <span className="text-xs text-slate-400 font-mono">STAKING APY</span>
              <div className="text-2xl font-bold text-amber-400 mt-1">12.4% APY</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Paid in Gold (LDXG)</div>
            </div>
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
              <span className="text-xs text-slate-400 font-mono">GEOGRAPHIC COVERAGE</span>
              <div className="text-2xl font-bold text-white mt-1">24 Countries</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Tier-4 Datacenters</div>
            </div>
          </div>

          <div className="text-xs text-slate-400 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
            <span className="flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-400" />
              <span>Consensus nodes running across London (Equinix LD4), Zurich, Frankfurt, Tokyo, Singapore & New York.</span>
            </span>
            <span className="text-amber-400 font-mono">Slashing protection backed by LDXG Vaults</span>
          </div>
        </div>
      )}
    </section>
  );
};
