import { useState } from 'react';
import { Users, Plus, Phone, Mail, MapPin, Package, DollarSign, Calendar, Edit, Trash2, Eye } from 'lucide-react';

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  location: string;
  type: 'individual' | 'business' | 'retailer' | 'wholesaler';
  productsInterest: string[];
  totalPurchases: number;
  lastPurchase: string;
  status: 'active' | 'inactive';
  notes: string;
}

interface Sale {
  id: number;
  customerId: number;
  customerName: string;
  product: string;
  quantity: number;
  unit: string;
  price: number;
  total: number;
  date: string;
  paymentStatus: 'paid' | 'pending' | 'partial';
}

export function CustomerManagement() {
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [viewMode, setViewMode] = useState<'customers' | 'sales'>('customers');
  const [filterType, setFilterType] = useState<'all' | Customer['type']>('all');

  const customers: Customer[] = [
    {
      id: 1,
      name: 'Sarah Nakato',
      phone: '+256 700 123 456',
      email: 'sarah.nakato@email.com',
      location: 'Kampala',
      type: 'retailer',
      productsInterest: ['Eggs', 'Chicken', 'Vegetables'],
      totalPurchases: 4500000,
      lastPurchase: '2026-05-15',
      status: 'active',
      notes: 'Regular customer, prefers delivery on weekends'
    },
    {
      id: 2,
      name: 'Kampala Fresh Foods Ltd',
      phone: '+256 700 234 567',
      email: 'orders@kampalafresh.com',
      location: 'Kampala',
      type: 'wholesaler',
      productsInterest: ['Eggs', 'Milk', 'Vegetables', 'Maize'],
      totalPurchases: 12000000,
      lastPurchase: '2026-05-16',
      status: 'active',
      notes: 'Large orders, weekly delivery schedule'
    },
    {
      id: 3,
      name: 'John Wasswa',
      phone: '+256 700 345 678',
      email: 'john.wasswa@email.com',
      location: 'Entebbe',
      type: 'individual',
      productsInterest: ['Goats', 'Eggs'],
      totalPurchases: 850000,
      lastPurchase: '2026-05-10',
      status: 'active',
      notes: 'Buys goats for special occasions'
    },
    {
      id: 4,
      name: 'Green Valley Restaurant',
      phone: '+256 700 456 789',
      email: 'procurement@greenvalley.com',
      location: 'Kampala',
      type: 'business',
      productsInterest: ['Chicken', 'Vegetables', 'Eggs'],
      totalPurchases: 6200000,
      lastPurchase: '2026-05-14',
      status: 'active',
      notes: 'Restaurant chain, needs consistent quality'
    },
    {
      id: 5,
      name: 'Mary Nambi',
      phone: '+256 700 567 890',
      email: 'mary.nambi@email.com',
      location: 'Mukono',
      type: 'retailer',
      productsInterest: ['Eggs', 'Milk'],
      totalPurchases: 2100000,
      lastPurchase: '2026-05-12',
      status: 'active',
      notes: 'Owns a small shop, bi-weekly orders'
    },
    {
      id: 6,
      name: 'David Okello',
      phone: '+256 700 678 901',
      email: 'okello.david@email.com',
      location: 'Jinja',
      type: 'individual',
      productsInterest: ['Pigs', 'Chicken'],
      totalPurchases: 1500000,
      lastPurchase: '2026-04-28',
      status: 'inactive',
      notes: 'Hasn\'t ordered in over 2 weeks'
    }
  ];

  const sales: Sale[] = [
    {
      id: 1,
      customerId: 1,
      customerName: 'Sarah Nakato',
      product: 'Eggs (Trays)',
      quantity: 20,
      unit: 'trays',
      price: 14000,
      total: 280000,
      date: '2026-05-15',
      paymentStatus: 'paid'
    },
    {
      id: 2,
      customerId: 2,
      customerName: 'Kampala Fresh Foods Ltd',
      product: 'Fresh Milk',
      quantity: 100,
      unit: 'liters',
      price: 2000,
      total: 200000,
      date: '2026-05-16',
      paymentStatus: 'paid'
    },
    {
      id: 3,
      customerId: 2,
      customerName: 'Kampala Fresh Foods Ltd',
      product: 'Eggs (Trays)',
      quantity: 50,
      unit: 'trays',
      price: 14000,
      total: 700000,
      date: '2026-05-16',
      paymentStatus: 'pending'
    },
    {
      id: 4,
      customerId: 4,
      customerName: 'Green Valley Restaurant',
      product: 'Broiler Chicken',
      quantity: 15,
      unit: 'kg',
      price: 20000,
      total: 300000,
      date: '2026-05-14',
      paymentStatus: 'paid'
    },
    {
      id: 5,
      customerId: 5,
      customerName: 'Mary Nambi',
      product: 'Eggs (Trays)',
      quantity: 10,
      unit: 'trays',
      price: 14000,
      total: 140000,
      date: '2026-05-12',
      paymentStatus: 'partial'
    },
    {
      id: 6,
      customerId: 3,
      customerName: 'John Wasswa',
      product: 'Goat (Adult)',
      quantity: 2,
      unit: 'heads',
      price: 300000,
      total: 600000,
      date: '2026-05-10',
      paymentStatus: 'paid'
    }
  ];

  const getCustomerTypeColor = (type: Customer['type']) => {
    switch (type) {
      case 'individual': return 'bg-blue-100 text-blue-700';
      case 'business': return 'bg-purple-100 text-purple-700';
      case 'retailer': return 'bg-green-100 text-green-700';
      case 'wholesaler': return 'bg-orange-100 text-orange-700';
    }
  };

  const getStatusColor = (status: Customer['status']) => {
    return status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700';
  };

  const getPaymentStatusColor = (status: Sale['paymentStatus']) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'partial': return 'bg-orange-100 text-orange-700';
    }
  };

  const filteredCustomers = filterType === 'all'
    ? customers
    : customers.filter(c => c.type === filterType);

  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);
  const pendingPayments = sales.filter(s => s.paymentStatus === 'pending' || s.paymentStatus === 'partial')
    .reduce((sum, s) => sum + s.total, 0);

  const handleAddCustomer = () => {
    alert('Add Customer functionality\n\nIn production, this would open a form to add a new customer with:\n- Name and contact details\n- Customer type\n- Location\n- Products of interest\n- Notes');
    setShowAddCustomer(false);
  };

  const handleEditCustomer = (customer: Customer) => {
    alert(`Edit customer: ${customer.name}\n\nIn production, this would open a form to edit customer details.`);
  };

  const handleDeleteCustomer = (customer: Customer) => {
    if (confirm(`Are you sure you want to delete customer "${customer.name}"?`)) {
      alert('Customer deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold mb-2">Customer & Buyer Management</h1>
          <p className="text-gray-600">Manage your customers and track sales</p>
        </div>
        <button
          onClick={() => setShowAddCustomer(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Customer
        </button>
      </div>

      {/* View Mode Toggle */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex gap-2">
          {(['customers', 'sales'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                viewMode === mode
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Total Customers</p>
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <p className="font-semibold">{customers.length}</p>
          <p className="text-blue-600 text-sm">{activeCustomers} active</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Total Revenue</p>
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <p className="font-semibold">{totalRevenue.toLocaleString()} UGX</p>
          <p className="text-green-600 text-sm">From {sales.length} sales</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Pending Payments</p>
            <Calendar className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="font-semibold">{pendingPayments.toLocaleString()} UGX</p>
          <p className="text-yellow-600 text-sm">
            {sales.filter(s => s.paymentStatus !== 'paid').length} invoices
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">This Month</p>
            <Package className="w-5 h-5 text-purple-600" />
          </div>
          <p className="font-semibold">{sales.length} sales</p>
          <p className="text-purple-600 text-sm">Avg: {Math.round(totalRevenue / sales.length).toLocaleString()} UGX</p>
        </div>
      </div>

      {viewMode === 'customers' ? (
        <>
          {/* Customer Type Filter */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex flex-wrap gap-2">
              <span className="font-semibold text-gray-700">Filter:</span>
              {(['all', 'individual', 'business', 'retailer', 'wholesaler'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1 rounded-lg transition-colors capitalize ${
                    filterType === type
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type === 'all' ? 'All Customers' : type}
                </button>
              ))}
            </div>
          </div>

          {/* Customers List */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Customer</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Type</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Contact</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Products</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Total Purchases</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-semibold">{customer.name}</p>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <MapPin className="w-3 h-3" />
                            <span>{customer.location}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold capitalize ${getCustomerTypeColor(customer.type)}`}>
                          {customer.type}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Phone className="w-3 h-3" />
                            <span>{customer.phone}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Mail className="w-3 h-3" />
                            <span className="truncate max-w-[150px]">{customer.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {customer.productsInterest.slice(0, 2).map((product, i) => (
                            <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                              {product}
                            </span>
                          ))}
                          {customer.productsInterest.length > 2 && (
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                              +{customer.productsInterest.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold">{customer.totalPurchases.toLocaleString()} UGX</p>
                        <p className="text-sm text-gray-600">
                          Last: {new Date(customer.lastPurchase).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold capitalize ${getStatusColor(customer.status)}`}>
                          {customer.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedCustomer(customer)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditCustomer(customer)}
                            className="p-1 text-green-600 hover:bg-green-50 rounded"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCustomer(customer)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Customer</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Product</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Quantity</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Price</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Total</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sales.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((sale) => (
                  <tr key={sale.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="text-sm">
                        {new Date(sale.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold">{sale.customerName}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p>{sale.product}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p>{sale.quantity} {sale.unit}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p>{sale.price.toLocaleString()} UGX</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold">{sale.total.toLocaleString()} UGX</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold capitalize ${getPaymentStatusColor(sale.paymentStatus)}`}>
                        {sale.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-semibold mb-2">{selectedCustomer.name}</h2>
                <div className="flex gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold capitalize ${getCustomerTypeColor(selectedCustomer.type)}`}>
                    {selectedCustomer.type}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold capitalize ${getStatusColor(selectedCustomer.status)}`}>
                    {selectedCustomer.status}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">Phone</p>
                  <p className="font-semibold">{selectedCustomer.phone}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Email</p>
                  <p className="font-semibold">{selectedCustomer.email}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Location</p>
                  <p className="font-semibold">{selectedCustomer.location}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total Purchases</p>
                  <p className="font-semibold">{selectedCustomer.totalPurchases.toLocaleString()} UGX</p>
                </div>
              </div>

              <div>
                <p className="text-gray-600 text-sm mb-2">Products of Interest</p>
                <div className="flex flex-wrap gap-2">
                  {selectedCustomer.productsInterest.map((product, i) => (
                    <span key={i} className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm">
                      {product}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-gray-600 text-sm">Notes</p>
                <p className="mt-1 p-3 bg-gray-50 rounded-lg">{selectedCustomer.notes}</p>
              </div>

              <div>
                <p className="text-gray-600 text-sm mb-2">Recent Purchases</p>
                <div className="space-y-2">
                  {sales.filter(s => s.customerId === selectedCustomer.id).map(sale => (
                    <div key={sale.id} className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{sale.product}</p>
                          <p className="text-sm text-gray-600">{sale.quantity} {sale.unit} × {sale.price.toLocaleString()} UGX</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{sale.total.toLocaleString()} UGX</p>
                          <p className="text-sm text-gray-600">{new Date(sale.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => handleEditCustomer(selectedCustomer)}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Edit Customer
              </button>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {showAddCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="font-semibold mb-4">Add New Customer</h2>
            <p className="text-gray-600 mb-4">
              This would open a form to add a new customer with their details, contact information, and preferences.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleAddCustomer}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Create Customer
              </button>
              <button
                onClick={() => setShowAddCustomer(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
