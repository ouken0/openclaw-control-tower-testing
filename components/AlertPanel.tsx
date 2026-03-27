import { Alert } from '../lib/types';

interface AlertPanelProps {
  alerts: Alert[];
}

export default function AlertPanel({ alerts }: AlertPanelProps) {
  const alertColors = {
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const alertIcons = {
    error: '⚠️',
    warning: '⚠️',
    info: 'ℹ️',
  };

  if (alerts.length === 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center">
          <span className="text-green-600 mr-2">✅</span>
          <span className="text-green-800">All systems operational</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <div 
          key={alert.id} 
          className={`border rounded-lg p-4 ${alertColors[alert.type]}`}
        >
          <div className="flex items-start">
            <span className="mr-2">{alertIcons[alert.type]}</span>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">{alert.type.toUpperCase()}</span>
                <span className="text-xs opacity-75">
                  {new Date(alert.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className="text-sm">
                <span className="font-medium">{alert.agent}: </span>
                {alert.message}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}