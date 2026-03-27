import { Agent } from '../lib/types';

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  const statusColors = {
    active: 'bg-green-500',
    idle: 'bg-yellow-500',
    error: 'bg-red-500',
    unknown: 'bg-gray-400',
  };

  const statusBorders = {
    active: 'border-green-500',
    idle: 'border-yellow-500',
    error: 'border-red-500',
    unknown: 'border-gray-400',
  };

  const statusTexts = {
    active: 'Active',
    idle: 'Idle',
    error: 'Error',
    unknown: 'Unknown',
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className={`bg-white rounded-lg shadow-md border-l-4 ${statusBorders[agent.status]} hover:shadow-lg transition-all p-4`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-gray-900 text-lg">{agent.name}</h3>
          <p className="text-xs text-gray-500">{agent.role}</p>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-bold text-white ${statusColors[agent.status]}`}>
          {statusTexts[agent.status]}
        </div>
      </div>

      {/* Model Info */}
      <div className="mb-3">
        <div className="text-xs text-gray-500 uppercase tracking-wide">Model</div>
        <div className="text-sm font-mono text-gray-700 truncate" title={agent.model}>
          {agent.model}
        </div>
        <div className="text-xs text-gray-400">{agent.provider}</div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-gray-50 rounded p-2">
          <div className="text-lg font-bold text-green-600">{agent.successRate.toFixed(0)}%</div>
          <div className="text-xs text-gray-600">Success</div>
        </div>
        <div className="bg-gray-50 rounded p-2">
          <div className="text-lg font-bold text-blue-600">{(agent.avgResponseTime / 1000).toFixed(1)}s</div>
          <div className="text-xs text-gray-600">Avg Response</div>
        </div>
      </div>

      {/* Token Usage */}
      <div className="mb-3">
        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Token Usage</div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">
            In: {(agent.tokenUsage.input / 1000).toFixed(0)}K
          </span>
          <span className="text-gray-600">
            Out: {(agent.tokenUsage.output / 1000).toFixed(0)}K
          </span>
        </div>
      </div>

      {/* Current Task */}
      {agent.currentTask && (
        <div className="pt-3 border-t border-gray-200">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Current Task</div>
          <div className="text-sm text-gray-700 truncate" title={agent.currentTask}>
            {agent.currentTask}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-3 pt-2 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
        <span>{agent.tasksCompleted} tasks completed</span>
        <span>{formatTime(agent.lastActivity)}</span>
      </div>
    </div>
  );
}