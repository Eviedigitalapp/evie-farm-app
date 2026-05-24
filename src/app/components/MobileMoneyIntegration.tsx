import { useState } from 'react';
import { Smartphone, DollarSign, Clock, CheckCircle, XCircle, RefreshCw, Send, Download } from 'lucide-react';

type PaymentProvider = 'mtn' | 'airtel';
type TransactionType = 'send' | 'receive';
type TransactionStatus = 'completed' | 'pending' | 'failed';

interface Transaction {
  id: number;
  type: TransactionType;
  provider: PaymentProvider;
  amount: number;
  phoneNumber: string;
  reference: string;
  description: string;
  status: TransactionStatus;
  date: string;
  time: string;
}

interface PaymentMethod {
  provider: PaymentProvider;
  name: string;
  phoneNumber: string;
  isDefault: boolean;
}

export function MobileMoneyIntegration() {
  const [activeTab, setActiveTab] = useState<'send' | 'receive' | 'history'>('receive');
  const [showAddMethod, setShowAddMethod] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider>('mtn');

  const paymentMethods: PaymentMethod[] = [
    {
      provider: 'mtn',
      name: 'MTN Mobile Money',
      phoneNumber: '+256 700 123 456',
      isDefault: true
    },
    {
      provider: 'airtel',
      name: 'Airtel Money',
      phoneNumber: '+256 750 654 321',
      isDefault: false
    }
  ];

  const transactions: Transaction[] = [
    {
      id: 1,
      type: 'receive',
      provider: 'mtn',
      amount: 280000,
      phoneNumber: '+256 700 111 222',
      reference: 'MTN-2026051701',
      description: 'Payment from Sarah Nakato - Eggs',
      status: 'completed',
      date: '2026-05-17',
      time: '10:30 AM'
    },
    {
      id: 2,
      type: 'receive',
      provider: 'airtel',
      amount: 200000,
      phoneNumber: '+256 750 333 444',
      reference: 'AIR-2026051601',
      description: 'Payment from Kampala Fresh Foods - Milk',
      status: 'completed',
      date: '2026-05-16',
      time: '02:15 PM'
    },
    {
      id: 3,
      type: 'send',
      provider: 'mtn',
      amount: 150000,
      phoneNumber: '+256 700 555 666',
      reference: 'MTN-2026051501',
      description: 'Payment to supplier - Feeds',
      status: 'completed',
      date: '2026-05-15',
      time: '11:00 AM'
    },
    {
      id: 4,
      type: 'receive',
      provider: 'mtn',
      amount: 700000,
      phoneNumber: '+256 700 777 888',
      reference: 'MTN-2026051402',
      description: 'Payment from Green Valley Restaurant',
      status: 'pending',
      date: '2026-05-14',
      time: '04:30 PM'
    },
    {
      id: 5,
      type: 'send',
      provider: 'airtel',
      amount: 75000,
      phoneNumber: '+256 750 999 000',
      reference: 'AIR-2026051301',
      description: 'Staff wages - John Doe',
      status: 'completed',
      date: '2026-05-13',
      time: '09:00 AM'
    },
    {
      id: 6,
      type: 'receive',
      provider: 'mtn',
      amount: 140000,
      phoneNumber: '+256 700 121 212',
      reference: 'MTN-2026051202',
      description: 'Payment from Mary Nambi - Eggs',
      status: 'failed',
      date: '2026-05-12',
      time: '03:45 PM'
    }
  ];

  const getProviderColor = (provider: PaymentProvider) => {
    return provider === 'mtn' ? 'bg-yellow-500' : 'bg-red-500';
  };

  const getProviderLogo = (provider: PaymentProvider) => {
    return provider === 'mtn' ? '📱 MTN' : '📱 Airtel';
  };

  const getStatusIcon = (status: TransactionStatus) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending': return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'failed': return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusColor = (status: TransactionStatus) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'failed': return 'bg-red-100 text-red-700';
    }
  };

  const totalReceived = transactions
    .filter(t => t.type === 'receive' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSent = transactions
    .filter(t => t.type === 'send' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingTransactions = transactions.filter(t => t.status === 'pending').length;

  const handleSendMoney = () => {
    alert('Send Money\n\nIn production, this would:\n1. Connect to MTN/Airtel Mobile Money API\n2. Initiate payment request\n3. Customer receives PIN prompt on their phone\n4. Transaction completes upon PIN entry\n5. Send confirmation SMS/notification');
  };

  const handleReceiveMoney = () => {
    alert('Request Payment\n\nIn production, this would:\n1. Generate payment request\n2. Send SMS to customer with payment details\n3. Customer completes payment via USSD or app\n4. Automatically update transaction status\n5. Send receipt to both parties');
  };

  const handleAddMethod = () => {
    alert('Add Payment Method\n\nIn production, this would:\n1. Verify phone number\n2. Link Mobile Money account\n3. Confirm with PIN/OTP\n4. Save payment method');
    setShowAddMethod(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold mb-2">Mobile Money Integration</h1>
          <p className="text-gray-600">Manage payments via MTN and Airtel Mobile Money</p>
        </div>
        <button
          onClick={() => setShowAddMethod(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Smartphone className="w-4 h-4" />
          Add Payment Method
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Total Received</p>
            <Download className="w-5 h-5 text-green-600" />
          </div>
          <p className="font-semibold mb-1">{totalReceived.toLocaleString()} UGX</p>
          <p className="text-green-600 text-sm">
            {transactions.filter(t => t.type === 'receive' && t.status === 'completed').length} transactions
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Total Sent</p>
            <Send className="w-5 h-5 text-blue-600" />
          </div>
          <p className="font-semibold mb-1">{totalSent.toLocaleString()} UGX</p>
          <p className="text-blue-600 text-sm">
            {transactions.filter(t => t.type === 'send' && t.status === 'completed').length} transactions
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Pending</p>
            <Clock className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="font-semibold mb-1">{pendingTransactions}</p>
          <p className="text-yellow-600 text-sm">Awaiting confirmation</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Net Balance</p>
            <DollarSign className="w-5 h-5 text-purple-600" />
          </div>
          <p className="font-semibold mb-1">{(totalReceived - totalSent).toLocaleString()} UGX</p>
          <p className="text-purple-600 text-sm">This month</p>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="font-semibold mb-4">Linked Payment Methods</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentMethods.map((method, index) => (
            <div
              key={index}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-3 ${getProviderColor(method.provider)} rounded-lg`}>
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">{method.name}</p>
                    <p className="text-gray-600">{method.phoneNumber}</p>
                  </div>
                </div>
                {method.isDefault && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                    Default
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex gap-2">
          {(['receive', 'send', 'history'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                activeTab === tab
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab === 'receive' && 'Receive Payment'}
              {tab === 'send' && 'Send Money'}
              {tab === 'history' && 'Transaction History'}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'receive' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="font-semibold mb-4">Request Payment</h2>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Payment Provider</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedProvider('mtn')}
                  className={`p-4 border-2 rounded-lg transition-colors ${
                    selectedProvider === 'mtn'
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-2 bg-yellow-500 rounded-lg">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-semibold">MTN MoMo</span>
                  </div>
                </button>
                <button
                  onClick={() => setSelectedProvider('airtel')}
                  className={`p-4 border-2 rounded-lg transition-colors ${
                    selectedProvider === 'airtel'
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-2 bg-red-500 rounded-lg">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-semibold">Airtel Money</span>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Customer Phone Number</label>
              <input
                type="tel"
                placeholder="+256 7XX XXX XXX"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Amount (UGX)</label>
              <input
                type="number"
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Description</label>
              <input
                type="text"
                placeholder="Payment for..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              onClick={handleReceiveMoney}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-5 h-5" />
              Request Payment
            </button>
          </div>
        </div>
      )}

      {activeTab === 'send' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="font-semibold mb-4">Send Money</h2>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Payment Provider</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedProvider('mtn')}
                  className={`p-4 border-2 rounded-lg transition-colors ${
                    selectedProvider === 'mtn'
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-2 bg-yellow-500 rounded-lg">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-semibold">MTN MoMo</span>
                  </div>
                </button>
                <button
                  onClick={() => setSelectedProvider('airtel')}
                  className={`p-4 border-2 rounded-lg transition-colors ${
                    selectedProvider === 'airtel'
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-2 bg-red-500 rounded-lg">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-semibold">Airtel Money</span>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Recipient Phone Number</label>
              <input
                type="tel"
                placeholder="+256 7XX XXX XXX"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Amount (UGX)</label>
              <input
                type="number"
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Description</label>
              <input
                type="text"
                placeholder="Payment for..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              onClick={handleSendMoney}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send className="w-5 h-5" />
              Send Money
            </button>

            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>Note:</strong> You will receive a PIN prompt on your registered phone number to confirm this transaction.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-semibold">Transaction History</h2>
            <button className="flex items-center gap-2 px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Date & Time</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Type</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Provider</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Phone Number</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Description</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Amount</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.sort((a, b) => new Date(b.date + ' ' + b.time).getTime() - new Date(a.date + ' ' + a.time).getTime()).map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-semibold text-sm">
                          {new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                        <p className="text-xs text-gray-600">{transaction.time}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {transaction.type === 'receive' ? (
                          <>
                            <Download className="w-4 h-4 text-green-600" />
                            <span className="text-green-600 font-semibold">Received</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 text-blue-600" />
                            <span className="text-blue-600 font-semibold">Sent</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold text-white ${getProviderColor(transaction.provider)}`}>
                        {getProviderLogo(transaction.provider)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm">{transaction.phoneNumber}</p>
                      <p className="text-xs text-gray-600">{transaction.reference}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm">{transaction.description}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className={`font-semibold ${transaction.type === 'receive' ? 'text-green-600' : 'text-blue-600'}`}>
                        {transaction.type === 'receive' ? '+' : '-'}{transaction.amount.toLocaleString()} UGX
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(transaction.status)}
                        <span className={`px-2 py-1 rounded text-xs font-semibold capitalize ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Payment Method Modal */}
      {showAddMethod && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="font-semibold mb-4">Add Payment Method</h2>
            <p className="text-gray-600 mb-4">
              Link your MTN Mobile Money or Airtel Money account to start receiving and sending payments.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleAddMethod}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Method
              </button>
              <button
                onClick={() => setShowAddMethod(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Integration Info */}
      <div className="bg-gradient-to-r from-yellow-50 to-red-50 rounded-lg border border-yellow-200 p-6">
        <h2 className="font-semibold mb-3">Mobile Money Integration</h2>
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <strong>Supported Providers:</strong> MTN Mobile Money and Airtel Money
          </p>
          <p>
            <strong>Transaction Limits:</strong> Send up to 5,000,000 UGX per transaction, 20,000,000 UGX per day
          </p>
          <p>
            <strong>Transaction Fees:</strong> Fees vary by amount and provider. Check with your mobile money provider.
          </p>
          <p>
            <strong>Processing Time:</strong> Most transactions complete instantly. Some may take up to 5 minutes.
          </p>
        </div>
      </div>
    </div>
  );
}
