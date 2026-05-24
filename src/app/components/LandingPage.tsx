import { Sprout, CheckCircle, Smartphone, BarChart3, Users, Shield, TrendingUp } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg">
            <div className="p-2 bg-green-600 rounded-full">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Evie Farm</h1>
              <p className="text-xs text-gray-600">Digital Agribusiness</p>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="text-white">
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Manage Your Farm Like a Business
            </h2>
            <p className="text-2xl mb-8 text-green-100">
              Track crops, livestock, finances, and staff all in one place. Built for African farmers.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-7 h-7 text-green-300" />
                <p className="text-lg">Works offline - no internet required</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-7 h-7 text-green-300" />
                <p className="text-lg">7-day free trial - no credit card needed</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-7 h-7 text-green-300" />
                <p className="text-lg">Pay monthly with Mobile Money (MTN/Airtel)</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-7 h-7 text-green-300" />
                <p className="text-lg">Only UGX 40,000/month (~$10)</p>
              </div>
            </div>

            <button
              onClick={onGetStarted}
              className="px-12 py-5 bg-white text-green-700 rounded-full font-bold text-xl hover:bg-gray-100 transition-all shadow-2xl transform hover:scale-105"
            >
              Start Free Trial →
            </button>
            <p className="text-sm text-green-200 mt-3">
              Join 100+ farmers already using Evie Farm
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">What's Included:</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                <Sprout className="w-8 h-8 text-green-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900">Crop Management</h4>
                  <p className="text-gray-600">Track planting, growth, harvesting, and health</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                <Users className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900">Livestock Tracking</h4>
                  <p className="text-gray-600">Monitor animals, vaccination, feeding, and health</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-emerald-50 rounded-lg">
                <BarChart3 className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900">Financial Management</h4>
                  <p className="text-gray-600">Track income, expenses, and profit margins</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
                <Smartphone className="w-8 h-8 text-purple-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900">Staff Management</h4>
                  <p className="text-gray-600">Check-in/out, tasks, payroll, and attendance</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg">
                <TrendingUp className="w-8 h-8 text-yellow-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900">Reports & Analytics</h4>
                  <p className="text-gray-600">Make data-driven decisions for your farm</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg">
                <Shield className="w-8 h-8 text-red-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900">Offline Access</h4>
                  <p className="text-gray-600">Works without internet - perfect for rural farms</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-12 mb-16 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Simple, Affordable Pricing</h3>
            <p className="text-xl text-gray-600">One plan with everything included</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-gray-600 mb-2">Free Trial</p>
              <p className="text-4xl font-bold text-green-600 mb-2">7 Days</p>
              <p className="text-sm text-gray-500">Full access, no card required</p>
            </div>

            <div className="text-center border-x border-gray-200">
              <p className="text-gray-600 mb-2">Monthly</p>
              <p className="text-5xl font-bold text-gray-900 mb-2">UGX 40K</p>
              <p className="text-sm text-gray-500">Pay with Mobile Money</p>
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-2">Annual Plan</p>
              <p className="text-4xl font-bold text-purple-600 mb-2">UGX 400K</p>
              <p className="text-sm text-green-600 font-semibold">Save 2 months!</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={onGetStarted}
              className="px-16 py-5 bg-green-600 text-white rounded-full font-bold text-xl hover:bg-green-700 transition-all shadow-lg"
            >
              Start Your Free Trial
            </button>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white bg-opacity-10 backdrop-blur rounded-2xl p-12 mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">What Farmers Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  JM
                </div>
                <div>
                  <p className="font-bold text-gray-900">John Mugisha</p>
                  <p className="text-sm text-gray-600">Coffee Farmer, Mbale</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Evie Farm helped me track my coffee production and I increased my profit by 30% in just 3 months!"
              </p>
            </div>

            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  SN
                </div>
                <div>
                  <p className="font-bold text-gray-900">Sarah Namukasa</p>
                  <p className="text-sm text-gray-600">Poultry Farmer, Kampala</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The offline feature is perfect! I can manage my 500 chickens even without internet connection."
              </p>
            </div>

            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  DK
                </div>
                <div>
                  <p className="font-bold text-gray-900">David Kateregga</p>
                  <p className="text-sm text-gray-600">Mixed Farm, Mbarara</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Mobile Money payment is so convenient. I pay monthly and manage both my crops and livestock easily."
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-white">
          <p className="text-lg mb-4">
            Have questions? Email us at <a href="mailto:support@eviedigital.com" className="underline font-semibold">support@eviedigital.com</a>
          </p>
          <p className="text-sm text-green-200">
            © 2026 Evie Digital Agribusiness. Made for African Farmers.
          </p>
        </div>
      </div>
    </div>
  );
}
