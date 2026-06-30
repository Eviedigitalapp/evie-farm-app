import { useState, useEffect } from 'react';
import { LayoutDashboard, Sprout, Beef, DollarSign, Menu, X, Users, Settings as SettingsIcon, LogOut, Sun } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { Crops } from './components/Crops';
import { Livestock } from './components/Livestock';
import { Money } from './components/Money';
import { People } from './components/People';
import { Settings } from './components/Settings';
import { LandingPage } from './components/LandingPage';
import { Auth } from './components/Auth';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { PaymentNoticeBanner } from './components/PaymentNoticeBanner';
import type { User, License, Farm } from './types/commercial';
import { getSession, signOut } from '../utils/supabaseClient';

type View = 'dashboard' | 'crops' | 'livestock' | 'money' | 'people' | 'settings';
type AppMode = 'landing' | 'auth' | 'app';

export default function AppCommercial() {
  const [appMode, setAppMode] = useState<AppMode>('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentSubscription, setCurrentSubscription] = useState<License | null>(null);
  const [currentFarm, setCurrentFarm] = useState<Farm | null>(null);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [highContrast, setHighContrast] = useState(() => {
    const saved = localStorage.getItem('highContrast');
    return saved === 'true';
  });

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    localStorage.setItem('highContrast', String(highContrast));
  }, [highContrast]);

  useEffect(() => {
    if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const isPaymentReturn = urlParams.has('OrderTrackingId') || urlParams.has('OrderMerchantReference');
        if (isPaymentReturn) {
          setAppMode('app');
          return;
        }
        const session = await getSession();
        if (session && session.user) {
          const supabaseUser = session.user;
          const user: User = {
            id: supabaseUser.id,
            email: supabaseUser.email!,
            phone: supabaseUser.user_metadata.phone || '',
            fullName: supabaseUser.user_metadata.name || supabaseUser.email!.split('@')[0],
            password: '',
            farmIds: [supabaseUser.user_metadata.farmId || `farm_${supabaseUser.id}`],
            createdAt: supabaseUser.created_at
          };
          const farm: Farm = {
            id: supabaseUser.user_metadata.farmId || `farm_${supabaseUser.id}`,
            name: supabaseUser.user_metadata.farmName || 'My Farm',
            ownerId: supabaseUser.id,
            location: supabaseUser.user_metadata.farmLocation || 'Uganda',
            size: supabaseUser.user_metadata.farmSize || 'Not specified',
            createdAt: supabaseUser.created_at
          };
          const now = new Date();
          const trialEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
          const paidLicenses = JSON.parse(localStorage.getItem('evie_licenses') || '[]');
          const existingLicense = paidLicenses.find((l: License) => l.userId === supabaseUser.id);
          const subscription: License = existingLicense || {
            id: `lic_${supabaseUser.id}`,
            userId: supabaseUser.id,
            farmId: farm.id,
            status: 'trial',
            amount: 200000,
            planAmount: 200000,
            currency: 'UGX',
            trialEndDate: trialEnd.toISOString(),
            currentPeriodEnd: trialEnd.toISOString(),
            createdAt: supabaseUser.created_at
          };
          setCurrentUser(user);
          setCurrentSubscription(subscription);
          setCurrentFarm(farm);
          setAppMode('app');
        }
      } catch (error) {
        console.error('Session check error:', error);
      }
    };
    checkSession();
  }, []);

  const handleAuthenticated = (user: User, subscription: License, farm: Farm) => {
    setCurrentUser(user);
    setCurrentSubscription(subscription);
    setCurrentFarm(farm);
    setAppMode('app');
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
    setCurrentUser(null);
    setCurrentSubscription(null);
    setCurrentFarm(null);
    setAppMode('landing');
    setCurrentView('dashboard');
  };

  if (appMode === 'landing') {
    return <LandingPage onGetStarted={() => setAppMode('auth')} />;
  }

  if (appMode === 'auth') {
    return <Auth onAuthenticated={handleAuthenticated} />;
  }

  const navigation = [
    { id: 'dashboard' as View, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'crops' as View, label: 'Crops', icon: Sprout },
    { id: 'livestock' as View, label: 'Livestock', icon: Beef },
    { id: 'money' as View, label: 'Money', icon: DollarSign },
    { id: 'people' as View, label: 'People', icon: Users },
    { id: 'settings' as View, label: 'Settings', icon: SettingsIcon },
  ];

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'crops': return <Crops />;
      case 'livestock': return <Livestock />;
      case 'money': return <Money />;
      case 'people': return <People />;
      case 'settings': return <Settings currentUser={undefined} onUpdatePassword={() => {}} />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PaymentNoticeBanner />
      <PWAInstallBanner />

      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-600 rounded-lg">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">Evie Digital Agribusiness</h1>
                <p className="text-gray-600 text-sm">{currentFarm?.name || 'Farm Management'}</p>
              </div>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {currentUser && (
              <div className="hidden lg:flex items-center gap-3">
                <button
                  onClick={() => setHighContrast(!highContrast)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${highContrast ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  <Sun className="w-5 h-5" />
                  <span className="text-sm font-semibold">Outdoor Mode</span>
                </button>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {currentUser.fullName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{currentUser.fullName}</p>
                    <p className="text-gray-600 text-sm">Owner</p>
                  </div>
                </div>
                <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)] sticky top-16">
          <nav className="p-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-16 bg-white z-30 overflow-y-auto">
            <nav className="p-4 space-y-1">
              {currentUser && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {currentUser.fullName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{currentUser.fullName}</p>
                      <p className="text-gray-600 text-sm">Owner</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setHighContrast(!highContrast)}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors mb-2 ${highContrast ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                  >
                    <Sun className="w-5 h-5" />
                    <span className="font-semibold">{highContrast ? 'Outdoor Mode ON' : 'Outdoor Mode OFF'}</span>
                  </button>
                  <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { setCurrentView(item.id); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        )}

        <main className="flex-1 p-4 lg:p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
