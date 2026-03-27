'use client';
import { useState, useEffect } from 'react';

interface Agent {
  id: string;
  name: string;
  role: string;
  model: string;
  provider: string;
  status: 'active' | 'idle' | 'error' | 'unknown';
  successRate: number;
  avgResponseTime: number;
  tasksCompleted: number;
  currentTask?: string;
}

const mockData: Agent[] = [
  {
    id: 'amin',
    name: 'Amin',
    role: 'Digital Steward',
    model: 'zai/glm-5',
    provider: 'ZAI Cloud',
    status: 'active',
    successRate: 98.5,
    avgResponseTime: 850,
    tasksCompleted: 247,
    currentTask: 'Coordinating federation tasks',
  },
  {
    id: 'katib',
    name: 'Kātib',
    role: 'Content Creator',
    model: 'ollama/kimi-k2.5:cloud',
    provider: 'Ollama Cloud',
    status: 'idle',
    successRate: 96.2,
    avgResponseTime: 1200,
    tasksCompleted: 156,
    currentTask: 'Pending content queue',
  },
  {
    id: 'bahith',
    name: 'Bāḥith',
    role: 'Research Specialist',
    model: 'ollama/kimi-k2.5:cloud',
    provider: 'Ollama Cloud',
    status: 'active',
    successRate: 94.8,
    avgResponseTime: 1500,
    tasksCompleted: 89,
    currentTask: 'Research task execution',
  },
  {
    id: 'muhandis-github',
    name: 'Muhandis (GitHub)',
    role: 'Advanced Engineer',
    model: 'github-gpt-4o',
    provider: 'GitHub/Azure',
    status: 'active',
    successRate: 97.1,
    avgResponseTime: 2000,
    tasksCompleted: 312,
    currentTask: 'Code review and implementation',
  },
  {
    id: 'muhandis-std',
    name: 'Muhandis (Std)',
    role: 'Standard Engineer',
    model: 'groq/qwen3',
    provider: 'Groq Cloud',
    status: 'active',
    successRate: 95.5,
    avgResponseTime: 1100,
    tasksCompleted: 178,
    currentTask: 'Standard engineering tasks',
  },
  {
    id: 'khatib',
    name: 'Khatib',
    role: 'Telegram Communicator',
    model: 'phi3:mini',
    provider: 'Ollama Local',
    status: 'active',
    successRate: 99.2,
    avgResponseTime: 600,
    tasksCompleted: 523,
    currentTask: 'Telegram message handling',
  },
  {
    id: 'qasid',
    name: 'Qasid',
    role: 'Image Generator',
    model: 'FLUX.1-schnell',
    provider: 'HuggingFace',
    status: 'active',
    successRate: 92.0,
    avgResponseTime: 3500,
    tasksCompleted: 67,
    currentTask: 'Image generation pipeline',
  },
  {
    id: 'munim',
    name: "Mun'im",
    role: 'Workflow Orchestrator',
    model: 'ollama/minimax-m2.7:cloud',
    provider: 'Ollama Cloud',
    status: 'active',
    successRate: 97.8,
    avgResponseTime: 950,
    tasksCompleted: 421,
    currentTask: 'Daily optimization analysis',
  },
  {
    id: 'musa',
    name: 'Mūsā',
    role: 'Creative Designer',
    model: 'gemini-2.5-flash',
    provider: 'Google AI',
    status: 'active',
    successRate: 96.5,
    avgResponseTime: 1800,
    tasksCompleted: 45,
    currentTask: 'Design concept development',
  },
];

