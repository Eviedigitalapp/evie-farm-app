import { useState, useEffect } from 'react';
import { LayoutDashboard, Sprout, Beef, DollarSign, Menu, X, Users, Settings as SettingsIcon, LogOut, Sun, Clock, CheckCircle, Star, Wifi, Shield, BarChart3, Smartphone, Download, Eye, EyeOff, Plus, Trash2, Edit, TrendingUp, TrendingDown, AlertCircle, Heart } from 'lucide-react';
import { getSession, signOut } from '../utils/supabaseClient';

type View = 'dashboard' | 'crops' | 'livestock' | 'money' | 'people' | 'settings';
type AppMode = 'landing' | 'auth' | 'app';

// ============ LANDING PAGE ============
function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);
  useEffect(() => {
    const handler = (e: any) => { e.preventDefault(); setDeferredPrompt(e); setShowInstall(true); };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 via-green-600 to-emerald-700">
      <header className="px-4 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
          <div className="p-1.5 bg-green-600 rounded-full"><Sprout className="w-5 h-5 text-white" /></div>
          <span className="font-bold text-gray-900">Evie Farm App</span>
        </div>
        {showInstall && (
          <button onClick={async () => { deferredPrompt?.prompt(); setShowInstall(false); }} className="flex items-center gap-2 bg-white text-green-700 px-4 py-2 rounded-full font-bold shadow-md">
            <Download className="w-4 h-4" /> Install App
          </button>
        )}
      </header>
      <div className="max-w-5xl mx-auto px-4 pb-16">
        <div className="text-center pt-8 pb-12">
          <div className="inline-flex items-center gap-2 bg-green-500 bg-opacity-40 text-white px-4 py-2 rounded-full mb-6 border border-green-400">
            <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
            <span className="font-semibold">7 Days Free — Then Pay Once Forever</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">Manage Your Farm<br />Like a Business</h1>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">Track crops, livestock, finances, and workers — all in one app. Built for African farmers in Uganda.</p>
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto mb-8">
            <p className="text-gray-500 mb-1">One-time payment after 7-day free trial</p>
            <div className="flex items-baseline justify-center gap-2 mb-1">
              <span className="text-5xl font-bold text-green-700">UGX 200,000</span>
            </div>
            <p className="text-gray-400 mb-4">≈ $54 USD · Pay via MTN or Airtel Money</p>
            <div className="space-y-3 mb-6 text-left">
              {['Crops & livestock tracking','Staff check-in / check-out','Financial records & reports','Works offline — no internet needed','Installs on Android & iPhone','All future updates included'].map(f => (
                <div key={f} className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" /><span className="text-gray-700">{f}</span></div>
              ))}
            </div>
            <button onClick={onGetStarted} className="w-full py-4 bg-green-600 text-white rounded-xl font-bold text-xl hover:bg-green-700 transition-all shadow-lg">Start 7-Day Free Trial</button>
            <p className="text-center text-sm text-gray-500 mt-3">No payment needed to start. Try free for 7 days.</p>
          </div>
          <div className="bg-white bg-opacity-20 border border-white border-opacity-30 rounded-2xl p-6 max-w-md mx-auto mb-8">
            <div className="flex items-center gap-3 mb-4"><Smartphone className="w-6 h-6 text-white" /><h3 className="text-white font-bold text-lg">Install on Your Phone</h3></div>
            <div className="space-y-2 text-left">
              {[['1','Open in Chrome (Android) or Safari (iPhone)'],['2','Tap menu (⋮ or Share button)'],['3','Tap "Add to Home Screen"']].map(([n,t]) => (
                <div key={n} className="flex items-start gap-3">
                  <span className="bg-white text-green-700 w-6 h-6 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">{n}</span>
                  <p className="text-green-50">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[{icon:Sprout,color:'bg-green-500',title:'Crop Management',desc:'Track planting, growth & harvest'},{icon:BarChart3,color:'bg-blue-500',title:'Financial Tracking',desc:'Income, expenses & profit reports'},{icon:Users,color:'bg-purple-500',title:'Staff & Workers',desc:'Check-in/out, payroll & tasks'},{icon:Smartphone,color:'bg-orange-500',title:'Works on Phone',desc:'Install as app, works offline'},{icon:Wifi,color:'bg-teal-500',title:'Offline Ready',desc:'No internet? No problem.'},{icon:Shield,color:'bg-red-500',title:'Data Safe',desc:'Backed up securely in cloud'}].map(f => (
            <div key={f.title} className="bg-white bg-opacity-15 border border-white border-opacity-20 rounded-xl p-5">
              <div className={`${f.color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}><f.icon className="w-5 h-5 text-white" /></div>
              <h3 className="font-bold text-white mb-1">{f.title}</h3>
              <p className="text-green-100 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button onClick={onGetStarted} className="px-12 py-5 bg-white text-green-700 rounded-full font-bold text-xl hover:bg-gray-100 transition-all shadow-2xl">Start Free Trial Now</button>
          <p className="text-green-200 mt-4">7 days free. Then UGX 200,000 once. No monthly fees. Ever.</p>
        </div>
      </div>
    </div>
  );
}

// ============ AUTH ============
function Auth({ onAuthenticated }: { onAuthenticated: (user: any, sub: any, farm: any) => void }) {
  const [mode, setMode] = useState<'login'|'register'>('login');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');
  const [farmName, setFarmName] = useState('');
  const [farmLoc, setFarmLoc] = useState('');

  const makeSession = (userId: string, p: string, n: string, e: string, fn: string, fl: string) => {
    const farmId = `farm_${userId}`;
    const user = { id: userId, email: e || `${p.replace(/\s+/g,'')}@eviefarm.app`, phone: p, fullName: n, farmIds: [farmId], createdAt: new Date().toISOString() };
    const farm = { id: farmId, name: fn || 'My Farm', ownerId: userId, location: fl || 'Uganda', size: 'Not specified', createdAt: new Date().toISOString() };
    const license = { id: `lic_${userId}`, userId, status: 'trial', amount: 200000, planAmount: 200000, currency: 'UGX', trialEndDate: new Date(Date.now() + 7*24*60*60*1000).toISOString(), currentPeriodEnd: new Date(Date.now() + 7*24*60*60*1000).toISOString(), createdAt: new Date().toISOString() };
    localStorage.setItem('evie_user', JSON.stringify(user));
    localStorage.setItem('evie_farm', JSON.stringify(farm));
    return { user, farm, license };
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginPhone || !loginPass) { setError('Please fill in all fields'); return; }
    const stored = JSON.parse(localStorage.getItem('evie_user') || 'null');
    const userId = stored?.id || `user_${loginPhone.replace(/\s+/g,'')}`;
    const { user, farm, license } = makeSession(userId, stored?.phone || loginPhone, stored?.fullName || loginPhone, stored?.email || '', stored?.farmName || 'My Farm', 'Uganda');
    setSuccess('Login successful!');
    setTimeout(() => onAuthenticated(user, license, farm), 500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !pass || !farmName || !farmLoc) { setError('Please fill in all required fields'); return; }
    if (pass !== pass2) { setError('Passwords do not match'); return; }
    if (pass.length < 6) { setError('Password must be at least 6 characters'); return; }
    const userId = `user_${Date.now()}`;
    const { user, farm, license } = makeSession(userId, phone, name, email, farmName, farmLoc);
    setSuccess('Account created! Your 7-day free trial has started!');
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
            <button onClick={() => setMode('login')} className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${mode==='login'?'bg-white text-green-600 shadow':'text-gray-600'}`}>Login</button>
            <button onClick={() => setMode('register')} className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${mode==='register'?'bg-white text-green-600 shadow':'text-gray-600'}`}>Sign Up</button>
          </div>
          {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}
          {success && <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center gap-2 text-sm"><CheckCircle className="w-5 h-5" />{success}</div>}
          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div><label className="block font-semibold text-gray-700 mb-2">Phone or Email</label>
                <input type="text" placeholder="+256 700 123 456" value={loginPhone} onChange={e=>setLoginPhone(e.target.value)} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" /></div>
              <div><label className="block font-semibold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input type={showPass?'text':'password'} placeholder="Enter password" value={loginPass} onChange={e=>setLoginPass(e.target.value)} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                  <button type="button" onClick={()=>setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">{showPass?<EyeOff className="w-5 h-5"/>:<Eye className="w-5 h-5"/>}</button>
                </div></div>
              <button type="submit" className="w-full py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold text-lg shadow-lg">Login</button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div><label className="block font-semibold text-gray-700 mb-2">Full Name *</label><input type="text" placeholder="John Doe" value={name} onChange={e=>setName(e.target.value)} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" /></div>
              <div><label className="block font-semibold text-gray-700 mb-2">Phone (MTN/Airtel) *</label><input type="tel" placeholder="+256 700 123 456" value={phone} onChange={e=>setPhone(e.target.value)} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" /></div>
              <div><label className="block font-semibold text-gray-700 mb-2">Email <span className="text-gray-400 font-normal">(optional)</span></label><input type="email" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" /></div>
              <div><label className="block font-semibold text-gray-700 mb-2">Password *</label><input type="password" placeholder="At least 6 characters" value={pass} onChange={e=>setPass(e.target.value)} required minLength={6} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" /></div>
              <div><label className="block font-semibold text-gray-700 mb-2">Confirm Password *</label><input type="password" placeholder="Re-enter password" value={pass2} onChange={e=>setPass2(e.target.value)} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" /></div>
              <div className="border-t-2 border-gray-200 pt-4">
                <h3 className="font-bold text-lg text-gray-900 mb-3">Farm Details</h3>
                <div className="space-y-4">
                  <div><label className="block font-semibold text-gray-700 mb-2">Farm Name *</label><input type="text" placeholder="e.g., Green Valley Farm" value={farmName} onChange={e=>setFarmName(e.target.value)} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" /></div>
                  <div><label className="block font-semibold text-gray-700 mb-2">Location *</label><input type="text" placeholder="e.g., Kampala, Uganda" value={farmLoc} onChange={e=>setFarmLoc(e.target.value)} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" /></div>
                </div>
              </div>
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-green-900 mb-1">7 Days Free Trial</h4>
                <p className="text-sm text-green-800">Full access free for 7 days. After trial: pay UGX 200,000 once via MTN/Airtel. No monthly fees ever.</p>
              </div>
              <button type="submit" className="w-full py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold text-lg shadow-lg">Start Free Trial</button>
            </form>
          )}
        </div>
        <div className="text-center mt-6 text-white"><p className="text-sm">Need help? WhatsApp: <strong>+256782016339</strong></p></div>
      </div>
    </div>
  );
}

// ============ PAYMENT BANNER ============
function PaymentBanner({ user }: { user: any }) {
  const [dismissed, setDismissed] = useState(false);
  const [daysLeft, setDaysLeft] = useState(7);
  useEffect(() => {
    if (!user) return;
    const licenses = JSON.parse(localStorage.getItem('evie_licenses') || '[]');
    const paid = licenses.find((l: any) => l.userId === user.id && l.status === 'active');
    if (paid) { setDismissed(true); return; }
    if (user.createdAt) {
      const trialEnd = new Date(new Date(user.createdAt).getTime() + 7*24*60*60*1000);
      setDaysLeft(Math.max(0, Math.ceil((trialEnd.getTime() - Date.now()) / 86400000)));
    }
  }, [user]);
  if (dismissed) return null;
  const expired = daysLeft === 0;
  return (
    <div className={`${expired ? 'bg-red-700' : 'bg-green-700'} text-white px-4 py-3`}>
      <div className="max-w-5xl mx-auto flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-sm">{expired ? 'Trial ended — Activate Now!' : `${daysLeft} day${daysLeft===1?'':'s'} left in your free trial`}</p>
            <p className="text-green-100 text-sm mt-0.5">Send UGX 200,000 via MTN/Airtel to: <strong>0782016339</strong> or <strong>0704296938</strong></p>
            <p className="text-xs mt-1 opacity-80">WhatsApp after payment: <strong>+256782016339</strong> for instant activation</p>
          </div>
        </div>
        {!expired && <button onClick={() => setDismissed(true)} className="opacity-70 hover:opacity-100"><X className="w-5 h-5" /></button>}
      </div>
    </div>
  );
}

// ============ DASHBOARD ============
function Dashboard() {
  const stats = [
    { label: 'Total Crops', value: '7', icon: Sprout, color: 'bg-green-100 text-green-700', sub: '2 ready for harvest' },
    { label: 'Livestock', value: '244', icon: Beef, color: 'bg-blue-100 text-blue-700', sub: '6 groups' },
    { label: 'Monthly Income', value: 'UGX 1.0M', icon: TrendingUp, color: 'bg-emerald-100 text-emerald-700', sub: 'This month' },
    { label: 'Monthly Expenses', value: 'UGX 515K', icon: TrendingDown, color: 'bg-red-100 text-red-700', sub: 'This month' },
    { label: 'Net Profit', value: 'UGX 492K', icon: DollarSign, color: 'bg-yellow-100 text-yellow-700', sub: '48.9% margin' },
    { label: 'Pending Tasks', value: '5', icon: AlertCircle, color: 'bg-orange-100 text-orange-700', sub: '3 overdue' },
  ];
  const alerts = [
    { msg: 'Heavy rains expected — check drainage', level: 'high' },
    { msg: 'Coffee berry disease spotted — spray fungicide urgently', level: 'high' },
    { msg: 'Pig vaccination due next week', level: 'medium' },
    { msg: 'Feed stock running low — budget UGX 150,000', level: 'medium' },
  ];
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900">Farm Overview</h1><p className="text-gray-600">Welcome back! Here is what is happening on your farm today.</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${s.color}`}><s.icon className="w-5 h-5" /></div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="font-semibold text-gray-700">{s.label}</p>
            <p className="text-sm text-gray-500">{s.sub}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2"><AlertCircle className="w-5 h-5 text-orange-500" />Alerts & Notifications</h2>
        <div className="space-y-3">
          {alerts.map((a, i) => (
            <div key={i} className={`flex items-start gap-3 p-3 rounded-lg ${a.level==='high'?'bg-red-50 border border-red-200':'bg-orange-50 border border-orange-200'}`}>
              <AlertCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${a.level==='high'?'text-red-500':'text-orange-500'}`} />
              <p className="text-gray-700 text-sm">{a.msg}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2"><Heart className="w-5 h-5 text-pink-500" />Farm Health Score</h2>
        <div className="grid grid-cols-3 gap-4">
          {[{label:'Crops',score:90,color:'bg-green-600'},{label:'Livestock',score:94,color:'bg-blue-600'},{label:'Overall',score:92,color:'bg-purple-600'}].map(h => (
            <div key={h.label} className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-3xl font-bold text-gray-900">{h.score}%</p>
              <p className="font-semibold text-gray-700">{h.label}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2"><div className={`h-2 rounded-full ${h.color}`} style={{width:`${h.score}%`}} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ CROPS ============
function CropsView() {
  const [crops, setCrops] = useState(() => JSON.parse(localStorage.getItem('evie_crops') || JSON.stringify([
    { id: 1, name: 'Coffee (Robusta)', area: '2 acres', status: 'Growing', health: 88, planted: '2025-01-15', expectedHarvest: '2026-06-01' },
    { id: 2, name: 'Matoke', area: '1.5 acres', status: 'Ready', health: 92, planted: '2025-03-01', expectedHarvest: '2026-05-20' },
    { id: 3, name: 'Beans', area: '1.5 acres', status: 'Harvesting', health: 90, planted: '2025-04-01', expectedHarvest: '2026-05-18' },
    { id: 4, name: 'Maize', area: '1 acre', status: 'Growing', health: 85, planted: '2025-04-15', expectedHarvest: '2026-07-01' },
  ])));
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', area: '', status: 'Growing', planted: '', expectedHarvest: '' });

  const save = () => {
    const updated = [...crops, { ...form, id: Date.now(), health: 85 }];
    setCrops(updated);
    localStorage.setItem('evie_crops', JSON.stringify(updated));
    setForm({ name: '', area: '', status: 'Growing', planted: '', expectedHarvest: '' });
    setShowForm(false);
  };

  const remove = (id: number) => {
    const updated = crops.filter((c: any) => c.id !== id);
    setCrops(updated);
    localStorage.setItem('evie_crops', JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Crops</h1><p className="text-gray-600">{crops.length} crops being managed</p></div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"><Plus className="w-5 h-5" />Add Crop</button>
      </div>
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-bold text-lg mb-4">Add New Crop</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block font-semibold text-gray-700 mb-1">Crop Name *</label><input type="text" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="e.g., Coffee" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" /></div>
            <div><label className="block font-semibold text-gray-700 mb-1">Area</label><input type="text" value={form.area} onChange={e=>setForm({...form,area:e.target.value})} placeholder="e.g., 2 acres" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" /></div>
            <div><label className="block font-semibold text-gray-700 mb-1">Status</label>
              <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                {['Growing','Ready','Harvesting','Planted','Dormant'].map(s => <option key={s}>{s}</option>)}
              </select></div>
            <div><label className="block font-semibold text-gray-700 mb-1">Date Planted</label><input type="date" value={form.planted} onChange={e=>setForm({...form,planted:e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" /></div>
            <div><label className="block font-semibold text-gray-700 mb-1">Expected Harvest</label><input type="date" value={form.expectedHarvest} onChange={e=>setForm({...form,expectedHarvest:e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" /></div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={save} disabled={!form.name} className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold disabled:opacity-50">Save Crop</button>
            <button onClick={() => setShowForm(false)} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-semibold">Cancel</button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {crops.map((crop: any) => (
          <div key={crop.id} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{crop.name}</h3>
                <p className="text-gray-600">{crop.area}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${crop.status==='Ready'?'bg-green-100 text-green-700':crop.status==='Harvesting'?'bg-yellow-100 text-yellow-700':'bg-blue-100 text-blue-700'}`}>{crop.status}</span>
                <button onClick={() => remove(crop.id)} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span className="text-gray-600">Health</span><span className="font-semibold">{crop.health}%</span></div>
              <div className="w-full bg-gray-200 rounded-full h-2"><div className="h-2 rounded-full bg-green-600" style={{width:`${crop.health}%`}} /></div>
              {crop.planted && <p className="text-sm text-gray-500">Planted: {crop.planted}</p>}
              {crop.expectedHarvest && <p className="text-sm text-gray-500">Harvest: {crop.expectedHarvest}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ LIVESTOCK ============
function LivestockView() {
  const [animals, setAnimals] = useState(() => JSON.parse(localStorage.getItem('evie_livestock') || JSON.stringify([
    { id: 1, type: 'Chickens', count: 120, health: 'Good', notes: 'Laying hens' },
    { id: 2, type: 'Goats', count: 35, health: 'Excellent', notes: 'Mixed breed' },
    { id: 3, type: 'Pigs', count: 25, health: 'Excellent', notes: 'Growing for sale' },
    { id: 4, type: 'Cattle', count: 6, health: 'Good', notes: 'Dairy cows' },
    { id: 5, type: 'Ducks', count: 58, health: 'Good', notes: 'Free range' },
  ])));
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: '', count: '', health: 'Good', notes: '' });

  const save = () => {
    const updated = [...animals, { ...form, id: Date.now(), count: Number(form.count) }];
    setAnimals(updated);
    localStorage.setItem('evie_livestock', JSON.stringify(updated));
    setForm({ type: '', count: '', health: 'Good', notes: '' });
    setShowForm(false);
  };

  const remove = (id: number) => {
    const updated = animals.filter((a: any) => a.id !== id);
    setAnimals(updated);
    localStorage.setItem('evie_livestock', JSON.stringify(updated));
  };

  const total = animals.reduce((sum: number, a: any) => sum + Number(a.count), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Livestock</h1><p className="text-gray-600">{total} animals in {animals.length} groups</p></div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"><Plus className="w-5 h-5" />Add Animal</button>
      </div>
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-bold text-lg mb-4">Add Livestock</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block font-semibold text-gray-700 mb-1">Animal Type *</label><input type="text" value={form.type} onChange={e=>setForm({...form,type:e.target.value})} placeholder="e.g., Goats" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
            <div><label className="block font-semibold text-gray-700 mb-1">Count *</label><input type="number" value={form.count} onChange={e=>setForm({...form,count:e.target.value})} placeholder="e.g., 20" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
            <div><label className="block font-semibold text-gray-700 mb-1">Health Status</label>
              <select value={form.health} onChange={e=>setForm({...form,health:e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                {['Excellent','Good','Fair','Poor'].map(s => <option key={s}>{s}</option>)}
              </select></div>
            <div><label className="block font-semibold text-gray-700 mb-1">Notes</label><input type="text" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} placeholder="Any notes..." className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={save} disabled={!form.type || !form.count} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50">Save</button>
            <button onClick={() => setShowForm(false)} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-semibold">Cancel</button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {animals.map((a: any) => (
          <div key={a.id} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{a.type}</h3>
                <p className="text-3xl font-bold text-blue-600">{a.count} <span className="text-base text-gray-500 font-normal">animals</span></p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${a.health==='Excellent'?'bg-green-100 text-green-700':a.health==='Good'?'bg-blue-100 text-blue-700':a.health==='Fair'?'bg-yellow-100 text-yellow-700':'bg-red-100 text-red-700'}`}>{a.health}</span>
                <button onClick={() => remove(a.id)} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            {a.notes && <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-2">{a.notes}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ MONEY ============
function MoneyView() {
  const [transactions, setTransactions] = useState(() => JSON.parse(localStorage.getItem('evie_transactions') || JSON.stringify([
    { id: 1, type: 'income', category: 'Coffee Sales', amount: 450000, date: '2026-05-20', notes: 'Sold 100kg' },
    { id: 2, type: 'income', category: 'Livestock Sales', amount: 280000, date: '2026-05-18', notes: 'Sold 5 goats' },
    { id: 3, type: 'expense', category: 'Fertilizer', amount: 180000, date: '2026-05-17', notes: 'NPK fertilizer' },
    { id: 4, type: 'expense', category: 'Feed', amount: 120000, date: '2026-05-16', notes: 'Chicken feed' },
    { id: 5, type: 'income', category: 'Matoke Sales', amount: 85000, date: '2026-05-15', notes: '' },
    { id: 6, type: 'expense', category: 'Labor', amount: 80000, date: '2026-05-14', notes: 'Harvesting workers' },
  ])));
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: 'income', category: '', amount: '', date: new Date().toISOString().split('T')[0], notes: '' });

  const save = () => {
    const updated = [{ ...form, id: Date.now(), amount: Number(form.amount) }, ...transactions];
    setTransactions(updated);
    localStorage.setItem('evie_transactions', JSON.stringify(updated));
    setForm({ type: 'income', category: '', amount: '', date: new Date().toISOString().split('T')[0], notes: '' });
    setShowForm(false);
  };

  const remove = (id: number) => {
    const updated = transactions.filter((t: any) => t.id !== id);
    setTransactions(updated);
    localStorage.setItem('evie_transactions', JSON.stringify(updated));
  };

  const totalIncome = transactions.filter((t: any) => t.type === 'income').reduce((s: number, t: any) => s + Number(t.amount), 0);
  const totalExpenses = transactions.filter((t: any) => t.type === 'expense').reduce((s: number, t: any) => s + Number(t.amount), 0);
  const profit = totalIncome - totalExpenses;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Money</h1><p className="text-gray-600">Financial records and tracking</p></div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-semibold"><Plus className="w-5 h-5" />Add Record</button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5"><p className="text-sm font-semibold text-green-700 mb-1">Total Income</p><p className="text-2xl font-bold text-green-700">UGX {totalIncome.toLocaleString()}</p></div>
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-5"><p className="text-sm font-semibold text-red-700 mb-1">Total Expenses</p><p className="text-2xl font-bold text-red-700">UGX {totalExpenses.toLocaleString()}</p></div>
        <div className={`${profit>=0?'bg-emerald-50 border-emerald-200':'bg-orange-50 border-orange-200'} border-2 rounded-xl p-5`}><p className={`text-sm font-semibold mb-1 ${profit>=0?'text-emerald-700':'text-orange-700'}`}>Net Profit</p><p className={`text-2xl font-bold ${profit>=0?'text-emerald-700':'text-orange-700'}`}>UGX {profit.toLocaleString()}</p></div>
      </div>
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-bold text-lg mb-4">Add Transaction</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block font-semibold text-gray-700 mb-1">Type</label>
              <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500">
                <option value="income">Income</option><option value="expense">Expense</option>
              </select></div>
            <div><label className="block font-semibold text-gray-700 mb-1">Category *</label><input type="text" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} placeholder="e.g., Coffee Sales" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" /></div>
            <div><label className="block font-semibold text-gray-700 mb-1">Amount (UGX) *</label><input type="number" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})} placeholder="e.g., 100000" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" /></div>
            <div><label className="block font-semibold text-gray-700 mb-1">Date</label><input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" /></div>
            <div className="md:col-span-2"><label className="block font-semibold text-gray-700 mb-1">Notes</label><input type="text" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} placeholder="Any notes..." className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" /></div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={save} disabled={!form.category || !form.amount} className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-semibold disabled:opacity-50">Save</button>
            <button onClick={() => setShowForm(false)} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-semibold">Cancel</button>
          </div>
        </div>
      )}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200"><h2 className="font-bold text-gray-900">Recent Transactions</h2></div>
        <div className="divide-y divide-gray-100">
          {transactions.map((t: any) => (
            <div key={t.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${t.type==='income'?'bg-green-100':'bg-red-100'}`}>
                  {t.type==='income'?<TrendingUp className="w-5 h-5 text-green-600"/>:<TrendingDown className="w-5 h-5 text-red-600"/>}
                </div>
                <div><p className="font-semibold text-gray-900">{t.category}</p><p className="text-sm text-gray-500">{t.date}{t.notes?` · ${t.notes}`:''}</p></div>
              </div>
              <div className="flex items-center gap-3">
                <p className={`font-bold ${t.type==='income'?'text-green-600':'text-red-600'}`}>{t.type==='income'?'+':'-'} UGX {Number(t.amount).toLocaleString()}</p>
                <button onClick={() => remove(t.id)} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ PEOPLE ============
function PeopleView() {
  const [staff, setStaff] = useState(() => JSON.parse(localStorage.getItem('evie_staff') || JSON.stringify([
    { id: 1, name: 'Okello James', role: 'Farm Manager', phone: '+256 701 234 567', salary: 300000, checkedIn: false },
    { id: 2, name: 'Nambi Sarah', role: 'Field Worker', phone: '+256 702 345 678', salary: 150000, checkedIn: true },
    { id: 3, name: 'Mugisha Peter', role: 'Livestock Handler', phone: '+256 703 456 789', salary: 180000, checkedIn: true },
  ])));
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', role: '', phone: '', salary: '' });

  const save = () => {
    const updated = [...staff, { ...form, id: Date.now(), salary: Number(form.salary), checkedIn: false }];
    setStaff(updated);
    localStorage.setItem('evie_staff', JSON.stringify(updated));
    setForm({ name: '', role: '', phone: '', salary: '' });
    setShowForm(false);
  };

  const toggleCheckIn = (id: number) => {
    const updated = staff.map((s: any) => s.id === id ? { ...s, checkedIn: !s.checkedIn } : s);
    setStaff(updated);
    localStorage.setItem('evie_staff', JSON.stringify(updated));
  };

  const remove = (id: number) => {
    const updated = staff.filter((s: any) => s.id !== id);
    setStaff(updated);
    localStorage.setItem('evie_staff', JSON.stringify(updated));
  };

  const checkedIn = staff.filter((s: any) => s.checkedIn).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">People</h1><p className="text-gray-600">{staff.length} staff · {checkedIn} checked in today</p></div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold"><Plus className="w-5 h-5" />Add Staff</button>
      </div>
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-bold text-lg mb-4">Add Staff Member</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block font-semibold text-gray-700 mb-1">Full Name *</label><input type="text" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="e.g., John Doe" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" /></div>
            <div><label className="block font-semibold text-gray-700 mb-1">Role *</label><input type="text" value={form.role} onChange={e=>setForm({...form,role:e.target.value})} placeholder="e.g., Field Worker" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" /></div>
            <div><label className="block font-semibold text-gray-700 mb-1">Phone</label><input type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+256 700 123 456" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" /></div>
            <div><label className="block font-semibold text-gray-700 mb-1">Monthly Salary (UGX)</label><input type="number" value={form.salary} onChange={e=>setForm({...form,salary:e.target.value})} placeholder="e.g., 200000" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" /></div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={save} disabled={!form.name || !form.role} className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold disabled:opacity-50">Save</button>
            <button onClick={() => setShowForm(false)} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-semibold">Cancel</button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {staff.map((s: any) => (
          <div key={s.id} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">{s.name.charAt(0)}</div>
                <div><h3 className="font-bold text-gray-900">{s.name}</h3><p className="text-gray-600">{s.role}</p></div>
              </div>
              <button onClick={() => remove(s.id)} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
            </div>
            {s.phone && <p className="text-sm text-gray-600 mb-2">📱 {s.phone}</p>}
            {s.salary > 0 && <p className="text-sm text-gray-600 mb-3">💰 UGX {Number(s.salary).toLocaleString()}/month</p>}
            <button onClick={() => toggleCheckIn(s.id)} className={`w-full py-2 rounded-lg font-semibold text-sm transition-colors ${s.checkedIn?'bg-green-100 text-green-700 hover:bg-green-200':'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              {s.checkedIn ? '✅ Checked In — Click to Check Out' : '⬜ Not Checked In — Click to Check In'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ SETTINGS ============
function SettingsView({ user, farm }: { user: any; farm: any }) {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900">Settings</h1><p className="text-gray-600">Account and farm settings</p></div>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-bold text-lg text-gray-900 mb-4">Account Information</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b border-gray-100"><span className="text-gray-600">Name</span><span className="font-semibold">{user?.fullName || 'Not set'}</span></div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100"><span className="text-gray-600">Phone</span><span className="font-semibold">{user?.phone || 'Not set'}</span></div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100"><span className="text-gray-600">Email</span><span className="font-semibold">{user?.email || 'Not set'}</span></div>
          <div className="flex items-center justify-between py-3"><span className="text-gray-600">Member Since</span><span className="font-semibold">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Not set'}</span></div>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-bold text-lg text-gray-900 mb-4">Farm Information</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b border-gray-100"><span className="text-gray-600">Farm Name</span><span className="font-semibold">{farm?.name || 'Not set'}</span></div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100"><span className="text-gray-600">Location</span><span className="font-semibold">{farm?.location || 'Not set'}</span></div>
          <div className="flex items-center justify-between py-3"><span className="text-gray-600">Size</span><span className="font-semibold">{farm?.size || 'Not set'}</span></div>
        </div>
      </div>
      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
        <h2 className="font-bold text-lg text-green-900 mb-2">Activate Lifetime License</h2>
        <p className="text-green-800 mb-4">Send UGX 200,000 via MTN or Airtel Money to activate your lifetime license.</p>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg"><Smartphone className="w-5 h-5 text-yellow-600" /><div><p className="font-bold">MTN Mobile Money</p><p className="text-gray-600">0782016339</p></div></div>
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg"><Smartphone className="w-5 h-5 text-red-600" /><div><p className="font-bold">Airtel Money</p><p className="text-gray-600">0704296938</p></div></div>
        </div>
        <p className="text-sm text-green-700 mt-4">After payment, WhatsApp <strong>+256782016339</strong> with your name and phone number for instant activation.</p>
      </div>
    </div>
  );
}

// ============ MAIN APP ============
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
      setCurrentUser(JSON.parse(stored));
      const farm = localStorage.getItem('evie_farm');
      if (farm) setCurrentFarm(JSON.parse(farm));
      setAppMode('app');
    }
  }, []);

  useEffect(() => {
    const check = async () => {
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
    check();
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
    { id: 'dashboard' as View, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'crops' as View, label: 'Crops', icon: Sprout },
    { id: 'livestock' as View, label: 'Livestock', icon: Beef },
    { id: 'money' as View, label: 'Money', icon: DollarSign },
    { id: 'people' as View, label: 'People', icon: Users },
    { id: 'settings' as View, label: 'Settings', icon: SettingsIcon },
  ];

  const renderView = () => {
    switch(currentView) {
      case 'dashboard': return <Dashboard />;
      case 'crops': return <CropsView />;
      case 'livestock': return <LivestockView />;
      case 'money': return <MoneyView />;
      case 'people': return <PeopleView />;
      case 'settings': return <SettingsView user={currentUser} farm={currentFarm} />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${highContrast?'high-contrast':''}`}>
      <PaymentBanner user={currentUser} />
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-600 rounded-lg"><Sprout className="w-6 h-6 text-white" /></div>
              <div><h1 className="font-semibold text-gray-900">Evie Digital Agribusiness</h1><p className="text-gray-600 text-sm">{currentFarm?.name || 'Farm Management'}</p></div>
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            {currentUser && (
              <div className="hidden lg:flex items-center gap-3">
                <button onClick={() => setHighContrast(!highContrast)} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${highContrast?'bg-yellow-500 text-white':'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  <Sun className="w-5 h-5" /><span className="text-sm font-semibold">Outdoor Mode</span>
                </button>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">{(currentUser.fullName||'U').charAt(0)}</div>
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
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive?'bg-green-50 text-green-700 font-semibold':'text-gray-700 hover:bg-gray-50'}`}>
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
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">{(currentUser.fullName||'U').charAt(0)}</div>
                    <div><p className="font-semibold text-gray-900">{currentUser.fullName}</p><p className="text-gray-600 text-sm">Owner</p></div>
                  </div>
                  <button onClick={() => setHighContrast(!highContrast)} className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg mb-2 ${highContrast?'bg-yellow-500 text-white':'bg-gray-200 text-gray-800'}`}>
                    <Sun className="w-5 h-5" />{highContrast?'Outdoor Mode ON':'Outdoor Mode OFF'}
                  </button>
                  <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"><LogOut className="w-4 h-4" />Logout</button>
                </div>
              )}
              {navigation.map(item => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button key={item.id} onClick={() => { setCurrentView(item.id); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive?'bg-green-50 text-green-700 font-semibold':'text-gray-700 hover:bg-gray-50'}`}>
                    <Icon className="w-5 h-5" />{item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        )}
        <main className="flex-1 p-4 lg:p-8">{renderView()}</main>
      </div>
    </div>
  );
}
