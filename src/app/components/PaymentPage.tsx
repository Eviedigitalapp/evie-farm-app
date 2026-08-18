import { useState } from 'react';
import {
  Smartphone,
  CheckCircle,
  ArrowLeft,
  Copy,
  Clock,
  ShieldCheck
} from 'lucide-react';
import type { Subscription } from '../types/commercial';

interface PaymentPageProps {
  subscription: Subscription;
  userPhone: string;
  userEmail: string;
  userFullName: string;
  onBack: () => void;
  onSuccess: () => void;
}

const ACCESS_FEE = 200000;

const MTN_NUMBER = '0782016339';
const AIRTEL_NUMBER = '0704296938';

export function PaymentPage({
  subscription,
  userPhone,
  userEmail,
  userFullName,
  onBack
}: PaymentPageProps) {
  const [paymentMethod, setPaymentMethod] =
    useState<'mtn-mobile-money' | 'airtel-money'>('mtn-mobile-money');

  const [paymentPhone, setPaymentPhone] = useState(userPhone || '');
  const [transactionRef, setTransactionRef] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState('');

  const selectedNumber =
    paymentMethod === 'mtn-mobile-money'
      ? MTN_NUMBER
      : AIRTEL_NUMBER;

  const selectedNetwork =
    paymentMethod === 'mtn-mobile-money'
      ? 'MTN Mobile Money'
      : 'Airtel Money';

  const copyNumber = async (number: string, network: string) => {
    try {
      await navigator.clipboard.writeText(number);
      setCopied(network);

      setTimeout(() => {
        setCopied('');
      }, 2000);
    } catch {
      setCopied('');
    }
  };

  const handleSubmitPayment = () => {
    setErrorMessage('');

    if (!paymentPhone || paymentPhone.length < 10) {
      setErrorMessage('Please enter the phone number used to make the payment.');
      return;
    }

    if (!transactionRef.trim()) {
      setErrorMessage('Please enter your Mobile Money transaction reference.');
      return;
    }

    const payment = {
      id: `payment_${Date.now()}`,
      subscriptionId: subscription?.id,
      userId: subscription?.userId,
      fullName: userFullName,
      email: userEmail,
      phoneNumber: paymentPhone,
      amount: ACCESS_FEE,
      currency: 'UGX',
      paymentMethod,
      paymentNetwork: selectedNetwork,
      transactionRef: transactionRef.trim(),
      status: 'pending_activation',
      submittedAt: new Date().toISOString()
    };

    const storedPayments = JSON.parse(
      localStorage.getItem('evie_payments') || '[]'
    );

    storedPayments.push(payment);

    localStorage.setItem(
      'evie_payments',
      JSON.stringify(storedPayments)
    );

    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello EVIE. I have paid UGX 200,000 for 2 years access.

Name: ${userFullName || ''}
Phone: ${paymentPhone || ''}
Network: ${selectedNetwork}
Transaction Reference: ${transactionRef || ''}

Please verify my payment and activate my account.`
  );

  const whatsappUrl =
    `https://wa.me/256782016339?text=${whatsappMessage}`;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4">
        <div className="max-w-xl mx-auto py-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">

            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Payment Submitted
            </h1>

            <p className="text-gray-600 text-lg mb-6">
              Your payment information has been submitted to EVIE
              for verification.
            </p>

            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-5 text-left mb-6">
              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />

                <div>
                  <h3 className="font-bold text-yellow-900 mb-1">
                    Awaiting Owner Activation
                  </h3>

                  <p className="text-yellow-800 text-sm">
                    EVIE will verify your Mobile Money payment.
                    Your 2-year access period will start only when
                    your account is activated.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 text-left space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount</span>
                <span className="font-bold">
                  UGX {ACCESS_FEE.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Access period</span>
                <span className="font-bold">2 Years</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Network</span>
                <span className="font-bold">{selectedNetwork}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-600">
                  Transaction Ref
                </span>

                <span className="font-bold text-right">
                  {transactionRef}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>

                <span className="font-bold text-yellow-700">
                  Awaiting Activation
                </span>
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 mb-3"
            >
              💬 Notify EVIE on WhatsApp
            </a>

            <button
              onClick={onBack}
              className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200"
            >
              Back
            </button>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto py-8">

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Activate EVIE Agribusiness
          </h1>

          <p className="text-gray-600">
            Continue using EVIE after your 7-day free trial.
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl shadow-xl p-8 text-white mb-6">

          <p className="text-green-100 mb-2">
            EVIE Agribusiness Access
          </p>

          <div className="mb-3">
            <span className="text-5xl font-bold">
              UGX 200,000
            </span>
          </div>

          <p className="text-xl font-semibold mb-6">
            2 Years Full Access
          </p>

          <div className="space-y-3">

            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5" />
              <span>Full farm management access</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5" />
              <span>Crops and livestock management</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5" />
              <span>Financial records and reports</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5" />
              <span>Staff and worker management</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5" />
              <span>Renewable every 2 years</span>
            </div>

          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Pay by Mobile Money
          </h2>

          <p className="text-gray-600 mb-6">
            Choose your network and send UGX 200,000 to the
            number shown.
          </p>

          <div className="space-y-3 mb-6">

            <button
              onClick={() =>
                setPaymentMethod('mtn-mobile-money')
              }
              className={`w-full p-4 border-2 rounded-xl flex items-center justify-between ${
                paymentMethod === 'mtn-mobile-money'
                  ? 'border-yellow-500 bg-yellow-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">

                <Smartphone className="w-7 h-7 text-yellow-600" />

                <div className="text-left">
                  <p className="font-bold text-gray-900">
                    MTN Mobile Money
                  </p>

                  <p className="text-gray-600">
                    {MTN_NUMBER}
                  </p>
                </div>

              </div>

              {paymentMethod === 'mtn-mobile-money' &&
                <CheckCircle className="w-6 h-6 text-green-600" />
              }
            </button>

            <button
              onClick={() =>
                setPaymentMethod('airtel-money')
              }
              className={`w-full p-4 border-2 rounded-xl flex items-center justify-between ${
                paymentMethod === 'airtel-money'
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">

                <Smartphone className="w-7 h-7 text-red-600" />

                <div className="text-left">
                  <p className="font-bold text-gray-900">
                    Airtel Money
                  </p>

                  <p className="text-gray-600">
                    {AIRTEL_NUMBER}
                  </p>
                </div>

              </div>

              {paymentMethod === 'airtel-money' &&
                <CheckCircle className="w-6 h-6 text-green-600" />
              }
            </button>

          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">

            <p className="font-semibold text-blue-900 mb-2">
              Send UGX 200,000 to:
            </p>

            <div className="flex items-center justify-between">

              <div>
                <p className="font-bold text-lg text-blue-900">
                  {selectedNetwork}
                </p>

                <p className="text-2xl font-bold text-blue-900">
                  {selectedNumber}
                </p>
              </div>

              <button
                onClick={() =>
                  copyNumber(selectedNumber, selectedNetwork)
                }
                className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 rounded-lg font-semibold text-blue-700"
              >
                <Copy className="w-4 h-4" />

                {copied === selectedNetwork
                  ? 'Copied'
                  : 'Copy'}
              </button>

            </div>
          </div>

          <div className="space-y-4">

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Phone Number Used for Payment *
              </label>

              <input
                type="tel"
                value={paymentPhone}
                onChange={(e) =>
                  setPaymentPhone(e.target.value)
                }
                placeholder="+256 700 123 456"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Mobile Money Transaction Reference *
              </label>

              <input
                type="text"
                value={transactionRef}
                onChange={(e) =>
                  setTransactionRef(e.target.value)
                }
                placeholder="Enter transaction reference"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <p className="text-sm text-gray-500 mt-2">
                You can find the transaction reference in the
                Mobile Money confirmation SMS.
              </p>
            </div>

          </div>

          {errorMessage && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {errorMessage}
            </div>
          )}

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-6 mb-6">

            <div className="flex gap-3">
              <ShieldCheck className="w-6 h-6 text-green-600 flex-shrink-0" />

              <div>
                <p className="font-bold text-green-900">
                  EVIE Owner Verification
                </p>

                <p className="text-sm text-green-800">
                  Submitting your payment does not immediately
                  activate the account. EVIE will verify the
                  payment first. Your 2-year access starts from
                  the date EVIE activates your account.
                </p>
              </div>
            </div>

          </div>

          <button
            onClick={handleSubmitPayment}
            className="w-full py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 shadow-lg"
          >
            Submit Payment for Activation
          </button>

        </div>
      </div>
    </div>
  );
}
