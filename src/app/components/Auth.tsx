import { useState } from 'react';
import { Sprout, Eye, EyeOff, CheckCircle, Smartphone, Mail, User as UserIcon } from 'lucide-react';
import type { User, Subscription, Farm } from '../types/commercial';
import { signUp, signIn } from '../../utils/supabaseClient';

interface AuthProps {
  onAuthenticated: (user: User, subscription: Subscription, farm: Farm) => void;
}

export function Auth({ onAuthenticated }: AuthProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Registration form
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regFarmName, setRegFarmName] = useState('');
  const [regFarmLocation, setRegFarmLocation] = useState('');
  const [regFarmSize, setRegFarmSize] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const { session, user: supabaseUser } = await signIn(loginEmail, loginPassword);

      if (!session || !supabaseUser) {
        setError('Invalid email or password');
        return;
      }

      // Create user object from Supabase user
      const user: User = {
        id: supabaseUser.id,
        email: supabaseUser.email!,
        phone: supabaseUser.user_metadata.phone || '',
        fullName: supabaseUser.user_metadata.name || supabaseUser.email!.split('@')[0],
        password: '',
        farmIds: [supabaseUser.user_metadata.farmId || `farm_${supabaseUser.id}`],
        createdAt: supabaseUser.created_at
      };

      // Create farm object
      const farm: Farm = {
        id: supabaseUser.user_metadata.farmId || `farm_${supabaseUser.id}`,
        name: supabaseUser.user_metadata.farmName || 'My Farm',
        ownerId: supabaseUser.id,
        location: supabaseUser.user_metadata.farmLocation || 'Uganda',
        size: supabaseUser.user_metadata.farmSize || 'Not specified',
        createdAt: supabaseUser.created_at
      };

      // Create subscription object (trial for now)
      const now = new Date();
      const trialEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      const subscription: Subscription = {
        id: `sub_${supabaseUser.id}`,
        userId: supabaseUser.id,
        farmId: farm.id,
        status: 'trial',
        planAmount: 40000,
        currency: 'UGX',
        trialStartDate: now.toISOString(),
        trialEndDate: trialEnd.toISOString(),
        currentPeriodStart: now.toISOString(),
        currentPeriodEnd: trialEnd.toISOString(),
        createdAt: supabaseUser.created_at
      };

      setSuccess('Login successful!');
      setTimeout(() => {
        onAuthenticated(user, subscription, farm);
      }, 500);
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!regFullName || !regEmail || !regPhone || !regPassword || !regFarmName || !regFarmLocation) {
      setError('Please fill in all required fields');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (regPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!regPhone.match(/^[\d\s\+\-\(\)]+$/)) {
      setError('Please enter a valid phone number');
      return;
    }

    try {
      const farmId = `farm_${Date.now()}`;

      // Create user in Supabase
      const { user: supabaseUser } = await signUp(
        regEmail,
        regPassword,
        regFullName,
        regFarmName
      );

      if (!supabaseUser) {
        setError('Failed to create account');
        return;
      }

      // Create user object
      const newUser: User = {
        id: supabaseUser.id,
        email: regEmail.toLowerCase(),
        phone: regPhone,
        fullName: regFullName,
        password: '',
        farmIds: [farmId],
        createdAt: new Date().toISOString()
      };

      // Create farm
      const newFarm: Farm = {
        id: farmId,
        name: regFarmName,
        ownerId: supabaseUser.id,
        location: regFarmLocation,
        size: regFarmSize || 'Not specified',
        createdAt: new Date().toISOString()
      };

      // Create 7-day free trial subscription
      const now = new Date();
      const trialEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      const newSubscription: Subscription = {
        id: `sub_${Date.now()}`,
        userId: supabaseUser.id,
        farmId: newFarm.id,
        status: 'trial',
        planAmount: 40000,
        currency: 'UGX',
        trialStartDate: now.toISOString(),
        trialEndDate: trialEnd.toISOString(),
        currentPeriodStart: now.toISOString(),
        currentPeriodEnd: trialEnd.toISOString(),
        createdAt: now.toISOString()
      };

      setSuccess('Account created successfully! Starting your 7-day free trial...');

      setTimeout(() => {
        onAuthenticated(newUser, newSubscription, newFarm);
      }, 1500);
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Failed to create account. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-lg mb-4">
            <div className="p-3 bg-green-600 rounded-xl">
              <Sprout className="w-10 h-10 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-gray-900">Evie Farm</h1>
              <p className="text-sm text-gray-600">Digital Agribusiness</p>
            </div>
          </div>
          <p className="text-white text-lg font-semibold">
            {mode === 'login' ? 'Welcome back!' : 'Start your free 7-day trial'}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Mode Toggle */}
          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                mode === 'login'
                  ? 'bg-white text-green-600 shadow'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                mode === 'register'
                  ? 'bg-white text-green-600 shadow'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 font-semibold">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-semibold flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              {success}
            </div>
          )}

          {/* Login Form */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-base font-semibold text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 min-h-[48px] border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-base font-semibold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 min-h-[48px] border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 min-h-[56px] bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-bold text-lg shadow-lg"
              >
                Login
              </button>
            </form>
          )}

          {/* Registration Form */}
          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-base font-semibold text-gray-700 mb-2">Full Name *</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 min-h-[48px] border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-base font-semibold text-gray-700 mb-2">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 min-h-[48px] border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-base font-semibold text-gray-700 mb-2">Phone (MTN/Airtel) *</label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="+256 700 123 456"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 min-h-[48px] border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">For Mobile Money payments</p>
              </div>

              <div>
                <label className="block text-base font-semibold text-gray-700 mb-2">Password *</label>
                <input
                  type="password"
                  placeholder="At least 6 characters"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 min-h-[48px] border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-base font-semibold text-gray-700 mb-2">Confirm Password *</label>
                <input
                  type="password"
                  placeholder="Re-enter password"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 min-h-[48px] border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="border-t-2 border-gray-200 pt-4 mt-6">
                <h3 className="font-bold text-lg text-gray-900 mb-3">Farm Details</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2">Farm Name *</label>
                    <input
                      type="text"
                      placeholder="e.g., Green Valley Farm"
                      value={regFarmName}
                      onChange={(e) => setRegFarmName(e.target.value)}
                      required
                      className="w-full px-4 py-3 min-h-[48px] border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2">Location *</label>
                    <input
                      type="text"
                      placeholder="e.g., Kampala, Uganda"
                      value={regFarmLocation}
                      onChange={(e) => setRegFarmLocation(e.target.value)}
                      required
                      className="w-full px-4 py-3 min-h-[48px] border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-2">Farm Size (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g., 5 acres"
                      value={regFarmSize}
                      onChange={(e) => setRegFarmSize(e.target.value)}
                      className="w-full px-4 py-3 min-h-[48px] border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Free 7-Day Trial Included
                </h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>✓ Full access to all features</li>
                  <li>✓ No credit card required</li>
                  <li>✓ UGX 40,000/month after trial</li>
                  <li>✓ Cancel anytime</li>
                </ul>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 min-h-[56px] bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-bold text-lg shadow-lg"
              >
                Start Free Trial
              </button>

              <p className="text-xs text-center text-gray-500">
                By signing up, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-white">
          <p className="text-sm">
            Need help? Email: <a href="mailto:support@eviedigital.com" className="underline font-semibold">support@eviedigital.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
