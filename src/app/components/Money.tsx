import { useState } from 'react';
import { FinanceTracker } from './FinanceTracker';
import { PayrollManagement } from './PayrollManagement';
import { MobileMoneyIntegration } from './MobileMoneyIntegration';
import { ReportsAnalytics } from './ReportsAnalytics';

export function Money() {
  const [activeTab, setActiveTab] = useState<'finance' | 'payroll' | 'mobile-money' | 'reports'>('finance');

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('finance')}
            className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'finance'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Finance
          </button>
          <button
            onClick={() => setActiveTab('payroll')}
            className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'payroll'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Payroll
          </button>
          <button
            onClick={() => setActiveTab('mobile-money')}
            className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'mobile-money'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Mobile Money
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'reports'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Reports
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'finance' && <FinanceTracker />}
        {activeTab === 'payroll' && <PayrollManagement />}
        {activeTab === 'mobile-money' && <MobileMoneyIntegration />}
        {activeTab === 'reports' && <ReportsAnalytics />}
      </div>
    </div>
  );
}
