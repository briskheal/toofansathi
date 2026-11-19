import React from 'react';
import { PhoneCall, X, ShieldAlert } from 'lucide-react';
import { EMERGENCY_NUMBERS } from '../data/districts';

export default function EmergencyDirectoryModal({ isOpen, onClose, currentDistrict }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md max-h-[85vh] overflow-y-auto p-4 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-950 text-red-400 rounded-lg border border-red-800">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Emergency Helplines</h3>
              <p className="text-[11px] text-slate-400">1-Tap direct phone calling (Works without internet)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Local District Control Room (DEOC) */}
        {currentDistrict && currentDistrict.deoc && (
          <div className="my-3 p-3 bg-red-950/40 border border-red-800/80 rounded-xl">
            <span className="text-[10px] uppercase font-bold text-red-400 block mb-0.5">
              District Emergency Operation Center (DEOC)
            </span>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-white">{currentDistrict.name} DEOC</span>
                <span className="text-xs text-slate-300 block font-mono">{currentDistrict.deoc}</span>
              </div>
              <a
                href={`tel:${currentDistrict.deoc.replace(/[^0-9]/g, '')}`}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        )}

        {/* National & State Helplines */}
        <div className="space-y-2 mt-3">
          {EMERGENCY_NUMBERS.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 bg-slate-800/70 border border-slate-700/60 rounded-xl"
            >
              <div>
                <span className="text-xs font-bold text-slate-200 block">{item.name}</span>
                <span className="text-[11px] text-slate-400 block">{item.desc}</span>
                <span className="text-xs font-mono font-bold text-sky-400">{item.number}</span>
              </div>
              <a
                href={`tel:${item.number}`}
                className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Dial</span>
              </a>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl"
        >
          Close
        </button>
      </div>
    </div>
  );
}
