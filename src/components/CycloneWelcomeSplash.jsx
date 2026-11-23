import React, { useEffect, useState, useCallback } from 'react';
import { ArrowRight, ShieldCheck, Radio, Wifi, Volume2, Sparkles, Navigation, MapPin } from 'lucide-react';

const VERNACULAR_LIST = [
  { script: 'ତୁଫାନ ସାଥୀ', lang: 'odia', label: 'ଓଡ଼ିଆ', state: 'Odisha' },
  { script: 'तूफ़ान साथी', lang: 'hindi', label: 'हिन्दी', state: 'National' },
  { script: 'তুফান সাথী', lang: 'bengali', label: 'বাংলা', state: 'West Bengal' },
  { script: 'తుఫాను సాథీ', lang: 'telugu', label: 'తెలుగు', state: 'Andhra Pradesh' },
  { script: 'તોફાન સાથી', lang: 'gujarati', label: 'ગુજરાતી', state: 'Gujarat' },
  { script: 'தூபான் சாதி', lang: 'tamil', label: 'தமிழ்', state: 'Tamil Nadu' },
  { script: 'തൂഫാൻ സാഥി', lang: 'malayalam', label: 'മലയാളം', state: 'Kerala' }
];

export default function CycloneWelcomeSplash({ onEnter, activeLocation, selectedLang = 'english' }) {
  const [isExiting, setIsExiting] = useState(false);

  // Match state language from GPS/district or selected language
  const stateMatchIndex = VERNACULAR_LIST.findIndex(v => 
    v.state.toLowerCase() === activeLocation?.state?.toLowerCase() ||
    (activeLocation?.state === 'Telangana' && v.lang === 'telugu')
  );
  const langMatchIndex = VERNACULAR_LIST.findIndex(v => v.lang === selectedLang);

  const initialIndex = stateMatchIndex !== -1 ? stateMatchIndex : (langMatchIndex !== -1 ? langMatchIndex : 0);
  const [currentVernacularIndex, setCurrentVernacularIndex] = useState(initialIndex);

  // Dynamic language cycle across coastal states when on English, or lock to GPS/language
  useEffect(() => {
    if (selectedLang === 'english' && !activeLocation?.state) {
      const timer = setInterval(() => {
        setCurrentVernacularIndex(prev => (prev + 1) % VERNACULAR_LIST.length);
      }, 2500);
      return () => clearInterval(timer);
    } else if (stateMatchIndex !== -1) {
      setCurrentVernacularIndex(stateMatchIndex);
    } else if (langMatchIndex !== -1) {
      setCurrentVernacularIndex(langMatchIndex);
    }
  }, [selectedLang, stateMatchIndex, langMatchIndex, activeLocation?.state]);

  const activeVernacular = VERNACULAR_LIST[currentVernacularIndex] || VERNACULAR_LIST[0];

  const handleEnter = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 450);
  }, [isExiting, onEnter]);

  // Global keyboard listener for Enter key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleEnter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleEnter]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to ToofanSathi"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-3 sm:p-6 bg-[#070b14]/98 backdrop-blur-2xl transition-all duration-500 overflow-y-auto select-none ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient Atmospheric Cloud Glow in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[540px] h-[340px] sm:h-[540px] rounded-full bg-radial from-sky-600/20 via-sky-900/10 to-transparent blur-3xl animate-cloud-mist" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] sm:w-[360px] h-[220px] sm:h-[360px] rounded-full bg-radial from-red-600/15 via-transparent to-transparent blur-2xl animate-eyewall-glow" />
      </div>

      <div className="relative z-10 max-w-md w-full mx-auto flex flex-col items-center text-center py-4">
        {/* Cyclone Swirling Animated Vortex Centerpiece */}
        <div className="relative w-44 h-44 sm:w-56 sm:h-56 mb-5 sm:mb-6 flex items-center justify-center">
          {/* Layer 1: Outermost Translucent Feeder Rainbands (Slow Counter-Clockwise Swirl) */}
          <div className="absolute inset-0 rounded-full border border-sky-500/20 animate-cyclone-outer-clouds">
            <svg viewBox="0 0 200 200" className="w-full h-full opacity-40">
              <defs>
                <linearGradient id="feederGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#0284c7" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              {/* Outer Spiral Feeder Arms */}
              <path
                d="M 100 15 C 50 20, 15 65, 20 120 C 25 160, 65 190, 115 185"
                fill="none"
                stroke="url(#feederGrad)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="18 10"
              />
              <path
                d="M 100 185 C 150 180, 185 135, 180 80 C 175 40, 135 10, 85 15"
                fill="none"
                stroke="url(#feederGrad)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="18 10"
              />
            </svg>
          </div>

          {/* Layer 2: Intermediate Spiral Cloud Arms (Medium Swirl) */}
          <div className="absolute inset-2 sm:inset-3 rounded-full animate-cyclone-feeder">
            <svg viewBox="0 0 200 200" className="w-full h-full opacity-65">
              <defs>
                <linearGradient id="cloudArm1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="cloudArm2" x1="100%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              <path
                d="M 100 35 C 65 40, 35 70, 40 110 C 45 145, 75 165, 110 160 C 145 155, 165 125, 160 90"
                fill="none"
                stroke="url(#cloudArm1)"
                strokeWidth="10"
                strokeLinecap="round"
                className="filter drop-shadow(0 0 8px rgba(14,165,233,0.5))"
              />
              <path
                d="M 100 165 C 135 160, 165 130, 160 90 C 155 55, 125 35, 90 40 C 55 45, 35 75, 40 110"
                fill="none"
                stroke="url(#cloudArm2)"
                strokeWidth="8"
                strokeLinecap="round"
                className="filter drop-shadow(0 0 8px rgba(239,68,68,0.5))"
              />
            </svg>
          </div>

          {/* Layer 3: Eyewall Radar Pulse Expansion */}
          <div className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-sky-400/50 animate-isobar-ring pointer-events-none" />
          <div className="absolute w-20 h-20 sm:w-28 sm:h-28 rounded-full border border-amber-400/40 animate-isobar-ring [animation-delay:1.4s] pointer-events-none" />

          {/* Layer 4: High-Velocity Inner Eyewall Vortex (Fast Swirl) */}
          <div className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full animate-cyclone-fast filter drop-shadow(0 0 16px rgba(14,165,233,0.7))">
            <svg viewBox="0 0 120 120" className="w-full h-full">
              <circle
                cx="60"
                cy="60"
                r="46"
                fill="none"
                stroke="#0284c7"
                strokeWidth="3"
                strokeDasharray="14 8"
                opacity="0.8"
              />
              <path
                d="M 60 20 C 35 22, 20 45, 24 70 C 28 92, 50 102, 74 98"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d="M 60 100 C 85 98, 100 75, 96 50 C 92 28, 70 18, 46 22"
                fill="none"
                stroke="#ef4444"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Layer 5: Central ToofanSathi Cyclone Core Logo / Thumbnail (Continuous Cyclonic Spin) */}
          <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-900/90 border-2 border-sky-400/80 p-2 shadow-2xl shadow-sky-500/40 flex items-center justify-center animate-cyclone-core overflow-hidden">
            <img
              src="/pwa-512x512.png"
              alt="ToofanSathi Cyclone Radar Emblem"
              className="w-full h-full object-contain filter drop-shadow(0 0 8px rgba(56,189,248,0.8))"
              onError={(e) => {
                // Fallback to SVG if PNG is unavailable
                e.target.style.display = 'none';
                if (e.target.nextElementSibling) {
                  e.target.nextElementSibling.style.display = 'block';
                }
              }}
            />
            {/* Vector Fallback if image fails */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full hidden"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="42" stroke="#1e293b" strokeWidth="3" />
              <path
                d="M50 18 C35 18 20 32 20 50 C20 62 28 72 40 76 C36 68 34 58 36 50 C40 34 54 26 68 28 Z"
                fill="#38bdf8"
              />
              <path
                d="M50 82 C65 82 80 68 80 50 C80 38 72 28 60 24 C64 32 66 42 64 50 C60 66 46 74 32 72 Z"
                fill="#ef4444"
              />
              <circle cx="50" cy="50" r="10" fill="#fbbf24" />
              <circle cx="50" cy="50" r="4" fill="#ffffff" />
            </svg>

            {/* Calm Warm Eye Indicator in center */}
            <div className="absolute w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-amber-400 border-2 border-white shadow-lg shadow-amber-400 animate-ping pointer-events-none" />
            <div className="absolute w-2 h-2 rounded-full bg-white pointer-events-none" />
          </div>
        </div>

        {/* Portal Title & Vernacular Branding */}
        <div className="space-y-1 mb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-950/80 border border-sky-800/80 text-[11px] font-mono font-bold text-sky-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span>LIVE CYCLONE SHIELD • PWA 2.0</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center justify-center gap-2 flex-wrap">
            <span>ToofanSathi</span>
            <span
              key={activeVernacular.script}
              className="text-sky-400 font-extrabold text-sm sm:text-base px-2.5 py-0.5 rounded-lg bg-sky-500/10 border border-sky-400/30 transition-all duration-300"
            >
              {activeVernacular.script}
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-sm mx-auto">
            India's Live Cyclone Early Warning & Coastal Disaster Protection Portal
          </p>
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 flex-wrap pt-0.5">
            {activeLocation?.state ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-400" />
                <span>Detected: {activeLocation.name} ({activeVernacular.label})</span>
              </span>
            ) : (
              <span className="text-slate-300 font-semibold">{activeVernacular.label}</span>
            )}
            <span>•</span>
            <span>Bay of Bengal & Arabian Sea Consensus</span>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-sm mb-6 text-left">
          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col items-center text-center">
            <Radio className="w-4 h-4 text-sky-400 mb-1" />
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-200">IMD Radar</span>
            <span className="text-[9px] text-slate-400">Live Dead Reckoning</span>
          </div>

          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col items-center text-center">
            <Volume2 className="w-4 h-4 text-emerald-400 mb-1" />
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-200">Voice Alerts</span>
            <span className="text-[9px] text-slate-400">Field Audio Briefing</span>
          </div>

          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col items-center text-center">
            <Wifi className="w-4 h-4 text-amber-400 mb-1" />
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-200">100% Offline</span>
            <span className="text-[9px] text-slate-400">Disaster Resilient</span>
          </div>
        </div>

        {/* Interactive "Enter to Continue" Action */}
        <div className="w-full max-w-xs space-y-2.5">
          <button
            onClick={handleEnter}
            autoFocus
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-sky-500 via-sky-400 to-emerald-400 hover:from-sky-400 hover:to-emerald-300 text-slate-950 font-black text-sm sm:text-base tracking-wide shadow-xl shadow-sky-500/30 hover:shadow-sky-400/50 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 group cursor-pointer border border-white/20"
          >
            <span>Enter to Continue</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          {/* Quick Guidance Hint */}
          <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-slate-400 font-mono">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-bold text-[10px]">
              Enter ↵
            </kbd>
            <span>or tap button to start</span>
          </div>
        </div>

        {/* Multi-Agency Disaster Authority Credits */}
        <div className="mt-5 text-[9px] text-slate-400 leading-tight">
          <span>Data: IMD RSMC New Delhi • JTWC • INCOIS • Open-Meteo High-Res</span>
        </div>
      </div>
    </div>
  );
}
