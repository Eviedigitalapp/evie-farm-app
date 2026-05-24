import { useState } from 'react';
import { Plus, Calendar, TrendingUp, Syringe, Droplet, Heart, X, Eye } from 'lucide-react';

type RecordType = 'feed' | 'mortality' | 'vaccination' | 'medicine' | 'weight' | 'eggs' | 'water' | 'observation';

interface LivestockRecord {
  id: number;
  date: string;
  time: string;
  animalType: string;
  recordType: RecordType;

  // Feed Usage
  feedType?: string;
  feedQuantity?: number;
  feedUnit?: string;
  feedCost?: number;

  // Mortality
  numberOfDeaths?: number;
  cause?: string;
  ageGroup?: string;

  // Vaccination
  vaccineName?: string;
  numberOfAnimals?: number;
  batchNumber?: string;
  nextDueDate?: string;

  // Medicine
  medicineName?: string;
  dosage?: string;
  reasonForTreatment?: string;
  treatedAnimals?: number;

  // Weight Gain
  averageWeight?: number;
  weightUnit?: string;
  numberOfWeighed?: number;

  // Egg Production
  eggsCollected?: number;
  brokenEggs?: number;

  // Water Consumption
  waterQuantity?: number;
  waterUnit?: string;

  // Daily Observations
  observations?: string;
  healthStatus?: 'excellent' | 'good' | 'fair' | 'poor';

  recordedBy: string;
  notes?: string;
}

