// Weather service using OpenWeather API
const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || '7b0f7b688763a1cdbb51e225477c8c7b';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  rainfall: number;
  timestamp: number;
}

export interface WeatherForecast {
  date: string;
  temp: {
    min: number;
    max: number;
  };
  humidity: number;
  rainfall: number;
  description: string;
  icon: string;
}

export interface WeatherAlert {
  type: 'rain' | 'heat' | 'cold' | 'wind';
  severity: 'low' | 'medium' | 'high';
  message: string;
}

// Get current weather for a location
export async function getCurrentWeather(city: string = 'Kampala'): Promise<WeatherData | null> {
  if (!WEATHER_API_KEY) {
    console.warn('OpenWeather API key not configured');
    return null;
  }

  try {
    const response = await fetch(
      `${WEATHER_API_URL}/weather?q=${city},UG&units=metric&appid=${WEATHER_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();

    return {
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      rainfall: data.rain?.['1h'] || 0,
      timestamp: Date.now()
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
}

// Get 5-day forecast
export async function getWeatherForecast(city: string = 'Kampala'): Promise<WeatherForecast[]> {
  if (!WEATHER_API_KEY) {
    console.warn('OpenWeather API key not configured');
    return [];
  }

  try {
    const response = await fetch(
      `${WEATHER_API_URL}/forecast?q=${city},UG&units=metric&appid=${WEATHER_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();

    // Group by day and calculate daily min/max
    const dailyData: { [key: string]: any[] } = {};

    data.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000).toLocaleDateString('en-CA');
      if (!dailyData[date]) {
        dailyData[date] = [];
      }
      dailyData[date].push(item);
    });

    return Object.entries(dailyData).slice(0, 5).map(([date, items]) => {
      const temps = items.map((item: any) => item.main.temp);
      const rainfall = items.reduce((sum: number, item: any) => sum + (item.rain?.['3h'] || 0), 0);
      const avgHumidity = Math.round(
        items.reduce((sum: number, item: any) => sum + item.main.humidity, 0) / items.length
      );

      return {
        date,
        temp: {
          min: Math.round(Math.min(...temps)),
          max: Math.round(Math.max(...temps))
        },
        humidity: avgHumidity,
        rainfall: Math.round(rainfall),
        description: items[Math.floor(items.length / 2)].weather[0].description,
        icon: items[Math.floor(items.length / 2)].weather[0].icon
      };
    });
  } catch (error) {
    console.error('Error fetching forecast:', error);
    return [];
  }
}

// Generate farming alerts based on weather conditions
export function generateWeatherAlerts(
  current: WeatherData | null,
  forecast: WeatherForecast[]
): WeatherAlert[] {
  const alerts: WeatherAlert[] = [];

  if (!current || forecast.length === 0) {
    return alerts;
  }

  // High temperature alert
  if (current.temperature > 35) {
    alerts.push({
      type: 'heat',
      severity: 'high',
      message: `Extreme heat (${current.temperature}°C). Ensure livestock have shade and water.`
    });
  } else if (current.temperature > 30) {
    alerts.push({
      type: 'heat',
      severity: 'medium',
      message: `High temperature (${current.temperature}°C). Monitor animal hydration.`
    });
  }

  // Low temperature alert
  if (current.temperature < 15) {
    alerts.push({
      type: 'cold',
      severity: 'medium',
      message: `Low temperature (${current.temperature}°C). Protect young animals and sensitive crops.`
    });
  }

  // Heavy rain forecast
  const upcomingRain = forecast.slice(0, 3).reduce((sum, day) => sum + day.rainfall, 0);
  if (upcomingRain > 50) {
    alerts.push({
      type: 'rain',
      severity: 'high',
      message: `Heavy rainfall expected (${Math.round(upcomingRain)}mm). Prepare drainage and protect crops.`
    });
  } else if (upcomingRain > 20) {
    alerts.push({
      type: 'rain',
      severity: 'medium',
      message: `Moderate rainfall expected (${Math.round(upcomingRain)}mm). Good for irrigation planning.`
    });
  } else if (upcomingRain < 5) {
    alerts.push({
      type: 'rain',
      severity: 'low',
      message: `Little rain expected. Consider irrigation for water-intensive crops.`
    });
  }

  // Strong wind alert
  if (current.windSpeed > 40) {
    alerts.push({
      type: 'wind',
      severity: 'high',
      message: `Strong winds (${current.windSpeed} km/h). Secure structures and protect tall crops.`
    });
  }

  return alerts;
}

// Cache weather data in localStorage (30 min expiry)
const WEATHER_CACHE_KEY = 'evie_weather_cache';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export function getCachedWeather(): WeatherData | null {
  const cached = localStorage.getItem(WEATHER_CACHE_KEY);
  if (!cached) return null;

  const data = JSON.parse(cached);
  if (Date.now() - data.timestamp > CACHE_DURATION) {
    localStorage.removeItem(WEATHER_CACHE_KEY);
    return null;
  }

  return data;
}

export function cacheWeather(weather: WeatherData): void {
  localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(weather));
}
