import { useState } from 'react';
import { StaffManagement } from './StaffManagement';
import { CustomerManagement } from './CustomerManagement';

export function People() {
  const [activeTab, setActiveTab] = useState<'staff' | 'customers'>('staff');

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('staff')}
            className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'staff'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Staff & Workers
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'customers'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Customers & Buyers
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'staff' && <StaffManagement />}
        {activeTab === 'customers' && <CustomerManagement />}
      </div>
    </div>
  );
}
