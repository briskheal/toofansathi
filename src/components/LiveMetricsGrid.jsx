import React from 'react';
import { Compass, Wind, CloudRain, Gauge, Info, Thermometer, ThermometerSnowflake, ThermometerSun, ShieldCheck, Waves } from 'lucide-react';

export default function LiveMetricsGrid({
  threat,
  distanceKm,
  directionText,
  distanceToCoastKm,
  nearestCoastName,
  movementSpeed = 18,
  movementDirection = 'NNW',
  windSpeed,
  windGusts,
  rainMm,
  currentRain = 0,
  next12hRain = 0,
  heavyRainArrival = null,
  pressureHpa,
  currentTemp,
  maxTemp,
  minTemp,
  apparentTemp,
  humidity,
  selectedLang = 'english'
}) {
  const isColdLow = minTemp !== undefined && minTemp !== null && minTemp <= 15;
  const isSevereCold = minTemp !== undefined && minTemp !== null && minTemp <= 10;
  const lang = (selectedLang || 'english').toLowerCase();
  const isOdia = lang === 'odia';
  const isTamil = lang === 'tamil';

  const isPeaceTime = threat?.isNormalDay || threat?.level === 'GREEN';
  const isEasterlyWaves = threat?.isEasterlyWaves;

  return (
    <div className="space-y-1.5">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5">
        
        {/* Metric 1: Dynamic Basin Shield / Monsoon Pulse when no active cyclone, Cyclone Eye when active cyclone */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
              {isEasterlyWaves
                ? (isTamil ? 'பருவமழை அலை' : isOdia ? 'ମୌସୁମୀ ପ୍ରବାହ' : 'Monsoon Pulse')
                : isPeaceTime
                ? (isTamil ? 'புயல் கண்காணிப்பு' : isOdia ? 'ବାତ୍ୟା ନଜର' : 'Cyclone Shield')
                : (isTamil ? 'புயல் மையம்' : isOdia ? 'ବାତ୍ୟା କେନ୍ଦ୍ର' : 'Cyclone Eye')}
            </span>
            {isEasterlyWaves ? (
              <Waves className="w-4 h-4 text-sky-400" />
            ) : isPeaceTime ? (
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            ) : (
              <Compass className="w-4 h-4 text-sky-400" />
            )}
          </div>
          <div>
            {isEasterlyWaves ? (
              <>
                <div className="text-xl sm:text-2xl font-black text-sky-300">
                  {isTamil ? 'தீவிரம்' : isOdia ? 'ସକ୍ରିୟ' : 'Active'}
                </div>
                <p className="text-[11px] text-amber-400 font-medium truncate mt-0.5">
                  Easterly Waves • SW Bay
                </p>
                <div className="mt-1.5 pt-1.5 border-t border-slate-800/80 text-[10px] space-y-0.5">
                  <div className="text-sky-300 font-bold truncate">
                    🌧️ Rain & Squalls (23–27 Nov)
                  </div>
                  <div className="text-slate-400 text-[9px]">
                    ⏱️ Convective Inflow from Sea
                  </div>
                </div>
              </>
            ) : isPeaceTime ? (
              <>
                <div className="text-xl sm:text-2xl font-black text-emerald-400">
                  {isTamil ? '0 செயலில்' : isOdia ? '୦ ସକ୍ରିୟ' : '0 Active'}
                </div>
                <p className="text-[11px] text-emerald-400 font-medium truncate mt-0.5">
                  🟢 7-Day Basin All-Clear
                </p>
                <div className="mt-1.5 pt-1.5 border-t border-slate-800/80 text-[10px] space-y-0.5">
                  <div className="text-emerald-400 font-bold truncate">
                    🌊 Bay of Bengal Calm
                  </div>
                  <div className="text-slate-400 text-[9px]">
                    ⏱️ Marine & Routine Safe
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="text-xl sm:text-2xl font-black text-white">
                  {distanceKm} <span className="text-xs font-semibold text-slate-400">km</span>
                </div>
                <p className="text-[11px] text-sky-400 font-medium truncate mt-0.5">
                  {isOdia ? `ଆପଣଙ୍କ ଠାରୁ (${directionText})` : `To you (${directionText})`}
                </p>
                {distanceToCoastKm && (
                  <div className="mt-1.5 pt-1.5 border-t border-slate-800/80 text-[10px] space-y-0.5">
                    <div className="text-emerald-400 font-bold truncate">
                      🌊 ~{distanceToCoastKm} km to coast
                    </div>
                    <div className="text-slate-400 text-[9px]">
                      ⏱️ Approaching at {movementSpeed} km/h {movementDirection}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Metric 2: Wind & Peak Gusts */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
              {isOdia ? 'ପବନ ଓ ଝଟକା' : 'Wind & Gusts'}
            </span>
            <Wind className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-white">
              {windSpeed} <span className="text-xs font-semibold text-slate-400">km/h</span>
            </div>
            <p className="text-[11px] text-amber-400 font-medium truncate mt-0.5">
              {isOdia ? `ଝଟକା: ${windGusts} km/h` : `Gusts to ${windGusts} km/h`}
            </p>
          </div>
        </div>

        {/* Metric 3: Winter & Day Temp (Max / Min) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
              {isOdia ? (isColdLow ? 'ଶୀତ ତାପମାତ୍ରା' : 'ତାପମାତ୍ରା') : (isColdLow ? 'Winter Temp' : 'Temperature')}
            </span>
            {isColdLow ? (
              <ThermometerSnowflake className="w-4 h-4 text-cyan-400 animate-pulse" />
            ) : (
              <Thermometer className="w-4 h-4 text-rose-400" />
            )}
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-white">
                {currentTemp !== undefined ? `${currentTemp}°` : '--'}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                ({isOdia ? 'ଅନୁଭୂତ' : 'Feels'} {apparentTemp !== undefined ? `${apparentTemp}°` : '--'})
              </span>
            </div>
            
            {/* Max & Min Badges */}
            <div className="flex items-center gap-1.5 mt-1 text-[11px] font-bold">
              <span className="flex items-center text-amber-400" title="Day Maximum Temperature">
                ▲ {maxTemp !== undefined ? `${maxTemp}°C` : '--'}
              </span>
              <span className="text-slate-600">•</span>
              <span className={`flex items-center ${isSevereCold ? 'text-cyan-300 font-extrabold' : isColdLow ? 'text-cyan-400' : 'text-blue-300'}`} title="Winter / Night Minimum Temperature">
                ▼ {minTemp !== undefined ? `${minTemp}°C` : '--'}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5 truncate">
              {isOdia
                ? (isSevereCold ? '❄️ ପ୍ରବଳ ଶୀତ ଲହରୀ' : isColdLow ? '❄️ ସକାଳେ ଥଣ୍ଡା କାକର' : 'ସ୍ୱାଭାବିକ ତାପମାତ୍ରା')
                : (isSevereCold ? '❄️ Cold Wave Chill' : isColdLow ? '❄️ Chilly Morning Low' : 'Mild Season Temp')}
            </p>
          </div>
        </div>

        {/* Metric 4: 3-Hour Expected Rain & Overnight Outlook */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
              {isOdia ? 'ଆଗାମୀ ୩ଘଂ ବର୍ଷା' : 'Next 3h Rain'}
            </span>
            <CloudRain className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <div className="flex items-baseline justify-between gap-1 flex-wrap">
              <div className="flex items-baseline gap-1 whitespace-nowrap">
                <span className="text-xl sm:text-2xl font-black text-white">{rainMm}</span>
                <span className="text-xs font-semibold text-slate-400">mm</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                {currentRain > 0 ? `${currentRain} mm/h now` : '0 mm now'}
              </span>
            </div>
            
            <p className="text-[11px] text-blue-400 font-bold truncate mt-0.5">
              {rainMm >= 25 ? '⚠️ Heavy Downpour' : rainMm >= 10 ? 'Moderate Rain' : rainMm >= 0.5 ? 'Light Showers' : rainMm > 0 ? 'Passing Drizzle' : 'Dry / Clear'}
            </p>

            {heavyRainArrival && (
              <div className="mt-1.5 pt-1.5 border-t border-slate-800/80 text-[10px] leading-snug space-y-0.5">
                <div className="text-amber-400 font-bold flex items-center justify-between">
                  <span>⚡ Deluge:</span>
                  <span className="text-white font-extrabold">{heavyRainArrival.time}</span>
                </div>
                <div className="text-slate-300 text-[9px] flex items-center justify-between">
                  <span>Peak Rate:</span>
                  <span className="text-amber-300 font-semibold">{heavyRainArrival.rate} mm/h</span>
                </div>
                {next12hRain > 0 && (
                  <div className="text-slate-400 text-[9px] flex items-center justify-between pt-0.5 border-t border-slate-800/50">
                    <span>12h Total:</span>
                    <span className="text-slate-200 font-semibold">~{next12hRain} mm</span>
                  </div>
                )}
              </div>
            )}
            {!heavyRainArrival && next12hRain > 5 && (
              <div className="mt-1.5 pt-1.5 border-t border-slate-800/80 text-[10px] flex items-center justify-between text-slate-400">
                <span>12h Total:</span>
                <span className="text-slate-200 font-semibold">~{next12hRain} mm</span>
              </div>
            )}
          </div>
        </div>

        {/* Metric 5: Atmospheric Pressure */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col justify-between col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
              {isOdia ? 'ବାୟୁମଣ୍ଡଳ ଚାପ' : 'Barometer'}
            </span>
            <Gauge className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-white">
              {pressureHpa} <span className="text-xs font-semibold text-slate-400">hPa</span>
            </div>
            <p className={`text-[11px] font-medium truncate mt-0.5 ${pressureHpa < 1000 ? 'text-red-400 font-bold' : 'text-slate-400'}`}>
              {pressureHpa < 995 ? 'Deep Depression Low' : pressureHpa < 1005 ? 'Falling Barometer' : 'Normal Pressure'}
            </p>
            {humidity !== undefined && (
              <div className="mt-1.5 pt-1.5 border-t border-slate-800/80 text-[10px] flex items-center justify-between text-slate-400">
                <span>Humidity:</span>
                <span className="text-slate-200 font-semibold">{humidity}%</span>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Attribution line */}
      <div className="flex items-center justify-between px-1 text-[10px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <Info className="w-3 h-3 text-sky-400 flex-shrink-0" />
          <span>
            <strong className="text-slate-400">Courtesy:</strong> Open-Meteo High-Resolution Observations & IMD AWS (Live Max/Min Temp & Pressure).
          </span>
        </div>
        {humidity !== undefined && (
          <span className="text-slate-400 font-mono hidden sm:inline">
            Humidity: {humidity}%
          </span>
        )}
      </div>
    </div>
  );
}
