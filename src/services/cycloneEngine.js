// All-India Cyclone & Depression Tracking Engine (Bay of Bengal, Arabian Sea, and Inland Depressions)

export const ALL_INDIA_ACTIVE_STORMS = [
  {
    id: 'BOB-01-2026',
    basin: 'Bay of Bengal',
    name: 'Severe Cyclone Akvan (IMD/RSMC)',
    cycloneCode: 'AKVAN',
    namingCountry: 'Iran (WMO/ESCAP Panel on Tropical Cyclones)',
    status: 'Severe Cyclonic Storm (Landfall In Progress)',
    center: {
      lat: 18.90,
      lon: 83.60,
      locationDesc: 'South Odisha coast crossing near Padmapur / Gopalpur sector (Ganjam district)'
    },
    movement: {
      direction: 'North-Northwest (NNW)',
      speedKmph: 16,
      headingDeg: 335
    },
    centralPressureHpa: 988,
    maxSustainedWindKmph: 105,
    peakGustsKmph: 125,
    landfall: {
      predictedArea: 'South Odisha & North Andhra Pradesh coast (Gopalpur / Padmapur sector)',
      window: 'Ongoing Now (12:00 PM – 03:00 PM IST)',
      status: '🚨 Landfall In Progress (Eyewall Crossing Coast)'
    },
    imdWarningStage: 'Red Alert / Landfall In Progress (IMD RSMC New Delhi)',
    bulletinNo: 'IMD Flash Bulletin No. 14 (BOB/01/2026)',
    bulletinTime: '20-Nov-2026 13:00 IST',
    bulletinIso: '2026-11-20T13:00:00+05:30',
    source: 'IMD RSMC New Delhi & INCOIS Hyderabad',
    incoisAlert: {
      surgeHeight: '1.0 – 1.5 meters',
      waveHeight: '3.5 – 5.5 meters',
      inundationAreas: 'Ganjam, Gajapati & Srikakulam low-lying coastal belts',
      fishermenAdvisory: 'Total suspension of fishing operations. High surf advisory along South Odisha & North AP coast.'
    },

    // Foreign Meteorological Agencies Comparison
    agencyComparison: [
      {
        agency: 'IMD (India)',
        fullname: 'India Meteorological Department (RSMC New Delhi)',
        flag: '🇮🇳',
        status: 'Severe Cyclonic Storm Akvan',
        windSpeed: '95 km/h (51 knots)',
        windStandard: '3-min sustained (IMD Standard)',
        peakGusts: '115 km/h (62 knots)',
        centralPressure: '988 hPa',
        landfallEstimate: 'North AP & South Odisha coast (Padmapur / Gopalpur sector)',
        confidence: 'High (Primary RSMC Mandate)'
      },
      {
        agency: 'JTWC (USA)',
        fullname: 'Joint Typhoon Warning Center (US Navy / Air Force, Hawaii)',
        flag: '🇺🇸',
        status: 'Tropical Cyclone 01B (Akvan)',
        windSpeed: '100 km/h (54 knots)',
        windStandard: '1-min sustained (US Saffir-Simpson Standard)',
        peakGusts: '125 km/h (67 knots)',
        centralPressure: '986 hPa',
        landfallEstimate: 'South Odisha coast near Gopalpur/Padmapur in 4-6 hours',
        confidence: 'High (Track aligned with Zoom Earth satellite feed)'
      },
      {
        agency: 'ECMWF (Europe)',
        fullname: 'European Centre for Medium-Range Weather Forecasts (IFS Model)',
        flag: '🇪🇺',
        status: 'Severe Tropical Cyclone (Ensemble Mean)',
        windSpeed: '92 km/h (50 knots)',
        windStandard: '10-min sustained (WMO Standard)',
        peakGusts: '118 km/h (64 knots)',
        centralPressure: '989 hPa',
        landfallEstimate: 'South Odisha & North AP border, crossing ~08:00 UTC (13:30 IST)',
        confidence: 'Very High (Consensus Model)'
      }
    ]
  },
  {
    id: 'ARB-01-2026',
    basin: 'Arabian Sea',
    name: 'Arabian Sea Depression System',
    status: 'Well-Marked Low Pressure / Depression',
    center: {
      lat: 20.80,
      lon: 67.20,
      locationDesc: 'Northeast Arabian Sea, ~260 km WSW of Porbandar, ~380 km W of Mumbai'
    },
    movement: {
      direction: 'West-Northwest (WNW)',
      speedKmph: 14,
      headingDeg: 290
    },
    centralPressureHpa: 1000,
    maxSustainedWindKmph: 45,
    peakGustsKmph: 60,
    landfall: {
      predictedArea: 'Moving away towards Oman/Gulf of Kutch peripheral squall',
      window: 'Next 36 hours',
      status: 'Sea-Track System'
    },
    imdWarningStage: 'Squally Weather & Fishermen Warning (Yellow)',
    bulletinTime: '19-Nov-2026 15:30 IST',
    bulletinIso: '2026-11-19T15:30:00+05:30',
    source: 'IMD Cyclone Warning Division, New Delhi',

    agencyComparison: [
      {
        agency: 'IMD (India)',
        fullname: 'India Meteorological Department (New Delhi)',
        flag: '🇮🇳',
        status: 'Well-Marked Low Pressure System',
        windSpeed: '45 km/h (24 knots)',
        windStandard: '3-min sustained',
        peakGusts: '60 km/h',
        centralPressure: '1000 hPa',
        landfallEstimate: 'No direct Indian coast landfall (Moving WNW into open sea)',
        confidence: 'High'
      },
      {
        agency: 'JTWC (USA)',
        fullname: 'Joint Typhoon Warning Center (Hawaii)',
        flag: '🇺🇸',
        status: 'Invest 99A (Low probability of intensification)',
        windSpeed: '50 km/h (27 knots)',
        windStandard: '1-min sustained',
        peakGusts: '65 km/h',
        centralPressure: '999 hPa',
        landfallEstimate: 'Recurving towards Oman/Makran coast',
        confidence: 'Medium'
      },
      {
        agency: 'ECMWF (Europe)',
        fullname: 'European Centre for Medium-Range Weather Forecasts',
        flag: '🇪🇺',
        status: 'Monsoon Depression Peripheral Low',
        windSpeed: '46 km/h',
        windStandard: '10-min sustained',
        peakGusts: '62 km/h',
        centralPressure: '1001 hPa',
        landfallEstimate: 'Dissipating over North Arabian Sea',
        confidence: 'High'
      }
    ]
  }
];

export const ACTIVE_CYCLONE_BULLETIN = ALL_INDIA_ACTIVE_STORMS[0];

// Find the closest active storm in India relative to user coordinates
export function getNearestStorm(userLat, userLon) {
  let closest = ALL_INDIA_ACTIVE_STORMS[0];
  let minDistance = Infinity;

  for (const storm of ALL_INDIA_ACTIVE_STORMS) {
    const dist = calculateDistanceKm(userLat, userLon, storm.center.lat, storm.center.lon);
    if (dist < minDistance) {
      minDistance = dist;
      closest = storm;
    }
  }
  return closest;
}

