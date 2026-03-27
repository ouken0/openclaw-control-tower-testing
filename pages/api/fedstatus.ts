import type { NextApiRequest, NextApiResponse } from 'next';
import { FedStatusData } from '../../lib/types';

// Simple working version that returns mock data matching the API format
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FedStatusData | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Return data in the same format as the Python script
    const data: FedStatusData = {
      timestamp: new Date().toISOString(),
      federation: 'OpenClaw Federation',
      version: 'v5.4',
      agents: [
        {
          id: 'amin',
          name: 'Amin',
          role: 'Digital Steward',
          model: 'zai/glm-4.5-flash',
          provider: 'ZAI Cloud',
          status: 'active',
          lastActivity: new Date().toISOString(),
          successRate: 98.5,
          tokenUsage: { input: 125000, output: 45000 },
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
          lastActivity: new Date(Date.now() - 1800000).toISOString(),
          successRate: 96.2,
          tokenUsage: { input: 89000, output: 32000 },
          avgResponseTime: 1200,
          tasksCompleted: 156,
          currentTask: 'Pending content queue',
        },
        {
          id: 'bahith',
          name: 'Bāḥith',
          role: 'Research Specialist',
          model: 'phi3:mini',
          provider: 'Ollama Local',
          status: 'active',
          lastActivity: new Date().toISOString(),
          successRate: 94.8,
          tokenUsage: { input: 67000, output: 24000 },
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
          lastActivity: new Date().toISOString(),
          successRate: 97.1,
          tokenUsage: { input: 156000, output: 67000 },
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
          lastActivity: new Date().toISOString(),
          successRate: 95.5,
          tokenUsage: { input: 98000, output: 38000 },
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
          lastActivity: new Date().toISOString(),
          successRate: 99.2,
          tokenUsage: { input: 45000, output: 28000 },
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
          lastActivity: new Date().toISOString(),
          successRate: 92.0,
          tokenUsage: { input: 23000, output: 0 },
          avgResponseTime: 3500,
          tasksCompleted: 67,
          currentTask: 'Image generation pipeline',
        },
        {
          id: 'munim',
          name: 'Mun\'im',
          role: 'Workflow Orchestrator',
          model: 'ollama/minimax-m2.7:cloud',
          provider: 'Ollama Cloud',
          status: 'active',
          lastActivity: new Date().toISOString(),
          successRate: 97.8,
          tokenUsage: { input: 178000, output: 72000 },
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
          lastActivity: new Date().toISOString(),
          successRate: 96.5,
          tokenUsage: { input: 34000, output: 18000 },
          avgResponseTime: 1800,
          tasksCompleted: 45,
          currentTask: 'Design concept development',
        },
      ],
      metrics: {
        totalAgents: 9,
        activeAgents: 8,
        idleAgents: 1,
        errorAgents: 0,
        overallSuccessRate: 96.4,
        totalTokenUsage: {
          input: 815000,
          output: 324000,
        },
        avgResponseTime: 1350,
        uptime: '24h 15m',
      },
      taskFlow: [
        {
          id: 'tf-1',
          from: 'Amin',
          to: 'Mun\'im',
          task: 'Daily optimization',
          status: 'active',
          startTime: new Date().toISOString(),
        },
        {
          id: 'tf-2',
          from: 'Mūsā',
          to: 'Qasid',
          task: 'Image generation',
          status: 'active',
          startTime: new Date().toISOString(),
        },
        {
          id: 'tf-3',
          from: 'Kātib',
          to: 'Khatib',
          task: 'Content review',
          status: 'pending',
          startTime: new Date().toISOString(),
        },
      ],
      alerts: [
        {
          id: 'a-1',
          type: 'info',
          agent: 'Kātib',
          message: 'Idle - content queue empty',
          timestamp: new Date().toISOString(),
          acknowledged: false,
        },
      ],
    };

    // Enable CORS for local development
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store');
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch federation status' 
    });
  }
}