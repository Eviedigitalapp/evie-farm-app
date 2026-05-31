import { useState } from 'react';
import { CreditCard, Smartphone, CheckCircle, XCircle, Loader, ArrowLeft } from 'lucide-react';
import type { Subscription, Payment, PaymentMethod } from '../types/commercial';

interface PaymentPageProps {
  subscription: Subscription;
  userPhone: string;
  userEmail: string;
  userFullName: string;
  onBack: () => void;
  onSuccess: () => void;
}

export function PaymentPage({ subscription, userPhone, userEmail, userFullName, onBack, onSuccess }: PaymentPageProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mtn-mobile-money');
  const [phoneNumber, setPhoneNumber] = useState(userPhone);
  const [processing, setProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pending' | 'success' | 'failed'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // PesaPal API Configuration from environment variables
  const PESAPAL_CONSUMER_KEY = import.meta.env.VITE_PESAPAL_CONSUMER_KEY || '';
  const PESAPAL_CONSUMER_SECRET = import.meta.env.VITE_PESAPAL_CONSUMER_SECRET || '';
  const PESAPAL_MODE = import.meta.env.VITE_PESAPAL_MODE || 'live'; // 'sandbox' or 'live'
  const PESAPAL_IPN_ID = import.meta.env.VITE_PESAPAL_IPN_ID || ''; // Optional callback ID

  const handlePayment = async () => {
    setProcessing(true);
    setPaymentStatus('pending');
    setErrorMessage('');

    // Validate phone number
    if (!phoneNumber || phoneNumber.length < 10) {
      setErrorMessage('Please enter a valid phone number');
      setProcessing(false);
      setPaymentStatus('failed');
      return;
    }

    // Create payment record
    const payment: Payment = {
      id: `payment_${Date.now()}`,
      subscriptionId: subscription.id,
      userId: subscription.userId,
      amount: subscription.planAmount,
      currency: subscription.currency,
      status: 'pending',
      paymentMethod: paymentMethod,
      phoneNumber: phoneNumber,
      createdAt: new Date().toISOString()
    };

    // Save payment to localStorage
    const paymentsData = localStorage.getItem('evie_payments');
    const payments: Payment[] = paymentsData ? JSON.parse(paymentsData) : [];
    payments.push(payment);
    localStorage.setItem('evie_payments', JSON.stringify(payments));

    // Call backend to initiate PesaPal payment (avoids CORS issues)
    try {
      console.log('Initiating PesaPal payment via backend...');

      const response = await fetch(
        `https://scykjqlxmntepotaogyy.supabase.co/functions/v1/hyper-handler/pesapal/initiate`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjeWtqcWx4bW50ZXBvdGFvZ3l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0MDYyODEsImV4cCI6MjA5NDk4MjI4MX0.6Q1Ud5awuqCj60ycaWWn_kwGBy68MB4vvzr1za2AtOs`
          },
          body: JSON.stringify({
            amount: payment.amount,
            currency: payment.currency,
            description: 'Evie Farm Subscription',
            phoneNumber: phoneNumber,
            email: userEmail || 'user@eviefarm.com',
            firstName: userFullName?.split(' ')[0] || 'Farmer',
            lastName: userFullName?.split(' ')[1] || 'User',
            orderId: payment.id
          })
        }
      );

      const result = await response.json();
      console.log('Backend response:', result);

      if (result.success && result.redirect_url) {
        // Save PesaPal reference
        payment.pesapalRef = result.order_tracking_id;
        const updatedPayments = payments.map(p => p.id === payment.id ? payment : p);
        localStorage.setItem('evie_payments', JSON.stringify(updatedPayments));

        console.log('Redirecting to PesaPal:', result.redirect_url);
        // Redirect user to PesaPal for payment
        window.location.href = result.redirect_url;
      } else {
        throw new Error(result.error || 'Payment initiation failed');
      }
    } catch (error: any) {
      setPaymentStatus('failed');
      setErrorMessage(error.message || 'Payment failed. Please try again.');
      payment.status = 'failed';
      setProcessing(false);

      const updatedPayments = payments.map(p => p.id === payment.id ? payment : p);
      localStorage.setItem('evie_payments', JSON.stringify(updatedPayments));
    }

    // DEMO MODE DISABLED - Real PesaPal integration is active
    /*
    // DEMO MODE: Simulate successful payment after 3 seconds
    setTimeout(() => {
      // Update payment status
      payment.status = 'successful';
      payment.completedAt = new Date().toISOString();
      payment.transactionRef = `DEMO_${Date.now()}`;

      const updatedPayments = payments.map(p => p.id === payment.id ? payment : p);
      localStorage.setItem('evie_payments', JSON.stringify(updatedPayments));

      // Update subscription to active
      const subscriptionsData = localStorage.getItem('evie_subscriptions');
      const subscriptions: Subscription[] = subscriptionsData ? JSON.parse(subscriptionsData) : [];
      const subIndex = subscriptions.findIndex(s => s.id === subscription.id);

      if (subIndex !== -1) {
        const now = new Date();
        const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

        subscriptions[subIndex] = {
          ...subscriptions[subIndex],
          status: 'active',
          lastPaymentDate: now.toISOString(),
          nextPaymentDate: nextMonth.toISOString(),
          currentPeriodStart: now.toISOString(),
          currentPeriodEnd: nextMonth.toISOString(),
          paymentMethod: paymentMethod
        };

        localStorage.setItem('evie_subscriptions', JSON.stringify(subscriptions));
      }

      setPaymentStatus('success');
      setProcessing(false);

      setTimeout(() => {
        onSuccess();
      }, 2000);
    }, 3000);
    */
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscribe to Evie Farm</h1>
          <p className="text-lg text-gray-600">Continue managing your farm with full access</p>
        </div>

        {/* Payment Status */}
        {paymentStatus === 'success' && (
          <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 mb-6 flex items-center gap-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
            <div>
              <h3 className="text-xl font-bold text-green-900">Payment Successful!</h3>
              <p className="text-green-700">Your subscription is now active. Redirecting...</p>
            </div>
          </div>
        )}

        {paymentStatus === 'failed' && (
          <div className="bg-red-50 border-2 border-red-500 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-4 mb-2">
              <XCircle className="w-8 h-8 text-red-600" />
              <h3 className="text-xl font-bold text-red-900">Payment Failed</h3>
            </div>
            <p className="text-red-700">{errorMessage || 'Please try again or contact support.'}</p>
          </div>
        )}

        {/* Pricing Card */}
        <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg shadow-xl p-8 text-white mb-6">
          <h2 className="text-2xl font-bold mb-4">Premium Plan</h2>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-5xl font-bold">UGX 40,000</span>
            <span className="text-xl">/month</span>
          </div>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Unlimited farms and staff
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Crop & livestock management
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Financial tracking & reports
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Offline access
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Mobile Money payments
            </li>
          </ul>
        </div>

        {/* Payment Form */}
        {paymentStatus !== 'success' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Choose Payment Method</h3>

            {/* Payment Method Selection */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => setPaymentMethod('mtn-mobile-money')}
                className={`w-full p-4 border-2 rounded-lg flex items-center justify-between transition-all ${
                  paymentMethod === 'mtn-mobile-money'
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Smartphone className="w-6 h-6 text-yellow-600" />
                  <div className="text-left">
                    <p className="font-bold text-gray-900">MTN Mobile Money</p>
                    <p className="text-sm text-gray-600">Pay with MTN MoMo</p>
                  </div>
                </div>
                {paymentMethod === 'mtn-mobile-money' && (
                  <CheckCircle className="w-6 h-6 text-yellow-600" />
                )}
              </button>

              <button
                onClick={() => setPaymentMethod('airtel-money')}
                className={`w-full p-4 border-2 rounded-lg flex items-center justify-between transition-all ${
                  paymentMethod === 'airtel-money'
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Smartphone className="w-6 h-6 text-red-600" />
                  <div className="text-left">
                    <p className="font-bold text-gray-900">Airtel Money</p>
                    <p className="text-sm text-gray-600">Pay with Airtel Money</p>
                  </div>
                </div>
                {paymentMethod === 'airtel-money' && (
                  <CheckCircle className="w-6 h-6 text-red-600" />
                )}
              </button>
            </div>

            {/* Phone Number Input */}
            <div className="mb-6">
              <label className="block text-base font-bold text-gray-700 mb-2">
                {paymentMethod === 'mtn-mobile-money' ? 'MTN' : 'Airtel'} Mobile Money Number
              </label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  placeholder="+256 700 123 456"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 min-h-[48px] border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                You'll receive a prompt on your phone to authorize the payment
              </p>
            </div>

            {/* PesaPal Active Notice */}
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 mb-6">
              <p className="text-sm font-semibold text-green-900 mb-2">
                ✅ PesaPal Integration Active
              </p>
              <p className="text-sm text-green-800">
                Real Mobile Money payments are now enabled. You'll be redirected to PesaPal to complete your payment securely. Enter your MTN or Airtel number and you'll receive a payment prompt on your phone.
              </p>
            </div>

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              disabled={processing || !phoneNumber}
              className={`w-full px-6 py-4 min-h-[56px] rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-3 ${
                processing || !phoneNumber
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700 shadow-lg'
              }`}
            >
              {processing ? (
                <>
                  <Loader className="w-6 h-6 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <CreditCard className="w-6 h-6" />
                  Pay UGX 40,000
                </>
              )}
            </button>

            <p className="text-xs text-center text-gray-500 mt-4">
              Secure payment powered by PesaPal
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
