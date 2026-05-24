import { useState } from 'react';
import { Plus, Calendar, User, Droplet, Sprout, Scissors, Package, FileText, Edit, Trash2, CheckSquare, ListTodo, Clock, AlertCircle } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface CropActivity {
  id: number;
  date: string;
  cropName: string;
  fieldLocation: string;
  activityType: ActivityType;
  staffAssigned: string;
  description: string;
  inputsUsed: string;
  quantityUsed: string;
  areaCovered: string;
  timeStarted: string;
  timeCompleted: string;
  observations: string;
  costIncurred: number;
  status: 'planned' | 'in-progress' | 'completed';
}

interface Task {
  id: number;
  taskName: string;
  assignedTo: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  cropName: string;
  fieldLocation: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdDate: string;
}

type ActivityType =
  | 'Land Preparation'
  | 'Planting/Sowing'
  | 'Weeding'
  | 'Fertilizer Application'
  | 'Pesticide Spraying'
  | 'Irrigation'
  | 'Pruning/Trimming'
  | 'Harvesting'
  | 'Post-Harvest Handling'
  | 'Soil Testing'
  | 'Mulching'
  | 'Disease/Pest Control'
  | 'General Maintenance';

export function CropActivities() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const [viewMode, setViewMode] = useState<'activities' | 'tasks'>('tasks');

  const [tasks, setTasks] = useLocalStorage<Task[]>('crop-tasks', [
    {
      id: 1,
      taskName: 'Weed Groundnut Field',
      assignedTo: 'Grace Auma',
      dueDate: '2026-05-20',
      priority: 'high',
      cropName: 'Groundnuts',
      fieldLocation: 'Sandy Plot',
      description: 'Second weeding before flowering stage',
      status: 'pending',
      createdDate: '2026-05-17'
    },
    {
      id: 2,
      taskName: 'Harvest Bean Field',
      assignedTo: 'Grace & Team',
      dueDate: '2026-05-18',
      priority: 'high',
      cropName: 'Beans',
      fieldLocation: 'Upper Garden',
      description: 'First harvest of climbing beans - needs full team',
      status: 'in-progress',
      createdDate: '2026-05-16'
    },
  ]);

  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);

  const [taskFormData, setTaskFormData] = useState<Partial<Task>>({
    taskName: '',
    assignedTo: '',
    dueDate: '',
    priority: 'medium',
    cropName: '',
    fieldLocation: '',
    description: '',
    status: 'pending',
  });

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'high': return 'bg-red-100 text-red-700';
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'completed': return 'bg-green-100 text-green-700 border-green-300';
    }
  };

  const handleSaveTask = () => {
    const newTask: Task = {
      ...taskFormData,
      id: tasks.length + 1,
      createdDate: new Date().toISOString().split('T')[0],
    } as Task;
    setTasks([...tasks, newTask]);
    resetTaskForm();
  };

  const handleDeleteTask = (id: number) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(t => t.id !== id));
      setShowTaskDetails(false);
    }
  };

  const handleUpdateTaskStatus = (taskId: number, newStatus: Task['status']) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const resetTaskForm = () => {
    setTaskFormData({
      taskName: '',
      assignedTo: '',
      dueDate: '',
      priority: 'medium',
      cropName: '',
      fieldLocation: '',
      description: '',
      status: 'pending',
    });
    setShowAddTaskForm(false);
  };

  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const completedTasks = tasks.filter(t => t.status === 'completed');
  const overdueTasks = tasks.filter(t => t.status !== 'completed' && new Date(t.dueDate) < new Date());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold mb-2">Crop Tasks & Work Assignments</h1>
          <p className="text-gray-600">{today}</p>
        </div>
        <button
          onClick={() => setShowAddTaskForm(!showAddTaskForm)}
          className="flex items-center gap-2 px-6 py-3 min-h-[48px] bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Assign Task
        </button>
      </div>

      {/* Task Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <ListTodo className="w-5 h-5 text-gray-600" />
            <p className="text-gray-600">Pending</p>
          </div>
          <p className="font-semibold">{pendingTasks.length} Tasks</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <p className="text-gray-600">In Progress</p>
          </div>
          <p className="font-semibold">{inProgressTasks.length} Tasks</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckSquare className="w-5 h-5 text-green-600" />
            <p className="text-gray-600">Completed</p>
          </div>
          <p className="font-semibold">{completedTasks.length} Tasks</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-gray-600">Overdue</p>
          </div>
          <p className="font-semibold">{overdueTasks.length} Tasks</p>
        </div>
      </div>

      {/* Add Task Form */}
      {showAddTaskForm && (
        <div className="bg-white rounded-lg border-2 border-blue-500 p-6">
          <h2 className="font-semibold mb-4">Assign New Task</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Task Name *</label>
              <input
                type="text"
                placeholder="e.g., Weed Groundnut Field"
                value={taskFormData.taskName}
                onChange={(e) => setTaskFormData({ ...taskFormData, taskName: e.target.value })}
                className="w-full px-4 py-3 min-h-[48px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Assign To *</label>
              <input
                type="text"
                placeholder="e.g., Grace Auma"
                value={taskFormData.assignedTo}
                onChange={(e) => setTaskFormData({ ...taskFormData, assignedTo: e.target.value })}
                className="w-full px-4 py-3 min-h-[48px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Due Date *</label>
              <input
                type="date"
                value={taskFormData.dueDate}
                onChange={(e) => setTaskFormData({ ...taskFormData, dueDate: e.target.value })}
                className="w-full px-4 py-3 min-h-[48px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSaveTask}
              className="px-6 py-3 min-h-[48px] bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Assign Task
            </button>
            <button
              onClick={resetTaskForm}
              className="px-6 py-3 min-h-[48px] border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Task Details Modal */}
      {showTaskDetails && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-semibold mb-1">{selectedTask.taskName}</h2>
                <div className="flex gap-2 mt-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(selectedTask.priority)}`}>
                    {selectedTask.priority} priority
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(selectedTask.status)}`}>
                    {selectedTask.status}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowTaskDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 mb-1">Assigned To</p>
                  <p className="font-semibold">{selectedTask.assignedTo}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Due Date</p>
                  <p className="font-semibold">{new Date(selectedTask.dueDate).toLocaleDateString()}</p>
                </div>
                {selectedTask.cropName && (
                  <div>
                    <p className="text-gray-600 mb-1">Crop</p>
                    <p className="font-semibold">{selectedTask.cropName}</p>
                  </div>
                )}
                {selectedTask.fieldLocation && (
                  <div>
                    <p className="text-gray-600 mb-1">Location</p>
                    <p className="font-semibold">{selectedTask.fieldLocation}</p>
                  </div>
                )}
              </div>

              {selectedTask.description && (
                <div className="border-t pt-4">
                  <p className="text-gray-700 font-semibold mb-2">Description</p>
                  <p className="text-gray-900">{selectedTask.description}</p>
                </div>
              )}

              <div className="border-t pt-4">
                <p className="text-gray-700 font-semibold mb-2">Update Status</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      handleUpdateTaskStatus(selectedTask.id, 'pending');
                      setSelectedTask({ ...selectedTask, status: 'pending' });
                    }}
                    className={`px-5 py-3 min-h-[48px] rounded-lg transition-colors ${
                      selectedTask.status === 'pending'
                        ? 'bg-gray-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => {
                      handleUpdateTaskStatus(selectedTask.id, 'in-progress');
                      setSelectedTask({ ...selectedTask, status: 'in-progress' });
                    }}
                    className={`px-5 py-3 min-h-[48px] rounded-lg transition-colors ${
                      selectedTask.status === 'in-progress'
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-100 hover:bg-blue-200'
                    }`}
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => {
                      handleUpdateTaskStatus(selectedTask.id, 'completed');
                      setSelectedTask({ ...selectedTask, status: 'completed' });
                    }}
                    className={`px-5 py-3 min-h-[48px] rounded-lg transition-colors ${
                      selectedTask.status === 'completed'
                        ? 'bg-green-600 text-white'
                        : 'bg-green-100 hover:bg-green-200'
                    }`}
                  >
                    Completed
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t">
              <button
                onClick={() => handleDeleteTask(selectedTask.id)}
                className="flex items-center gap-2 px-6 py-3 min-h-[48px] bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
                Delete
              </button>
              <button
                onClick={() => setShowTaskDetails(false)}
                className="flex-1 px-6 py-3 min-h-[48px] bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tasks List */}
      <div className="space-y-4">
        {/* Overdue Tasks */}
        {overdueTasks.length > 0 && (
          <div className="bg-white rounded-lg border border-red-200 p-6">
            <h2 className="font-semibold mb-4 text-red-700">⚠️ Overdue Tasks</h2>
            <div className="space-y-3">
              {overdueTasks.map((task) => (
                <div
                  key={task.id}
                  className="border-2 border-red-300 bg-red-50 rounded-lg p-4 cursor-pointer hover:bg-red-100 transition-colors"
                  onClick={() => {
                    setSelectedTask(task);
                    setShowTaskDetails(true);
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold">{task.taskName}</p>
                      <p className="text-gray-600 text-sm">{task.cropName} - {task.fieldLocation}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="w-4 h-4" />
                      <span>{task.assignedTo}</span>
                    </div>
                    <span className="text-red-600 font-semibold">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* In Progress Tasks */}
        {inProgressTasks.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="font-semibold mb-4">In Progress</h2>
            <div className="space-y-3">
              {inProgressTasks.map((task) => (
                <div
                  key={task.id}
                  className="border-2 border-blue-300 bg-blue-50 rounded-lg p-4 cursor-pointer hover:bg-blue-100 transition-colors"
                  onClick={() => {
                    setSelectedTask(task);
                    setShowTaskDetails(true);
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold">{task.taskName}</p>
                      <p className="text-gray-600 text-sm">{task.cropName} - {task.fieldLocation}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="w-4 h-4" />
                      <span>{task.assignedTo}</span>
                    </div>
                    <span className="text-gray-600">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pending Tasks */}
        {pendingTasks.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="font-semibold mb-4">Pending Tasks</h2>
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setSelectedTask(task);
                    setShowTaskDetails(true);
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold">{task.taskName}</p>
                      <p className="text-gray-600 text-sm">{task.cropName} - {task.fieldLocation}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="w-4 h-4" />
                      <span>{task.assignedTo}</span>
                    </div>
                    <span className="text-gray-600">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="font-semibold mb-4">Completed Tasks</h2>
            <div className="space-y-3">
              {completedTasks.map((task) => (
                <div
                  key={task.id}
                  className="border border-green-300 bg-green-50 rounded-lg p-4 cursor-pointer hover:bg-green-100 transition-colors opacity-75"
                  onClick={() => {
                    setSelectedTask(task);
                    setShowTaskDetails(true);
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold line-through text-gray-600">{task.taskName}</p>
                      <p className="text-gray-600 text-sm">{task.cropName} - {task.fieldLocation}</p>
                    </div>
                    <CheckSquare className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>{task.assignedTo}</span>
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
