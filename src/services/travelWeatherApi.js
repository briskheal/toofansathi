// 7-day to 14-day travel forecast service using Open-Meteo Daily API

export async function fetchTravelForecast(lat, lon) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max&timezone=Asia%2FKolkata&forecast_days=7`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather service responded with ${response.status}`);
    }
    const data = await response.json();
    return data.daily;
  } catch (err) {
    console.error('Travel forecast fetch failed:', err);
    throw err;
  }
}

// Convert WMO weather code to plain English description and icon
export function getWeatherCodeDetails(code) {
  if (code === 0) return { label: 'Clear Sky', icon: '☀️', color: 'text-amber-400' };
  if (code === 1 || code === 2) return { label: 'Partly Cloudy', icon: '⛅', color: 'text-sky-300' };
  if (code === 3) return { label: 'Overcast', icon: '☁️', color: 'text-slate-300' };
  if (code >= 51 && code <= 55) return { label: 'Drizzle', icon: '🌦️', color: 'text-blue-300' };
  if (code >= 61 && code <= 65) return { label: 'Moderate Rain', icon: '🌧️', color: 'text-blue-400' };
  if (code >= 80 && code <= 82) return { label: 'Heavy Rain Showers', icon: '⛈️', color: 'text-indigo-400' };
  if (code >= 95 && code <= 99) return { label: 'Severe Thunderstorm / Squalls', icon: '⚡', color: 'text-red-400' };
  return { label: 'Cloudy / Showers', icon: '🌧️', color: 'text-sky-400' };
}
