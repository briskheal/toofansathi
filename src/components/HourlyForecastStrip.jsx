import React from 'react';
import { Wind, CloudRain, Clock, Info } from 'lucide-react';

export default function HourlyForecastStrip({ hourlyData }) {
  if (!hourlyData || !hourlyData.time) return null;

  // Take next 10 intervals
  const nowIndex = 0;
  const items = hourlyData.time.slice(nowIndex, nowIndex + 10).map((timeStr, idx) => {
    const time = new Date(timeStr);
    const hourLabel = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const wind = Math.round(hourlyData.wind_speed_10m[nowIndex + idx] || 0);
    const gusts = Math.round(hourlyData.wind_gusts_10m[nowIndex + idx] || 0);
    const rain = Math.round((hourlyData.precipitation[nowIndex + idx] || 0) * 10) / 10;

    return {
      hourLabel,
      wind,
      gusts,
      rain,
      isHighRisk: gusts >= 60 || rain >= 15
    };
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 shadow-sm">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
          <Clock className="w-3.5 h-3.5 text-sky-400" />
          <span>Next 10-Hour Forecast Graph</span>
        </div>
        <span className="text-[10px] text-slate-400">Hourly Intervals</span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {items.map((item, i) => (
          <div
            key={i}
            className={`flex-shrink-0 flex flex-col items-center justify-between p-2 rounded-lg border min-w-[76px] text-center ${
              item.isHighRisk
                ? 'bg-red-950/40 border-red-800/80'
                : 'bg-slate-800/60 border-slate-700/60'
            }`}
          >
            <span className="text-[11px] font-mono text-slate-400 mb-1">{item.hourLabel}</span>
            
            <div className="my-1">
              <span className={`text-xs font-bold block ${item.isHighRisk ? 'text-red-400' : 'text-slate-100'}`}>
                {item.gusts} <span className="text-[9px] font-normal text-slate-400">km/h</span>
              </span>
              <span className="text-[10px] text-amber-400 flex items-center justify-center gap-0.5">
                <Wind className="w-2.5 h-2.5" /> {item.wind}
              </span>
            </div>

            <div className="text-[10px] text-blue-400 flex items-center justify-center gap-0.5 mt-1">
              <CloudRain className="w-2.5 h-2.5" />
              <span>{item.rain} mm</span>
            </div>
          </div>
        ))}
      </div>

      {/* Prominent Courtesy / Attribution */}
      <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center gap-1.5 text-[10px] text-slate-400">
        <Info className="w-3 h-3 text-sky-400 flex-shrink-0" />
        <span>
          <strong className="text-slate-300">Courtesy:</strong> Open-Meteo High-Resolution Weather Models (ECMWF IFS / GFS Integration).
        </span>
      </div>
    </div>
  );
}
