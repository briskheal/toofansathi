import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Radio, Satellite, ExternalLink, Info, Crosshair, RefreshCw, Check } from 'lucide-react';

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

export default function CycloneMap({ userLocation, stormCenter, landfallArea, onRefreshLocation, isGpsActive }) {
  const [activeTab, setActiveTab] = useState('trajectory'); // 'trajectory' | 'radar' | 'satellite'
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

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
      {/* Top Header with Tab Switcher */}
      <div className="p-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 bg-slate-900/90">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-sky-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Bay of Bengal Track Radar
          </h3>
          {isGpsActive && (
            <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Live GPS Active
            </span>
          )}
        </div>

        {/* Tab Controls */}
        <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
          <button
            onClick={() => setActiveTab('trajectory')}
            className={`px-2 py-1 text-[11px] font-semibold rounded-md transition-colors ${
              activeTab === 'trajectory' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Track Vector
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
            onClick={() => setActiveTab('satellite')}
            className={`px-2 py-1 text-[11px] font-semibold rounded-md transition-colors ${
              activeTab === 'satellite' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            INSAT-3DR
          </button>
        </div>
      </div>

      {/* Main View Area */}
      {activeTab === 'trajectory' && (
        <div className="h-[290px] w-full relative z-0">
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

            {/* GPS Accuracy Circle if available */}
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

      {/* IMD Doppler Weather Radar View */}
      {activeTab === 'radar' && (
        <div className="p-3 bg-slate-950 flex flex-col items-center justify-center min-h-[290px]">
          <div className="w-full max-w-sm rounded-lg overflow-hidden border border-slate-800 bg-slate-900 text-center p-3">
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-400 mb-2">
              <Radio className="w-4 h-4" />
              <span>IMD Doppler Weather Radar (DWR) Coastal Network</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
              Station Radars actively scanning: <strong>Paradip, Gopalpur, Kolkata, Visakhapatnam</strong>.
            </p>
            <div className="rounded border border-slate-800 bg-slate-950 p-2.5 text-xs text-left text-slate-300 space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Paradip DWR:</span>
                <span className="text-emerald-400 font-mono font-bold">OPERATIONAL</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Gopalpur DWR:</span>
                <span className="text-emerald-400 font-mono font-bold">OPERATIONAL</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Kolkata (Subhasgram) DWR:</span>
                <span className="text-emerald-400 font-mono font-bold">OPERATIONAL</span>
              </div>
            </div>
            <a
              href="https://mausam.imd.gov.in/responsive/radarInformation.php"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded text-xs font-bold transition-colors"
            >
              <span>Open Live IMD Radar Viewer</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* INSAT-3DR Satellite View */}
      {activeTab === 'satellite' && (
        <div className="p-3 bg-slate-950 flex flex-col items-center justify-center min-h-[290px]">
          <div className="w-full max-w-sm rounded-lg overflow-hidden border border-slate-800 bg-slate-900 text-center p-3">
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-sky-400 mb-2">
              <Satellite className="w-4 h-4" />
              <span>INSAT-3DR / 3D Infrared Cloud Imagery</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
              Geostationary meteorological satellite monitoring deep convective cloud bands over the Bay of Bengal.
            </p>
            <a
              href="https://mausam.imd.gov.in/responsive/satellite.php"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded text-xs font-bold transition-colors"
            >
              <span>View INSAT-3DR Live Imagery</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* Prominent Courtesy / Attribution Bar */}
      <div className="p-2.5 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between gap-2 text-[10px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
          <span>
            <strong className="text-slate-300">Courtesy:</strong> India Meteorological Department (IMD) / RSMC New Delhi, Doppler Weather Radar Network & OpenStreetMap.
          </span>
        </div>
        <span className="font-mono text-slate-500 hidden sm:inline flex-shrink-0">IMD RSMC Feed</span>
      </div>
    </div>
  );
}
