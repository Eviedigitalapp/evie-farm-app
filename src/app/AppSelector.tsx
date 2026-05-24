import { useState } from 'react';
import { Sprout, Building2, Users, ArrowRight } from 'lucide-react';
import AppCommercial from './AppCommercial';
import App from './App';

type AppType = 'selector' | 'commercial' | 'demo';

export default function AppSelector() {
  const [selectedApp, setSelectedApp] = useState<AppType>('selector');

  // Show Commercial Platform
  if (selectedApp === 'commercial') {
    return <AppCommercial />;
  }

  // Show Demo/Free Version
  if (selectedApp === 'demo') {
    return <App />;
  }

  // App Selection Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-white rounded-full">
              <Sprout className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Evie Digital Agribusiness</h1>
          <p className="text-2xl text-green-100">Choose Your Platform</p>
        </div>

        {/* App Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Commercial Platform */}
          <button
            onClick={() => setSelectedApp('commercial')}
            className="bg-white rounded-2xl shadow-2xl p-8 text-left hover:shadow-3xl transform hover:scale-105 transition-all group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Commercial Platform</h2>
                <p className="text-green-600 font-semibold">For Business Farmers</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Multi-Farm Management</p>
                  <p className="text-gray-600">Manage multiple farms from one account</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Mobile Money Payments</p>
                  <p className="text-gray-600">Pay with MTN/Airtel Mobile Money</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                </div>
                <div>
                  <p className="font-bold text-gray-900">7-Day Free Trial</p>
                  <p className="text-gray-600">Try all features risk-free</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Cloud Sync & Backup</p>
                  <p className="text-gray-600">Your data safe in the cloud</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-4 mb-6">
              <p className="text-center">
                <span className="text-3xl font-bold text-green-700">UGX 40,000</span>
                <span className="text-gray-600">/month</span>
              </p>
              <p className="text-center text-sm text-green-600 font-semibold mt-1">
                After 7-day free trial
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-green-600 font-bold text-lg group-hover:gap-4 transition-all">
              <span>Start Free Trial</span>
              <ArrowRight className="w-6 h-6" />
            </div>
          </button>

          {/* Demo/Free Version */}
          <button
            onClick={() => setSelectedApp('demo')}
            className="bg-white rounded-2xl shadow-2xl p-8 text-left hover:shadow-3xl transform hover:scale-105 transition-all group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                <Users className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Demo Version</h2>
                <p className="text-blue-600 font-semibold">Free Testing Environment</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Full Feature Access</p>
                  <p className="text-gray-600">Test all farm management features</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Role-Based Access</p>
                  <p className="text-gray-600">Owner, Manager, Worker roles</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Local Storage Only</p>
                  <p className="text-gray-600">Data saved on your device</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <p className="font-bold text-gray-900">No Payment Required</p>
                  <p className="text-gray-600">Free forever, no subscriptions</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <p className="text-center">
                <span className="text-3xl font-bold text-blue-700">FREE</span>
              </p>
              <p className="text-center text-sm text-blue-600 font-semibold mt-1">
                No payment needed
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-blue-600 font-bold text-lg group-hover:gap-4 transition-all">
              <span>Try Demo Now</span>
              <ArrowRight className="w-6 h-6" />
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-white text-lg mb-2">
            Not sure which to choose?
          </p>
          <p className="text-green-100">
            Start with the <span className="font-bold">Commercial Platform's free trial</span> - no payment needed for 7 days!
          </p>
        </div>
      </div>
    </div>
  );
}
