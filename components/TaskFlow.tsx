import type { TaskFlow } from '../lib/types';

interface TaskFlowProps {
  tasks: TaskFlow[];
}

export default function TaskFlow({ tasks }: TaskFlowProps) {
  const statusColors = {
    pending: 'bg-yellow-500',
    active: 'bg-green-500',
    completed: 'bg-blue-500',
    failed: 'bg-red-500',
  };

  const statusTexts = {
    pending: 'Pending',
    active: 'Active',
    completed: 'Completed',
    failed: 'Failed',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Task Flow</h2>
      
      {tasks.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No active tasks
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="border rounded-lg p-3 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${statusColors[task.status]}`} />
                  <span className="text-sm font-medium text-gray-700">{task.task}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full text-white ${statusColors[task.status]}`}>
                  {statusTexts[task.status]}
                </span>
              </div>
              
              <div className="text-xs text-gray-500 space-y-1">
                <div className="flex justify-between">
                  <span>From: {task.from}</span>
                  <span>To: {task.to}</span>
                </div>
                <div>Started: {new Date(task.startTime).toLocaleTimeString()}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}