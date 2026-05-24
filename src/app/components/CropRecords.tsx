import { useState } from 'react';
import { Plus, Calendar, Sprout, Droplet, Bug, Scissors, X } from 'lucide-react';

type CropRecordType = 'planting' | 'spraying' | 'fertilizer' | 'irrigation' | 'harvest' | 'pest' | 'yield';

interface CropRecord {
  id: number;
  date: string;
  cropName: string;
  fieldLocation: string;
  recordType: CropRecordType;

  // Planting
  plantingDate?: string;
  seedType?: string;
  quantityPlanted?: string;
  areaplanted?: string;
  expectedHarvestDate?: string;

  // Spraying
  pesticide?: string;
  sprayQuantity?: string;
  targetPest?: string;
  weatherConditions?: string;

  // Fertilizer
  fertilizerType?: string;
  fertilizerQuantity?: string;
  applicationMethod?: string;
  npkRatio?: string;

  // Irrigation
  irrigationMethod?: string;
  waterVolume?: string;
  duration?: string;
  soilMoisture?: string;

  // Harvest
  harvestDate?: string;
  quantityHarvested?: string;
  quality?: 'excellent' | 'good' | 'fair' | 'poor';
  marketPrice?: number;

  // Pest Outbreak
  pestType?: string;
  infestationLevel?: 'low' | 'medium' | 'high';
  affectedArea?: string;
  actionTaken?: string;

  // Yield Estimate
  estimatedYield?: string;
  estimateDate?: string;
  growthStage?: string;
  healthRating?: number;

  recordedBy: string;
  cost?: number;
  notes?: string;
}

