import { useState, useEffect } from 'react';
import { Sprout, CheckCircle, Smartphone, BarChart3, Users, Shield, Download, Star, Wifi } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setShowInstall(false);
    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 via-green-600 to-emerald-700">
      <header className="px-4 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
          <div className="p-1.5 bg-green-600 rounded-full">
            <Sprout className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-gray-900">Evie Farm App</span>
        </div>
        {showInstall && (
          <button onClick={handleInstall} className="flex items-center gap-2 bg-white text-green-700 px-4 py-2 rounded-full font-bold shadow-md hover:bg-green-50 transition-colors">
            <Download className="w-4 h-4" />
            Install App
          </button>
        )}
      </header>

      <div className="max-w-5xl mx-auto px-4 pb-16">
        <div className="text-center pt-8 pb-12">
          <div className="inline-flex items-center gap-2 bg-green-500 bg-opacity-40 text-white px-4 py-2 rounded-full mb-6 border border-green-400">
            <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
            <span className="font-semibold">Pay Once — Use Forever</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Manage Your Farm<br />Like a Business
          </h1>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Track crops, livestock, finances, and workers — all in one app. Built for African farmers in Uganda.
          </p>

          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto mb-8">
            <p className="text-gray-500 mb-1">One-time payment, no monthly fees</p>
            <div className="flex items-baseline justify-center gap-2 mb-1">
              <span className="text-5xl font-bold text-green-700">UGX 200,000</span>
            </div>
            <p className="text-gray-400 mb-1">≈ $54 USD</p>
            <p className="text-green-600 font-semibold mb-6">Lifetime access — install on your phone</p>
            <div className="space-y-3 mb-8 text-left">
              {['Crops & livestock tracking','Staff check-in / check-out','Financial records & reports','Works offline — no internet needed','Installs on Android & iPhone','All future updates included'].map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{f}</span>
                </div>
              ))}
            </div>
            <button onClick={onGetStarted} className="w-full py-4 bg-green-600 text-white rounded-xl font-bold text-xl hover:bg-green-700 transition-all shadow-lg">
              Buy Now — UGX 200,000
            </button>
            <p className="text-center text-sm text-gray-500 mt-3">Secure payment via MTN / Airtel Mobile Money</p>
          </div>

          <div className="bg-white bg-opacity-20 border border-white border-opacity-30 rounded-2xl p-6 max-w-md mx-auto mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Smartphone className="w-6 h-6 text-white" />
              <h3 className="text-white font-bold text-lg">Download on Your Phone</h3>
            </div>
            <div className="space-y-2 text-left">
              <div className="flex items-start gap-3">
                <span className="bg-white text-green-700 w-6 h-6 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">1</span>
                <p className="text-green-50">Open this website in Chrome (Android) or Safari (iPhone)</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-white text-green-700 w-6 h-6 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">2</span>
                <p className="text-green-50">Tap the menu (⋮ or Share button)</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-white text-green-700 w-6 h-6 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">3</span>
                <p className="text-green-50">Tap "Add to Home Screen" — it installs like a real app!</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            { icon: Sprout, color: 'bg-green-500', title: 'Crop Management', desc: 'Track planting, growth & harvest records' },
            { icon: BarChart3, color: 'bg-blue-500', title: 'Financial Tracking', desc: 'Income, expenses & profit reports' },
            { icon: Users, color: 'bg-purple-500', title: 'Staff & Workers', desc: 'Check-in/out, payroll & task tracking' },
            { icon: Smartphone, color: 'bg-orange-500', title: 'Works on Phone', desc: 'Install as an app, works offline too' },
            { icon: Wifi, color: 'bg-teal-500', title: 'Offline Ready', desc: 'No internet? No problem. Data syncs later' },
            { icon: Shield, color: 'bg-red-500', title: 'Your Data is Safe', desc: 'Backed up securely in the cloud' },
          ].map((f) => (
            <div key={f.title} className="bg-white bg-opacity-15 border border-white border-opacity-20 rounded-xl p-5">
              <div className={`${f.color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}>
                <f.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">{f.title}</h3>
              <p className="text-green-100 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button onClick={onGetStarted} className="px-12 py-5 bg-white text-green-700 rounded-full font-bold text-xl hover:bg-gray-100 transition-all shadow-2xl">
            Buy Now — UGX 200,000
          </button>
          <p className="text-green-200 mt-4">Pay once with MTN or Airtel Mobile Money. No monthly fees. Ever.</p>
        </div>
      </div>
    </div>
  );
}
