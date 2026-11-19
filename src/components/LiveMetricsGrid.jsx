import React from 'react';
import { Compass, Wind, CloudRain, Gauge, Info, Thermometer, ThermometerSnowflake, ThermometerSun } from 'lucide-react';

export default function LiveMetricsGrid({
  distanceKm,
  directionText,
  windSpeed,
  windGusts,
  rainMm,
  pressureHpa,
  currentTemp,
  maxTemp,
  minTemp,
  apparentTemp,
  humidity
}) {
  const isColdLow = minTemp !== undefined && minTemp !== null && minTemp <= 15;
  const isSevereCold = minTemp !== undefined && minTemp !== null && minTemp <= 10;

  return (
    <div className="space-y-1.5">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5">
        
        {/* Metric 1: Distance to Storm Center */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">Cyclone Eye</span>
            <Compass className="w-4 h-4 text-sky-400" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-white">
              {distanceKm} <span className="text-xs font-semibold text-slate-400">km</span>
            </div>
            <p className="text-[11px] text-sky-400 font-medium truncate mt-0.5">
              Towards {directionText}
            </p>
          </div>
        </div>

        {/* Metric 2: Wind & Peak Gusts */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">Wind & Gusts</span>
            <Wind className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-white">
              {windSpeed} <span className="text-xs font-semibold text-slate-400">km/h</span>
            </div>
            <p className="text-[11px] text-amber-400 font-medium truncate mt-0.5">
              Gusts to {windGusts} km/h
            </p>
          </div>
        </div>

        {/* Metric 3: Winter & Day Temp (Max / Min) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
              {isColdLow ? 'Winter Temp' : 'Temperature'}
            </span>
            {isColdLow ? (
              <ThermometerSnowflake className="w-4 h-4 text-cyan-400 animate-pulse" />
            ) : (
              <Thermometer className="w-4 h-4 text-rose-400" />
            )}
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-white">
                {currentTemp !== undefined ? `${currentTemp}°` : '--'}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                (Feels {apparentTemp !== undefined ? `${apparentTemp}°` : '--'})
              </span>
            </div>
            
            {/* Max & Min Badges */}
            <div className="flex items-center gap-1.5 mt-1 text-[11px] font-bold">
              <span className="flex items-center text-amber-400" title="Day Maximum Temperature">
                ▲ {maxTemp !== undefined ? `${maxTemp}°C` : '--'}
              </span>
              <span className="text-slate-600">•</span>
              <span className={`flex items-center ${isSevereCold ? 'text-cyan-300 font-extrabold' : isColdLow ? 'text-cyan-400' : 'text-blue-300'}`} title="Winter / Night Minimum Temperature">
                ▼ {minTemp !== undefined ? `${minTemp}°C` : '--'}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5 truncate">
              {isSevereCold ? '❄️ Cold Wave Chill' : isColdLow ? '❄️ Chilly Morning Low' : 'Mild Season Temp'}
            </p>
          </div>
        </div>

        {/* Metric 4: 3-Hour Expected Rain */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">Next 3h Rain</span>
            <CloudRain className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-white">
              {rainMm} <span className="text-xs font-semibold text-slate-400">mm</span>
            </div>
            <p className="text-[11px] text-blue-400 font-medium truncate mt-0.5">
              {rainMm > 30 ? 'Heavy Downpour' : rainMm > 10 ? 'Moderate Rain' : rainMm > 0 ? 'Light Showers' : 'Dry / Clear'}
            </p>
          </div>
        </div>

        {/* Metric 5: Atmospheric Pressure */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col justify-between col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">Barometer</span>
            <Gauge className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-white">
              {pressureHpa} <span className="text-xs font-semibold text-slate-400">hPa</span>
            </div>
            <p className={`text-[11px] font-medium truncate mt-0.5 ${pressureHpa < 1000 ? 'text-red-400 font-bold' : 'text-slate-400'}`}>
              {pressureHpa < 995 ? 'Deep Depression Low' : pressureHpa < 1005 ? 'Falling Barometer' : 'Normal Pressure'}
            </p>
          </div>
        </div>

      </div>

      {/* Attribution line */}
      <div className="flex items-center justify-between px-1 text-[10px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <Info className="w-3 h-3 text-sky-400 flex-shrink-0" />
          <span>
            <strong className="text-slate-400">Courtesy:</strong> Open-Meteo High-Resolution Observations & IMD AWS (Live Max/Min Temp & Pressure).
          </span>
        </div>
        {humidity !== undefined && (
          <span className="text-slate-400 font-mono hidden sm:inline">
            Humidity: {humidity}%
          </span>
        )}
      </div>
    </div>
  );
}