// Compute Real-Time Dead-Reckoned Storm Position & Distance to Coastline
export function getLiveEstimatedStorm(storm, currentTime = new Date()) {
  if (!storm || !storm.center || !storm.movement) return storm;

  const bulletinTime = storm.bulletinIso ? new Date(storm.bulletinIso).getTime() : new Date('2026-11-19T15:30:00+05:30').getTime();
  const now = currentTime.getTime();
  const elapsedHours = Math.max(0, (now - bulletinTime) / (1000 * 60 * 60));

  const speedKmph = storm.movement.speedKmph || 18;
  const headingDeg = storm.movement.headingDeg || 340; // NNW
  const headingRad = (headingDeg * Math.PI) / 180;

  const distanceTraveledKm = speedKmph * elapsedHours;

  const deltaLat = (distanceTraveledKm * Math.cos(headingRad)) / 111.13;
  const deltaLon = (distanceTraveledKm * Math.sin(headingRad)) / (111.13 * Math.cos((storm.center.lat * Math.PI) / 180));

  const liveLat = Math.round((storm.center.lat + deltaLat) * 1000) / 1000;
  const liveLon = Math.round((storm.center.lon + deltaLon) * 1000) / 1000;

  // Nearest coastal landfall reference points
  const coastalPoints = storm.basin === 'Bay of Bengal'
    ? [
        { name: 'Gopalpur/Padmapur Coast', lat: 18.90, lon: 84.40 },
        { name: 'Srikakulam Coast', lat: 18.33, lon: 84.13 },
        { name: 'Puri Beach Coast', lat: 19.81, lon: 85.83 },
        { name: 'Visakhapatnam Coast', lat: 17.68, lon: 83.21 },
        { name: 'Paradip Port Coast', lat: 20.31, lon: 86.61 },
        { name: 'Dhamra/Bhadrak Coast', lat: 20.80, lon: 86.95 }
      ]
    : [
        { name: 'Porbandar Coast', lat: 21.64, lon: 69.62 },
        { name: 'Dwarka Coast', lat: 22.24, lon: 68.96 },
        { name: 'Kutch Coast', lat: 23.24, lon: 69.66 },
        { name: 'Mumbai Coast', lat: 18.92, lon: 72.83 }
      ];

  let minCoastDist = Infinity;
  let nearestCoastName = coastalPoints[0].name;
  for (const pt of coastalPoints) {
    const d = calculateDistanceKm(liveLat, liveLon, pt.lat, pt.lon);
    if (d < minCoastDist) {
      minCoastDist = d;
      nearestCoastName = pt.name;
    }
  }

  return {
    ...storm,
    originalCenter: storm.originalCenter || storm.center,
    center: {
      lat: liveLat,
      lon: liveLon,
      locationDesc: `Estimated Live Center: ~${minCoastDist} km SE of ${nearestCoastName} (Advancing at ${speedKmph} km/h ${storm.movement.direction})`
    },
    liveCenter: {
      lat: liveLat,
      lon: liveLon,
      locationDesc: `Estimated Live Center: ~${minCoastDist} km SE of ${nearestCoastName} (Advancing at ${speedKmph} km/h ${storm.movement.direction})`
    },
    distanceTraveledKm: Math.round(distanceTraveledKm),
    elapsedMinutes: Math.round(elapsedHours * 60),
    distanceToCoastKm: minCoastDist,
    nearestCoastName: nearestCoastName
  };
}

// Calculate Haversine distance in KM between two lat/lon points
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Calculate compass bearing from user to storm
export function calculateBearingDirection(userLat, userLon, stormLat, stormLon) {
  const y = Math.sin(((stormLon - userLon) * Math.PI) / 180) * Math.cos((stormLat * Math.PI) / 180);
  const x =
    Math.cos((userLat * Math.PI) / 180) * Math.sin((stormLat * Math.PI) / 180) -
    Math.sin((userLat * Math.PI) / 180) * Math.cos((stormLat * Math.PI) / 180) * Math.cos(((stormLon - userLon) * Math.PI) / 180);
  const bearing = (Math.atan2(y, x) * 180) / Math.PI;
  const normalized = (bearing + 360) % 360;

  const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
  const index = Math.round(normalized / 45) % 8;
  return {
    deg: Math.round(normalized),
    text: directions[index]
  };
}

// Determine Threat Level based on Distance, Local Wind, Gusts, and Rain
export function evaluateThreatLevel(distanceKm, localWindKmph, localGustsKmph, rainMm3h) {
  if (distanceKm <= 120 || localWindKmph >= 65 || localGustsKmph >= 80 || rainMm3h >= 45) {
    return {
      level: 'RED',
      color: 'bg-red-600 text-white',
      badge: 'border-red-500 text-red-400 bg-red-950/60',
      title: 'RED ALERT: Severe Danger',
      summary: 'STOP ALL OUTDOOR & FIELD WORK IMMEDIATELY',
      action: 'Move inside designated concrete shelter or pucca building. Disconnect loose cables and avoid waterlogged areas.'
    };
  }

  if (distanceKm <= 260 || localWindKmph >= 45 || localGustsKmph >= 60 || rainMm3h >= 25) {
    return {
      level: 'ORANGE',
      color: 'bg-amber-600 text-white',
      badge: 'border-amber-500 text-amber-400 bg-amber-950/60',
      title: 'ORANGE ALERT: Be Prepared',
      summary: 'SUSPEND FIELD WORK & SECURE PROPERTY',
      action: 'Wrap up agricultural/outdoor operations within 1 hour. Keep emergency torch, drinking water, and dry rations ready.'
    };
  }

  if (distanceKm <= 450 || localWindKmph >= 30 || localGustsKmph >= 45 || rainMm3h >= 10) {
    return {
      level: 'YELLOW',
      color: 'bg-yellow-500 text-slate-950',
      badge: 'border-yellow-500 text-yellow-400 bg-yellow-950/60',
      title: 'YELLOW ALERT: Watch & Monitor',
      summary: 'CYCLONIC DEPRESSION IN REGION',
      action: 'Frequent squally rain bands likely. Keep phones fully charged and do not venture into open sea or low-lying water bodies.'
    };
  }

  return {
    level: 'GREEN',
    color: 'bg-emerald-600 text-white',
    badge: 'border-emerald-500 text-emerald-400 bg-emerald-950/60',
    title: 'GREEN: Normal / Low Threat',
    summary: 'NO IMMEDIATE THREAT TO YOUR LOCATION',
    action: 'Storm is currently far from your area. Continue monitoring regular 3-hour bulletins.'
  };
}

