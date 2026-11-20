import React from 'react';
import { Navigation, Clock, MapPin, Eye, ExternalLink, Info } from 'lucide-react';

export default function CycloneTrackerCard({ bulletin }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
          <h2 className="text-sm font-bold text-white tracking-wide">
            IMD Cyclone Bulletin: {bulletin.name}
          </h2>
        </div>
        <span className="text-[10px] font-mono bg-red-950 text-red-400 border border-red-800 px-2 py-0.5 rounded-full">
          {bulletin.status}
        </span>
      </div>

      <div className="space-y-2.5 text-xs">
        {/* Center location */}
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-slate-400">Current Center: </span>
            <span className="text-slate-100 font-medium">{bulletin.center.locationDesc}</span>
            <span className="text-[11px] text-slate-500 block font-mono">
              Coordinates: {bulletin.center.lat}°N, {bulletin.center.lon}°E
            </span>
          </div>
        </div>

        {/* Forward movement */}
        <div className="flex items-start gap-2">
          <Navigation className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-slate-400">Movement: </span>
            <span className="text-slate-100 font-medium">
              Moving {bulletin.movement.direction} at {bulletin.movement.speedKmph} km/h
            </span>
          </div>
        </div>

        {/* Landfall Forecast */}
        <div className="flex items-start gap-2">
          <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-slate-400">Expected Landfall: </span>
            <span className="text-amber-300 font-bold block">{bulletin.landfall.predictedArea}</span>
            <span className="text-[11px] text-slate-400 block">Time window: {bulletin.landfall.window}</span>
            {bulletin.namingCountry && (
              <span className="text-[10px] text-cyan-400 font-medium block mt-1">
                🏷️ Official Name: <strong>{bulletin.name}</strong> • Contributed by {bulletin.namingCountry}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Prominent Courtesy / Attribution */}
      <div className="mt-3.5 pt-2.5 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
          <span>
            <strong className="text-slate-300">Courtesy:</strong> India Meteorological Department (IMD), RSMC New Delhi, Ministry of Earth Sciences, Govt. of India.
          </span>
        </div>
        <span className="text-slate-500 font-mono text-[10px] whitespace-nowrap">Updated: {bulletin.bulletinTime}</span>
      </div>
    </div>
  );
}
