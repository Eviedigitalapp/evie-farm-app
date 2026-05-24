import { useState, useEffect } from 'react';
import { LayoutDashboard, Sprout, Beef, DollarSign, Menu, X, Users, Settings as SettingsIcon, LogOut, Shield, Sun } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { Crops } from './components/Crops';
import { Livestock } from './components/Livestock';
import { Money } from './components/Money';
import { People } from './components/People';
import { Settings } from './components/Settings';
import { SuperAdmin } from './components/SuperAdmin';
import { Login, User, UserRole } from './components/Login';

type View = 'super-admin' | 'dashboard' | 'crops' | 'livestock' | 'money' | 'people' | 'settings';

export default function App() {
  // Register service worker for offline support
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }, []);

  // High contrast mode for outdoor visibility
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

  // Default user for development - set to owner with full access
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: 1,
    name: 'Farm Owner',
    email: 'owner@farm.com',
    password: 'owner123',
    role: 'owner'
  });

  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Show login if not authenticated (uncomment when ready for production)
  // if (!currentUser) {
  //   return <Login onLogin={setCurrentUser} />;
  // }

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('dashboard');
  };

  const handleUpdatePassword = (newPassword: string) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        password: newPassword
      });
    }
  };

  // Role-based permissions
  const hasAccess = (view: View): boolean => {
    if (!currentUser) return false;
    const role = currentUser.role;

    const permissions: Record<UserRole, View[]> = {
      'super-admin': ['super-admin'],
      owner: ['dashboard', 'crops', 'livestock', 'money', 'people', 'settings'],
      manager: ['dashboard', 'crops', 'livestock', 'money', 'people'],
      accountant: ['dashboard', 'money', 'people'],
      sales: ['dashboard', 'crops', 'livestock', 'people'],
      worker: ['crops', 'livestock']
    };

    return permissions[role]?.includes(view) || false;
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'super-admin': return 'bg-red-600';
      case 'owner': return 'bg-purple-600';
      case 'manager': return 'bg-blue-600';
      case 'accountant': return 'bg-green-600';
      case 'sales': return 'bg-orange-600';
      case 'worker': return 'bg-gray-600';
    }
  };

  const allNavigation = [
    { id: 'super-admin' as View, label: 'Super Admin Panel', icon: Shield },
    { id: 'dashboard' as View, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'crops' as View, label: 'Crops', icon: Sprout },
    { id: 'livestock' as View, label: 'Livestock', icon: Beef },
    { id: 'money' as View, label: 'Money', icon: DollarSign },
    { id: 'people' as View, label: 'People', icon: Users },
    { id: 'settings' as View, label: 'Settings', icon: SettingsIcon },
  ];

  // Filter navigation based on user role
  const navigation = allNavigation.filter(item => hasAccess(item.id));

  const renderView = () => {
    // Don't redirect here - causes infinite loop
    // Just show dashboard if no access
    if (!hasAccess(currentView)) {
      return <Dashboard />;
    }

    switch (currentView) {
      case 'super-admin':
        return <SuperAdmin />;
      case 'dashboard':
        return <Dashboard />;
      case 'crops':
        return <Crops />;
      case 'livestock':
        return <Livestock />;
      case 'money':
        return <Money />;
      case 'people':
        return <People />;
      case 'settings':
        return <Settings currentUser={currentUser || undefined} onUpdatePassword={handleUpdatePassword} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-600 rounded-lg">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">Evie Digital Agribusiness</h1>
                <p className="text-gray-600">Farm Management System</p>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {currentUser && (
              <div className="hidden lg:flex items-center gap-3">
                <button
                  onClick={() => setHighContrast(!highContrast)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    highContrast
                      ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  title={highContrast ? 'Disable High Contrast' : 'Enable High Contrast for Sunlight'}
                >
                  <Sun className="w-5 h-5" />
                  <span className="text-sm font-semibold">Outdoor Mode</span>
                </button>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                  <div className={`w-8 h-8 ${getRoleBadgeColor(currentUser.role)} rounded-full flex items-center justify-center text-white font-semibold`}>
                    {currentUser.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{currentUser.name}</p>
                    <p className="text-gray-600 capitalize">{currentUser.role}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation - Desktop */}
        <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)] sticky top-16">
          <nav className="p-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-green-50 text-green-700 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-16 bg-white z-30 overflow-y-auto">
            <nav className="p-4 space-y-1">
              {/* User Info - Mobile */}
              {currentUser && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 ${getRoleBadgeColor(currentUser.role)} rounded-full flex items-center justify-center text-white font-semibold`}>
                      {currentUser.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{currentUser.name}</p>
                      <p className="text-gray-600 capitalize">{currentUser.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setHighContrast(!highContrast)}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors mb-2 ${
                      highContrast
                        ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    <Sun className="w-5 h-5" />
                    <span className="font-semibold">{highContrast ? 'Outdoor Mode ON' : 'Outdoor Mode OFF'}</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
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
                    onClick={() => {
                      setCurrentView(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-green-50 text-green-700 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
}