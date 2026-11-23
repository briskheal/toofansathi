import React, { useState, useMemo } from 'react';
import { X, Search, MapPin, Locate, Check, Sparkles, Building2, Store } from 'lucide-react';
import { ALL_INDIA_REGIONS } from '../data/districts';

const STATE_FILTER_TABS = [
  { id: 'all', label: 'All India' },
  { id: 'northeast', label: 'North East (8 States)', states: ['Assam', 'Meghalaya', 'Tripura', 'Manipur', 'Nagaland', 'Mizoram', 'Arunachal Pradesh', 'Sikkim'] },
  { id: 'up_delhi', label: 'UP & Delhi NCR', states: ['Uttar Pradesh', 'Delhi NCR'] },
  { id: 'uttarakhand_hills', label: 'Uttarakhand, HP & Hills', states: ['Uttarakhand', 'Himachal Pradesh', 'Jammu & Kashmir', 'Ladakh'] },
  { id: 'punjab_haryana', label: 'Punjab & Haryana', states: ['Punjab / Haryana', 'Haryana', 'Punjab'] },
  { id: 'odisha', label: 'Odisha', state: 'Odisha' },
  { id: 'wb', label: 'West Bengal', state: 'West Bengal' },
  { id: 'andhra', label: 'Andhra Pradesh', state: 'Andhra Pradesh' },
  { id: 'maharashtra', label: 'Maharashtra & Goa', states: ['Maharashtra', 'Goa'] },
  { id: 'gujarat', label: 'Gujarat', state: 'Gujarat' },
  { id: 'tamilnadu', label: 'Tamil Nadu & Puducherry', states: ['Tamil Nadu', 'Puducherry'] },
  { id: 'islands', label: 'Islands (Lakshadweep & A&N)', states: ['Lakshadweep', 'Andaman & Nicobar'] },
  { id: 'south', label: 'Karnataka, Kerala & Lakshadweep', states: ['Karnataka', 'Kerala', 'Lakshadweep'] },
  { id: 'telangana', label: 'Telangana', state: 'Telangana' },
  { id: 'bihar_jharkhand', label: 'Bihar & Jharkhand', states: ['Bihar', 'Jharkhand'] },
  { id: 'mp_cg', label: 'Madhya Pradesh & CG', states: ['Madhya Pradesh', 'Chhattisgarh'] },
  { id: 'north_west', label: 'Rajasthan', state: 'Rajasthan' }
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
  const [searchLetter, setSearchLetter] = useState('All');
  const [activeFilter, setActiveFilter] = useState('all');

  // Dynamic alphabet list generated from all Indian cities/markets
  const ALPHABET_LETTERS = useMemo(() => {
    const letters = new Set();
    ALL_INDIA_REGIONS.forEach((item) => {
      const char = item.name.trim().charAt(0).toUpperCase();
      if (char >= 'A' && char <= 'Z') letters.add(char);
    });
    return ['All', ...Array.from(letters).sort()];
  }, []);

  const filteredDistricts = useMemo(() => {
    return ALL_INDIA_REGIONS.filter((district) => {
      // 1. Letter filter
      if (searchLetter !== 'All') {
        const firstLetter = district.name.trim().charAt(0).toUpperCase();
        if (firstLetter !== searchLetter) return false;
      }

      // 2. Filter by category tab
      if (activeFilter !== 'all') {
        const cat = STATE_FILTER_TABS.find((f) => f.id === activeFilter);
        if (cat?.state && district.state !== cat.state) return false;
        if (cat?.states && !cat.states.includes(district.state)) return false;
      }

      // 3. Filter by search query
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = district.name.toLowerCase().includes(q);
        const matchesState = district.state.toLowerCase().includes(q);
        const matchesBasin = district.basin.toLowerCase().includes(q);
        const matchesCat = district.category ? district.category.toLowerCase().includes(q) : false;
        const matchesMarket = district.market ? district.market.toLowerCase().includes(q) : false;
        return matchesName || matchesState || matchesBasin || matchesCat || matchesMarket;
      }

      return true;
    });
  }, [search, searchLetter, activeFilter]);

  // Group by state when 'all' is selected, or keep continuous
  const groupedByState = useMemo(() => {
    const map = {};
    filteredDistricts.forEach((d) => {
      if (!map[d.state]) map[d.state] = [];
      map[d.state].push(d);
    });
    return map;
  }, [filteredDistricts]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-slate-900 border-t sm:border border-slate-800 rounded-t-2xl sm:rounded-2xl w-full max-w-xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-200">
        
        {/* Header */}
        <div className="p-3.5 sm:p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-400/30">
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                <span>Important Markets, Cities & Mandis</span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Letter-wise inline search across agricultural mandis, ports & major cities
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
        <div className="p-2.5 sm:p-3 bg-slate-950/50 border-b border-slate-800">
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
                    Auto-Detect Closest Station
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-normal">
                  {isGpsActive && gpsLocationName ? gpsLocationName : 'Auto-picks nearest city or coastal station'}
                </div>
              </div>
            </div>
            {isGpsActive && <Check className="w-4 h-4 text-sky-400" />}
          </button>
        </div>

        {/* Search Input Bar & Letter-Wise Filter */}
        <div className="p-3 bg-slate-900 border-b border-slate-800 space-y-2">
          
          {/* Inline Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if (searchLetter !== 'All') setSearchLetter('All');
              }}
              placeholder="Search by city, market or mandi (e.g. Burrabazar, Guntur, Malgodown)..."
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

          {/* Letter-Wise Quick Filter Chips */}
          <div className="flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-none text-[10px]">
            {ALPHABET_LETTERS.map((letter) => (
              <button
                key={letter}
                onClick={() => {
                  setSearchLetter(letter);
                  setSearch('');
                }}
                className={`px-2 py-0.5 rounded font-bold whitespace-nowrap transition-colors ${
                  searchLetter === letter
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>

          {/* State Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
            {STATE_FILTER_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors border ${
                  activeFilter === tab.id
                    ? 'bg-sky-600 text-white border-sky-400 shadow-sm'
                    : 'bg-slate-800 text-slate-400 border-slate-700/80 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* State-Wise City & Market List */}
        <div className="flex-1 overflow-y-auto p-2.5 space-y-3">
          {filteredDistricts.length === 0 ? (
            <div className="py-10 text-center text-slate-500 text-xs">
              No matching markets or cities found for "{search}".
            </div>
          ) : (
            Object.entries(groupedByState).map(([stateName, cities]) => (
              <div key={stateName} className="space-y-1">
                {/* State Section Header */}
                <div className="px-2 py-1 text-[11px] font-bold text-sky-400/90 bg-slate-950/40 rounded-lg flex items-center justify-between">
                  <span>{stateName}</span>
                  <span className="text-[10px] text-slate-500 font-normal">{cities.length} Important Markets</span>
                </div>

                {/* Cities & Markets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-0.5">
                  {cities.map((d) => {
                    const isSelected = !isGpsActive && selectedDistrictId === d.id;
                    return (
                      <button
                        key={d.id}
                        onClick={() => {
                          onSelectDistrict(d.id);
                          onClose();
                        }}
                        className={`flex items-start justify-between p-2 rounded-xl text-left transition-all border ${
                          isSelected
                            ? 'bg-sky-950/70 border-sky-500 text-white shadow-sm ring-1 ring-sky-500/30'
                            : 'bg-slate-800/40 hover:bg-slate-800 border-slate-800/80 text-slate-200'
                        }`}
                      >
                        <div className="flex items-start gap-2 min-w-0">
                          <div className={`p-1.5 rounded-lg flex-shrink-0 mt-0.5 ${
                            d.isMajorCity
                              ? 'bg-sky-500/10 text-sky-400'
                              : d.highRisk
                              ? 'bg-amber-500/10 text-amber-400'
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            <MapPin className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-slate-100 flex items-center gap-1.5 flex-wrap">
                              <span className="truncate">{d.name}</span>
                              {d.isMajorCity && (
                                <span className="text-[9px] bg-sky-950 text-sky-300 border border-sky-800/60 px-1 py-0.2 rounded font-medium flex-shrink-0">
                                  Major City
                                </span>
                              )}
                              {d.highRisk && (
                                <span className="text-[9px] bg-red-950 text-red-300 border border-red-800/60 px-1 py-0.2 rounded font-medium flex-shrink-0">
                                  Cyclone Risk
                                </span>
                              )}
                            </div>
                            
                            {/* Prominent Wholesale Market / Mandi */}
                            {d.market && (
                              <div className="text-[10px] text-amber-300/90 flex items-center gap-1 mt-0.5">
                                <Store className="w-3 h-3 flex-shrink-0 text-amber-400" />
                                <span className="truncate">{d.market}</span>
                              </div>
                            )}

                            <div className="text-[10px] text-slate-400 truncate mt-0.5">
                              {d.category || d.basin}
                            </div>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="flex-shrink-0 ml-1.5 mt-1">
                            <Check className="w-4 h-4 text-sky-400" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-2.5 bg-slate-950/80 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Showing {filteredDistricts.length} markets & cities</span>
          <span className="text-slate-500">Tap to select station</span>
        </div>
      </div>
    </div>
  );
}