export function CropRecords() {
  const [records, setRecords] = useState<CropRecord[]>([
    {
      id: 1,
      date: '2026-03-15',
      cropName: 'Maize (Hybrid)',
      fieldLocation: 'Main Field',
      recordType: 'planting',
      plantingDate: '2026-03-15',
      seedType: 'Longe 5 Hybrid',
      quantityPlanted: '10kg',
      areaplanted: '2 acres',
      expectedHarvestDate: '2026-08-05',
      recordedBy: 'Patrick Musoke',
      cost: 65000,
      notes: 'Good soil moisture, planted at recommended spacing'
    },
    {
      id: 2,
      date: '2026-05-17',
      cropName: 'Coffee (Robusta)',
      fieldLocation: 'Coffee Garden',
      recordType: 'spraying',
      pesticide: 'Ridomil Gold Fungicide',
      sprayQuantity: '2 liters in 100L water',
      targetPest: 'Coffee Berry Disease',
      weatherConditions: 'Clear, no rain expected',
      recordedBy: 'Moses Okello',
      cost: 85000,
      notes: 'Full coverage achieved. Follow-up spray in 2 weeks'
    },
    {
      id: 3,
      date: '2026-05-10',
      cropName: 'Maize (Hybrid)',
      fieldLocation: 'Main Field',
      recordType: 'fertilizer',
      fertilizerType: 'Urea',
      fertilizerQuantity: '100kg (50kg/acre)',
      applicationMethod: 'Top dressing',
      npkRatio: '46-0-0',
      recordedBy: 'Patrick Musoke',
      cost: 120000,
      notes: 'Applied at 6 weeks after planting'
    },
    {
      id: 4,
      date: '2026-05-17',
      cropName: 'Sweet Potatoes',
      fieldLocation: 'Valley Plot',
      recordType: 'irrigation',
      irrigationMethod: 'Drip irrigation',
      waterVolume: '2000 liters',
      duration: '1.5 hours',
      soilMoisture: 'Was dry, now adequate',
      recordedBy: 'Okello James',
      cost: 5000,
      notes: 'One drip line needs repair in southern section'
    },
    {
      id: 5,
      date: '2026-05-12',
      cropName: 'Beans',
      fieldLocation: 'Upper Garden',
      recordType: 'harvest',
      harvestDate: '2026-05-12',
      quantityHarvested: '300kg',
      quality: 'good',
      marketPrice: 3500,
      recordedBy: 'Grace & Team',
      notes: 'First harvest, more expected in 2 weeks'
    },
    {
      id: 6,
      date: '2026-05-16',
      cropName: 'Matoke',
      fieldLocation: 'Banana Plantation',
      recordType: 'pest',
      pestType: 'Banana Weevil',
      infestationLevel: 'low',
      affectedArea: '3 plants on eastern side',
      actionTaken: 'Applied neem-based pesticide, removed affected parts',
      recordedBy: 'Sarah Nambi',
      cost: 15000,
      notes: 'Will monitor closely for next 2 weeks'
    },
    {
      id: 7,
      date: '2026-05-17',
      cropName: 'Coffee (Robusta)',
      fieldLocation: 'Coffee Garden',
      recordType: 'yield',
      estimatedYield: '1200kg cherries',
      estimateDate: '2026-07-30',
      growthStage: 'Flowering to early berry formation',
      healthRating: 85,
      recordedBy: 'Moses Okello',
      notes: 'Good flowering this season. Berry disease under control'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<CropRecord | null>(null);
  const [filterType, setFilterType] = useState<CropRecordType | 'all'>('all');

  const [formData, setFormData] = useState<Partial<CropRecord>>({
    date: new Date().toISOString().split('T')[0],
    recordType: 'planting',
    cropName: '',
    fieldLocation: '',
    recordedBy: ''
  });

  const recordTypes: { value: CropRecordType; label: string; icon: any }[] = [
    { value: 'planting', label: 'Planting Dates', icon: <Sprout className="w-4 h-4" /> },
    { value: 'spraying', label: 'Spraying', icon: <Droplet className="w-4 h-4" /> },
    { value: 'fertilizer', label: 'Fertilizer Application', icon: <Calendar className="w-4 h-4" /> },
    { value: 'irrigation', label: 'Irrigation', icon: <Droplet className="w-4 h-4" /> },
    { value: 'harvest', label: 'Harvest Records', icon: <Scissors className="w-4 h-4" /> },
    { value: 'pest', label: 'Pest Outbreaks', icon: <Bug className="w-4 h-4" /> },
    { value: 'yield', label: 'Yield Estimates', icon: <Calendar className="w-4 h-4" /> }
  ];

  const handleSaveRecord = () => {
    const newRecord: CropRecord = {
      ...formData,
      id: records.length + 1,
    } as CropRecord;
    setRecords([newRecord, ...records]);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      recordType: 'planting',
      cropName: '',
      fieldLocation: '',
      recordedBy: ''
    });
    setShowAddForm(false);
  };

  const filteredRecords = records.filter(r => filterType === 'all' || r.recordType === filterType);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold mb-2">Crop Records & Field Monitoring</h1>
          <p className="text-gray-600">Complete crop lifecycle tracking and documentation</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Record
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 mb-1">Active Crops</p>
          <p className="font-semibold">
            {[...new Set(records.filter(r => r.recordType === 'planting').map(r => r.cropName))].length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 mb-1">Recent Harvests</p>
          <p className="font-semibold">
            {records.filter(r => r.recordType === 'harvest' && r.date.startsWith('2026-05')).length} this month
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 mb-1">Pest Outbreaks</p>
          <p className="font-semibold text-orange-600">
            {records.filter(r => r.recordType === 'pest').length} recorded
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 mb-1">Total Harvested</p>
          <p className="font-semibold">
            {records.filter(r => r.recordType === 'harvest').reduce((sum, r) => {
              const qty = parseFloat(r.quantityHarvested || '0');
              return sum + qty;
            }, 0)}kg
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <label className="block text-gray-700 mb-2">Filter by Record Type</label>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as CropRecordType | 'all')}
          className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="all">All Records</option>
          {recordTypes.map(rt => (
            <option key={rt.value} value={rt.value}>{rt.label}</option>
          ))}
        </select>
      </div>

      {/* Add Record Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg border-2 border-green-500 p-6">
          <h2 className="font-semibold mb-4">Add Crop Record</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Date *</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Record Type *</label>
              <select
                value={formData.recordType}
                onChange={(e) => setFormData({ ...formData, recordType: e.target.value as CropRecordType })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {recordTypes.map(rt => (
                  <option key={rt.value} value={rt.value}>{rt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Crop Name *</label>
              <input
                type="text"
                placeholder="e.g., Coffee, Maize, Matoke"
                value={formData.cropName}
                onChange={(e) => setFormData({ ...formData, cropName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Field Location *</label>
              <input
                type="text"
                placeholder="e.g., Main Field, Coffee Garden"
                value={formData.fieldLocation}
                onChange={(e) => setFormData({ ...formData, fieldLocation: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Dynamic Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {formData.recordType === 'planting' && (
              <>
                <div>
                  <label className="block text-gray-700 mb-2">Seed/Seedling Type</label>
                  <input
                    type="text"
                    placeholder="e.g., Hybrid variety, Local"
                    value={formData.seedType || ''}
                    onChange={(e) => setFormData({ ...formData, seedType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Quantity Planted</label>
                  <input
                    type="text"
                    placeholder="e.g., 10kg, 500 seedlings"
                    value={formData.quantityPlanted || ''}
                    onChange={(e) => setFormData({ ...formData, quantityPlanted: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Area Planted</label>
                  <input
                    type="text"
                    placeholder="e.g., 2 acres"
                    value={formData.areaplanted || ''}
                    onChange={(e) => setFormData({ ...formData, areaplanted: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Expected Harvest Date</label>
                  <input
                    type="date"
                    value={formData.expectedHarvestDate || ''}
                    onChange={(e) => setFormData({ ...formData, expectedHarvestDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </>
            )}

            {formData.recordType === 'spraying' && (
              <>
                <div>
                  <label className="block text-gray-700 mb-2">Pesticide/Herbicide</label>
                  <input
                    type="text"
                    placeholder="e.g., Ridomil, Roundup"
                    value={formData.pesticide || ''}
                    onChange={(e) => setFormData({ ...formData, pesticide: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Quantity/Dilution</label>
                  <input
                    type="text"
                    placeholder="e.g., 2L in 100L water"
                    value={formData.sprayQuantity || ''}
                    onChange={(e) => setFormData({ ...formData, sprayQuantity: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Target Pest/Disease</label>
                  <input
                    type="text"
                    placeholder="e.g., Coffee berry disease"
                    value={formData.targetPest || ''}
                    onChange={(e) => setFormData({ ...formData, targetPest: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Weather Conditions</label>
                  <input
                    type="text"
                    placeholder="e.g., Clear, no wind"
                    value={formData.weatherConditions || ''}
                    onChange={(e) => setFormData({ ...formData, weatherConditions: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </>
            )}

            {formData.recordType === 'fertilizer' && (
              <>
                <div>
                  <label className="block text-gray-700 mb-2">Fertilizer Type</label>
                  <input
                    type="text"
                    placeholder="e.g., Urea, DAP, NPK"
                    value={formData.fertilizerType || ''}
                    onChange={(e) => setFormData({ ...formData, fertilizerType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Quantity</label>
                  <input
                    type="text"
                    placeholder="e.g., 100kg, 2 bags"
                    value={formData.fertilizerQuantity || ''}
                    onChange={(e) => setFormData({ ...formData, fertilizerQuantity: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Application Method</label>
                  <input
                    type="text"
                    placeholder="e.g., Broadcasting, Band placement"
                    value={formData.applicationMethod || ''}
                    onChange={(e) => setFormData({ ...formData, applicationMethod: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">NPK Ratio</label>
                  <input
                    type="text"
                    placeholder="e.g., 46-0-0, 17-17-17"
                    value={formData.npkRatio || ''}
                    onChange={(e) => setFormData({ ...formData, npkRatio: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </>
            )}

            {formData.recordType === 'irrigation' && (
              <>
                <div>
                  <label className="block text-gray-700 mb-2">Irrigation Method</label>
                  <select
                    value={formData.irrigationMethod || 'drip'}
                    onChange={(e) => setFormData({ ...formData, irrigationMethod: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="drip">Drip Irrigation</option>
                    <option value="sprinkler">Sprinkler</option>
                    <option value="flood">Flood/Furrow</option>
                    <option value="manual">Manual (watering can)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Water Volume</label>
                  <input
                    type="text"
                    placeholder="e.g., 2000 liters"
                    value={formData.waterVolume || ''}
                    onChange={(e) => setFormData({ ...formData, waterVolume: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g., 1.5 hours"
                    value={formData.duration || ''}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Soil Moisture Status</label>
                  <input
                    type="text"
                    placeholder="e.g., Was dry, now adequate"
                    value={formData.soilMoisture || ''}
                    onChange={(e) => setFormData({ ...formData, soilMoisture: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </>
            )}

            {formData.recordType === 'harvest' && (
              <>
                <div>
                  <label className="block text-gray-700 mb-2">Quantity Harvested</label>
                  <input
                    type="text"
                    placeholder="e.g., 300kg"
                    value={formData.quantityHarvested || ''}
                    onChange={(e) => setFormData({ ...formData, quantityHarvested: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Quality</label>
                  <select
                    value={formData.quality || 'good'}
                    onChange={(e) => setFormData({ ...formData, quality: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Market Price (UGX/kg)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={formData.marketPrice || ''}
                    onChange={(e) => setFormData({ ...formData, marketPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </>
            )}

            {formData.recordType === 'pest' && (
              <>
                <div>
                  <label className="block text-gray-700 mb-2">Pest/Disease Type</label>
                  <input
                    type="text"
                    placeholder="e.g., Banana weevil, Fall armyworm"
                    value={formData.pestType || ''}
                    onChange={(e) => setFormData({ ...formData, pestType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Infestation Level</label>
                  <select
                    value={formData.infestationLevel || 'low'}
                    onChange={(e) => setFormData({ ...formData, infestationLevel: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Affected Area</label>
                  <input
                    type="text"
                    placeholder="e.g., 3 plants, 0.5 acres"
                    value={formData.affectedArea || ''}
                    onChange={(e) => setFormData({ ...formData, affectedArea: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Action Taken</label>
                  <input
                    type="text"
                    placeholder="e.g., Applied pesticide, removed plants"
                    value={formData.actionTaken || ''}
                    onChange={(e) => setFormData({ ...formData, actionTaken: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </>
            )}

            {formData.recordType === 'yield' && (
              <>
                <div>
                  <label className="block text-gray-700 mb-2">Estimated Yield</label>
                  <input
                    type="text"
                    placeholder="e.g., 1200kg, 3 tons"
                    value={formData.estimatedYield || ''}
                    onChange={(e) => setFormData({ ...formData, estimatedYield: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Growth Stage</label>
                  <input
                    type="text"
                    placeholder="e.g., Flowering, Fruiting"
                    value={formData.growthStage || ''}
                    onChange={(e) => setFormData({ ...formData, growthStage: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Health Rating (0-100)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="85"
                    value={formData.healthRating || ''}
                    onChange={(e) => setFormData({ ...formData, healthRating: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Recorded By *</label>
              <input
                type="text"
                placeholder="Staff name"
                value={formData.recordedBy}
                onChange={(e) => setFormData({ ...formData, recordedBy: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Cost (UGX)</label>
              <input
                type="number"
                placeholder="0"
                value={formData.cost || ''}
                onChange={(e) => setFormData({ ...formData, cost: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Notes</label>
            <textarea
              placeholder="Additional notes and observations..."
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSaveRecord}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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
        <h2 className="font-semibold mb-4">Records ({filteredRecords.length})</h2>
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
                  <div>
                    <p className="font-semibold">{record.cropName} - {recordTypes.find(rt => rt.value === record.recordType)?.label}</p>
                    <p className="text-gray-600">{record.fieldLocation} • {record.date}</p>
                  </div>
                  {record.cost && record.cost > 0 && (
                    <p className="text-orange-600 font-semibold">UGX {record.cost.toLocaleString()}</p>
                  )}
                </div>
                {record.notes && (
                  <p className="text-gray-600 text-sm line-clamp-1">{record.notes}</p>
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
                <p className="text-gray-600">{selectedRecord.date}</p>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="font-semibold">{selectedRecord.cropName}</p>
                <p className="text-gray-600">{selectedRecord.fieldLocation}</p>
                <p className="text-sm text-gray-500 mt-1">{recordTypes.find(rt => rt.value === selectedRecord.recordType)?.label}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {Object.entries(selectedRecord).map(([key, value]) => {
                  if (['id', 'recordType', 'cropName', 'fieldLocation', 'date', 'notes', 'recordedBy', 'cost'].includes(key) || !value) return null;
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

              <div className="border-t pt-4 flex items-center justify-between">
                <p className="text-gray-600">Recorded by: <span className="font-semibold">{selectedRecord.recordedBy}</span></p>
                {selectedRecord.cost && selectedRecord.cost > 0 && (
                  <p className="text-orange-600 font-semibold">Cost: UGX {selectedRecord.cost.toLocaleString()}</p>
                )}
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
