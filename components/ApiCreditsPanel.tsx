'use client';

import { useState, useEffect } from 'react';
import SpeedometerGauge from './SpeedometerGauge';
import { ApiCreditInfo, ApiCreditsData } from '../lib/apiCredits';

interface ApiCreditsPanelProps {
  data?: ApiCreditsData;
  autoRefresh?: boolean;
  refreshInterval?: number; // ms
}

export default function ApiCreditsPanel({ 
  data: propData,
  autoRefresh = true,
  refreshInterval = 60000,
}: ApiCreditsPanelProps) {
  const [data, setData] = useState<ApiCreditsData | null>(propData || null);
  const [isLoading, setIsLoading] = useState(!propData);
  const [lastRefresh, setLastRefresh] = useState<string | null>(null);

  useEffect(() => {
    if (propData) {
      setData(propData);
      return;
    }

    const fetchCredits = async () => {
      try {
        const response = await fetch('/api/credits');
        if (response.ok) {
          const creditData = await response.json();
          setData(creditData);
          setLastRefresh(new Date().toLocaleTimeString());
        }
      } catch (error) {
        console.error('Failed to fetch credits:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCredits();

    if (autoRefresh) {
      const interval = setInterval(fetchCredits, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [propData, autoRefresh, refreshInterval]);

  if (isLoading || !data) {
    return (
      <div className="bg-slate-800 rounded-xl p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-slate-700 rounded w-1/3"></div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-slate-700 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: ApiCreditInfo['status']) => {
    switch (status) {
      case 'healthy': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-orange-400';
      case 'exhausted': return 'text-red-400';
    }
  };

  const getStatusBg = (status: ApiCreditInfo['status']) => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-orange-500';
      case 'exhausted': return 'bg-red-500';
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            💎 API Credits Monitor
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Real-time provider usage tracking
          </p>
        </div>
        <div className="text-right">
          {lastRefresh && (
            <div className="text-xs text-slate-500">
              Last refresh: {lastRefresh}
            </div>
          )}
          <div className={`text-sm font-medium ${
            data.overallHealth === 'healthy' ? 'text-green-400' :
            data.overallHealth === 'warning' ? 'text-yellow-400' : 'text-red-400'
          }`}>
            Overall: {data.overallHealth.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Provider Cards with Speedometers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {data.providers.map((provider) => (
          <div 
            key={provider.provider}
            className="bg-slate-700/50 rounded-xl p-4 border border-slate-600 hover:border-slate-500 transition-colors"
          >
            {/* Provider Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{provider.icon}</span>
                <div>
                  <div className="text-white font-medium text-sm">
                    {provider.displayName}
                  </div>
                  <div className={`text-xs ${getStatusColor(provider.status)}`}>
                    {provider.status.toUpperCase()}
                  </div>
                </div>
              </div>
              <div className={`w-2 h-2 rounded-full ${getStatusBg(provider.status)}`}></div>
            </div>

            {/* Speedometer */}
            <SpeedometerGauge
              value={provider.percentUsed}
              size={140}
              label="Usage"
              sublabel={`${provider.daysUntilReset}d until reset`}
              thresholds={{ warning: 60, critical: 80 }}
            />

            {/* Rate Usage */}
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                Rate: {provider.currentRateUsage}/{provider.rateLimitPerMinute}/min
              </span>
              <div className="w-16 h-1.5 bg-slate-600 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getStatusBg(provider.status)}`}
                  style={{ width: `${(provider.currentRateUsage / provider.rateLimitPerMinute) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Agent Usage Table */}
      <div className="bg-slate-700/30 rounded-xl p-4">
        <h3 className="text-white font-medium mb-3 flex items-center gap-2">
          📊 Per-Agent Usage Breakdown
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 border-b border-slate-600">
                <th className="text-left py-2 px-3">Provider</th>
                <th className="text-left py-2 px-3">Agent</th>
                <th className="text-right py-2 px-3">Tokens</th>
                <th className="text-right py-2 px-3">Limit</th>
                <th className="text-right py-2 px-3">Requests</th>
                <th className="text-right py-2 px-3">Limit</th>
                <th className="text-right py-2 px-3">Cost (USD)</th>
              </tr>
            </thead>
            <tbody>
              {data.providers.flatMap(p => 
                p.agentUsage.map((usage, idx) => (
                  <tr 
                    key={`${p.provider}-${usage.agentName}-${idx}`}
                    className="border-b border-slate-700/50 hover:bg-slate-700/30"
                  >
                    <td className="py-2 px-3">
                      <span className="flex items-center gap-1">
                        <span>{p.icon}</span>
                        <span className="text-slate-300">{p.displayName}</span>
                      </span>
                    </td>
                    <td className="py-2 px-3 text-slate-300">{usage.agentName}</td>
                    <td className="py-2 px-3 text-right text-slate-400 font-mono">
                      {usage.tokensUsed.toLocaleString()}
                    </td>
                    <td className="py-2 px-3 text-right text-slate-400">
                      {usage.requests}
                    </td>
                    <td className="py-2 px-3 text-right font-mono">
                      <span className={usage.costUSD > 0 ? 'text-yellow-400' : 'text-slate-500'}>
                        ${usage.costUSD.toFixed(3)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reset Timeline */}
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span>All resets occur on the 1st of each month</span>
        <span>Next reset in {Math.min(...data.providers.map(p => p.daysUntilReset))} days</span>
      </div>
    </div>
  );
}
