import React from 'react';
import { AlertTriangle, ShieldCheck, Siren, SunDim } from 'lucide-react';

export default function ThreatBanner({ threat, districtName }) {
  const isDanger = threat.level === 'RED' || threat.level === 'ORANGE';
  const isNormal = threat.isNormalDay || threat.level === 'GREEN';

  return (
    <section className={`rounded-xl p-4 sm:p-5 shadow-lg border transition-all ${
      threat.level === 'RED'
        ? 'bg-gradient-to-br from-red-950/90 via-red-900/60 to-slate-900 border-red-600/60 shadow-red-950/50'
        : threat.level === 'ORANGE'
        ? 'bg-gradient-to-br from-amber-950/90 via-amber-900/60 to-slate-900 border-amber-600/60 shadow-amber-950/50'
        : threat.level === 'YELLOW'
        ? 'bg-gradient-to-br from-yellow-950/90 via-yellow-900/40 to-slate-900 border-yellow-600/50 shadow-yellow-950/40'
        : 'bg-gradient-to-br from-emerald-950/90 via-slate-900 to-teal-950/60 border-emerald-500/50 shadow-emerald-950/40'
    }`}>
      <div className="flex items-start gap-3.5">
        <div className={`p-2.5 rounded-xl flex-shrink-0 ${
          threat.level === 'RED'
            ? 'bg-red-500 text-white animate-pulse'
            : threat.level === 'ORANGE'
            ? 'bg-amber-500 text-slate-950'
            : threat.level === 'YELLOW'
            ? 'bg-yellow-400 text-slate-950'
            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
        }`}>
          {isDanger ? <Siren className="w-6 h-6" /> : isNormal ? <ShieldCheck className="w-6 h-6 text-emerald-400" /> : <SunDim className="w-6 h-6 text-yellow-400" />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
              isNormal ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : threat.badge
            }`}>
              {isNormal ? '🟢 ALL-CLEAR • PEACETIME ROUTINE' : `IMD ${threat.level} Warning`}
            </span>
            <span className="text-xs text-slate-400">Target Area: <strong className="text-slate-200">{districtName}</strong></span>
          </div>

          <h1 className="text-lg sm:text-xl font-black tracking-tight text-white leading-tight">
            {threat.summary}
          </h1>

          <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
            {threat.action}
          </p>
        </div>
      </div>
    </section>
  );
}
