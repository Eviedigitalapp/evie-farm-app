import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Package, Plus, Edit, Trash2, X, Download, FileText, Calendar, Filter, BarChart3 } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Transaction {
  id: number;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: string;
  description: string;
  paymentMethod?: string;
  referenceNumber?: string;
  relatedTo?: string;
}

export function FinanceTracker() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [editMode, setEditMode] = useState(false);

  // Filter states
  const [filterPeriod, setFilterPeriod] = useState<'all' | 'today' | 'week' | 'month' | 'custom'>('month');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [formData, setFormData] = useState<Partial<Transaction>>({
    type: 'expense',
    category: '',
    amount: 0,
    date: '',
    description: '',
    paymentMethod: 'Cash',
    referenceNumber: '',
    relatedTo: ''
  });

  const incomeCategories = [
    'Coffee Sales',
    'Matoke Sales',
    'Crop Sales',
    'Livestock Sales',
    'Eggs',
    'Milk Sales',
    'Meat Sales',
    'Cassava Sales',
    'Sweet Potatoes',
    'Beans Sales',
    'Vegetables',
    'Other Income'
  ];

  const expenseCategories = [
    'Seeds',
    'Fertilizer',
    'Pesticides/Herbicides',
    'Feed',
    'Veterinary',
    'Labor',
    'Transport',
    'Equipment',
    'Maintenance',
    'Fuel',
    'Water/Irrigation',
    'Utilities',
    'Rent/Lease',
    'Other Expenses'
  ];

  const paymentMethods = [
    'Cash',
    'Mobile Money',
    'Bank Transfer',
    'Cheque',
    'Credit'
  ];

  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('finance-transactions', [
    { id: 1, type: 'income', category: 'Coffee Sales', amount: 450000, date: '2026-05-12', description: 'Coffee cherries to NUCAFE - 180kg', paymentMethod: 'Mobile Money', referenceNumber: 'MM-2026-0512', relatedTo: 'Coffee Garden' },
    { id: 2, type: 'income', category: 'Livestock Sales', amount: 280000, date: '2026-05-10', description: 'Sold 4 pigs at market', paymentMethod: 'Cash', relatedTo: 'Pigs' },
    { id: 3, type: 'income', category: 'Matoke Sales', amount: 85000, date: '2026-05-09', description: 'Matoke bunches to wholesaler', paymentMethod: 'Mobile Money', referenceNumber: 'MM-2026-0509', relatedTo: 'Banana Plantation' },
    { id: 4, type: 'income', category: 'Eggs', amount: 42000, date: '2026-05-08', description: 'Weekly egg sales - 350 trays', paymentMethod: 'Cash', relatedTo: 'Chickens' },
    { id: 5, type: 'expense', category: 'Seeds', amount: 65000, date: '2026-05-07', description: 'Hybrid maize seeds - Longe 5', paymentMethod: 'Cash', relatedTo: 'Main Field' },
    { id: 6, type: 'expense', category: 'Veterinary', amount: 45000, date: '2026-05-05', description: 'Pig vaccination - ASF vaccine', paymentMethod: 'Mobile Money', referenceNumber: 'MM-2026-0505', relatedTo: 'Pigs' },
    { id: 7, type: 'expense', category: 'Feed', amount: 120000, date: '2026-05-03', description: 'Pig concentrate - 10 bags', paymentMethod: 'Cash', relatedTo: 'Pigs' },
    { id: 8, type: 'expense', category: 'Fertilizer', amount: 180000, date: '2026-04-28', description: 'Urea fertilizer - 4 bags', paymentMethod: 'Credit', relatedTo: 'Main Field' },
    { id: 9, type: 'income', category: 'Cassava Sales', amount: 95000, date: '2026-04-25', description: 'Fresh cassava to local processor', paymentMethod: 'Bank Transfer', referenceNumber: 'BT-2026-0425', relatedTo: 'Lower Garden' },
    { id: 10, type: 'expense', category: 'Labor', amount: 80000, date: '2026-04-22', description: 'Casual workers - coffee picking', paymentMethod: 'Cash', relatedTo: 'Coffee Garden' },
    { id: 11, type: 'expense', category: 'Transport', amount: 25000, date: '2026-04-20', description: 'Boda boda to market - produce', paymentMethod: 'Cash', relatedTo: 'General' },
    { id: 12, type: 'income', category: 'Sweet Potatoes', amount: 55000, date: '2026-04-18', description: 'Orange sweet potatoes', paymentMethod: 'Cash', relatedTo: 'Valley Plot' },
  ]);

  const handleSaveTransaction = () => {
    if (editMode && selectedTransaction) {
      setTransactions(transactions.map(t =>
        t.id === selectedTransaction.id ? { ...formData, id: selectedTransaction.id } as Transaction : t
      ));
    } else {
      const newTransaction: Transaction = {
        ...formData,
        id: transactions.length + 1,
      } as Transaction;
      setTransactions([...transactions, newTransaction]);
    }
    resetForm();
  };

  const handleDeleteTransaction = (id: number) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      setTransactions(transactions.filter(t => t.id !== id));
      setShowDetailsModal(false);
    }
  };

  const resetForm = () => {
    setFormData({
      type: 'expense',
      category: '',
      amount: 0,
      date: '',
      description: '',
      paymentMethod: 'Cash',
      referenceNumber: '',
      relatedTo: ''
    });
    setShowAddForm(false);
    setEditMode(false);
    setSelectedTransaction(null);
  };

  // Filtering logic
  const getFilteredTransactions = () => {
    let filtered = [...transactions];

    // Filter by period
    const today = new Date();
    if (filterPeriod === 'today') {
      const todayStr = today.toISOString().split('T')[0];
      filtered = filtered.filter(t => t.date === todayStr);
    } else if (filterPeriod === 'week') {
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(t => new Date(t.date) >= weekAgo);
    } else if (filterPeriod === 'month') {
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(t => new Date(t.date) >= monthAgo);
    } else if (filterPeriod === 'custom' && startDate && endDate) {
      filtered = filtered.filter(t => t.date >= startDate && t.date <= endDate);
    }

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(t => t.type === filterType);
    }

    // Filter by category
    if (filterCategory !== 'all') {
      filtered = filtered.filter(t => t.category === filterCategory);
    }

    return filtered;
  };

  const filteredTransactions = getFilteredTransactions();

  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalIncome - totalExpense;

  // Get all unique categories
  const allCategories = [...new Set(transactions.map(t => t.category))].sort();

  const expensesByCategory = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const incomeByCategory = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  // Generate report
  const generateReport = () => {
    const reportData = {
      period: filterPeriod === 'custom' ? `${startDate} to ${endDate}` : filterPeriod,
      totalIncome,
      totalExpense,
      netProfit,
      incomeByCategory,
      expensesByCategory,
      transactionCount: filteredTransactions.length,
      generatedOn: new Date().toLocaleString()
    };

    const reportText = `
EVIE DIGITAL AGRIBUSINESS - FINANCIAL REPORT
=============================================
Generated: ${reportData.generatedOn}
Period: ${reportData.period}

SUMMARY
-------
Total Income:    UGX ${totalIncome.toLocaleString()}
Total Expenses:  UGX ${totalExpense.toLocaleString()}
Net Profit:      UGX ${netProfit.toLocaleString()}
Transactions:    ${reportData.transactionCount}

INCOME BY CATEGORY
------------------
${Object.entries(incomeByCategory).map(([cat, amt]) =>
  `${cat.padEnd(25)} UGX ${amt.toLocaleString()}`
).join('\n')}

EXPENSE BY CATEGORY
-------------------
${Object.entries(expensesByCategory).map(([cat, amt]) =>
  `${cat.padEnd(25)} UGX ${amt.toLocaleString()}`
).join('\n')}

DETAILED TRANSACTIONS
--------------------
${filteredTransactions.slice().reverse().map(t =>
  `${t.date} | ${t.type.toUpperCase().padEnd(7)} | ${t.category.padEnd(20)} | UGX ${t.amount.toLocaleString().padStart(12)} | ${t.description}`
).join('\n')}
    `;

    return reportText;
  };

  const downloadReport = () => {
    const report = generateReport();
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `finance-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    const headers = ['Date', 'Type', 'Category', 'Amount', 'Description', 'Payment Method', 'Reference', 'Related To'];
    const rows = filteredTransactions.map(t => [
      t.date,
      t.type,
      t.category,
      t.amount,
      t.description,
      t.paymentMethod || '',
      t.referenceNumber || '',
      t.relatedTo || ''
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold mb-2">Finance Tracker</h1>
          <p className="text-gray-600">Monitor your farm's financial performance</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilterPanel(!showFilterPanel)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button
            onClick={() => setShowReportsModal(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <BarChart3 className="w-4 h-4" />
            Reports
          </button>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-6 py-3 min-h-[48px] bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Transaction
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilterPanel && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Filter Transactions</h2>
            <button
              onClick={() => {
                setFilterPeriod('month');
                setFilterType('all');
                setFilterCategory('all');
                setStartDate('');
                setEndDate('');
              }}
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              Reset Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Time Period</label>
              <select
                value={filterPeriod}
                onChange={(e) => setFilterPeriod(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Transaction Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Types</option>
                <option value="income">Income Only</option>
                <option value="expense">Expenses Only</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Categories</option>
                {allCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {filterPeriod === 'custom' && (
              <>
                <div>
                  <label className="block text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </>
            )}
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900">
              Showing <span className="font-semibold">{filteredTransactions.length}</span> transaction(s)
              {filterPeriod !== 'all' && ` for ${filterPeriod === 'custom' ? 'custom period' : filterPeriod}`}
              {filterType !== 'all' && ` (${filterType} only)`}
              {filterCategory !== 'all' && ` in category: ${filterCategory}`}
            </p>
          </div>
        </div>
      )}

      {/* Add/Edit Transaction Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg border-2 border-emerald-500 p-6">
          <h2 className="font-semibold mb-4">{editMode ? 'Edit' : 'Add New'} Transaction</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Type *</label>
              <select
                value={formData.type}
                onChange={(e) => {
                  setFormData({ ...formData, type: e.target.value as 'income' | 'expense', category: '' });
                }}
                className="w-full px-4 py-3 min-h-[48px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="income">Income (Money In)</option>
                <option value="expense">Expense (Money Out)</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 min-h-[48px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Select category</option>
                {(formData.type === 'income' ? incomeCategories : expenseCategories).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Amount (UGX) *</label>
              <input
                type="number"
                placeholder="0"
                value={formData.amount || ''}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                className="w-full px-4 py-3 min-h-[48px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Date *</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 min-h-[48px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSaveTransaction}
              className="px-6 py-3 min-h-[48px] bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              {editMode ? 'Update' : 'Save'} Transaction
            </button>
            <button
              onClick={resetForm}
              className="px-6 py-3 min-h-[48px] border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Transaction Details Modal */}
      {showDetailsModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-semibold mb-1">Transaction Details</h2>
                <p className="text-gray-600">{new Date(selectedTransaction.date).toLocaleDateString()}</p>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className={`p-4 rounded-lg border-2 ${
                selectedTransaction.type === 'income'
                  ? 'bg-green-50 border-green-300'
                  : 'bg-red-50 border-red-300'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {selectedTransaction.type === 'income' ? (
                      <TrendingUp className="w-8 h-8 text-green-600" />
                    ) : (
                      <TrendingDown className="w-8 h-8 text-red-600" />
                    )}
                    <div>
                      <p className="text-sm text-gray-600">{selectedTransaction.type.toUpperCase()}</p>
                      <p className="font-semibold">{selectedTransaction.category}</p>
                    </div>
                  </div>
                  <p className={`font-semibold ${
                    selectedTransaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {selectedTransaction.type === 'income' ? '+' : '-'}UGX {selectedTransaction.amount.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 mb-1">Payment Method</p>
                  <p className="font-semibold">{selectedTransaction.paymentMethod || 'N/A'}</p>
                </div>
                {selectedTransaction.referenceNumber && (
                  <div>
                    <p className="text-gray-600 mb-1">Reference Number</p>
                    <p className="font-semibold">{selectedTransaction.referenceNumber}</p>
                  </div>
                )}
                {selectedTransaction.relatedTo && (
                  <div className="col-span-2">
                    <p className="text-gray-600 mb-1">Related To</p>
                    <p className="font-semibold">{selectedTransaction.relatedTo}</p>
                  </div>
                )}
              </div>

              <div className="border-t pt-4">
                <p className="text-gray-700 font-semibold mb-2">Description</p>
                <p className="text-gray-900">{selectedTransaction.description}</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t">
              <button
                onClick={() => {
                  setFormData(selectedTransaction);
                  setEditMode(true);
                  setShowAddForm(true);
                  setShowDetailsModal(false);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDeleteTransaction(selectedTransaction.id)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="flex-1 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="font-semibold">Total Income</h2>
          </div>
          <p className="font-semibold text-green-600">UGX {totalIncome.toLocaleString()}</p>
          <p className="text-gray-600 mt-1">This month</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="font-semibold">Total Expenses</h2>
          </div>
          <p className="font-semibold text-red-600">UGX {totalExpense.toLocaleString()}</p>
          <p className="text-gray-600 mt-1">This month</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${netProfit >= 0 ? 'bg-emerald-100' : 'bg-orange-100'}`}>
              <DollarSign className={`w-6 h-6 ${netProfit >= 0 ? 'text-emerald-600' : 'text-orange-600'}`} />
            </div>
            <h2 className="font-semibold">Net Profit</h2>
          </div>
          <p className={`font-semibold ${netProfit >= 0 ? 'text-emerald-600' : 'text-orange-600'}`}>
            UGX {Math.abs(netProfit).toLocaleString()}
          </p>
          <p className="text-gray-600 mt-1">{netProfit >= 0 ? 'Profit' : 'Loss'} this month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="font-semibold mb-4">Income Breakdown</h2>
          <div className="space-y-3">
            {Object.entries(incomeByCategory).map(([category, amount]) => (
              <div key={category}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">{category}</span>
                  <span className="font-semibold text-green-600">UGX {amount.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-green-600"
                    style={{ width: `${(amount / totalIncome) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="font-semibold mb-4">Expense Breakdown</h2>
          <div className="space-y-3">
            {Object.entries(expensesByCategory).map(([category, amount]) => (
              <div key={category}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">{category}</span>
                  <span className="font-semibold text-red-600">UGX {amount.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-red-600"
                    style={{ width: `${(amount / totalExpense) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">
            Transactions ({filteredTransactions.length})
          </h2>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
        <div className="space-y-3">
          {filteredTransactions.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No transactions found</p>
          ) : (
            filteredTransactions.slice().reverse().map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => {
                  setSelectedTransaction(transaction);
                  setShowDetailsModal(true);
                }}
              >
                <div className={`p-2 rounded-lg ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                  {transaction.type === 'income' ? (
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  ) : (
                    <ShoppingCart className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold mb-1">{transaction.description}</p>
                      <p className="text-gray-600">{transaction.category}</p>
                      {transaction.paymentMethod && (
                        <p className="text-gray-500 text-sm mt-1">{transaction.paymentMethod}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'income' ? '+' : '-'}UGX {transaction.amount.toLocaleString()}
                      </p>
                      <p className="text-gray-600">{new Date(transaction.date).toLocaleDateString()}</p>
                      {transaction.relatedTo && (
                        <p className="text-gray-500 text-sm mt-1">{transaction.relatedTo}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Reports Modal */}
      {showReportsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-semibold mb-1">Financial Reports & Analysis</h2>
                <p className="text-gray-600">
                  Period: {filterPeriod === 'custom' ? `${startDate} to ${endDate}` : filterPeriod}
                </p>
              </div>
              <button
                onClick={() => setShowReportsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-gray-700 mb-1">Total Income</p>
                <p className="font-semibold text-green-600">UGX {totalIncome.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-gray-700 mb-1">Total Expenses</p>
                <p className="font-semibold text-red-600">UGX {totalExpense.toLocaleString()}</p>
              </div>
              <div className={`p-4 rounded-lg border ${netProfit >= 0 ? 'bg-emerald-50 border-emerald-200' : 'bg-orange-50 border-orange-200'}`}>
                <p className="text-gray-700 mb-1">Net Profit/Loss</p>
                <p className={`font-semibold ${netProfit >= 0 ? 'text-emerald-600' : 'text-orange-600'}`}>
                  UGX {Math.abs(netProfit).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {netProfit >= 0 ? 'Profit' : 'Loss'} • {totalIncome > 0 ? ((netProfit / totalIncome) * 100).toFixed(1) : 0}% margin
                </p>
              </div>
            </div>

            {/* Cash Flow Analysis */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Cash Flow Analysis</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-700 mb-2">Income Transactions</p>
                  <p className="font-semibold">{filteredTransactions.filter(t => t.type === 'income').length}</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-700 mb-2">Expense Transactions</p>
                  <p className="font-semibold">{filteredTransactions.filter(t => t.type === 'expense').length}</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-700 mb-2">Average Income</p>
                  <p className="font-semibold">
                    UGX {filteredTransactions.filter(t => t.type === 'income').length > 0
                      ? Math.round(totalIncome / filteredTransactions.filter(t => t.type === 'income').length).toLocaleString()
                      : 0}
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-700 mb-2">Average Expense</p>
                  <p className="font-semibold">
                    UGX {filteredTransactions.filter(t => t.type === 'expense').length > 0
                      ? Math.round(totalExpense / filteredTransactions.filter(t => t.type === 'expense').length).toLocaleString()
                      : 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Top Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold mb-3">Top Income Sources</h3>
                <div className="space-y-2">
                  {Object.entries(incomeByCategory)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([category, amount]) => (
                      <div key={category} className="flex items-center justify-between p-2 bg-green-50 rounded">
                        <span className="text-gray-700">{category}</span>
                        <span className="font-semibold text-green-600">UGX {amount.toLocaleString()}</span>
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Top Expense Categories</h3>
                <div className="space-y-2">
                  {Object.entries(expensesByCategory)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([category, amount]) => (
                      <div key={category} className="flex items-center justify-between p-2 bg-red-50 rounded">
                        <span className="text-gray-700">{category}</span>
                        <span className="font-semibold text-red-600">UGX {amount.toLocaleString()}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <button
                onClick={downloadReport}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Full Report
              </button>
              <button
                onClick={exportCSV}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FileText className="w-4 h-4" />
                Export to CSV
              </button>
              <button
                onClick={() => setShowReportsModal(false)}
                className="flex-1 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
