import { AlertCircle, CreditCard, CheckCircle, Clock } from 'lucide-react';
import { Subscription, getTrialDaysRemaining, isSubscriptionActive } from '../types/commercial';

interface SubscriptionBannerProps {
  subscription: Subscription;
  onUpgrade: () => void;
}

export function SubscriptionBanner({ subscription, onUpgrade }: SubscriptionBannerProps) {
  const isActive = isSubscriptionActive(subscription);
  const daysRemaining = getTrialDaysRemaining(subscription);

  // Trial active - show countdown
  if (subscription.status === 'trial' && isActive) {
    const urgency = daysRemaining <= 2 ? 'urgent' : daysRemaining <= 4 ? 'warning' : 'info';

    return (
      <div className={`border-b-4 ${
        urgency === 'urgent' ? 'bg-red-50 border-red-500' :
        urgency === 'warning' ? 'bg-yellow-50 border-yellow-500' :
        'bg-blue-50 border-blue-500'
      } px-4 py-3`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Clock className={`w-6 h-6 ${
              urgency === 'urgent' ? 'text-red-600' :
              urgency === 'warning' ? 'text-yellow-600' :
              'text-blue-600'
            }`} />
            <div>
              <p className={`font-bold text-lg ${
                urgency === 'urgent' ? 'text-red-900' :
                urgency === 'warning' ? 'text-yellow-900' :
                'text-blue-900'
              }`}>
                {daysRemaining} {daysRemaining === 1 ? 'Day' : 'Days'} Left in Your Free Trial
              </p>
              <p className={`text-sm ${
                urgency === 'urgent' ? 'text-red-700' :
                urgency === 'warning' ? 'text-yellow-700' :
                'text-blue-700'
              }`}>
                Subscribe now for only UGX 40,000/month to continue using all features
              </p>
            </div>
          </div>
          <button
            onClick={onUpgrade}
            className={`px-6 py-3 min-h-[48px] rounded-lg font-bold transition-colors ${
              urgency === 'urgent' ? 'bg-red-600 hover:bg-red-700' :
              urgency === 'warning' ? 'bg-yellow-600 hover:bg-yellow-700' :
              'bg-blue-600 hover:bg-blue-700'
            } text-white shadow-lg flex items-center gap-2`}
          >
            <CreditCard className="w-5 h-5" />
            Subscribe Now
          </button>
        </div>
      </div>
    );
  }

  // Trial expired
  if (subscription.status === 'trial' && !isActive) {
    return (
      <div className="bg-red-600 border-b-4 border-red-800 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-7 h-7 text-white" />
            <div>
              <p className="font-bold text-xl text-white">
                Your Free Trial Has Ended
              </p>
              <p className="text-sm text-red-100">
                Subscribe to continue managing your farm and accessing your data
              </p>
            </div>
          </div>
          <button
            onClick={onUpgrade}
            className="px-8 py-4 min-h-[56px] bg-white text-red-600 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2 text-lg"
          >
            <CreditCard className="w-6 h-6" />
            Subscribe - UGX 40,000/month
          </button>
        </div>
      </div>
    );
  }

  // Active subscription
  if (subscription.status === 'active' && isActive) {
    return (
      <div className="bg-green-50 border-b-2 border-green-200 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-green-800 font-semibold">
            Premium Active • Next payment: {new Date(subscription.nextPaymentDate!).toLocaleDateString()}
          </p>
        </div>
      </div>
    );
  }

  // Expired subscription
  if (subscription.status === 'expired' || subscription.status === 'cancelled') {
    return (
      <div className="bg-gray-600 border-b-4 border-gray-800 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-7 h-7 text-white" />
            <div>
              <p className="font-bold text-xl text-white">
                Subscription {subscription.status === 'cancelled' ? 'Cancelled' : 'Expired'}
              </p>
              <p className="text-sm text-gray-200">
                Renew your subscription to access your farm data
              </p>
            </div>
          </div>
          <button
            onClick={onUpgrade}
            className="px-8 py-4 min-h-[56px] bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2 text-lg"
          >
            <CreditCard className="w-6 h-6" />
            Renew Subscription
          </button>
        </div>
      </div>
    );
  }

  return null;
}
