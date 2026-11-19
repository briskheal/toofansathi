import React from 'react';
import { Wind, CloudRain, Clock, Info, Zap, Thermometer } from 'lucide-react';

export default function HourlyForecastStrip({ hourlyData }) {
  if (!hourlyData || !hourlyData.time) return null;

  // Find index corresponding to current hour so forecast starts NOW
  const now = new Date();
  let nowIndex = hourlyData.time.findIndex((t) => {
    const d = new Date(t);
    return d.getTime() >= now.getTime() - 45 * 60 * 1000; // within 45 mins of current time
  });

  if (nowIndex === -1) nowIndex = 0;
  // Show next 10 hours
  const displaySlice = hourlyData.time.slice(nowIndex, nowIndex + 10);

  const items = displaySlice.map((timeStr, idx) => {
    const actualIdx = nowIndex + idx;
    const time = new Date(timeStr);
    const hourLabel = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const windSpeed = Math.round(hourlyData.wind_speed_10m[actualIdx] || 0);
    const windGusts = Math.round(hourlyData.wind_gusts_10m[actualIdx] || 0);
    const rain = Math.round((hourlyData.precipitation[actualIdx] || 0) * 10) / 10;
    const temp = hourlyData.temperature_2m ? Math.round(hourlyData.temperature_2m[actualIdx]) : null;

    return {
      hourLabel,
      windSpeed,
      windGusts,
      rain,
      temp,
      isHighRisk: windGusts >= 55 || rain >= 15
    };
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 shadow-sm">
      {/* Header with Title and Legend */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 mb-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-100">
          <Clock className="w-4 h-4 text-sky-400" />
          <span>Next 10-Hour Forecast Timeline (Starting Now)</span>
        </div>

        {/* Legend for field workers */}
        <div className="flex items-center gap-2.5 text-[10px] text-slate-400 flex-wrap">
          <span className="flex items-center gap-1">
            <Thermometer className="w-3 h-3 text-rose-400" /> Temp
          </span>
          <span className="flex items-center gap-1">
            <Wind className="w-3 h-3 text-sky-400" /> Wind
          </span>
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-400" /> Gusts
          </span>
          <span className="flex items-center gap-1">
            <CloudRain className="w-3 h-3 text-blue-400" /> Rain
          </span>
        </div>
      </div>

      {/* Hourly Cards Slider */}
      <div className="flex gap-2.5 overflow-x-auto pb-2.5 scrollbar-thin">
        {items.map((item, i) => (
          <div
            key={i}
            className={`flex-shrink-0 flex flex-col justify-between p-2.5 rounded-xl border min-w-[115px] text-xs transition-all ${
              item.isHighRisk
                ? 'bg-red-950/50 border-red-700/80 shadow-sm shadow-red-950/50'
                : 'bg-slate-800/70 border-slate-700/70'
            }`}
          >
            {/* Hour Timestamp */}
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-1.5 mb-1.5">
              <span className="font-mono text-xs font-bold text-white">{item.hourLabel}</span>
              {item.isHighRisk ? (
                <span className="text-[9px] font-bold uppercase text-red-400 bg-red-900/60 px-1 rounded">
                  Risk
                </span>
              ) : item.temp !== null ? (
                <span className="text-[10px] font-bold text-slate-300">
                  {item.temp}°C
                </span>
              ) : null}
            </div>

            {/* Parameter 1: Temperature */}
            {item.temp !== null && (
              <div className="flex items-center justify-between py-0.5 text-[11px]">
                <span className="text-slate-400 flex items-center gap-1">
                  <Thermometer className="w-3 h-3 text-rose-400" />
                  <span>Temp:</span>
                </span>
                <span className={`font-bold ${item.temp <= 15 ? 'text-cyan-300' : 'text-slate-100'}`}>
                  {item.temp}°C
                </span>
              </div>
            )}

            {/* Parameter 2: Wind Speed */}
            <div className="flex items-center justify-between py-0.5 text-[11px]">
              <span className="text-slate-400 flex items-center gap-1">
                <Wind className="w-3 h-3 text-sky-400" />
                <span>Wind:</span>
              </span>
              <span className="font-bold text-slate-100">{item.windSpeed} <span className="text-[9px] text-slate-400 font-normal">km/h</span></span>
            </div>

            {/* Parameter 3: Peak Wind Gusts */}
            <div className="flex items-center justify-between py-0.5 text-[11px]">
              <span className="text-slate-400 flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" />
                <span>Gusts:</span>
              </span>
              <span className={`font-bold ${item.windGusts >= 55 ? 'text-amber-400 font-extrabold' : 'text-amber-300'}`}>
                {item.windGusts} <span className="text-[9px] text-slate-400 font-normal">km/h</span>
              </span>
            </div>

            {/* Parameter 4: Rain */}
            <div className="flex items-center justify-between py-0.5 text-[11px] border-t border-slate-700/40 mt-1 pt-1">
              <span className="text-slate-400 flex items-center gap-1">
                <CloudRain className="w-3 h-3 text-blue-400" />
                <span>Rain:</span>
              </span>
              <span className="font-bold text-blue-300">{item.rain} <span className="text-[9px] text-slate-400 font-normal">mm</span></span>
            </div>
          </div>
        ))}
      </div>

      {/* Prominent Courtesy / Attribution */}
      <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between gap-2 text-[10px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <Info className="w-3 h-3 text-sky-400 flex-shrink-0" />
          <span>
            <strong className="text-slate-300">Courtesy:</strong> Open-Meteo High-Resolution Weather Models (ECMWF IFS / GFS Integration).
          </span>
        </div>
        <span className="font-mono text-slate-500 hidden sm:inline">10-Hour Forecast</span>
      </div>
    </div>
  );
}
