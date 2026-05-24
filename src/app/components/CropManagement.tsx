import { useState } from 'react';
import { Plus, Edit, Trash2, Droplet, Calendar } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { PhotoUpload, PhotoGallery } from './PhotoUpload';

interface Crop {
  id: number;
  name: string;
  field: string;
  area: string;
  plantingDate: string;
  harvestDate: string;
  status: 'planted' | 'growing' | 'ready' | 'harvested';
  yield: string;
  healthScore: number;
  photos?: string[];
}

export function CropManagement() {
  const [crops, setCrops] = useLocalStorage<Crop[]>('crops', [
    {
      id: 1,
      name: 'Coffee (Robusta)',
      field: 'Coffee Garden',
      area: '2 acres',
      plantingDate: '2024-06-01',
      harvestDate: '2026-07-30',
      status: 'ready',
      yield: '1,200kg cherries expected',
      healthScore: 88
    },
    {
      id: 2,
      name: 'Matoke (Cooking Bananas)',
      field: 'Banana Plantation',
      area: '1.5 acres',
      plantingDate: '2025-08-15',
      harvestDate: '2026-05-20',
      status: 'growing',
      yield: '3 tons expected',
      healthScore: 92
    },
    {
      id: 3,
      name: 'Cassava',
      field: 'Lower Garden',
      area: '1 acre',
      plantingDate: '2025-11-01',
      harvestDate: '2026-08-01',
      status: 'growing',
      yield: '4.5 tons expected',
      healthScore: 85
    },
    {
      id: 4,
      name: 'Sweet Potatoes',
      field: 'Valley Plot',
      area: '0.5 acres',
      plantingDate: '2026-02-10',
      harvestDate: '2026-06-25',
      status: 'growing',
      yield: '2 tons expected',
      healthScore: 90
    },
    {
      id: 5,
      name: 'Beans (Mix)',
      field: 'Upper Garden',
      area: '1.5 acres',
      plantingDate: '2026-03-20',
      harvestDate: '2026-06-30',
      status: 'growing',
      yield: '1,000kg expected',
      healthScore: 86
    },
    {
      id: 6,
      name: 'Maize (Hybrid)',
      field: 'Main Field',
      area: '2 acres',
      plantingDate: '2026-03-10',
      harvestDate: '2026-08-05',
      status: 'growing',
      yield: '3 tons expected',
      healthScore: 82
    },
    {
      id: 7,
      name: 'Groundnuts',
      field: 'Sandy Plot',
      area: '0.75 acres',
      plantingDate: '2026-04-05',
      harvestDate: '2026-08-15',
      status: 'planted',
      yield: '600kg expected',
      healthScore: 78
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newCrop, setNewCrop] = useState({
    name: '',
    field: '',
    area: '',
    plantingDate: '',
    harvestDate: '',
    status: 'planted' as Crop['status'],
    yield: '',
    healthScore: 80,
    photos: [] as string[]
  });

  const saveCrop = (closeForm: boolean = true) => {
    console.log('Save button clicked!');
    console.log('newCrop data:', newCrop);

    if (!newCrop.name || !newCrop.field || !newCrop.plantingDate) {
      console.log('Validation failed - missing required fields');
      alert('Please fill in all required fields');
      return;
    }

    console.log('Validation passed, creating crop...');
    const crop: Crop = {
      id: Date.now(),
      ...newCrop
    };

    console.log('New crop:', crop);

    // Use functional update to ensure we get the latest crops state
    setCrops((prevCrops) => {
      const updatedCrops = [...prevCrops, crop];
      console.log('Crop added to list. Total crops:', updatedCrops.length);
      return updatedCrops;
    });

    // Reset form
    setNewCrop({
      name: '',
      field: '',
      area: '',
      plantingDate: '',
      harvestDate: '',
      status: 'planted',
      yield: '',
      healthScore: 80,
      photos: []
    });

    // Close form only if requested
    if (closeForm) {
      setShowAddForm(false);
      console.log('Form closed');
    } else {
      console.log('Form kept open for next entry');
    }
  };

  const handleSave = () => saveCrop(true);
  const handleSaveAndAddAnother = () => saveCrop(false);

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this crop?')) {
      setCrops(crops.filter(c => c.id !== id));
    }
  };

  const getStatusColor = (status: Crop['status']) => {
    switch (status) {
      case 'planted': return 'bg-blue-100 text-blue-700';
      case 'growing': return 'bg-green-100 text-green-700';
      case 'ready': return 'bg-orange-100 text-orange-700';
      case 'harvested': return 'bg-gray-100 text-gray-700';
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold mb-2">Crop Management</h1>
          <p className="text-gray-600">Track and manage all your crops across different fields</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-6 py-3 min-h-[48px] bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Crop
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="font-semibold mb-4">Add New Crop</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Crop Name *</label>
              <input
                type="text"
                value={newCrop.name}
                onChange={(e) => setNewCrop({...newCrop, name: e.target.value})}
                placeholder="e.g., Coffee, Matoke, Cassava"
                className="w-full px-4 py-3 min-h-[48px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Field Location *</label>
              <input
                type="text"
                value={newCrop.field}
                onChange={(e) => setNewCrop({...newCrop, field: e.target.value})}
                placeholder="e.g., Coffee Garden, Valley Plot"
                className="w-full px-4 py-3 min-h-[48px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Area</label>
              <input
                type="text"
                value={newCrop.area}
                onChange={(e) => setNewCrop({...newCrop, area: e.target.value})}
                placeholder="e.g., 2 acres, 1.5 hectares"
                className="w-full px-4 py-3 min-h-[48px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Planting Date *</label>
              <input
                type="date"
                value={newCrop.plantingDate}
                onChange={(e) => setNewCrop({...newCrop, plantingDate: e.target.value})}
                className="w-full px-4 py-3 min-h-[48px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Expected Harvest Date</label>
              <input
                type="date"
                value={newCrop.harvestDate}
                onChange={(e) => setNewCrop({...newCrop, harvestDate: e.target.value})}
                className="w-full px-4 py-3 min-h-[48px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Expected Yield</label>
              <input
                type="text"
                value={newCrop.yield}
                onChange={(e) => setNewCrop({...newCrop, yield: e.target.value})}
                placeholder="e.g., 3 tons, 1200kg"
                className="w-full px-4 py-3 min-h-[48px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Photos (Optional)</label>
              <PhotoUpload
                existingPhotos={newCrop.photos}
                onPhotosChange={(photos) => setNewCrop({...newCrop, photos})}
                category="crops"
                maxPhotos={5}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={handleSave}
              className="px-6 py-3 min-h-[48px] bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Save Crop
            </button>
            <button
              onClick={handleSaveAndAddAnother}
              className="px-6 py-3 min-h-[48px] bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save & Add Another
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setNewCrop({
                  name: '',
                  field: '',
                  area: '',
                  plantingDate: '',
                  harvestDate: '',
                  status: 'planted',
                  yield: '',
                  healthScore: 80,
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

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {crops.map((crop) => (
          <div key={crop.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold mb-1">{crop.name}</h3>
                <p className="text-gray-600">{crop.field} - {crop.area}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(crop.status)}`}>
                {crop.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Planted: {new Date(crop.plantingDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Harvest: {new Date(crop.harvestDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Droplet className="w-4 h-4" />
                <span>Yield: {crop.yield}</span>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Health Score</span>
                  <span className={`font-semibold ${getHealthColor(crop.healthScore)}`}>
                    {crop.healthScore}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${crop.healthScore >= 80 ? 'bg-green-600' : crop.healthScore >= 60 ? 'bg-orange-600' : 'bg-red-600'}`}
                    style={{ width: `${crop.healthScore}%` }}
                  />
                </div>
              </div>
            </div>

            {crop.photos && crop.photos.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <PhotoGallery photos={crop.photos} />
              </div>
            )}

            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => handleDelete(crop.id)}
                className="flex items-center gap-2 px-3 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
