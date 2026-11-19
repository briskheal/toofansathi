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

  const [selectedLang, setSelectedLang] = useState('odia'); // Default to Odia for Eastern coast
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

  // Active cyclone bulletin (auto-pick nearest or user-selected)
  const activeStorm = autoSelectNearestStorm
    ? getNearestStorm(activeLocation.lat, activeLocation.lon)
    : (ALL_INDIA_ACTIVE_STORMS.find(s => s.id === selectedStormId) || ALL_INDIA_ACTIVE_STORMS[0]);

  // Online / Offline listeners
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

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

  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  // Handle single GPS refresh
  const handleUseGps = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser.');
        reject(new Error('Geolocation not supported'));
        return;
      }

      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          const accuracy = pos.coords.accuracy;
          const nearest = findNearestDistrict(lat, lon);

          setGpsAccuracy(accuracy);
          setGpsTimestamp(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

          const newLoc = {
            id: 'gps_device',
            name: `Live GPS (Near ${nearest.name})`,
            state: nearest.state,
            basin: nearest.basin,
            lat: lat,
            lon: lon,
            accuracy: accuracy,
            highRisk: true,
            deoc: nearest.deoc
          };

          setCustomGpsLocation(newLoc);
          setIsLoading(false);
          resolve(newLoc);
        },
        (err) => {
          console.warn('GPS error:', err);
          setIsLoading(false);
          alert('Could not access GPS. Please check location permissions in your browser or select your district manually.');
          reject(err);
        },
        { timeout: 12000, enableHighAccuracy: true, maximumAge: 0 }
      );
    });
  }, []);

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
          setGpsTimestamp(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

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
  const rainMm = weatherData ? Math.round(weatherData.current.precipitation * 10) / 10 : 12;
  const pressureHpa = weatherData ? Math.round(weatherData.current.surface_pressure) : 998;
  const currentTemp = weatherData?.current?.temperature_2m !== undefined ? Math.round(weatherData.current.temperature_2m) : 26;
  const apparentTemp = weatherData?.current?.apparent_temperature !== undefined ? Math.round(weatherData.current.apparent_temperature) : 25;
  const maxTemp = weatherData?.daily?.temperature_2m_max?.[0] !== undefined ? Math.round(weatherData.daily.temperature_2m_max[0]) : 29;
  const minTemp = weatherData?.daily?.temperature_2m_min?.[0] !== undefined ? Math.round(weatherData.daily.temperature_2m_min[0]) : 17;
  const humidity = weatherData?.current?.relative_humidity_2m !== undefined ? Math.round(weatherData.current.relative_humidity_2m) : 68;

  const threat = evaluateThreatLevel(distanceKm, currentWind, currentGusts, rainMm);
  const voiceBriefing = generateVoiceBriefing(
    selectedLang,
    threat,
    activeLocation.name,
    distanceKm,
    currentWind,
    currentGusts,
    bearing.text
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
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 overflow-hidden">
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

          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Future Visit Planner Button */}
            <button
              onClick={() => setIsTravelPlannerOpen(true)}
              className="flex items-center justify-center gap-1 px-2.5 py-1.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex-shrink-0"
              title="Plan field visit on future dates (Coming 5-7 days weather outlook)"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Plan Visit</span>
            </button>

            {/* Instant GPS Refresh Button */}
            <button
              onClick={handleUseGps}
              disabled={isLoading}
              className={`flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all border flex-shrink-0 ${
                customGpsLocation
                  ? 'bg-sky-600 text-white border-sky-500 shadow-sm'
                  : 'bg-slate-800 hover:bg-slate-700 text-sky-400 border-slate-700'
              }`}
              title="Detect or refresh exact GPS location"
            >
              <Locate className="w-3.5 h-3.5" />
              <span>{customGpsLocation ? 'GPS' : 'Use GPS'}</span>
            </button>

            {/* Continuous Live Watch Toggle */}
            <button
              onClick={toggleLiveTracking}
              className={`flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-xs font-bold transition-all border flex-shrink-0 ${
                isWatchActive
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-sm ring-1 ring-emerald-400/50'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
              title="Continuously track GPS as you move in the field"
            >
              <Navigation className={`w-3.5 h-3.5 ${isWatchActive ? 'animate-pulse text-white' : 'text-slate-400'}`} />
              <span>{isWatchActive ? 'ON' : 'OFF'}</span>
            </button>

            {/* Reload Weather & Bulletin */}
            <button
              onClick={loadWeather}
              disabled={isLoading}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors flex-shrink-0"
              title="Refresh weather data and IMD status"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-sky-400' : ''}`} />
            </button>
          </div>
        </section>

        {/* Live GPS Status Indicator Bar (When GPS is active) */}
        {customGpsLocation && (
          <div className="bg-sky-950/40 border border-sky-800/60 rounded-xl px-3 py-2 flex flex-wrap items-center justify-between gap-2 text-xs text-sky-200">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>
                <strong>Live Coordinates:</strong> {activeLocation.lat.toFixed(4)}°N, {activeLocation.lon.toFixed(4)}°E
                {gpsAccuracy && ` (Accuracy: ±${Math.round(gpsAccuracy)}m)`}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span>Updated: {gpsTimestamp || 'Just now'}</span>
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
          windSpeed={currentWind}
          windGusts={currentGusts}
          rainMm={rainMm}
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
            allStorms={ALL_INDIA_ACTIVE_STORMS}
          />
        </div>

        {/* 7. Install PWA Prompt for Mobile Home Screen */}
        <PwaInstallPrompt />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 p-4 text-center text-xs text-slate-500 mb-14 sm:mb-0">
        <p className="font-semibold text-slate-400">ToofanSathi.in • Pan-India Cyclone & Weather Alert PWA</p>
        <p className="text-[11px] mt-1">Covering Bay of Bengal, Arabian Sea & Inland Depression Belts (IMD RSMC & Open-Meteo High-Res Models).</p>
        <p className="text-[10px] text-slate-600 mt-1">Designed for agricultural, utility, coastal & relief teams operating with low connectivity across India.</p>
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
