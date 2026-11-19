import React, { useState, useMemo } from 'react';
import { X, Search, MapPin, Locate, Check, ShieldAlert, Sparkles } from 'lucide-react';
import { ALL_INDIA_REGIONS } from '../data/districts';

const FILTER_REGIONS = [
  { id: 'all', label: 'All India' },
  { id: 'odisha', label: 'Odisha', state: 'Odisha' },
  { id: 'wb', label: 'West Bengal', state: 'West Bengal' },
  { id: 'andhra', label: 'Andhra', state: 'Andhra Pradesh' },
  { id: 'gujarat', label: 'Gujarat', state: 'Gujarat' },
  { id: 'south', label: 'South Coast', states: ['Maharashtra', 'Goa', 'Karnataka', 'Kerala', 'Tamil Nadu', 'Puducherry'] },
  { id: 'inland', label: 'Inland Belts', states: ['Jharkhand', 'Chhattisgarh', 'Telangana', 'Bihar', 'Madhya Pradesh', 'Delhi NCR'] }
];

export default function DistrictPickerModal({
  isOpen,
  onClose,
  selectedDistrictId,
  isGpsActive,
  gpsLocationName,
  onSelectDistrict,
  onUseGps
}) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredDistricts = useMemo(() => {
    return ALL_INDIA_REGIONS.filter((district) => {
      // Filter by category tab
      if (activeFilter !== 'all') {
        const cat = FILTER_REGIONS.find((f) => f.id === activeFilter);
        if (cat?.state && district.state !== cat.state) return false;
        if (cat?.states && !cat.states.includes(district.state)) return false;
      }

      // Filter by search query
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = district.name.toLowerCase().includes(q);
        const matchesState = district.state.toLowerCase().includes(q);
        const matchesBasin = district.basin.toLowerCase().includes(q);
        return matchesName || matchesState || matchesBasin;
      }

      return true;
    });
  }, [search, activeFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-slate-900 border-t sm:border border-slate-800 rounded-t-2xl sm:rounded-2xl w-full max-w-lg max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-200">
        
        {/* Header */}
        <div className="p-3.5 sm:p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-400/30">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Select Field Area / District
              </h3>
              <p className="text-[11px] text-slate-400">
                Choose coastal zone, inland depression area, or live GPS
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live GPS Quick Button */}
        <div className="p-3 bg-slate-950/50 border-b border-slate-800">
          <button
            onClick={() => {
              onUseGps();
              onClose();
            }}
            className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold transition-all ${
              isGpsActive
                ? 'bg-sky-950/80 border-sky-500 text-sky-200 shadow-sm ring-1 ring-sky-500/40'
                : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400">
                <Locate className="w-4 h-4 animate-pulse" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Use My Live GPS Location</span>
                  <span className="text-[10px] bg-emerald-900/60 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-600/40">
                    Auto-Detect
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-normal">
                  {isGpsActive && gpsLocationName ? gpsLocationName : 'Picks nearest district and coordinates'}
                </div>
              </div>
            </div>
            {isGpsActive && <Check className="w-4 h-4 text-sky-400" />}
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="p-3 bg-slate-900 border-b border-slate-800 space-y-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search district, city (e.g. Kolkata, Puri, Digha)..."
              className="w-full bg-slate-800/90 text-slate-100 text-xs rounded-xl pl-9 pr-8 py-2 border border-slate-700 focus:outline-none focus:border-sky-500 placeholder-slate-500"
              autoFocus
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
            {FILTER_REGIONS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors border ${
                  activeFilter === tab.id
                    ? 'bg-sky-600 text-white border-sky-400'
                    : 'bg-slate-800 text-slate-400 border-slate-700/80 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* District List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 divide-y divide-slate-800/50">
          {filteredDistricts.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs">
              No matching districts found for "{search}".
            </div>
          ) : (
            filteredDistricts.map((d) => {
              const isSelected = !isGpsActive && selectedDistrictId === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => {
                    onSelectDistrict(d.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-colors ${
                    isSelected
                      ? 'bg-sky-950/60 border border-sky-500/50 text-white'
                      : 'hover:bg-slate-800/70 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`p-1.5 rounded-lg flex-shrink-0 ${
                      d.highRisk ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-800 text-slate-400'
                    }`}>
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-slate-100 flex items-center gap-1.5 flex-wrap">
                        <span className="truncate">{d.name}</span>
                        {d.highRisk && (
                          <span className="text-[9px] bg-red-950 text-red-300 border border-red-800/60 px-1.5 py-0.2 rounded font-medium flex-shrink-0">
                            Coastal Risk
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <span>{d.state}</span>
                        <span>•</span>
                        <span className="text-slate-500">{d.basin}</span>
                        {d.deoc && (
                          <>
                            <span>•</span>
                            <span className="text-sky-400/80">DEOC: {d.deoc}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="flex-shrink-0 ml-2">
                      <Check className="w-4 h-4 text-sky-400" />
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-2.5 bg-slate-950/80 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Showing {filteredDistricts.length} districts</span>
          <span className="text-slate-500">Tap to switch location</span>
        </div>
      </div>
    </div>
  );
}
