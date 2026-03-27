// Federation Agent Types and Interfaces

export interface Agent {
  id: string;
  name: string;
  role: string;
  model: string;
  provider: string;
  status: 'active' | 'idle' | 'error' | 'unknown';
  lastActivity: string;
  successRate: number;
  tokenUsage: {
    input: number;
    output: number;
  };
  avgResponseTime: number;
  tasksCompleted: number;
  currentTask?: string;
}

export interface FederationMetrics {
  totalAgents: number;
  activeAgents: number;
  idleAgents: number;
  errorAgents: number;
  overallSuccessRate: number;
  totalTokenUsage: {
    input: number;
    output: number;
  };
  avgResponseTime: number;
  uptime: string;
}

export interface TaskFlow {
  id: string;
  from: string;
  to: string;
  task: string;
  status: 'pending' | 'active' | 'completed' | 'failed';
  startTime: string;
  duration?: number;
}

export interface Alert {
  id: string;
  type: 'error' | 'warning' | 'info';
  agent: string;
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

export interface FedStatusData {
  timestamp: string;
  federation: string;
  version: string;
  agents: Agent[];
  metrics: FederationMetrics;
  taskFlow: TaskFlow[];
  alerts: Alert[];
}
