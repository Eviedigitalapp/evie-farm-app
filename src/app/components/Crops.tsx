import { useState } from 'react';
import { CropManagement } from './CropManagement';
import { CropActivities } from './CropActivities';
import { CropRecords } from './CropRecords';

export function Crops() {
  const [activeTab, setActiveTab] = useState<'management' | 'activities' | 'records'>('management');

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('management')}
            className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'management'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Crop Management
          </button>
          <button
            onClick={() => setActiveTab('activities')}
            className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'activities'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Activities
          </button>
          <button
            onClick={() => setActiveTab('records')}
            className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'records'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Records
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'management' && <CropManagement />}
        {activeTab === 'activities' && <CropActivities />}
        {activeTab === 'records' && <CropRecords />}
      </div>
    </div>
  );
}
