// Open-Meteo API Client with local caching for offline field workers

const CACHE_KEY_PREFIX = 'toofansathi_weather_';

export async function fetchLiveWeather(lat, lon) {
  const cacheKey = `${CACHE_KEY_PREFIX}${lat.toFixed(2)}_${lon.toFixed(2)}`;
  
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=wind_speed_10m,wind_gusts_10m,precipitation,surface_pressure&forecast_days=2&timezone=Asia%2FKolkata`;
    
    const response = await fetch(url, { cache: 'no-cache' });
    if (!response.ok) {
      throw new Error(`Weather service returned ${response.status}`);
    }
    
    const data = await response.json();
    
    // Save to local cache for offline usage
    const payload = {
      timestamp: Date.now(),
      data: data,
      isOffline: false
    };
    try {
      localStorage.setItem(cacheKey, JSON.stringify(payload));
    } catch {
      // storage full or disabled
    }

    return payload;
  } catch (err) {
    console.warn('Network request failed, checking local cache for weather:', err);
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      parsed.isOffline = true;
      return parsed;
    }
    throw new Error('No internet connection and no cached weather data available.');
  }
}
