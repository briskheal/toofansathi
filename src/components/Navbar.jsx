import React from 'react';
import { Radio, Wifi, WifiOff, PhoneCall, ShieldAlert, Tv } from 'lucide-react';
import { getTranslation } from '../data/translations';

export default function Navbar({
  isOffline,
  lastUpdated,
  selectedLang,
  setSelectedLang,
  onOpenEmergency,
  onOpenSafety,
  onOpenLiveTv,
  onOpenWelcome
}) {
  const t = getTranslation(selectedLang);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 w-full overflow-x-clip">
      {/* Container aligned with main content blocks (max-w-4xl with px-3 sm:px-5) */}
      <div className="max-w-4xl w-full mx-auto px-3 sm:px-5 py-2 sm:py-2.5">
        <div className="flex items-center justify-between gap-1.5 sm:gap-2">
          {/* Brand Logo & Title with Replay Welcome Swirl trigger */}
          <div
            onClick={onOpenWelcome}
            className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-shrink cursor-pointer group"
            title="Click to view Cyclone Swirling Welcome & Overview"
          >
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:border-sky-400">
              <Radio className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 animate-pulse group-hover:text-emerald-300" />
              <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500 ring-2 ring-slate-900"></span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white group-hover:text-sky-300 transition-colors truncate">
                  {t.appTitle}
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono px-1 py-0.2 rounded bg-sky-950 text-sky-400 border border-sky-800 flex-shrink-0 font-bold">
                  {t.appBadge}
                </span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-slate-400 leading-none truncate">
                {isOffline ? (
                  <span className="text-amber-400 flex items-center gap-1">
                    <WifiOff className="w-2.5 h-2.5 inline flex-shrink-0" />
                    <span>{t.offline}</span>
                  </span>
                ) : (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Wifi className="w-2.5 h-2.5 inline flex-shrink-0" />
                    <span>{t.syncLive} • {lastUpdated || 'Live'}</span>
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Action Controls (Responsive & boundary-safe on mobile) */}
          <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
            {/* Language Selector */}
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="text-[11px] sm:text-xs bg-slate-800 text-slate-200 border border-slate-700 rounded-lg px-1.5 sm:px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-sky-500 font-semibold cursor-pointer max-w-[85px] xs:max-w-[105px] sm:max-w-none truncate"
              title="Select Language"
            >
              <option value="english">English</option>
              <option value="odia">ଓଡ଼ିଆ (Odia)</option>
              <option value="hindi">हिन्दी (Hindi)</option>
              <option value="bengali">বাংলা (Bengali)</option>
              <option value="telugu">తెలుగు (Telugu)</option>
              <option value="gujarati">ગુજરાતી (Gujarati)</option>
              <option value="tamil">தமிழ் (Tamil)</option>
              <option value="malayalam">മലയാളം (Malayalam)</option>
              <option value="kannada">ಕನ್ನಡ (Kannada)</option>
            </select>

            {/* Live TV News Button */}
            {onOpenLiveTv && (
              <button
                onClick={onOpenLiveTv}
                className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 bg-rose-600/90 hover:bg-rose-600 text-white rounded-lg text-xs font-bold transition-all border border-rose-500/60 shadow-sm shadow-rose-950/40 relative flex-shrink-0"
                title="Watch Live Regional News TV & Emergency Broadcast"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping flex-shrink-0"></span>
                <Tv className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="hidden sm:inline">{t.liveTv}</span>
              </button>
            )}

            {/* Emergency SOS Button */}
            <button
              onClick={onOpenEmergency}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold shadow-sm shadow-red-900/50 transition-colors flex-shrink-0"
              title="Emergency Helpline Numbers"
            >
              <PhoneCall className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="hidden sm:inline">{t.helplines}</span>
            </button>

            {/* Safety Tips (Hidden on ultra-narrow mobile since it's already in BottomNav) */}
            <button
              onClick={onOpenSafety}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors flex-shrink-0 hidden xs:flex items-center justify-center"
              title="Safety Guidelines"
            >
              <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
