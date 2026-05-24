import { useState } from 'react';
import { Calendar, Users, AlertTriangle, Heart, Package, TrendingUp, TrendingDown, Clock } from 'lucide-react';

interface DailyActivity {
  id: number;
  time: string;
  activity: string;
  worker: string;
  category: 'crop' | 'livestock' | 'maintenance';
  status: 'completed' | 'in-progress';
}

interface Problem {
  id: number;
  time: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  location: string;
  status: 'open' | 'resolved';
}

interface ResourceUsage {
  id: number;
  resource: string;
  quantity: string;
  purpose: string;
  cost: number;
}

export function DailyOperations() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const [dailyActivities] = useState<DailyActivity[]>([
    { id: 1, time: '06:00', activity: 'Fed pigs and chickens', worker: 'Moses', category: 'livestock', status: 'completed' },
    { id: 2, time: '07:00', activity: 'Collected eggs - 95 eggs', worker: 'Nakato', category: 'livestock', status: 'completed' },
    { id: 3, time: '08:00', activity: 'Picked ripe coffee cherries - 45kg', worker: 'Grace & team', category: 'crop', status: 'completed' },
    { id: 4, time: '09:30', activity: 'Inspected matoke plantation', worker: 'Okello', category: 'crop', status: 'completed' },
    { id: 5, time: '11:00', activity: 'Applied fungicide to coffee trees', worker: 'Moses', category: 'crop', status: 'completed' },
    { id: 6, time: '13:00', activity: 'Harvested sweet potatoes from valley', worker: 'Sarah & helpers', category: 'crop', status: 'completed' },
    { id: 7, time: '15:00', activity: 'Cleaned pig sty and refilled water', worker: 'Samuel', category: 'maintenance', status: 'completed' },
    { id: 8, time: '17:00', activity: 'Loading produce for market tomorrow', worker: 'Team', category: 'general', status: 'in-progress' },
  ]);

  const [problems] = useState<Problem[]>([
    {
      id: 1,
      time: '08:00',
      severity: 'high',
      description: 'Coffee berry disease spreading - needs urgent spraying',
      location: 'Coffee Garden - Section B',
      status: 'open'
    },
    {
      id: 2,
      time: '10:30',
      severity: 'medium',
      description: '3 pigs showing signs of worms',
      location: 'Pig Sty',
      status: 'open'
    },
    {
      id: 3,
      time: '14:00',
      severity: 'low',
      description: 'Chicken house door hinge broken',
      location: 'Chicken House',
      status: 'resolved'
    },
  ]);

  const [resourcesUsed] = useState<ResourceUsage[]>([
    { id: 1, resource: 'Pig Concentrate Feed', quantity: '50 kg', purpose: 'Daily pig feeding', cost: 65000 },
    { id: 2, resource: 'Chicken Layers Mash', quantity: '30 kg', purpose: 'Chicken feed', cost: 42000 },
    { id: 3, resource: 'Coffee Fungicide (Ridomil)', quantity: '1 liter', purpose: 'Berry disease treatment', cost: 35000 },
    { id: 4, resource: 'Dewormer (Ivermectin)', quantity: '50ml', purpose: 'Pig deworming', cost: 18000 },
    { id: 5, resource: 'Diesel Fuel', quantity: '10 liters', purpose: 'Generator for spraying', cost: 60000 },
    { id: 6, resource: 'Labor (Casual)', quantity: '5 workers', purpose: 'Coffee picking', cost: 75000 },
    { id: 7, resource: 'Transport (Boda)', quantity: '2 trips', purpose: 'Market runs', cost: 12000 },
    { id: 8, resource: 'Sacks', quantity: '20 pieces', purpose: 'Coffee & produce packing', cost: 15000 },
  ]);

  const totalSpent = resourcesUsed.reduce((sum, r) => sum + r.cost, 0);
  const todayEarnings = 485000; // Mock data - from coffee, eggs, sweet potatoes
  const netToday = todayEarnings - totalSpent;

  const cropHealth = 87;
  const livestockHealth = 92;
  const overallHealth = Math.round((cropHealth + livestockHealth) / 2);

  const tomorrowPriorities = [
    'Continue spraying coffee plantation for berry disease (URGENT)',
    'Deworm pigs showing symptoms',
    'Harvest matoke bunches for Saturday market',
    'Transport coffee cherries to NUCAFE cooperative',
    'Check sweet potato garden for weevil damage',
    'Order more pig concentrate - stock running low',
    'Repair drainage in matoke plantation - heavy rains coming'
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-700 border-red-300';
      case 'medium': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'crop': return 'bg-green-100 text-green-700';
      case 'livestock': return 'bg-blue-100 text-blue-700';
      case 'maintenance': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold mb-2">Daily Operations Report</h1>
          <p className="text-gray-600">{today}</p>
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Export Daily Report
        </button>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <p className="text-gray-600">Work Done</p>
          </div>
          <p className="font-semibold">{dailyActivities.filter(a => a.status === 'completed').length}/{dailyActivities.length} Tasks</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <p className="text-gray-600">Problems</p>
          </div>
          <p className="font-semibold">{problems.filter(p => p.status === 'open').length} Open Issues</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-5 h-5 text-green-600" />
            <p className="text-gray-600">Health Score</p>
          </div>
          <p className="font-semibold text-green-600">{overallHealth}%</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            {netToday >= 0 ? (
              <TrendingUp className="w-5 h-5 text-green-600" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-600" />
            )}
            <p className="text-gray-600">Today's Net</p>
          </div>
          <p className={`font-semibold ${netToday >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${Math.abs(netToday)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* What work was done today & Who did it */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-gray-700" />
            <h2 className="font-semibold">Today's Activities</h2>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {dailyActivities.map((activity) => (
              <div key={activity.id} className="border-l-4 border-green-500 pl-4 py-2">
                <div className="flex items-start justify-between mb-1">
                  <p className="font-semibold">{activity.activity}</p>
                  <span className={`px-2 py-1 rounded text-sm ${getCategoryColor(activity.category)}`}>
                    {activity.category}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-gray-600">
                  <span>{activity.time}</span>
                  <span>•</span>
                  <span>By: {activity.worker}</span>
                  {activity.status === 'in-progress' && (
                    <>
                      <span>•</span>
                      <span className="text-orange-600">In Progress</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What problems happened */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <h2 className="font-semibold">Problems & Incidents</h2>
          </div>
          <div className="space-y-3">
            {problems.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No problems reported today!</p>
            ) : (
              problems.map((problem) => (
                <div
                  key={problem.id}
                  className={`p-4 rounded-lg border-2 ${getSeverityColor(problem.severity)}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-semibold mb-1">{problem.description}</p>
                      <p className="text-gray-600">{problem.location}</p>
                    </div>
                    {problem.status === 'resolved' && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                        Resolved
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-gray-600">
                    <span>{problem.time}</span>
                    <span>•</span>
                    <span className="uppercase">{problem.severity} priority</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Health Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-green-600" />
          <h2 className="font-semibold">Farm Health Status</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-700">Crop Health</p>
              <p className="font-semibold text-green-600">{cropHealth}%</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="h-3 rounded-full bg-green-600"
                style={{ width: `${cropHealth}%` }}
              />
            </div>
            <p className="text-gray-600 mt-2">7 crops monitored - Coffee needs attention</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-700">Livestock Health</p>
              <p className="font-semibold text-green-600">{livestockHealth}%</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="h-3 rounded-full bg-green-600"
                style={{ width: `${livestockHealth}%` }}
              />
            </div>
            <p className="text-gray-600 mt-2">244 animals - Minor pig health issues</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-700">Overall Farm Health</p>
              <p className="font-semibold text-green-600">{overallHealth}%</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="h-3 rounded-full bg-green-600"
                style={{ width: `${overallHealth}%` }}
              />
            </div>
            <p className="text-gray-600 mt-2">Excellent condition overall</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resources used today */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-purple-600" />
            <h2 className="font-semibold">Resources Used Today</h2>
          </div>
          <div className="space-y-3">
            {resourcesUsed.map((resource) => (
              <div key={resource.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-semibold mb-1">{resource.resource}</p>
                  <p className="text-gray-600">{resource.quantity} - {resource.purpose}</p>
                </div>
                <p className="font-semibold text-gray-900">UGX {resource.cost.toLocaleString()}</p>
              </div>
            ))}
            <div className="pt-3 border-t-2 border-gray-200">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-900">Total Spent Today</p>
                <p className="font-semibold text-red-600">UGX {totalSpent.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Financial Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h2 className="font-semibold">Today's Financial Summary</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-gray-700 mb-1">Money Earned</p>
              <p className="font-semibold text-green-600">UGX {todayEarnings.toLocaleString()}</p>
              <p className="text-gray-600 mt-2">From coffee, eggs, sweet potatoes</p>
            </div>

            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-gray-700 mb-1">Money Spent</p>
              <p className="font-semibold text-red-600">UGX {totalSpent.toLocaleString()}</p>
              <p className="text-gray-600 mt-2">Resources & operations</p>
            </div>

            <div className={`p-4 rounded-lg border-2 ${netToday >= 0 ? 'bg-emerald-50 border-emerald-300' : 'bg-orange-50 border-orange-300'}`}>
              <p className="text-gray-700 mb-1">Net Today</p>
              <p className={`font-semibold ${netToday >= 0 ? 'text-emerald-600' : 'text-orange-600'}`}>
                {netToday >= 0 ? '+' : '-'}UGX {Math.abs(netToday).toLocaleString()}
              </p>
              <p className="text-gray-600 mt-2">
                {netToday >= 0 ? 'Profitable day' : 'Investment day'}
              </p>
            </div>

            <div className="pt-3 border-t-2 border-gray-200">
              <p className="text-gray-700 mb-2">7-Day Trend</p>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <p className="font-semibold text-green-600">+12% improvement</p>
              </div>
              <p className="text-gray-600 mt-1">Farm is improving this week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tomorrow's priorities */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h2 className="font-semibold text-blue-900">What Needs Attention Tomorrow</h2>
        </div>
        <div className="space-y-2">
          {tomorrowPriorities.map((priority, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-blue-200">
              <div className="mt-1 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                {index + 1}
              </div>
              <p className="text-gray-900 flex-1">{priority}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
