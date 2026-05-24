import { useState } from 'react';
import { Sprout, Beef, Calendar, DollarSign, TrendingUp, TrendingDown, AlertCircle, ArrowUpRight, ArrowDownRight, PiggyBank, CheckCircle, Heart, Droplet, ChevronDown, ChevronUp } from 'lucide-react';
import { WeatherWidget } from './WeatherWidget';
import { AnalyticsDashboard } from './AnalyticsDashboard';

export function Dashboard() {
  const [expandedSections, setExpandedSections] = useState({
    crops: false,
    livestock: false,
    financials: false,
    incomeExpenses: false,
    healthScore: false,
    tasks: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  // === CROP OVERVIEW ===
  const cropData = {
    totalCrops: 7,
    activeGrowing: 5,
    readyForHarvest: 2,
    recentActivities: [
      { id: 1, crop: 'Coffee (Robusta)', activity: 'Spraying for berry disease', status: 'completed', date: 'Today' },
      { id: 2, crop: 'Beans', activity: 'Harvesting in progress', status: 'in-progress', date: 'Today' },
      { id: 3, crop: 'Maize', activity: 'Fertilizer application', status: 'completed', date: 'Yesterday' },
    ],
    topCrops: [
      { name: 'Coffee', area: '2 acres', health: 88, status: 'Growing' },
      { name: 'Matoke', area: '1.5 acres', health: 92, status: 'Ready' },
      { name: 'Beans', area: '1.5 acres', health: 90, status: 'Harvesting' },
    ]
  };

  // === LIVESTOCK OVERVIEW ===
  const livestockData = {
    totalAnimals: 244,
    totalGroups: 6,
    healthStatus: {
      excellent: 145,
      good: 85,
      fair: 14,
      poor: 0
    },
    recentActivities: [
      { id: 1, type: 'Pigs', activity: 'Fed 25 pigs', status: 'completed', time: '06:00' },
      { id: 2, type: 'Chickens', activity: 'Collected 95 eggs', status: 'completed', time: '07:00' },
      { id: 3, type: 'Goats', activity: 'Deworming completed', status: 'completed', time: '09:00' },
    ],
    byType: [
      { type: 'Chickens', count: 120, health: 'good' },
      { type: 'Goats', count: 35, health: 'good' },
      { type: 'Pigs', count: 25, health: 'excellent' },
      { type: 'Cattle', count: 6, health: 'excellent' },
    ]
  };

  // === FINANCIAL DATA - THIS MONTH ===
  const monthlyIncome = 1007000;
  const monthlyExpenses = 515000;
  const netProfit = monthlyIncome - monthlyExpenses;
  const profitMargin = ((netProfit / monthlyIncome) * 100).toFixed(1);
  const cashOnHand = 2340000;

  const topIncomeSources = [
    { source: 'Coffee Sales', amount: 450000 },
    { source: 'Livestock Sales', amount: 280000 },
    { source: 'Matoke Sales', amount: 85000 },
  ];

  const topExpenses = [
    { category: 'Fertilizer', amount: 180000 },
    { category: 'Feed', amount: 120000 },
    { category: 'Labor', amount: 80000 },
  ];

  // === TODAY'S FINANCIALS ===
  const todayIncome = 85000;
  const todayExpenses = 42000;
  const todayNet = todayIncome - todayExpenses;

  // === HEALTH SCORE ===
  const healthScore = {
    crops: {
      score: 90,
      status: 'Excellent',
      issues: 1,
      description: 'Coffee berry disease under control'
    },
    livestock: {
      score: 94,
      status: 'Excellent',
      issues: 0,
      description: 'All animals healthy'
    },
    overall: 92
  };

  // === PENDING TASKS ===
  const pendingTasks = [
    { id: 1, task: 'Spray Coffee for Berry Disease', priority: 'high', dueDate: '2026-05-18', category: 'crop' },
    { id: 2, task: 'Pig Vaccination', priority: 'high', dueDate: '2026-05-20', category: 'livestock' },
    { id: 3, task: 'Harvest Matoke', priority: 'high', dueDate: '2026-05-22', category: 'crop' },
    { id: 4, task: 'Check Valley Tank', priority: 'medium', dueDate: '2026-05-25', category: 'maintenance' },
    { id: 5, task: 'Weed Sweet Potato Garden', priority: 'medium', dueDate: '2026-05-19', category: 'crop' },
  ];

  const overdueTasks = 3;
  const todayTasks = 2;

  // === ALERTS & NOTIFICATIONS ===
  const alerts = [
    { id: 1, message: 'Weather forecast: Heavy rains expected - check drainage', priority: 'high', category: 'weather' },
    { id: 2, message: 'Coffee berry disease spotted - spray fungicide urgently', priority: 'high', category: 'crop' },
    { id: 3, message: 'Pig vaccination schedule due next week', priority: 'medium', category: 'livestock' },
    { id: 4, message: 'Feed stock running low - budget UGX 150,000 for restock', priority: 'medium', category: 'financial' },
    { id: 5, message: 'Water pump maintenance needed in Valley Tank', priority: 'medium', category: 'maintenance' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-semibold mb-2">Farm Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening on your farm today.</p>
      </div>

      {/* Main Overview Grid - 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CROP OVERVIEW */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div
          className="flex items-center justify-between mb-4 cursor-pointer"
          onClick={() => toggleSection('crops')}
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-green-50 text-green-600">
                <Sprout className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Crops</h2>
                <p className="text-base font-semibold text-gray-700">{cropData.totalCrops} Total • {cropData.readyForHarvest} Ready</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <TrendingUp className="w-4 h-4 text-green-500" />
            {expandedSections.crops ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </div>
        </div>

        {expandedSections.crops && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Crop Status */}
          <div>
            <h3 className="font-semibold mb-3">Active Crops</h3>
            <div className="space-y-3">
              {cropData.topCrops.map((crop, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold">{crop.name}</p>
                    <p className="text-sm text-gray-600">{crop.area} • {crop.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Health</p>
                    <p className={`font-semibold ${crop.health >= 85 ? 'text-green-600' : 'text-orange-600'}`}>{crop.health}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Crop Activities */}
          <div>
            <h3 className="font-semibold mb-3">Recent Activities</h3>
            <div className="space-y-3">
              {cropData.recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                  <div className={`mt-1 p-1 rounded ${activity.status === 'completed' ? 'bg-green-100' : 'bg-blue-100'}`}>
                    {activity.status === 'completed' ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Droplet className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{activity.crop}</p>
                    <p className="text-sm text-gray-600">{activity.activity}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        )}
      </div>

      {/* LIVESTOCK OVERVIEW */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div
          className="flex items-center justify-between mb-4 cursor-pointer"
          onClick={() => toggleSection('livestock')}
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                <Beef className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Livestock</h2>
                <p className="text-base font-semibold text-gray-700">{livestockData.totalAnimals} Animals • {livestockData.totalGroups} Groups</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <TrendingUp className="w-4 h-4 text-green-500" />
            {expandedSections.livestock ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </div>
        </div>

        {expandedSections.livestock && (
          <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Livestock by Type */}
          <div>
            <h3 className="font-semibold mb-3">Livestock by Type</h3>
            <div className="space-y-3">
              {livestockData.byType.map((animal, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-semibold">{animal.type}</p>
                    <p className="text-sm text-gray-600">{animal.count} animals</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    animal.health === 'excellent' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {animal.health}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Livestock Activities */}
          <div>
            <h3 className="font-semibold mb-3">Today's Activities</h3>
            <div className="space-y-3">
              {livestockData.recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                  <div className="mt-1 p-1 bg-green-100 rounded">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{activity.type}</p>
                    <p className="text-sm text-gray-600">{activity.activity}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Health Status Summary */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h3 className="font-semibold mb-3">Health Status Distribution</h3>
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="font-semibold text-green-600">{livestockData.healthStatus.excellent}</p>
              <p className="text-xs text-gray-600">Excellent</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="font-semibold text-blue-600">{livestockData.healthStatus.good}</p>
              <p className="text-xs text-gray-600">Good</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <p className="font-semibold text-orange-600">{livestockData.healthStatus.fair}</p>
              <p className="text-xs text-gray-600">Fair</p>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <p className="font-semibold text-red-600">{livestockData.healthStatus.poor}</p>
              <p className="text-xs text-gray-600">Poor</p>
            </div>
          </div>
        </div>
        </>
        )}
        </div>
      </div>

      {/* Financial & Tasks Grid - 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FINANCIALS - THIS MONTH */}
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg border-2 border-emerald-200 p-6">
        <div
          className="flex items-center justify-between mb-4 cursor-pointer"
          onClick={() => toggleSection('financials')}
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-white text-emerald-600">
                <PiggyBank className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-semibold text-emerald-900">Financial Overview - This Month</h2>
                <p className="text-sm text-emerald-700">UGX {(netProfit / 1000).toFixed(0)}K profit • {profitMargin}% margin</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            {expandedSections.financials ? (
              <ChevronUp className="w-5 h-5 text-emerald-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-emerald-600" />
            )}
          </div>
        </div>

        {expandedSections.financials && (
          <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <ArrowUpRight className="w-7 h-7 text-green-600" />
              <p className="text-lg font-semibold text-gray-700">Income</p>
            </div>
            <p className="text-3xl font-bold text-green-600 mb-1">{(monthlyIncome / 1000).toFixed(0)}K</p>
            <p className="text-sm text-gray-500">UGX {monthlyIncome.toLocaleString()}</p>
          </div>

          <div className="bg-white rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <ArrowDownRight className="w-7 h-7 text-red-600" />
              <p className="text-lg font-semibold text-gray-700">Expenses</p>
            </div>
            <p className="text-3xl font-bold text-red-600 mb-1">{(monthlyExpenses / 1000).toFixed(0)}K</p>
            <p className="text-sm text-gray-500">UGX {monthlyExpenses.toLocaleString()}</p>
          </div>

          <div className="bg-white rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-7 h-7 text-emerald-600" />
              <p className="text-lg font-semibold text-gray-700">Profit</p>
            </div>
            <p className="text-3xl font-bold text-emerald-600 mb-1">{(netProfit / 1000).toFixed(0)}K</p>
            <p className="text-sm text-gray-500">{profitMargin}% margin</p>
          </div>
        </div>

        {/* Today's Financial Summary */}
        <div className="bg-white rounded-lg p-5 border-2 border-blue-200">
          <h3 className="text-xl font-bold mb-4 text-blue-900">Today's Activity</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-base font-semibold text-gray-700 mb-2">Income</p>
              <p className="text-2xl font-bold text-green-600">{(todayIncome / 1000).toFixed(0)}K</p>
            </div>
            <div>
              <p className="text-base font-semibold text-gray-700 mb-2">Spent</p>
              <p className="text-2xl font-bold text-red-600">{(todayExpenses / 1000).toFixed(0)}K</p>
            </div>
            <div>
              <p className="text-base font-semibold text-gray-700 mb-2">Net</p>
              <p className={`text-2xl font-bold ${todayNet >= 0 ? 'text-emerald-600' : 'text-orange-600'}`}>
                {todayNet >= 0 ? '+' : ''}{(todayNet / 1000).toFixed(0)}K
              </p>
            </div>
          </div>
        </div>
        </>
        )}
        </div>

        {/* PENDING TASKS */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div
            className="flex items-center justify-between mb-4 cursor-pointer"
            onClick={() => toggleSection('tasks')}
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-orange-50 text-orange-600">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-semibold">Pending Tasks</h2>
                  <p className="text-sm text-gray-600">{pendingTasks.length} tasks • {overdueTasks} overdue</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <TrendingDown className="w-4 h-4 text-red-500" />
              {expandedSections.tasks ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </div>
          </div>
          {expandedSections.tasks && (
            <div className="space-y-3">
            {pendingTasks.map((task) => (
              <div key={task.id} className={`p-3 rounded-lg border-l-4 ${
                task.priority === 'high'
                  ? 'bg-red-50 border-red-500'
                  : 'bg-orange-50 border-orange-500'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold">{task.task}</p>
                    <p className="text-sm text-gray-600 mt-1">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`px-2 py-1 rounded text-xs ${
                      task.priority === 'high'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {task.priority}
                    </span>
                    <span className="text-xs text-gray-500">{task.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </div>

      {/* Income/Expenses & Health Score Grid - 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Income & Expenses */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div
          className="flex items-center justify-between mb-4 cursor-pointer"
          onClick={() => toggleSection('incomeExpenses')}
        >
          <h2 className="font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Top Income & Expenses
          </h2>
          {expandedSections.incomeExpenses ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </div>

        {expandedSections.incomeExpenses && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Income */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Top Income Sources
              </h3>
          <div className="space-y-3">
            {topIncomeSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-gray-700">{source.source}</span>
                <span className="font-semibold text-green-600">UGX {source.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Expenses */}
        <div>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-red-600" />
            Top Expense Categories
          </h3>
          <div className="space-y-3">
            {topExpenses.map((expense, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <span className="text-gray-700">{expense.category}</span>
                <span className="font-semibold text-red-600">UGX {expense.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      )}
        </div>

        {/* HEALTH SCORE */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div
          className="flex items-center justify-between mb-4 cursor-pointer"
          onClick={() => toggleSection('healthScore')}
        >
          <h2 className="text-xl font-bold flex items-center gap-3">
            <Heart className="w-7 h-7 text-pink-600" />
            Farm Health Score
          </h2>
          {expandedSections.healthScore ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </div>

        {expandedSections.healthScore && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Crop Health */}
          <div className="p-5 bg-green-50 rounded-lg border-2 border-green-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sprout className="w-7 h-7 text-green-600" />
                <p className="text-lg font-bold">Crops</p>
              </div>
              <p className="text-4xl font-bold text-green-600">{healthScore.crops.score}%</p>
            </div>
            <p className="text-base text-gray-700 mb-3">{healthScore.crops.description}</p>
            <div className="w-full bg-gray-300 rounded-full h-3">
              <div
                className="h-3 rounded-full bg-green-600"
                style={{ width: `${healthScore.crops.score}%` }}
              />
            </div>
            <p className="text-sm font-semibold text-gray-600 mt-2">{healthScore.crops.issues} Issues</p>
          </div>

          {/* Livestock Health */}
          <div className="p-5 bg-blue-50 rounded-lg border-2 border-blue-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Beef className="w-7 h-7 text-blue-600" />
                <p className="text-lg font-bold">Livestock</p>
              </div>
              <p className="text-4xl font-bold text-blue-600">{healthScore.livestock.score}%</p>
            </div>
            <p className="text-base text-gray-700 mb-3">{healthScore.livestock.description}</p>
            <div className="w-full bg-gray-300 rounded-full h-3">
              <div
                className="h-3 rounded-full bg-blue-600"
                style={{ width: `${healthScore.livestock.score}%` }}
              />
            </div>
            <p className="text-sm font-semibold text-gray-600 mt-2">{healthScore.livestock.issues} Issues</p>
          </div>

          {/* Overall Health */}
          <div className="p-5 bg-purple-50 rounded-lg border-2 border-purple-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Heart className="w-7 h-7 text-purple-600" />
                <p className="text-lg font-bold">Overall</p>
              </div>
              <p className="text-4xl font-bold text-purple-600">{healthScore.overall}%</p>
            </div>
            <p className="text-base text-gray-700 mb-3">Farm in excellent condition</p>
            <div className="w-full bg-gray-300 rounded-full h-3">
              <div
                className="h-3 rounded-full bg-purple-600"
                style={{ width: `${healthScore.overall}%` }}
              />
            </div>
            <p className="text-sm font-semibold text-gray-600 mt-2">All systems healthy</p>
          </div>
        </div>
        )}
        </div>
      </div>

      {/* ALERTS & NOTIFICATIONS */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-3">
            <AlertCircle className="w-7 h-7 text-orange-600" />
            Alerts & Notifications
          </h2>
          <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
            {alerts.filter(a => a.priority === 'high').length} urgent
          </span>
        </div>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className={`flex items-start gap-3 p-3 rounded-lg border ${
                alert.priority === 'high'
                  ? 'bg-red-50 border-red-200'
                  : 'bg-orange-50 border-orange-200'
              }`}>
                <AlertCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${alert.priority === 'high' ? 'text-red-500' : 'text-orange-500'}`} />
                <div className="flex-1">
                  <p className="text-gray-700">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      {/* WEATHER & ANALYTICS Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeatherWidget />
        <AnalyticsDashboard />
      </div>
    </div>
  );
}
