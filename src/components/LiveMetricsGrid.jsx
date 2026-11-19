import React from 'react';
import { Compass, Wind, CloudRain, Gauge, Info } from 'lucide-react';

export default function LiveMetricsGrid({
  distanceKm,
  directionText,
  windSpeed,
  windGusts,
  rainMm,
  pressureHpa
}) {
  return (
    <div className="space-y-1.5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        {/* Distance to Storm Center */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-medium uppercase tracking-wider">Cyclone Eye</span>
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

        {/* Wind & Peak Gusts */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-medium uppercase tracking-wider">Wind & Gusts</span>
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

        {/* 3-Hour Expected Rain */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-medium uppercase tracking-wider">Next 3h Rain</span>
            <CloudRain className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-white">
              {rainMm} <span className="text-xs font-semibold text-slate-400">mm</span>
            </div>
            <p className="text-[11px] text-blue-400 font-medium truncate mt-0.5">
              {rainMm > 30 ? 'Heavy Downpour' : rainMm > 10 ? 'Moderate Showers' : 'Light Showers'}
            </p>
          </div>
        </div>

        {/* Atmospheric Pressure */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-medium uppercase tracking-wider">Barometer</span>
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
      <div className="flex items-center gap-1.5 px-1 text-[10px] text-slate-500">
        <Info className="w-3 h-3 text-sky-400 flex-shrink-0" />
        <span>
          <strong className="text-slate-400">Courtesy:</strong> Open-Meteo Surface Weather Observation API & IMD Automatic Weather Stations (AWS).
        </span>
      </div>
    </div>
  );
}