// Multi-lingual Complete Voice & Text Briefing Scripts for Field Workers with Winter Protection Advice
export function generateVoiceBriefing(lang, threat, districtName, distanceKm, windSpeed, gustSpeed, directionText, minTemp = 17, maxTemp = 29) {
  const isRed = threat.level === 'RED';
  const isOrange = threat.level === 'ORANGE';

  // Winter jacket / coat protection advisory based on minimum temperature
  const isSevereCold = minTemp <= 10;
  const isChillyWinter = minTemp > 10 && minTemp <= 16;
  const isMildWinter = minTemp > 16 && minTemp <= 20;

  switch (lang) {
    case 'odia': {
      const winterSpeech = isSevereCold
        ? `ବିଶେଷ ଶୀତ ସତର୍କତା: ରାତି ଓ ସକାଳେ ସର୍ବନିମ୍ନ ତାପମାତ୍ରା ${minTemp} ଡିଗ୍ରୀକୁ ଖସିବ। ପ୍ରବଳ ଥଣ୍ଡା ପବନରୁ ରକ୍ଷା ପାଇବା ପାଇଁ ମୋଟା କୋଟ୍ (Coat) କିମ୍ବା ଭାରୀ ଜ୍ୟାକେଟ୍ (Heavy Jacket) ନିଶ୍ଚୟ ପିନ୍ଧନ୍ତୁ।`
        : isChillyWinter
        ? `ଶୀତ ପରାମର୍ଶ: ସର୍ବନିମ୍ନ ତାପମାତ୍ରା ${minTemp} ଡିଗ୍ରୀ ରହିବ। ସକାଳ ଓ ସନ୍ଧ୍ୟା ଡ୍ୟୁଟିରେ ଥଣ୍ଡା କାକରରୁ ରକ୍ଷା ପାଇବା ପାଇଁ ଫିଲ୍ଡ କର୍ମଚାରୀମାନେ ଜ୍ୟାକେଟ୍ କିମ୍ବା କୋଟ୍ (Jacket/Coat) ସାଙ୍ଗରେ ନିଅନ୍ତୁ।`
        : isMildWinter
        ? `ସକାଳେ ହାଲୁକା ଶୀତ (${minTemp} ଡିଗ୍ରୀ) ରହିବ, ସୁରକ୍ଷା ପାଇଁ ହାଲୁକା ଜ୍ୟାକେଟ୍ ସାଙ୍ଗରେ ରଖନ୍ତୁ।`
        : '';

      const winterPhonetic = isSevereCold
        ? `Seeta satarkata: Sarbanimna tapamatra ${minTemp} degree ku khasiba. Prabala thanda pabana tharu banchiba pain mota coat kimba heavy jacket nischaya pindhantu.`
        : isChillyWinter
        ? `Seeta paramarsa: Sarbanimna tapamatra ${minTemp} degree rahiba. Sakala o ratire thanda ru banchiba pain jacket kimba coat sangare niantu.`
        : '';

      const winterAction = isSevereCold
        ? `ମୋଟା କୋଟ୍ / ଭାରୀ ଜ୍ୟାକେଟ୍ ପିନ୍ଧନ୍ତୁ (${minTemp}°C)`
        : isChillyWinter
        ? `ଜ୍ୟାକେଟ୍ କିମ୍ବା କୋଟ୍ ସାଙ୍ଗରେ ନିଅନ୍ତୁ (${minTemp}°C)`
        : isMildWinter
        ? `ହାଲୁକା ଜ୍ୟାକେଟ୍ ନିଅନ୍ତୁ (${minTemp}°C)`
        : 'ପାଗ ଅନୁଯାୟୀ ସତର୍କ ରୁହନ୍ତୁ';

      return {
        headline: `ତୁଫାନ ସାଥୀ ସତର୍କ ସୂଚନା: ${isRed ? 'ଲାଲ୍ ଚେତାବନୀ (ରେଡ୍ ଆଲର୍ଟ)' : isOrange ? 'କମଳା ସତର୍କତା (ଅରେଞ୍ଜ ଆଲର୍ଟ)' : 'ହଳଦିଆ ସତର୍କତା'} - ${districtName}`,
        speech: `ସତର୍କ ସୂଚନା। ${districtName} ଅଞ୍ଚଳରେ ବାତ୍ୟା ଓ ଗଭୀର ଅବପାତର ତୀବ୍ର ପ୍ରଭାବ ରହିଛି। ବାତ୍ୟାର କେନ୍ଦ୍ରସ୍ଥଳ ଆପଣଙ୍କ ଠାରୁ ପ୍ରାୟ ${distanceKm} କିଲୋମିଟର ଦୂରରେ ଅବସ୍ଥିତ। ଏହି ସମୟରେ ପବନର ବେଗ ଘଣ୍ଟା ପ୍ରତି ${windSpeed} କିଲୋମିଟର ଏବଂ ଝଟକା ପବନ ${gustSpeed} କିଲୋମିଟର ପର୍ଯ୍ୟନ୍ତ ବୃଦ୍ଧି ପାଇପାରେ। ${
          isRed
            ? 'ସମସ୍ତ ଚାଷ କାମ, ଖଳାବାଡ଼ି କାର୍ଯ୍ୟ ଏବଂ ବାହାର କାମ ତୁରନ୍ତ ବନ୍ଦ କରନ୍ତୁ। ନିଜକୁ ଏବଂ ଗୃହପାଳିତ ପଶୁମାନଙ୍କୁ ସୁରକ୍ଷିତ ପକ୍କା ଘର କିମ୍ବା ନିକଟସ୍ଥ ବାତ୍ୟା ଆଶ୍ରୟସ୍ଥଳକୁ ନେଇଯାଆନ୍ତୁ। ବିଦ୍ୟୁତ ଖୁଣ୍ଟ ଓ ବଡ଼ ଗଛ ତଳେ ଆଶ୍ରୟ ନିଅନ୍ତୁ ନାହିଁ।'
            : isOrange
            ? 'ବାହାର କାମ ଶୀଘ୍ର ସାରି ସୁରକ୍ଷିତ ସ୍ଥାନକୁ ଫେରିଆସନ୍ତୁ। ମୋବାଇଲ୍ ଫୋନ୍ ଓ ଟର୍ଚ୍ଚ ଚାର୍ଜ ରଖନ୍ତୁ ଏବଂ ବିଶୁଦ୍ଧ ପିଇବା ପାଣି ସାଇତି ରଖନ୍ତୁ।'
            : 'ଆଗାମୀ କିଛି ଘଣ୍ଟା ମଧ୍ୟରେ ବର୍ଷା ଓ ଝଟକା ପବନ ବଢ଼ିପାରେ। ସତର୍କ ରୁହନ୍ତୁ ଏବଂ ସରକାରୀ ସୂଚନା ଉପରେ ନଜର ରଖନ୍ତୁ।'
        } ${winterSpeech}`,
        phoneticSpeech: `Satarka Suchana. ${districtName} anchalare batya o gabhira abapatara prabhava. Tufanara kendra apananka tharu praye ${distanceKm} kilometer durare achhi. Pabana beg ghanta prati ${windSpeed} ru ${gustSpeed} kilometer parjyanta badhipare. ${
          isRed
            ? 'Turanta samasta bahara kama banda kari pakka ghara kimba batya asrayasthalaku jaantu. Bidyuta khunta o bada gachha talare ruhantu nahin.'
            : 'Bahara kama sthagita rakhantu o surakshita sthanare ruhantu. Mobile phone charge rakhantu.'
        } ${winterPhonetic}`,
        actionSteps: [
          isRed ? 'ତୁରନ୍ତ ବାହାର କାମ ବନ୍ଦ କରନ୍ତୁ' : 'ବାହାର କାମ ସ୍ଥଗିତ ରଖନ୍ତୁ',
          'ପକ୍କା ଘର କିମ୍ବା ବାତ୍ୟା ଆଶ୍ରୟସ୍ଥଳକୁ ଯାଆନ୍ତୁ',
          winterAction,
          'ପାନୀୟ ଜଳ ଓ ଔଷଧ ସାଇତି ରଖନ୍ତୁ'
        ]
      };
    }
    
    case 'bengali': {
      const winterSpeech = isSevereCold
        ? `শীতকালীন সতর্কতা: রাতে ও ভোরে সর্বনিম্ন তাপমাত্রা ${minTemp} ডিগ্রি সেলসিয়াসে নামবে। তীব্র শৈত্য ও ঠান্ডা হাওয়া থেকে বাঁচতে মোটা কোট (Coat) বা ভারী জ্যাকেট (Jacket) সাথে রাখা বাধ্যতামূলক।`
        : isChillyWinter
        ? `শীতের পরামর্শ: সর্বনিম্ন তাপমাত্রা ${minTemp} ডিগ্রিতে নামবে। মাঠের কর্মীদের ভোরে ও রাতে ঠান্ডা বাতাস থেকে সুরক্ষার জন্য জ্যাকেট বা কোট (Jacket/Coat) পরিধান করার পরামর্শ দেওয়া হচ্ছে।`
        : isMildWinter
        ? `ভোরবেলা ঠান্ডা আমেজ (${minTemp} ডিগ্রি) থাকবে, হালকা জ্যাকেট সাথে রাখুন।`
        : '';

      const winterPhonetic = isSevereCold
        ? `Sheet kale bhorer o raater thanda theke banchte mota coat ba heavy jacket shonge rakhun.`
        : isChillyWinter
        ? `Raate o bhorbela sheet theke banchte jacket ba coat shonge rakhun.`
        : '';

      const winterAction = isSevereCold
        ? `গরম কোট / ভারী জ্যাকেট পরিধান করুন (${minTemp}°C)`
        : isChillyWinter
        ? `জ্যাকেট বা কোট সাথে রাখুন (${minTemp}°C)`
        : isMildWinter
        ? `হালকা জ্যাকেট সাথে রাখুন (${minTemp}°C)`
        : 'আবহাওয়া অনুযায়ী সতর্ক থাকুন';

      return {
        headline: `তুফান সাথী জরুরি সতর্কতা: ${isRed ? 'লাল সতর্কতা (রেড অ্যালার্ট)' : isOrange ? 'কমলা সতর্কতা' : 'হলুদ সতর্কতা'} - ${districtName}`,
        speech: `জরুরি আবহাওয়া বার্তা। ${districtName} জেলায় ঘূর্ণিঝড় ও গভীর নিম্নচাপের বিপজ্জনক প্রভাব শুরু হয়েছে। ঝড়ের কেন্দ্রস্থল আপনার অবস্থান থেকে প্রায় ${distanceKm} কিলোমিটার দূরে রয়েছে। বর্তমানে বাতাসের গতিবেগ ঘণ্টায় ${windSpeed} কিলোমিটার এবং দমকা বাতাসের গতি ${gustSpeed} কিলোমিটার পর্যন্ত পৌঁছাতে পারে। ${
          isRed
            ? 'অবিলম্বে মাঠের কাজ, কৃষি কাজ এবং বাইরের সমস্ত গতিবিধি বন্ধ করুন। নিজেকে এবং গবাদি পশুকে নিকটবর্তী সাইক্লোন শেল্টার বা পাকা বাড়িতে সরিয়ে নিন। কাঁচা ঘর, নড়বড়ে টিনের ছাউনি বা বিদ্যুতের খুঁটির নিচে থাকবেন না।'
            : isOrange
            ? 'বাইরের কাজ দ্রুত গুটিয়ে নিরাপদ স্থানে আশ্রয় নিন। মোবাইল ফোন ও ইমার্জেন্সি লাইট চার্জ করে রাখুন এবং পর্যাপ্ত পানীয় জল মজুত রাখুন।'
            : 'আগামী কয়েক ঘণ্টায় বৃষ্টি ও ঝোড়ো হাওয়ার তীব্রতা বাড়বে। নদী ও উপকূল তীরবর্তী এলাকায় যাবেন না এবং সতর্ক থাকুন।'
        } ${winterSpeech}`,
        phoneticSpeech: `Jaruri abahawa barta. ${districtName} elakay ghurnijhorer probhab. Jhorer kendra apnar theke ${distanceKm} kilometer dure ache. Bataser goti ${windSpeed} theke ${gustSpeed} kilometer hote pare. ${
          isRed
            ? 'Obilombe macher o matheer kaj bondho korun. Paka barite ashroy nin. Bidyuter khuti theke dure thakun.'
            : 'Bairer kaj bondho rakhun o shotorko thakun.'
        } ${winterPhonetic}`,
        actionSteps: [
          isRed ? 'অবিলম্বে মাঠের কাজ বন্ধ করুন' : 'বাইরের কাজ স্থগিত রাখুন',
          'পাকা বাড়ি বা সাইক্লোন শেল্টারে যান',
          winterAction,
          'শুকনো খাবার ও বিশুদ্ধ জল মজুত রাখুন'
        ]
      };
    }

    case 'hindi': {
      const winterSpeech = isSevereCold
        ? `शीत ऋतु चेतावनी: रात व सुबह का न्यूनतम तापमान गिरकर ${minTemp}°C तक पहुंचेगा। अत्यधिक ठंड व बर्फीली हवाओं से बचाव हेतु गर्म कोट (Coat) या भारी जैकेट (Heavy Jacket) अवश्य पहनें।`
        : isChillyWinter
        ? `शीत ऋतु सलाह: न्यूनतम तापमान ${minTemp}°C रहने का अनुमान है। सुबह व रात की ड्यूटी में ठंड से बचाव के लिए फील्ड कार्यकर्ता कोट या जैकेट (Coat/Jacket) अवश्य साथ रखें।`
        : isMildWinter
        ? `सुबह व रात में हल्की ठंड (${minTemp}°C) रहेगी, हल्की जैकेट साथ रखें।`
        : '';

      const winterPhonetic = isSevereCold
        ? `Sheet lahar se bachne ke liye garam coat ya heavy jacket awashya pehnein.`
        : isChillyWinter
        ? `Subah aur raat ki thand se bachne ke liye coat ya jacket saath rakhein.`
        : '';

      const winterAction = isSevereCold
        ? `गर्म कोट या भारी जैकेट पहनें (${minTemp}°C)`
        : isChillyWinter
        ? `कोट या जैकेट साथ रखें (${minTemp}°C)`
        : isMildWinter
        ? `हल्की जैकेट साथ रखें (${minTemp}°C)`
        : 'मौसम अनुसार सतर्क रहें';

      return {
        headline: `तूफान साथी चेतावनी: ${isRed ? 'रेड अलर्ट (अत्यधिक खतरा)' : isOrange ? 'ऑरेंज अलर्ट (सावधान)' : 'येलो अलर्ट (निगरानी)'} - ${districtName}`,
        speech: `आपातकालीन मौसम चेतावनी। ${districtName} क्षेत्र में चक्रवाती तूफान और गहरे दबाव का गंभीर प्रभाव देखा जा रहा है। तूफान का केंद्र आपसे लगभग ${distanceKm} किलोमीटर की दूरी पर है। हवा की गति ${windSpeed} किलोमीटर प्रति घंटा और झोंके ${gustSpeed} किलोमीटर प्रति घंटा तक पहुंच सकते हैं। ${
          isRed
            ? 'तुरंत सभी खेतों, कृषि कार्यों और बाहर के काम बंद कर दें। खुद को और मवेशियों को पक्के मकान या नजदीकी चक्रवात आश्रय में ले जाएं। बिजली के खंभों, तारों और पुराने पेड़ों से दूर रहें।'
            : isOrange
            ? 'बाहरी कार्य जल्दी समेटकर सुरक्षित स्थान पर पहुंचें। मोबाइल फोन चार्ज रखें और पीने का साफ पानी सुरक्षित रख लें।'
            : 'आने वाले घंटों में तेज बारिश और हवाओं की आशंका है। सतर्क रहें और आधिकारिक बुलेटिन सुनते रहें।'
        } ${winterSpeech}`,
        phoneticSpeech: `Aapatkalin mausam chetavani. ${districtName} kshetra mein toofan ka asar. Toofan ka kendra ${distanceKm} kilometer door hai. Hawa ki raftaar ${windSpeed} se ${gustSpeed} kilometer prati ghanta tak pahunch sakti hai. ${
          isRed
            ? 'Turant sabhi kheton aur bahar ke kaam band kar dein. Pakke makaan ya cyclone shelter mein chale jayein.'
            : 'Bahar ka kaam band rakhein aur surakshit rahein.'
        } ${winterPhonetic}`,
        actionSteps: [
          isRed ? 'तुरंत फील्ड व खेती का काम रोकें' : 'बाहरी काम स्थगित करें',
          'पक्के मकान या आश्रय स्थल में जाएं',
          winterAction,
          'पीने का पानी व टॉर्च तैयार रखें'
        ]
      };
    }

    case 'gujarati': {
      const winterSpeech = isSevereCold
        ? `શિયાળાની ચેતવણી: રાત અને વહેલી સવારે લઘુત્તમ તાપમાન ${minTemp}°C સુધી ઘટી શકે છે. ઠંડા પવનોથી બચવા માટે ગરમ કોટ (Coat) અથવા ભારે જેકેટ (Heavy Jacket) પહેરવું જરૂરી છે.`
        : isChillyWinter
        ? `શિયાળાની સલાહ: લઘુત્તમ તાપમાન ${minTemp}°C રહેવાની સંભાવના છે. સવાર અને રાત્રિ દરમિયાન ઠંડીથી બચવા માટે ફીલ્ડ સ્ટાફે જેકેટ કે કોટ સાથે રાખવો.`
        : isMildWinter
        ? `વહેલી સવારે હળવી ઠંડી (${minTemp}°C) રહેશે, હળવું જેકેટ સાથે રાખો.`
        : '';

      const winterPhonetic = isSevereCold
        ? `Thandi thi bachva mate garam coat ke heavy jacket pehro.`
        : isChillyWinter
        ? `Thandi thi bachva mate jacket ke coat sathe rakho.`
        : '';

      const winterAction = isSevereCold
        ? `ગરમ કોટ અથવા ભારે જેકેટ પહેરો (${minTemp}°C)`
        : isChillyWinter
        ? `જેકેટ અથવા કોટ સાથે રાખો (${minTemp}°C)`
        : isMildWinter
        ? `હળવું જેકેટ સાથે રાખો (${minTemp}°C)`
        : 'હવામાન મુજબ સાવચેત રહો';

      return {
        headline: `તૂફાન સાથી ચેતવણી: ${isRed ? 'રેડ એલર્ટ (ભારે ખતરો)' : isOrange ? 'ઓરેન્જ એલર્ટ (સાવધાન)' : 'યલો એલર્ટ'} - ${districtName}`,
        speech: `કટોકટી હવામાન ચેતવણી. ${districtName} વિસ્તારમાં વાવાઝોડા અને ઊંડા દબાણની ગંભીર અસર છે. વાવાઝોડાનું કેન્દ્ર તમારાથી આશરે ${distanceKm} કિલોમીટર દૂર છે. પવનની ઝડપ ${windSpeed} કિમી/કલાક અને ઝાપટાં ${gustSpeed} કિમી/કલાક સુધી પહોંચી શકે છે. ${
          isRed
            ? 'તરત જ ખેતર અને બહારના તમામ કામો બંધ કરો. પાકા મકાન કે સલામત આશ્રયસ્થાનમાં ખસી જાઓ. વીજળીના થાંભલા અને ઝાડથી દૂર રહો.'
            : isOrange
            ? 'બહારના કામો ઝડપથી પતાવી સલામત સ્થળે પહોંચો. મોબાઈલ ફોન ચાર્જ રાખો અને પીવાનું ચોખ્ખું પાણી સંગ્રહ કરો.'
            : 'આવતા કલાકોમાં ભારે પવન અને વરસાદની શક્યતા છે. સાવચેત રહો અને સત્તાવાર બુલેટિન સાંભળતા રહો.'
        } ${winterSpeech}`,
        phoneticSpeech: `Vavazodu chetavani. ${districtName} vistar ma toofan no asar. Kendra tamara thi ${distanceKm} kilometer door che. Pavan ni zadap ${windSpeed} thi ${gustSpeed} kilometer pahuche shake che. ${
          isRed
            ? 'Khetar na kamo turant bandh karo ane pakka makan ma aashray lyo.'
            : 'Bahar na kamo bandh rakho ane surakshit sthale raho.'
        } ${winterPhonetic}`,
        actionSteps: [
          isRed ? 'તરત જ ખેતી અને બહારનું કામ બંધ કરો' : 'બહારનું કામ સ્થગિત કરો',
          'પાકા મકાન કે વાવાઝોડા આશ્રયમાં જાઓ',
          winterAction,
          'પીવાનું પાણી અને ટોર્ચ તૈયાર રાખો'
        ]
      };
    }

    case 'telugu': {
      const winterSpeech = isSevereCold
        ? `శీతాకాల హెచ్చరిక: రాత్రి మరియు తెల్లవారుజామున కనిష్ట ఉష్ణోగ్రత ${minTemp}°C కి పడిపోవచ్చు. చలిగాలుల నుండి రక్షణ కోసం మందపాటి కోట్ (Coat) లేదా భారీ జాకెట్ (Heavy Jacket) ధరించడం తప్పనిసరి.`
        : isChillyWinter
        ? `శీతాకాల సూచన: కనిష్ట ఉష్ణోగ్రత ${minTemp}°C గా నమోదయ్యే అవకాశం ఉంది. ఉదయం మరియు రాత్రి వేళల్లో చలి నుండి రక్షణ కోసం ఫీల్డ్ సిబ్బంది జాకెట్ లేదా కోట్ వెంట ఉంచుకోవాలి.`
        : isMildWinter
        ? `ఉదయం వేళ స్వల్ప చలి (${minTemp}°C) ఉంటుంది, తేలికపాటి జాకెట్ ఉంచుకోండి.`
        : '';

      const winterPhonetic = isSevereCold
        ? `Chali gaalula nundi rakshana kosam garam coat leda heavy jacket dharinchandi.`
        : isChillyWinter
        ? `Chali nundi rakshana kosam jacket leda coat ventane unchukondi.`
        : '';

      const winterAction = isSevereCold
        ? `మందపాటి కోట్ లేదా జాకెట్ ధరించండి (${minTemp}°C)`
        : isChillyWinter
        ? `జాకెట్ లేదా కోట్ వెంట ఉంచుకోండి (${minTemp}°C)`
        : isMildWinter
        ? `తేలికపాటి జాకెట్ ఉంచుకోండి (${minTemp}°C)`
        : 'వాతావరణం ప్రకారం జాగ్రత్త వహించండి';

      return {
        headline: `తూఫాన్ సాథీ హెచ్చరిక: ${isRed ? 'రెడ్ అలర్ట్ (తీవ్ర ప్రమాదం)' : isOrange ? 'ఆరెంజ్ అలర్ట్ (అప్రమత్తం)' : 'ఎల్లో అలర్ట్'} - ${districtName}`,
        speech: `అత్యవసర వాతావరణ హెచ్చరిక. ${districtName} ప్రాంతంలో తుఫాను మరియు తీవ్ర వాయుగుండం ప్రభావం ఉంది. తుఫాను కేంద్రం మీకు సుమారు ${distanceKm} కిలోమీటర్ల దూరంలో ఉంది. గాలి వేగం గంటకు ${windSpeed} కిలోమీటర్లు మరియు ఈదురుగాలులు ${gustSpeed} కిలోమీటర్ల వరకు పెరిగే అవకాశం ఉంది. ${
          isRed
            ? 'వెంటనే పొలం మరియు బహిరంగ పనులన్నీ నిలిపివేయండి. పక్కా భవనాలు లేదా తుఫాను పునరావాస కేంద్రాలకు చేరుకోండి. విద్యుత్ స్తంభాలు, చెట్ల కింద ఉండకండి.'
            : isOrange
            ? 'బయటి పనులు త్వరగా ముగించి సురక్షిత ప్రాంతాలకు చేరుకోండి. మొబైల్ ఫోన్లు ఛార్జ్ చేసుకోండి, తాగునీరు నిల్వ చేసుకోండి.'
            : 'రాబోయే గంటల్లో భారీ వర్షాలు, ఈదురుగాలులు వీచే అవకాశం ఉంది. జాగ్రత్తగా ఉండండి.'
        } ${winterSpeech}`,
        phoneticSpeech: `Toofan hecharika. ${districtName} pranthamlo toofanu prabhavam. Kendra meelanti ${distanceKm} kilometerla dooramlo undi. Gaali vegam ${windSpeed} nundi ${gustSpeed} kilometerla varaku peruguthundi. ${
          isRed
            ? 'Ventane polam panulu aapandi. Pakka bhavanamuloki vellandi.'
            : 'Bayata panulu aapi surakshitanga undandi.'
        } ${winterPhonetic}`,
        actionSteps: [
          isRed ? 'వెంటనే వ్యవసాయ మరియు బయటి పనులు ఆపండి' : 'బయటి పనులను వాయిదా వేయండి',
          'పక్కా భవనం లేదా తుఫాను షెల్టర్‌కు వెళ్లండి',
          winterAction,
          'తాగునీరు, టార్చ్ లైట్ సిద్ధంగా ఉంచుకోండి'
        ]
      };
    }

    case 'tamil': {
      const winterSpeech = isSevereCold
        ? `குளிர்கால எச்சரிக்கை: இரவு மற்றும் அதிகாலை குறைந்தபட்ச வெப்பநிலை ${minTemp}°C ஆக குறையும். கடுமையான குளிரில் இருந்து பாதுகாக்க கனமான கோட் (Coat) அல்லது ஜாக்கெட் (Heavy Jacket) அணியவும்.`
        : isChillyWinter
        ? `குளிர்கால ஆலோசனை: குறைந்தபட்ச வெப்பநிலை ${minTemp}°C ஆக இருக்கும். அதிகாலை மற்றும் இரவு பணிகளில் குளிரில் இருந்து பாதுகாக்க களப்பணியாளர்கள் ஜாக்கெட் அல்லது கோட் உடன் வைத்திருக்கவும்.`
        : isMildWinter
        ? `அதிகாலையில் லேசான குளிர் (${minTemp}°C) நிலவும், லேசான ஜாக்கெட் உடன் வைக்கவும்.`
        : '';

      const winterPhonetic = isSevereCold
        ? `Kulir kaatril irunthu paathukaaka ganamana coat allathu jacket aniyavum.`
        : isChillyWinter
        ? `Kuliril irunthu paathukaaka jacket allathu coat udan vaithirukavum.`
        : '';

      const winterAction = isSevereCold
        ? `கனமான கோட் அல்லது ஜாக்கெட் அணியவும் (${minTemp}°C)`
        : isChillyWinter
        ? `ஜாக்கெட் அல்லது கோட் உடன் வைக்கவும் (${minTemp}°C)`
        : isMildWinter
        ? `லேசான ஜாக்கெட் உடன் வைக்கவும் (${minTemp}°C)`
        : 'வானிலைக்கு ஏற்ப பாதுகாப்பாக இருங்கள்';

      return {
        headline: `தூபான் சாதி அவசர எச்சரிக்கை: ${isRed ? 'சிவப்பு எச்சரிக்கை (ரெட் அலர்ட்)' : isOrange ? 'ஆரஞ்சு எச்சரிக்கை' : 'மஞ்சள் எச்சரிக்கை'} - ${districtName}`,
        speech: `அவசர வானிலை எச்சரிக்கை. ${districtName} பகுதியில் புயல் மற்றும் தீவிர காற்றழுத்த தாழ்வு மண்டலத்தின் தாக்கம் தொடங்கியுள்ளது. புயலின் மையம் உங்களிலிருந்து சுமார் ${distanceKm} கி.மீ தொலைவில் உள்ளது. காற்றின் வேகம் மணிக்கு ${windSpeed} கி.மீ மற்றும் பலத்த காற்று ${gustSpeed} கி.மீ வரை வீசக்கூடும். ${
          isRed
            ? 'விவசாயம் மற்றும் வெளிப்புற பணிகளை உடனடியாக நிறுத்துங்கள். கான்கிரீட் கட்டிடங்கள் அல்லது புயல் பாதுகாப்பு மையங்களுக்கு செல்லுங்கள். மின்கம்பங்கள் மற்றும் மரங்களின் கீழ் நிற்காதீர்கள்.'
            : isOrange
            ? 'வெளிப்புற வேலைகளை முடித்து பாதுகாப்பான இடத்திற்கு செல்லுங்கள். மொபைல் போன்களை சார்ஜ் செய்து குடிநீர் சேமித்து வைக்கவும்.'
            : 'அடுத்த சில மணிநேரங்களில் பலத்த காற்றுடன் கனமழை பெய்யக்கூடும். எச்சரிக்கையுடன் இருங்கள்.'
        } ${winterSpeech}`,
        phoneticSpeech: `Puyal echarikkai. ${districtName} paguthiyil puyalin thakkam. Puyal maiyam ungalil irunthu ${distanceKm} kilometer tholaivil ullathu. Kaatrin vegam ${windSpeed} mudhal ${gustSpeed} kilometer varai veesalam. ${
          isRed
            ? 'Velaiyai udanadiyaga niruthi pakka veetirku sellavum.'
            : 'Veliyil selvathai thavirthu paathukaapaga irungal.'
        } ${winterPhonetic}`,
        actionSteps: [
          isRed ? 'வெளிப்புற மற்றும் விவசாய பணிகளை உடனே நிறுத்துங்கள்' : 'வெளிப்புற பணிகளை ஒத்திவையுங்கள்',
          'பாதுகாப்பான கான்கிரீட் கட்டிடத்திற்கு செல்லுங்கள்',
          winterAction,
          'குடிநீர் மற்றும் டார்ச் லைட் தயார் நிலையில் வைக்கவும்'
        ]
      };
    }

    case 'malayalam': {
      const winterSpeech = isSevereCold
        ? `ശൈത്യകാല മുന്നറിയിപ്പ്: രാത്രിയിലും പുലർച്ചെയും കുറഞ്ഞ താപനില ${minTemp}°C ആയി കുറയും. കഠിനമായ തണുപ്പിൽ നിന്നും കാറ്റിൽ നിന്നും രക്ഷനേടാൻ കട്ടിയുള്ള കോട്ട് (Coat) അല്ലെങ്കിൽ ജാക്കറ്റ് (Heavy Jacket) ധരിക്കുക.`
        : isChillyWinter
        ? `ശൈത്യകാല നിർദ്ദേശം: കുറഞ്ഞ താപനില ${minTemp}°C ആയിരിക്കും. അതിരാവിലെയും രാത്രിയിലുമുള്ള തണുപ്പിൽ നിന്നും രക്ഷനേടാൻ ഫീൽഡ് ജീവനക്കാർ ജാക്കറ്റോ കോട്ടോ കരുതുക.`
        : isMildWinter
        ? `പുലർച്ചെ നേരിയ തണുപ്പ് (${minTemp}°C) അനുഭവപ്പെടും, നേർത്ത ജാക്കറ്റ് കരുതുക.`
        : '';

      const winterPhonetic = isSevereCold
        ? `Thanuppedukkathirikkan kattiulla coat allengil heavy jacket dharikkuka.`
        : isChillyWinter
        ? `Thanuppedukkathirikkan jacket allengil coat koode karuthuka.`
        : '';

      const winterAction = isSevereCold
        ? `കട്ടിയുള്ള കോട്ട് അല്ലെങ്കിൽ ജാക്കറ്റ് ധരിക്കുക (${minTemp}°C)`
        : isChillyWinter
        ? `ജാക്കറ്റ് അല്ലെങ്കിൽ കോട്ട് കരുതുക (${minTemp}°C)`
        : isMildWinter
        ? `നേർത്ത ജാക്കറ്റ് കരുതുക (${minTemp}°C)`
        : 'കാലാവസ്ഥയ്ക്കനുസരിച്ച് ജാഗ്രത പാലിക്കുക';

      return {
        headline: `തൂഫാൻ സാഥി അടിയന്തര മുന്നറിയിപ്പ്: ${isRed ? 'റെഡ് അലർട്ട് (അതീവ ജാഗ്രത)' : isOrange ? 'ഓറഞ്ച് അലർട്ട്' : 'മഞ്ഞ അലർട്ട്'} - ${districtName}`,
        speech: `അടിയന്തര കാലാവസ്ഥാ മുന്നറിയിപ്പ്. ${districtName} പ്രദേശത്ത് ചുഴലിക്കാറ്റും തീവ്ര ന്യൂനമർദ്ദവും ശക്തമാകുന്നു. കാറ്റിന്റെ കേന്ദ്രം നിങ്ങളിൽ നിന്ന് ഏകദേശം ${distanceKm} കിലോമീറ്റർ അകലെയാണ്. കാറ്റിന്റെ വേഗത മണിക്കൂറിൽ ${windSpeed} കി.മീറ്ററും വേഗത കൂടിയ കാറ്റ് ${gustSpeed} കി.മീറ്റർ വരെയും വീശാം. ${
          isRed
            ? 'കൃഷിപ്പണികളും പുറംജോലികളും ഉടൻ നിർത്തിവെക്കുക. കോൺക്രീറ്റ് കെട്ടിടങ്ങളിലോ ദുരിതാശ്വാസ ക്യാമ്പുകളിലോ അഭയം തേടുക. ഇലക്ട്രിക് പോസ്റ്റുകളുടെയും മരങ്ങളുടെയും അടിയിൽ നിൽക്കരുത്.'
            : isOrange
            ? 'പുറംജോലികൾ വേഗത്തിൽ പൂർത്തിയാക്കി സുരക്ഷിത സ്ഥാനങ്ങളിലേക്ക് മാറുക. മൊബൈൽ ഫോണുകൾ ചാർജ്ജ് ചെയ്യുക, കുടിവെള്ളം ശേഖരിക്കുക.'
            : 'വരും മണിക്കൂറുകളിൽ ശക്തമായ മഴയ്ക്കും കാറ്റിനും സാധ്യതയുണ്ട്. ജാഗ്രത പാലിക്കുക.'
        } ${winterSpeech}`,
        phoneticSpeech: `Chuzhalikkaatu munnariyippu. ${districtName} pradesheth kaatinte prabhavam. Kendram ningalil ninnu ${distanceKm} kilometer aakale aanu. Kaatinte vegatha ${windSpeed} muthal ${gustSpeed} kilometer vare aavam. ${
          isRed
            ? 'Puram jolaikal nirthi surakshitha sthanathekku maaruka.'
            : 'Jagratha paalikkuka, surakshitharayirikkuka.'
        } ${winterPhonetic}`,
        actionSteps: [
          isRed ? 'പുറംജോലികളും കൃഷിയും ഉടൻ നിർത്തിവെക്കുക' : 'അത്യാവശ്യമല്ലാത്ത പുറംജോലികൾ ഒഴിവാക്കുക',
          'കോൺക്രീറ്റ് കെട്ടിടത്തിലേക്കോ ഷെൽട്ടറിലേക്കോ മാറുക',
          winterAction,
          'കുടിവെള്ളവും എമർജൻസി ലൈറ്റും കരുതുക'
        ]
      };
    }

    case 'kannada': {
      const winterSpeech = isSevereCold
        ? `ಚಳಿಗಾಲದ ಎಚ್ಚರಿಕೆ: ರಾತ್ರಿ ಮತ್ತು ಮುಂಜಾನೆ ಕನಿಷ್ಠ ತಾಪಮಾನ ${minTemp}°C ಗೆ ಇಳಿಯಲಿದೆ. ತೀವ್ರ ಚಳಿಗಾಳಿಯಿಂದ ರಕ್ಷಣೆ ಪಡೆಯಲು ದಪ್ಪ ಕೋಟ್ (Coat) ಅಥವಾ ಜಾಕೆಟ್ (Heavy Jacket) ಧರಿಸುವುದು ಕಡ್ಡಾಯ.`
        : isChillyWinter
        ? `ಚಳಿಗಾಲದ ಸಲಹೆ: ಕನಿಷ್ಠ ತಾಪಮಾನ ${minTemp}°C ಇರಲಿದೆ. ಮುಂಜಾನೆ ಮತ್ತು ರಾತ್ರಿಯ ಕರ್ತವ್ಯದಲ್ಲಿ ಚಳಿಯಿಂದ ರಕ್ಷಣೆ ಪಡೆಯಲು ಸಿಬ್ಬಂದಿ ಜಾಕೆಟ್ ಅಥವಾ ಕೋಟ್ ಜೊತೆಯಲ್ಲಿಟ್ಟುಕೊಳ್ಳಬೇಕು.`
        : isMildWinter
        ? `ಮುಂಜಾನೆ ಲಘು ಚಳಿ (${minTemp}°C) ಇರಲಿದೆ, ತೆಳುವಾದ ಜಾಕೆಟ್ ಜೊತೆಯಲ್ಲಿಡಿ.`
        : '';

      const winterPhonetic = isSevereCold
        ? `Chaliyinda rakshanege garam coat athava heavy jacket dharisi.`
        : isChillyWinter
        ? `Chaliyinda rakshanege jacket athava coat jotheyallidi.`
        : '';

      const winterAction = isSevereCold
        ? `ದಪ್ಪ ಕೋಟ್ ಅಥವಾ ಜಾಕೆಟ್ ಧರಿಸಿ (${minTemp}°C)`
        : isChillyWinter
        ? `ಜಾಕೆಟ್ ಅಥವಾ ಕೋಟ್ ಜೊತೆಯಲ್ಲಿಡಿ (${minTemp}°C)`
        : isMildWinter
        ? `ತೆಳುವಾದ ಜಾಕೆಟ್ ಜೊತೆಯಲ್ಲಿಡಿ (${minTemp}°C)`
        : 'ಹವಾಮಾನಕ್ಕೆ ತಕ್ಕಂತೆ ಜಾಗರೂಕರಾಗಿರಿ';

      return {
        headline: `ತೂಫಾನ್ ಸಾಥಿ ತುರ್ತು ಎಚ್ಚರಿಕೆ: ${isRed ? 'ಕೆಂಪು ಎಚ್ಚರಿಕೆ (ರೆಡ್ ಅಲರ್ಟ್)' : isOrange ? 'ಕಿತ್ತಳೆ ಎಚ್ಚರಿಕೆ' : 'ಹಳದಿ ಎಚ್ಚರಿಕೆ'} - ${districtName}`,
        speech: `ತುರ್ತು ಹವಾಮಾನ ಎಚ್ಚರಿಕೆ. ${districtName} ಪ್ರದೇಶದಲ್ಲಿ ಚಂಡಮಾರುತ ಮತ್ತು ತೀವ್ರ ವಾಯುಭಾರ ಕುಸಿತದ ಪರಿಣಾಮ ಆರಂಭವಾಗಿದೆ. ಚಂಡಮಾರುತದ ಕೇಂದ್ರವು ನಿಮ್ಮಿಂದ ಸುಮಾರು ${distanceKm} ಕಿ.ಮೀ ದೂರದಲ್ಲಿದೆ. ಗಾಳಿಯ ವೇಗ ಗಂಟೆಗೆ ${windSpeed} ಕಿ.ಮೀ ಮತ್ತು ಬಿರುಗಾಳಿ ${gustSpeed} ಕಿ.ಮೀ ವರೆಗೆ ತಲುಪಬಹುದು. ${
          isRed
            ? 'ತಕ್ಷಣವೇ ಕೃಷಿ ಮತ್ತು ಹೊರಾಂಗಣ ಕೆಲಸಗಳನ್ನು ನಿಲ್ಲಿಸಿ. ಪಕ್ಕಾ ಕಟ್ಟಡ ಅಥವಾ ಚಂಡಮಾರುತ ಆಶ್ರಯ ತಾಣಗಳಿಗೆ ತೆರಳಿ. ವಿದ್ಯುತ್ ಕಂಬಗಳು ಮತ್ತು ಮರಗಳ ಕೆಳಗೆ ನಿಲ್ಲಬೇಡಿ.'
            : isOrange
            ? 'ಹೊರಾಂಗಣ ಕೆಲಸಗಳನ್ನು ಬೇಗ ಮುಗಿಸಿ ಸುರಕ್ಷಿತ ಸ್ಥಳಕ್ಕೆ ತೆರಳಿ. ಮೊಬೈಲ್ ಫೋನ್‌ಗಳನ್ನು ಚಾರ್ಜ್ ಮಾಡಿ ಮತ್ತು ಕುಡಿಯುವ ನೀರನ್ನು ಸಂಗ್ರಹಿಸಿ.'
            : 'ಮುಂದಿನ ಕೆಲ ಗಂಟೆಗಳಲ್ಲಿ ಭಾರಿ ಮಳೆ ಮತ್ತು ಗಾಳಿ ಬೀಸುವ ಸಾಧ್ಯತೆಯಿದೆ. ಎಚ್ಚರಿಕೆಯಿಂದಿರಿ.'
        } ${winterSpeech}`,
        phoneticSpeech: `Toofan eccharike. ${districtName} pradeshalli toofanina prabhava. Kendravu nimminda ${distanceKm} kilometer dooradallide. Gaaliya vega ${windSpeed} rinda ${gustSpeed} kilometer varege irabahudu. ${
          isRed
            ? 'Taksanave horangana kelasa nillisi surakshitha sthalakke hogi.'
            : 'Horangana kelasa thadeyiri, jagruthiyagiriri.'
        } ${winterPhonetic}`,
        actionSteps: [
          isRed ? 'ತಕ್ಷಣವೇ ಕೃಷಿ ಮತ್ತು ಹೊರಗಿನ ಕೆಲಸಗಳನ್ನು ನಿಲ್ಲಿಸಿ' : 'ಹೊರಗಿನ ಕೆಲಸಗಳನ್ನು ಮುಂದೂಡಿ',
          'ಪಕ್ಕಾ ಕಟ್ಟಡ ಅಥವಾ ಆಶ್ರಯ ತಾಣಕ್ಕೆ ತೆರಳಿ',
          winterAction,
          'ಕುಡಿಯುವ ನೀರು ಮತ್ತು ಟಾರ್ಚ್ ಸಿದ್ಧವಾಗಿಡಿ'
        ]
      };
    }

    case 'english':
    default: {
      const winterSpeech = isSevereCold
        ? `Severe Winter Cold Alert: Minimum temperature will plunge to ${minTemp}°C. Wearing a heavy winter jacket, warm coat, and protective thermal gear is strictly advised against cold exposure and wind chill.`
        : isChillyWinter
        ? `Winter Protection Advisory: Minimum temperature is expected to drop to ${minTemp}°C. Field personnel must carry a warm jacket or coat to safeguard against early morning and night-time chills.`
        : isMildWinter
        ? `Mild Winter Condition: Minimum temperature around ${minTemp}°C. Carry a light jacket or windcheater for early morning field duties.`
        : '';

      const winterAction = isSevereCold
        ? `Wear heavy coat or winter jacket (${minTemp}°C low)`
        : isChillyWinter
        ? `Carry jacket or coat for morning cold (${minTemp}°C)`
        : isMildWinter
        ? `Carry light jacket or windcheater (${minTemp}°C)`
        : 'Dress appropriately for current weather';

      return {
        headline: `ToofanSathi Emergency Alert: ${threat.level} Level for ${districtName}`,
        speech: `Attention field workers. Severe cyclone and depression alert for ${districtName}. The storm center is currently located approximately ${distanceKm} kilometers away towards the ${directionText}. Local surface winds are ${windSpeed} kilometers per hour with violent gusts reaching up to ${gustSpeed} kilometers per hour. ${
          isRed
            ? 'Cease all outdoor, agricultural, and field operations immediately. Evacuate low-lying areas and take shelter in concrete buildings or government multi-purpose cyclone shelters. Stay away from electric poles, tin roofs, and tall trees.'
            : isOrange
            ? 'Wrap up outdoor tasks and return to safe shelters within the hour. Keep phones, battery banks, and emergency lights charged, and store clean drinking water.'
            : 'Expect squally winds and rain bands in the coming hours. Exercise caution and do not venture into open water bodies or sea coast.'
        } ${winterSpeech}`,
        phoneticSpeech: null,
        actionSteps: [
          isRed ? 'Stop all field activities immediately' : 'Suspend non-essential outdoor work',
          'Move to concrete shelter or pucca building',
          winterAction,
          'Stock drinking water and emergency battery'
        ]
      };
    }
  }
}
