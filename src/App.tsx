/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InteractiveEcosystemMap } from './components/InteractiveEcosystemMap';
import { OmnexMainnetSection } from './components/OmnexMainnetSection';
import { LiquidityBridgeSimulator } from './components/LiquidityBridgeSimulator';
import { ProjectsGrid } from './components/ProjectsGrid';
import { LdxgHoldersOwnershipSection } from './components/LdxgHoldersOwnershipSection';
import { TokenomicsSection } from './components/TokenomicsSection';
import { DeveloperSdkSection } from './components/DeveloperSdkSection';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { WhitepaperModal } from './components/WhitepaperModal';
import { DeveloperModal } from './components/DeveloperModal';
import { Footer } from './components/Footer';
import { EcosystemProject, WalletState } from './types';

export default function App() {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: true,
    address: '0x32df...54b2',
    balances: {
      LDXG: 1250,
      OMNX: 450,
      FLY: 3400,
      MILK: 8200,
      MSZ: 15400,
      BLC: 1200,
      LDXT: 980,
      KSB: 420,
      FSC: 310,
      ASA: 850,
    },
  });

  const [selectedProject, setSelectedProject] = useState<EcosystemProject | null>(null);
  const [isWhitepaperOpen, setIsWhitepaperOpen] = useState(false);
  const [isDeveloperModalOpen, setIsDeveloperModalOpen] = useState(false);
  const [swapTargetToken, setSwapTargetToken] = useState('FLY');

  const handleConnectWallet = () => {
    setWallet(prev => ({
      ...prev,
      isConnected: !prev.isConnected,
    }));
  };

  const handleUpdateWalletBalances = (newBalances: Record<string, number>) => {
    setWallet(prev => ({
      ...prev,
      balances: newBalances,
    }));
  };

  const handleOpenSwap = (targetTokenSymbol: string) => {
    setSwapTargetToken(targetTokenSymbol);
    const bridgeEl = document.getElementById('liquidity-bridge');
    if (bridgeEl) {
      bridgeEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080B11] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Navbar */}
      <Navbar
        wallet={wallet}
        onConnectWallet={handleConnectWallet}
        onOpenWhitepaper={() => setIsWhitepaperOpen(true)}
        onOpenDeveloperModal={() => setIsDeveloperModalOpen(true)}
      />

      {/* Main Content Flow */}
      <main>
        {/* 1. Hero Section */}
        <HeroSection
          onOpenWhitepaper={() => setIsWhitepaperOpen(true)}
          onOpenDeveloperModal={() => setIsDeveloperModalOpen(true)}
        />

        {/* 2. Official Topology Diagram faithfully recreating page 1 of document */}
        <InteractiveEcosystemMap
          onSelectProject={(proj) => setSelectedProject(proj)}
          onOpenSwap={handleOpenSwap}
        />

        {/* 3. LondonCoinGold Holders 10% Ownership Protocol & Interactive Calculator */}
        <LdxgHoldersOwnershipSection
          wallet={wallet}
          onUpdateWalletBalances={handleUpdateWalletBalances}
          onOpenWhitepaper={() => setIsWhitepaperOpen(true)}
          onOpenSwap={handleOpenSwap}
        />

        {/* 4. OMNEX as the Mainnet for other projects */}
        <OmnexMainnetSection />

        {/* 5. Interactive Cross-Project Liquidity Swap & Bridge */}
        <LiquidityBridgeSimulator
          wallet={wallet}
          onUpdateWalletBalances={handleUpdateWalletBalances}
          onConnectWallet={handleConnectWallet}
          preselectedToken={swapTargetToken}
        />

        {/* 6. Deep-Dive Cards for the 9 Allied Projects with 10% Allocation */}
        <ProjectsGrid
          onSelectProject={(proj) => setSelectedProject(proj)}
          onOpenSwap={handleOpenSwap}
        />

        {/* 7. Gold Reserves & Tokenomics */}
        <TokenomicsSection />

        {/* 8. Developer SDK & CLI Guide */}
        <DeveloperSdkSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenSwap={handleOpenSwap}
      />

      <WhitepaperModal
        isOpen={isWhitepaperOpen}
        onClose={() => setIsWhitepaperOpen(false)}
      />

      <DeveloperModal
        isOpen={isDeveloperModalOpen}
        onClose={() => setIsDeveloperModalOpen(false)}
      />
    </div>
  );
}
