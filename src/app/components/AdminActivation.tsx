import { useEffect, useState } from 'react';
import {
  CheckCircle,
  Clock,
  RefreshCw,
  Smartphone,
  ShieldCheck,
  User,
  CalendarDays
} from 'lucide-react';

type PaymentRecord = {
  id: string;
  subscriptionId?: string;
  userId?: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  amount?: number;
  currency?: string;
  paymentMethod?: string;
  paymentNetwork?: string;
  transactionRef?: string;
  status?: string;
  submittedAt?: string;
  activatedAt?: string;
  accessEndDate?: string;
  renewedAt?: string;
};

type LicenseRecord = {
  id: string;
  userId?: string;
  fullName?: string;
  phoneNumber?: string;
  paymentId: string;
  transactionRef?: string;
  amount: number;
  currency: string;
  status: 'active';
  activatedAt: string;
  accessEndDate: string;
  renewedAt?: string;
};

const ACCESS_YEARS = 2;

function addTwoYears(date: Date) {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + ACCESS_YEARS);
  return result;
}

export function AdminActivation() {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [licenses, setLicenses] = useState<LicenseRecord[]>([]);
  const [message, setMessage] = useState('');

  const loadRecords = () => {
    const storedPayments = JSON.parse(
      localStorage.getItem('evie_payments') || '[]'
    );

    const storedLicenses = JSON.parse(
      localStorage.getItem('evie_licenses') || '[]'
    );

    setPayments(storedPayments);
    setLicenses(storedLicenses);
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const activateCustomer = (payment: PaymentRecord) => {
    const now = new Date();
    const endDate = addTwoYears(now);

    const newLicense: LicenseRecord = {
      id: `license_${Date.now()}`,
      userId: payment.userId,
      fullName: payment.fullName,
      phoneNumber: payment.phoneNumber,
      paymentId: payment.id,
      transactionRef: payment.transactionRef,
      amount: payment.amount || 200000,
      currency: payment.currency || 'UGX',
      status: 'active',
      activatedAt: now.toISOString(),
      accessEndDate: endDate.toISOString()
    };

    const existingLicenses: LicenseRecord[] = JSON.parse(
      localStorage.getItem('evie_licenses') || '[]'
    );

    const filteredLicenses = existingLicenses.filter(
      (license) => license.userId !== payment.userId
    );

    const updatedLicenses = [...filteredLicenses, newLicense];

    localStorage.setItem(
      'evie_licenses',
      JSON.stringify(updatedLicenses)
    );

    const existingPayments: PaymentRecord[] = JSON.parse(
      localStorage.getItem('evie_payments') || '[]'
    );

    const updatedPayments = existingPayments.map((item) =>
      item.id === payment.id
        ? {
            ...item,
            status: 'activated',
            activatedAt: now.toISOString(),
            accessEndDate: endDate.toISOString()
          }
        : item
    );

    localStorage.setItem(
      'evie_payments',
      JSON.stringify(updatedPayments)
    );

    setMessage(
      `${payment.fullName || 'Customer'} activated successfully for 2 years.`
    );

    loadRecords();
  };

  const renewCustomer = (payment: PaymentRecord) => {
    const existingLicenses: LicenseRecord[] = JSON.parse(
      localStorage.getItem('evie_licenses') || '[]'
    );

    const currentLicense = existingLicenses.find(
      (license) => license.userId === payment.userId
    );

    if (!currentLicense) {
      activateCustomer(payment);
      return;
    }

    const now = new Date();

    const currentEnd = currentLicense.accessEndDate
      ? new Date(currentLicense.accessEndDate)
      : now;

    const renewalStart =
      currentEnd.getTime() > now.getTime()
        ? currentEnd
        : now;

    const newEndDate = addTwoYears(renewalStart);

    const updatedLicenses = existingLicenses.map((license) =>
      license.userId === payment.userId
        ? {
            ...license,
            status: 'active' as const,
            renewedAt: now.toISOString(),
            accessEndDate: newEndDate.toISOString(),
            paymentId: payment.id,
            transactionRef: payment.transactionRef
          }
        : license
    );

    localStorage.setItem(
      'evie_licenses',
      JSON.stringify(updatedLicenses)
    );

    const existingPayments: PaymentRecord[] = JSON.parse(
      localStorage.getItem('evie_payments') || '[]'
    );

    const updatedPayments = existingPayments.map((item) =>
      item.id === payment.id
        ? {
            ...item,
            status: 'renewed',
            renewedAt: now.toISOString(),
            accessEndDate: newEndDate.toISOString()
          }
        : item
    );

    localStorage.setItem(
      'evie_payments',
      JSON.stringify(updatedPayments)
    );

    setMessage(
      `${payment.fullName || 'Customer'} renewed successfully for another 2 years.`
    );

    loadRecords();
  };

  const pendingPayments = payments.filter(
    (payment) =>
      payment.status === 'pending_activation'
  );

  const completedPayments = payments.filter(
    (payment) =>
      payment.status === 'activated' ||
      payment.status === 'renewed'
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              EVIE Owner Activation
            </h1>

            <p className="text-gray-600 mt-1">
              Verify Mobile Money payments and activate customer access.
            </p>
          </div>

          <button
            onClick={loadRecords}
            className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100"
          >
            <RefreshCw className="w-5 h-5" />
            Refresh
          </button>
        </div>

        {message && (
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />

            <p className="font-semibold text-green-800">
              {message}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-gray-500 text-sm">
              Awaiting Activation
            </p>

            <p className="text-3xl font-bold text-yellow-600 mt-1">
              {pendingPayments.length}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-gray-500 text-sm">
              Active Licenses
            </p>

            <p className="text-3xl font-bold text-green-600 mt-1">
              {licenses.length}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-gray-500 text-sm">
              Access Period
            </p>

            <p className="text-3xl font-bold text-blue-600 mt-1">
              2 Years
            </p>
          </div>

        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">

          <div className="p-5 border-b border-gray-200">
            <h2 className="font-bold text-xl text-gray-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              Payments Awaiting Activation
            </h2>
          </div>

          {pendingPayments.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No customers are currently awaiting activation.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">

              {pendingPayments.map((payment) => {
                const existingLicense = licenses.find(
                  (license) => license.userId === payment.userId
                );

                return (
                  <div
                    key={payment.id}
                    className="p-6"
                  >

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                      <div className="space-y-3">

                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-gray-500" />

                          <div>
                            <p className="text-sm text-gray-500">
                              Customer
                            </p>

                            <p className="font-bold text-gray-900">
                              {payment.fullName || 'Not provided'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Smartphone className="w-5 h-5 text-gray-500" />

                          <div>
                            <p className="text-sm text-gray-500">
                              Phone
                            </p>

                            <p className="font-semibold">
                              {payment.phoneNumber || 'Not provided'}
                            </p>
                          </div>
                        </div>

                      </div>

                      <div className="space-y-3">

                        <div>
                          <p className="text-sm text-gray-500">
                            Network
                          </p>

                          <p className="font-semibold">
                            {payment.paymentNetwork ||
                              payment.paymentMethod ||
                              'Not specified'}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">
                            Transaction Reference
                          </p>

                          <p className="font-bold text-gray-900">
                            {payment.transactionRef || 'Not provided'}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">
                            Amount
                          </p>

                          <p className="font-bold text-green-700">
                            UGX {(payment.amount || 200000).toLocaleString()}
                          </p>
                        </div>

                      </div>

                      <div className="flex flex-col justify-center gap-3">

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">

                          <p className="text-sm text-yellow-800 font-semibold">
                            Verify the Mobile Money transaction before approving.
                          </p>

                        </div>

                        {existingLicense ? (
                          <button
                            onClick={() => renewCustomer(payment)}
                            className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700"
                          >
                            <CalendarDays className="w-5 h-5" />
                            RENEW FOR 2 YEARS
                          </button>
                        ) : (
                          <button
                            onClick={() => activateCustomer(payment)}
                            className="w-full flex items-center justify-center gap-2 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700"
                          >
                            <ShieldCheck className="w-5 h-5" />
                            ACTIVATE FOR 2 YEARS
                          </button>
                        )}

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

          <div className="p-5 border-b border-gray-200">
            <h2 className="font-bold text-xl text-gray-900">
              Activation History
            </h2>
          </div>

          {completedPayments.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No activation history yet.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">

              {completedPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >

                  <div>
                    <p className="font-bold text-gray-900">
                      {payment.fullName || 'Customer'}
                    </p>

                    <p className="text-sm text-gray-500">
                      {payment.phoneNumber}
                    </p>

                    <p className="text-sm text-gray-500">
                      Ref: {payment.transactionRef}
                    </p>
                  </div>

                  <div className="text-left md:text-right">

                    <p className="font-bold text-green-700">
                      {payment.status === 'renewed'
                        ? 'Renewed'
                        : 'Activated'}
                    </p>

                    {payment.accessEndDate && (
                      <p className="text-sm text-gray-600">
                        Access until:{' '}
                        {new Date(
                          payment.accessEndDate
                        ).toLocaleDateString()}
                      </p>
                    )}

                  </div>

                </div>
              ))}

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
