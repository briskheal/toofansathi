import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, Circle, Polyline, Polygon, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import {
  MapPin,
  Radio,
  Satellite,
  Info,
  Crosshair,
  RefreshCw,
  Check,
  Globe2,
  Compass,
  Layers,
  ArrowRight,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Waves,
  Eye,
  Sliders,
  Wind,
  ShieldAlert
} from 'lucide-react';
import { calculateDistanceKm } from '../services/cycloneEngine';

// Chronological Multi-Stage Storm Progressions (Zoom Earth & IMD Consensus Track)
export const AKVAN_TIMELINE_STEPS = [
  { id: 'step-0', time: '05:30 AM', date: '20 Nov', lat: 17.40, lon: 83.80, stage: 'Deep Depression', status: 'Advancing off Visakhapatnam Coast', wind: '75–85 km/h', gusts: '100 km/h', pressure: '992 hPa' },
  { id: 'step-1', time: '08:00 AM', date: '20 Nov', lat: 18.10, lon: 83.40, stage: 'Severe Cyclone Akvan (LIVE EYE)', status: 'Live Observed Center ~40 km off Padmapur / Gopalpur Coast', wind: '95 km/h', gusts: '115 km/h', pressure: '988 hPa', isLive: true },
  { id: 'step-2', time: '12:00 PM', date: '20 Nov', lat: 18.90, lon: 83.60, stage: 'Landfall Crossing', status: 'Landfall Commencing near Padmapur / Gopalpur / Ganjam sector', wind: '95–115 km/h', gusts: '125 km/h', pressure: '988 hPa', isLandfall: true },
  { id: 'step-3', time: '03:00 PM', date: '20 Nov', lat: 19.35, lon: 83.75, stage: 'Eye Moving Inland', status: 'Ganjam, Gajapati & Eastern Ghats Interior', wind: '80–90 km/h', gusts: '105 km/h', pressure: '992 hPa' },
  { id: 'step-4', time: '06:00 PM', date: '20 Nov', lat: 19.80, lon: 83.90, stage: 'Cyclonic Storm', status: 'Inland Crossing Rayagada / Kandhamal border', wind: '70–80 km/h', gusts: '90 km/h', pressure: '996 hPa' },
  { id: 'step-5', time: '12:00 AM', date: '21 Nov', lat: 21.10, lon: 84.30, stage: 'Inland Deep Depression', status: 'Central Odisha (Boudh / Angul / Sambalpur)', wind: '50–60 km/h', gusts: '70 km/h', pressure: '1000 hPa' },
  { id: 'step-6', time: '06:00 AM', date: '21 Nov', lat: 22.50, lon: 84.80, stage: 'Well-Marked Low', status: 'Jharkhand Border / Sundargarh Belt', wind: '35–45 km/h', gusts: '55 km/h', pressure: '1004 hPa' }
];

