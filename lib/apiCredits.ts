export interface ApiCreditInfo {
  provider: string;
  displayName: string;
  icon: string;
  totalCredits: number;
  usedCredits: number;
  remainingCredits: number;
  percentUsed: number;
  resetDate: string;
  daysUntilReset: number;
  rateLimitPerMinute: number;
  currentRateUsage: number;
  status: 'healthy' | 'warning' | 'critical' | 'exhausted';
  lastUpdated: string;
  agentUsage: {
    agentName: string;
    tokensUsed: number;
    costUSD: number;
    requests: number;
  }[];
}

export interface ApiCreditsData {
  providers: ApiCreditInfo[];
  totalMonthlyBudget: number;
  totalUsed: number;
  totalRemaining: number;
  overallHealth: 'healthy' | 'warning' | 'critical';
  lastFullRefresh: string;
}

// Generate mock data
export function generateMockCredits(): ApiCreditsData {
  return {
    providers: [
      {
        provider: 'HuggingFace',
        displayName: 'HuggingFace',
        icon: '🤖',
        totalCredits: 100000,
        usedCredits: 45000,
        remainingCredits: 55000,
        percentUsed: 45,
        resetDate: '2026-04-23',
        daysUntilReset: 30,
        rateLimitPerMinute: 60,
        currentRateUsage: 12,
        status: 'healthy',
        lastUpdated: new Date().toISOString(),
        agentUsage: [
          { agentName: 'Qasid (Image Gen)', tokensUsed: 125000, costUSD: 0, requests: 45 },
          { agentName: 'Mūsā (Design)', tokensUsed: 89000, costUSD: 0, requests: 23 }
        ]
      },
      {
        provider: 'Google AI',
        displayName: 'Google AI',
        icon: '🔵',
        totalCredits: 500000,
        usedCredits: 125000,
        remainingCredits: 375000,
        percentUsed: 25,
        resetDate: '2026-04-23',
        daysUntilReset: 30,
        rateLimitPerMinute: 120,
        currentRateUsage: 45,
        status: 'healthy',
        lastUpdated: new Date().toISOString(),
        agentUsage: [
          { agentName: 'Mūsā (Design)', tokensUsed: 65000, costUSD: 15, requests: 12 },
          { agentName: 'Mun\'im', tokensUsed: 42000, costUSD: 8, requests: 8 }
        ]
      }
    ],
    totalMonthlyBudget: 100000,
    totalUsed: 170000,
    totalRemaining: 830000,
    overallHealth: 'healthy',
    lastFullRefresh: new Date().toISOString(),
  };
}