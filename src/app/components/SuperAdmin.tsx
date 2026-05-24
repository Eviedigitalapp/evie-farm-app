import { useState } from 'react';
import { Users, Building2, Activity, AlertCircle, TrendingUp, MapPin, PhoneCall, Mail, Eye, Settings, BarChart3 } from 'lucide-react';

interface Farm {
  id: number;
  name: string;
  owner: string;
  location: string;
  country: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive' | 'trial';
  users: number;
  animals: number;
  crops: number;
  lastActive: string;
  subscriptionPlan: 'free' | 'basic' | 'premium';
  issuesReported: number;
}

interface SupportTicket {
  id: number;
  farmName: string;
  issue: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved';
  reportedBy: string;
  date: string;
}

interface SuperAdminProps {
  onAccessFarm?: (farmId: number) => void;
}

export function SuperAdmin({ onAccessFarm }: SuperAdminProps = {}) {
  const [activeTab, setActiveTab] = useState<'overview' | 'farms' | 'support' | 'analytics'>('overview');
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);

  const [farms, setFarms] = useState<Farm[]>([
    {
      id: 1,
      name: 'Evie Digital Agribusiness',
      owner: 'Farm Owner',
      location: 'Kampala',
      country: 'Uganda',
      phone: '+256 700 123 456',
      email: 'owner@farm.com',
      status: 'active',
      users: 5,
      animals: 500,
      crops: 10,
      lastActive: '2026-05-17',
      subscriptionPlan: 'premium',
      issuesReported: 0
    },
    {
      id: 2,
      name: 'Green Valley Farms',
      owner: 'John Mwangi',
      location: 'Nairobi',
      country: 'Kenya',
      phone: '+254 720 555 123',
      email: 'john@greenvalley.co.ke',
      status: 'active',
      users: 3,
      animals: 200,
      crops: 5,
      lastActive: '2026-05-16',
      subscriptionPlan: 'basic',
      issuesReported: 1
    },
    {
      id: 3,
      name: 'Sunrise Poultry',
      owner: 'Amina Hassan',
      location: 'Dar es Salaam',
      country: 'Tanzania',
      phone: '+255 755 888 999',
      email: 'amina@sunrise.co.tz',
      status: 'trial',
      users: 2,
      animals: 1000,
      crops: 0,
      lastActive: '2026-05-17',
      subscriptionPlan: 'free',
      issuesReported: 2
    },
    {
      id: 4,
      name: 'Harvest Hope Farm',
      owner: 'Joseph Banda',
      location: 'Lusaka',
      country: 'Zambia',
      phone: '+260 977 444 555',
      email: 'joseph@harvesthope.zm',
      status: 'active',
      users: 4,
      animals: 150,
      crops: 8,
      lastActive: '2026-05-15',
      subscriptionPlan: 'basic',
      issuesReported: 0
    },
    {
      id: 5,
      name: 'Golden Acres',
      owner: 'Sarah Okonkwo',
      location: 'Lagos',
      country: 'Nigeria',
      phone: '+234 803 666 777',
      email: 'sarah@goldenacres.ng',
      status: 'inactive',
      users: 1,
      animals: 50,
      crops: 3,
      lastActive: '2026-04-20',
      subscriptionPlan: 'free',
      issuesReported: 3
    }
  ]);

  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([
    {
      id: 1,
      farmName: 'Green Valley Farms',
      issue: 'Cannot export financial reports to CSV',
      priority: 'medium',
      status: 'open',
      reportedBy: 'John Mwangi',
      date: '2026-05-16'
    },
    {
      id: 2,
      farmName: 'Sunrise Poultry',
      issue: 'Vaccination schedule reminders not showing',
      priority: 'high',
      status: 'in-progress',
      reportedBy: 'Amina Hassan',
      date: '2026-05-15'
    },
    {
      id: 3,
      farmName: 'Sunrise Poultry',
      issue: 'Need help setting up staff accounts',
      priority: 'low',
      status: 'resolved',
      reportedBy: 'Amina Hassan',
      date: '2026-05-14'
    },
    {
      id: 4,
      farmName: 'Golden Acres',
      issue: 'App very slow, takes long to load',
      priority: 'urgent',
      status: 'open',
      reportedBy: 'Sarah Okonkwo',
      date: '2026-05-17'
    }
  ]);

  const totalFarms = farms.length;
  const activeFarms = farms.filter(f => f.status === 'active').length;
  const totalUsers = farms.reduce((sum, f) => sum + f.users, 0);
  const openTickets = supportTickets.filter(t => t.status === 'open' || t.status === 'in-progress').length;

  const getStatusColor = (status: Farm['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'trial': return 'bg-blue-100 text-blue-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: SupportTicket['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-blue-100 text-blue-700';
    }
  };

  const getTicketStatusColor = (status: SupportTicket['status']) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-700';
      case 'in-progress': return 'bg-yellow-100 text-yellow-700';
      case 'resolved': return 'bg-green-100 text-green-700';
    }
  };

  const handleAccessFarm = (farm: Farm) => {
    setSelectedFarm(farm);
    if (onAccessFarm) {
      onAccessFarm(farm.id);
    } else {
      alert(`Remote access initiated for ${farm.name}.\n\nYou can now view and manage this farm's data to provide support.`);
    }
  };

  const handleUpdateTicketStatus = (ticketId: number, newStatus: SupportTicket['status']) => {
    setSupportTickets(supportTickets.map(t =>
      t.id === ticketId ? { ...t, status: newStatus } : t
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-semibold mb-2">Super Admin Control Panel</h1>
        <p className="text-gray-600">Manage and support all farms across Africa</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-1 flex gap-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'overview'
              ? 'bg-green-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('farms')}
          className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'farms'
              ? 'bg-green-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          All Farms
        </button>
        <button
          onClick={() => setActiveTab('support')}
          className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'support'
              ? 'bg-green-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Support Tickets
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'analytics'
              ? 'bg-green-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Analytics
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-600">Total Farms</p>
                  <p className="font-semibold">{totalFarms}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-gray-600">Active Farms</p>
                  <p className="font-semibold">{activeFarms}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-600">Total Users</p>
                  <p className="font-semibold">{totalUsers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-gray-600">Open Tickets</p>
                  <p className="font-semibold text-red-600">{openTickets}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="font-semibold mb-4">Recent Farm Activity</h2>
            <div className="space-y-3">
              {farms.slice(0, 5).map((farm) => (
                <div key={farm.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-semibold">{farm.name}</p>
                      <p className="text-gray-600">{farm.location}, {farm.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded text-sm font-semibold ${getStatusColor(farm.status)}`}>
                      {farm.status.toUpperCase()}
                    </span>
                    <p className="text-gray-500">Last active: {farm.lastActive}</p>
                    <button
                      onClick={() => handleAccessFarm(farm)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Access
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Farms Tab */}
      {activeTab === 'farms' && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold">All Registered Farms</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {farms.map((farm) => (
              <div key={farm.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{farm.name}</h3>
                      <span className={`px-2 py-1 rounded text-sm font-semibold ${getStatusColor(farm.status)}`}>
                        {farm.status.toUpperCase()}
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm font-semibold">
                        {farm.subscriptionPlan.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600">{farm.location}, {farm.country}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAccessFarm(farm)}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      Access Farm
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-3">
                  <div>
                    <p className="text-gray-600">Owner</p>
                    <p className="font-semibold">{farm.owner}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Users</p>
                    <p className="font-semibold">{farm.users}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Animals</p>
                    <p className="font-semibold">{farm.animals}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Crops</p>
                    <p className="font-semibold">{farm.crops}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Last Active</p>
                    <p className="font-semibold">{farm.lastActive}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <a href={`tel:${farm.phone}`} className="flex items-center gap-1 text-blue-600 hover:text-blue-700">
                    <PhoneCall className="w-4 h-4" />
                    {farm.phone}
                  </a>
                  <a href={`mailto:${farm.email}`} className="flex items-center gap-1 text-blue-600 hover:text-blue-700">
                    <Mail className="w-4 h-4" />
                    {farm.email}
                  </a>
                  {farm.issuesReported > 0 && (
                    <span className="flex items-center gap-1 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      {farm.issuesReported} issue{farm.issuesReported > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Support Tab */}
      {activeTab === 'support' && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold">Support Tickets</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {supportTickets.map((ticket) => (
              <div key={ticket.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{ticket.farmName}</h3>
                      <span className={`px-2 py-1 rounded text-sm font-semibold ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded text-sm font-semibold ${getTicketStatusColor(ticket.status)}`}>
                        {ticket.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-900 mb-1">{ticket.issue}</p>
                    <p className="text-gray-600">Reported by: {ticket.reportedBy} on {ticket.date}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {ticket.status !== 'resolved' && (
                    <>
                      {ticket.status === 'open' && (
                        <button
                          onClick={() => handleUpdateTicketStatus(ticket.id, 'in-progress')}
                          className="px-3 py-1 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
                        >
                          Start Working
                        </button>
                      )}
                      <button
                        onClick={() => handleUpdateTicketStatus(ticket.id, 'resolved')}
                        className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        Mark Resolved
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
                <h3 className="font-semibold">Growth</h3>
              </div>
              <p className="text-gray-600 mb-2">New Farms This Month</p>
              <p className="font-semibold">2 farms</p>
              <p className="text-green-600 mt-2">↑ 40% from last month</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold">Countries</h3>
              </div>
              <p className="text-gray-600 mb-2">Active Regions</p>
              <p className="font-semibold">5 countries</p>
              <p className="text-gray-500 mt-2">Uganda, Kenya, Tanzania, Zambia, Nigeria</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-6 h-6 text-purple-600" />
                <h3 className="font-semibold">Subscription Revenue</h3>
              </div>
              <p className="text-gray-600 mb-2">Monthly Recurring</p>
              <p className="font-semibold">$450 USD</p>
              <p className="text-green-600 mt-2">↑ 25% from last month</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="font-semibold mb-4">Platform Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-1">Total Animals Managed</p>
                <p className="font-semibold">1,900</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-1">Total Crops Tracked</p>
                <p className="font-semibold">26 crop types</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-1">Active Users</p>
                <p className="font-semibold">{totalUsers} users</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-1">Support Response Time</p>
                <p className="font-semibold">2.5 hours avg</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
