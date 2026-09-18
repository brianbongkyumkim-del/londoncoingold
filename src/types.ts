export type ProjectSector = 
  | 'exchange' 
  | 'logistics' 
  | 'banking' 
  | 'aviation' 
  | 'finance' 
  | 'social' 
  | 'agritech' 
  | 'ai';

export interface EcosystemProject {
  id: string;
  name: string;
  tokenSymbol: string;
  subTokenSymbols?: string[];
  sector: ProjectSector;
  sectorLabel: string;
  tagline: string;
  fullDescription: string;
  logoTheme: {
    bg: string;
    text: string;
    border: string;
    accent: string;
    badgeStyle: string;
  };
  metrics: {
    priceInLdxg: number;
    priceUsd: number;
    ldxgPoolLiquidity: string;
    circulatingSupply: string;
    volume24h: string;
    tpsPeak: number;
    holders: number;
  };
  contractAddress: string;
  omnexStandard: 'OMNEX-20' | 'OMNEX-RWA' | 'OMNEX-AI' | 'OMNEX-DUAL';
  ldxgRole: string;
  tenPercentAllocation: {
    percentage: number; // 10%
    totalAllocatedTokens: string; // e.g. "500,000,000 BLC"
    ratioPerLdxg: number; // e.g. 5.0 tokens per 1 LDXG
    valuePer1000LdxgUsd: number;
    entitlementClause: string;
    whitepaperRef: string;
  };
  keyFeatures: string[];
  auditStatus: string;
  website: string;
}

export interface OmnexBlock {
  height: number;
  hash: string;
  proposer: string;
  txCount: number;
  timestamp: string;
  gasUsed: string;
  rewardLdxg: number;
}

export interface OmnexTransaction {
  id: string;
  hash: string;
  from: string;
  to: string;
  action: 'SWAP' | 'LIQUIDITY_ADD' | 'SETTLEMENT' | 'GOLD_PEG_REBALANCE' | 'STAKE';
  tokens: string;
  amount: string;
  timestamp: string;
  status: 'Confirmed' | 'Validating';
  fee: string;
}

export interface WalletState {
  isConnected: boolean;
  address: string;
  balances: Record<string, number>;
}
