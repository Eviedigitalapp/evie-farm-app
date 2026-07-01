import { useState, useEffect } from 'react';
import { LayoutDashboard, Sprout, Beef, DollarSign, Menu, X, Users, Settings as SettingsIcon, LogOut, Sun, Clock, Smartphone } from 'lucide-react';
import { Auth } from './components/Auth';
import { LandingPage } from './components/LandingPage';
import type { User, License, Farm } from './types/commercial';
import { getSession, signOut } from '../utils/supabaseClient';

type View = 'dashboard' | 'crops' | 'livestock' | 'money' | 'people' | 'settings';
type AppMode = 'landing' | 'auth' | 'app';

function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sprout className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">This section is loading...</p>
      </div>
    </div>
  );
}

function PaymentBanner({ user }: { user: User | null }) {
  const [dismissed, setDismissed] = useState(false);
  const [daysLeft, setDaysLeft] = useState(7);

  useEffect(() => {
    if (!user) return;
    const licenses = JSON.parse(localStorage.getItem('evie_licenses') || '[]');
    const paid = licenses.find((l: any) => l.userId === user.id && l.status === 'active');
    if (paid) { setDismissed(true); return; }
    const stored = JSON.parse(localStorage.getItem('evie_user') || 'null');
    if (stored?.createdAt) {
      const created = new Date(stored.createdAt);
      const trialEnd = new Date(created.getTime() + 7 * 24 * 60 * 60 * 1000);
      const diff = Math.ceil((trialEnd.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      setDaysLeft(Math.max(0, diff));
    }
  }, [user]);

  if (dismissed) return null;

  return (
    <div className={`${daysLeft === 0 ? 'bg-red-700' : 'bg-green-700'} text-white px-4 py-3`}>
      <div className="max-w-5xl mx-auto flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-sm">
              {daysLeft === 0 ? 'Trial ended — Activate Now' : `${daysLeft} day${daysLeft === 1 ? '' : 's'} left in your free trial`}
            </p>
            <p className="text-green-100 text-sm mt-0.5">
              Send UGX 200,000 via MTN/Airtel to: <strong>0782016339</strong> or <strong>0704296938</strong>
            </p>
            <p className="text-xs mt-1 opacity-80">WhatsApp after payment: <strong>+256782016339</strong> for instant activation</p>
          </div>
        </div>
        <button onClick={() => setDismissed(true)} className="opacity-70 hover:opacity-100 flex-shrink-0">
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default function AppCommercial() {
  const [appMode, setAppMode] = useState<AppMode>('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentFarm, setCurrentFarm] = useState<Farm | null>(null);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await getSession();
        if (session?.user) {
          const u = session.user;
          const user: User = {
            id: u.id, email: u.email!, phone: u.user_metadata.phone || '',
            fullName: u.user_metadata.name || u.email!.split('@')[0],
            password: '', farmIds: [`farm_${u.id}`], createdAt: u.created_at
          };
          const farm: Farm = {
            id: `farm_${u.id}`, name: u.user_metadata.farmName || 'My Farm',
            ownerId: u.id, location: 'Uganda', size: 'Not specified', createdAt: u.created_at
          };
          setCurrentUser(user);
          setCurrentFarm(farm);
          setAppMode('app');
        }
      } catch {}
    };
    checkSession();
  }, []);

  const handleAuthenticated = (user: User, _sub: License, farm: Farm) => {
    setCurrentUser(user);
    setCurrentFarm(farm);
    setAppMode('app');
  };

  const handleLogout = async () => {
    try { await signOut(); } catch {}
    setCurrentUser(null);
    setCurrentFarm(null);
    setAppMode('landing');
  };

  if (appMode === 'landing') return <LandingPage onGetStarted={() => setAppMode('auth')} />;
  if (appMode === 'auth') return <Auth onAuthenticated={handleAuthenticated} />;

  const navigation = [
    { id: 'dashboard' as View, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'crops' as View, label: 'Crops', icon: Sprout },
    { id: 'livestock' as View, label: 'Livestock', icon: Beef },
    { id: 'money' as View, label: 'Money', icon: DollarSign },
    { id: 'people' as View, label: 'People', icon: Users },
    { id: 'settings' as View, label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PaymentBanner user={currentUser} />

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
                <button onClick={() => setHighContrast(!highContrast)} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${highContrast ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
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
                <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
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
                <button key={item.id} onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}>
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
                  <button key={item.id} onClick={() => { setCurrentView(item.id); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}>
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        )}

        <main className="flex-1 p-4 lg:p-8">
          <ComingSoon title={navigation.find(n => n.id === currentView)?.label || 'Dashboard'} />
        </main>
      </div>
    </div>
  );
}
