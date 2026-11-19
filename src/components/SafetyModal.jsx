import React from 'react';
import { ShieldAlert, X, CheckCircle2 } from 'lucide-react';
import { SAFETY_TIPS } from '../data/districts';

export default function SafetyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md max-h-[85vh] overflow-y-auto p-4 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-950 text-amber-400 rounded-lg border border-amber-800">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Field Safety & Survival Protocol</h3>
              <p className="text-[11px] text-slate-400">Essential rules during Cyclones & Gale Depressions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2.5 my-3">
          {SAFETY_TIPS.map((tip) => (
            <div key={tip.id} className="p-3 bg-slate-800/60 border border-slate-700/60 rounded-xl">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-100">{tip.title}</h4>
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-2 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl"
        >
          Got It, Stay Safe
        </button>
      </div>
    </div>
  );
}
