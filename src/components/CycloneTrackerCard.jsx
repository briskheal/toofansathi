import React, { useState } from 'react';
import { Navigation, Clock, MapPin, AlertTriangle, Waves, ShieldAlert, ChevronDown, ChevronUp, Info, ExternalLink } from 'lucide-react';

export default function CycloneTrackerCard({ bulletin }) {
  const [showIncoisDetails, setShowIncoisDetails] = useState(false);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-lg transition-all">
      {/* Top Header: System Name & Official IMD Warning Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
          </span>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm sm:text-base font-extrabold text-white tracking-wide">
                {bulletin.name}
              </h2>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40">
                RED ALERT
              </span>
            </div>
            {bulletin.bulletinNo && (
              <span className="text-[10px] text-slate-400 font-mono block">
                {bulletin.bulletinNo} • National Cyclone Warning Centre
              </span>
            )}
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] sm:text-[11px] font-mono bg-red-950/80 text-red-300 border border-red-800 px-2 py-0.5 rounded-full font-bold block">
            {bulletin.status}
          </span>
          <span className="text-[9px] text-emerald-400 font-medium">Official IMD RSMC Mandate</span>
        </div>
      </div>

      {/* Primary Meteorological Metrics Strip (Desktop 4-col, Mobile 2-col) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 text-xs">
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-2.5">
          <span className="text-[10px] text-slate-400 block font-medium">Sustained Wind (IMD)</span>
          <strong className="text-sm font-bold text-amber-400">
            {bulletin.maxSustainedWindKmph || 95} km/h
          </strong>
          <span className="text-[9px] text-slate-500 block">3-Min Average (51 Knots)</span>
        </div>

        <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-2.5">
          <span className="text-[10px] text-slate-400 block font-medium">Peak Gusts</span>
          <strong className="text-sm font-bold text-red-400">
            {bulletin.peakGustsKmph || 115} km/h
          </strong>
          <span className="text-[9px] text-slate-500 block">Coastal Exposure Peak</span>
        </div>

        <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-2.5">
          <span className="text-[10px] text-slate-400 block font-medium">Central Pressure</span>
          <strong className="text-sm font-mono font-bold text-cyan-300">
            {bulletin.centralPressureHpa || 988} hPa
          </strong>
          <span className="text-[9px] text-slate-500 block">Deep Pressure Well</span>
        </div>

        <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-2.5">
          <span className="text-[10px] text-slate-400 block font-medium">Forward Movement</span>
          <strong className="text-sm font-bold text-emerald-400">
            {bulletin.movement.speedKmph} km/h {bulletin.movement.direction}
          </strong>
          <span className="text-[9px] text-slate-500 block">Heading {bulletin.movement.headingDeg}°</span>
        </div>
      </div>

      {/* Core Location & Landfall Details */}
      <div className="space-y-2 text-xs bg-slate-950/50 border border-slate-800/60 rounded-xl p-3">
        {/* Center location */}
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-slate-400">Current Storm Center: </span>
            <span className="text-slate-100 font-medium">{bulletin.center.locationDesc}</span>
            <span className="text-[10px] text-cyan-400 font-mono block mt-0.5">
              Coordinates: {bulletin.center.lat.toFixed(2)}°N, {bulletin.center.lon.toFixed(2)}°E
            </span>
          </div>
        </div>

        {/* Landfall Forecast */}
        <div className="flex items-start gap-2 pt-1 border-t border-slate-800/70">
          <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="w-full">
            <div className="flex flex-wrap items-center justify-between gap-1">
              <span className="text-slate-400">Official Landfall Sector (IMD): </span>
              <span className="text-[10px] bg-amber-950/80 text-amber-300 border border-amber-800/80 px-2 py-0.5 rounded font-bold">
                {bulletin.landfall.status || 'Imminent'}
              </span>
            </div>
            <strong className="text-amber-300 text-xs sm:text-sm font-extrabold block mt-0.5">
              {bulletin.landfall.predictedArea}
            </strong>
            <span className="text-[11px] text-slate-300 block mt-0.5">
              Target Time Window: <strong className="text-white">{bulletin.landfall.window}</strong>
            </span>
            {bulletin.namingCountry && (
              <span className="text-[10px] text-slate-400 block mt-1">
                🏷️ Name Origin: <strong>{bulletin.name}</strong> was officially contributed by <strong>{bulletin.namingCountry}</strong>.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* INCOIS Storm Surge & Marine Alert Banner (Official Govt of India Ocean Warning) */}
      {bulletin.incoisAlert && (
        <div className="mt-2.5 bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border border-cyan-800/60 rounded-xl p-2.5 text-xs text-cyan-200">
          <div
            onClick={() => setShowIncoisDetails(!showIncoisDetails)}
            className="flex items-center justify-between cursor-pointer select-none"
          >
            <div className="flex items-center gap-1.5 font-bold text-cyan-300">
              <Waves className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>INCOIS Govt Marine & Storm Surge Alert</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-200">
              <span>{showIncoisDetails ? 'Hide' : 'Details'}</span>
              {showIncoisDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </div>
          </div>

          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px]">
            <div>
              <span className="text-slate-400">Storm Surge: </span>
              <strong className="text-white">{bulletin.incoisAlert.surgeHeight}</strong> above normal astronomical tide
            </div>
            <div>
              <span className="text-slate-400">High Waves: </span>
              <strong className="text-white">{bulletin.incoisAlert.waveHeight}</strong> offshore
            </div>
          </div>

          {showIncoisDetails && (
            <div className="mt-2 pt-2 border-t border-cyan-800/50 space-y-1 text-[10px] sm:text-[11px] text-cyan-100/90">
              <p>
                <strong>Inundation Vulnerability:</strong> Low-lying coastal belts of {bulletin.incoisAlert.inundationAreas}.
              </p>
              <p className="text-amber-300 font-medium">
                ⚠️ {bulletin.incoisAlert.fishermenAdvisory}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Prominent Courtesy / Attribution Bar */}
      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-[10px] sm:text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
          <span>
            <strong className="text-slate-200">Statutory Authority:</strong> India Meteorological Department (IMD / MoES) & INCOIS, Govt. of India.
          </span>
        </div>
        <span className="text-slate-500 font-mono text-[10px] whitespace-nowrap">Official Bulletin: {bulletin.bulletinTime}</span>
      </div>
    </div>
  );
}
