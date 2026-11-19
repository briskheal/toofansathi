import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, useMap } from 'react-leaflet';
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
  ZoomIn,
  ShieldCheck,
  Eye
} from 'lucide-react';

// Custom icons using CSS
const userIcon = L.divIcon({
  className: 'custom-user-marker',
  html: `<div style="position:relative; width:18px; height:18px;">
          <div style="position:absolute; inset:0; border-radius:50%; background:#38bdf8; opacity:0.6; animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position:absolute; inset:2px; border-radius:50%; background:#0284c7; border:2px solid white; box-shadow:0 0 12px #38bdf8;"></div>
         </div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9]
});

const cycloneIcon = L.divIcon({
  className: 'custom-cyclone-marker',
  html: `<div style="position:relative; width:28px; height:28px;">
          <div style="position:absolute; inset:0; border-radius:50%; background:#ef4444; opacity:0.5; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position:absolute; inset:4px; border-radius:50%; background:#dc2626; border:2px solid #ffffff; display:flex; align-items:center; justify-content:center; color:white; font-size:10px; font-weight:bold;">🌀</div>
         </div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14]
});

// Component to handle smooth pan/fly to coordinates
function MapRecenterController({ centerCoords, triggerKey }) {
  const map = useMap();
  useEffect(() => {
    if (centerCoords && centerCoords[0] && centerCoords[1]) {
      map.flyTo(centerCoords, Math.max(map.getZoom(), 7), { duration: 1.4 });
    }
  }, [centerCoords, triggerKey, map]);
  return null;
}

export default function CycloneMap({ userLocation, stormCenter, landfallArea, onRefreshLocation, isGpsActive, activeStorm }) {
  const [activeTab, setActiveTab] = useState('trajectory'); // 'trajectory' | 'radar' | 'satellite' | 'global'
  const [satChannel, setSatChannel] = useState('ir1'); // 'ir1' | 'vis' | 'wv'
  const [selectedRadarStation, setSelectedRadarStation] = useState('paradip');
  const [satTimestamp, setSatTimestamp] = useState(Date.now());

  const [flyTarget, setFlyTarget] = useState(null);
  const [flyTrigger, setFlyTrigger] = useState(0);
  const [isLocating, setIsLocating] = useState(false);
  const [justUpdated, setJustUpdated] = useState(false);

  const mapCenter = [
    (userLocation.lat + stormCenter.lat) / 2,
    (userLocation.lon + stormCenter.lon) / 2
  ];

  // Projected trajectory track to coast
  const trackLine = [
    [stormCenter.lat - 1.2, stormCenter.lon + 0.8],
    [stormCenter.lat, stormCenter.lon],
    [20.80, 87.05],
    [21.60, 86.80]
  ];

  // Center map immediately on user's current pin
  const handleCenterOnUser = () => {
    setFlyTarget([userLocation.lat, userLocation.lon]);
    setFlyTrigger((prev) => prev + 1);
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
        setFlyTrigger((prev) => prev + 1);
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
      desc: 'Shows high storm cloud tops and cold convective thunderstorm towers in deep red/white.'
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

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
      {/* Top Header with Tab Switcher */}
      <div className="p-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 bg-slate-900/90">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-sky-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Live Radar, Satellite & Agency Track
          </h3>
          {isGpsActive && activeTab === 'trajectory' && (
            <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Live GPS
            </span>
          )}
        </div>

        {/* Tab Controls (4 views directly in-app) */}
        <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 flex-wrap gap-0.5">
          <button
            onClick={() => setActiveTab('trajectory')}
            className={`px-2 py-1 text-[11px] font-semibold rounded-md transition-colors ${
              activeTab === 'trajectory' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Track Vector
          </button>
          <button
            onClick={() => setActiveTab('satellite')}
            className={`px-2 py-1 text-[11px] font-semibold rounded-md transition-colors ${
              activeTab === 'satellite' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Live INSAT-3DR
          </button>
          <button
            onClick={() => setActiveTab('radar')}
            className={`px-2 py-1 text-[11px] font-semibold rounded-md transition-colors ${
              activeTab === 'radar' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            IMD Radar
          </button>
          <button
            onClick={() => setActiveTab('global')}
            className={`px-2 py-1 text-[11px] font-semibold rounded-md transition-colors ${
              activeTab === 'global' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Foreign Agencies (JTWC/ECMWF)
          </button>
        </div>
      </div>

      {/* 1. Track Vector Map View */}
      {activeTab === 'trajectory' && (
        <div className="h-[300px] w-full relative z-0">
          <MapContainer
            center={mapCenter}
            zoom={6}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapRecenterController centerCoords={flyTarget} triggerKey={flyTrigger} />

            {/* User Marker */}
            <Marker position={[userLocation.lat, userLocation.lon]} icon={userIcon}>
              <Popup>
                <div className="text-xs text-slate-900 font-sans">
                  <strong>Your Location:</strong> {userLocation.name}
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

            {/* Storm Center Marker */}
            <Marker position={[stormCenter.lat, stormCenter.lon]} icon={cycloneIcon}>
              <Popup>
                <div className="text-xs text-slate-900 font-sans">
                  <strong>Storm Center:</strong> {stormCenter.locationDesc}
                </div>
              </Popup>
            </Marker>

            {/* Gale Wind Danger Zone (120 km radius) */}
            <Circle
              center={[stormCenter.lat, stormCenter.lon]}
              radius={120000}
              pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.15, weight: 1.5, dashArray: '4, 4' }}
            />

            {/* Squally Wind Zone (250 km radius) */}
            <Circle
              center={[stormCenter.lat, stormCenter.lon]}
              radius={250000}
              pathOptions={{ color: '#f59e0b', fillColor: '#f59e0b', fillOpacity: 0.08, weight: 1 }}
            />

            {/* Projected Track Line */}
            <Polyline
              positions={trackLine}
              pathOptions={{ color: '#ef4444', weight: 2.5, dashArray: '6, 6' }}
            />
          </MapContainer>

          {/* Floating Action Controls on Map */}
          <div className="absolute top-2.5 right-2.5 z-[400] flex flex-col gap-1.5">
            <button
              onClick={handleCenterOnUser}
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

          {/* Legend Overlay */}
          <div className="absolute bottom-2 left-2 z-[400] bg-slate-950/90 backdrop-blur-sm border border-slate-800 rounded-lg p-2 text-[10px] text-slate-300 space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block"></span>
              <span>Your Location ({userLocation.name})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
              <span>Storm Center & Track</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 border border-red-500 bg-red-500/20 inline-block"></span>
              <span>Gale Threat Radius (120 km)</span>
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
                onClick={() => setSatTimestamp(Date.now())}
                className="p-1 hover:bg-slate-800 rounded text-slate-300 ml-1"
                title="Reload Latest Satellite Feed"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Embedded Image Container */}
          <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900 flex flex-col items-center justify-center min-h-[320px] max-h-[460px]">
            <img
              src={satImages[satChannel].url}
              alt="IMD INSAT-3DR Live Satellite Feed"
              className="w-full h-auto max-h-[440px] object-contain rounded-lg"
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
