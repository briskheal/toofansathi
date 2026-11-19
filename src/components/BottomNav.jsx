import React from 'react';
import { Siren, Map, Clock, PhoneCall, ShieldAlert } from 'lucide-react';

export default function BottomNav({ activeSection, onSelectSection, onOpenEmergency, onOpenSafety }) {
  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/80 px-2 py-1.5 shadow-2xl safe-area-pb">
      <div className="flex items-center justify-around">
        {/* Tab 1: Alert & Threat */}
        <button
          onClick={() => onSelectSection('alert')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeSection === 'alert'
              ? 'text-sky-400 font-bold bg-sky-950/50'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Siren className={`w-5 h-5 ${activeSection === 'alert' ? 'animate-pulse text-sky-400' : ''}`} />
          <span className="text-[10px] mt-0.5">Alert</span>
        </button>

        {/* Tab 2: Radar & Track */}
        <button
          onClick={() => onSelectSection('radar')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeSection === 'radar'
              ? 'text-sky-400 font-bold bg-sky-950/50'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Map className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Radar Map</span>
        </button>

        {/* Tab 3: Hourly Forecast */}
        <button
          onClick={() => onSelectSection('forecast')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeSection === 'forecast'
              ? 'text-sky-400 font-bold bg-sky-950/50'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Clock className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Forecast</span>
        </button>

        {/* Tab 4: Emergency Helplines (Instant Trigger) */}
        <button
          onClick={onOpenEmergency}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-red-400 hover:text-red-300 font-bold transition-all"
        >
          <div className="relative">
            <PhoneCall className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
          </div>
          <span className="text-[10px] mt-0.5">Helplines</span>
        </button>

        {/* Tab 5: Safety Tips */}
        <button
          onClick={onOpenSafety}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-amber-400 hover:text-amber-300 transition-all"
        >
          <ShieldAlert className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Safety</span>
        </button>
      </div>
    </nav>
  );
}
