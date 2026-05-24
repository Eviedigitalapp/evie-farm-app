import { useState } from 'react';
import { DollarSign, Users, Calendar, Download, Plus, Edit, Eye, CheckCircle, Clock, FileText, TrendingUp } from 'lucide-react';

type PaymentPeriod = 'monthly' | 'weekly' | 'daily';
type PaymentStatus = 'paid' | 'pending' | 'processing';
type PaymentMethod = 'mobile-money' | 'bank' | 'cash';

interface StaffMember {
  id: number;
  name: string;
  role: string;
  employeeId: string;
  paymentPeriod: PaymentPeriod;
  baseSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  paymentMethod: PaymentMethod;
  phoneNumber: string;
  nssf: string;
  tin: string;
}

interface PayrollRecord {
  id: number;
  staffId: number;
  staffName: string;
  period: string;
  baseSalary: number;
  allowances: number;
  deductions: number;
  netPay: number;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
}

export function PayrollManagement() {
  const [activeTab, setActiveTab] = useState<'overview' | 'staff' | 'history'>('overview');
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [filterPeriod, setFilterPeriod] = useState<'all' | PaymentPeriod>('all');

  const staff: StaffMember[] = [
    {
      id: 1,
      name: 'John Wasswa',
      role: 'Farm Manager',
      employeeId: 'EMP-001',
      paymentPeriod: 'monthly',
      baseSalary: 1500000,
      allowances: 300000,
      deductions: 180000,
      netSalary: 1620000,
      paymentMethod: 'mobile-money',
      phoneNumber: '+256 700 111 222',
      nssf: 'NSSF-123456',
      tin: 'TIN-1001234567'
    },
    {
      id: 2,
      name: 'Sarah Nakato',
      role: 'Livestock Supervisor',
      employeeId: 'EMP-002',
      paymentPeriod: 'monthly',
      baseSalary: 1200000,
      allowances: 200000,
      deductions: 140000,
      netSalary: 1260000,
      paymentMethod: 'mobile-money',
      phoneNumber: '+256 700 222 333',
      nssf: 'NSSF-123457',
      tin: 'TIN-1001234568'
    },
    {
      id: 3,
      name: 'David Okello',
      role: 'Crop Field Worker',
      employeeId: 'EMP-003',
      paymentPeriod: 'monthly',
      baseSalary: 800000,
      allowances: 100000,
      deductions: 90000,
      netSalary: 810000,
      paymentMethod: 'cash',
      phoneNumber: '+256 700 333 444',
      nssf: 'NSSF-123458',
      tin: 'TIN-1001234569'
    },
    {
      id: 4,
      name: 'Mary Nambi',
      role: 'Poultry Attendant',
      employeeId: 'EMP-004',
      paymentPeriod: 'monthly',
      baseSalary: 700000,
      allowances: 80000,
      deductions: 78000,
      netSalary: 702000,
      paymentMethod: 'mobile-money',
      phoneNumber: '+256 700 444 555',
      nssf: 'NSSF-123459',
      tin: 'TIN-1001234570'
    },
    {
      id: 5,
      name: 'James Mugisha',
      role: 'Security Guard',
      employeeId: 'EMP-005',
      paymentPeriod: 'monthly',
      baseSalary: 600000,
      allowances: 50000,
      deductions: 65000,
      netSalary: 585000,
      paymentMethod: 'bank',
      phoneNumber: '+256 700 555 666',
      nssf: 'NSSF-123460',
      tin: 'TIN-1001234571'
    },
    {
      id: 6,
      name: 'Grace Auma',
      role: 'General Worker',
      employeeId: 'EMP-006',
      paymentPeriod: 'weekly',
      baseSalary: 150000,
      allowances: 20000,
      deductions: 17000,
      netSalary: 153000,
      paymentMethod: 'cash',
      phoneNumber: '+256 700 666 777',
      nssf: 'NSSF-123461',
      tin: 'TIN-1001234572'
    }
  ];

  const payrollHistory: PayrollRecord[] = [
    {
      id: 1,
      staffId: 1,
      staffName: 'John Wasswa',
      period: 'May 2026',
      baseSalary: 1500000,
      allowances: 300000,
      deductions: 180000,
      netPay: 1620000,
      paymentDate: '2026-05-01',
      paymentMethod: 'mobile-money',
      status: 'paid'
    },
    {
      id: 2,
      staffId: 2,
      staffName: 'Sarah Nakato',
      period: 'May 2026',
      baseSalary: 1200000,
      allowances: 200000,
      deductions: 140000,
      netPay: 1260000,
      paymentDate: '2026-05-01',
      paymentMethod: 'mobile-money',
      status: 'paid'
    },
    {
      id: 3,
      staffId: 3,
      staffName: 'David Okello',
      period: 'May 2026',
      baseSalary: 800000,
      allowances: 100000,
      deductions: 90000,
      netPay: 810000,
      paymentDate: '2026-05-01',
      paymentMethod: 'cash',
      status: 'paid'
    },
    {
      id: 4,
      staffId: 4,
      staffName: 'Mary Nambi',
      period: 'May 2026',
      baseSalary: 700000,
      allowances: 80000,
      deductions: 78000,
      netPay: 702000,
      paymentDate: '2026-05-01',
      paymentMethod: 'mobile-money',
      status: 'paid'
    },
    {
      id: 5,
      staffId: 5,
      staffName: 'James Mugisha',
      period: 'May 2026',
      baseSalary: 600000,
      allowances: 50000,
      deductions: 65000,
      netPay: 585000,
      paymentDate: '2026-05-01',
      paymentMethod: 'bank',
      status: 'processing'
    },
    {
      id: 6,
      staffId: 6,
      staffName: 'Grace Auma',
      period: 'Week 2, May 2026',
      baseSalary: 150000,
      allowances: 20000,
      deductions: 17000,
      netPay: 153000,
      paymentDate: '2026-05-10',
      paymentMethod: 'cash',
      status: 'pending'
    }
  ];

  const getPaymentMethodBadge = (method: PaymentMethod) => {
    switch (method) {
      case 'mobile-money': return 'bg-yellow-100 text-yellow-700';
      case 'bank': return 'bg-blue-100 text-blue-700';
      case 'cash': return 'bg-green-100 text-green-700';
    }
  };

  const getPaymentStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
    }
  };

  const getStatusIcon = (status: PaymentStatus) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      case 'processing': return <Clock className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
    }
  };

  const totalMonthlyPayroll = staff
    .filter(s => s.paymentPeriod === 'monthly')
    .reduce((sum, s) => sum + s.netSalary, 0);

  const totalWeeklyPayroll = staff
    .filter(s => s.paymentPeriod === 'weekly')
    .reduce((sum, s) => sum + s.netSalary, 0);

  const pendingPayments = payrollHistory.filter(p => p.status === 'pending' || p.status === 'processing').length;

  const totalPaidThisMonth = payrollHistory
    .filter(p => p.status === 'paid' && p.period.includes('May 2026'))
    .reduce((sum, p) => sum + p.netPay, 0);

  const filteredStaff = filterPeriod === 'all'
    ? staff
    : staff.filter(s => s.paymentPeriod === filterPeriod);

  const handleProcessPayroll = () => {
    alert('Process Payroll\n\nIn production, this would:\n1. Calculate all salaries, allowances, and deductions\n2. Generate payslips for each employee\n3. Initiate payments via Mobile Money/Bank/Cash\n4. Update payment records\n5. Generate NSSF and PAYE reports\n6. Send payment notifications to staff');
  };

  const handleGeneratePayslip = (staffMember: StaffMember) => {
    alert(`Generate Payslip for ${staffMember.name}\n\nPayslip Details:\n- Employee: ${staffMember.name}\n- ID: ${staffMember.employeeId}\n- Base Salary: ${staffMember.baseSalary.toLocaleString()} UGX\n- Allowances: ${staffMember.allowances.toLocaleString()} UGX\n- Deductions: ${staffMember.deductions.toLocaleString()} UGX\n- Net Salary: ${staffMember.netSalary.toLocaleString()} UGX\n\nIn production, this would generate a PDF payslip.`);
  };

  const handleExportReport = () => {
    alert('Export Payroll Report\n\nIn production, this would generate:\n- Payroll summary Excel/PDF report\n- NSSF contribution report\n- PAYE tax report\n- Payment breakdown by department');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold mb-2">Payroll Management</h1>
          <p className="text-gray-600">Manage staff salaries and payments</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExportReport}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button
            onClick={handleProcessPayroll}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <DollarSign className="w-4 h-4" />
            Process Payroll
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Total Staff</p>
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <p className="font-semibold mb-1">{staff.length}</p>
          <p className="text-blue-600 text-sm">Active employees</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Monthly Payroll</p>
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <p className="font-semibold mb-1">{totalMonthlyPayroll.toLocaleString()} UGX</p>
          <p className="text-green-600 text-sm">
            {staff.filter(s => s.paymentPeriod === 'monthly').length} monthly staff
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Paid This Month</p>
            <CheckCircle className="w-5 h-5 text-purple-600" />
          </div>
          <p className="font-semibold mb-1">{totalPaidThisMonth.toLocaleString()} UGX</p>
          <p className="text-purple-600 text-sm">
            {payrollHistory.filter(p => p.status === 'paid').length} payments
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Pending Payments</p>
            <Clock className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="font-semibold mb-1">{pendingPayments}</p>
          <p className="text-yellow-600 text-sm">Awaiting processing</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex gap-2">
          {(['overview', 'staff', 'history'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                activeTab === tab
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payroll Breakdown */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="font-semibold mb-4">Payroll Breakdown (May 2026)</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">Total Base Salaries</span>
                  <span className="font-semibold">
                    {staff.reduce((sum, s) => sum + s.baseSalary, 0).toLocaleString()} UGX
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">Total Allowances</span>
                  <span className="font-semibold text-green-600">
                    +{staff.reduce((sum, s) => sum + s.allowances, 0).toLocaleString()} UGX
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">Total Deductions</span>
                  <span className="font-semibold text-red-600">
                    -{staff.reduce((sum, s) => sum + s.deductions, 0).toLocaleString()} UGX
                  </span>
                </div>
                <div className="border-t border-gray-300 pt-2 mt-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">Net Payroll</span>
                    <span className="font-semibold text-green-600">
                      {staff.reduce((sum, s) => sum + s.netSalary, 0).toLocaleString()} UGX
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Payment Methods Distribution</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                    <span className="text-gray-700">Mobile Money</span>
                    <span className="font-semibold">
                      {staff.filter(s => s.paymentMethod === 'mobile-money').length} staff
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                    <span className="text-gray-700">Bank Transfer</span>
                    <span className="font-semibold">
                      {staff.filter(s => s.paymentMethod === 'bank').length} staff
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                    <span className="text-gray-700">Cash</span>
                    <span className="font-semibold">
                      {staff.filter(s => s.paymentMethod === 'cash').length} staff
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Payments */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="font-semibold mb-4">Upcoming Payments</h2>
            <div className="space-y-3">
              {payrollHistory.filter(p => p.status !== 'paid').map(payment => (
                <div key={payment.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold">{payment.staffName}</p>
                      <p className="text-sm text-gray-600">{payment.period}</p>
                    </div>
                    <span className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold capitalize ${getPaymentStatusBadge(payment.status)}`}>
                      {getStatusIcon(payment.status)}
                      {payment.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Due: {new Date(payment.paymentDate).toLocaleDateString()}</span>
                    <span className="font-semibold text-green-600">
                      {payment.netPay.toLocaleString()} UGX
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'staff' && (
        <>
          {/* Filter */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex flex-wrap gap-2">
              <span className="font-semibold text-gray-700">Payment Period:</span>
              {(['all', 'monthly', 'weekly', 'daily'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setFilterPeriod(period)}
                  className={`px-3 py-1 rounded-lg transition-colors capitalize ${
                    filterPeriod === period
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {period === 'all' ? 'All Staff' : period}
                </button>
              ))}
            </div>
          </div>

          {/* Staff List */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Employee</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Role</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Period</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Base Salary</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Allowances</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Deductions</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Net Salary</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Payment</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStaff.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-semibold">{member.name}</p>
                          <p className="text-sm text-gray-600">{member.employeeId}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p>{member.role}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold capitalize">
                          {member.paymentPeriod}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold">{member.baseSalary.toLocaleString()} UGX</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-green-600">+{member.allowances.toLocaleString()} UGX</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-red-600">-{member.deductions.toLocaleString()} UGX</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-green-600">{member.netSalary.toLocaleString()} UGX</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold capitalize ${getPaymentMethodBadge(member.paymentMethod)}`}>
                          {member.paymentMethod.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedStaff(member)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleGeneratePayslip(member)}
                            className="p-1 text-green-600 hover:bg-green-50 rounded"
                            title="Generate Payslip"
                          >
                            <FileText className="w-4 h-4" />
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
      )}

      {activeTab === 'history' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Employee</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Period</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Base Salary</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Allowances</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Deductions</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Net Pay</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Payment Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Method</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {payrollHistory.sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime()).map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="font-semibold">{record.staffName}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p>{record.period}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p>{record.baseSalary.toLocaleString()} UGX</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-green-600">+{record.allowances.toLocaleString()} UGX</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-red-600">-{record.deductions.toLocaleString()} UGX</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-green-600">{record.netPay.toLocaleString()} UGX</p>
                    </td>
                    <td className="px-4 py-3">
                      <p>{new Date(record.paymentDate).toLocaleDateString()}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold capitalize ${getPaymentMethodBadge(record.paymentMethod)}`}>
                        {record.paymentMethod.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold capitalize ${getPaymentStatusBadge(record.status)}`}>
                        {getStatusIcon(record.status)}
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Staff Detail Modal */}
      {selectedStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-semibold mb-2">{selectedStaff.name}</h2>
                <p className="text-gray-600">{selectedStaff.role}</p>
              </div>
              <button
                onClick={() => setSelectedStaff(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">Employee ID</p>
                  <p className="font-semibold">{selectedStaff.employeeId}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Payment Period</p>
                  <p className="font-semibold capitalize">{selectedStaff.paymentPeriod}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Phone Number</p>
                  <p className="font-semibold">{selectedStaff.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Payment Method</p>
                  <p className="font-semibold capitalize">{selectedStaff.paymentMethod.replace('-', ' ')}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">NSSF Number</p>
                  <p className="font-semibold">{selectedStaff.nssf}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">TIN Number</p>
                  <p className="font-semibold">{selectedStaff.tin}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-semibold mb-3">Salary Breakdown</h3>
                <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Base Salary</span>
                    <span className="font-semibold">{selectedStaff.baseSalary.toLocaleString()} UGX</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Allowances</span>
                    <span className="font-semibold text-green-600">+{selectedStaff.allowances.toLocaleString()} UGX</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Deductions (NSSF, PAYE)</span>
                    <span className="font-semibold text-red-600">-{selectedStaff.deductions.toLocaleString()} UGX</span>
                  </div>
                  <div className="border-t border-gray-300 pt-2 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">Net Salary</span>
                      <span className="font-semibold text-green-600">{selectedStaff.netSalary.toLocaleString()} UGX</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => handleGeneratePayslip(selectedStaff)}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Generate Payslip
              </button>
              <button
                onClick={() => setSelectedStaff(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tax & Compliance Info */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
        <h2 className="font-semibold mb-3">Tax & Compliance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p className="mb-2">
              <strong>NSSF (National Social Security Fund):</strong> 10% employer contribution + 5% employee contribution
            </p>
            <p className="mb-2">
              <strong>PAYE (Pay As You Earn):</strong> Progressive tax rates from 10% to 40% based on income brackets
            </p>
          </div>
          <div>
            <p className="mb-2">
              <strong>Tax-Free Threshold:</strong> First 235,000 UGX per month is tax-free
            </p>
            <p className="mb-2">
              <strong>Payment Integration:</strong> Direct integration with Mobile Money (MTN, Airtel) and bank transfers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