export function LivestockRecords() {
  const [records, setRecords] = useState<LivestockRecord[]>([
    {
      id: 1,
      date: '2026-05-17',
      time: '06:00',
      animalType: 'Chickens',
      recordType: 'feed',
      feedType: 'Layers Mash',
      feedQuantity: 30,
      feedUnit: 'kg',
      feedCost: 42000,
      recordedBy: 'Nakato Grace',
      notes: 'Morning feeding - all birds active'
    },
    {
      id: 2,
      date: '2026-05-17',
      time: '07:00',
      animalType: 'Chickens',
      recordType: 'eggs',
      eggsCollected: 95,
      brokenEggs: 4,
      recordedBy: 'Nakato Grace',
      notes: 'Good production rate'
    },
    {
      id: 3,
      date: '2026-05-17',
      time: '06:30',
      animalType: 'Pigs',
      recordType: 'feed',
      feedType: 'Pig Concentrate',
      feedQuantity: 50,
      feedUnit: 'kg',
      feedCost: 65000,
      recordedBy: 'Moses Okello',
      notes: 'All pigs eating well'
    },
    {
      id: 4,
      date: '2026-05-16',
      time: '14:00',
      animalType: 'Pigs',
      recordType: 'vaccination',
      vaccineName: 'African Swine Fever Vaccine',
      numberOfAnimals: 25,
      batchNumber: 'ASF-2026-042',
      nextDueDate: '2026-11-16',
      recordedBy: 'Dr. Musoke',
      notes: 'All pigs vaccinated successfully'
    },
    {
      id: 5,
      date: '2026-05-16',
      time: '10:00',
      animalType: 'Goats',
      recordType: 'weight',
      averageWeight: 28,
      weightUnit: 'kg',
      numberOfWeighed: 35,
      recordedBy: 'Samuel Kato',
      notes: 'Good weight gain observed'
    },
    {
      id: 6,
      date: '2026-05-17',
      time: '08:00',
      animalType: 'Chickens',
      recordType: 'water',
      waterQuantity: 80,
      waterUnit: 'liters',
      recordedBy: 'Nakato Grace',
      notes: 'Refilled all water containers'
    },
    {
      id: 7,
      date: '2026-05-16',
      time: '15:00',
      animalType: 'Pigs',
      recordType: 'mortality',
      numberOfDeaths: 1,
      cause: 'Unknown - sudden death',
      ageGroup: '3 months',
      recordedBy: 'Moses Okello',
      notes: 'Piglet found dead in morning. Vet consulted.'
    },
    {
      id: 8,
      date: '2026-05-17',
      time: '09:00',
      animalType: 'Goats',
      recordType: 'medicine',
      medicineName: 'Ivermectin (Dewormer)',
      dosage: '1ml per 50kg',
      reasonForTreatment: 'Routine deworming',
      treatedAnimals: 35,
      recordedBy: 'Samuel Kato',
      notes: 'All goats dewormed as scheduled'
    },
    {
      id: 9,
      date: '2026-05-17',
      time: '16:00',
      animalType: 'Cows',
      recordType: 'observation',
      observations: 'All 6 cows grazing well. One cow (tag AC-003) showing slight limp on left hind leg. Will monitor closely.',
      healthStatus: 'good',
      recordedBy: 'Patrick Musoke',
      notes: 'Weather hot - ensured adequate shade'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<LivestockRecord | null>(null);
  const [filterType, setFilterType] = useState<RecordType | 'all'>('all');
  const [filterAnimal, setFilterAnimal] = useState<string>('all');

  const [formData, setFormData] = useState<Partial<LivestockRecord>>({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    recordType: 'feed',
    animalType: '',
    recordedBy: ''
  });

  const animalTypes = ['Chickens', 'Ducks', 'Guinea Fowls', 'Quails', 'Turkeys', 'Rabbits', 'Pigs', 'Goats', 'Cows', 'Sheep'];

  const recordTypes: { value: RecordType; label: string; icon: any }[] = [
    { value: 'feed', label: 'Feed Usage', icon: '🌾' },
    { value: 'mortality', label: 'Mortality', icon: '💔' },
    { value: 'vaccination', label: 'Vaccination', icon: '💉' },
    { value: 'medicine', label: 'Medicine', icon: '💊' },
    { value: 'weight', label: 'Weight Gain', icon: '⚖️' },
    { value: 'eggs', label: 'Egg Production', icon: '🥚' },
    { value: 'water', label: 'Water Consumption', icon: '💧' },
    { value: 'observation', label: 'Daily Observation', icon: '👁️' }
  ];

  const handleSaveRecord = () => {
    const newRecord: LivestockRecord = {
      ...formData,
      id: records.length + 1,
    } as LivestockRecord;
    setRecords([newRecord, ...records]);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      recordType: 'feed',
      animalType: '',
      recordedBy: ''
    });
    setShowAddForm(false);
  };

  const filteredRecords = records.filter(r => {
    if (filterType !== 'all' && r.recordType !== filterType) return false;
    if (filterAnimal !== 'all' && r.animalType !== filterAnimal) return false;
    return true;
  });

  const getRecordIcon = (type: RecordType) => {
    return recordTypes.find(rt => rt.value === type)?.icon || '📝';
  };

  const todayRecords = records.filter(r => r.date === new Date().toISOString().split('T')[0]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold mb-2">Livestock Records & Tracking</h1>
          <p className="text-gray-600">Comprehensive livestock health and production monitoring</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Record
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 mb-1">Today's Records</p>
          <p className="font-semibold">{todayRecords.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 mb-1">Total Eggs Today</p>
          <p className="font-semibold">
            {todayRecords.filter(r => r.recordType === 'eggs').reduce((sum, r) => sum + (r.eggsCollected || 0), 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 mb-1">Feed Cost Today</p>
          <p className="font-semibold">
            UGX {todayRecords.filter(r => r.recordType === 'feed').reduce((sum, r) => sum + (r.feedCost || 0), 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 mb-1">Vaccinations</p>
          <p className="font-semibold">
            {records.filter(r => r.recordType === 'vaccination' && r.date.startsWith('2026-05')).length} this month
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Filter by Record Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as RecordType | 'all')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Records</option>
              {recordTypes.map(rt => (
                <option key={rt.value} value={rt.value}>{rt.icon} {rt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Filter by Animal Type</label>
            <select
              value={filterAnimal}
              onChange={(e) => setFilterAnimal(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Animals</option>
              {animalTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Add Record Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg border-2 border-blue-500 p-6">
          <h2 className="font-semibold mb-4">Add Livestock Record</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Date *</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Time *</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Animal Type *</label>
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
              <label className="block text-gray-700 mb-2">Record Type *</label>
              <select
                value={formData.recordType}
                onChange={(e) => setFormData({ ...formData, recordType: e.target.value as RecordType })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {recordTypes.map(rt => (
                  <option key={rt.value} value={rt.value}>{rt.icon} {rt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Dynamic Fields Based on Record Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {formData.recordType === 'feed' && (
              <>
                <div>
                  <label className="block text-gray-700 mb-2">Feed Type</label>
                  <input
                    type="text"
                    placeholder="e.g., Layers Mash, Pig Concentrate"
                    value={formData.feedType || ''}
                    onChange={(e) => setFormData({ ...formData, feedType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Quantity</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Amount"
                      value={formData.feedQuantity || ''}
                      onChange={(e) => setFormData({ ...formData, feedQuantity: Number(e.target.value) })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                      value={formData.feedUnit || 'kg'}
                      onChange={(e) => setFormData({ ...formData, feedUnit: e.target.value })}
                      className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="kg">kg</option>
                      <option value="bags">bags</option>
                      <option value="liters">liters</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Cost (UGX)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={formData.feedCost || ''}
                    onChange={(e) => setFormData({ ...formData, feedCost: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}

            {formData.recordType === 'mortality' && (
              <>
                <div>
                  <label className="block text-gray-700 mb-2">Number of Deaths</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={formData.numberOfDeaths || ''}
                    onChange={(e) => setFormData({ ...formData, numberOfDeaths: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Age Group</label>
                  <input
                    type="text"
                    placeholder="e.g., 3 months, adult"
                    value={formData.ageGroup || ''}
                    onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">Cause of Death</label>
                  <input
                    type="text"
                    placeholder="e.g., Disease, accident, unknown"
                    value={formData.cause || ''}
                    onChange={(e) => setFormData({ ...formData, cause: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}

            {formData.recordType === 'vaccination' && (
              <>
                <div>
                  <label className="block text-gray-700 mb-2">Vaccine Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Newcastle, ASF"
                    value={formData.vaccineName || ''}
                    onChange={(e) => setFormData({ ...formData, vaccineName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Number of Animals</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={formData.numberOfAnimals || ''}
                    onChange={(e) => setFormData({ ...formData, numberOfAnimals: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Batch Number</label>
                  <input
                    type="text"
                    placeholder="e.g., ASF-2026-042"
                    value={formData.batchNumber || ''}
                    onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Next Due Date</label>
                  <input
                    type="date"
                    value={formData.nextDueDate || ''}
                    onChange={(e) => setFormData({ ...formData, nextDueDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}

            {formData.recordType === 'medicine' && (
              <>
                <div>
                  <label className="block text-gray-700 mb-2">Medicine Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Ivermectin, Antibiotics"
                    value={formData.medicineName || ''}
                    onChange={(e) => setFormData({ ...formData, medicineName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Dosage</label>
                  <input
                    type="text"
                    placeholder="e.g., 1ml per 50kg"
                    value={formData.dosage || ''}
                    onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Number Treated</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={formData.treatedAnimals || ''}
                    onChange={(e) => setFormData({ ...formData, treatedAnimals: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Reason for Treatment</label>
                  <input
                    type="text"
                    placeholder="e.g., Deworming, infection"
                    value={formData.reasonForTreatment || ''}
                    onChange={(e) => setFormData({ ...formData, reasonForTreatment: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}

            {formData.recordType === 'weight' && (
              <>
                <div>
                  <label className="block text-gray-700 mb-2">Average Weight</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="0"
                      value={formData.averageWeight || ''}
                      onChange={(e) => setFormData({ ...formData, averageWeight: Number(e.target.value) })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                      value={formData.weightUnit || 'kg'}
                      onChange={(e) => setFormData({ ...formData, weightUnit: e.target.value })}
                      className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="kg">kg</option>
                      <option value="lbs">lbs</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Number Weighed</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={formData.numberOfWeighed || ''}
                    onChange={(e) => setFormData({ ...formData, numberOfWeighed: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}

            {formData.recordType === 'eggs' && (
              <>
                <div>
                  <label className="block text-gray-700 mb-2">Eggs Collected</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={formData.eggsCollected || ''}
                    onChange={(e) => setFormData({ ...formData, eggsCollected: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Broken Eggs</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={formData.brokenEggs || ''}
                    onChange={(e) => setFormData({ ...formData, brokenEggs: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}

            {formData.recordType === 'water' && (
              <div>
                <label className="block text-gray-700 mb-2">Water Quantity</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="0"
                    value={formData.waterQuantity || ''}
                    onChange={(e) => setFormData({ ...formData, waterQuantity: Number(e.target.value) })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <select
                    value={formData.waterUnit || 'liters'}
                    onChange={(e) => setFormData({ ...formData, waterUnit: e.target.value })}
                    className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="liters">liters</option>
                    <option value="gallons">gallons</option>
                  </select>
                </div>
              </div>
            )}

            {formData.recordType === 'observation' && (
              <>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">Observations</label>
                  <textarea
                    placeholder="Detailed daily observations..."
                    value={formData.observations || ''}
                    onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Health Status</label>
                  <select
                    value={formData.healthStatus || 'good'}
                    onChange={(e) => setFormData({ ...formData, healthStatus: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Recorded By *</label>
              <input
                type="text"
                placeholder="Staff name"
                value={formData.recordedBy}
                onChange={(e) => setFormData({ ...formData, recordedBy: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Additional Notes</label>
              <textarea
                placeholder="Any additional notes..."
                value={formData.notes || ''}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSaveRecord}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Record
            </button>
            <button
              onClick={resetForm}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Records List */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="font-semibold mb-4">
          Records ({filteredRecords.length})
        </h2>
        <div className="space-y-3">
          {filteredRecords.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No records found</p>
          ) : (
            filteredRecords.map((record) => (
              <div
                key={record.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => {
                  setSelectedRecord(record);
                  setShowDetailsModal(true);
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{getRecordIcon(record.recordType)}</div>
                    <div>
                      <p className="font-semibold">{record.animalType} - {recordTypes.find(rt => rt.value === record.recordType)?.label}</p>
                      <p className="text-gray-600">{record.date} at {record.time}</p>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>By: {record.recordedBy}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mt-3">
                  {record.recordType === 'feed' && (
                    <>
                      <div className="text-gray-600">Feed: {record.feedType}</div>
                      <div className="text-gray-600">Qty: {record.feedQuantity} {record.feedUnit}</div>
                      <div className="text-orange-600">Cost: UGX {record.feedCost?.toLocaleString()}</div>
                    </>
                  )}
                  {record.recordType === 'eggs' && (
                    <>
                      <div className="text-green-600">Collected: {record.eggsCollected}</div>
                      <div className="text-red-600">Broken: {record.brokenEggs}</div>
                    </>
                  )}
                  {record.recordType === 'vaccination' && (
                    <>
                      <div className="text-gray-600">Vaccine: {record.vaccineName}</div>
                      <div className="text-gray-600">Animals: {record.numberOfAnimals}</div>
                      <div className="text-blue-600">Next: {record.nextDueDate}</div>
                    </>
                  )}
                  {record.recordType === 'weight' && (
                    <>
                      <div className="text-gray-600">Avg: {record.averageWeight} {record.weightUnit}</div>
                      <div className="text-gray-600">Weighed: {record.numberOfWeighed}</div>
                    </>
                  )}
                  {record.recordType === 'mortality' && (
                    <>
                      <div className="text-red-600">Deaths: {record.numberOfDeaths}</div>
                      <div className="text-gray-600">Cause: {record.cause}</div>
                    </>
                  )}
                </div>

                {record.notes && (
                  <p className="text-gray-600 text-sm mt-2 line-clamp-1">{record.notes}</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-semibold mb-1">Record Details</h2>
                <p className="text-gray-600">{selectedRecord.date} at {selectedRecord.time}</p>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{getRecordIcon(selectedRecord.recordType)}</div>
                  <div>
                    <p className="font-semibold">{selectedRecord.animalType}</p>
                    <p className="text-gray-600">{recordTypes.find(rt => rt.value === selectedRecord.recordType)?.label}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {Object.entries(selectedRecord).map(([key, value]) => {
                  if (['id', 'recordType', 'animalType', 'date', 'time', 'notes', 'recordedBy'].includes(key) || !value) return null;
                  return (
                    <div key={key}>
                      <p className="text-gray-600 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                      <p className="font-semibold">{value.toString()}</p>
                    </div>
                  );
                })}
              </div>

              {selectedRecord.notes && (
                <div className="border-t pt-4">
                  <p className="text-gray-700 font-semibold mb-2">Notes</p>
                  <p className="text-gray-900">{selectedRecord.notes}</p>
                </div>
              )}

              <div className="border-t pt-4">
                <p className="text-gray-600">Recorded by: <span className="font-semibold">{selectedRecord.recordedBy}</span></p>
              </div>
            </div>

            <button
              onClick={() => setShowDetailsModal(false)}
              className="mt-4 w-full px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
