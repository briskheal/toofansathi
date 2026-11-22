import React, { useState, useEffect } from 'react';
import {
  Crown,
  Sparkles,
  Wheat,
  Waves,
  Ship,
  Calendar,
  FileText,
  ShieldCheck,
  ArrowLeft,
  Lock,
  CheckCircle,
  AlertTriangle,
  Download,
  Share2,
  RefreshCw,
  Clock,
  Compass,
  Wind,
  Droplets,
  Layers,
  Thermometer,
  Zap,
  PhoneCall
} from 'lucide-react';
import PremiumAuthModal from './components/PremiumAuthModal';
import { ALL_INDIA_ACTIVE_STORMS, getNearestStorm } from './services/cycloneEngine';

export default function ProApp() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState('paddy');
  const [activeTab, setActiveTab] = useState('harvest'); // 'harvest' | 'aquaculture' | 'marine' | '15day' | 'insurance'
  const [forecastModel, setForecastModel] = useState('ecmwf'); // 'ecmwf' | 'gfs'

  // Load existing pro user from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('toofansathi_pro_user');
      if (saved) {
        setCurrentUser(JSON.parse(saved));
      } else {
        // Auto-open registration modal for test demonstration
        setIsAuthModalOpen(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('toofansathi_pro_user');
    setCurrentUser(null);
  };

  const activeStorm = ALL_INDIA_ACTIVE_STORMS[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Testing Sandbox Navigation & Route Switcher Bar */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border-b border-amber-500/40 px-3 sm:px-6 py-2 text-xs flex flex-wrap items-center justify-between gap-2 shadow-lg">
        <div className="flex items-center gap-2">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (window.location.hash.includes('pro')) {
                window.location.hash = '';
              }
              window.history.pushState({}, '', '/');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="flex items-center gap-1 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-2.5 py-1 rounded-lg transition-colors font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Live Public Portal</span>
          </a>
          <span className="text-amber-500 font-mono font-bold flex items-center gap-1.5 pl-2 border-l border-slate-700">
            <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
            <span>TOOFANSATHI PRO • TESTING SANDBOX (/pro)</span>
          </span>
        </div>

        {/* User Auth Status Pill */}
        <div className="flex items-center gap-2">
          {currentUser ? (
            <div className="flex items-center gap-2 bg-slate-900/90 border border-amber-500/50 px-2.5 py-1 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-[11px] font-bold text-amber-300">
                👑 {currentUser.name} ({currentUser.state})
              </span>
              <button
                onClick={handleLogout}
                className="text-[10px] text-slate-400 hover:text-red-400 ml-1 underline cursor-pointer"
              >
                Log Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black rounded-lg text-xs shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <Crown className="w-3.5 h-3.5 fill-slate-950" />
              <span>Log In / Register (OTP)</span>
            </button>
          )}
        </div>
      </div>

      {/* Hero Header */}
      <header className="bg-slate-900/90 border-b border-slate-800/80 py-4 px-3 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[10px] font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                COMMERCIAL & AGRI-ENTERPRISE SUITE
              </span>
              <span className="px-2 py-0.5 rounded-full bg-sky-950 text-sky-400 border border-sky-800 text-[10px] font-mono font-bold">
                ECMWF 9km High-Res
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>ToofanSathi Pro</span>
              <span className="text-amber-400 font-serif italic text-base">Elite</span>
            </h1>
            <p className="text-xs text-slate-400 max-w-xl">
              15-Day Ultra-Granular Hourly Forecasts, Automated WhatsApp Storm Alarms, Shrimp Pond Surge Defense, and Crop Harvest Advisors.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 p-2 rounded-xl text-xs">
            <div className="pr-3 border-r border-slate-800 text-left">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Tracked Storm</span>
              <span className="text-xs font-bold text-amber-400 truncate max-w-[130px] block">
                {activeStorm.cycloneCode || 'AKVAN'}
              </span>
            </div>
            <div className="pl-1 text-left">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Model Refresh</span>
              <span className="text-xs font-bold text-emerald-400 font-mono">4x Daily (1-hr)</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Suite Dashboard */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-3 sm:p-6 space-y-5">
        {/* Pro Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800 scrollbar-none">
          <button
            onClick={() => setActiveTab('harvest')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer ${
              activeTab === 'harvest'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Wheat className="w-4 h-4 text-amber-400" />
            <span>🌾 Crop Harvest Advisor</span>
          </button>

          <button
            onClick={() => setActiveTab('aquaculture')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer ${
              activeTab === 'aquaculture'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Waves className="w-4 h-4 text-cyan-400" />
            <span>🦐 Aquaculture Pond Surge</span>
          </button>

          <button
            onClick={() => setActiveTab('marine')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer ${
              activeTab === 'marine'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50 shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Ship className="w-4 h-4 text-blue-400" />
            <span>🚢 Marine Fleet Departure</span>
          </button>

          <button
            onClick={() => setActiveTab('15day')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer ${
              activeTab === '15day'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>⏱️ 15-Day Hourly Outlook</span>
          </button>

          <button
            onClick={() => setActiveTab('insurance')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer ${
              activeTab === 'insurance'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <FileText className="w-4 h-4 text-purple-400" />
            <span>📄 Certified Claim PDF</span>
          </button>
        </div>

        {/* TAB 1: Agri-Crop Harvest & Spray Window Advisor */}
        {activeTab === 'harvest' && (
          <div className="space-y-4">
            <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Wheat className="w-5 h-5 text-amber-400" />
                    <span>48-Hour Pre-Cyclone Harvest Safety Advisor</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Calculates whether you should harvest standing crops today or wait, preventing rain lodging loss
                  </p>
                </div>

                {/* Crop Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-semibold">Select Crop:</span>
                  <select
                    value={selectedCrop}
                    onChange={(e) => setSelectedCrop(e.target.value)}
                    className="px-3 py-1.5 bg-slate-950 border border-amber-500/40 rounded-xl text-xs font-bold text-amber-300 focus:outline-none"
                  >
                    <option value="paddy">Paddy / Rice (Mature Grain)</option>
                    <option value="mustard">Mustard / Oilseeds (Pod Stage)</option>
                    <option value="groundnut">Groundnut (Kharif/Rabi)</option>
                    <option value="vegetables">Coastal Vegetables (Chilli/Brinjal)</option>
                  </select>
                </div>
              </div>

              {/* Status Alert Banner */}
              <div className="my-4 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300">
                  <h4 className="font-bold text-emerald-300 text-sm">
                    🟢 Prime 36-Hour Harvest Window Open (Action Recommended)
                  </h4>
                  <p className="mt-1 leading-relaxed">
                    Heavy cyclonic precipitation (55–80 mm) is forecast to arrive in 38 hours. Grain moisture is currently at 18%. <strong>Mobilize harvesters and threshers immediately today</strong> to clear mature fields and shift bags to raised concrete godowns.
                  </p>
                </div>
              </div>

              {/* 3 Parameter Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                    Wind Lodging Threat
                  </span>
                  <span className="text-lg font-black text-amber-400 block">Moderate (42 km/h)</span>
                  <span className="text-[11px] text-slate-400">
                    Tall paddy stalks vulnerable to bend after 48 hrs
                  </span>
                </div>

                <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                    Pesticide Spray Fastness
                  </span>
                  <span className="text-lg font-black text-red-400 block">❌ Spraying Blocked</span>
                  <span className="text-[11px] text-slate-400">
                    High rain probability will wash away chemical coats
                  </span>
                </div>

                <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                    Soil Moisture Saturation
                  </span>
                  <span className="text-lg font-black text-sky-400 block">62% (Good Grip)</span>
                  <span className="text-[11px] text-slate-400">
                    Combine harvesters can operate without bogging
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Aquaculture & Coastal Shrimp/Fish Pond Surge Alarm */}
        {activeTab === 'aquaculture' && (
          <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
            <div className="pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Waves className="w-5 h-5 text-cyan-400" />
                <span>Coastal Shrimp & Fish Pond Tidal Surge Defense System</span>
              </h3>
              <p className="text-xs text-slate-400">
                Tidal height prediction, bund overflow defense, and salinity drop mitigation for coastal aquaculture
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300">
                <h4 className="font-bold text-amber-300 text-sm">
                  ⚠️ High Spring Tide Warning (Astronomical Surge: +1.8m Expected)
                </h4>
                <p className="mt-1 leading-relaxed">
                  High tide coupled with strong onshore southerly winds will peak between 03:00 PM and 06:30 PM. Low-lying bunds below 2.5m elevation risk overtopping and shrimp escape.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                  Pond Salinity Stress
                </span>
                <span className="text-lg font-black text-cyan-300 block">18 ppt → 9 ppt</span>
                <span className="text-[11px] text-slate-400">
                  Anticipated 50% drop from 90mm cyclonic rain
                </span>
              </div>

              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                  Bund Freeboard Status
                </span>
                <span className="text-lg font-black text-rose-400 block">0.4m Buffer (Critical)</span>
                <span className="text-[11px] text-slate-400">
                  Deploy sandbags along creek-facing perimeter
                </span>
              </div>

              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                  Dissolved Oxygen Forecast
                </span>
                <span className="text-lg font-black text-amber-400 block">4.2 mg/L (Falling)</span>
                <span className="text-[11px] text-slate-400">
                  Keep backup diesel generators ready for aerators
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Coastal Marine & Fishing Departure Planner */}
        {activeTab === 'marine' && (
          <div className="bg-slate-900/90 border border-blue-500/30 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
            <div className="pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Ship className="w-5 h-5 text-blue-400" />
                <span>Marine Trawler & Vessel Departure Safety Calculator</span>
              </h3>
              <p className="text-xs text-slate-400">
                Ocean wave swell, wave period, and automated return-to-harbor countdown for mechanized boats
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300">
                <h4 className="font-bold text-red-300 text-sm">
                  ⛔ INCOIS Sea Warning: Do Not Venture Beyond 5 Nautical Miles
                </h4>
                <p className="mt-1 leading-relaxed">
                  Rough to very rough sea conditions with wave heights peaking between 2.8m and 3.4m and swell period of 9.2 seconds. Mechanized fishing boats must anchor at Paradip / Dhamra / Gopalpur jetties.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Significant Wave</span>
                <span className="text-lg font-black text-blue-400 font-mono">2.9 Meters</span>
              </div>
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Swell Period</span>
                <span className="text-lg font-black text-sky-400 font-mono">9.2 Seconds</span>
              </div>
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Sea Surface Current</span>
                <span className="text-lg font-black text-amber-400 font-mono">1.8 Knots (NE)</span>
              </div>
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Safe Harbor Window</span>
                <span className="text-lg font-black text-rose-400 font-mono">Return in 4h</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: 15-Day Ultra-Granular Hourly Outlook */}
        {activeTab === '15day' && (
          <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-400" />
                  <span>15-Day Extended Weather Outlook with 1-Hour Granularity</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Ensemble models comparing ECMWF 9km IFS with GFS 13km for long-range logistics
                </p>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setForecastModel('ecmwf')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    forecastModel === 'ecmwf'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ECMWF (Europe)
                </button>
                <button
                  onClick={() => setForecastModel('gfs')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    forecastModel === 'gfs'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  GFS (NOAA USA)
                </button>
              </div>
            </div>

            {/* 15-Day Timeline Scroller Preview */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 block">Next 7 Days Day-by-Day Forecast:</span>
              <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
                {[
                  { day: 'Sun 22 Nov', temp: '29°C / 21°C', rain: '0.4 mm', wind: '22 km/h', status: 'Partly Cloudy' },
                  { day: 'Mon 23 Nov', temp: '28°C / 20°C', rain: '2.8 mm', wind: '28 km/h', status: 'Passing Showers' },
                  { day: 'Tue 24 Nov', temp: '27°C / 19°C', rain: '14.2 mm', wind: '38 km/h', status: 'Moderate Rain' },
                  { day: 'Wed 25 Nov', temp: '26°C / 19°C', rain: '48.0 mm', wind: '55 km/h', status: 'Heavy Squall' },
                  { day: 'Thu 26 Nov', temp: '25°C / 18°C', rain: '22.0 mm', wind: '42 km/h', status: 'Windy Drizzle' },
                  { day: 'Fri 27 Nov', temp: '27°C / 19°C', rain: '1.2 mm', wind: '24 km/h', status: 'Overcast' },
                  { day: 'Sat 28 Nov', temp: '29°C / 20°C', rain: '0.0 mm', wind: '18 km/h', status: 'Sunny / Safe' }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      idx === 3
                        ? 'bg-red-950/40 border-red-500/50'
                        : idx === 2 || idx === 4
                        ? 'bg-amber-950/30 border-amber-500/40'
                        : 'bg-slate-950/70 border-slate-800'
                    }`}
                  >
                    <span className="text-[11px] font-bold text-white block truncate">{item.day}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{item.temp}</span>
                    <span className="text-xs font-mono font-black text-sky-400 block mt-1">{item.rain}</span>
                    <span className="text-[10px] text-amber-300 block">{item.wind}</span>
                    <span className="text-[9px] text-slate-400 block truncate mt-1">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Certified PMFBY Insurance Weather Claim PDF Generator */}
        {activeTab === 'insurance' && (
          <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
            <div className="pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" />
                <span>1-Click Certified Weather Risk & Insurance Loss Certificate</span>
              </h3>
              <p className="text-xs text-slate-400">
                Official printable weather certificate citing exact GPS coordinates, recorded peak winds, and IMD RSMC bulletin reference
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs text-slate-300">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-white">CERTIFICATE REFERENCE:</span>
                <span className="text-amber-400">TS-PMFBY-2026-OD-8941</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>Applicant: <strong className="text-white">{currentUser?.name || 'Verified Member'}</strong></div>
                <div>State: <strong className="text-white">{currentUser?.state || 'Odisha'}</strong></div>
                <div>Coordinates: <strong className="text-white">19.8135° N, 85.8312° E (Puri Coastal)</strong></div>
                <div>Event Name: <strong className="text-white">Severe Cyclone Akvan (BOB/01/2026)</strong></div>
                <div>Max Wind Recorded: <strong className="text-rose-400">118 km/h (Gale Force)</strong></div>
                <div>Rainfall Total (24h): <strong className="text-sky-400">184.6 mm (Extremely Heavy)</strong></div>
              </div>
              <p className="text-[10px] text-slate-400 pt-2 border-t border-slate-800">
                Certified valid for submission to Agricultural Insurance Company of India (AICIL), HDFC ERGO Agri, and District Agriculture Office under Pradhan Mantri Fasal Bima Yojana guidelines.
              </p>
            </div>

            <button
              onClick={() => alert('Downloaded Certified Disaster Weather Certificate (PDF).')}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Signed Claim Certificate (PDF)</span>
            </button>
          </div>
        )}
      </main>

      {/* Pro Registration / Login Modal */}
      <PremiumAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
        }}
        initialUser={currentUser}
      />
    </div>
  );
}
