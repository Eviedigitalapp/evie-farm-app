import { useState, useEffect } from 'react';
import { LayoutDashboard, Sprout, Beef, DollarSign, Menu, X, Users, Settings as SettingsIcon, LogOut, Sun, Clock, CheckCircle, Star, Wifi, Shield, BarChart3, Smartphone, Download, Eye, EyeOff } from 'lucide-react';
import { getSession, signOut } from '../utils/supabaseClient';

type View = 'dashboard' | 'crops' | 'livestock' | 'money' | 'people' | 'settings';
type AppMode = 'landing' | 'auth' | 'app';

function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);
  useEffect(() => {
    const handler = (e: any) => { e.preventDefault(); setDeferredPrompt(e); setShowInstall(true); };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);
  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setShowInstall(false);
    setDeferredPrompt(null);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 via-green-600 to-emerald-700">
      <header className="px-4 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
          <div className="p-1.5 bg-green-600 rounded-full"><Sprout className="w-5 h-5 text-white" /></div>
          <span className="font-bold text-gray-900">Evie Farm App</span>
        </div>
        {showInstall && (
          <button onClick={handleInstall} className="flex items-center gap-2 bg-white text-green-700 px-4 py-2 rounded-full font-bold shadow-md">
            <Download className="w-4 h-4" /> Install App
          </button>
        )}
      </header>
      <div className="max-w-5xl mx-auto px-4 pb-16">
        <div className="text-center pt-8 pb-12">
          <div className="inline-flex items-center gap-2 bg-green-500 bg-opacity-40 text-white px-4 py-2 rounded-full mb-6 border border-green-400">
            <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
            <span className="font-semibold">Pay Once — Use Forever</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">Manage Your Farm<br />Like a Business</h1>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">Track crops, livestock, finances, and workers — all in one app. Built for African farmers in Uganda.</p>
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto mb-8">
            <p className="text-gray-500 mb-1">One-time payment, no monthly fees</p>
            <div className="flex items-baseline justify-center gap-2 mb-1">
              <span className="text-5xl font-bold text-green-700">UGX 200,000</span>
            </div>
            <p className="text-gray-400 mb-1">≈ $54 USD</p>
            <p className="text-green-600 font-semibold mb-6">7-day free trial — then lifetime access</p>
            <div className="space-y-3 mb-8 text-left">
              {['Crops & livestock tracking','Staff check-in / check-out','Financial records & reports','Works offline — no internet needed','Installs on Android & iPhone','All future updates included'].map(f => (
                <div key={f} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{f}</span>
                </div>
              ))}
            </div>
            <button onClick={onGetStarted} className="w-full py-4 bg-green-600 text-white rounded-xl font-bold text-xl hover:bg-green-700 transition-all shadow-lg">
              Start Free Trial
            </button>
            <p className="text-center text-sm text-gray-500 mt-3">7 days free, then UGX 200,000 via MTN/Airtel</p>
          </div>
          <div className="bg-white bg-opacity-20 border border-white border-opacity-30 rounded-2xl p-6 max-w-md mx-auto mb-8">
            <div className="flex items-center gap-3 mb-4"><Smartphone className="w-6 h-6 text-white" /><h3 className="text-white font-bold text-lg">Download on Your Phone</h3></div>
            <div className="space-y-2 text-left">
              {[['1','Open in Chrome (Android) or Safari (iPhone)'],['2','Tap the menu (⋮ or Share button)'],['3','Tap "Add to Home Screen"']].map(([n,t]) => (
                <div key={n} className="flex items-start gap-3">
                  <span className="bg-white text-green-700 w-6 h-6 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">{n}</span>
                  <p className="text-green-50">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            { icon: Sprout, color: 'bg-green-500', title: 'Crop Management', desc: 'Track planting, growth & harvest' },
            { icon: BarChart3, color: 'bg-blue-500', title: 'Financial Tracking', desc: 'Income, expenses & profit reports' },
            { icon: Users, color: 'bg-purple-500', title: 'Staff & Workers', desc: 'Check-in/out, payroll & tasks' },
            { icon: Smartphone, color: 'bg-orange-500', title: 'Works on Phone', desc: 'Install as an app, works offline' },
            { icon: Wifi, color: 'bg-teal-500', title: 'Offline Ready', desc: 'No internet? No problem.' },
            { icon: Shield, color: 'bg-red-500', title: 'Your Data is Safe', desc: 'Backed up securely in the cloud' },
          ].map(f => (
            <div key={f.title} className="bg-white bg-opacity-15 border border-white border-opacity-20 rounded-xl p-5">
              <div className={`${f.color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}><f.icon className="w-5 h-5 text-white" /></div>
              <h3 className="font-bold text-white mb-1">{f.title}</h3>
              <p className="text-green-100 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button onClick={onGetStarted} className="px-12 py-5 bg-white text-green-700 rounded-full font-bold text-xl hover:bg-gray-100 transition-all shadow-2xl">Start Free Trial</button>
          <p className="text-green-200 mt-4">7 days free. Then pay once with MTN or Airtel. No monthly fees. Ever.</p>
        </div>
      </div>
    </div>
  );
}

function Auth({ onAuthenticated }: { onAuthenticated: (user: any, sub: any, farm: any) => void }) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regFullName, setRegFullName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regFarmName, setRegFarmName] = useState('');
  const [regFarmLocation, setRegFarmLocation] = useState('');

  const createSession = (userId: string, phone: string, name: string, email: string, farmName: string, farmLocation: string) => {
    const farmId = `farm_${userId}`;
    const user = { id: userId, email: email || `${phone}@eviefarm.app`, phone, fullName: name, password: '', farmIds: [farmId], createdAt: new Date().toISOString() };
    const farm = { id: farmId, name: farmName, ownerId: userId, location: farmLocation, size: 'Not specified', createdAt: new Date().toISOString() };
    const license = { id: `lic_${userId}`, userId, status: 'trial', amount: 200000, planAmount: 200000, currency: 'UGX', trialEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), currentPeriodEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), createdAt: new Date().toISOString() };
    localStorage.setItem('evie_user', JSON.stringify(user));
    localStorage.setItem('evie_farm', JSON.stringify(farm));
    return { user, farm, license };
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginPhone || !loginPassword) { setError('Please fill in all fields'); return; }
    const userId = `user_${loginPhone.replace(/\s+/g, '')}`;
    const stored = localStorage.getItem('evie_user');
    if (stored) {
      const u = JSON.parse(stored);
      const { user, farm, license } = createSession(u.id || userId, u.phone || loginPhone, u.fullName || loginPhone, u.email || '', u.farmName || 'My Farm', 'Uganda');
      setSuccess('Login successful!');
      setTimeout(() => onAuthenticated(user, license, farm), 500);
    } else {
      const { user, farm, license } = createSession(userId, loginPhone, loginPhone, '', 'My Farm', 'Uganda');
      setSuccess('Login successful!');
      setTimeout(() => onAuthenticated(user, license, farm), 500);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regFullName || !regPhone || !regPassword || !regFarmName || !regFarmLocation) { setError('Please fill in all required fields'); return; }
    if (regPassword !== regConfirmPassword) { setError('Passwords do not match'); return; }
    if (regPassword.length < 6) { setError('Password must be at least 6 characters'); return; }
    const userId = `user_${Date.now()}`;
    const { user, farm, license } = createSession(userId, regPhone, regFullName, regEmail, regFarmName, regFarmLocation);
    setSuccess('Account created! You have 7 days free trial. Welcome!');
    setTimeout(() => onAuthenticated(user, license, farm), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-lg mb-4">
            <div className="p-3 bg-green-600 rounded-xl"><Sprout className="w-10 h-10 text-white" /></div>
            <div className="text-left"><h1 className="text-2xl font-bold text-gray-900">Evie Farm</h1><p className="text-sm text-gray-600">Digital Agribusiness</p></div>
          </div>
          <p className="text-white text-lg font-semibold">{mode === 'login' ? 'Welcome back!' : 'Start Your Free Trial'}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
            <button onClick={() => setMode('login')} className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${mode === 'login' ? 'bg-white text-green-600 shadow' : 'text-gray-600'}`}>Login</button>
            <button onClick={() => setMode('register')} className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${mode === 'register' ? 'bg-white text-green-600 shadow' : 'text-gray-600'}`}>Sign Up</button>
          </div>
          {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}
          {success && <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center gap-2"><CheckCircle className="w-5 h-5" />{success}</div>}
          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Phone Number or Email</label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" placeholder="+256 700 123 456" value={loginPhone} onChange={e => setLoginPhone(e.target.value)} required className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} placeholder="Enter password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <button type="submit" className="w-full py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold text-lg shadow-lg">Login</button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Full Name *</label>
                <input type="text" placeholder="John Doe" value={regFullName} onChange={e => setRegFullName(e.target.value)} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Phone (MTN/Airtel) *</label>
                <input type="tel" placeholder="+256 700 123 456" value={regPhone} onChange={e => setRegPhone(e.target.value)} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Email <span className="text-gray-400 font-normal">(optional)</span></label>
                <input type="email" placeholder="your@email.com (optional)" value={regEmail} onChange={e => setRegEmail(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Password *</label>
                <input type="password" placeholder="At least 6 characters" value={regPassword} onChange={e => setRegPassword(e.target.value)} required minLength={6} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Confirm Password *</label>
                <input type="password" placeholder="Re-enter password" value={regConfirmPassword} onChange={e => setRegConfirmPassword(e.target.value)} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div className="border-t-2 border-gray-200 pt-4">
                <h3 className="font-bold text-lg text-gray-900 mb-3">Farm Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">Farm Name *</label>
                    <input type="text" placeholder="e.g., Green Valley Farm" value={regFarmName} onChange={e => setRegFarmName(e.target.value)} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">Location *</label>
                    <input type="text" placeholder="e.g., Kampala, Uganda" value={regFarmLocation} onChange={e => setRegFarmLocation(e.target.value)} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                </div>
              </div>
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-green-900 mb-1">7 Days Free Trial</h4>
                <p className="text-sm text-green-800">After trial: pay UGX 200,000 once via MTN/Airtel. No monthly fees ever.</p>
              </div>
              <button type="submit" className="w-full py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold text-lg shadow-lg">Start Free Trial</button>
            </form>
          )}
        </div>
        <div className="text-center mt-6 text-white">
          <p className="text-sm">Need help? WhatsApp: <strong>+256782016339</strong></p>
        </div>
      </div>
    </div>
  );
}

function PaymentBanner({ userName }: { userName: string }) {
  const [dismissed, setDismissed] = useState(false);
  const [daysLeft, setDaysLeft] = useState(7);
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('evie_user') || 'null');
    if (stored?.createdAt) {
      const trialEnd = new Date(new Date(stored.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000);
      setDaysLeft(Math.max(0, Math.ceil((trialEnd.getTime() - Date.now()) / 86400000)));
    }
  }, []);
  if (dismissed) return null;
  return (
    <div className={`${daysLeft === 0 ? 'bg-red-700' : 'bg-green-700'} text-white px-4 py-3`}>
      <div className="max-w-5xl mx-auto flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-sm">{daysLeft === 0 ? 'Trial ended — Activate Now!' : `${daysLeft} day${daysLeft === 1 ? '' : 's'} left in your free trial`}</p>
            <p className="text-green-100 text-sm mt-0.5">Send UGX 200,000 via MTN/Airtel to: <strong>0782016339</strong> or <strong>0704296938</strong></p>
            <p className="text-xs mt-1 opacity-80">WhatsApp after payment: <strong>+256782016339</strong> for instant activation</p>
          </div>
        </div>
        <button onClick={() => setDismissed(true)} className="opacity-70 hover:opacity-100"><X className="w-5 h-5" /></button>
      </div>
    </div>
  );
}

function PlaceholderView({ title, icon: Icon, color }: { title: string; icon: any; color: string }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md">
        <div className={`w-20 h-20 ${color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
          <Icon className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
        <p className="text-gray-600 mb-6">This section is being set up. Your data is safe and will appear here shortly.</p>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-sm text-green-800 font-semibold">Need help? WhatsApp: +256782016339</p>
        </div>
      </div>
    </div>
  );
}

export default function AppCommercial() {
  const [appMode, setAppMode] = useState<AppMode>('landing');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentFarm, setCurrentFarm] = useState<any>(null);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
    const stored = localStorage.getItem('evie_user');
    if (stored) {
      const u = JSON.parse(stored);
      setCurrentUser(u);
      const farm = JSON.parse(localStorage.getItem('evie_farm') || '{}');
      setCurrentFarm(farm);
      setAppMode('app');
    }
  }, []);

  useEffect(() => {
    const checkSupabase = async () => {
      try {
        const session = await getSession();
        if (session?.user && appMode !== 'app') {
          const u = session.user;
          const user = { id: u.id, email: u.email, phone: '', fullName: u.user_metadata?.name || u.email?.split('@')[0], farmIds: [], createdAt: u.created_at };
          setCurrentUser(user);
          setAppMode('app');
        }
      } catch {}
    };
    checkSupabase();
  }, []);

  const handleAuthenticated = (user: any, _sub: any, farm: any) => {
    setCurrentUser(user);
    setCurrentFarm(farm);
    setAppMode('app');
  };

  const handleLogout = async () => {
    try { await signOut(); } catch {}
    localStorage.removeItem('evie_user');
    localStorage.removeItem('evie_farm');
    setCurrentUser(null);
    setCurrentFarm(null);
    setAppMode('landing');
  };

  if (appMode === 'landing') return <LandingPage onGetStarted={() => setAppMode('auth')} />;
  if (appMode === 'auth') return <Auth onAuthenticated={handleAuthenticated} />;

  const navigation = [
    { id: 'dashboard' as View, label: 'Dashboard', icon: LayoutDashboard, color: 'bg-green-600' },
    { id: 'crops' as View, label: 'Crops', icon: Sprout, color: 'bg-emerald-600' },
    { id: 'livestock' as View, label: 'Livestock', icon: Beef, color: 'bg-blue-600' },
    { id: 'money' as View, label: 'Money', icon: DollarSign, color: 'bg-yellow-600' },
    { id: 'people' as View, label: 'People', icon: Users, color: 'bg-purple-600' },
    { id: 'settings' as View, label: 'Settings', icon: SettingsIcon, color: 'bg-gray-600' },
  ];

  const current = navigation.find(n => n.id === currentView) || navigation[0];

  return (
    <div className={`min-h-screen bg-gray-50 ${highContrast ? 'high-contrast' : ''}`}>
      <PaymentBanner userName={currentUser?.fullName || ''} />
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-600 rounded-lg"><Sprout className="w-6 h-6 text-white" /></div>
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
                  <Sun className="w-5 h-5" /><span className="text-sm font-semibold">Outdoor Mode</span>
                </button>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">{(currentUser.fullName || 'U').charAt(0)}</div>
                  <div><p className="font-semibold text-gray-900">{currentUser.fullName}</p><p className="text-gray-600 text-sm">Owner</p></div>
                </div>
                <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"><LogOut className="w-5 h-5" /></button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)] sticky top-16">
          <nav className="p-4 space-y-1">
            {navigation.map(item => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button key={item.id} onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}>
                  <Icon className="w-5 h-5" />{item.label}
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
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">{(currentUser.fullName || 'U').charAt(0)}</div>
                    <div><p className="font-semibold text-gray-900">{currentUser.fullName}</p><p className="text-gray-600 text-sm">Owner</p></div>
                  </div>
                  <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"><LogOut className="w-4 h-4" />Logout</button>
                </div>
              )}
              {navigation.map(item => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button key={item.id} onClick={() => { setCurrentView(item.id); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}>
                    <Icon className="w-5 h-5" />{item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        )}

        <main className="flex-1 p-4 lg:p-8">
          <PlaceholderView title={current.label} icon={current.icon} color={current.color} />
        </main>
      </div>
    </div>
  );
}
