import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, X, Wind, CloudRain, Zap, ShieldCheck, AlertTriangle, ShieldAlert, CheckCircle2, Info } from 'lucide-react';
import { ALL_INDIA_REGIONS } from '../data/districts';
import { fetchTravelForecast, getWeatherCodeDetails } from '../services/travelWeatherApi';

export default function TravelPlannerModal({ isOpen, onClose, initialDistrictId }) {
  const [selectedDestId, setSelectedDestId] = useState(initialDistrictId || 'kolkata');
  const [forecastDays, setForecastDays] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [highlightDate, setHighlightDate] = useState('2026-11-25');

  const selectedDest = ALL_INDIA_REGIONS.find((d) => d.id === selectedDestId) || ALL_INDIA_REGIONS[0];

  useEffect(() => {
    if (!isOpen) return;

    const loadData = async () => {
      setIsLoading(true);
      setErrorMsg(null);
      try {
        const daily = await fetchTravelForecast(selectedDest.lat, selectedDest.lon);
        if (daily && daily.time) {
          const items = daily.time.map((timeStr, idx) => {
            const dateObj = new Date(timeStr);
            const dayName = dateObj.toLocaleDateString('en-IN', { weekday: 'short' });
            const dateFormatted = dateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
            const maxTemp = Math.round(daily.temperature_2m_max[idx]);
            const minTemp = Math.round(daily.temperature_2m_min[idx]);
            const rainSum = Math.round((daily.precipitation_sum[idx] || 0) * 10) / 10;
            const rainProb = daily.precipitation_probability_max ? daily.precipitation_probability_max[idx] : 0;
            const maxGusts = Math.round(daily.wind_gusts_10m_max[idx] || 0);
            const maxWind = Math.round(daily.wind_speed_10m_max[idx] || 0);
            const weather = getWeatherCodeDetails(daily.weather_code[idx]);

            // Determine travel safety rating
            let safety = {
              level: 'SAFE',
              badge: 'bg-emerald-950 text-emerald-400 border-emerald-800',
              label: 'Safe for Travel & Field Work',
              color: 'text-emerald-400'
            };

            if (maxGusts >= 65 || rainSum >= 40) {
              safety = {
                level: 'SEVERE',
                badge: 'bg-red-950 text-red-400 border-red-800 animate-pulse',
                label: 'High Risk: Postpone Outdoor Work',
                color: 'text-red-400'
              };
            } else if (maxGusts >= 45 || rainSum >= 20 || rainProb >= 70) {
              safety = {
                level: 'CAUTION',
                badge: 'bg-amber-950 text-amber-400 border-amber-800',
                label: 'Moderate Caution: Carry Rain Gear',
                color: 'text-amber-400'
              };
            }

            return {
              dateStr: timeStr,
              dayName,
              dateFormatted,
              maxTemp,
              minTemp,
              rainSum,
              rainProb,
              maxGusts,
              maxWind,
              weather,
              safety
            };
          });

          setForecastDays(items);
        }
      } catch (err) {
        console.error(err);
        setErrorMsg('Could not fetch travel weather forecast. Please check your network.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [isOpen, selectedDest.lat, selectedDest.lon]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-end sm:items-center justify-center p-2.5 sm:p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-3.5 sm:p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-400/30">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Field Visit & Travel Planner
              </h3>
              <p className="text-[11px] text-slate-400">
                Check coming 5–7 days weather & storm risk for any destination
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

        {/* Destination & Date Picker Bar */}
        <div className="p-3 sm:p-4 bg-slate-950/60 border-b border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Destination Selector */}
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Planned Destination City/District:
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-sky-400 absolute left-2.5 top-2.5" />
              <select
                value={selectedDestId}
                onChange={(e) => setSelectedDestId(e.target.value)}
                className="w-full bg-slate-800 text-slate-100 text-xs font-semibold rounded-lg pl-8 pr-2.5 py-2 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500 truncate"
              >
                <optgroup label="Popular Destinations">
                  <option value="kolkata">Kolkata (West Bengal)</option>
                  <option value="digha">Digha (West Bengal)</option>
                  <option value="puri">Puri (Odisha)</option>
                  <option value="bhubaneswar">Bhubaneswar (Odisha)</option>
                  <option value="balasore">Balasore (Odisha)</option>
                  <option value="visakhapatnam">Visakhapatnam (Andhra Pradesh)</option>
                  <option value="mumbai">Mumbai (Maharashtra)</option>
                  <option value="delhi">New Delhi</option>
                </optgroup>
                <optgroup label="All Coastal & Interior Zones">
                  {ALL_INDIA_REGIONS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.state})
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          {/* Planned Date Selector */}
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Select Your Visit Date:
            </label>
            <div className="relative">
              <input
                type="date"
                value={highlightDate}
                onChange={(e) => setHighlightDate(e.target.value)}
                className="w-full bg-slate-800 text-slate-100 text-xs font-semibold rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>
          </div>
        </div>

        {/* Body Content - Daily Outlook */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2.5">
          {isLoading && (
            <div className="py-12 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
              <span>Fetching high-resolution 7-day weather model for {selectedDest.name}...</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-red-950/60 border border-red-800 rounded-xl text-xs text-red-300">
              {errorMsg}
            </div>
          )}

          {!isLoading && forecastDays && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Coming 7-Day Outlook for <strong className="text-white">{selectedDest.name}</strong>:</span>
                <span className="text-[10px] text-sky-400">Tap any day for details</span>
              </div>

              {forecastDays.map((day) => {
                const isTargetDate = highlightDate === day.dateStr;

                return (
                  <div
                    key={day.dateStr}
                    className={`rounded-xl border p-3 transition-all ${
                      isTargetDate
                        ? 'bg-sky-950/50 border-sky-500/80 ring-1 ring-sky-500/40 shadow-lg'
                        : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      {/* Date & Condition */}
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{day.weather.icon}</span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-white">
                              {day.dayName}, {day.dateFormatted}
                            </span>
                            {isTargetDate && (
                              <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-sky-500 text-slate-950">
                                Selected Visit
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-300 block">{day.weather.label}</span>
                        </div>
                      </div>

                      {/* Temperature & Winds */}
                      <div className="flex items-center gap-4 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 block">Temp:</span>
                          <span className="font-bold text-white">
                            {day.maxTemp}°C <span className="text-slate-400 font-normal">/ {day.minTemp}°</span>
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-400 block flex items-center gap-0.5">
                            <Zap className="w-3 h-3 text-amber-400" /> Max Gusts:
                          </span>
                          <span className="font-bold text-amber-300">{day.maxGusts} km/h</span>
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-400 block flex items-center gap-0.5">
                            <CloudRain className="w-3 h-3 text-blue-400" /> Rain:
                          </span>
                          <span className="font-bold text-blue-300">
                            {day.rainSum} mm {day.rainProb > 0 && <span className="text-[10px] text-slate-400 font-normal">({day.rainProb}%)</span>}
                          </span>
                        </div>
                      </div>

                      {/* Safety Rating Badge */}
                      <div className="sm:text-right">
                        <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${day.safety.badge}`}>
                          {day.safety.label}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Actionable Field Checklist for Visits */}
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5 text-xs text-slate-300">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 block">
              Field Visit Planning Rules:
            </span>
            <div className="space-y-1 text-[11px]">
              <p>• If wind gusts exceed <strong>50 km/h</strong>, avoid highway driving (NH-16 / NH-116) due to fallen trees & low visibility.</p>
              <p>• For coastal locations (Digha, Puri, Sagar Island), verify low/high tide timings and high surf advisories.</p>
              <p>• Keep a 20,000 mAh power bank charged as rural coastal power is disconnected during depressions.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
            <span>
              <strong className="text-slate-300">Courtesy:</strong> Open-Meteo High-Resolution 7-Day Ensemble Weather Models (ECMWF & GFS).
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg transition-colors"
          >
            Close Planner
          </button>
        </div>
      </div>
    </div>
  );
}
