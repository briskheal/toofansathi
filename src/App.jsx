import React, { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from './components/Navbar';
import ThreatBanner from './components/ThreatBanner';
import VoiceBriefingCard from './components/VoiceBriefingCard';
import LiveMetricsGrid from './components/LiveMetricsGrid';
import CycloneTrackerCard from './components/CycloneTrackerCard';
import CycloneMap from './components/CycloneMap';
import HourlyForecastStrip from './components/HourlyForecastStrip';
import EmergencyDirectoryModal from './components/EmergencyDirectoryModal';
import SafetyModal from './components/SafetyModal';
import PwaInstallPrompt from './components/PwaInstallPrompt';
import BottomNav from './components/BottomNav';
import TravelPlannerModal from './components/TravelPlannerModal';
import DistrictPickerModal from './components/DistrictPickerModal';

import { ALL_INDIA_REGIONS, findNearestDistrict } from './data/districts';
import { fetchLiveWeather } from './services/weatherApi';
import {
  ALL_INDIA_ACTIVE_STORMS,
  getNearestStorm,
  getLiveEstimatedStorm,
  calculateDistanceKm,
  calculateBearingDirection,
  evaluateThreatLevel,
  generateVoiceBriefing
} from './services/cycloneEngine';

import { MapPin, Locate, RefreshCw, AlertCircle, Navigation, Globe, Calendar, ChevronDown } from 'lucide-react';

export default function App() {
  const [selectedDistrictId, setSelectedDistrictId] = useState('puri');
  const [customGpsLocation, setCustomGpsLocation] = useState(null);
  const [isDistrictPickerOpen, setIsDistrictPickerOpen] = useState(false);
  const [selectedStormId, setSelectedStormId] = useState('BOB-01-2026');
  const [autoSelectNearestStorm, setAutoSelectNearestStorm] = useState(true);

  const [gpsAccuracy, setGpsAccuracy] = useState(null);
  const [gpsTimestamp, setGpsTimestamp] = useState(null);
  const [isWatchActive, setIsWatchActive] = useState(false);
  const watchIdRef = useRef(null);

  const [selectedLang, setSelectedLang] = useState('english'); // Default to English as primary language
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [lastUpdated, setLastUpdated] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Modals
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isSafetyOpen, setIsSafetyOpen] = useState(false);
  const [isTravelPlannerOpen, setIsTravelPlannerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('alert');

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(`${sectionId}-section`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Active location object (either GPS or selected district)
  const activeLocation = customGpsLocation ||
    ALL_INDIA_REGIONS.find((d) => d.id === selectedDistrictId) ||
    ALL_INDIA_REGIONS[0];

  // Real-time ticker for live storm dead reckoning (every 20s)
  const [liveClock, setLiveClock] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveClock(new Date());
    }, 20000);
    return () => clearInterval(timer);
  }, []);

  // Compute live dead-reckoned storms moving along trajectory
  const liveAllStorms = ALL_INDIA_ACTIVE_STORMS.map(s => getLiveEstimatedStorm(s, liveClock));

  // Active cyclone bulletin (auto-pick nearest or user-selected)
  const baseStorm = autoSelectNearestStorm
    ? getNearestStorm(activeLocation.lat, activeLocation.lon)
    : (ALL_INDIA_ACTIVE_STORMS.find(s => s.id === selectedStormId) || ALL_INDIA_ACTIVE_STORMS[0]);

  const activeStorm = liveAllStorms.find(s => s.id === baseStorm.id) || getLiveEstimatedStorm(baseStorm, liveClock);

  // Fetch weather data for the active location
  const loadWeather = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetchLiveWeather(activeLocation.lat, activeLocation.lon);
      setWeatherData(res.data);
      setIsOffline(res.isOffline);
      setLastUpdated(new Date(res.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Unable to retrieve weather. Please check connection.');
    } finally {
      setIsLoading(false);
    }
  }, [activeLocation.lat, activeLocation.lon]);

  // Online / Offline & Auto-Sync listeners
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      loadWeather();
    };
    const handleOffline = () => setIsOffline(true);
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadWeather();
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [loadWeather]);

  // Periodic Auto-Refresh: fetch fresh weather observations every 2 minutes
  useEffect(() => {
    loadWeather();
    const weatherTimer = setInterval(() => {
      loadWeather();
    }, 120000); // 2 minutes (120s)
    return () => clearInterval(weatherTimer);
  }, [loadWeather]);

  // Handle GPS location acquisition (silent on initial auto-detect, alert only on user-initiated click)
  const handleUseGps = useCallback((isSilent = false) => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        if (!isSilent) alert('Geolocation is not supported by your browser.');
        reject(new Error('Geolocation not supported'));
        return;
      }

      if (!isSilent) setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          const accuracy = pos.coords.accuracy;
          const nearest = findNearestDistrict(lat, lon);

          setGpsAccuracy(accuracy);
          const nowGps = new Date();
          const dateStr = nowGps.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
          const timeStr = nowGps.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          setGpsTimestamp(`${dateStr}, ${timeStr}`);

          const newLoc = {
            id: 'gps_device',
            name: `Live GPS (Near ${nearest.name})`,
            state: nearest.state,
            basin: nearest.basin,
            lat: lat,
            lon: lon,
            accuracy: accuracy,
            highRisk: nearest.highRisk || false,
            deoc: nearest.deoc
          };

          setCustomGpsLocation(newLoc);
          if (!isSilent) setIsLoading(false);
          resolve(newLoc);
        },
        (err) => {
          console.warn('GPS error:', err);
          if (!isSilent) {
            setIsLoading(false);
            alert('Could not access GPS. Please check location permissions in your browser or select your district manually.');
          }
          reject(err);
        },
        { timeout: 10000, enableHighAccuracy: true, maximumAge: 30000 }
      );
    });
  }, []);

  // Auto-detect GPS coordinates by default on initial app load
  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      handleUseGps(true).catch((err) => {
        console.info('Default GPS auto-detect fallback:', err?.message || err);
      });
    }
  }, [handleUseGps]);

  // Continuous live GPS tracking toggle
  const toggleLiveTracking = () => {
    if (isWatchActive) {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      setIsWatchActive(false);
    } else {
      if (!navigator.geolocation) {
        alert('Geolocation is not supported.');
        return;
      }
      setIsWatchActive(true);
      const id = navigator.geolocation.watchPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          const accuracy = pos.coords.accuracy;
          const nearest = findNearestDistrict(lat, lon);

          setGpsAccuracy(accuracy);
          const nowGps = new Date();
          const dateStr = nowGps.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
          const timeStr = nowGps.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          setGpsTimestamp(`${dateStr}, ${timeStr}`);

          setCustomGpsLocation({
            id: 'gps_device',
            name: `Live Tracking (${nearest.name})`,
            state: nearest.state,
            basin: nearest.basin,
            lat: lat,
            lon: lon,
            accuracy: accuracy,
            highRisk: true,
            deoc: nearest.deoc
          });
        },
        (err) => {
          console.warn('Live watch error:', err);
          setIsWatchActive(false);
        },
        { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 }
      );
      watchIdRef.current = id;
    }
  };

  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  // Calculations for current active storm
  const distanceKm = calculateDistanceKm(
    activeLocation.lat,
    activeLocation.lon,
    activeStorm.center.lat,
    activeStorm.center.lon
  );

  const bearing = calculateBearingDirection(
    activeLocation.lat,
    activeLocation.lon,
    activeStorm.center.lat,
    activeStorm.center.lon
  );

  const currentWind = weatherData ? Math.round(weatherData.current.wind_speed_10m) : 42;
  const currentGusts = weatherData ? Math.round(weatherData.current.wind_gusts_10m) : 58;
  const currentRain = weatherData?.current?.precipitation !== undefined ? Math.round(weatherData.current.precipitation * 10) / 10 : 0;

  // Calculate true accumulated forecast rain for the next 3 hours & overnight outlook
  let next3hRain = 0;
  let next12hRain = 0;
  let heavyRainArrival = null;

  if (weatherData?.hourly?.precipitation && weatherData?.hourly?.time) {
    const nowMs = Date.now();
    let startIndex = weatherData.hourly.time.findIndex((t) => {
      const d = new Date(t);
      return d.getTime() >= nowMs - 45 * 60 * 1000;
    });
    if (startIndex === -1) startIndex = 0;

    // Sum next 3 hours forecast
    const slice3h = weatherData.hourly.precipitation.slice(startIndex, startIndex + 3);
    const sum3h = slice3h.reduce((acc, val) => acc + (val || 0), 0);
    next3hRain = Math.round(sum3h * 10) / 10;

    // Sum next 12 hours forecast
    const slice12h = weatherData.hourly.precipitation.slice(startIndex, startIndex + 12);
    const sum12h = slice12h.reduce((acc, val) => acc + (val || 0), 0);
    next12hRain = Math.round(sum12h * 10) / 10;

    // Detect earliest hour with heavy downpour (>= 3.0 mm/h)
    for (let i = 0; i < Math.min(12, weatherData.hourly.precipitation.length - startIndex); i++) {
      const p = weatherData.hourly.precipitation[startIndex + i] || 0;
      if (p >= 3.0) {
        const timeObj = new Date(weatherData.hourly.time[startIndex + i]);
        heavyRainArrival = {
          time: timeObj.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }),
          rate: Math.round(p * 10) / 10
        };
        break;
      }
    }
  } else if (weatherData) {
    next3hRain = currentRain;
    next12hRain = currentRain * 4;
  } else {
    next3hRain = 12;
    next12hRain = 45;
  }

  const pressureHpa = weatherData ? Math.round(weatherData.current.surface_pressure) : 998;
  const currentTemp = weatherData?.current?.temperature_2m !== undefined ? Math.round(weatherData.current.temperature_2m) : 26;
  const apparentTemp = weatherData?.current?.apparent_temperature !== undefined ? Math.round(weatherData.current.apparent_temperature) : 25;
  const maxTemp = weatherData?.daily?.temperature_2m_max?.[0] !== undefined ? Math.round(weatherData.daily.temperature_2m_max[0]) : 29;
  const minTemp = weatherData?.daily?.temperature_2m_min?.[0] !== undefined ? Math.round(weatherData.daily.temperature_2m_min[0]) : 17;
  const humidity = weatherData?.current?.relative_humidity_2m !== undefined ? Math.round(weatherData.current.relative_humidity_2m) : 68;

  const threat = evaluateThreatLevel(distanceKm, currentWind, currentGusts, next3hRain);
  const voiceBriefing = generateVoiceBriefing(
    selectedLang,
    threat,
    activeLocation.name,
    distanceKm,
    currentWind,
    currentGusts,
    bearing.text,
    minTemp,
    maxTemp
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        isOffline={isOffline}
        lastUpdated={lastUpdated}
        selectedLang={selectedLang}
        setSelectedLang={setSelectedLang}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenSafety={() => setIsSafetyOpen(true)}
      />

      {/* Main Field Dashboard */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-3 sm:p-5 space-y-3.5">
        {/* All-India Basin & Active Storm Switcher Bar */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Globe className="w-4 h-4 text-sky-400" />
            <span className="font-bold">All-India Storm Monitor:</span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {ALL_INDIA_ACTIVE_STORMS.map((storm) => (
              <button
                key={storm.id}
                onClick={() => {
                  setAutoSelectNearestStorm(false);
                  setSelectedStormId(storm.id);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all border ${
                  activeStorm.id === storm.id
                    ? 'bg-sky-600 text-white border-sky-400 shadow-sm'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <span>{storm.basin}</span>
                <span className="text-[10px] ml-1 opacity-80">({storm.name.split('/')[0].trim()})</span>
              </button>
            ))}
            <button
              onClick={() => setAutoSelectNearestStorm(true)}
              className={`px-2 py-1 rounded-lg text-[11px] font-medium border ${
                autoSelectNearestStorm
                  ? 'bg-emerald-600 text-white border-emerald-400'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              Auto-Track Closest
            </button>
          </div>
        </section>

        {/* District & GPS Selector Bar (Mobile-Boundary Safe) */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col gap-2.5 overflow-hidden">
          <div className="flex items-center gap-1.5 flex-1 min-w-0 w-full">
            <span className="text-xs font-bold text-slate-400 flex-shrink-0">Area:</span>
            
            {/* Mobile-Friendly Searchable District Trigger */}
            <button
              type="button"
              onClick={() => setIsDistrictPickerOpen(true)}
              className="flex-1 min-w-0 flex items-center justify-between bg-slate-800/90 hover:bg-slate-800 active:bg-slate-750 text-slate-100 text-xs font-semibold rounded-lg px-2.5 py-1.5 border border-slate-700/80 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
              title="Click to search and change district / state"
            >
              <div className="flex items-center gap-1.5 min-w-0 truncate">
                <MapPin className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                <span className="truncate font-bold">
                  {customGpsLocation ? customGpsLocation.name : `${activeLocation.name} (${activeLocation.state})`}
                </span>
                {activeLocation.highRisk && (
                  <span className="text-[9px] bg-red-950/80 text-red-300 border border-red-700/60 px-1 py-0.2 rounded font-medium flex-shrink-0">
                    Risk
                  </span>
                )}
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 ml-1.5" />
            </button>
          </div>

          {/* 4 Equally Distributed Control Buttons (Plan Visit, GPS Fix, Live Watch, Refresh) */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2 w-full pt-1">
            {/* 1. Plan Visit Button */}
            <button
              onClick={() => setIsTravelPlannerOpen(true)}
              className="w-full flex items-center justify-center gap-1 px-1 sm:px-2 py-2 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white rounded-xl text-[11px] sm:text-xs font-bold transition-all shadow-sm border border-sky-500/40"
              title="Plan field visit on future dates (5-7 days outlook)"
            >
              <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">Plan Visit</span>
            </button>

            {/* 2. Instant GPS Refresh Button */}
            <button
              onClick={handleUseGps}
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-1 px-1 sm:px-2 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all border ${
                customGpsLocation
                  ? 'bg-sky-600 text-white border-sky-400 shadow-sm'
                  : 'bg-slate-800/90 hover:bg-slate-700 text-sky-400 border-slate-700/80'
              }`}
              title="Detect or refresh exact GPS location"
            >
              <Locate className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{customGpsLocation ? 'GPS Fix' : 'Use GPS'}</span>
            </button>

            {/* 3. Continuous Live Watch Toggle */}
            <button
              onClick={toggleLiveTracking}
              className={`w-full flex items-center justify-center gap-1 px-1 sm:px-2 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all border ${
                isWatchActive
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-sm ring-1 ring-emerald-400/50'
                  : 'bg-slate-800/90 hover:bg-slate-700 text-slate-300 border-slate-700/80'
              }`}
              title="Continuously track GPS as you move in the field"
            >
              <Navigation className={`w-3.5 h-3.5 flex-shrink-0 ${isWatchActive ? 'animate-pulse text-white' : 'text-slate-400'}`} />
              <span className="truncate">{isWatchActive ? 'Live ON' : 'Live Watch'}</span>
            </button>

            {/* 4. Reload Weather & Bulletin */}
            <button
              onClick={loadWeather}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-1 px-1 sm:px-2 py-2 bg-slate-800/90 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700/80 text-[11px] sm:text-xs font-bold transition-all shadow-sm"
              title="Refresh weather data and IMD status"
            >
              <RefreshCw className={`w-3.5 h-3.5 flex-shrink-0 ${isLoading ? 'animate-spin text-sky-400' : 'text-slate-400'}`} />
              <span className="truncate">Refresh</span>
            </button>
          </div>
        </section>

        {/* Live GPS Status Indicator Bar (When GPS is active) */}
        {customGpsLocation && (
          <div className="bg-sky-950/40 border border-sky-800/60 rounded-xl px-3 py-2 flex flex-wrap items-center justify-between gap-2 text-xs text-sky-200">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping flex-shrink-0"></span>
              <span>
                <strong>Live Coordinates:</strong> {activeLocation.lat.toFixed(4)}°N, {activeLocation.lon.toFixed(4)}°E
                {gpsAccuracy && ` (Accuracy: ±${Math.round(gpsAccuracy)}m)`}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-sky-900/60 border border-sky-700/60 text-[10px] text-sky-300 font-mono font-medium">
                📅 {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span>Updated: <strong className="text-slate-300 font-mono">{gpsTimestamp || `${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`}</strong></span>
              <button
                onClick={handleUseGps}
                className="text-sky-400 hover:text-sky-300 underline font-semibold flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3 inline" />
                <span>Refresh Now</span>
              </button>
            </div>
          </div>
        )}

        {/* Error Notice */}
        {errorMsg && (
          <div className="bg-red-950/60 border border-red-800 rounded-xl p-3 flex items-center gap-2.5 text-xs text-red-300">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* 1. Main Actionable Threat Banner (Red/Orange/Yellow/Green) */}
        <div id="alert-section" className="scroll-mt-16">
          <ThreatBanner threat={threat} districtName={activeLocation.name} />
        </div>

        {/* 2. One-Tap 30-Second Audio Briefing (Odia/Bengali/Hindi/English) */}
        <VoiceBriefingCard briefing={voiceBriefing} selectedLang={selectedLang} />

        {/* 3. Core Real-time Indicators & Winter Temperature Range */}
        <LiveMetricsGrid
          distanceKm={distanceKm}
          directionText={bearing.text}
          distanceToCoastKm={activeStorm.distanceToCoastKm}
          nearestCoastName={activeStorm.nearestCoastName}
          movementSpeed={activeStorm.movement?.speedKmph}
          movementDirection={activeStorm.movement?.direction}
          windSpeed={currentWind}
          windGusts={currentGusts}
          rainMm={next3hRain}
          currentRain={currentRain}
          next12hRain={next12hRain}
          heavyRainArrival={heavyRainArrival}
          pressureHpa={pressureHpa}
          currentTemp={currentTemp}
          maxTemp={maxTemp}
          minTemp={minTemp}
          apparentTemp={apparentTemp}
          humidity={humidity}
        />

        {/* 4. IMD Official Cyclone Bulletin Card */}
        <CycloneTrackerCard bulletin={activeStorm} />

        {/* 5. 10-Hour Forecast Timeline */}
        {weatherData && (
          <div id="forecast-section" className="scroll-mt-16">
            <HourlyForecastStrip hourlyData={weatherData.hourly} />
          </div>
        )}

        {/* 6. Leaflet Radar & Cyclone Track Map with Center Me & Refresh */}
        <div id="radar-section" className="scroll-mt-16">
          <CycloneMap
            userLocation={activeLocation}
            stormCenter={activeStorm.center}
            landfallArea={activeStorm.landfall.predictedArea}
            onRefreshLocation={handleUseGps}
            isGpsActive={!!customGpsLocation}
            activeStorm={activeStorm}
            allStorms={liveAllStorms}
          />
        </div>

        {/* 7. Install PWA Prompt for Mobile Home Screen */}
        <PwaInstallPrompt />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 p-4 sm:p-6 text-center text-xs text-slate-500 mb-16 sm:mb-0 space-y-1.5">
        <p className="font-semibold text-slate-300">ToofanSathi.in • Pan-India Cyclone & Disaster Early Warning System</p>
        <p className="text-[11px] text-slate-400">
          Covering Bay of Bengal, Arabian Sea & Coastal Belts (Data: IMD RSMC New Delhi, INCOIS & ECMWF/GFS High-Res Models).
        </p>
        <p className="text-[10px] text-slate-500">
          Offline-first PWA designed for agricultural, coastal communities, and emergency disaster relief teams across India.
        </p>
        <div className="pt-2 border-t border-slate-900/80 text-[11px] text-slate-400">
          © {new Date().getFullYear()} ToofanSathi. All Rights Reserved.
        </div>
      </footer>

      {/* Native Mobile Bottom Navigation Bar */}
      <BottomNav
        activeSection={activeSection}
        onSelectSection={scrollToSection}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenSafety={() => setIsSafetyOpen(true)}
      />

      {/* Modals */}
      <DistrictPickerModal
        isOpen={isDistrictPickerOpen}
        onClose={() => setIsDistrictPickerOpen(false)}
        selectedDistrictId={selectedDistrictId}
        isGpsActive={!!customGpsLocation}
        gpsLocationName={customGpsLocation?.name}
        onSelectDistrict={(id) => {
          if (watchIdRef.current !== null) {
            navigator.geolocation.clearWatch(watchIdRef.current);
            watchIdRef.current = null;
            setIsWatchActive(false);
          }
          setCustomGpsLocation(null);
          setSelectedDistrictId(id);
        }}
        onUseGps={handleUseGps}
      />

      <TravelPlannerModal
        isOpen={isTravelPlannerOpen}
        onClose={() => setIsTravelPlannerOpen(false)}
        initialDistrictId={selectedDistrictId}
      />

      <EmergencyDirectoryModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        currentDistrict={activeLocation}
      />

      <SafetyModal
        isOpen={isSafetyOpen}
        onClose={() => setIsSafetyOpen(false)}
      />
    </div>
  );
}
