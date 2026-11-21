import React from 'react';
import { Radio, Wifi, WifiOff, PhoneCall, Volume2, ShieldAlert, Tv } from 'lucide-react';

export default function Navbar({
  isOffline,
  lastUpdated,
  selectedLang,
  setSelectedLang,
  onOpenEmergency,
  onOpenSafety,
  onOpenLiveTv
}) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-3 py-2.5">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center">
            <Radio className="w-4 h-4 text-sky-400 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-slate-900"></span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-tight text-white">ToofanSathi</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-sky-950 text-sky-400 border border-sky-800">
                PWA
              </span>
            </div>
            <p className="text-[10px] text-slate-400 leading-none">
              {isOffline ? (
                <span className="text-amber-400 flex items-center gap-1">
                  <WifiOff className="w-2.5 h-2.5 inline" /> Offline mode (Cached)
                </span>
              ) : (
                <span className="text-emerald-400 flex items-center gap-1">
                  <Wifi className="w-2.5 h-2.5 inline" /> Live Sync • {lastUpdated || 'Just now'}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {/* Language Selector */}
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="text-xs bg-slate-800 text-slate-200 border border-slate-700 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-sky-500 font-medium cursor-pointer"
          >
            <option value="english">English</option>
            <option value="hindi">हिन्दी (Hindi)</option>
            <option value="odia">ଓଡ଼ିଆ (Odia)</option>
            <option value="bengali">বাংলা (Bengali)</option>
            <option value="gujarati">ગુજરાતી (Gujarati)</option>
            <option value="telugu">తెలుగు (Telugu)</option>
            <option value="tamil">தமிழ் (Tamil)</option>
            <option value="malayalam">മലയാളം (Malayalam)</option>
            <option value="kannada">ಕನ್ನಡ (Kannada)</option>
          </select>

          {/* Live TV News Button */}
          {onOpenLiveTv && (
            <button
              onClick={onOpenLiveTv}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 bg-rose-600/90 hover:bg-rose-600 text-white rounded-lg text-xs font-bold transition-all border border-rose-500/60 shadow-sm shadow-rose-950/40 relative"
              title="Watch Live Regional News TV & Emergency Broadcast"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping flex-shrink-0"></span>
              <Tv className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="hidden sm:inline">Live TV</span>
            </button>
          )}

          {/* Emergency SOS Button */}
          <button
            onClick={onOpenEmergency}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold shadow-sm shadow-red-900/50 transition-colors"
            title="Emergency Numbers"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Helplines</span>
          </button>

          {/* Safety Tips */}
          <button
            onClick={onOpenSafety}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors"
            title="Safety Guidelines"
          >
            <ShieldAlert className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>
    </header>
  );
}
