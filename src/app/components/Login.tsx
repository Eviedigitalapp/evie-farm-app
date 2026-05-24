import { useState } from 'react';
import { Sprout, Eye, EyeOff } from 'lucide-react';

export type UserRole = 'super-admin' | 'owner' | 'manager' | 'accountant' | 'sales' | 'worker';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
}

interface LoginProps {
  onLogin: (user: User) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [resetError, setResetError] = useState('');

  // Demo users for testing
  const demoUsers: User[] = [
    {
      id: 0,
      name: 'App Administrator',
      email: 'admin@eviedigital.com',
      password: 'admin123',
      role: 'super-admin'
    },
    {
      id: 1,
      name: 'Farm Owner',
      email: 'owner@farm.com',
      password: 'owner123',
      role: 'owner'
    },
    {
      id: 2,
      name: 'Farm Manager',
      email: 'manager@farm.com',
      password: 'manager123',
      role: 'manager'
    },
    {
      id: 3,
      name: 'Accountant',
      email: 'accountant@farm.com',
      password: 'accountant123',
      role: 'accountant'
    },
    {
      id: 4,
      name: 'Sales Officer',
      email: 'sales@farm.com',
      password: 'sales123',
      role: 'sales'
    },
    {
      id: 5,
      name: 'Farm Worker',
      email: 'worker@farm.com',
      password: 'worker123',
      role: 'worker'
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = demoUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (user) {
      onLogin(user);
    } else {
      setError('Invalid email or password');
    }
  };

  const quickLogin = (user: User) => {
    onLogin(user);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setResetError('');
    setResetMessage('');

    const user = demoUsers.find(u => u.email.toLowerCase() === resetEmail.toLowerCase());

    if (user) {
      // In production, this would send an email with reset link
      // For now, show the password directly (demo only)
      setResetMessage(`Password recovery for ${user.name}:\n\nYour password is: ${user.password}\n\nFor security, please change this password immediately after logging in.\n\nGo to: Settings → Change Password`);
    } else {
      setResetError('No account found with this email address');
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'super-admin': return 'bg-red-100 text-red-700';
      case 'owner': return 'bg-purple-100 text-purple-700';
      case 'manager': return 'bg-blue-100 text-blue-700';
      case 'accountant': return 'bg-green-100 text-green-700';
      case 'sales': return 'bg-orange-100 text-orange-700';
      case 'worker': return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-green-600 rounded-lg">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">Evie Digital Agribusiness</h1>
              <p className="text-gray-600">Farm Management System</p>
            </div>
          </div>

          <h2 className="font-semibold mb-2">Welcome Back</h2>
          <p className="text-gray-600 mb-6">Sign in to access your farm dashboard</p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
              className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Sign In
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setShowForgotPassword(true)}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Forgot Password?
            </button>
          </div>
        </div>

        {/* Demo Accounts */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="font-semibold mb-2">Demo Accounts</h2>
          <p className="text-gray-600 mb-6">Quick login with different user roles</p>

          <div className="space-y-3">
            {demoUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => quickLogin(user)}
                className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{user.name}</h3>
                  <span className={`px-2 py-1 rounded text-sm font-semibold ${getRoleBadgeColor(user.role)}`}>
                    {user.role.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-1">{user.email}</p>
                <p className="text-gray-500 text-sm">Password: {user.password}</p>
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Role Permissions:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li><strong>Super Admin:</strong> Manage all farms, support, analytics</li>
              <li><strong>Owner:</strong> Full access to everything</li>
              <li><strong>Manager:</strong> Operations, staff, livestock, crops</li>
              <li><strong>Accountant:</strong> Financials, reports, expenses</li>
              <li><strong>Sales:</strong> Sales, income, customer records</li>
              <li><strong>Worker:</strong> Daily tasks, check-in/out only</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="font-semibold mb-2">Forgot Password?</h2>
            <p className="text-gray-600 mb-4">Enter your email address and we'll help you recover your password</p>

            {resetError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {resetError}
              </div>
            )}

            {resetMessage && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-900 whitespace-pre-line font-semibold">{resetMessage}</p>
              </div>
            )}

            {!resetMessage && (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Recover Password
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(false);
                      setResetEmail('');
                      setResetError('');
                      setResetMessage('');
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {resetMessage && (
              <button
                onClick={() => {
                  setShowForgotPassword(false);
                  setResetEmail('');
                  setResetError('');
                  setResetMessage('');
                }}
                className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Back to Login
              </button>
            )}

            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> In production, a password reset link would be sent to your email. For this demo, your password is displayed directly.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
