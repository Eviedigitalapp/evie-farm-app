import { useState } from 'react';
import { Plus, CheckCircle, Circle, Clock } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  category: 'crop' | 'livestock' | 'maintenance' | 'general';
  status: 'pending' | 'in-progress' | 'completed';
  assignee: string;
}

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Spray Coffee for Berry Disease',
      description: 'Apply fungicide to coffee plantation',
      dueDate: '2026-05-18',
      priority: 'high',
      category: 'crop',
      status: 'pending',
      assignee: 'Moses'
    },
    {
      id: 2,
      title: 'Pig Vaccination',
      description: 'Vaccinate all pigs against African Swine Fever',
      dueDate: '2026-05-20',
      priority: 'high',
      category: 'livestock',
      status: 'in-progress',
      assignee: 'Nakato'
    },
    {
      id: 3,
      title: 'Harvest Matoke',
      description: 'Cut ripe matoke bunches from plantation',
      dueDate: '2026-05-22',
      priority: 'high',
      category: 'crop',
      status: 'pending',
      assignee: 'Team'
    },
    {
      id: 4,
      title: 'Check Valley Tank',
      description: 'Inspect irrigation tank for leaks',
      dueDate: '2026-05-25',
      priority: 'medium',
      category: 'maintenance',
      status: 'pending',
      assignee: 'Okello'
    },
    {
      id: 5,
      title: 'Weed Sweet Potato Garden',
      description: 'Remove weeds from valley plot',
      dueDate: '2026-05-19',
      priority: 'medium',
      category: 'crop',
      status: 'pending',
      assignee: 'Grace & helpers'
    },
    {
      id: 6,
      title: 'Clean Pig Sty',
      description: 'Deep clean and disinfect pig housing',
      dueDate: '2026-05-16',
      priority: 'low',
      category: 'livestock',
      status: 'completed',
      assignee: 'Samuel'
    },
    {
      id: 7,
      title: 'Transport Coffee to Cooperative',
      description: 'Deliver harvested cherries to NUCAFE',
      dueDate: '2026-05-30',
      priority: 'high',
      category: 'general',
      status: 'pending',
      assignee: 'Moses'
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-orange-100 text-orange-700';
      case 'low': return 'bg-blue-100 text-blue-700';
    }
  };

  const getCategoryColor = (category: Task['category']) => {
    switch (category) {
      case 'crop': return 'bg-green-100 text-green-700';
      case 'livestock': return 'bg-blue-100 text-blue-700';
      case 'maintenance': return 'bg-purple-100 text-purple-700';
      case 'general': return 'bg-gray-100 text-gray-700';
    }
  };

  const toggleTaskStatus = (taskId: number) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          status: task.status === 'completed' ? 'pending' : 'completed'
        };
      }
      return task;
    }));
  };

  const pendingTasks = tasks.filter(t => t.status !== 'completed');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold mb-2">Task Manager</h1>
          <p className="text-gray-600">Organize and track your farm activities</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="font-semibold mb-4">Create New Task</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Task Title</label>
              <input
                type="text"
                placeholder="e.g., Water crops"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                placeholder="Task details..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Due Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Priority</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Category</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Crop</option>
                <option>Livestock</option>
                <option>Maintenance</option>
                <option>General</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Assignee</label>
              <input
                type="text"
                placeholder="Who's responsible?"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Create Task
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-gray-600">Pending</p>
              <p className="font-semibold">{tasks.filter(t => t.status === 'pending').length} tasks</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Circle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600">In Progress</p>
              <p className="font-semibold">{tasks.filter(t => t.status === 'in-progress').length} tasks</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600">Completed</p>
              <p className="font-semibold">{tasks.filter(t => t.status === 'completed').length} tasks</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="font-semibold mb-4">Pending & In Progress</h2>
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <div key={task.id} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleTaskStatus(task.id)}
                    className="mt-1 text-gray-400 hover:text-green-600 transition-colors"
                  >
                    <Circle className="w-5 h-5" />
                  </button>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold mb-1">{task.title}</h3>
                        <p className="text-gray-600">{task.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 rounded text-sm whitespace-nowrap ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className={`px-2 py-1 rounded text-sm whitespace-nowrap ${getCategoryColor(task.category)}`}>
                          {task.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-gray-600">
                      <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Assignee: {task.assignee}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {completedTasks.length > 0 && (
          <div>
            <h2 className="font-semibold mb-4">Completed</h2>
            <div className="space-y-3">
              {completedTasks.map((task) => (
                <div key={task.id} className="bg-gray-50 rounded-lg border border-gray-200 p-4 opacity-75">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className="mt-1 text-green-600 hover:text-gray-400 transition-colors"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold mb-1 line-through">{task.title}</h3>
                          <p className="text-gray-600 line-through">{task.description}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-sm ${getCategoryColor(task.category)}`}>
                          {task.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-gray-600">
                        <span>Completed on: {new Date(task.dueDate).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{task.assignee}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
