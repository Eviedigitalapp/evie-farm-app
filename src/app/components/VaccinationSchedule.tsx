import { useState } from 'react';
import { Calendar, Syringe, Bell, Check, AlertCircle, Plus, X } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface VaccinationSchedule {
  id: number;
  animalType: string;
  vaccineName: string;
  totalAnimals: number;
  lastVaccinationDate: string;
  nextDueDate: string;
  frequency: string;
  batchNumber?: string;
  veterinarian: string;
  status: 'upcoming' | 'due' | 'overdue' | 'completed';
  notes?: string;
}

export function VaccinationSchedule() {
  const [schedules, setSchedules] = useLocalStorage<VaccinationSchedule[]>('vaccination-schedules', [
    {
      id: 1,
      animalType: 'Chickens',
      vaccineName: 'Newcastle Disease (ND)',
      totalAnimals: 120,
      lastVaccinationDate: '2026-04-17',
      nextDueDate: '2026-06-17',
      frequency: 'Every 2 months',
      batchNumber: 'ND-2026-041',
      veterinarian: 'Dr. Nakato',
      status: 'upcoming',
      notes: 'Vaccinate all layer chickens'
    },
    {
      id: 2,
      animalType: 'Pigs',
      vaccineName: 'African Swine Fever (ASF)',
      totalAnimals: 25,
      lastVaccinationDate: '2026-05-16',
      nextDueDate: '2026-11-16',
      frequency: 'Every 6 months',
      batchNumber: 'ASF-2026-042',
      veterinarian: 'Dr. Moses Okello',
      status: 'upcoming',
      notes: 'Annual booster for breeding stock'
    },
    {
      id: 3,
      animalType: 'Goats',
      vaccineName: 'Peste des Petits Ruminants (PPR)',
      totalAnimals: 35,
      lastVaccinationDate: '2026-02-15',
      nextDueDate: '2026-05-20',
      frequency: 'Every 3 months',
      veterinarian: 'Dr. Samuel Kato',
      status: 'due',
      notes: 'Include new kids born this month'
    },
    {
      id: 4,
      animalType: 'Cows',
      vaccineName: 'Foot and Mouth Disease (FMD)',
      totalAnimals: 6,
      lastVaccinationDate: '2025-11-10',
      nextDueDate: '2026-05-10',
      frequency: 'Every 6 months',
      veterinarian: 'Dr. Patrick Musoke',
      status: 'overdue',
      notes: 'URGENT: Overdue by 7 days'
    },
    {
      id: 5,
      animalType: 'Rabbits',
      vaccineName: 'Rabbit Hemorrhagic Disease (RHD)',
      totalAnimals: 18,
      lastVaccinationDate: '2026-03-20',
      nextDueDate: '2026-09-20',
      frequency: 'Every 6 months',
      veterinarian: 'Dr. Aisha Nalongo',
      status: 'upcoming',
      notes: 'Check breeding does separately'
    },
    {
      id: 6,
      animalType: 'Chickens',
      vaccineName: 'Infectious Bursal Disease (Gumboro)',
      totalAnimals: 120,
      lastVaccinationDate: '2026-03-15',
      nextDueDate: '2026-06-15',
      frequency: 'Every 3 months',
      veterinarian: 'Dr. Nakato',
      status: 'upcoming',
      notes: 'Critical for young chicks'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | VaccinationSchedule['status']>('all');

  const [formData, setFormData] = useState({
    animalType: '',
    vaccineName: '',
    totalAnimals: 0,
    lastVaccinationDate: '',
    nextDueDate: '',
    frequency: '',
    veterinarian: '',
    notes: ''
  });

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusBadge = (status: VaccinationSchedule['status'], dueDate: string) => {
    const daysUntil = getDaysUntilDue(dueDate);

    if (status === 'overdue') {
      return (
        <div className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-lg">
          <AlertCircle className="w-4 h-4" />
          <span className="font-semibold">Overdue ({Math.abs(daysUntil)} days)</span>
        </div>
      );
    }

    if (status === 'due' || daysUntil <= 7) {
      return (
        <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-lg">
          <Bell className="w-4 h-4" />
          <span className="font-semibold">Due Soon ({daysUntil} days)</span>
        </div>
      );
    }

    if (daysUntil <= 14) {
      return (
        <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-lg">
          <Calendar className="w-4 h-4" />
          <span>In {daysUntil} days</span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-lg">
        <Check className="w-4 h-4" />
        <span>In {daysUntil} days</span>
      </div>
    );
  };

  const handleAddSchedule = () => {
    const newSchedule: VaccinationSchedule = {
      ...formData,
      id: schedules.length + 1,
      status: 'upcoming'
    } as VaccinationSchedule;
    setSchedules([newSchedule, ...schedules]);
    setShowAddForm(false);
    setFormData({
      animalType: '',
      vaccineName: '',
      totalAnimals: 0,
      lastVaccinationDate: '',
      nextDueDate: '',
      frequency: '',
      veterinarian: '',
      notes: ''
    });
  };

  const markAsCompleted = (id: number) => {
    setSchedules(schedules.map(s =>
      s.id === id ? { ...s, status: 'completed' as const } : s
    ));
  };

  const filteredSchedules = schedules.filter(s => {
    if (filterStatus === 'all') return s.status !== 'completed';
    return s.status === filterStatus;
  });

  const sortedSchedules = [...filteredSchedules].sort((a, b) => {
    const daysA = getDaysUntilDue(a.nextDueDate);
    const daysB = getDaysUntilDue(b.nextDueDate);
    return daysA - daysB;
  });

  const upcomingCount = schedules.filter(s => s.status === 'upcoming').length;
  const dueCount = schedules.filter(s => s.status === 'due' || getDaysUntilDue(s.nextDueDate) <= 7).length;
  const overdueCount = schedules.filter(s => s.status === 'overdue' || getDaysUntilDue(s.nextDueDate) < 0).length;

  const animalTypes = ['Chickens', 'Ducks', 'Guinea Fowls', 'Quails', 'Turkeys', 'Rabbits', 'Pigs', 'Goats', 'Cows', 'Sheep'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold mb-2">Vaccination Schedule & Reminders</h1>
          <p className="text-gray-600">Track upcoming vaccinations and ensure animal health</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Schedule
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-gray-600">Overdue</p>
              <p className="font-semibold text-red-600">{overdueCount} Vaccination{overdueCount !== 1 ? 's' : ''}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Bell className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-gray-600">Due This Week</p>
              <p className="font-semibold text-orange-600">{dueCount} Vaccination{dueCount !== 1 ? 's' : ''}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600">Upcoming</p>
              <p className="font-semibold text-green-600">{upcomingCount} Scheduled</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Schedule Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="font-semibold mb-4">Add Vaccination Schedule</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Animal Type</label>
              <select
                value={formData.animalType}
                onChange={(e) => setFormData({ ...formData, animalType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select animal type</option>
                {animalTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Vaccine Name</label>
              <input
                type="text"
                placeholder="e.g., Newcastle Disease"
                value={formData.vaccineName}
                onChange={(e) => setFormData({ ...formData, vaccineName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Total Animals</label>
              <input
                type="number"
                placeholder="Number of animals"
                value={formData.totalAnimals || ''}
                onChange={(e) => setFormData({ ...formData, totalAnimals: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Last Vaccination Date</label>
              <input
                type="date"
                value={formData.lastVaccinationDate}
                onChange={(e) => setFormData({ ...formData, lastVaccinationDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Next Due Date</label>
              <input
                type="date"
                value={formData.nextDueDate}
                onChange={(e) => setFormData({ ...formData, nextDueDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Frequency</label>
              <input
                type="text"
                placeholder="e.g., Every 3 months"
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Veterinarian</label>
              <input
                type="text"
                placeholder="Vet name"
                value={formData.veterinarian}
                onChange={(e) => setFormData({ ...formData, veterinarian: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Notes</label>
              <textarea
                placeholder="Additional notes or instructions"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAddSchedule}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Schedule
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <label className="text-gray-700 font-semibold">Filter:</label>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filterStatus === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Active
            </button>
            <button
              onClick={() => setFilterStatus('overdue')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filterStatus === 'overdue'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Overdue
            </button>
            <button
              onClick={() => setFilterStatus('due')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filterStatus === 'due'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Due Soon
            </button>
            <button
              onClick={() => setFilterStatus('upcoming')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filterStatus === 'upcoming'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Upcoming
            </button>
          </div>
        </div>
      </div>

      {/* Schedule List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold">Vaccination Schedule</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {sortedSchedules.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No schedules found</p>
          ) : (
            sortedSchedules.map((schedule) => (
              <div key={schedule.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Syringe className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{schedule.vaccineName}</h3>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-sm">
                          {schedule.animalType}
                        </span>
                      </div>
                      <p className="text-gray-600">
                        {schedule.totalAnimals} animals • {schedule.frequency}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(schedule.status, schedule.nextDueDate)}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 ml-14 mb-3">
                  <div>
                    <p className="text-gray-600">Last Done</p>
                    <p className="font-semibold">
                      {new Date(schedule.lastVaccinationDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Next Due</p>
                    <p className="font-semibold">
                      {new Date(schedule.nextDueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Veterinarian</p>
                    <p className="font-semibold">{schedule.veterinarian}</p>
                  </div>
                  {schedule.batchNumber && (
                    <div>
                      <p className="text-gray-600">Batch #</p>
                      <p className="font-semibold">{schedule.batchNumber}</p>
                    </div>
                  )}
                </div>

                {schedule.notes && (
                  <div className="ml-14 p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-700">{schedule.notes}</p>
                  </div>
                )}

                <div className="ml-14 mt-3 flex gap-2">
                  <button
                    onClick={() => markAsCompleted(schedule.id)}
                    className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    <Check className="w-4 h-4" />
                    Mark as Done
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
