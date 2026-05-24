import { useState } from 'react';
import { TrendingUp, TrendingDown, BarChart3, PieChart, Calendar, Download, Filter } from 'lucide-react';

type ReportPeriod = 'week' | 'month' | 'quarter' | 'year';
type ReportType = 'overview' | 'financial' | 'production' | 'livestock' | 'crops';

export function ReportsAnalytics() {
  const [period, setPeriod] = useState<ReportPeriod>('month');
  const [reportType, setReportType] = useState<ReportType>('overview');

  // Sample data for charts
  const monthlyRevenue = [
    { month: 'Jan', income: 2500000, expenses: 1800000 },
    { month: 'Feb', income: 2800000, expenses: 1900000 },
    { month: 'Mar', income: 3200000, expenses: 2100000 },
    { month: 'Apr', income: 3500000, expenses: 2300000 },
    { month: 'May', income: 3800000, expenses: 2500000 },
  ];

  const eggProduction = [
    { week: 'Week 1', eggs: 650 },
    { week: 'Week 2', eggs: 680 },
    { week: 'Week 3', eggs: 720 },
    { week: 'Week 4', eggs: 700 },
  ];

  const livestockDistribution = [
    { type: 'Chickens', count: 120, value: 6000000 },
    { type: 'Pigs', count: 25, value: 15000000 },
    { type: 'Goats', count: 35, value: 10500000 },
    { type: 'Cows', count: 6, value: 18000000 },
  ];

  const cropYield = [
    { crop: 'Maize', planted: '2 hectares', harvested: '4,500 kg', value: 4500000 },
    { crop: 'Beans', planted: '1 hectare', harvested: '800 kg', value: 2400000 },
    { crop: 'Cassava', planted: '1.5 hectares', harvested: '6,000 kg', value: 3000000 },
  ];

  const incomeBySource = [
    { source: 'Egg Sales', amount: 4200000, percentage: 35 },
    { source: 'Livestock Sales', amount: 3600000, percentage: 30 },
    { source: 'Crop Sales', amount: 2400000, percentage: 20 },
    { source: 'Milk Sales', amount: 1200000, percentage: 10 },
    { source: 'Other', amount: 600000, percentage: 5 },
  ];

  const handleExport = () => {
    alert('Exporting report...\n\nIn production, this would generate a PDF or Excel file with all analytics data.');
  };

  const totalIncome = monthlyRevenue.reduce((sum, m) => sum + m.income, 0);
  const totalExpenses = monthlyRevenue.reduce((sum, m) => sum + m.expenses, 0);
  const netProfit = totalIncome - totalExpenses;
  const profitMargin = ((netProfit / totalIncome) * 100).toFixed(1);

  const maxRevenue = Math.max(...monthlyRevenue.map(m => Math.max(m.income, m.expenses)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold mb-2">Reports & Analytics</h1>
          <p className="text-gray-600">Track your farm performance with visual insights</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-semibold text-gray-700">Period:</span>
          </div>
          <div className="flex gap-2">
            {(['week', 'month', 'quarter', 'year'] as ReportPeriod[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1 rounded-lg transition-colors capitalize ${
                  period === p
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="border-l border-gray-300 pl-4 ml-2 flex items-center gap-2">
            <span className="font-semibold text-gray-700">Report Type:</span>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as ReportType)}
              className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="overview">Overview</option>
              <option value="financial">Financial</option>
              <option value="production">Production</option>
              <option value="livestock">Livestock</option>
              <option value="crops">Crops</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Total Income</p>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="font-semibold mb-1">{totalIncome.toLocaleString()} UGX</p>
          <p className="text-green-600 text-sm">+12% from last period</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Total Expenses</p>
            <TrendingDown className="w-5 h-5 text-red-600" />
          </div>
          <p className="font-semibold mb-1">{totalExpenses.toLocaleString()} UGX</p>
          <p className="text-red-600 text-sm">+8% from last period</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Net Profit</p>
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <p className="font-semibold mb-1">{netProfit.toLocaleString()} UGX</p>
          <p className="text-blue-600 text-sm">+18% from last period</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Profit Margin</p>
            <PieChart className="w-5 h-5 text-purple-600" />
          </div>
          <p className="font-semibold mb-1">{profitMargin}%</p>
          <p className="text-purple-600 text-sm">Healthy margin</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="font-semibold mb-4">Income vs Expenses (Monthly)</h2>
        <div className="space-y-4">
          {monthlyRevenue.map((data, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-700 font-medium">{data.month}</span>
                <div className="flex gap-4 text-sm">
                  <span className="text-green-600">
                    Income: {data.income.toLocaleString()} UGX
                  </span>
                  <span className="text-red-600">
                    Expenses: {data.expenses.toLocaleString()} UGX
                  </span>
                </div>
              </div>
              <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-green-500"
                  style={{ width: `${(data.income / maxRevenue) * 100}%` }}
                />
                <div
                  className="absolute left-0 bottom-0 h-4 bg-red-500"
                  style={{ width: `${(data.expenses / maxRevenue) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Egg Production Trend */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="font-semibold mb-4">Egg Production (This Month)</h2>
          <div className="space-y-3">
            {eggProduction.map((data, index) => {
              const maxEggs = Math.max(...eggProduction.map(e => e.eggs));
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-700">{data.week}</span>
                    <span className="font-semibold">{data.eggs} eggs</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div
                      className="bg-yellow-500 h-3 rounded-full"
                      style={{ width: `${(data.eggs / maxEggs) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
            <p className="text-yellow-800 text-sm">
              <strong>Average:</strong> {(eggProduction.reduce((sum, e) => sum + e.eggs, 0) / eggProduction.length).toFixed(0)} eggs/week
            </p>
          </div>
        </div>

        {/* Income by Source */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="font-semibold mb-4">Income by Source</h2>
          <div className="space-y-3">
            {incomeBySource.map((data, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-700">{data.source}</span>
                  <div className="text-right">
                    <span className="font-semibold">{data.amount.toLocaleString()} UGX</span>
                    <span className="text-gray-500 text-sm ml-2">({data.percentage}%)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full"
                    style={{ width: `${data.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Livestock & Crop Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="font-semibold mb-4">Livestock Distribution</h2>
          <div className="space-y-3">
            {livestockDistribution.map((data, index) => (
              <div key={index} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{data.type}</h3>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                    {data.count} animals
                  </span>
                </div>
                <p className="text-gray-600">
                  Estimated Value: <span className="font-semibold">{data.value.toLocaleString()} UGX</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="font-semibold mb-4">Crop Yield Performance</h2>
          <div className="space-y-3">
            {cropYield.map((data, index) => (
              <div key={index} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{data.crop}</h3>
                  <span className="text-green-600 font-semibold">
                    {data.value.toLocaleString()} UGX
                  </span>
                </div>
                <div className="text-gray-600 text-sm">
                  <p>Planted: {data.planted}</p>
                  <p>Harvested: {data.harvested}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Insights */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200 p-6">
        <h2 className="font-semibold mb-4">Key Insights & Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-green-700 mb-2">✅ Performing Well</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Egg production up 15% this month</li>
              <li>• Profit margin healthy at {profitMargin}%</li>
              <li>• Livestock value increased by 8%</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-orange-700 mb-2">⚠️ Needs Attention</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Feed costs increased by 12%</li>
              <li>• Consider diversifying income sources</li>
              <li>• Monitor crop pest issues</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
