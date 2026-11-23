import React, { useState } from 'react';
import {
  History,
  Play,
  RotateCcw,
  Compass,
  Wind,
  Gauge,
  MapPin,
  Calendar,
  ChevronRight,
  ShieldCheck,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Radio,
  Clock
} from 'lucide-react';

export const HISTORICAL_STORMS_CATALOG = [
  {
    id: 'akvan-2026',
    name: 'Severe Cyclonic Storm Akvan',
    nameOdia: 'ଭୟଙ୍କର ବାତ୍ୟା ଆକଭାନ୍ (Akvan)',
    nameHindi: 'भीषण चक्रवाती तूफान अकवान (Akvan)',
    basin: 'Bay of Bengal',
    dates: '20–21 Nov 2026',
    peakWind: '115 km/h',
    peakGusts: '135 km/h',
    minPressure: '988 hPa',
    landfallPoint: 'Gopalpur Sector, South Odisha',
    landfallTime: '20 Nov 2026, 12:30–13:30 IST',
    status: 'De-escalated • Dissipated Inland (21 Nov)',
    categoryBadge: 'IMD SEVERE CYCLONE (STAGE 4)',
    colorClass: 'border-red-500/40 from-red-950/30 to-slate-900',
    badgeColor: 'bg-red-500/20 text-red-300 border-red-500/40',
    description: 'Formed as deep depression over west-central Bay of Bengal; rapidly intensified into Severe Cyclonic Storm Akvan before making landfall near Gopalpur on 20 Nov. Crossed South Odisha and weakened into a depression near Padmapur on 21 Nov.',
    bulletinSummary: 'IMD RSMC Final Bulletin No. 18: Severe Cyclonic Storm Akvan crossed South Odisha coast between 12:30 and 13:30 IST on 20 November 2026 near latitude 19.26°N and longitude 84.88°E with sustained wind speed of 105-115 km/h gusting to 135 km/h. The system has subsequently weakened into a remnant low over interior districts. All coastal cyclone warnings stand withdrawn.',
    milestones: [
      { step: 'Genesis', time: '19 Nov 08:30 IST', pos: '17.20°N, 86.80°E', wind: '55 km/h', stage: 'Deep Depression' },
      { step: 'Intensification', time: '19 Nov 20:30 IST', pos: '18.10°N, 85.90°E', wind: '85 km/h', stage: 'Cyclonic Storm' },
      { step: 'Peak Gale', time: '20 Nov 08:30 IST', pos: '18.90°N, 85.10°E', wind: '105 km/h', stage: 'Severe Cyclone' },
      { step: 'Landfall Eye', time: '20 Nov 13:00 IST', pos: '19.26°N, 84.88°E', wind: '115 km/h', stage: 'Gopalpur Crossing' },
      { step: 'Dissipation', time: '21 Nov 08:30 IST', pos: '19.80°N, 83.40°E', wind: '45 km/h', stage: 'Inland Depression' }
    ]
  },
  {
    id: 'bob05-2026',
    name: 'Deep Depression BOB 05',
    nameOdia: 'ଗଭୀର ଅବପାତ BOB 05',
    nameHindi: 'गहरा दबाव BOB 05',
    basin: 'Central Bay of Bengal',
    dates: '14–17 Nov 2026',
    peakWind: '55 km/h',
    peakGusts: '65 km/h',
    minPressure: '1002 hPa',
    landfallPoint: 'Dissipated over Sea (Off North TN Coast)',
    landfallTime: '17 Nov 2026, 05:30 IST',
    status: 'Dissipated over Open Sea',
    categoryBadge: 'IMD DEEP DEPRESSION',
    colorClass: 'border-amber-500/40 from-amber-950/20 to-slate-900',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    description: 'Monitored as an active low-pressure area over central Bay of Bengal that concentrated into a deep depression. Interacted with upper-level shear and dissipated into a remnant trough off the North Tamil Nadu coast without coastal landfall.',
    bulletinSummary: 'IMD RSMC Bulletin: Deep Depression BOB 05 weakened into a well-marked low pressure area over southwest Bay of Bengal. Convective clouds dispersed offshore.',
    milestones: [
      { step: 'Genesis', time: '14 Nov 11:30 IST', pos: '11.50°N, 88.00°E', wind: '40 km/h', stage: 'Depression' },
      { step: 'Peak Intensity', time: '15 Nov 17:30 IST', pos: '12.20°N, 85.50°E', wind: '55 km/h', stage: 'Deep Depression' },
      { step: 'Weakening', time: '17 Nov 05:30 IST', pos: '12.80°N, 82.30°E', wind: '35 km/h', stage: 'Remnant Low' }
    ]
  },
  {
    id: 'dana-2024',
    name: 'Severe Cyclonic Storm Dana',
    nameOdia: 'ଭୟଙ୍କର ବାତ୍ୟା ଦାନା (Dana)',
    nameHindi: 'भीषण चक्रवाती तूफान दाना (Dana)',
    basin: 'North-West Bay of Bengal',
    dates: '23–25 Oct 2024',
    peakWind: '120 km/h',
    peakGusts: '135 km/h',
    minPressure: '984 hPa',
    landfallPoint: 'Dhamra / Habalikhati, Odisha',
    landfallTime: '24–25 Oct Midnight IST',
    status: 'Historical Record • Complete Evacuation Mandate',
    categoryBadge: 'IMD SEVERE CYCLONE',
    colorClass: 'border-sky-500/40 from-sky-950/20 to-slate-900',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    description: 'Severe Cyclonic Storm Dana formed over east-central Bay of Bengal, tracked north-northwestward and crossed northern Odisha coast between Dhamra and Habalikhati Nature Camp near Bhitarkanika National Park.',
    bulletinSummary: 'IMD RSMC Record Bulletin: Severe Cyclonic Storm Dana landfall process completed on early morning of 25 October 2024 over coastal Kendrapara and Bhadrak districts of Odisha.',
    milestones: [
      { step: 'Genesis', time: '23 Oct 05:30 IST', pos: '16.50°N, 89.00°E', wind: '65 km/h', stage: 'Cyclonic Storm' },
      { step: 'Severe Stage', time: '24 Oct 11:30 IST', pos: '19.20°N, 87.80°E', wind: '110 km/h', stage: 'Severe Cyclone' },
      { step: 'Landfall', time: '25 Oct 01:30 IST', pos: '20.75°N, 86.95°E', wind: '120 km/h', stage: 'Dhamra Landfall' }
    ]
  },
  {
    id: 'remal-2024',
    name: 'Severe Cyclonic Storm Remal',
    nameOdia: 'ଭୟଙ୍କର ବାତ୍ୟା ରେମାଲ୍ (Remal)',
    nameHindi: 'भीषण चक्रवाती तूफान रेमल (Remal)',
    basin: 'North Bay of Bengal',
    dates: '25–27 May 2024',
    peakWind: '135 km/h',
    peakGusts: '150 km/h',
    minPressure: '970 hPa',
    landfallPoint: 'Sagar Island & Khepupara (WB-BD Border)',
    landfallTime: '26 May 2024, 23:30 IST',
    status: 'Historical Record',
    categoryBadge: 'IMD SEVERE CYCLONE',
    colorClass: 'border-emerald-500/40 from-emerald-950/20 to-slate-900',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    description: 'Pre-monsoon severe cyclonic storm Remal formed over central Bay of Bengal and moved almost due north to cross adjacent West Bengal and Bangladesh coasts near Sagar Island and Khepupara.',
    bulletinSummary: 'IMD RSMC Record: Severe Cyclone Remal crossed coastal Sundarbans with heavy rainfall across South 24 Parganas, North 24 Parganas and Kolkata.',
    milestones: [
      { step: 'Genesis', time: '25 May 08:30 IST', pos: '18.20°N, 89.50°E', wind: '70 km/h', stage: 'Cyclonic Storm' },
      { step: 'Severe Stage', time: '26 May 17:30 IST', pos: '21.00°N, 89.20°E', wind: '120 km/h', stage: 'Severe Gale' },
      { step: 'Landfall', time: '26 May 23:30 IST', pos: '21.90°N, 89.30°E', wind: '135 km/h', stage: 'Sagar Island Crossing' }
    ]
  }
];

