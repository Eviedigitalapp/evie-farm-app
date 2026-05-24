import { useState, useEffect } from 'react';
import { Phone, Bell, Check, X, AlertCircle } from 'lucide-react';
import {
  sendSMS,
  validatePhoneNumber,
  formatPhoneNumber,
  isSMSConfigured
} from '../../utils/smsService';

export function SMSSettings() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [testingSMS, setTestingSMS] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const [notifications, setNotifications] = useState({
    vaccinations: true,
    feeding: true,
    tasks: true,
    weather: false
  });

  useEffect(() => {
    // Load saved settings
    const saved = localStorage.getItem('sms_settings');
    if (saved) {
      const settings = JSON.parse(saved);
      setPhoneNumber(settings.phoneNumber || '');
      setNotifications(settings.notifications || notifications);
    }
  }, []);

  useEffect(() => {
    setIsValid(validatePhoneNumber(phoneNumber));
  }, [phoneNumber]);

  const handleSave = () => {
    const settings = {
      phoneNumber: formatPhoneNumber(phoneNumber),
      notifications,
      enabled: isValid
    };

    localStorage.setItem('sms_settings', JSON.stringify(settings));
    alert('SMS settings saved successfully!');
  };

  const handleTestSMS = async () => {
    if (!isValid) {
      setTestResult({
        success: false,
        message: 'Please enter a valid phone number'
      });
      return;
    }

    setTestingSMS(true);
    setTestResult(null);

    try {
      const result = await sendSMS({
        phoneNumber: formatPhoneNumber(phoneNumber),
        message: 'Test message from Evie Farm. Your SMS notifications are working correctly!',
        type: 'general'
      });

      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        message: 'Failed to send test SMS'
      });
    } finally {
      setTestingSMS(false);
    }
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!isSMSConfigured()) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-yellow-800">SMS Service Not Configured</p>
            <p className="text-xs text-yellow-700 mt-1">
              SMS notifications require Africa's Talking API integration.
            </p>
            <p className="text-xs text-yellow-600 mt-2">
              See <span className="font-mono">SMS_NOTIFICATIONS_GUIDE.md</span> for setup instructions.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <Phone className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-900">SMS Notifications</h3>
      </div>

      {/* Phone Number Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number
        </label>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+256 7XX XXX XXX or 07XX XXX XXX"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {phoneNumber && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {isValid ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <X className="w-5 h-5 text-red-500" />
                )}
              </div>
            )}
          </div>
          <button
            onClick={handleTestSMS}
            disabled={!isValid || testingSMS}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium whitespace-nowrap"
          >
            {testingSMS ? 'Sending...' : 'Test SMS'}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Uganda format: +256 7XX XXX XXX
        </p>

        {testResult && (
          <div className={`mt-3 p-3 rounded text-sm ${
            testResult.success
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {testResult.message}
          </div>
        )}
      </div>

      {/* Notification Preferences */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Receive SMS Alerts For:
        </label>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.vaccinations}
              onChange={() => toggleNotification('vaccinations')}
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Vaccination Reminders</p>
              <p className="text-xs text-gray-500">Get alerts before vaccinations are due</p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.feeding}
              onChange={() => toggleNotification('feeding')}
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Feed Stock Alerts</p>
              <p className="text-xs text-gray-500">Notifications when feed stock is low</p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.tasks}
              onChange={() => toggleNotification('tasks')}
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Task Reminders</p>
              <p className="text-xs text-gray-500">Alerts for upcoming and overdue tasks</p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.weather}
              onChange={() => toggleNotification('weather')}
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Weather Alerts</p>
              <p className="text-xs text-gray-500">Critical weather warnings for farming</p>
            </div>
          </label>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={!isValid}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
      >
        Save Settings
      </button>

      {/* Info */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <div className="flex items-start gap-2">
          <Bell className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-blue-800">
            SMS notifications help you stay on top of important farm activities even when you're away from your device.
            Standard SMS rates may apply.
          </p>
        </div>
      </div>
    </div>
  );
}
