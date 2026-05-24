import { useState, useEffect } from 'react';
import {
  getCurrentWeather,
  getWeatherForecast,
  generateWeatherAlerts,
  getCachedWeather,
  cacheWeather,
  WeatherData,
  WeatherForecast,
  WeatherAlert
} from '../../utils/weatherService';
import { Cloud, CloudRain, Sun, Wind, Droplets, Thermometer, AlertTriangle } from 'lucide-react';

interface WeatherWidgetProps {
  city?: string;
}

export function WeatherWidget({ city = 'Kampala' }: WeatherWidgetProps) {
  const [current, setCurrent] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<WeatherForecast[]>([]);
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    loadWeatherData();
  }, [city]);

  async function loadWeatherData() {
    // Try cache first
    const cached = getCachedWeather();
    if (cached) {
      setCurrent(cached);
      setLoading(false);
    }

    try {
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(city),
        getWeatherForecast(city)
      ]);

      if (weatherData) {
        setCurrent(weatherData);
        cacheWeather(weatherData);
      } else {
        setError('Weather API key not configured. Add VITE_OPENWEATHER_API_KEY to environment variables.');
      }

      setForecast(forecastData);

      if (weatherData && forecastData.length > 0) {
        const weatherAlerts = generateWeatherAlerts(weatherData, forecastData);
        setAlerts(weatherAlerts);
      }

      setLoading(false);
    } catch (err) {
      console.error('Weather error:', err);
      setError('Failed to load weather data');
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-yellow-800">Weather Service Not Configured</p>
            <p className="text-xs text-yellow-700 mt-1">{error}</p>
            <p className="text-xs text-yellow-600 mt-2">
              Get a free API key from <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer" className="underline">OpenWeather</a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!current) {
    return null;
  }

  const getWeatherIcon = (iconCode: string) => {
    if (iconCode.includes('01')) return <Sun className="w-12 h-12 text-yellow-500" />;
    if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) return <Cloud className="w-12 h-12 text-gray-500" />;
    if (iconCode.includes('09') || iconCode.includes('10')) return <CloudRain className="w-12 h-12 text-blue-500" />;
    return <Cloud className="w-12 h-12 text-gray-500" />;
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-50 border-red-200 text-red-800';
      case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default: return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Current Weather */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Weather</h3>
            <p className="text-sm text-gray-600">{city}</p>
          </div>
          <button
            onClick={() => loadWeatherData()}
            className="text-xs text-green-600 hover:text-green-700"
          >
            Refresh
          </button>
        </div>

        <div className="flex items-center gap-6 mb-6">
          {getWeatherIcon(current.icon)}
          <div>
            <div className="text-4xl font-bold text-gray-900">{current.temperature}°C</div>
            <p className="text-sm text-gray-600 capitalize">{current.description}</p>
            <p className="text-xs text-gray-500">Feels like {current.feelsLike}°C</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-blue-500" />
            <div>
              <p className="text-xs text-gray-600">Humidity</p>
              <p className="text-sm font-semibold">{current.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-600">Wind</p>
              <p className="text-sm font-semibold">{current.windSpeed} km/h</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CloudRain className="w-4 h-4 text-blue-500" />
            <div>
              <p className="text-xs text-gray-600">Rain</p>
              <p className="text-sm font-semibold">{current.rainfall} mm</p>
            </div>
          </div>
        </div>

        {/* Weather Alerts */}
        {alerts.length > 0 && (
          <div className="space-y-2 mb-4">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`text-xs p-3 rounded border ${getAlertColor(alert.severity)}`}
              >
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Toggle Forecast */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-green-600 hover:text-green-700 font-medium"
        >
          {expanded ? 'Hide' : 'Show'} 5-Day Forecast
        </button>
      </div>

      {/* 5-Day Forecast */}
      {expanded && forecast.length > 0 && (
        <div className="border-t border-gray-200 p-6">
          <div className="grid grid-cols-5 gap-3">
            {forecast.map((day, index) => (
              <div key={index} className="text-center">
                <p className="text-xs font-medium text-gray-600 mb-2">
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </p>
                {getWeatherIcon(day.icon)}
                <div className="mt-2">
                  <p className="text-sm font-semibold text-gray-900">
                    {day.temp.max}°
                  </p>
                  <p className="text-xs text-gray-500">
                    {day.temp.min}°
                  </p>
                </div>
                {day.rainfall > 0 && (
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <CloudRain className="w-3 h-3 text-blue-500" />
                    <p className="text-xs text-blue-600">{day.rainfall}mm</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