export default function StormReplayArchive({ selectedLang = 'english', onLaunchReplayOnMap }) {
  const [selectedStormId, setSelectedStormId] = useState('akvan-2026');
  const [showFullBulletin, setShowFullBulletin] = useState(false);

  const lang = (selectedLang || 'english').toLowerCase();
  const isOdia = lang === 'odia';
  const isHindi = lang === 'hindi';

  const currentStorm = HISTORICAL_STORMS_CATALOG.find((s) => s.id === selectedStormId) || HISTORICAL_STORMS_CATALOG[0];

  const handleReplayClick = () => {
    if (onLaunchReplayOnMap) {
      onLaunchReplayOnMap(currentStorm.id);
    }
  };

  return (
    <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl relative overflow-hidden transition-all">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3.5 mb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black uppercase tracking-wider">
              <History className="w-3 h-3 text-amber-400" />
              {isOdia ? 'ଐତିହାସିକ ବାତ୍ୟା ଓ ଲଘୁଚାପ ଅଭିଲେଖାଗାର' : isHindi ? 'ऐतिहासिक चक्रवात व निम्न दबाव पुरालेख' : 'Storm Archive & Trajectory Replay Hub'}
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              IMD & RSMC Official Records
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
            <span>
              {isOdia
                ? 'ବାତ୍ୟା ଓ ଲଘୁଚାପ ଟ୍ରେକିଂ ଷ୍ଟୁଡିଓ'
                : isHindi
                ? 'चक्रवात एवं निम्न दबाव ट्रैकिंग स्टूडियो'
                : 'Historical Storm & Low-Pressure Trajectory Studio'}
            </span>
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
            {isOdia
              ? 'ପୂର୍ବର ସମସ୍ତ ବାତ୍ୟା, ଗଭୀର ଅବପାତ ଓ ଲଘୁଚାପର ଟ୍ରାକ୍, ଲ୍ୟାଣ୍ଡଫଲ୍ ସମୟ ଏବଂ ସରକାରୀ ବୁଲେଟିନ୍ ଏଠାରେ ଯାଞ୍ଚ କରନ୍ତୁ। ଏହା ଆପଣଙ୍କ ଲାଇଭ୍ ରାଡାର୍ ମାନଚିତ୍ରକୁ ସମ୍ପୂର୍ଣ୍ଣ ସ୍ୱଚ୍ଛ ଓ ପ୍ରଶସ୍ତ ରଖେ।'
              : isHindi
              ? 'विगत सभी भीषण चक्रवातों, गहरे दबावों व निम्न दबाव प्रणालियों के ट्रैक, लैंडफॉल समय व आधिकारिक बुलेटिन को यहाँ देखें। इससे वर्तमान लाइव रडार मानचित्र पूरी तरह स्वच्छ व स्पष्ट रहता है।'
              : 'Inspect past severe storms, deep depressions, and low-pressure tracks with hour-by-hour milestones and official IMD bulletins in this dedicated studio without crowding today\'s live field radar.'}
          </p>
        </div>

        {/* Total catalog pill */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex-shrink-0 self-start sm:self-auto font-mono">
          <Radio className="w-3.5 h-3.5 text-emerald-400" />
          <span>{HISTORICAL_STORMS_CATALOG.length} Archived Systems</span>
        </div>
      </div>

      {/* Multi-Storm Selector Pill Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar">
        {HISTORICAL_STORMS_CATALOG.map((storm) => {
          const isSelected = storm.id === selectedStormId;
          return (
            <button
              key={storm.id}
              onClick={() => {
                setSelectedStormId(storm.id);
                setShowFullBulletin(false);
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex-shrink-0 border cursor-pointer ${
                isSelected
                  ? 'bg-amber-500/20 text-amber-200 border-amber-500/50 shadow-md ring-1 ring-amber-500/40'
                  : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
              <span>{isOdia && storm.nameOdia ? storm.nameOdia : isHindi && storm.nameHindi ? storm.nameHindi : storm.name}</span>
              <span className="text-[10px] opacity-75 font-mono">({storm.dates})</span>
            </button>
          );
        })}
      </div>

      {/* Active Storm Deep-Dive Card */}
      <div className={`bg-gradient-to-r ${currentStorm.colorClass} border rounded-xl p-4 sm:p-5 relative overflow-hidden transition-all shadow-lg`}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-4 mb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${currentStorm.badgeColor}`}>
                {currentStorm.categoryBadge}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {currentStorm.basin} • {currentStorm.dates}
              </span>
            </div>
            <h4 className="text-base sm:text-xl font-black text-white">
              {isOdia && currentStorm.nameOdia ? currentStorm.nameOdia : isHindi && currentStorm.nameHindi ? currentStorm.nameHindi : currentStorm.name}
            </h4>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              {currentStorm.description}
            </p>
          </div>

          {/* Action to Replay on Interactive Map */}
          <div className="flex items-center gap-2 w-full sm:w-auto flex-shrink-0">
            <button
              onClick={handleReplayClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-slate-950" />
              <span>{isOdia ? 'ମାନଚିତ୍ରରେ ଟ୍ରାକ୍ ରିପ୍ଲେ କରନ୍ତୁ 🗺️' : isHindi ? 'मानचित्र पर ट्रैक रीप्ले देखें 🗺️' : 'Replay Track on Map 🗺️'}</span>
            </button>
          </div>
        </div>

        {/* 4 Core Historical Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs mb-4">
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-2.5">
            <div className="flex items-center justify-between text-slate-400 mb-0.5">
              <span className="text-[10px] font-medium uppercase tracking-wider">Peak Gale Wind</span>
              <Wind className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <strong className="text-sm sm:text-base font-black text-amber-300">
              {currentStorm.peakWind}
            </strong>
            <span className="text-[9px] text-slate-400 block mt-0.5">
              Gusts: {currentStorm.peakGusts}
            </span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-2.5">
            <div className="flex items-center justify-between text-slate-400 mb-0.5">
              <span className="text-[10px] font-medium uppercase tracking-wider">Min Barometer</span>
              <Gauge className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <strong className="text-sm sm:text-base font-mono font-black text-purple-300">
              {currentStorm.minPressure}
            </strong>
            <span className="text-[9px] text-slate-400 block mt-0.5">
              Central Eye Depression
            </span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-2.5">
            <div className="flex items-center justify-between text-slate-400 mb-0.5">
              <span className="text-[10px] font-medium uppercase tracking-wider">Landfall Point</span>
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
            </div>
            <strong className="text-xs sm:text-sm font-bold text-slate-100 truncate block" title={currentStorm.landfallPoint}>
              {currentStorm.landfallPoint}
            </strong>
            <span className="text-[9px] text-rose-400 block mt-0.5 truncate">
              {currentStorm.landfallTime}
            </span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-2.5">
            <div className="flex items-center justify-between text-slate-400 mb-0.5">
              <span className="text-[10px] font-medium uppercase tracking-wider">Current Status</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <strong className="text-xs sm:text-sm font-bold text-emerald-300 truncate block">
              {currentStorm.status}
            </strong>
            <span className="text-[9px] text-emerald-400 block mt-0.5">
              ✓ Warnings Withdrawn
            </span>
          </div>
        </div>

        {/* Milestone Steps Timeline */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isOdia ? 'ସମୟକ୍ରମିକ ଗତିପଥ (Milestones)' : 'Hour-by-Hour Trajectory Milestones'}</span>
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              {currentStorm.milestones.length} Synoptic Stages
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {currentStorm.milestones.map((ms, idx) => (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800 rounded-lg p-2 text-[11px] space-y-0.5"
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="font-bold text-slate-200">{ms.step}</span>
                  <span className="font-mono text-cyan-400 text-[9px]">{ms.wind}</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">{ms.time}</div>
                <div className="text-[9px] text-slate-300 font-semibold truncate">{ms.stage}</div>
                <div className="text-[9px] text-slate-500 font-mono">{ms.pos}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Expandable Official IMD Final Bulletin */}
        <div className="pt-2">
          <button
            onClick={() => setShowFullBulletin(!showFullBulletin)}
            className="w-full flex items-center justify-between text-xs text-slate-400 hover:text-white px-2 py-1.5 rounded-lg hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
              <span>{isOdia ? 'ସରକାରୀ IMD ଡି-ଏସ୍କାଲେସନ୍ ବୁଲେଟିନ୍ ଦେଖନ୍ତୁ' : 'Read Official IMD De-escalation & Archive Bulletin'}</span>
            </span>
            <div className="flex items-center gap-1 text-[11px] text-sky-400 font-mono">
              <span>{showFullBulletin ? 'Collapse' : 'Expand'}</span>
              {showFullBulletin ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </div>
          </button>

          {showFullBulletin && (
            <div className="mt-2 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans space-y-2">
              <div className="font-mono text-[10px] text-amber-400 uppercase tracking-wider border-b border-slate-800/80 pb-1">
                Official Archives • Regional Specialized Meteorological Centre (RSMC New Delhi)
              </div>
              <p>{currentStorm.bulletinSummary}</p>
              <div className="text-[10px] text-emerald-400 font-medium">
                ✓ Recorded for Agro-Climatic Research & Disaster Resilience Planning
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
