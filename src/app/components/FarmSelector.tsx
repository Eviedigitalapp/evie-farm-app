import { useState } from 'react';
import { Building2, Plus, ArrowRight, MapPin, Users, Shield } from 'lucide-react';

interface Farm {
  id: number;
  name: string;
  owner: string;
  location: string;
  country: string;
  status: 'active' | 'trial' | 'inactive';
  users: number;
}

interface FarmSelectorProps {
  onSelectFarm: (farmId: number | 'super-admin') => void;
}

export function FarmSelector({ onSelectFarm }: FarmSelectorProps) {
  const [showAddFarm, setShowAddFarm] = useState(false);
  const [newFarmName, setNewFarmName] = useState('');

  const farms: Farm[] = [
    {
      id: 1,
      name: 'Evie Digital Agribusiness',
      owner: 'Farm Owner',
      location: 'Kampala',
      country: 'Uganda',
      status: 'active',
      users: 5
    },
    {
      id: 2,
      name: 'Green Valley Farms',
      owner: 'John Mwangi',
      location: 'Nairobi',
      country: 'Kenya',
      status: 'active',
      users: 3
    },
    {
      id: 3,
      name: 'Sunrise Poultry',
      owner: 'Amina Hassan',
      location: 'Dar es Salaam',
      country: 'Tanzania',
      status: 'trial',
      users: 2
    }
  ];

  const getStatusColor = (status: Farm['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'trial': return 'bg-blue-100 text-blue-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-green-600 rounded-lg">
              <Building2 className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="font-semibold mb-2">Evie Digital Agribusiness Platform</h1>
          <p className="text-gray-600">Select a farm to manage or access Super Admin Panel</p>
        </div>

        {/* Super Admin Access */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <button
            onClick={() => onSelectFarm('super-admin')}
            className="w-full flex items-center justify-between p-4 border-2 border-red-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-600 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Super Admin Panel</h3>
                <p className="text-gray-600">Manage all farms, support tickets, and analytics</p>
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Farm List */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold">Your Farms</h2>
              <p className="text-gray-600">{farms.length} farm{farms.length !== 1 ? 's' : ''} registered</p>
            </div>
            <button
              onClick={() => setShowAddFarm(!showAddFarm)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New Farm
            </button>
          </div>

          {/* Add Farm Form */}
          {showAddFarm && (
            <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="font-semibold mb-3">Add New Farm</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter farm name"
                  value={newFarmName}
                  onChange={(e) => setNewFarmName(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={() => {
                    if (newFarmName.trim()) {
                      alert(`Farm "${newFarmName}" will be created.\n\nIn production, this would create a new farm tenant with isolated data.`);
                      setNewFarmName('');
                      setShowAddFarm(false);
                    }
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Create
                </button>
                <button
                  onClick={() => {
                    setShowAddFarm(false);
                    setNewFarmName('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Farm Cards */}
          <div className="space-y-3">
            {farms.map((farm) => (
              <button
                key={farm.id}
                onClick={() => onSelectFarm(farm.id)}
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Building2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{farm.name}</h3>
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getStatusColor(farm.status)}`}>
                        {farm.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{farm.location}, {farm.country}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{farm.users} users</span>
                      </div>
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 bg-white rounded-lg shadow text-center">
          <p className="text-gray-600">
            Need help? Contact support at{' '}
            <a href="mailto:support@eviedigital.com" className="text-blue-600 hover:text-blue-700 font-semibold">
              support@eviedigital.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
