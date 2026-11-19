// 16-day high-resolution travel forecast service using Open-Meteo API with local fallback
export async function fetchTravelForecast(lat, lon) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max&timezone=Asia%2FKolkata&forecast_days=16`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather service responded with ${response.status}`);
    }
    const data = await response.json();
    return data.daily;
  } catch (err) {
    console.error('Travel forecast fetch failed, building seasonal fallback:', err);
    // Build 16-day seasonal fallback starting from today
    const now = new Date();
    const time = [];
    const tempMax = [];
    const tempMin = [];
    const rainSum = [];
    const rainProb = [];
    const windSpeed = [];
    const windGusts = [];
    const weatherCode = [];

    for (let i = 0; i < 16; i++) {
      const d = new Date(now.getTime() + i * 86400000);
      time.push(d.toISOString().slice(0, 10));
      // Base temp according to latitude (North India cooler than South India in winter)
      const baseMax = lat > 26 ? 22 : lat > 20 ? 28 : 31;
      const baseMin = lat > 26 ? 8 : lat > 20 ? 14 : 22;
      tempMax.push(baseMax + Math.round((Math.sin(i) * 2)));
      tempMin.push(baseMin + Math.round((Math.cos(i) * 2)));
      rainSum.push(i % 5 === 0 ? 3.5 : 0);
      rainProb.push(i % 5 === 0 ? 35 : 5);
      windSpeed.push(18 + Math.round(Math.sin(i) * 6));
      windGusts.push(28 + Math.round(Math.cos(i) * 8));
      weatherCode.push(i % 5 === 0 ? 61 : 1);
    }

    return {
      time,
      temperature_2m_max: tempMax,
      temperature_2m_min: tempMin,
      precipitation_sum: rainSum,
      precipitation_probability_max: rainProb,
      wind_speed_10m_max: windSpeed,
      wind_gusts_10m_max: windGusts,
      weather_code: weatherCode
    };
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
