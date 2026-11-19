import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, Polygon, useMap, ZoomControl } from 'react-leaflet';
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
  ArrowRight
} from 'lucide-react';
import { calculateDistanceKm } from '../services/cycloneEngine';

// Custom icons using CSS
// Distinctive User Location Pin with permanent visible label badge
const createUserIcon = (locationName) => {
  const cleanName = (locationName || 'You')
    .replace(/^Live GPS \(Near (.*)\)$/, '$1')
    .replace(/^Live Tracking \((.*)\)$/, '$1');

  return L.divIcon({
    className: 'custom-user-marker',
    html: `<div style="position:relative; display:flex; flex-direction:column; align-items:center; transform: translate(-50%, -100%); pointer-events:auto;">
            <div style="background:#0284c7; color:#ffffff; font-size:10px; font-weight:800; padding:2px 7px; border-radius:12px; border:1.5px solid white; box-shadow:0 3px 10px rgba(0,0,0,0.6); white-space:nowrap; margin-bottom:2px; font-family:Inter,sans-serif; display:flex; align-items:center; gap:4px; letter-spacing:0.2px;">
              <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#38bdf8; box-shadow:0 0 6px #38bdf8;"></span>
              YOU (${cleanName})
            </div>
            <div style="position:relative; width:22px; height:22px;">
              <div style="position:absolute; inset:0; border-radius:50%; background:#0284c7; opacity:0.45; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
              <div style="position:absolute; inset:2px; border-radius:50%; background:#0284c7; border:2.5px solid #ffffff; box-shadow:0 0 12px #38bdf8; display:flex; align-items:center; justify-content:center;">
                <div style="width:6px; height:6px; border-radius:50%; background:#ffffff;"></div>
              </div>
            </div>
            <div style="width:2px; height:6px; background:#0284c7;"></div>
           </div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0]
  });
};

// Landfall Marker Icon (Red Hazard Target)
const createLandfallIcon = (time) => L.divIcon({
  className: 'custom-landfall-marker',
  html: `<div style="position:relative; display:flex; flex-direction:column; align-items:center; transform: translate(-50%, -100%); pointer-events:auto;">
          <div style="background:#b91c1c; color:#ffffff; font-size:9px; font-weight:800; padding:2px 6px; border-radius:8px; border:1.5px solid white; box-shadow:0 3px 10px rgba(0,0,0,0.6); white-space:nowrap; margin-bottom:2px; font-family:Inter,sans-serif; display:flex; align-items:center; gap:3px;">
            <span>⚠️</span> LANDFALL (${time || '06:00 AM'})
          </div>
          <div style="position:relative; width:20px; height:20px;">
            <div style="position:absolute; inset:0; border-radius:50%; background:#ef4444; opacity:0.55; animation: ping 1.4s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="position:absolute; inset:2px; border-radius:50%; background:#dc2626; border:2px solid #ffffff; box-shadow:0 0 10px #ef4444; display:flex; align-items:center; justify-content:center; color:white; font-size:10px; font-weight:bold;">🎯</div>
          </div>
          <div style="width:2px; height:5px; background:#dc2626;"></div>
         </div>`,
  iconSize: [0, 0],
  iconAnchor: [0, 0]
});

// Milestone Marker Icon (Orange/Dark Slate Milestone - Zero blue/green to prevent confusion)
const createForecastMilestoneIcon = (time) => L.divIcon({
  className: 'custom-milestone-marker',
  html: `<div style="position:relative; display:flex; flex-direction:column; align-items:center; transform: translate(-50%, -100%); pointer-events:auto;">
          <div style="background:#0f172a; color:#fdba74; font-size:8px; font-weight:700; padding:1px 5px; border-radius:6px; border:1px solid #ea580c; white-space:nowrap; margin-bottom:2px; font-family:Inter,sans-serif; box-shadow:0 2px 5px rgba(0,0,0,0.6);">
            ⏱️ ${time}
          </div>
          <div style="width:10px; height:10px; border-radius:50%; background:#f97316; border:2px solid #ffffff; box-shadow:0 0 6px rgba(249, 115, 22, 0.9);"></div>
         </div>`,
  iconSize: [0, 0],
  iconAnchor: [0, 0]
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
  const [activeTab, setActiveTab] = useState('trajectory'); // 'trajectory' | 'radar' | 'satellite' | 'global'
  const [mapViewMode, setMapViewMode] = useState('all-india'); // 'all-india' | 'bay-of-bengal' | 'arabian-sea' | 'my-location'
  const [satChannel, setSatChannel] = useState('ir1'); // 'ir1' | 'vis' | 'wv'
  const [selectedRadarStation, setSelectedRadarStation] = useState('paradip');
  const [satTimestamp, setSatTimestamp] = useState(Date.now());
  const [isRefreshingSat, setIsRefreshingSat] = useState(false);
  const [satRefreshedToast, setSatRefreshedToast] = useState(false);

  const handleRefreshSatFeed = () => {
    setIsRefreshingSat(true);
    setSatTimestamp(Date.now());
    setTimeout(() => {
      setIsRefreshingSat(false);
      setSatRefreshedToast(true);
      setTimeout(() => setSatRefreshedToast(false), 2500);
    }, 800);
  };

  const [flyTarget, setFlyTarget] = useState([20.5937, 80.9629]); // Default All-India Center
  const [flyZoom, setFlyZoom] = useState(5);
  const [flyTrigger, setFlyTrigger] = useState(0);
  const [isLocating, setIsLocating] = useState(false);
  const [justUpdated, setJustUpdated] = useState(false);

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
    paradip: {
      name: 'Paradip Coastal DWR (Odisha)',
      range: '400 km radial coverage',
      status: 'Tracking North-West Bay of Bengal Storm Core'
    },
    gopalpur: {
      name: 'Gopalpur DWR (South Odisha)',
      range: '400 km radial coverage',
      status: 'Tracking Peripheral Spiral Bands'
    },
    kolkata: {
      name: 'Kolkata Subhasgram DWR (WB)',
      range: '400 km radial coverage',
      status: 'Tracking North Bay & Sunderbans Coastal Inundation'
    },
    visakhapatnam: {
      name: 'Visakhapatnam Naval DWR (AP)',
      range: '400 km radial coverage',
      status: 'Tracking Western Inflow Winds'
    }
  };

  // Official Multi-Stage Track Vectors & IMD Cone of Uncertainty
  const getTrackForStorm = (storm) => {
    const lat = storm.center.lat;
    const lon = storm.center.lon;

    if (storm.basin === 'Bay of Bengal') {
      return {
        pastCoords: [
          [16.20, 89.60],
          [17.40, 88.90],
          [18.60, 88.20],
          [lat, lon]
        ],
        forecastCoords: [
          [lat, lon],
          [20.45, 87.35],
          [20.85, 87.05], // Landfall near Dhamra / Bhadrak coast
          [21.45, 86.70], // Inland Balasore / Mayurbhanj
          [22.20, 86.20]  // Jharkhand / Bengal border
        ],
        coneCoords: [
          [lat, lon],
          [20.10, 86.60], // Left cone bound (near Paradip / Kendrapara)
          [20.70, 86.30], // Left bound inland
          [21.90, 85.80], // North-West inland apex
          [22.40, 86.80], // North bound
          [21.65, 88.10], // Right bound (Sagar Island / Sundarbans)
          [20.80, 88.30], // Right bound (Northern Bay)
          [lat, lon]
        ],
        checkpoints: [
          { label: '00:00 (Offshore Squall)', lat: 20.45, lon: 87.35, time: '12:00 AM' },
          { label: 'Expected Landfall (Dhamra/Bhadrak)', lat: 20.85, lon: 87.05, time: '06:00 AM', isLandfall: true },
          { label: 'Inland Crossing (Balasore)', lat: 21.45, lon: 86.70, time: '12:00 PM' }
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
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
      {/* Top Header with Tab Switcher - Mobile Optimized Swipeable Bar */}
      <div className="p-2.5 sm:p-3 border-b border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 bg-slate-900/90">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-sky-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Live Radar & Basin Monitor
            </h3>
          </div>
          {isGpsActive && (
            <span className="sm:hidden flex items-center gap-1 text-[9px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Live GPS
            </span>
          )}
        </div>

        {/* Tab Controls (Swipeable on mobile) */}
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
            onClick={() => setActiveTab('global')}
            className={`whitespace-nowrap flex-shrink-0 px-2.5 py-1.5 text-[11px] font-bold rounded-lg transition-colors ${
              activeTab === 'global' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Foreign (JTWC/ECMWF)
          </button>
        </div>
      </div>

      {/* Basin Split Quick Navigation Bar (Swipeable on mobile) */}
      {activeTab === 'trajectory' && (
        <div className="bg-slate-950 px-2.5 py-2 border-b border-slate-800 flex items-center overflow-x-auto no-scrollbar gap-1.5 text-xs">
          <div className="flex items-center gap-1 flex-shrink-0 pr-1">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase">Focus:</span>
          </div>

          <div className="flex items-center gap-1.5 flex-nowrap">
            <button
              onClick={() => switchMapView('all-india')}
              className={`whitespace-nowrap flex-shrink-0 px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all border ${
                mapViewMode === 'all-india'
                  ? 'bg-sky-600 text-white border-sky-400 shadow-sm'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              🇮🇳 Entire India
            </button>

            <button
              onClick={() => switchMapView('bay-of-bengal')}
              className={`whitespace-nowrap flex-shrink-0 px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all border ${
                mapViewMode === 'bay-of-bengal'
                  ? 'bg-red-600 text-white border-red-400 shadow-sm'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              🌊 Bay of Bengal
            </button>

            <button
              onClick={() => switchMapView('arabian-sea')}
              className={`whitespace-nowrap flex-shrink-0 px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all border ${
                mapViewMode === 'arabian-sea'
                  ? 'bg-amber-600 text-white border-amber-400 shadow-sm'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              🌊 Arabian Sea
            </button>

            <button
              onClick={() => switchMapView('my-location')}
              className={`whitespace-nowrap flex-shrink-0 px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all border ${
                mapViewMode === 'my-location'
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-sm'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              📍 My Location
            </button>
          </div>
        </div>
      )}

      {/* 1. Track Vector Map View (All-India + Both Basins Plotted Simultaneously) */}
      {activeTab === 'trajectory' && (
        <div className="h-[340px] w-full relative z-0">
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

            {/* User Marker with Distinct Pin & Label */}
            <Marker position={[userLocation.lat, userLocation.lon]} icon={createUserIcon(userLocation.name)}>
              <Popup>
                <div className="text-xs text-slate-900 font-sans">
                  <strong className="text-sky-700">📍 Your Location:</strong> {userLocation.name}
                  <div className="text-[10px] text-slate-600 mt-0.5">
                    Lat: {userLocation.lat.toFixed(4)}°, Lon: {userLocation.lon.toFixed(4)}°
                    {userLocation.accuracy && ` (Accuracy: ±${Math.round(userLocation.accuracy)}m)`}
                  </div>
                </div>
              </Popup>
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
              const stormDist = calculateDistanceKm(userLocation.lat, userLocation.lon, storm.center.lat, storm.center.lon);
              const trackData = getTrackForStorm(storm);

              return (
                <React.Fragment key={storm.id}>
                  {/* Storm Center Marker */}
                  <Marker
                    position={[storm.center.lat, storm.center.lon]}
                    icon={isBob ? cycloneBobIcon : cycloneArbIcon}
                  >
                    <Popup>
                      <div className="text-xs text-slate-900 font-sans p-1">
                        <strong className="block text-red-600 text-sm font-bold">{storm.name}</strong>
                        <span className="text-[11px] font-semibold text-slate-700 block">Basin: {storm.basin}</span>
                        <span className="text-[10px] text-slate-600 block mt-1">{storm.center.locationDesc}</span>
                        <div className="mt-1 pt-1 border-t border-slate-200 space-y-0.5">
                          <span className="text-[11px] font-bold text-sky-700 block">
                            📍 To You ({userLocation.name}): {stormDist} km
                          </span>
                          {storm.distanceToCoastKm && (
                            <span className="text-[11px] font-bold text-emerald-700 block">
                              🌊 To Coast ({storm.nearestCoastName}): ~{storm.distanceToCoastKm} km
                            </span>
                          )}
                          <span className="text-[10px] text-slate-700 block">
                            ⏱️ Advancing at {storm.movement?.speedKmph || 18} km/h {storm.movement?.direction || 'NNW'}
                          </span>
                          <span className="text-[10px] text-slate-800 block">Status: {storm.status}</span>
                        </div>
                      </div>
                    </Popup>
                  </Marker>

                  {/* Gale Wind Danger Zone (120 km radius) */}
                  <Circle
                    center={[storm.center.lat, storm.center.lon]}
                    radius={120000}
                    pathOptions={{
                      color: isBob ? '#ef4444' : '#f59e0b',
                      fillColor: isBob ? '#ef4444' : '#f59e0b',
                      fillOpacity: 0.15,
                      weight: 1.5,
                      dashArray: '4, 4'
                    }}
                  />

                  {/* Squally Wind Zone (250 km radius) */}
                  <Circle
                    center={[storm.center.lat, storm.center.lon]}
                    radius={250000}
                    pathOptions={{
                      color: isBob ? '#f59e0b' : '#fbbf24',
                      fillColor: isBob ? '#f59e0b' : '#fbbf24',
                      fillOpacity: 0.08,
                      weight: 1
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

                  {/* Forecast Checkpoints (Landfall & Milestone Markers - NO blue/green dots) */}
                  {trackData.checkpoints && trackData.checkpoints.map((pt, pIdx) => (
                    <Marker
                      key={pIdx}
                      position={[pt.lat, pt.lon]}
                      icon={pt.isLandfall ? createLandfallIcon(pt.time) : createForecastMilestoneIcon(pt.time)}
                    >
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

          {/* Floating Action Controls on Map */}
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

          {/* Dual Storm Distance Floating Overlay */}
          <div className="absolute top-2.5 left-2.5 z-[400] flex flex-col gap-1 max-w-[210px] sm:max-w-none">
            {allStorms.map(storm => {
              const dist = calculateDistanceKm(userLocation.lat, userLocation.lon, storm.center.lat, storm.center.lon);
              const isBob = storm.basin === 'Bay of Bengal';
              const coastDist = storm.distanceToCoastKm;
              return (
                <button
                  key={storm.id}
                  onClick={() => switchMapView(isBob ? 'bay-of-bengal' : 'arabian-sea')}
                  className="px-2.5 py-1.5 bg-slate-950/95 backdrop-blur-md border border-slate-800 hover:border-sky-500 rounded-xl text-[10px] text-left transition-all shadow-lg"
                >
                  <div className="flex items-center justify-between gap-1.5 font-bold text-white">
                    <span className="flex items-center gap-1">
                      <span>{isBob ? '🔴' : '🟠'}</span>
                      <span className="truncate">{storm.basin}</span>
                    </span>
                    <span className={dist < 300 ? 'text-red-400 font-extrabold' : 'text-slate-300'}>
                      {dist} km to you
                    </span>
                  </div>
                  {coastDist && (
                    <div className="mt-0.5 pt-0.5 border-t border-slate-800/70 flex items-center justify-between text-[9px] text-emerald-400 font-medium">
                      <span>🌊 Coast:</span>
                      <span>~{coastDist} km ({storm.nearestCoastName ? storm.nearestCoastName.split(' ')[0] : 'Land'})</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend Overlay */}
          <div className="absolute bottom-2 left-2 z-[400] bg-slate-950/95 backdrop-blur-md border border-slate-800 rounded-lg p-2 text-[10px] text-slate-300 space-y-1.5 shadow-xl">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 border border-white inline-block shadow-sm"></span>
              <span className="font-semibold text-white">Your Location (📍 YOU)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 border border-white inline-block"></span>
              <span className="text-red-400 font-semibold">⚠️ Expected Landfall</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-500 border border-white inline-block"></span>
              <span className="text-orange-300 font-medium">⏱️ Forecast Milestones</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-1 bg-red-500 inline-block rounded"></span>
              <span>Projected Forecast Track Vector</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-2.5 bg-red-500/25 border border-dashed border-red-500 inline-block rounded"></span>
              <span>IMD Landfall Cone of Uncertainty</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-0.5 border-b border-dashed border-slate-400 inline-block"></span>
              <span>Past Observed Path</span>
            </div>
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