export default function Dashboard() {
  const [agents] = useState<Agent[]>(mockData);
  const [activeTab, setActiveTab] = useState<'agents' | 'credits' | 'metrics'>('agents');

  const AgentCard = ({ agent }: { agent: Agent }) => {
    const statusColors = {
      active: 'border-green-500',
      idle: 'border-yellow-500',
      error: 'border-red-500',
      unknown: 'border-gray-400',
    };

    const statusBadges = {
      active: 'bg-green-500 text-white',
      idle: 'bg-yellow-500 text-white',
      error: 'bg-red-500 text-white',
      unknown: 'bg-gray-400 text-white',
    };

    const statusTexts = {
      active: 'Active',
      idle: 'Idle',
      error: 'Error',
      unknown: 'Unknown',
    };

    return (
      <div className={`bg-white rounded-lg shadow-md border-l-4 ${statusColors[agent.status]} hover:shadow-lg transition-all p-4`}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{agent.name}</h3>
            <p className="text-xs text-gray-500">{agent.role}</p>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-bold ${statusBadges[agent.status]}`}>
            {statusTexts[agent.status]}
          </div>
        </div>

        <div className="mb-3">
          <div className="text-xs text-gray-500 uppercase tracking-wide">Model</div>
          <div className="text-sm font-mono text-gray-700 truncate" title={agent.model}>
            {agent.model}
          </div>
          <div className="text-xs text-gray-400">{agent.provider}</div>
        </div>

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

        {agent.currentTask && (
          <div className="pt-3 border-t border-gray-200">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Current Task</div>
            <div className="text-sm text-gray-700 truncate" title={agent.currentTask}>
              {agent.currentTask}
            </div>
          </div>
        )}

        <div className="mt-3 pt-2 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
          <span>{agent.tasksCompleted} tasks completed</span>
          <span>Recently</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              🦞 Federation Control Tower
            </h1>
            <p className="text-slate-400 text-lg">
              OpenClaw Federation • v5.4
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-500">Last Updated</div>
            <div className="text-white font-mono">7:15:00 PM</div>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <button
            onClick={() => setActiveTab('agents')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'agents'
                ? 'bg-blue-500 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            👥 Agents
          </button>
          <button
            onClick={() => setActiveTab('credits')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'credits'
                ? 'bg-blue-500 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            💎 API Credits
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'metrics'
                ? 'bg-blue-500 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            📊 Metrics
          </button>
        </div>

        <div className="mt-4 bg-slate-800/50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-300 font-medium">Federation Health</span>
            <span className="text-green-400 font-bold">96.4% Success Rate</span>
          </div>
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-full transition-all duration-500"
              style={{ width: '96.4%' }}
            />
          </div>
          <div className="flex justify-between mt-3 text-sm">
            <span className="text-green-400">● 8 Active</span>
            <span className="text-yellow-400">● 1 Idle</span>
            <span className="text-red-400">● 0 Error</span>
          </div>
        </div>
      </header>

      {activeTab === 'agents' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">Agent Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {agents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-white mb-4">Federation Metrics</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                  <div className="text-2xl font-bold text-green-400">8</div>
                  <div className="text-xs text-green-300">Active</div>
                </div>
                <div className="text-center p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                  <div className="text-2xl font-bold text-yellow-400">1</div>
                  <div className="text-xs text-yellow-300">Idle</div>
                </div>
                <div className="text-center p-3 bg-red-500/20 rounded-lg border border-red-500/30">
                  <div className="text-2xl font-bold text-red-400">0</div>
                  <div className="text-xs text-red-300">Errors</div>
                </div>
                <div className="text-center p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                  <div className="text-2xl font-bold text-blue-400">9</div>
                  <div className="text-xs text-blue-300">Total</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-slate-300 mb-2">Token Usage</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-700/50 rounded p-3">
                    <div className="text-lg font-bold text-white">815K</div>
                    <div className="text-xs text-slate-400">Input Tokens</div>
                  </div>
                  <div className="bg-slate-700/50 rounded p-3">
                    <div className="text-lg font-bold text-white">324K</div>
                    <div className="text-xs text-slate-400">Output Tokens</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-300 mb-2">Average Response Time</h3>
                <div className="bg-slate-700/50 rounded p-3">
                  <div className="text-2xl font-bold text-white">1.4s</div>
                  <div className="text-xs text-slate-400">Across all agents</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'credits' && (
        <div className="bg-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">💎 API Credits Monitor</h2>
          <p className="text-slate-400">Coming soon - provider usage tracking</p>
        </div>
      )}

      {activeTab === 'metrics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-800 rounded-xl p-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-green-400">96.4%</div>
              <div className="text-slate-400 mt-2">Success Rate</div>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-xl p-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-green-400">8</div>
              <div className="text-slate-400 mt-2">Active Agents</div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400">1.14M</div>
              <div className="text-slate-400 mt-2">Total Tokens</div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-cyan-400">1.4s</div>
              <div className="text-slate-400 mt-2">Avg Response</div>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-8 text-center text-slate-500 text-sm">
        Federation Control Tower • OpenClaw Gateway Adjacent • Port 18805 (Prod)
      </footer>
    </div>
  );
}