// Clean Minimalist Map Dot Icons - Clutter-Free with Hover/Tap Details
const userDotIcon = L.divIcon({
  className: 'custom-user-dot',
  html: `<div style="position:relative; width:18px; height:18px; cursor:pointer; display:flex; align-items:center; justify-content:center;">
          <div style="position:absolute; inset:-4px; border-radius:50%; background:#38bdf8; opacity:0.5; animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="width:14px; height:14px; border-radius:50%; background:#0284c7; border:2.5px solid #ffffff; box-shadow:0 0 10px #38bdf8; display:flex; align-items:center; justify-content:center;">
            <div style="width:4px; height:4px; border-radius:50%; background:#ffffff;"></div>
          </div>
         </div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9]
});

const landfallDotIcon = L.divIcon({
  className: 'custom-landfall-dot',
  html: `<div style="position:relative; width:20px; height:20px; cursor:pointer; display:flex; align-items:center; justify-content:center;">
          <div style="position:absolute; inset:-4px; border-radius:50%; background:#ef4444; opacity:0.5; animation: ping 1.4s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="width:16px; height:16px; border-radius:50%; background:#dc2626; border:2.5px solid #ffffff; box-shadow:0 0 10px #ef4444; display:flex; align-items:center; justify-content:center; color:white; font-size:9px; font-weight:bold;">
            🎯
          </div>
         </div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

const milestoneDotIcon = L.divIcon({
  className: 'custom-milestone-dot',
  html: `<div style="position:relative; width:12px; height:12px; cursor:pointer; display:flex; align-items:center; justify-content:center;">
          <div style="width:10px; height:10px; border-radius:50%; background:#ea580c; border:2px solid #ffffff; box-shadow:0 0 6px rgba(0,0,0,0.6);"></div>
         </div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6]
});

const cycloneBobIcon = L.divIcon({
  className: 'custom-cyclone-bob',
  html: `<div style="position:relative; width:30px; height:30px;">
          <div style="position:absolute; inset:0; border-radius:50%; background:#ef4444; opacity:0.5; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position:absolute; inset:4px; border-radius:50%; background:#dc2626; border:2px solid #ffffff; display:flex; align-items:center; justify-content:center; color:white; font-size:11px; font-weight:bold;">🌀</div>
         </div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});

const cycloneArbIcon = L.divIcon({
  className: 'custom-cyclone-arb',
  html: `<div style="position:relative; width:30px; height:30px;">
          <div style="position:absolute; inset:0; border-radius:50%; background:#f59e0b; opacity:0.5; animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position:absolute; inset:4px; border-radius:50%; background:#d97706; border:2px solid #ffffff; display:flex; align-items:center; justify-content:center; color:white; font-size:11px; font-weight:bold;">🌀</div>
         </div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});

// Component to handle smooth pan/fly to coordinates
function MapRecenterController({ centerCoords, zoomLevel, triggerKey }) {
  const map = useMap();
  useEffect(() => {
    if (centerCoords && centerCoords[0] && centerCoords[1]) {
      map.flyTo(centerCoords, zoomLevel || 6, { duration: 1.4 });
    }
  }, [centerCoords, zoomLevel, triggerKey, map]);
  return null;
}

export default function CycloneMap({
  userLocation,
  stormCenter,
  landfallArea,
  onRefreshLocation,
  isGpsActive,
  activeStorm,
  allStorms = []
}) {
  const [activeTab, setActiveTab] = useState('trajectory'); // 'trajectory' | 'radar' | 'satellite' | 'global' | 'zoomearth'
  const [mapViewMode, setMapViewMode] = useState('bay-of-bengal'); // Focus on active Severe Cyclone by default
  const [satChannel, setSatChannel] = useState('ir1'); // 'ir1' | 'vis' | 'wv'
  const [selectedRadarStation, setSelectedRadarStation] = useState('gopalpur');
  const [satTimestamp, setSatTimestamp] = useState(Date.now());
  const [isRefreshingSat, setIsRefreshingSat] = useState(false);
  const [satRefreshedToast, setSatRefreshedToast] = useState(false);

  // Storm distance helpers
  const bobStorm = allStorms.find(s => s.basin === 'Bay of Bengal') || activeStorm;
  const arbStorm = allStorms.find(s => s.basin === 'Arabian Sea');
  const bobDist = bobStorm ? calculateDistanceKm(userLocation.lat, userLocation.lon, bobStorm.center.lat, bobStorm.center.lon) : null;
  const arbDist = arbStorm ? calculateDistanceKm(userLocation.lat, userLocation.lon, arbStorm.center.lat, arbStorm.center.lon) : null;

  const handleRefreshSatFeed = () => {
    setIsRefreshingSat(true);
    setSatTimestamp(Date.now());
    setTimeout(() => {
      setIsRefreshingSat(false);
      setSatRefreshedToast(true);
      setTimeout(() => setSatRefreshedToast(false), 2500);
    }, 800);
  };

  const [flyTarget, setFlyTarget] = useState([18.10, 83.40]); // Default focus on Akvan Eye
  const [flyZoom, setFlyZoom] = useState(6);
  const [flyTrigger, setFlyTrigger] = useState(0);
  const [isLocating, setIsLocating] = useState(false);
  const [justUpdated, setJustUpdated] = useState(false);

  // Zoom Earth-Style Immersive Theater Mode & Temporal Scrubbing
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [timeStepIndex, setTimeStepIndex] = useState(1); // Default to Step 1 (08:00 AM Live Eye)
  const [isPlayingTime, setIsPlayingTime] = useState(false);
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const [activeWeatherOverlay, setActiveWeatherOverlay] = useState('none'); // 'none' | 'wind' | 'rain' | 'pressure'
  const [isLayerDrawerOpen, setIsLayerDrawerOpen] = useState(false);

  // Time scrubber auto-playback
  useEffect(() => {
    let interval = null;
    if (isPlayingTime) {
      interval = setInterval(() => {
        setTimeStepIndex((prev) => (prev + 1) % AKVAN_TIMELINE_STEPS.length);
      }, 2200);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlayingTime]);

  // Switch map viewports
  const switchMapView = (mode) => {
    setMapViewMode(mode);
    if (mode === 'all-india') {
      setFlyTarget([20.5937, 80.9629]); // Geometric center of India
      setFlyZoom(5);
    } else if (mode === 'bay-of-bengal') {
      const bob = allStorms.find(s => s.basin === 'Bay of Bengal') || activeStorm;
      setFlyTarget([bob.center.lat, bob.center.lon]);
      setFlyZoom(6);
    } else if (mode === 'arabian-sea') {
      const arb = allStorms.find(s => s.basin === 'Arabian Sea') || activeStorm;
      setFlyTarget([arb.center.lat, arb.center.lon]);
      setFlyZoom(6);
    } else if (mode === 'my-location') {
      setFlyTarget([userLocation.lat, userLocation.lon]);
      setFlyZoom(7);
    }
    setFlyTrigger(prev => prev + 1);
  };

  // Re-fetch GPS and auto-fly map to new position
  const handleRefreshGps = async () => {
    if (!onRefreshLocation) return;
    setIsLocating(true);
    setJustUpdated(false);

    try {
      const newLoc = await onRefreshLocation();
      if (newLoc && newLoc.lat && newLoc.lon) {
        setFlyTarget([newLoc.lat, newLoc.lon]);
        setFlyZoom(7);
        setFlyTrigger(prev => prev + 1);
        setMapViewMode('my-location');
        setJustUpdated(true);
        setTimeout(() => setJustUpdated(false), 3000);
      }
    } catch (err) {
      console.warn('Map refresh GPS failed:', err);
    } finally {
      setIsLocating(false);
    }
  };

  const satImages = {
    ir1: {
      name: 'Infrared (Thermal Cloud Tops)',
      url: `https://mausam.imd.gov.in/Satellite/3Dasiasec_ir1.jpg?t=${satTimestamp}`,
      desc: 'Shows high storm cloud tops and cold convective thunderstorm towers in deep red/white across the Indian subcontinent.'
    },
    vis: {
      name: 'Visible Optical (Daylight)',
      url: `https://mausam.imd.gov.in/Satellite/3Dasiasec_vis.jpg?t=${satTimestamp}`,
      desc: 'Natural daylight satellite view highlighting spiral vortex arms and cyclone eye structure.'
    },
    wv: {
      name: 'Water Vapor Channel',
      url: `https://mausam.imd.gov.in/Satellite/3Dasiasec_wv.jpg?t=${satTimestamp}`,
      desc: 'Monitors upper tropospheric moisture conveyor belts feeding cyclonic depressions.'
    }
  };

  const radarStations = {
    gopalpur: {
      name: 'Gopalpur Coastal DWR (South Odisha)',
      range: '400 km radial coverage',
      status: 'Direct Real-Time Tracking: Akvan Eyewall & Landfall Crossing'
    },
    visakhapatnam: {
      name: 'Visakhapatnam Naval DWR (AP)',
      range: '400 km radial coverage',
      status: 'Direct Real-Time Tracking: Southern Eye Quadrant & Gale Inflow'
    },
    paradip: {
      name: 'Paradip Coastal DWR (Odisha)',
      range: '400 km radial coverage',
      status: 'Tracking Northern Inflow & Heavy Rain Feeder Bands'
    },
    kolkata: {
      name: 'Kolkata Subhasgram DWR (WB)',
      range: '400 km radial coverage',
      status: 'Tracking Outer Squall Bands'
    }
  };

  // Official Multi-Stage Track Vectors & IMD Cone of Uncertainty
  const getTrackForStorm = (storm) => {
    const lat = storm.center.lat;
    const lon = storm.center.lon;

    if (storm.basin === 'Bay of Bengal') {
      return {
        pastCoords: [
          [12.40, 86.20], // Southwest Bay origin
          [14.50, 84.80], // Deep depression stage
          [16.20, 84.20], // Upgraded to Cyclonic Storm Akvan off AP coast
          [17.40, 83.80], // Severe Cyclone off Visakhapatnam
          [lat, lon]      // Live Eye (near Padmapur / Gopalpur / Srikakulam)
        ],
        forecastCoords: [
          [lat, lon],
          [18.90, 83.60], // Expected Landfall: Gopalpur / Padmapur sector (South Odisha / North AP)
          [19.80, 83.90], // Inland Rayagada / Kandhamal / Ganjam
          [21.10, 84.30], // Central Odisha (Boudh / Nayagarh / Sambalpur)
          [22.50, 84.80]  // Weakening depression towards Jharkhand
        ],
        coneCoords: [
          [lat, lon],
          [17.60, 83.20], // Left coastal bound (Visakhapatnam)
          [18.60, 82.80], // Left inland bound (Eastern Ghats / Koraput)
          [20.50, 83.30], // Western interior apex (Bolanagir / Bargarh)
          [22.80, 84.30], // Northern apex (Sundargarh / Jharkhand)
          [22.20, 85.80], // East-North bound (Keonjhar / Mayurbhanj)
          [20.30, 86.00], // East bound (Cuttack / Bhubaneswar)
          [19.70, 85.80], // Right coastal bound (Puri)
          [18.90, 84.80], // Right coastal bound (Gopalpur offshore)
          [lat, lon]
        ],
        checkpoints: [
          { label: 'Observed Center (08:00 IST)', lat: lat, lon: lon, time: '08:00 AM' },
          { label: 'Expected Landfall (Gopalpur / Padmapur Sector)', lat: 18.90, lon: 83.60, time: '12:00 PM', isLandfall: true },
          { label: 'Inland Crossing (Rayagada/Ganjam)', lat: 19.80, lon: 83.90, time: '06:00 PM' },
          { label: 'Inland Depression (Central Odisha)', lat: 21.10, lon: 84.30, time: '12:00 AM' }
        ]
      };
    } else {
      // Arabian Sea track
      return {
        pastCoords: [
          [18.20, 68.80],
          [19.40, 67.50],
          [lat, lon]
        ],
        forecastCoords: [
          [lat, lon],
          [21.20, 65.50],
          [21.90, 64.20],
          [22.60, 62.80]
        ],
        coneCoords: [
          [lat, lon],
          [20.80, 64.80],
          [22.50, 62.00],
          [23.20, 63.50],
          [21.80, 66.20],
          [lat, lon]
        ],
        checkpoints: [
          { label: 'West-Northwest Vector', lat: 21.20, lon: 65.50, time: '12 hrs' },
          { label: 'Open Ocean Recurvature', lat: 21.90, lon: 64.20, time: '24 hrs' }
        ]
      };
    }
  };

  return (
    <div className={isTheaterMode 
      ? "fixed inset-0 z-[99999] bg-slate-950 flex flex-col w-screen h-screen overflow-hidden" 
      : "bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl transition-all"}>
      {/* Top Header with Tab Switcher - Mobile Optimized Swipeable Bar */}
      <div className="p-2 sm:p-2.5 border-b border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 bg-slate-900/95 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-sky-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Live Radar & Basin Monitor
            </h3>
          </div>
          <div className="flex items-center gap-1.5">
            {isGpsActive && (
              <span className="sm:hidden flex items-center gap-1 text-[9px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Live GPS
              </span>
            )}
            <button
              onClick={() => setIsTheaterMode(!isTheaterMode)}
              className="sm:hidden flex items-center gap-1 px-2 py-1 text-[10px] font-bold rounded-lg border border-cyan-800/80 bg-cyan-950/50 text-cyan-300"
              title={isTheaterMode ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isTheaterMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span>{isTheaterMode ? 'Exit' : 'Full'}</span>
            </button>
          </div>
        </div>

        {/* Tab Controls (Swipeable on mobile) + Desktop Theater Mode */}
        <div className="flex items-center justify-between sm:justify-end gap-1.5">
          <div className="flex items-center bg-slate-800/90 rounded-xl p-1 border border-slate-700/80 overflow-x-auto no-scrollbar gap-1 scroll-smooth">
            <button
              onClick={() => setActiveTab('trajectory')}
              className={`whitespace-nowrap flex-shrink-0 px-2.5 py-1.5 text-[11px] font-bold rounded-lg transition-colors ${
                activeTab === 'trajectory' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Dual Track Vector
            </button>
            <button
              onClick={() => setActiveTab('satellite')}
              className={`whitespace-nowrap flex-shrink-0 px-2.5 py-1.5 text-[11px] font-bold rounded-lg transition-colors ${
                activeTab === 'satellite' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Live INSAT-3DR
            </button>
            <button
              onClick={() => setActiveTab('radar')}
              className={`whitespace-nowrap flex-shrink-0 px-2.5 py-1.5 text-[11px] font-bold rounded-lg transition-colors ${
                activeTab === 'radar' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              IMD Radar
            </button>
            <button
              onClick={() => setActiveTab('zoomearth')}
              className={`whitespace-nowrap flex-shrink-0 px-2.5 py-1.5 text-[11px] font-bold rounded-lg transition-colors ${
                activeTab === 'zoomearth' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🌀 Zoom Earth Live Eye
            </button>
            <button
              onClick={() => setActiveTab('global')}
              className={`whitespace-nowrap flex-shrink-0 px-2.5 py-1.5 text-[11px] font-bold rounded-lg transition-colors ${
                activeTab === 'global' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Foreign (JTWC/ECMWF)
            </button>
          </div>

          <button
            onClick={() => setIsTheaterMode(!isTheaterMode)}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-bold rounded-xl border transition-all ${
              isTheaterMode
                ? 'bg-cyan-600 border-cyan-400 text-white shadow-md'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
            }`}
            title={isTheaterMode ? "Exit Fullscreen Theater Mode" : "Expand to Fullscreen Theater Mode"}
          >
            {isTheaterMode ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 text-white" />
                <span>Exit Fullscreen</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Fullscreen Radar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 1. Basin Focus Switcher & Quick Navigation Bar (Swipeable on mobile) */}
      {activeTab === 'trajectory' && (
        <div className="bg-slate-950 px-2.5 py-2 border-b border-slate-800 flex items-center overflow-x-auto no-scrollbar gap-1.5 text-xs">
          <div className="flex items-center gap-1 flex-shrink-0 pr-1">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase">Focus:</span>
          </div>

          <div className="flex items-center gap-1.5 flex-nowrap">
            {/* Severe Cyclone Akvan / Bay of Bengal Button */}
            <button
              onClick={() => switchMapView('bay-of-bengal')}
              className={`whitespace-nowrap flex-shrink-0 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all border flex items-center gap-1.5 ${
                mapViewMode === 'bay-of-bengal'
                  ? 'bg-red-600 text-white border-red-400 shadow-md ring-1 ring-red-400'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
              <span>🌀 Severe Cyclone Akvan (Bay of Bengal)</span>
              {bobDist && <span className="text-[10px] opacity-90 font-mono">• {bobDist} km</span>}
            </button>

            {/* Arabian Sea Depression Button */}
            <button
              onClick={() => switchMapView('arabian-sea')}
              className={`whitespace-nowrap flex-shrink-0 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all border flex items-center gap-1.5 ${
                mapViewMode === 'arabian-sea'
                  ? 'bg-amber-600 text-white border-amber-400 shadow-md ring-1 ring-amber-400'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>🟠 Arabian Sea System</span>
              {arbDist && <span className="text-[10px] opacity-90 font-mono">• {arbDist} km</span>}
            </button>

            {/* Entire India Button */}
            <button
              onClick={() => switchMapView('all-india')}
              className={`whitespace-nowrap flex-shrink-0 px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all border ${
                mapViewMode === 'all-india'
                  ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              🇮🇳 Entire India
            </button>

            {/* My Location Button */}
            <button
              onClick={() => switchMapView('my-location')}
              className={`whitespace-nowrap flex-shrink-0 px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all border ${
                mapViewMode === 'my-location'
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              📍 My Location
            </button>
          </div>
        </div>
      )}

      {/* 2. Key Status Briefing Bar (Swipeable Horizontal Slider on Mobile, 4-Col Grid on Desktop) */}
      {activeTab === 'trajectory' && (
        <div className="bg-slate-950/95 border-b border-slate-800/90 px-2.5 sm:px-3 py-2 text-xs">
          {mapViewMode === 'bay-of-bengal' || mapViewMode === 'all-india' ? (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-1.5 border-b border-slate-800/60 pb-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="flex h-2.5 w-2.5 relative flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                  </span>
                  <span className="font-extrabold text-white text-[11px] sm:text-sm truncate">
                    Current Status: Severe Cyclone Akvan
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40 whitespace-nowrap flex-shrink-0">
                    IMD RED ALERT
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 text-[10px] text-cyan-300 font-mono">
                  <span>{AKVAN_TIMELINE_STEPS[timeStepIndex]?.isLive ? '🔴 LIVE' : `⏱️ ${AKVAN_TIMELINE_STEPS[timeStepIndex]?.time}`}</span>
                  <span className="sm:hidden text-[9px] text-sky-400 font-sans font-medium">Swipe cards 👉</span>
                </div>
              </div>

              {/* 4 Points Horizontal Slider (Mobile horizontal slider with snap, Desktop 4-col grid) */}
              <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 overflow-x-auto sm:overflow-visible gap-2 text-[11px] pb-1 sm:pb-0 no-scrollbar snap-x snap-mandatory">
                {/* Point 1: Location & Distance */}
                <div className="flex-shrink-0 w-[240px] sm:w-auto snap-start bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex items-start gap-2 shadow-sm">
                  <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">1. Live Eye & Proximity</span>
                    <strong className="text-white text-xs block">
                      {AKVAN_TIMELINE_STEPS[timeStepIndex]?.lat.toFixed(2)}°N, {AKVAN_TIMELINE_STEPS[timeStepIndex]?.lon.toFixed(2)}°E
                    </strong>
                    <span className="text-[10px] text-sky-300 font-semibold block">
                      📍 ~{bobDist || 369} km to you ({userLocation.name})
                    </span>
                    <span className="text-[9px] text-emerald-400 block">
                      🌊 ~40 km to Padmapur / Gopalpur Coast
                    </span>
                  </div>
                </div>

                {/* Point 2: Winds & Intensity */}
                <div className="flex-shrink-0 w-[240px] sm:w-auto snap-start bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex items-start gap-2 shadow-sm">
                  <Wind className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">2. Wind & Pressure</span>
                    <strong className="text-amber-300 text-xs block">
                      {AKVAN_TIMELINE_STEPS[timeStepIndex]?.wind || '95 km/h'} (Gusts: 115)
                    </strong>
                    <span className="text-[10px] text-slate-300 block">
                      Pressure: <strong className="font-mono text-cyan-300">{AKVAN_TIMELINE_STEPS[timeStepIndex]?.pressure || '988 hPa'}</strong>
                    </span>
                    <span className="text-[9px] text-slate-400 block">
                      Stage: {AKVAN_TIMELINE_STEPS[timeStepIndex]?.stage || 'Severe Cyclone'}
                    </span>
                  </div>
                </div>

                {/* Point 3: Landfall & Speed */}
                <div className="flex-shrink-0 w-[240px] sm:w-auto snap-start bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex items-start gap-2 shadow-sm">
                  <Compass className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">3. Landfall Target & Time</span>
                    <strong className="text-emerald-300 text-xs block">
                      Padmapur / Gopalpur (Ganjam)
                    </strong>
                    <span className="text-[10px] text-slate-300 block">
                      Expected Window: <strong className="text-white">Today 12:00 PM – 03:00 PM</strong>
                    </span>
                    <span className="text-[9px] text-slate-400 block">
                      Advancing NNW at 16 km/h
                    </span>
                  </div>
                </div>

                {/* Point 4: Govt Alerts */}
                <div className="flex-shrink-0 w-[240px] sm:w-auto snap-start bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex items-start gap-2 shadow-sm">
                  <ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">4. Official Threat Level</span>
                    <strong className="text-red-400 text-xs block">
                      Severe Coastal Gale & Surge
                    </strong>
                    <span className="text-[10px] text-slate-300 block">
                      INCOIS: <strong className="text-cyan-300">1.0–1.5m storm surge</strong>
                    </span>
                    <span className="text-[9px] text-amber-300 block">
                      High waves: 3.5–5.5m (Ganjam/AP)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : mapViewMode === 'arabian-sea' ? (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-1.5 border-b border-slate-800/60 pb-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse flex-shrink-0"></span>
                  <span className="font-extrabold text-white text-[11px] sm:text-sm truncate">
                    Current Status: Arabian Sea Low Pressure / Depression
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40 whitespace-nowrap flex-shrink-0">
                    YELLOW ADVISORY
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 text-[10px] text-slate-400 font-mono">
                  <span className="hidden sm:inline">Moving away from Indian Coast</span>
                  <span className="sm:hidden text-[9px] text-sky-400 font-sans font-medium">Swipe cards 👉</span>
                </div>
              </div>

              {/* 4 Points Horizontal Slider for Arabian Sea */}
              <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 overflow-x-auto sm:overflow-visible gap-2 text-[11px] pb-1 sm:pb-0 no-scrollbar snap-x snap-mandatory">
                <div className="flex-shrink-0 w-[240px] sm:w-auto snap-start bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex items-start gap-2 shadow-sm">
                  <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">1. Location & Distance</span>
                    <strong className="text-white text-xs block">20.80°N, 67.20°E</strong>
                    <span className="text-[10px] text-sky-300 font-semibold block">
                      📍 ~{arbDist || 2043} km to you ({userLocation.name})
                    </span>
                    <span className="text-[9px] text-slate-400 block">
                      ~260 km WSW of Porbandar Coast
                    </span>
                  </div>
                </div>

                <div className="flex-shrink-0 w-[240px] sm:w-auto snap-start bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex items-start gap-2 shadow-sm">
                  <Wind className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">2. Wind & Pressure</span>
                    <strong className="text-amber-300 text-xs block">Sustained 45 km/h (Gusts: 60)</strong>
                    <span className="text-[10px] text-slate-300 block">
                      Pressure: <strong className="font-mono text-cyan-300">1000 hPa</strong>
                    </span>
                    <span className="text-[9px] text-slate-400 block">Well-Marked Low / Depression</span>
                  </div>
                </div>

                <div className="flex-shrink-0 w-[240px] sm:w-auto snap-start bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex items-start gap-2 shadow-sm">
                  <Compass className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">3. Movement & Trajectory</span>
                    <strong className="text-emerald-300 text-xs block">Moving WNW at 14 km/h</strong>
                    <span className="text-[10px] text-slate-300 block">Heading into open Arabian Sea</span>
                    <span className="text-[9px] text-emerald-400 block">Zero Direct Indian Coast Landfall</span>
                  </div>
                </div>

                <div className="flex-shrink-0 w-[240px] sm:w-auto snap-start bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex items-start gap-2 shadow-sm">
                  <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">4. Official Threat Level</span>
                    <strong className="text-amber-400 text-xs block">Squally Weather for Fishermen</strong>
                    <span className="text-[10px] text-slate-300 block">IMD: Fishermen warning in deep sea</span>
                    <span className="text-[9px] text-slate-400 block">Coastal Gujarat/Maharashtra safe</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* My Location Summary */
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-1.5 border-b border-slate-800/60 pb-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500 flex-shrink-0"></span>
                  <span className="font-extrabold text-white text-[11px] sm:text-sm truncate">
                    Location Status: {userLocation.name}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/40 whitespace-nowrap flex-shrink-0">
                    LOCAL WEATHER ZONE
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 text-[10px] text-slate-400 font-mono">
                  <span className="hidden sm:inline">{userLocation.lat.toFixed(4)}°N, {userLocation.lon.toFixed(4)}°E</span>
                  <span className="sm:hidden text-[9px] text-sky-400 font-sans font-medium">Swipe cards 👉</span>
                </div>
              </div>

              {/* 4 Points Horizontal Slider for My Location */}
              <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 overflow-x-auto sm:overflow-visible gap-2 text-[11px] pb-1 sm:pb-0 no-scrollbar snap-x snap-mandatory">
                <div className="flex-shrink-0 w-[240px] sm:w-auto snap-start bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex items-start gap-2 shadow-sm">
                  <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">1. Nearest Cyclone</span>
                    <strong className="text-red-400 text-xs block">Akvan: ~{bobDist || 369} km away</strong>
                    <span className="text-[10px] text-slate-300 block">Advancing towards South Odisha</span>
                  </div>
                </div>

                <div className="flex-shrink-0 w-[240px] sm:w-auto snap-start bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex items-start gap-2 shadow-sm">
                  <Wind className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">2. Inflow Winds</span>
                    <strong className="text-amber-300 text-xs block">Gusts 35–45 km/h</strong>
                    <span className="text-[10px] text-slate-300 block">Outer squall bands active</span>
                  </div>
                </div>

                <div className="flex-shrink-0 w-[240px] sm:w-auto snap-start bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex items-start gap-2 shadow-sm">
                  <Compass className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">3. Landfall Impact</span>
                    <strong className="text-emerald-300 text-xs block">Gopalpur / Padmapur Crossing</strong>
                    <span className="text-[10px] text-slate-300 block">Inland track through South Odisha</span>
                  </div>
                </div>

                <div className="flex-shrink-0 w-[240px] sm:w-auto snap-start bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex items-start gap-2 shadow-sm">
                  <ShieldAlert className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">4. Emergency Readiness</span>
                    <strong className="text-sky-300 text-xs block">Keep Helpline & PWA Ready</strong>
                    <span className="text-[10px] text-slate-300 block">Follow State DEOC instructions</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 1. Track Vector Map View (All-India + Both Basins Plotted Simultaneously) */}
      {activeTab === 'trajectory' && (
        <div className={isTheaterMode ? "flex-1 h-full w-full relative z-0" : "h-[380px] sm:h-[460px] w-full relative z-0"}>
          <MapContainer
            center={flyTarget}
            zoom={flyZoom}
            scrollWheelZoom={false}
            zoomControl={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <ZoomControl position="bottomright" />

            <MapRecenterController centerCoords={flyTarget} zoomLevel={flyZoom} triggerKey={flyTrigger} />

            {/* User Location Marker (Clean, clutter-free dot with hover/tap tooltip) */}
            <Marker position={[userLocation.lat, userLocation.lon]} icon={userDotIcon}>
              <Tooltip direction="auto" offset={[0, -10]} opacity={0.96} className="custom-map-tooltip">
                <div className="font-bold text-xs text-sky-400 flex items-center gap-1">
                  <span>📍</span>
                  <span>Your Location</span>
                </div>
                <div className="text-sm font-extrabold text-white mt-0.5">{userLocation.name}</div>
                <div className="text-[10px] text-slate-300 mt-0.5">
                  Lat: {userLocation.lat.toFixed(4)}°N, Lon: {userLocation.lon.toFixed(4)}°E
                  {userLocation.accuracy && ` (Accuracy: ±${Math.round(userLocation.accuracy)}m)`}
                </div>
              </Tooltip>
            </Marker>

            {/* GPS Accuracy Circle */}
            {userLocation.accuracy && (
              <Circle
                center={[userLocation.lat, userLocation.lon]}
                radius={Math.min(userLocation.accuracy, 20000)}
                pathOptions={{ color: '#0284c7', fillColor: '#38bdf8', fillOpacity: 0.18, weight: 1.5 }}
              />
            )}

            {/* Plot ALL active storms simultaneously across India */}
            {allStorms.map((storm) => {
              const isBob = storm.basin === 'Bay of Bengal';
              const activeStep = (isBob && AKVAN_TIMELINE_STEPS[timeStepIndex]) ? AKVAN_TIMELINE_STEPS[timeStepIndex] : null;
              const stormLat = (isBob && activeStep) ? activeStep.lat : storm.center.lat;
              const stormLon = (isBob && activeStep) ? activeStep.lon : storm.center.lon;
              const stormDist = calculateDistanceKm(userLocation.lat, userLocation.lon, stormLat, stormLon);
              const trackData = getTrackForStorm(storm);

              return (
                <React.Fragment key={storm.id}>
                  {/* Storm Center Marker with hover/tap description */}
                  <Marker
                    position={[stormLat, stormLon]}
                    icon={isBob ? cycloneBobIcon : cycloneArbIcon}
                  >
                    <Tooltip direction="auto" offset={[0, -16]} opacity={0.96} className="custom-map-tooltip">
                      <div className="text-xs font-extrabold text-red-400 flex items-center gap-1">
                        <span>🌀</span>
                        <span>{storm.name} ({storm.basin})</span>
                      </div>
                      <div className="text-[11px] font-semibold text-white mt-0.5">
                        {activeStep ? activeStep.status : storm.center.locationDesc}
                      </div>
                      <div className="text-[10px] text-sky-300 mt-1">
                        📍 To You ({userLocation.name}): <strong>{stormDist} km</strong>
                      </div>
                      {isBob && activeStep && (
                        <div className="text-[10px] text-amber-300">
                          ⏱️ Track Stage: {activeStep.time} • {activeStep.stage} ({activeStep.wind})
                        </div>
                      )}
                      {storm.distanceToCoastKm && (
                        <div className="text-[10px] text-emerald-300">
                          🌊 To Coast: ~<strong>{storm.distanceToCoastKm} km</strong> ({storm.nearestCoastName})
                        </div>
                      )}
                      <div className="text-[10px] text-slate-300">
                        Coords: {stormLat.toFixed(2)}°N, {stormLon.toFixed(2)}°E
                      </div>
                    </Tooltip>
                    <Popup>
                      <div className="text-xs text-slate-900 font-sans p-1">
                        <strong className="block text-red-600 text-sm font-bold">{storm.name}</strong>
                        <span className="text-[11px] font-semibold text-slate-700 block">Basin: {storm.basin}</span>
                        <span className="text-[10px] text-slate-600 block mt-1">
                          {activeStep ? activeStep.status : storm.center.locationDesc}
                        </span>
                        <div className="mt-1 pt-1 border-t border-slate-200 space-y-0.5">
                          <span className="text-[11px] font-bold text-sky-700 block">
                            📍 To You ({userLocation.name}): {stormDist} km
                          </span>
                          {isBob && activeStep && (
                            <span className="text-[10px] font-bold text-amber-700 block">
                              ⏱️ Projected Stage: {activeStep.time} ({activeStep.wind})
                            </span>
                          )}
                          {storm.distanceToCoastKm && (
                            <span className="text-[11px] font-bold text-emerald-700 block">
                              🌊 To Coast ({storm.nearestCoastName}): ~{storm.distanceToCoastKm} km
                            </span>
                          )}
                          <span className="text-[10px] text-slate-800 block">Status: {storm.status}</span>
                        </div>
                      </div>
                    </Popup>
                  </Marker>

                  {/* Eyewall Core Zone (35 km radius) */}
                  {isBob && (
                    <Circle
                      center={[stormLat, stormLon]}
                      radius={35000}
                      pathOptions={{
                        color: '#ef4444',
                        fillColor: '#dc2626',
                        fillOpacity: 0.35,
                        weight: 2
                      }}
                    />
                  )}

                  {/* Gale Wind Danger Zone (85 km radius) */}
                  <Circle
                    center={[stormLat, stormLon]}
                    radius={85000}
                    pathOptions={{
                      color: isBob ? '#ea580c' : '#f59e0b',
                      fillColor: isBob ? '#ea580c' : '#f59e0b',
                      fillOpacity: 0.16,
                      weight: 1.5,
                      dashArray: '4, 4'
                    }}
                  />

                  {/* Squally Wind Zone (180 km radius) */}
                  <Circle
                    center={[stormLat, stormLon]}
                    radius={180000}
                    pathOptions={{
                      color: isBob ? '#eab308' : '#fbbf24',
                      fillColor: isBob ? '#eab308' : '#fbbf24',
                      fillOpacity: 0.08,
                      weight: 1,
                      dashArray: '6, 6'
                    }}
                  />

                  {/* IMD Official Cone of Uncertainty (Error Cone Polygon) */}
                  {trackData.coneCoords && (
                    <Polygon
                      positions={trackData.coneCoords}
                      pathOptions={{
                        color: isBob ? '#ef4444' : '#f59e0b',
                        fillColor: isBob ? '#ef4444' : '#f59e0b',
                        fillOpacity: 0.12,
                        weight: 1.5,
                        dashArray: '4, 4'
                      }}
                    />
                  )}

                  {/* Past Observed Track Line */}
                  <Polyline
                    positions={trackData.pastCoords}
                    pathOptions={{
                      color: isBob ? '#94a3b8' : '#cbd5e1',
                      weight: 2,
                      dashArray: '3, 4'
                    }}
                  />

                  {/* Projected Forecast Track Line */}
                  <Polyline
                    positions={trackData.forecastCoords}
                    pathOptions={{
                      color: isBob ? '#ef4444' : '#f59e0b',
                      weight: 3.5
                    }}
                  />

                  {/* Forecast Checkpoints (Clean clutter-free dots with hover/tap description) */}
                  {trackData.checkpoints && trackData.checkpoints.map((pt, pIdx) => (
                    <Marker
                      key={pIdx}
                      position={[pt.lat, pt.lon]}
                      icon={pt.isLandfall ? landfallDotIcon : milestoneDotIcon}
                    >
                      <Tooltip
                        direction={pt.isLandfall ? "bottom" : "auto"}
                        offset={[0, pt.isLandfall ? 14 : -10]}
                        opacity={0.96}
                        className="custom-map-tooltip"
                      >
                        {pt.isLandfall ? (
                          <div className="space-y-0.5">
                            <div className="text-xs font-extrabold text-red-400 flex items-center gap-1">
                              <span>⚠️</span>
                              <span>Expected Landfall Point</span>
                            </div>
                            <div className="text-sm font-bold text-white">{pt.label}</div>
                            <div className="text-[11px] font-bold text-amber-300">
                              Estimated Time: {pt.time}
                            </div>
                            <div className="text-[10px] text-slate-300">
                              Direct eyewall crossing • High gale wind & tidal risk
                            </div>
                            <div className="text-[9px] text-slate-400">
                              Coords: {pt.lat.toFixed(2)}°N, {pt.lon.toFixed(2)}°E
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-0.5">
                            <div className="text-xs font-bold text-orange-400 flex items-center gap-1">
                              <span>⏱️</span>
                              <span>Forecast Milestone: {pt.time}</span>
                            </div>
                            <div className="text-sm font-bold text-white">{pt.label}</div>
                            <div className="text-[10px] text-slate-300">
                              Projected track position at {pt.time}
                            </div>
                            <div className="text-[9px] text-slate-400">
                              Coords: {pt.lat.toFixed(2)}°N, {pt.lon.toFixed(2)}°E
                            </div>
                          </div>
                        )}
                      </Tooltip>
                      <Popup>
                        <div className="text-xs text-slate-900 font-sans p-0.5">
                          <strong className={pt.isLandfall ? 'text-red-600 block font-bold' : 'text-amber-800 block font-bold'}>
                            {pt.label}
                          </strong>
                          <span className="text-[10px] text-slate-600">Expected Time: {pt.time}</span>
                          <span className="text-[10px] text-slate-500 block">Coords: {pt.lat.toFixed(2)}°N, {pt.lon.toFixed(2)}°E</span>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </React.Fragment>
              );
            })}
          </MapContainer>

          {/* Floating Action Controls on Map (Top Right) */}
          <div className="absolute top-2.5 right-2.5 z-[400] flex flex-col gap-1.5">
            <button
              onClick={() => switchMapView('my-location')}
              className="px-2.5 py-1.5 bg-slate-900/90 hover:bg-slate-800 text-sky-400 border border-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md backdrop-blur-sm transition-all"
              title="Focus and zoom map directly to my location"
            >
              <Crosshair className="w-3.5 h-3.5 text-sky-400" />
              <span>Center Me</span>
            </button>

            {onRefreshLocation && (
              <button
                onClick={handleRefreshGps}
                disabled={isLocating}
                className={`px-2.5 py-1.5 border rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md backdrop-blur-sm transition-all ${
                  justUpdated
                    ? 'bg-emerald-950/90 text-emerald-400 border-emerald-600'
                    : isLocating
                    ? 'bg-sky-950/90 text-sky-300 border-sky-600'
                    : 'bg-slate-900/90 hover:bg-slate-800 text-slate-100 border-slate-700'
                }`}
                title="Scan latest GPS coordinates and fly map to location"
              >
                {justUpdated ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Updated!</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin text-sky-400' : 'text-slate-300'}`} />
                    <span>{isLocating ? 'Locating...' : 'Refresh GPS'}</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Floating Layer Menu (Zoom Earth Style from animation2.mp4) */}
          <div className="absolute top-2.5 left-2.5 z-[400]">
            <button
              onClick={() => setIsLayerDrawerOpen(!isLayerDrawerOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950/90 hover:bg-slate-900 backdrop-blur-md border border-slate-700/80 rounded-xl text-xs font-bold text-slate-200 shadow-xl transition-all active:scale-95"
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Layers</span>
              {activeWeatherOverlay !== 'none' && (
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              )}
            </button>

            {/* Floating Layer Drawer Modal */}
            {isLayerDrawerOpen && (
              <div className="mt-1.5 bg-slate-950/95 backdrop-blur-xl border border-slate-800 rounded-2xl p-3 shadow-2xl text-xs text-slate-200 w-56 space-y-2 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                  <span className="font-extrabold text-white text-xs">Meteorological Layers</span>
                  <button onClick={() => setIsLayerDrawerOpen(false)} className="text-slate-400 hover:text-white px-1">✕</button>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">Live Overlays</span>
                  <div className="space-y-1">
                    <button
                      onClick={() => { setActiveWeatherOverlay('none'); setIsLayerDrawerOpen(false); }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        activeWeatherOverlay === 'none' ? 'bg-sky-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      🌀 Track Vector & Cone
                    </button>
                  </div>
                </div>

                <div className="pt-1.5 border-t border-slate-800">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">Forecast Dynamics</span>
                  <div className="space-y-1">
                    <button
                      onClick={() => { setActiveWeatherOverlay('wind'); setIsLayerDrawerOpen(false); }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${
                        activeWeatherOverlay === 'wind' ? 'bg-amber-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Wind className="w-3.5 h-3.5 text-amber-400" />
                        <span>Wind Speed & Gusts</span>
                      </span>
                      <span className="text-[9px] font-mono text-amber-200">115 km/h</span>
                    </button>

                    <button
                      onClick={() => { setActiveWeatherOverlay('rain'); setIsLayerDrawerOpen(false); }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${
                        activeWeatherOverlay === 'rain' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Waves className="w-3.5 h-3.5 text-blue-400" />
                        <span>Precipitation Rates</span>
                      </span>
                      <span className="text-[9px] font-mono text-blue-200">Heavy</span>
                    </button>

                    <button
                      onClick={() => { setActiveWeatherOverlay('pressure'); setIsLayerDrawerOpen(false); }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${
                        activeWeatherOverlay === 'pressure' ? 'bg-rose-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5 text-rose-400" />
                        <span>Pressure & Isobars</span>
                      </span>
                      <span className="text-[9px] font-mono text-rose-200">988 hPa</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Top Horizontal Metric Scale Bar (Zoom Earth Style from animation2.mp4) */}
          {activeWeatherOverlay !== 'none' && (
            <div className="absolute top-2.5 left-24 right-28 sm:left-32 sm:right-32 z-[400] bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-xl px-2.5 py-1 text-center shadow-lg pointer-events-none">
              {activeWeatherOverlay === 'wind' && (
                <div>
                  <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-slate-300 font-bold mb-0.5">
                    <span>0</span>
                    <span>30</span>
                    <span>60</span>
                    <span>90</span>
                    <span>115 (Gale)</span>
                    <span>150+ km/h</span>
                  </div>
                  <div className="h-1.5 sm:h-2 w-full rounded-full bg-gradient-to-r from-sky-400 via-emerald-400 via-amber-400 via-orange-500 to-rose-600 shadow-inner"></div>
                </div>
              )}

              {activeWeatherOverlay === 'rain' && (
                <div>
                  <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-slate-300 font-bold mb-0.5">
                    <span>Drizzle (0.5)</span>
                    <span>Mod (5)</span>
                    <span>Heavy (25)</span>
                    <span>Extreme (&gt;50 mm/h)</span>
                  </div>
                  <div className="h-1.5 sm:h-2 w-full rounded-full bg-gradient-to-r from-sky-300 via-blue-500 via-indigo-600 to-purple-600 shadow-inner"></div>
                </div>
              )}

              {activeWeatherOverlay === 'pressure' && (
                <div>
                  <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-slate-300 font-bold mb-0.5">
                    <span className="text-red-400 font-extrabold">Deep Low (&lt;990)</span>
                    <span>1000</span>
                    <span>1008</span>
                    <span>High (&gt;1018 hPa)</span>
                  </div>
                  <div className="h-1.5 sm:h-2 w-full rounded-full bg-gradient-to-r from-red-600 via-amber-500 via-sky-500 to-blue-700 shadow-inner"></div>
                </div>
              )}
            </div>
          )}



          {/* Bottom Floating Time Scrubber Bar (Zoom Earth Style) */}
          <div className="absolute bottom-2.5 inset-x-2 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-[400] bg-slate-950/95 backdrop-blur-md border border-slate-800/90 rounded-2xl p-1.5 shadow-2xl flex items-center justify-between sm:justify-center gap-1.5 max-w-full overflow-x-auto no-scrollbar">
            {/* Play / Pause Toggle */}
            <button
              onClick={() => setIsPlayingTime(!isPlayingTime)}
              className="flex items-center gap-1 px-2.5 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95 flex-shrink-0"
              title={isPlayingTime ? "Pause Storm Timeline" : "Play Storm Progression"}
            >
              {isPlayingTime ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span className="hidden sm:inline">{isPlayingTime ? 'Pause' : 'Play'}</span>
            </button>

            {/* Stepper Chevrons */}
            <button
              onClick={() => setTimeStepIndex((prev) => Math.max(0, prev - 1))}
              disabled={timeStepIndex === 0}
              className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
              title="Previous Time Step"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Step Time Buttons */}
            <div className="flex items-center gap-1 flex-nowrap overflow-x-auto no-scrollbar py-0.5">
              {AKVAN_TIMELINE_STEPS.map((step, idx) => {
                const isSelected = timeStepIndex === idx;
                return (
                  <button
                    key={step.id}
                    onClick={() => {
                      setTimeStepIndex(idx);
                      setIsPlayingTime(false);
                    }}
                    className={`whitespace-nowrap px-2 py-0.5 rounded-md text-[10px] font-mono font-bold transition-all border ${
                      isSelected
                        ? step.isLive
                          ? 'bg-red-600 text-white border-red-400 shadow-md scale-105'
                          : step.isLandfall
                          ? 'bg-amber-600 text-white border-amber-400 shadow-md scale-105'
                          : 'bg-cyan-600 text-white border-cyan-400 shadow-md scale-105'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {step.isLive ? '🔴 ' : step.isLandfall ? '🎯 ' : ''}
                    {step.time}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setTimeStepIndex((prev) => Math.min(AKVAN_TIMELINE_STEPS.length - 1, prev + 1))}
              disabled={timeStepIndex === AKVAN_TIMELINE_STEPS.length - 1}
              className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
              title="Next Time Step"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Reset to Live Eye Button */}
            <button
              onClick={() => {
                setTimeStepIndex(1); // Live Eye index
                setIsPlayingTime(false);
              }}
              className={`flex-shrink-0 px-2 py-0.5 text-[9px] font-bold rounded border transition-all ${
                timeStepIndex === 1
                  ? 'bg-red-950 text-red-300 border-red-700'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
              title="Reset to Live Eye Observation (08:00 AM)"
            >
              Live Eye
            </button>
          </div>

          {/* Legend Overlay - Responsive & Collapsible on Mobile */}
          <div className="absolute bottom-14 left-2.5 z-[400]">
            {!isLegendOpen ? (
              <button
                onClick={() => setIsLegendOpen(true)}
                className="px-2 py-1 bg-slate-950/90 hover:bg-slate-900 backdrop-blur-md border border-slate-800 rounded-lg text-[10px] text-slate-300 hover:text-white shadow-lg flex items-center gap-1 transition-all"
              >
                <span>ℹ️ Map Legend</span>
              </button>
            ) : (
              <div className="bg-slate-950/95 backdrop-blur-md border border-slate-800 rounded-xl p-2.5 text-[10px] text-slate-300 space-y-1.5 shadow-2xl max-w-[220px]">
                <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                  <span className="font-bold text-white text-[11px]">Map Legend</span>
                  <button onClick={() => setIsLegendOpen(false)} className="text-slate-400 hover:text-white text-xs px-1">✕</button>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500 border border-white inline-block shadow-sm"></span>
                  <span className="font-semibold text-white">Your Location</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 border border-white inline-block"></span>
                  <span className="text-red-400 font-semibold">🎯 Expected Landfall</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500 border border-white inline-block"></span>
                  <span className="text-orange-300 font-medium">⏱️ Forecast Milestones</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-1 bg-red-500 inline-block rounded"></span>
                  <span>Forecast Track Vector</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-2.5 bg-red-500/25 border border-dashed border-red-500 inline-block rounded"></span>
                  <span>IMD Cone of Uncertainty</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-0.5 border-b border-dashed border-slate-400 inline-block"></span>
                  <span>Past Observed Path</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Embedded Live INSAT-3DR Satellite Viewer (Rendered Directly in App) */}
      {activeTab === 'satellite' && (
        <div className="p-3 bg-slate-950 flex flex-col space-y-3">
          {/* Channel Selector */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
            <div className="flex items-center gap-1.5">
              <Satellite className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-bold text-white">INSAT-3DR Live Geosynchronous Satellite</span>
            </div>

            <div className="flex items-center gap-1 bg-slate-900 rounded-lg p-1 border border-slate-800">
              <button
                onClick={() => setSatChannel('ir1')}
                className={`px-2 py-0.5 text-[11px] font-semibold rounded ${
                  satChannel === 'ir1' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Infrared (IR1)
              </button>
              <button
                onClick={() => setSatChannel('vis')}
                className={`px-2 py-0.5 text-[11px] font-semibold rounded ${
                  satChannel === 'vis' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Visible Optical
              </button>
              <button
                onClick={() => setSatChannel('wv')}
                className={`px-2 py-0.5 text-[11px] font-semibold rounded ${
                  satChannel === 'wv' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Water Vapor
              </button>

              <button
                onClick={handleRefreshSatFeed}
                disabled={isRefreshingSat}
                className="flex items-center gap-1 px-2 py-0.5 hover:bg-slate-800 bg-slate-900 border border-slate-700 rounded text-slate-300 ml-1 active:scale-95 transition-all"
                title="Reload Latest Live IMD Satellite Feed"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingSat ? 'animate-spin text-sky-400' : 'text-slate-400'}`} />
                <span className="text-[10px] text-slate-300 font-medium">
                  {isRefreshingSat ? 'Refreshing...' : satRefreshedToast ? '✓ Feed Updated' : 'Reload'}
                </span>
              </button>
            </div>
          </div>

          {/* Embedded Image Container */}
          <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900 flex flex-col items-center justify-center min-h-[320px] max-h-[460px]">
            <img
              key={`${satChannel}-${satTimestamp}`}
              src={satImages[satChannel].url}
              alt="IMD INSAT-3DR Live Satellite Feed"
              className={`w-full h-auto max-h-[440px] object-contain rounded-lg transition-opacity duration-300 ${isRefreshingSat ? 'opacity-50' : 'opacity-100'}`}
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://mausam.imd.gov.in/Satellite/3Dasiasec_ir1.jpg';
              }}
            />
            <div className="absolute top-2 left-2 bg-slate-950/85 backdrop-blur-sm border border-slate-800 px-2 py-1 rounded text-[10px] text-slate-300">
              <span>{satImages[satChannel].name}</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 px-1">
            {satImages[satChannel].desc}
          </p>
        </div>
      )}

      {/* 3. Embedded IMD Doppler Weather Radar (DWR) Viewer */}
      {activeTab === 'radar' && (
        <div className="p-3 bg-slate-950 flex flex-col space-y-3">
          {/* Station Selector */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
            <div className="flex items-center gap-1.5">
              <Radio className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-white">IMD Doppler Weather Radar (DWR) Network</span>
            </div>

            <select
              value={selectedRadarStation}
              onChange={(e) => setSelectedRadarStation(e.target.value)}
              className="bg-slate-800 text-slate-200 text-xs font-semibold rounded-lg px-2.5 py-1 border border-slate-700"
            >
              <option value="paradip">Paradip Coastal Radar (Odisha)</option>
              <option value="gopalpur">Gopalpur Radar (Odisha)</option>
              <option value="kolkata">Kolkata Radar (West Bengal)</option>
              <option value="visakhapatnam">Visakhapatnam Radar (AP)</option>
            </select>
          </div>

          {/* Radar Station Status Card */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div>
                <h4 className="text-sm font-bold text-slate-100">{radarStations[selectedRadarStation].name}</h4>
                <p className="text-[11px] text-slate-400">{radarStations[selectedRadarStation].range}</p>
              </div>
              <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded text-[11px] font-bold">
                OPERATIONAL
              </span>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Scan Frequency:</span>
                <span className="font-mono">Every 10 Minutes</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Observation Mode:</span>
                <span className="font-mono">MaxZ / PPI Precipitation Reflectivity</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Current Storm Coverage:</span>
                <span className="text-amber-400 font-semibold">{radarStations[selectedRadarStation].status}</span>
              </div>
            </div>

            {/* Radar Reflectivity Scale Legend */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Doppler Reflectivity Intensity Scale (dBZ):
              </span>
              <div className="flex items-center rounded overflow-hidden h-3 w-full text-[9px] font-bold">
                <div className="bg-sky-400 flex-1 text-center text-slate-950">Light (15)</div>
                <div className="bg-emerald-400 flex-1 text-center text-slate-950">Mod (30)</div>
                <div className="bg-amber-400 flex-1 text-center text-slate-950">Heavy (45)</div>
                <div className="bg-red-600 flex-1 text-center text-white">Gale &gt;55</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Global Multi-Agency Comparison (IMD vs JTWC vs ECMWF) */}
      {activeTab === 'global' && (
        <div className="p-3 bg-slate-950 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-1.5">
              <Globe2 className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-white">
                Multi-Agency Cyclone Track Comparison: {activeStorm.name}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Consensus Analysis</span>
          </div>

          <p className="text-[11px] text-slate-300 leading-relaxed">
            Comparing the official Indian mandate with international naval and global ensemble forecast models:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {activeStorm.agencyComparison && activeStorm.agencyComparison.map((agency, i) => (
              <div
                key={i}
                className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col justify-between space-y-2.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white flex items-center gap-1">
                      <span>{agency.flag}</span>
                      <span>{agency.agency}</span>
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-sky-400 border border-slate-700">
                      {agency.confidence}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 block line-clamp-1">{agency.fullname}</span>
                </div>

                <div className="space-y-1.5 text-xs border-t border-slate-800 pt-2">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Class / Status:</span>
                    <span className="font-bold text-slate-100">{agency.status}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block">Max Wind & Standard:</span>
                    <span className="font-bold text-amber-300">{agency.windSpeed}</span>
                    <span className="text-[9px] text-slate-500 block leading-tight">{agency.windStandard}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block">Expected Landfall Zone:</span>
                    <span className="font-medium text-slate-200 block text-[11px]">{agency.landfallEstimate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-sky-950/40 border border-sky-800/60 rounded-xl p-2.5 text-[11px] text-sky-200">
            <strong>Key Difference Note:</strong> IMD measures wind speeds over a <strong>3-minute sustained window</strong> (Indian Standard), whereas the US Navy JTWC uses a <strong>1-minute sustained window</strong> (which results in ~10–12% higher reported wind speeds for the exact same storm system).
          </div>
        </div>
      )}

      {/* 5. Live Zoom Earth & Satellite Wind Vector Tracker */}
      {activeTab === 'zoomearth' && (
        <div className="p-3 bg-slate-950 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
            <div className="flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-white">
                Live Eye & Wind Vector Tracker: Severe Cyclone Akvan
              </span>
            </div>
            <a
              href="https://zoom.earth/maps/satellite/#view=18.066,83.368,6z"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1 bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] font-bold rounded-lg transition-colors shadow-sm"
            >
              <span>Launch Fullscreen HD</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          {/* Quick Storm Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg">
              <span className="text-[10px] text-slate-400 block">System Name</span>
              <strong className="text-red-400 font-extrabold text-xs">Cyclone Akvan</strong>
              <span className="text-[9px] text-slate-500 block">Name contributed by Iran</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg">
              <span className="text-[10px] text-slate-400 block">Live Eye Coordinates</span>
              <strong className="text-cyan-300 font-mono text-xs">18.1°N, 83.4°E</strong>
              <span className="text-[9px] text-emerald-400 block">~40 km to Padmapur Coast</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg">
              <span className="text-[10px] text-slate-400 block">Winds & Peak Gusts</span>
              <strong className="text-amber-400 font-bold text-xs">95 km/h (Gusts: 115)</strong>
              <span className="text-[9px] text-slate-500 block">Severe Cyclone Standard</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg">
              <span className="text-[10px] text-slate-400 block">Central Pressure</span>
              <strong className="text-slate-100 font-mono text-xs">988 hPa</strong>
              <span className="text-[9px] text-rose-400 block">Deep Pressure Well</span>
            </div>
          </div>

          {/* Interactive Live Eye Satellite Preview Card */}
          <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900 min-h-[340px] max-h-[460px] flex flex-col items-center justify-center">
            <img
              src="https://mausam.imd.gov.in/Satellite/3Dasiasec_ir1.jpg"
              alt="Live Geostationary Cyclone Akvan Satellite Observation"
              className="w-full h-auto max-h-[420px] object-contain rounded-lg opacity-90 hover:opacity-100 transition-opacity"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://mausam.imd.gov.in/Satellite/3Dasiasec_ir1.jpg';
              }}
            />
            {/* Live Eye Overlay Badge */}
            <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md border border-cyan-500/50 px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-cyan-300 block">Akvan Eye Center</span>
                <span className="text-[11px] font-mono font-bold text-white">18.10°N, 83.40°E (Gopalpur Sector)</span>
              </div>
            </div>

            {/* Launch Zoom Earth Overlay Button */}
            <div className="absolute bottom-3 inset-x-3 sm:inset-x-auto sm:right-3 flex items-center justify-center">
              <a
                href="https://zoom.earth/maps/satellite/#view=18.066,83.368,6z"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold rounded-xl shadow-xl transition-all border border-cyan-400/40 active:scale-95"
              >
                <Compass className="w-4 h-4 animate-spin text-cyan-200" style={{ animationDuration: '6s' }} />
                <span>Open Live Radar & Eye in Zoom Earth HD</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-2.5 text-[11px] text-slate-300 space-y-1">
            <p>
              <strong>Multi-Model Real-Time Observation:</strong> Zoom Earth integrates high-resolution geostationary satellite feeds (INSAT-3DR / EUMETSAT) and real-time wind vector forecasts from ECMWF & GFS. The live eyewall is tracking North-Northwest towards the <strong>North Andhra Pradesh – South Odisha coast (Padmapur / Gopalpur sector)</strong>, with landfall commencing today (20-Nov) around noon to afternoon.
            </p>
          </div>
        </div>
      )}

      {/* Prominent Courtesy / Attribution Bar */}
      <div className="p-2.5 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between gap-2 text-[10px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
          <span>
            <strong className="text-slate-300">Courtesy:</strong> India Meteorological Department (IMD / INSAT-3DR), US Navy JTWC (Hawaii), ECMWF European Ensemble & OpenStreetMap.
          </span>
        </div>
        <span className="font-mono text-slate-500 hidden sm:inline flex-shrink-0">Multi-Agency Consensus</span>
      </div>
    </div>
  );
}
