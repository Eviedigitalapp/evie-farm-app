// Commercial Platform Types

export type SubscriptionStatus = 'trial' | 'active' | 'expired' | 'cancelled';
export type PaymentMethod = 'mtn-mobile-money' | 'airtel-money' | 'bank-transfer';

export interface Farm {
  id: string;
  name: string;
  ownerId: string;
  location: string;
  size: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  phone: string;
  fullName: string;
  password: string;
  farmIds: string[];
  createdAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  farmId: string;
  status: SubscriptionStatus;
  planAmount: number; // UGX 40,000
  currency: string; // 'UGX'
  trialStartDate: string;
  trialEndDate: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  paymentMethod?: PaymentMethod;
  lastPaymentDate?: string;
  nextPaymentDate?: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  subscriptionId: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'successful' | 'failed';
  paymentMethod: PaymentMethod;
  transactionRef?: string;
  pesapalRef?: string; // PesaPal order tracking ID
  pesapalMerchantRef?: string; // PesaPal merchant reference
  phoneNumber?: string;
  createdAt: string;
  completedAt?: string;
}

// Helper functions
export function isTrialActive(subscription: Subscription): boolean {
  if (subscription.status !== 'trial') return false;
  const now = new Date();
  const trialEnd = new Date(subscription.trialEndDate);
  return now < trialEnd;
}

export function getTrialDaysRemaining(subscription: Subscription): number {
  const now = new Date();
  const trialEnd = new Date(subscription.trialEndDate);
  const diffTime = trialEnd.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

export function isSubscriptionActive(subscription: Subscription): boolean {
  if (subscription.status === 'trial') {
    return isTrialActive(subscription);
  }
  if (subscription.status === 'active') {
    const now = new Date();
    const periodEnd = new Date(subscription.currentPeriodEnd);
    return now < periodEnd;
  }
  return false;
}
