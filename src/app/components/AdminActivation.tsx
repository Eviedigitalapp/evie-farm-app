import { useEffect, useState } from 'react';
import {
  CheckCircle,
  Clock,
  RefreshCw,
  Smartphone,
  ShieldCheck,
  User,
  CalendarDays,
  KeyRound,
  AlertCircle
} from 'lucide-react';

type PaymentRecord = {
  id: number;
  user_id?: string;
  full_name?: string;
  email?: string;
  phone?: string;
  payment_network?: string;
  transaction_ref?: string;
  amount?: number;
  currency?: string;
  status?: string;
  submitted_at?: string;
  activated_at?: string;
  renewed_at?: string;
  access_end_date?: string;
};

type LicenseRecord = {
  id: number;
  user_id?: string;
  full_name?: string;
  email?: string;
  phone?: string;
  status?: string;
  activated_at?: string;
  renewed_at?: string;
  access_end_date?: string;
  last_payment_id?: number;
};

export function AdminActivation() {
  const [payments, setPayments] =
    useState<PaymentRecord[]>([]);

  const [licenses, setLicenses] =
    useState<LicenseRecord[]>([]);

  const [adminKey, setAdminKey] =
    useState(
      sessionStorage.getItem('evie_admin_key') || ''
    );

  const [keyInput, setKeyInput] =
    useState('');

  const [message, setMessage] =
    useState('');

  const [error, setError] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [processingId, setProcessingId] =
    useState<number | null>(null);

  const loadRecords = async (
    keyOverride?: string
  ) => {
    const key =
      keyOverride || adminKey;

    if (!key) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        '/api/admin',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${key}`
          }
        }
      );

      const responseText =
        await response.text();

      let result: any = {};

      try {
        result = responseText
          ? JSON.parse(responseText)
          : {};
      } catch {
        result = {};
      }

      if (!response.ok) {
        throw new Error(
          result?.error ||
            `Admin API error ${response.status}`
        );
      }

      setPayments(
        Array.isArray(result.payments)
          ? result.payments
          : []
      );

      setLicenses(
        Array.isArray(result.licenses)
          ? result.licenses
          : []
      );
    } catch (err: any) {
      console.error(
        'Admin records error:',
        err
      );

      setError(
        err?.message ||
          'Could not load admin records.'
      );

      if (
        err?.message === 'Unauthorized'
      ) {
        sessionStorage.removeItem(
          'evie_admin_key'
        );

        setAdminKey('');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminKey) {
      loadRecords();
    }
  }, []);

  const unlockAdmin = async () => {
    setError('');
    setMessage('');

    if (!keyInput.trim()) {
      setError(
        'Please enter the EVIE Admin Key.'
      );
      return;
    }

    const key =
      keyInput.trim();

    try {
      setLoading(true);

      const response = await fetch(
        '/api/admin',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${key}`
          }
        }
      );

      const responseText =
        await response.text();

      let result: any = {};

      try {
        result = responseText
          ? JSON.parse(responseText)
          : {};
      } catch {
        result = {};
      }

      if (!response.ok) {
        throw new Error(
          result?.error ||
            'Admin verification failed.'
        );
      }

      sessionStorage.setItem(
        'evie_admin_key',
        key
      );

      setAdminKey(key);

      setPayments(
        Array.isArray(result.payments)
          ? result.payments
          : []
      );

      setLicenses(
        Array.isArray(result.licenses)
          ? result.licenses
          : []
      );

      setKeyInput('');

      setMessage(
        'EVIE Admin access verified.'
      );
    } catch (err: any) {
      setError(
        err?.message ||
          'Admin verification failed.'
      );
    } finally {
      setLoading(false);
    }
  };

  const clearAdminKey = () => {
    sessionStorage.removeItem(
      'evie_admin_key'
    );

    setAdminKey('');
    setPayments([]);
    setLicenses([]);
    setMessage('');
    setError('');
  };

  const runAction = async (
    payment: PaymentRecord,
    action: 'activate' | 'renew'
  ) => {
    if (!adminKey) {
      setError(
        'Admin key is required.'
      );
      return;
    }

    setProcessingId(payment.id);
    setMessage('');
    setError('');

    try {
      const response = await fetch(
        '/api/admin',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
            Authorization:
              `Bearer ${adminKey}`
          },
          body: JSON.stringify({
            action,
            paymentId: payment.id
          })
        }
      );

      const responseText =
        await response.text();

      let result: any = {};

      try {
        result = responseText
          ? JSON.parse(responseText)
          : {};
      } catch {
        result = {};
      }

      if (!response.ok) {
        throw new Error(
          result?.error ||
            `Admin API error ${response.status}`
        );
      }

      setMessage(
        action === 'renew'
          ? `${payment.full_name || 'Customer'} renewed successfully for another 1 year.`
          : `${payment.full_name || 'Customer'} activated successfully for 1 year.`
      );

      await loadRecords();
    } catch (err: any) {
      console.error(
        'Admin action error:',
        err
      );

      setError(
        err?.message ||
          'Admin action failed.'
      );
    } finally {
      setProcessingId(null);
    }
  };

  if (!adminKey) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
        <div className="max-w-xl mx-auto">

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">

            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <KeyRound className="w-8 h-8 text-green-700" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
              EVIE Owner Activation
            </h1>

            <p className="text-gray-600 text-center mb-6">
              Enter your private EVIE Admin Key to manage
              customer payments and licences.
            </p>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <label className="block font-semibold text-gray-700 mb-2">
              EVIE Admin Key
            </label>

            <input
              type="password"
              value={keyInput}
              onChange={(event) =>
                setKeyInput(
                  event.target.value
                )
              }
              placeholder="Enter private admin key"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
            />

            <button
              type="button"
              onClick={unlockAdmin}
              disabled={loading}
              className="w-full py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 disabled:opacity-50"
            >
              {loading
                ? 'Verifying...'
                : 'Unlock Owner Activation'}
            </button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Your key is kept only for this browser session.
            </p>

          </div>
        </div>
      </div>
    );
  }

  const pendingPayments =
    payments.filter(
      (payment) =>
        payment.status ===
        'pending_activation'
    );

  const completedPayments =
    payments.filter(
      (payment) =>
        payment.status ===
          'activated' ||
        payment.status ===
          'renewed'
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              EVIE Owner Activation
            </h1>

            <p className="text-gray-600 mt-1">
              Verify Mobile Money payments and activate
              customer access.
            </p>
          </div>

          <div className="flex gap-2">

            <button
              type="button"
              onClick={() =>
                loadRecords()
              }
              disabled={loading}
              className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            >
              <RefreshCw
                className={`w-5 h-5 ${
                  loading
                    ? 'animate-spin'
                    : ''
                }`}
              />
              Refresh
            </button>

            <button
              type="button"
              onClick={clearAdminKey}
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200"
            >
              Lock Admin
            </button>

          </div>
        </div>

        {message && (
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />

            <p className="font-semibold text-green-800">
              {message}
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-600" />

            <p className="font-semibold text-red-800">
              {error}
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
              {
                licenses.filter(
                  (license) =>
                    license.status ===
                    'active'
                ).length
              }
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-gray-500 text-sm">
              Access Period
            </p>

            <p className="text-3xl font-bold text-blue-600 mt-1">
              1 Year
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

              {pendingPayments.map(
                (payment) => {
                  const existingLicense =
                    licenses.find(
                      (license) =>
                        license.user_id ===
                        payment.user_id
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
                                {payment.full_name ||
                                  'Not provided'}
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
                                {payment.phone ||
                                  'Not provided'}
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
                              {payment.payment_network ||
                                'Not specified'}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">
                              Transaction Reference
                            </p>

                            <p className="font-bold text-gray-900">
                              {payment.transaction_ref ||
                                'Not provided'}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">
                              Amount
                            </p>

                            <p className="font-bold text-green-700">
                              UGX{' '}
                              {Number(
                                payment.amount ||
                                  200000
                              ).toLocaleString()}
                            </p>
                          </div>

                        </div>

                        <div className="flex flex-col justify-center gap-3">

                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <p className="text-sm text-yellow-800 font-semibold">
                              Verify the Mobile Money transaction
                              before approving.
                            </p>
                          </div>

                          {existingLicense ? (
                            <button
                              type="button"
                              disabled={
                                processingId ===
                                payment.id
                              }
                              onClick={() =>
                                runAction(
                                  payment,
                                  'renew'
                                )
                              }
                              className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50"
                            >
                              <CalendarDays className="w-5 h-5" />

                              {processingId ===
                              payment.id
                                ? 'PROCESSING...'
                                : 'RENEW FOR 1 YEAR'}
                            </button>
                          ) : (
                            <button
                              type="button"
                              disabled={
                                processingId ===
                                payment.id
                              }
                              onClick={() =>
                                runAction(
                                  payment,
                                  'activate'
                                )
                              }
                              className="w-full flex items-center justify-center gap-2 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 disabled:opacity-50"
                            >
                              <ShieldCheck className="w-5 h-5" />

                              {processingId ===
                              payment.id
                                ? 'PROCESSING...'
                                : 'ACTIVATE FOR 1 YEAR'}
                            </button>
                          )}

                        </div>

                      </div>
                    </div>
                  );
                }
              )}

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

              {completedPayments.map(
                (payment) => (
                  <div
                    key={payment.id}
                    className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >

                    <div>
                      <p className="font-bold text-gray-900">
                        {payment.full_name ||
                          'Customer'}
                      </p>

                      <p className="text-sm text-gray-500">
                        {payment.phone}
                      </p>

                      <p className="text-sm text-gray-500">
                        Ref:{' '}
                        {payment.transaction_ref}
                      </p>
                    </div>

                    <div className="text-left md:text-right">

                      <p className="font-bold text-green-700">
                        {payment.status ===
                        'renewed'
                          ? 'Renewed'
                          : 'Activated'}
                      </p>

                      {payment.access_end_date && (
                        <p className="text-sm text-gray-600">
                          Access until:{' '}
                          {new Date(
                            payment.access_end_date
                          ).toLocaleDateString()}
                        </p>
                      )}

                    </div>

                  </div>
                )
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
} 
