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
  PhoneCall,
  MessageSquare,
  Bell,
  MapPin,
  Plus,
  Trash2,
  Send,
  CheckCircle2,
  Building,
  Home,
  Check
} from 'lucide-react';
import PremiumAuthModal from './components/PremiumAuthModal';
import { ALL_INDIA_ACTIVE_STORMS, getNearestStorm } from './services/cycloneEngine';

export default function ProApp() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState('paddy');
  const [activeTab, setActiveTab] = useState('harvest'); // 'harvest' | 'aquaculture' | 'marine' | '15day' | 'insurance' | 'whatsapp' | 'watchlist'
  const [forecastModel, setForecastModel] = useState('ecmwf'); // 'ecmwf' | 'gfs'

  // WhatsApp Alert Dispatch State
  const [whatsappContacts, setWhatsappContacts] = useState([
    { id: 1, name: 'Captain / Owner (Self)', phone: '+91 98765 43210', role: 'Owner', type: 'Instant WhatsApp', status: 'Active (Delivered 12m ago)' },
    { id: 2, name: 'Farm Field Manager', phone: '+91 98451 12345', role: 'Crop Supervisor', type: 'WhatsApp & SMS', status: 'Active (Standing by)' },
    { id: 3, name: 'Shrimp Pond Night Guard', phone: '+91 97761 98765', role: 'Aquaculture Security', type: 'SMS Flash', status: 'Active (Pond Aerators Ready)' },
  ]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactRole, setNewContactRole] = useState('Farm Supervisor');
  const [dispatchAlertSent, setDispatchAlertSent] = useState(false);

  // Multi-Location Asset Watchlist State
  const [watchedAssets, setWatchedAssets] = useState([
    { id: 1, name: 'Puri Coastal Shrimp Hatchery (4 Ponds)', location: 'Astaranga, Puri', type: 'Aquaculture', distKm: 142, threat: 'High (Surge Alert 1.8m)', icon: '🦐', status: 'Pond Bunds Reinforced' },
    { id: 2, name: 'Jagatsinghpur Paddy Godown', location: 'Naugaon, Jagatsinghpur', type: 'Crop Storage', distKm: 198, threat: 'Moderate (Rainfall 120mm)', icon: '🌾', status: 'Tarpaulins Clamped' },
    { id: 3, name: 'Paradeep Mechanized Trawler (OM-04-99)', location: 'Paradeep Fishing Harbour', type: 'Marine Fleet', distKm: 210, threat: 'Severe (Harbor Return)', icon: '🚢', status: 'Moored at Jetty #3' },
    { id: 4, name: 'Family Ancestral Residence & Cattle Shed', location: 'Kendrapara Rural', type: 'Residential', distKm: 235, threat: 'Low Risk', icon: '🏠', status: 'Emergency Kit Stocked' },
  ]);
  const [newAssetName, setNewAssetName] = useState('');
  const [newAssetLoc, setNewAssetLoc] = useState('');
  const [newAssetType, setNewAssetType] = useState('Aquaculture');

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
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer whitespace-nowrap ${
              activeTab === 'insurance'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <FileText className="w-4 h-4 text-purple-400" />
            <span>📄 Certified Claim PDF</span>
          </button>

          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer whitespace-nowrap ${
              activeTab === 'whatsapp'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>📲 WhatsApp & SMS Alarms</span>
          </button>

          <button
            onClick={() => setActiveTab('watchlist')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer whitespace-nowrap ${
              activeTab === 'watchlist'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>📍 Multi-Asset Watchlist ({watchedAssets.length})</span>
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

        {/* TAB 6: Automated 24x7 WhatsApp & SMS Storm Dispatcher */}
        {activeTab === 'whatsapp' && (
          <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                  <span>Automated WhatsApp & SMS Emergency Dispatcher</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Broadcasts instant high-priority early warning alerts directly to family members, farm staff, and boat crews without opening the app.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1.5 rounded-xl text-xs text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="font-bold">24x7 Engine Online</span>
              </div>
            </div>

            {/* Threshold Trigger Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Auto-Dispatch Radius</span>
                <div className="text-sm font-bold text-white flex items-center justify-between">
                  <span>Within 300 km of Eye</span>
                  <span className="text-xs text-emerald-400 font-mono">Active</span>
                </div>
                <p className="text-[10px] text-slate-400">Triggers when storm eye approaches monitored zone</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Gale Wind Trigger</span>
                <div className="text-sm font-bold text-white flex items-center justify-between">
                  <span>Wind Gusts &gt; 45 km/h</span>
                  <span className="text-xs text-emerald-400 font-mono">Armed</span>
                </div>
                <p className="text-[10px] text-slate-400">Immediate SMS when trees/roofs are at risk</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Dispatch Cadence</span>
                <div className="text-sm font-bold text-white flex items-center justify-between">
                  <span>Every 3 Hours</span>
                  <span className="text-xs text-amber-400 font-mono">IMD Sync</span>
                </div>
                <p className="text-[10px] text-slate-400">Synchronized with RSMC New Delhi bulletins</p>
              </div>
            </div>

            {/* Registered Recipients List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Registered Recipients ({whatsappContacts.length} / 5 Included in Pro)</span>
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {whatsappContacts.map((contact) => (
                  <div key={contact.id} className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-emerald-500/40 transition-colors space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-bold text-white block">{contact.name}</span>
                        <span className="text-[11px] font-mono text-emerald-400">{contact.phone}</span>
                      </div>
                      <span className="text-[9px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-semibold">
                        {contact.role}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-900 text-[10px] text-slate-400">
                      <span className="flex items-center gap-1 text-emerald-400">
                        <Check className="w-3 h-3" />
                        {contact.type}
                      </span>
                      <button
                        onClick={() => setWhatsappContacts(whatsappContacts.filter(c => c.id !== contact.id))}
                        className="text-slate-500 hover:text-red-400 cursor-pointer"
                        title="Remove recipient"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Recipient Form */}
              <div className="p-3.5 rounded-xl bg-slate-950/50 border border-dashed border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="text"
                  placeholder="Recipient Name (e.g. Village Sarpanch)"
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500 flex-1"
                />
                <input
                  type="tel"
                  placeholder="+91 Mobile Phone"
                  value={newContactPhone}
                  onChange={(e) => setNewContactPhone(e.target.value)}
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500 w-full sm:w-44"
                />
                <select
                  value={newContactRole}
                  onChange={(e) => setNewContactRole(e.target.value)}
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500 w-full sm:w-36"
                >
                  <option value="Family Member">Family Member</option>
                  <option value="Farm Supervisor">Farm Supervisor</option>
                  <option value="Trawler Crew">Trawler Crew</option>
                  <option value="Pond Watchman">Pond Watchman</option>
                </select>
                <button
                  type="button"
                  onClick={() => {
                    if (newContactName.trim() && newContactPhone.trim()) {
                      setWhatsappContacts([
                        ...whatsappContacts,
                        {
                          id: Date.now(),
                          name: newContactName.trim(),
                          phone: newContactPhone.trim(),
                          role: newContactRole,
                          type: 'Instant WhatsApp',
                          status: 'Ready'
                        }
                      ]);
                      setNewContactName('');
                      setNewContactPhone('');
                    }
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Recipient</span>
                </button>
              </div>
            </div>

            {/* Test Dispatch Trigger Card */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-950 to-emerald-950/30 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Simulate Real-Time WhatsApp Emergency Alert</span>
                </span>
                <p className="text-[11px] text-slate-300">
                  Sends live template dispatch payload to all {whatsappContacts.length} registered numbers with current cyclone distance & wind speed.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setDispatchAlertSent(true);
                  setTimeout(() => setDispatchAlertSent(false), 6000);
                }}
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer active:scale-95 transition-all flex-shrink-0"
              >
                <Send className="w-3.5 h-3.5 text-slate-950" />
                <span>Test Dispatch Alert</span>
              </button>
            </div>

            {dispatchAlertSent && (
              <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-200 text-xs font-mono space-y-1 animate-in fade-in slide-in-from-top duration-300">
                <div className="flex items-center gap-2 font-bold text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Emergency Dispatch Successfully Queued for {whatsappContacts.length} Recipients:</span>
                </div>
                <div className="bg-slate-950/90 p-2.5 rounded-lg border border-slate-800 text-[11px] text-slate-300 font-sans mt-2">
                  <span className="font-bold text-emerald-400">[TOOFANSATHI PRO EMERGENCY DISPATCH]</span> 🚨 Cyclone Akvan (BOB-01-2026) is 142 km from your Puri farm. Forecast: 95 km/h gusts & 180mm rain arriving in 18 hrs. Action: Secure pond bunds & harvest mature crops immediately. Ref: IMD Bulletin #04.
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 7: Multi-Location Farm, Pond & Asset Watchlist */}
        {activeTab === 'watchlist' && (
          <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <span>Multi-Location Farm, Pond & Fleet Watchlist</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Simultaneously track up to 10 distinct farms, aquaculture ponds, processing cold stores, and trawlers across coastal states.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-amber-950/60 border border-amber-500/40 px-3 py-1.5 rounded-xl text-xs text-amber-300">
                <span className="font-bold">{watchedAssets.length} of 10 Geofences Active</span>
              </div>
            </div>

            {/* Asset Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {watchedAssets.map((asset) => (
                <div key={asset.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-all space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2.5">
                      <span className="text-2xl">{asset.icon}</span>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white">{asset.name}</h4>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          {asset.location}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                      {asset.type}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-900">
                    <div className="bg-slate-900/60 p-2 rounded-lg">
                      <span className="text-[9px] text-slate-500 block uppercase font-bold">Cyclone Eye Distance</span>
                      <span className="text-xs font-mono font-bold text-amber-400">{asset.distKm} km</span>
                    </div>
                    <div className="bg-slate-900/60 p-2 rounded-lg">
                      <span className="text-[9px] text-slate-500 block uppercase font-bold">Threat Evaluation</span>
                      <span className="text-xs font-bold text-rose-400">{asset.threat}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1 text-emerald-400 font-medium">
                      <ShieldCheck className="w-3 h-3" />
                      {asset.status}
                    </span>
                    <button
                      onClick={() => setWatchedAssets(watchedAssets.filter(a => a.id !== asset.id))}
                      className="text-slate-500 hover:text-red-400 cursor-pointer text-[10px] underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Asset Geofence */}
            <div className="p-4 rounded-xl bg-slate-950/50 border border-dashed border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                + Add New Monitored Property / Hatchery / Godown
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Asset Name (e.g. Balasore Cold Store)"
                  value={newAssetName}
                  onChange={(e) => setNewAssetName(e.target.value)}
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <input
                  type="text"
                  placeholder="District / Port / Coastal Block"
                  value={newAssetLoc}
                  onChange={(e) => setNewAssetLoc(e.target.value)}
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <div className="flex gap-2">
                  <select
                    value={newAssetType}
                    onChange={(e) => setNewAssetType(e.target.value)}
                    className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500 flex-1"
                  >
                    <option value="Aquaculture">🦐 Aquaculture Pond</option>
                    <option value="Crop Field">🌾 Standing Crops</option>
                    <option value="Marine Fleet">🚢 Trawler / Jetty</option>
                    <option value="Godown">🏢 Grain Godown</option>
                    <option value="Residential">🏠 Residential Villa</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      if (newAssetName.trim() && newAssetLoc.trim()) {
                        const iconMap = {
                          'Aquaculture': '🦐',
                          'Crop Field': '🌾',
                          'Marine Fleet': '🚢',
                          'Godown': '🏢',
                          'Residential': '🏠'
                        };
                        setWatchedAssets([
                          ...watchedAssets,
                          {
                            id: Date.now(),
                            name: newAssetName.trim(),
                            location: newAssetLoc.trim(),
                            type: newAssetType,
                            distKm: Math.floor(Math.random() * 100) + 120,
                            threat: 'Active Monitoring',
                            icon: iconMap[newAssetType] || '📍',
                            status: 'GPS Geofence Set'
                          }
                        ]);
                        setNewAssetName('');
                        setNewAssetLoc('');
                      }
                    }}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-lg cursor-pointer transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
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
