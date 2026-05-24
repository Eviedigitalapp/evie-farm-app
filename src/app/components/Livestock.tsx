import { useState } from 'react';
import { LivestockManagement } from './LivestockManagement';
import { LivestockActivities } from './LivestockActivities';
import { LivestockRecords } from './LivestockRecords';
import { VaccinationSchedule } from './VaccinationSchedule';
import { FeedInventory } from './FeedInventory';

export function Livestock() {
  const [activeTab, setActiveTab] = useState<'management' | 'activities' | 'records' | 'vaccination' | 'feed'>('management');

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
            Livestock
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
          <button
            onClick={() => setActiveTab('vaccination')}
            className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'vaccination'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Vaccination
          </button>
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'feed'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Feed
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'management' && <LivestockManagement />}
        {activeTab === 'activities' && <LivestockActivities />}
        {activeTab === 'records' && <LivestockRecords />}
        {activeTab === 'vaccination' && <VaccinationSchedule />}
        {activeTab === 'feed' && <FeedInventory />}
      </div>
    </div>
  );
}
