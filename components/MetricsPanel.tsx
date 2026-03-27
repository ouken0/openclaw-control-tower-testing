import { FederationMetrics } from '../lib/types';

interface MetricsPanelProps {
  metrics: FederationMetrics;
}

export default function MetricsPanel({ metrics }: MetricsPanelProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Federation Metrics</h2>
      
      {/* Success Rate */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Success Rate</span>
          <span className="text-2xl font-bold text-green-600">
            {metrics.overallSuccessRate.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${metrics.overallSuccessRate}%` }}
          />
        </div>
      </div>

      {/* Agent Status */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{metrics.activeAgents}</div>
          <div className="text-xs text-green-700">Active</div>
        </div>
        <div className="text-center p-3 bg-yellow-50 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">{metrics.idleAgents}</div>
          <div className="text-xs text-yellow-700">Idle</div>
        </div>
        <div className="text-center p-3 bg-red-50 rounded-lg">
          <div className="text-2xl font-bold text-red-600">{metrics.errorAgents}</div>
          <div className="text-xs text-red-700">Errors</div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{metrics.totalAgents}</div>
          <div className="text-xs text-blue-700">Total</div>
        </div>
      </div>

      {/* Token Usage */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Token Usage</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-50 rounded p-2">
            <div className="text-lg font-bold text-gray-900">{formatNumber(metrics.totalTokenUsage.input)}</div>
            <div className="text-xs text-gray-500">Input Tokens</div>
          </div>
          <div className="bg-gray-50 rounded p-2">
            <div className="text-lg font-bold text-gray-900">{formatNumber(metrics.totalTokenUsage.output)}</div>
            <div className="text-xs text-gray-500">Output Tokens</div>
          </div>
        </div>
      </div>

      {/* Response Time */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Average Response Time</h3>
        <div className="bg-gray-50 rounded p-3">
          <div className="text-2xl font-bold text-gray-900">
            {(metrics.avgResponseTime / 1000).toFixed(1)}s
          </div>
          <div className="text-xs text-gray-500">Across all agents</div>
        </div>
      </div>
    </div>
  );
}