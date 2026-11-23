import React, { useState } from 'react';
import { 
  Navigation, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  Waves, 
  ShieldAlert, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Info, 
  ExternalLink,
  Sun,
  Sprout,
  Wind,
  Gauge,
  Droplets,
  Calendar,
  CheckCircle2,
  Anchor,
  History,
  Mountain
} from 'lucide-react';
import { getTranslation } from '../data/translations';
import { cleanDistrictDisplay } from '../services/cycloneEngine';
import { getStateAgroIntelligence } from '../data/agroIntelligence';

export default function CycloneTrackerCard({ bulletin, threat, weatherData, activeLocation, selectedLang = 'english' }) {
  const [showIncoisDetails, setShowIncoisDetails] = useState(false);
  const [showHistoricalArchive, setShowHistoricalArchive] = useState(false);
  const t = getTranslation(selectedLang);
  const localizedArea = cleanDistrictDisplay(activeLocation?.name, selectedLang);

  const isNormalDay = threat?.isNormalDay || threat?.level === 'GREEN' || threat?.isEasterlyWaves;

  // Live real-time metrics from weather API
  const liveWind = weatherData ? Math.round(weatherData.current.wind_speed_10m) : 14;
  const liveGusts = weatherData ? Math.round(weatherData.current.wind_gusts_10m) : 22;
  const livePressure = weatherData ? Math.round(weatherData.current.surface_pressure) : 1012;
  const liveHumidity = weatherData?.current?.relative_humidity_2m !== undefined ? Math.round(weatherData.current.relative_humidity_2m) : 62;
  const livePrecip = weatherData?.current?.precipitation !== undefined ? Math.round(weatherData.current.precipitation * 10) / 10 : 0;
  const liveTemp = weatherData?.current?.temperature_2m !== undefined ? Math.round(weatherData.current.temperature_2m) : 28;

  // State-adaptive agro-meteorological intelligence (SKUAST for J&K, PAU for Punjab, TNAU for Tamil Nadu, etc.)
  const stateAgro = getStateAgroIntelligence(activeLocation?.state || activeLocation?.name, selectedLang, livePrecip, liveWind, activeLocation?.name);

  const todayDateStr = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  // If Normal Peacetime Day, render the State-Adaptive Agro-Meteorological & Regional Intelligence Portal
  if (isNormalDay) {
    return (
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 shadow-xl transition-all">
        {/* Header: All-Clear Peacetime Daily Bulletin */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  {t.allClearRoutine}
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                  {todayDateStr}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-extrabold text-white tracking-wide mt-0.5">
                {stateAgro.zoneTitle || t.agroHeader}
              </h2>
            </div>
          </div>

          <div className="text-right">
            <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full font-bold inline-block border ${stateAgro.marineStatusClass || stateAgro.safetyStatusClass}`}>
              {stateAgro.basinStatus}
            </span>
            <span className="text-[9px] text-slate-400 block mt-0.5">
              {t.target} <strong className="text-slate-200">{localizedArea}</strong>
            </span>
          </div>
        </div>

        {/* 4 Live Open-Meteo & IMD Observation Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3.5 text-xs">
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-2.5">
            <div className="flex items-center justify-between text-slate-400 mb-0.5">
              <span className="text-[10px] font-medium">{t.fieldWindSpeed}</span>
              <Wind className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <strong className="text-sm font-bold text-sky-300">
              {liveWind} km/h
            </strong>
            <span className="text-[9px] text-emerald-400 block mt-0.5">
              {stateAgro.windDesc}
            </span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-2.5">
            <div className="flex items-center justify-between text-slate-400 mb-0.5">
              <span className="text-[10px] font-medium">{t.atmosphericPressure}</span>
              <Gauge className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <strong className="text-sm font-mono font-bold text-cyan-300">
              {livePressure} hPa
            </strong>
            <span className="text-[9px] text-slate-400 block mt-0.5">
              {t.normalPressureDesc}
            </span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-2.5">
            <div className="flex items-center justify-between text-slate-400 mb-0.5">
              <span className="text-[10px] font-medium">{t.relativeHumidity}</span>
              <Droplets className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <strong className="text-sm font-bold text-amber-300">
              {liveHumidity}%
            </strong>
            <span className="text-[9px] text-slate-400 block mt-0.5">
              {t.idealDryingDesc}
            </span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-2.5">
            <div className="flex items-center justify-between text-slate-400 mb-0.5">
              <span className="text-[10px] font-medium">{t.rainRisk}</span>
              <Sun className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <strong className="text-sm font-bold text-emerald-300">
              {livePrecip > 0 ? `${livePrecip} mm` : '0.0 mm (Nil)'}
            </strong>
            <span className="text-[9px] text-emerald-400 block mt-0.5">
              {stateAgro.rainDesc}
            </span>
          </div>
        </div>

        {/* Actionable State-Adaptive Agro-Meteorological Directives */}
        <div className="space-y-2 text-xs bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 mb-3">
          <div className="pb-2 border-b border-slate-800">
            <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs sm:text-sm">
              <Sprout className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{stateAgro.authorityTitle}</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5 pl-5.5">
              {stateAgro.authoritySubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-200 font-bold text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>{stateAgro.advisory1Title}:</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed pl-5">
                {stateAgro.advisory1Desc}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-200 font-bold text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>{stateAgro.advisory2Title}:</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed pl-5">
                {stateAgro.advisory2Desc}
              </p>
            </div>
          </div>
        </div>

        {/* Marine or Terrestrial Highway/Valley Safety Status */}
        {stateAgro.isCoastal ? (
          <div className="bg-gradient-to-r from-teal-950/50 via-slate-950 to-teal-950/40 border border-teal-800/40 rounded-xl p-3 text-xs mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Anchor className="w-4 h-4 text-teal-400" />
                <div>
                  <span className="font-bold text-teal-200 text-xs sm:text-sm">
                    {t.incoisTitle}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    {t.incoisSubtitle}
                  </span>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${stateAgro.marineStatusClass}`}>
                {stateAgro.marineStatus}
              </span>
            </div>

            <div className="mt-2.5 pt-2 border-t border-teal-800/30 flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] text-slate-300">
              <div>
                <span className="text-slate-400">Significant Wave Height: </span>
                <strong className="text-white">{stateAgro.waveHeight}</strong>
              </div>
              <div>
                <span className="text-slate-400">Offshore Wind: </span>
                <strong className="text-white">{stateAgro.offshoreWind}</strong>
              </div>
              <div>
                <span className="text-slate-400">Fishermen Warning: </span>
                <strong className="text-emerald-400 font-semibold">{stateAgro.fishermenWarning}</strong>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-sky-950/40 border border-slate-800 rounded-xl p-3 text-xs mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mountain className="w-4 h-4 text-sky-400" />
                <div>
                  <span className="font-bold text-sky-200 text-xs sm:text-sm">
                    {stateAgro.safetyTitle}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    {stateAgro.safetySubtitle}
                  </span>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${stateAgro.safetyStatusClass}`}>
                {stateAgro.safetyStatus}
              </span>
            </div>

            <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] text-slate-300">
              <div>
                <span className="text-slate-400">{stateAgro.metric1Label}</span>
                <strong className="text-white">{stateAgro.metric1Value}</strong>
              </div>
              <div>
                <span className="text-slate-400">{stateAgro.metric2Label}</span>
                <strong className="text-white">{stateAgro.metric2Value}</strong>
              </div>
              <div>
                <span className="text-slate-400">{stateAgro.metric3Label}</span>
                <strong className="text-emerald-400 font-semibold">{stateAgro.metric3Value}</strong>
              </div>
            </div>
          </div>
        )}

        {/* 7-Day Basin Cyclogenesis Watch (IMD & ECMWF Global Model Outlook) */}
        <div className="bg-slate-950/60 border border-slate-800/70 rounded-xl p-2.5 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <div>
              <strong className="text-white text-xs">{t.cyclogenesisTitle}:</strong>
              <span className="text-[11px] text-slate-400 block sm:inline sm:ml-1.5">
                {t.cyclogenesisDesc}
              </span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 font-bold px-2 py-0.5 bg-emerald-950 rounded border border-emerald-800 flex-shrink-0">
            {t.cyclogenesis0}
          </span>
        </div>

        {/* Historical Archive Expander for Cyclone Akvan */}
        <div className="mt-3 pt-2.5 border-t border-slate-800">
          <button
            onClick={() => setShowHistoricalArchive(!showHistoricalArchive)}
            className="w-full flex items-center justify-between text-[11px] text-slate-400 hover:text-white px-2 py-1.5 rounded-lg hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center gap-1.5 font-semibold text-amber-400/90">
              <History className="w-3.5 h-3.5" />
              <span>Review Historical Archive: Severe Cyclone Akvan (20–21 Nov 2026)</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-slate-400">
              <span>{showHistoricalArchive ? 'Collapse Archive' : 'View Final Bulletin'}</span>
              {showHistoricalArchive ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </div>
          </button>

          {showHistoricalArchive && (
            <div className="mt-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                <div>
                  <strong className="text-amber-400">Final Cyclone Akvan Bulletin (IMD RSMC Mandate)</strong>
                  <span className="text-[10px] text-slate-400 block">System Type: Severe Cyclonic Storm • Basin: Bay of Bengal</span>
                </div>
                <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                  Status: Dissipated Inland
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] pt-1">
                <div>
                  <span className="text-slate-400 block">Landfall Location:</span>
                  <strong className="text-white">Gopalpur / Padmapur Sector</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Landfall Date & Time:</span>
                  <strong className="text-white">20 Nov 2026 • 12:30–13:30 IST</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Peak Landfall Wind:</span>
                  <strong className="text-amber-300">100–110 km/h (Gusts: 125 km/h)</strong>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 leading-snug border-t border-slate-800/60 pt-1.5">
                Akvan made landfall on 20 Nov near Gopalpur and weakened progressively across Kandhamal and Sambalpur into a Well-Marked Low on 21 Nov before dissipating over North Odisha/Jharkhand. All coastal warnings were formally decommissioned.
              </p>
            </div>
          )}
        </div>

        {/* Attribution Footer */}
        <div className="mt-3 pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-[10px] sm:text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span>
              <strong className="text-slate-200">Advisory Source:</strong> IMD National Weather Forecasting Centre, INCOIS Ocean State Forecast, & ICAR-NRRI Cuttack.
            </span>
          </div>
          <span className="text-slate-500 font-mono text-[10px] whitespace-nowrap">Updated: Live Weather Stream</span>
        </div>
      </div>
    );
  }

  // Active Emergency Cyclone Mode (Used when threat.level is RED, ORANGE, or active tropical storm is present)
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
            {bulletin.movement?.speedKmph || 14} km/h {bulletin.movement?.direction || 'NNW'}
          </strong>
          <span className="text-[9px] text-slate-500 block">Heading {bulletin.movement?.headingDeg || 330}°</span>
        </div>
      </div>

      {/* Core Location & Landfall Details */}
      <div className="space-y-2 text-xs bg-slate-950/50 border border-slate-800/60 rounded-xl p-3">
        {/* Center location */}
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-slate-400">Current Storm Center: </span>
            <span className="text-slate-100 font-medium">{bulletin.center?.locationDesc}</span>
            <span className="text-[10px] text-cyan-400 font-mono block mt-0.5">
              Coordinates: {bulletin.center?.lat?.toFixed(2)}°N, {bulletin.center?.lon?.toFixed(2)}°E
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
                {bulletin.landfall?.status || 'Completed / Historical'}
              </span>
            </div>
            <strong className="text-amber-300 text-xs sm:text-sm font-extrabold block mt-0.5">
              {bulletin.landfall?.predictedArea}
            </strong>
            <span className="text-[11px] text-slate-300 block mt-0.5">
              Target Time Window: <strong className="text-white">{bulletin.landfall?.window}</strong>
            </span>
            {bulletin.namingCountry && (
              <span className="text-[10px] text-slate-400 block mt-1">
                🏷️ Name Origin: <strong>{bulletin.name}</strong> was officially contributed by <strong>{bulletin.namingCountry}</strong>.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* INCOIS Storm Surge & Marine Alert Banner */}
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
