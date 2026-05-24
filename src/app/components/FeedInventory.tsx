import { useState } from 'react';
import { Package, TrendingDown, AlertTriangle, Plus, Minus, ArrowUpCircle, ArrowDownCircle, ShoppingCart } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface FeedInventoryItem {
  id: number;
  feedType: string;
  animalType: string;
  currentStock: number;
  unit: string;
  reorderLevel: number;
  maxCapacity: number;
  costPerUnit: number;
  supplier: string;
  lastRestocked: string;
  expiryDate?: string;
  location: string;
  dailyConsumption: number;
}

interface FeedTransaction {
  id: number;
  date: string;
  time: string;
  feedType: string;
  type: 'usage' | 'restock';
  quantity: number;
  unit: string;
  usedBy?: string;
  animalSection?: string;
  cost?: number;
  notes?: string;
}

export function FeedInventory() {
  const [inventory, setInventory] = useLocalStorage<FeedInventoryItem[]>('feed-inventory', [
    {
      id: 1,
      feedType: 'Layers Mash',
      animalType: 'Chickens',
      currentStock: 150,
      unit: 'kg',
      reorderLevel: 100,
      maxCapacity: 500,
      costPerUnit: 1400,
      supplier: 'Uganda Feeds Ltd',
      lastRestocked: '2026-05-10',
      expiryDate: '2026-08-10',
      location: 'Store Room A',
      dailyConsumption: 25
    },
    {
      id: 2,
      feedType: 'Broiler Starter',
      animalType: 'Chickens',
      currentStock: 45,
      unit: 'kg',
      reorderLevel: 50,
      maxCapacity: 300,
      costPerUnit: 1600,
      supplier: 'Uganda Feeds Ltd',
      lastRestocked: '2026-05-01',
      expiryDate: '2026-08-01',
      location: 'Store Room A',
      dailyConsumption: 15
    },
    {
      id: 3,
      feedType: 'Pig Concentrate',
      animalType: 'Pigs',
      currentStock: 200,
      unit: 'kg',
      reorderLevel: 150,
      maxCapacity: 600,
      costPerUnit: 1300,
      supplier: 'Nuvita Feeds',
      lastRestocked: '2026-05-15',
      expiryDate: '2026-09-15',
      location: 'Store Room B',
      dailyConsumption: 50
    },
    {
      id: 4,
      feedType: 'Dairy Meal',
      animalType: 'Cows',
      currentStock: 80,
      unit: 'kg',
      reorderLevel: 100,
      maxCapacity: 400,
      costPerUnit: 1200,
      supplier: 'Nuvita Feeds',
      lastRestocked: '2026-05-12',
      location: 'Store Room B',
      dailyConsumption: 30
    },
    {
      id: 5,
      feedType: 'Goat Pellets',
      animalType: 'Goats',
      currentStock: 120,
      unit: 'kg',
      reorderLevel: 80,
      maxCapacity: 300,
      costPerUnit: 1100,
      supplier: 'East Africa Feeds',
      lastRestocked: '2026-05-14',
      location: 'Store Room C',
      dailyConsumption: 20
    },
    {
      id: 6,
      feedType: 'Rabbit Pellets',
      animalType: 'Rabbits',
      currentStock: 25,
      unit: 'kg',
      reorderLevel: 30,
      maxCapacity: 100,
      costPerUnit: 1500,
      supplier: 'East Africa Feeds',
      lastRestocked: '2026-05-08',
      expiryDate: '2026-08-08',
      location: 'Store Room C',
      dailyConsumption: 8
    }
  ]);

  const [transactions, setTransactions] = useLocalStorage<FeedTransaction[]>('feed-transactions', [
    {
      id: 1,
      date: '2026-05-17',
      time: '06:00',
      feedType: 'Layers Mash',
      type: 'usage',
      quantity: 25,
      unit: 'kg',
      usedBy: 'Sarah Nakato',
      animalSection: 'Layer Section 1',
      notes: 'Morning feeding'
    },
    {
      id: 2,
      date: '2026-05-17',
      time: '06:30',
      feedType: 'Pig Concentrate',
      type: 'usage',
      quantity: 50,
      unit: 'kg',
      usedBy: 'Moses Okello',
      animalSection: 'Pig Pen A',
      notes: 'Daily feeding'
    },
    {
      id: 3,
      date: '2026-05-15',
      time: '14:00',
      feedType: 'Pig Concentrate',
      type: 'restock',
      quantity: 300,
      unit: 'kg',
      cost: 390000,
      notes: 'Bulk purchase - 6 bags @ 65,000 UGX each'
    }
  ]);

  const [showAddStock, setShowAddStock] = useState(false);
  const [showRecordUsage, setShowRecordUsage] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState<FeedInventoryItem | null>(null);

  const [usageForm, setUsageForm] = useState({
    quantity: 0,
    usedBy: '',
    animalSection: '',
    notes: ''
  });

  const [restockForm, setRestockForm] = useState({
    quantity: 0,
    cost: 0,
    supplier: '',
    expiryDate: '',
    notes: ''
  });

  const getDaysRemaining = (stock: number, dailyConsumption: number) => {
    if (dailyConsumption === 0) return Infinity;
    return Math.floor(stock / dailyConsumption);
  };

  const getStockStatus = (item: FeedInventoryItem) => {
    const percentage = (item.currentStock / item.maxCapacity) * 100;
    const daysRemaining = getDaysRemaining(item.currentStock, item.dailyConsumption);

    if (item.currentStock <= item.reorderLevel || daysRemaining <= 3) {
      return { status: 'critical', color: 'red', message: 'Critical - Order Now' };
    } else if (percentage <= 30 || daysRemaining <= 7) {
      return { status: 'low', color: 'orange', message: 'Low Stock' };
    } else if (percentage <= 50) {
      return { status: 'medium', color: 'yellow', message: 'Medium Stock' };
    } else {
      return { status: 'good', color: 'green', message: 'Good Stock' };
    }
  };

  const handleRecordUsage = () => {
    if (!selectedFeed) return;

    const newTransaction: FeedTransaction = {
      id: transactions.length + 1,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      feedType: selectedFeed.feedType,
      type: 'usage',
      quantity: usageForm.quantity,
      unit: selectedFeed.unit,
      usedBy: usageForm.usedBy,
      animalSection: usageForm.animalSection,
      notes: usageForm.notes
    };

    setTransactions([newTransaction, ...transactions]);
    setInventory(inventory.map(item =>
      item.id === selectedFeed.id
        ? { ...item, currentStock: item.currentStock - usageForm.quantity }
        : item
    ));

    setShowRecordUsage(false);
    setSelectedFeed(null);
    setUsageForm({ quantity: 0, usedBy: '', animalSection: '', notes: '' });
  };

  const handleRestock = () => {
    if (!selectedFeed) return;

    const newTransaction: FeedTransaction = {
      id: transactions.length + 1,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      feedType: selectedFeed.feedType,
      type: 'restock',
      quantity: restockForm.quantity,
      unit: selectedFeed.unit,
      cost: restockForm.cost,
      notes: restockForm.notes
    };

    setTransactions([newTransaction, ...transactions]);
    setInventory(inventory.map(item =>
      item.id === selectedFeed.id
        ? {
            ...item,
            currentStock: item.currentStock + restockForm.quantity,
            lastRestocked: new Date().toISOString().split('T')[0],
            supplier: restockForm.supplier || item.supplier,
            expiryDate: restockForm.expiryDate || item.expiryDate
          }
        : item
    ));

    setShowAddStock(false);
    setSelectedFeed(null);
    setRestockForm({ quantity: 0, cost: 0, supplier: '', expiryDate: '', notes: '' });
  };

  const lowStockItems = inventory.filter(item => getStockStatus(item).status === 'low' || getStockStatus(item).status === 'critical');
  const totalInventoryValue = inventory.reduce((sum, item) => sum + (item.currentStock * item.costPerUnit), 0);
  const criticalItems = inventory.filter(item => getStockStatus(item).status === 'critical');

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold mb-2">Feed Inventory Management</h1>
          <p className="text-gray-600">Track feed stock levels and consumption</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600">Total Items</p>
              <p className="font-semibold">{inventory.length} Feed Types</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-gray-600">Critical Stock</p>
              <p className="font-semibold text-red-600">{criticalItems.length} Items</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingDown className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-gray-600">Low Stock</p>
              <p className="font-semibold text-orange-600">{lowStockItems.length} Items</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600">Total Value</p>
              <p className="font-semibold">{totalInventoryValue.toLocaleString()} UGX</p>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Alerts */}
      {criticalItems.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Critical Stock Levels - Immediate Action Required</h3>
              <p className="text-red-700">
                {criticalItems.map(item => item.feedType).join(', ')} need to be restocked immediately.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Record Usage Modal */}
      {showRecordUsage && selectedFeed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="font-semibold mb-4">Record Feed Usage - {selectedFeed.feedType}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Quantity Used ({selectedFeed.unit})</label>
                <input
                  type="number"
                  placeholder="Enter quantity"
                  value={usageForm.quantity || ''}
                  onChange={(e) => setUsageForm({ ...usageForm, quantity: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-gray-500 mt-1">Available: {selectedFeed.currentStock} {selectedFeed.unit}</p>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Used By</label>
                <input
                  type="text"
                  placeholder="Staff name"
                  value={usageForm.usedBy}
                  onChange={(e) => setUsageForm({ ...usageForm, usedBy: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Animal Section</label>
                <input
                  type="text"
                  placeholder="e.g., Layer Section 1"
                  value={usageForm.animalSection}
                  onChange={(e) => setUsageForm({ ...usageForm, animalSection: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Notes</label>
                <textarea
                  placeholder="Additional notes"
                  value={usageForm.notes}
                  onChange={(e) => setUsageForm({ ...usageForm, notes: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleRecordUsage}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Record Usage
              </button>
              <button
                onClick={() => {
                  setShowRecordUsage(false);
                  setSelectedFeed(null);
                  setUsageForm({ quantity: 0, usedBy: '', animalSection: '', notes: '' });
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Restock Modal */}
      {showAddStock && selectedFeed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="font-semibold mb-4">Restock - {selectedFeed.feedType}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Quantity ({selectedFeed.unit})</label>
                <input
                  type="number"
                  placeholder="Enter quantity"
                  value={restockForm.quantity || ''}
                  onChange={(e) => setRestockForm({ ...restockForm, quantity: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Total Cost (UGX)</label>
                <input
                  type="number"
                  placeholder="Enter total cost"
                  value={restockForm.cost || ''}
                  onChange={(e) => setRestockForm({ ...restockForm, cost: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Supplier</label>
                <input
                  type="text"
                  placeholder="Supplier name"
                  value={restockForm.supplier}
                  onChange={(e) => setRestockForm({ ...restockForm, supplier: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Expiry Date (Optional)</label>
                <input
                  type="date"
                  value={restockForm.expiryDate}
                  onChange={(e) => setRestockForm({ ...restockForm, expiryDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Notes</label>
                <textarea
                  placeholder="Additional notes"
                  value={restockForm.notes}
                  onChange={(e) => setRestockForm({ ...restockForm, notes: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleRestock}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Stock
              </button>
              <button
                onClick={() => {
                  setShowAddStock(false);
                  setSelectedFeed(null);
                  setRestockForm({ quantity: 0, cost: 0, supplier: '', expiryDate: '', notes: '' });
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inventory List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold">Current Inventory</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {inventory.map((item) => {
            const status = getStockStatus(item);
            const daysRemaining = getDaysRemaining(item.currentStock, item.dailyConsumption);
            const stockPercentage = (item.currentStock / item.maxCapacity) * 100;

            return (
              <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{item.feedType}</h3>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-sm">
                        {item.animalType}
                      </span>
                      <span className={`px-2 py-0.5 bg-${status.color}-100 text-${status.color}-700 rounded text-sm font-semibold`}>
                        {status.message}
                      </span>
                    </div>
                    <p className="text-gray-600">
                      {item.currentStock} {item.unit} available • {daysRemaining} days remaining at current usage
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedFeed(item);
                        setShowRecordUsage(true);
                      }}
                      className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                    >
                      <Minus className="w-4 h-4" />
                      Use
                    </button>
                    <button
                      onClick={() => {
                        setSelectedFeed(item);
                        setShowAddStock(true);
                      }}
                      className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      Restock
                    </button>
                  </div>
                </div>

                {/* Stock Level Bar */}
                <div className="mb-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`bg-${status.color}-600 h-2 rounded-full transition-all`}
                      style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-gray-500">0</span>
                    <span className="text-gray-500">Reorder: {item.reorderLevel} {item.unit}</span>
                    <span className="text-gray-500">Max: {item.maxCapacity} {item.unit}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <p className="text-gray-600">Daily Usage</p>
                    <p className="font-semibold">{item.dailyConsumption} {item.unit}/day</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Cost/Unit</p>
                    <p className="font-semibold">{item.costPerUnit.toLocaleString()} UGX</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Supplier</p>
                    <p className="font-semibold">{item.supplier}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Location</p>
                    <p className="font-semibold">{item.location}</p>
                  </div>
                </div>

                {item.expiryDate && (
                  <div className="mt-2 text-gray-600">
                    Expires: {new Date(item.expiryDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold">Recent Transactions</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentTransactions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No transactions recorded</p>
          ) : (
            recentTransactions.map((transaction) => (
              <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 ${transaction.type === 'restock' ? 'bg-green-100' : 'bg-blue-100'} rounded-lg`}>
                      {transaction.type === 'restock' ? (
                        <ArrowUpCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <ArrowDownCircle className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{transaction.feedType}</h3>
                        <span className={`px-2 py-0.5 rounded text-sm ${
                          transaction.type === 'restock'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {transaction.type === 'restock' ? 'Restocked' : 'Used'}
                        </span>
                      </div>
                      <p className="text-gray-600">
                        {transaction.quantity} {transaction.unit} • {new Date(transaction.date).toLocaleDateString()} at {transaction.time}
                      </p>
                      {transaction.usedBy && (
                        <p className="text-gray-600">Used by: {transaction.usedBy} ({transaction.animalSection})</p>
                      )}
                      {transaction.cost && (
                        <p className="text-gray-600">Cost: {transaction.cost.toLocaleString()} UGX</p>
                      )}
                      {transaction.notes && (
                        <p className="text-gray-500 mt-1">{transaction.notes}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
