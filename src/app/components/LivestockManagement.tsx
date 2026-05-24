import { useState } from 'react';
import { Plus, Edit, Trash2, Activity, AlertCircle, X } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { PhotoUpload, PhotoGallery } from './PhotoUpload';

interface HealthLogEntry {
  id: number;
  date: string;
  observation: string;
  healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
  weight?: string;
  temperature?: string;
  treatment?: string;
  recordedBy: string;
}

interface Livestock {
  id: number;
  type: string;
  tagNumber: string;
  count: number;
  age: string;
  health: 'excellent' | 'good' | 'fair' | 'poor';
  lastCheckup: string;
  nextVaccination: string;
  location: string;
  notes: string;
  photos?: string[];
  healthLog?: HealthLogEntry[];
}

export function LivestockManagement() {
  const [showHealthLog, setShowHealthLog] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddHealthEntry, setShowAddHealthEntry] = useState(false);
  const [selectedLivestock, setSelectedLivestock] = useState<Livestock | null>(null);

  const [editFormData, setEditFormData] = useState<Partial<Livestock>>({});
  const [healthEntryData, setHealthEntryData] = useState<Partial<HealthLogEntry>>({
    date: new Date().toISOString().split('T')[0],
    healthStatus: 'good',
    recordedBy: ''
  });

  const [livestock, setLivestock] = useLocalStorage<Livestock[]>('livestock', [
    {
      id: 1,
      type: 'Local Pigs',
      tagNumber: 'PG-001-025',
      count: 25,
      age: '6-18 months',
      health: 'excellent',
      lastCheckup: '2026-05-01',
      nextVaccination: '2026-06-15',
      location: 'Pig Sty',
      notes: 'Improved local breeds, good growth rate',
      healthLog: [
        {
          id: 1,
          date: '2026-05-01',
          observation: 'All pigs healthy and growing well. Good weight gain observed.',
          healthStatus: 'excellent',
          weight: 'Avg 45kg',
          recordedBy: 'Moses Okello'
        }
      ]
    },
    {
      id: 2,
      type: 'Local Chickens (Kuroiler)',
      tagNumber: 'LC-001-120',
      count: 120,
      age: '4-10 months',
      health: 'good',
      lastCheckup: '2026-04-28',
      nextVaccination: '2026-05-30',
      location: 'Chicken House',
      notes: 'Kuroiler breed - dual purpose (eggs & meat)'
    },
    {
      id: 3,
      type: 'Ankole Cattle',
      tagNumber: 'AC-001-006',
      count: 6,
      age: '2-4 years',
      health: 'excellent',
      lastCheckup: '2026-05-10',
      nextVaccination: '2026-07-01',
      location: 'Grazing Paddock',
      notes: 'Indigenous long-horned cattle, heat tolerant'
    },
    {
      id: 4,
      type: 'Goats (Local)',
      tagNumber: 'GT-001-35',
      count: 35,
      age: '1-3 years',
      health: 'good',
      lastCheckup: '2026-05-05',
      nextVaccination: '2026-05-25',
      location: 'Goat Kraal',
      notes: 'Mubende & Kigezi breeds - meat & milk',
      healthLog: [
        {
          id: 1,
          date: '2026-05-05',
          observation: 'All 35 goats appear healthy. Good appetite and active. No signs of disease.',
          healthStatus: 'good',
          weight: 'Avg 28kg',
          recordedBy: 'Samuel Kato'
        },
        {
          id: 2,
          date: '2026-04-20',
          observation: 'Routine checkup. One goat had minor foot rot, treated successfully.',
          healthStatus: 'good',
          temperature: 'Normal range',
          treatment: 'Foot rot treatment applied to 1 goat',
          recordedBy: 'Dr. Musoke'
        }
      ]
    },
    {
      id: 5,
      type: 'Ducks',
      tagNumber: 'DK-001-040',
      count: 40,
      age: '5-12 months',
      health: 'excellent',
      lastCheckup: '2026-05-12',
      nextVaccination: '2026-06-20',
      location: 'Pond Area',
      notes: 'Muscovy ducks - egg & meat production'
    },
    {
      id: 6,
      type: 'Rabbits',
      tagNumber: 'RB-001-018',
      count: 18,
      age: '3-8 months',
      health: 'good',
      lastCheckup: '2026-05-08',
      nextVaccination: '2026-06-10',
      location: 'Rabbit Cages',
      notes: 'California White - fast growing for meat'
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newLivestock, setNewLivestock] = useState({
    type: '',
    tagNumber: '',
    count: 0,
    age: '',
    health: 'good' as Livestock['health'],
    lastCheckup: '',
    nextVaccination: '',
    location: '',
    notes: '',
    photos: [] as string[]
  });

  const handleSaveNew = () => {
    if (!newLivestock.type || !newLivestock.count || !newLivestock.location) {
      alert('Please fill in all required fields');
      return;
    }

    const animal: Livestock = {
      id: Date.now(),
      ...newLivestock,
      tagNumber: newLivestock.tagNumber || `${newLivestock.type.substring(0,2).toUpperCase()}-${Date.now().toString().slice(-3)}`
    };

    setLivestock([...livestock, animal]);
    setNewLivestock({
      type: '',
      tagNumber: '',
      count: 0,
      age: '',
      health: 'good',
      lastCheckup: '',
      nextVaccination: '',
      location: '',
      notes: '',
      photos: []
    });
    setShowAddForm(false);
  };

  const handleEdit = (animal: Livestock) => {
    setSelectedLivestock(animal);
    setEditFormData(animal);
    setShowEditForm(true);
  };

  const handleSaveEdit = () => {
    if (selectedLivestock) {
      setLivestock(livestock.map(l =>
        l.id === selectedLivestock.id ? { ...editFormData, id: selectedLivestock.id } as Livestock : l
      ));
      setShowEditForm(false);
      setSelectedLivestock(null);
      setEditFormData({});
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this livestock group? This action cannot be undone.')) {
      setLivestock(livestock.filter(l => l.id !== id));
    }
  };

  const handleOpenHealthLog = (animal: Livestock) => {
    setSelectedLivestock(animal);
    setShowHealthLog(true);
  };

  const handleAddHealthEntry = () => {
    if (selectedLivestock && healthEntryData.observation && healthEntryData.recordedBy) {
      const newEntry: HealthLogEntry = {
        ...healthEntryData,
        id: (selectedLivestock.healthLog?.length || 0) + 1,
      } as HealthLogEntry;

      const updatedLivestock = livestock.map(l => {
        if (l.id === selectedLivestock.id) {
          return {
            ...l,
            healthLog: [newEntry, ...(l.healthLog || [])],
            health: healthEntryData.healthStatus || l.health,
            lastCheckup: healthEntryData.date || l.lastCheckup
          };
        }
        return l;
      });

      setLivestock(updatedLivestock);
      setSelectedLivestock({
        ...selectedLivestock,
        healthLog: [newEntry, ...(selectedLivestock.healthLog || [])]
      });

      setHealthEntryData({
        date: new Date().toISOString().split('T')[0],
        healthStatus: 'good',
        recordedBy: ''
      });
      setShowAddHealthEntry(false);
    }
  };

  const getHealthColor = (health: Livestock['health']) => {
    switch (health) {
      case 'excellent': return 'bg-green-100 text-green-700';
      case 'good': return 'bg-blue-100 text-blue-700';
      case 'fair': return 'bg-orange-100 text-orange-700';
      case 'poor': return 'bg-red-100 text-red-700';
    }
  };

  const isVaccinationDue = (date: string) => {
    const vacDate = new Date(date);
    const today = new Date();
    const daysUntil = Math.ceil((vacDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil <= 7;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold mb-2">Livestock Management</h1>
          <p className="text-gray-600">Monitor and manage your animals' health and records</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-6 py-3 min-h-[48px] bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Livestock
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="font-semibold mb-4">Add New Livestock Group</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Animal Type *</label>
              <input
                type="text"
                value={newLivestock.type}
                onChange={(e) => setNewLivestock({...newLivestock, type: e.target.value})}
                placeholder="e.g., Pigs, Chickens, Goats, Cattle"
                className="w-full px-4 py-3 min-h-[48px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Number of Animals *</label>
              <input
                type="number"
                value={newLivestock.count || ''}
                onChange={(e) => setNewLivestock({...newLivestock, count: parseInt(e.target.value) || 0})}
                placeholder="e.g., 25"
                className="w-full px-4 py-3 min-h-[48px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Tag Number (Optional)</label>
              <input
                type="text"
                value={newLivestock.tagNumber}
                onChange={(e) => setNewLivestock({...newLivestock, tagNumber: e.target.value})}
                placeholder="Auto-generated if left empty"
                className="w-full px-4 py-3 min-h-[48px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Age/Age Range</label>
              <input
                type="text"
                value={newLivestock.age}
                onChange={(e) => setNewLivestock({...newLivestock, age: e.target.value})}
                placeholder="e.g., 6-18 months, 2 years"
                className="w-full px-4 py-3 min-h-[48px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Location *</label>
              <input
                type="text"
                value={newLivestock.location}
                onChange={(e) => setNewLivestock({...newLivestock, location: e.target.value})}
                placeholder="e.g., Pig Sty, Goat Kraal"
                className="w-full px-4 py-3 min-h-[48px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Notes</label>
              <textarea
                value={newLivestock.notes}
                onChange={(e) => setNewLivestock({...newLivestock, notes: e.target.value})}
                placeholder="Additional information about this group"
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Photos (Optional)</label>
              <PhotoUpload
                existingPhotos={newLivestock.photos}
                onPhotosChange={(photos) => setNewLivestock({...newLivestock, photos})}
                category="livestock"
                maxPhotos={5}
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSaveNew}
              className="px-6 py-3 min-h-[48px] bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Livestock
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setNewLivestock({
                  type: '',
                  tagNumber: '',
                  count: 0,
                  age: '',
                  health: 'good',
                  lastCheckup: '',
                  nextVaccination: '',
                  location: '',
                  notes: '',
                  photos: []
                });
              }}
              className="px-6 py-3 min-h-[48px] border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {livestock.map((animal) => (
          <div key={animal.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold mb-1">{animal.type}</h3>
                <p className="text-gray-600">Tag: {animal.tagNumber}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getHealthColor(animal.health)}`}>
                {animal.health}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-gray-600 mb-1">Count</p>
                <p className="font-semibold">{animal.count} animals</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Age</p>
                <p className="font-semibold">{animal.age}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Location</p>
                <p className="font-semibold">{animal.location}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Last Checkup</p>
                <p className="font-semibold">{new Date(animal.lastCheckup).toLocaleDateString()}</p>
              </div>
            </div>

            {isVaccinationDue(animal.nextVaccination) && (
              <div className="flex items-start gap-2 p-3 mb-4 bg-orange-50 border border-orange-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-orange-900 mb-1">Vaccination Due Soon</p>
                  <p className="text-orange-700">Next vaccination: {new Date(animal.nextVaccination).toLocaleDateString()}</p>
                </div>
              </div>
            )}

            <div className="mb-4">
              <p className="text-gray-600 mb-1">Notes</p>
              <p className="text-gray-700">{animal.notes}</p>
            </div>

            {animal.photos && animal.photos.length > 0 && (
              <div className="mb-4 pt-4 border-t border-gray-200">
                <PhotoGallery photos={animal.photos} />
              </div>
            )}

            <div className="flex gap-2 pt-4 border-t border-gray-200">
              <button
                onClick={() => handleOpenHealthLog(animal)}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Activity className="w-4 h-4" />
                Health Log
              </button>
              <button
                onClick={() => handleEdit(animal)}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(animal.id)}
                className="flex items-center gap-2 px-3 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {showEditForm && selectedLivestock && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="font-semibold">Edit Livestock Group</h2>
              <button
                onClick={() => {
                  setShowEditForm(false);
                  setSelectedLivestock(null);
                  setEditFormData({});
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Type</label>
                <input
                  type="text"
                  value={editFormData.type || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Tag Number</label>
                <input
                  type="text"
                  value={editFormData.tagNumber || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, tagNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Count</label>
                <input
                  type="number"
                  value={editFormData.count || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, count: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Age</label>
                <input
                  type="text"
                  value={editFormData.age || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, age: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={editFormData.location || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Health Status</label>
                <select
                  value={editFormData.health || 'good'}
                  onChange={(e) => setEditFormData({ ...editFormData, health: e.target.value as Livestock['health'] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Last Checkup</label>
                <input
                  type="date"
                  value={editFormData.lastCheckup || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, lastCheckup: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Next Vaccination</label>
                <input
                  type="date"
                  value={editFormData.nextVaccination || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, nextVaccination: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">Notes</label>
                <textarea
                  value={editFormData.notes || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setShowEditForm(false);
                  setSelectedLivestock(null);
                  setEditFormData({});
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Health Log Modal */}
      {showHealthLog && selectedLivestock && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-semibold">Health Log</h2>
                <p className="text-gray-600">{selectedLivestock.type} - {selectedLivestock.tagNumber}</p>
              </div>
              <button
                onClick={() => {
                  setShowHealthLog(false);
                  setSelectedLivestock(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Status */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-gray-600 mb-1">Current Health</p>
                  <p className="font-semibold capitalize">{selectedLivestock.health}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Count</p>
                  <p className="font-semibold">{selectedLivestock.count} animals</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Last Checkup</p>
                  <p className="font-semibold">{new Date(selectedLivestock.lastCheckup).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Location</p>
                  <p className="font-semibold">{selectedLivestock.location}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Health History</h3>
              <button
                onClick={() => setShowAddHealthEntry(!showAddHealthEntry)}
                className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Entry
              </button>
            </div>

            {/* Add Health Entry Form */}
            {showAddHealthEntry && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold mb-3">New Health Entry</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">Date</label>
                    <input
                      type="date"
                      value={healthEntryData.date}
                      onChange={(e) => setHealthEntryData({ ...healthEntryData, date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">Health Status</label>
                    <select
                      value={healthEntryData.healthStatus}
                      onChange={(e) => setHealthEntryData({ ...healthEntryData, healthStatus: e.target.value as HealthLogEntry['healthStatus'] })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    >
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="fair">Fair</option>
                      <option value="poor">Poor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">Weight (optional)</label>
                    <input
                      type="text"
                      placeholder="e.g., Avg 32kg"
                      value={healthEntryData.weight || ''}
                      onChange={(e) => setHealthEntryData({ ...healthEntryData, weight: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">Temperature (optional)</label>
                    <input
                      type="text"
                      placeholder="e.g., 38.5°C"
                      value={healthEntryData.temperature || ''}
                      onChange={(e) => setHealthEntryData({ ...healthEntryData, temperature: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-1 text-sm">Observation *</label>
                    <textarea
                      placeholder="Detailed health observations..."
                      value={healthEntryData.observation || ''}
                      onChange={(e) => setHealthEntryData({ ...healthEntryData, observation: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">Treatment Given (optional)</label>
                    <input
                      type="text"
                      placeholder="e.g., Antibiotics administered"
                      value={healthEntryData.treatment || ''}
                      onChange={(e) => setHealthEntryData({ ...healthEntryData, treatment: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">Recorded By *</label>
                    <input
                      type="text"
                      placeholder="Staff name"
                      value={healthEntryData.recordedBy || ''}
                      onChange={(e) => setHealthEntryData({ ...healthEntryData, recordedBy: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={handleAddHealthEntry}
                    className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    Save Entry
                  </button>
                  <button
                    onClick={() => {
                      setShowAddHealthEntry(false);
                      setHealthEntryData({
                        date: new Date().toISOString().split('T')[0],
                        healthStatus: 'good',
                        recordedBy: ''
                      });
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Health Log Entries */}
            <div className="space-y-3">
              {(!selectedLivestock.healthLog || selectedLivestock.healthLog.length === 0) ? (
                <p className="text-gray-500 text-center py-8">No health log entries yet. Add your first entry above.</p>
              ) : (
                selectedLivestock.healthLog.map((entry) => (
                  <div key={entry.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold">{new Date(entry.date).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600">By: {entry.recordedBy}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${getHealthColor(entry.healthStatus)}`}>
                        {entry.healthStatus}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-3">{entry.observation}</p>

                    {(entry.weight || entry.temperature || entry.treatment) && (
                      <div className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-200">
                        {entry.weight && (
                          <div>
                            <p className="text-xs text-gray-600">Weight</p>
                            <p className="text-sm font-semibold">{entry.weight}</p>
                          </div>
                        )}
                        {entry.temperature && (
                          <div>
                            <p className="text-xs text-gray-600">Temperature</p>
                            <p className="text-sm font-semibold">{entry.temperature}</p>
                          </div>
                        )}
                        {entry.treatment && (
                          <div className="col-span-3">
                            <p className="text-xs text-gray-600">Treatment</p>
                            <p className="text-sm font-semibold">{entry.treatment}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            <button
              onClick={() => {
                setShowHealthLog(false);
                setSelectedLivestock(null);
              }}
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
