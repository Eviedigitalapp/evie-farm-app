import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Activity, Eye, Clock } from 'lucide-react';

interface AnalyticsEvent {
  id: string;
  type: string;
  feature: string;
  timestamp: number;
  sessionId: string;
}

const ANALYTICS_KEY = 'evie_analytics_events';
const SESSION_START_KEY = 'evie_session_start';

// Track an event
export function trackEvent(feature: string, action: string = 'view'): void {
  const events = getAnalyticsEvents();

  const newEvent: AnalyticsEvent = {
    id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: action,
    feature,
    timestamp: Date.now(),
    sessionId: getSessionId()
  };

  events.push(newEvent);

  // Keep only last 1000 events
  if (events.length > 1000) {
    events.shift();
  }

  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(events));
}

function getAnalyticsEvents(): AnalyticsEvent[] {
  const eventsJson = localStorage.getItem(ANALYTICS_KEY);
  if (!eventsJson) return [];

  try {
    return JSON.parse(eventsJson);
  } catch {
    return [];
  }
}

function getSessionId(): string {
  let sessionId = sessionStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('session_id', sessionId);
  }
  return sessionId;
}

function getSessionDuration(): number {
  const startTime = sessionStorage.getItem(SESSION_START_KEY);
  if (!startTime) {
    const now = Date.now();
    sessionStorage.setItem(SESSION_START_KEY, String(now));
    return 0;
  }

  return Math.floor((Date.now() - parseInt(startTime)) / 1000 / 60); // minutes
}

export function AnalyticsDashboard() {
  const [totalEvents, setTotalEvents] = useState(0);
  const [dailyActivity, setDailyActivity] = useState<{ date: string; count: number }[]>([]);
  const [topFeatures, setTopFeatures] = useState<{ feature: string; count: number }[]>([]);
  const [sessionDuration, setSessionDuration] = useState(0);

  useEffect(() => {
    loadAnalytics();

    // Update session duration every minute
    const interval = setInterval(() => {
      setSessionDuration(getSessionDuration());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  function loadAnalytics() {
    const events = getAnalyticsEvents();

    // Total events
    setTotalEvents(events.length);

    // Session duration
    setSessionDuration(getSessionDuration());

    // Daily activity (last 7 days)
    const last7Days = getLast7Days();
    const dailyData = last7Days.map(date => {
      const count = events.filter(e => {
        const eventDate = new Date(e.timestamp).toLocaleDateString('en-CA');
        return eventDate === date;
      }).length;

      return { date, count };
    });
    setDailyActivity(dailyData);

    // Top features
    const featureCounts: { [key: string]: number } = {};
    events.forEach(event => {
      featureCounts[event.feature] = (featureCounts[event.feature] || 0) + 1;
    });

    const topFeaturesData = Object.entries(featureCounts)
      .map(([feature, count]) => ({ feature, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    setTopFeatures(topFeaturesData);
  }

  function getLast7Days(): string[] {
    const days: string[] = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      days.push(date.toLocaleDateString('en-CA'));
    }

    return days;
  }

  function clearAnalytics() {
    if (confirm('Clear all analytics data?')) {
      localStorage.removeItem(ANALYTICS_KEY);
      sessionStorage.removeItem(SESSION_START_KEY);
      loadAnalytics();
    }
  }

  const maxDailyCount = Math.max(...dailyActivity.map(d => d.count), 1);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Usage Analytics</h3>
        </div>
        <button
          onClick={clearAnalytics}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          Clear Data
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-4 h-4 text-blue-600" />
            <p className="text-xs text-blue-800 font-medium">Total Events</p>
          </div>
          <p className="text-2xl font-bold text-blue-900">{totalEvents}</p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-green-600" />
            <p className="text-xs text-green-800 font-medium">Session Time</p>
          </div>
          <p className="text-2xl font-bold text-green-900">{sessionDuration}m</p>
        </div>
      </div>

      {/* Daily Activity Chart */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Daily Activity (Last 7 Days)</h4>
        <div className="space-y-2">
          {dailyActivity.map((day, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-xs text-gray-600 w-16">
                {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
              <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                <div
                  className="bg-purple-500 h-full flex items-center px-2"
                  style={{ width: `${(day.count / maxDailyCount) * 100}%` }}
                >
                  {day.count > 0 && (
                    <span className="text-xs text-white font-medium">{day.count}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Features */}
      {topFeatures.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Most Used Features</h4>
          <div className="space-y-2">
            {topFeatures.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700 capitalize">{item.feature.replace(/-/g, ' ')}</span>
                </div>
                <span className="font-semibold text-gray-900">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {totalEvents === 0 && (
        <div className="text-center py-6 text-gray-400">
          <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No analytics data yet</p>
          <p className="text-xs mt-1">Start using the app to see insights</p>
        </div>
      )}
    </div>
  );
}
