// All-India Cyclone & Depression Tracking Engine (Bay of Bengal, Arabian Sea, and Inland Depressions)

export const ALL_INDIA_ACTIVE_STORMS = [
  {
    id: 'BOB-01-2026',
    basin: 'Bay of Bengal',
    name: 'Dana / Bay of Bengal System',
    status: 'Deep Depression / Cyclonic Storm',
    center: {
      lat: 19.45,
      lon: 87.80,
      locationDesc: 'Northwest Bay of Bengal, ~160 km SE of Paradip, ~220 km SSE of Sagar Island'
    },
    movement: {
      direction: 'North-Northwest (NNW)',
      speedKmph: 18,
      headingDeg: 340
    },
    centralPressureHpa: 994,
    maxSustainedWindKmph: 75,
    peakGustsKmph: 95,
    landfall: {
      predictedArea: 'Between Puri and Digha (near Dhamra/Bhadrak coast)',
      window: 'Within next 18-24 hours',
      status: 'Approaching Coast'
    },
    imdWarningStage: 'Cyclone Warning (Orange to Red for coastal belts)',
    bulletinTime: '19-Nov-2026 15:30 IST',
    source: 'IMD RSMC New Delhi',

    // Foreign Meteorological Agencies Comparison
    agencyComparison: [
      {
        agency: 'IMD (India)',
        fullname: 'India Meteorological Department (RSMC New Delhi)',
        flag: '🇮🇳',
        status: 'Deep Depression / Cyclonic Storm',
        windSpeed: '75 km/h (40 knots)',
        windStandard: '3-min sustained (IMD Standard)',
        peakGusts: '95 km/h (51 knots)',
        centralPressure: '994 hPa',
        landfallEstimate: 'Between Puri & Digha (near Dhamra/Bhadrak coast)',
        confidence: 'High (Primary RSMC Mandate)'
      },
      {
        agency: 'JTWC (USA)',
        fullname: 'Joint Typhoon Warning Center (US Navy / Air Force, Hawaii)',
        flag: '🇺🇸',
        status: 'Tropical Cyclone 01B (Developing)',
        windSpeed: '85 km/h (45 knots)',
        windStandard: '1-min sustained (US Saffir-Simpson Standard)',
        peakGusts: '105 km/h (57 knots)',
        centralPressure: '992 hPa',
        landfallEstimate: 'Northern Odisha / West Bengal border, expected in 20-22 hrs',
        confidence: 'High (Close track alignment with IMD)'
      },
      {
        agency: 'ECMWF (Europe)',
        fullname: 'European Centre for Medium-Range Weather Forecasts (IFS Model)',
        flag: '🇪🇺',
        status: 'Deep Cyclonic Depression (Ensemble Mean)',
        windSpeed: '78 km/h (42 knots)',
        windStandard: '10-min sustained (WMO Standard)',
        peakGusts: '98 km/h (53 knots)',
        centralPressure: '993 hPa',
        landfallEstimate: 'Coastal Odisha (Bhadrak / Balasore sector), landfall window ~18:00 UTC',
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

// Multi-lingual Complete Voice & Text Briefing Scripts for Field Workers
export function generateVoiceBriefing(lang, threat, districtName, distanceKm, windSpeed, gustSpeed, directionText) {
  const isRed = threat.level === 'RED';
  const isOrange = threat.level === 'ORANGE';

  switch (lang) {
    case 'odia':
      return {
        headline: `ତୁଫାନ ସାଥୀ ସତର୍କ ସୂଚନା: ${isRed ? 'ଲାଲ୍ ଚେତାବନୀ (ରେଡ୍ ଆଲର୍ଟ)' : isOrange ? 'କମଳା ସତର୍କତା (ଅରେଞ୍ଜ ଆଲର୍ଟ)' : 'ହଳଦିଆ ସତର୍କତା'} - ${districtName}`,
        speech: `ସତର୍କ ସୂଚନା। ${districtName} ଅଞ୍ଚଳରେ ବାତ୍ୟା ଓ ଗଭୀର ଅବପାତର ତୀବ୍ର ପ୍ରଭାବ ରହିଛି। ବାତ୍ୟାର କେନ୍ଦ୍ରସ୍ଥଳ ଆପଣଙ୍କ ଠାରୁ ପ୍ରାୟ ${distanceKm} କିଲୋମିଟର ଦୂରରେ ଅବସ୍ଥିତ। ଏହି ସମୟରେ ପବନର ବେଗ ଘଣ୍ଟା ପ୍ରତି ${windSpeed} କିଲୋମିଟର ଏବଂ ଝଟକା ପବନ ${gustSpeed} କିଲୋମିଟର ପର୍ଯ୍ୟନ୍ତ ବୃଦ୍ଧି ପାଇପାରେ। ${
          isRed
            ? 'ସମସ୍ତ ଚାଷ କାମ, ଖଳାବାଡ଼ି କାର୍ଯ୍ୟ ଏବଂ ବାହାର କାମ ତୁରନ୍ତ ବନ୍ଦ କରନ୍ତୁ। ନିଜକୁ ଏବଂ ଗୃହପାଳିତ ପଶୁମାନଙ୍କୁ ସୁରକ୍ଷିତ ପକ୍କା ଘର କିମ୍ବା ନିକଟସ୍ଥ ବାତ୍ୟା ଆଶ୍ରୟସ୍ଥଳକୁ ନେଇଯାଆନ୍ତୁ। ବିଦ୍ୟୁତ ଖୁଣ୍ଟ ଓ ବଡ଼ ଗଛ ତଳେ ଆଶ୍ରୟ ନିଅନ୍ତୁ ନାହିଁ।'
            : isOrange
            ? 'ବାହାର କାମ ଶୀଘ୍ର ସାରି ସୁରକ୍ଷିତ ସ୍ଥାନକୁ ଫେରିଆସନ୍ତୁ। ମୋବାଇଲ୍ ଫୋନ୍ ଓ ଟର୍ଚ୍ଚ ଚାର୍ଜ ରଖନ୍ତୁ ଏବଂ ବିଶୁଦ୍ଧ ପିଇବା ପାଣି ସାଇତି ରଖନ୍ତୁ।'
            : 'ଆଗାମୀ କିଛି ଘଣ୍ଟା ମଧ୍ୟରେ ବର୍ଷା ଓ ଝଟକା ପବନ ବଢ଼ିପାରେ। ସତର୍କ ରୁହନ୍ତୁ ଏବଂ ସରକାରୀ ସୂଚନା ଉପରେ ନଜର ରଖନ୍ତୁ।'
        }`,
        phoneticSpeech: `Satarka Suchana. ${districtName} anchalare batya o gabhira abapatara prabhava. Tufanara kendra apananka tharu praye ${distanceKm} kilometer durare achhi. Pabana beg ghanta prati ${windSpeed} ru ${gustSpeed} kilometer parjyanta badhipare. ${
          isRed
            ? 'Turanta samasta bahara kama banda kari pakka ghara kimba batya asrayasthalaku jaantu. Bidyuta khunta o bada gachha talare ruhantu nahin.'
            : 'Bahara kama sthagita rakhantu o surakshita sthanare ruhantu. Mobile phone charge rakhantu.'
        }`,
        actionSteps: [
          isRed ? 'ତୁରନ୍ତ ବାହାର କାମ ବନ୍ଦ କରନ୍ତୁ' : 'ବାହାର କାମ ସ୍ଥଗିତ ରଖନ୍ତୁ',
          'ପକ୍କା ଘର କିମ୍ବା ବାତ୍ୟା ଆଶ୍ରୟସ୍ଥଳକୁ ଯାଆନ୍ତୁ',
          'ବିଦ୍ୟୁତ୍ ତାର ଓ ଗଛ ଠାରୁ ଦୂରେଇ ରୁହନ୍ତୁ',
          'ପାନୀୟ ଜଳ ଓ ଔଷଧ ସାଇତି ରଖନ୍ତୁ'
        ]
      };
    
    case 'bengali':
      return {
        headline: `তুফান সাথী জরুরি সতর্কতা: ${isRed ? 'লাল সতর্কতা (রেড অ্যালার্ট)' : isOrange ? 'কমলা সতর্কতা' : 'হলুদ সতর্কতা'} - ${districtName}`,
        speech: `জরুরি আবহাওয়া বার্তা। ${districtName} জেলায় ঘূর্ণিঝড় ও গভীর নিম্নচাপের বিপজ্জনক প্রভাব শুরু হয়েছে। ঝড়ের কেন্দ্রস্থল আপনার অবস্থান থেকে প্রায় ${distanceKm} কিলোমিটার দূরে রয়েছে। বর্তমানে বাতাসের গতিবেগ ঘণ্টায় ${windSpeed} কিলোমিটার এবং দমকা বাতাসের গতি ${gustSpeed} কিলোমিটার পর্যন্ত পৌঁছাতে পারে। ${
          isRed
            ? 'অবিলম্বে মাঠের কাজ, কৃষি কাজ এবং বাইরের সমস্ত গতিবিধি বন্ধ করুন। নিজেকে এবং গবাদি পশুকে নিকটবর্তী সাইক্লোন শেল্টার বা পাকা বাড়িতে সরিয়ে নিন। কাঁচা ঘর, নড়বড়ে টিনের ছাউনি বা বিদ্যুতের খুঁটির নিচে থাকবেন না।'
            : isOrange
            ? 'বাইরের কাজ দ্রুত গুটিয়ে নিরাপদ স্থানে আশ্রয় নিন। মোবাইল ফোন ও ইমার্জেন্সি লাইট চার্জ করে রাখুন এবং পর্যাপ্ত পানীয় জল মজুত রাখুন।'
            : 'আগামী কয়েক ঘণ্টায় বৃষ্টি ও ঝোড়ো হাওয়ার তীব্রতা বাড়বে। নদী ও উপকূল তীরবর্তী এলাকায় যাবেন না এবং সতর্ক থাকুন।'
        }`,
        phoneticSpeech: `Jaruri abahawa barta. ${districtName} elakay ghurnijhorer probhab. Jhorer kendra apnar theke ${distanceKm} kilometer dure ache. Bataser goti ${windSpeed} theke ${gustSpeed} kilometer hote pare. ${
          isRed
            ? 'Obilombe macher o matheer kaj bondho korun. Paka barite ashroy nin. Bidyuter khuti theke dure thakun.'
            : 'Bairer kaj bondho rakhun o shotorko thakun.'
        }`,
        actionSteps: [
          isRed ? 'অবিলম্বে মাঠের কাজ বন্ধ করুন' : 'বাইরের কাজ স্থগিত রাখুন',
          'পাকা বাড়ি বা সাইক্লোন শেল্টারে যান',
          'বিদ্যুতের তার ও বড় গাছ থেকে দূরে থাকুন',
          'শুকনো খাবার ও বিশুদ্ধ জল মজুত রাখুন'
        ]
      };

    case 'hindi':
      return {
        headline: `तूफान साथी चेतावनी: ${isRed ? 'रेड अलर्ट (अत्यधिक खतरा)' : isOrange ? 'ऑरेंज अलर्ट (सावधान)' : 'येलो अलर्ट (निगरानी)'} - ${districtName}`,
        speech: `आपातकालीन मौसम चेतावनी। ${districtName} क्षेत्र में चक्रवाती तूफान और गहरे दबाव का गंभीर प्रभाव देखा जा रहा है। तूफान का केंद्र आपसे लगभग ${distanceKm} किलोमीटर की दूरी पर है। हवा की गति ${windSpeed} किलोमीटर प्रति घंटा और झोंके ${gustSpeed} किलोमीटर प्रति घंटा तक पहुंच सकते हैं। ${
          isRed
            ? 'तुरंत सभी खेतों, कृषि कार्यों और बाहर के काम बंद कर दें। खुद को और मवेशियों को पक्के मकान या नजदीकी चक्रवात आश्रय में ले जाएं। बिजली के खंभों, तारों और पुराने पेड़ों से दूर रहें।'
            : isOrange
            ? 'बाहरी कार्य जल्दी समेटकर सुरक्षित स्थान पर पहुंचें। मोबाइल फोन चार्ज रखें और पीने का साफ पानी सुरक्षित रख लें।'
            : 'आने वाले घंटों में तेज बारिश और हवाओं की आशंका है। सतर्क रहें और आधिकारिक बुलेटिन सुनते रहें।'
        }`,
        phoneticSpeech: `Aapatkalin mausam chetavani. ${districtName} kshetra mein toofan ka asar. Toofan ka kendra ${distanceKm} kilometer door hai. Hawa ki raftaar ${windSpeed} se ${gustSpeed} kilometer prati ghanta tak pahunch sakti hai. ${
          isRed
            ? 'Turant sabhi kheton aur bahar ke kaam band kar dein. Pakke makaan ya cyclone shelter mein chale jayein.'
            : 'Bahar ka kaam band rakhein aur surakshit rahein.'
        }`,
        actionSteps: [
          isRed ? 'तुरंत फील्ड व खेती का काम रोकें' : 'बाहरी काम स्थगित करें',
          'पक्के मकान या आश्रय स्थल में जाएं',
          'बिजली के खंभों व पेड़ों से दूर रहें',
          'पीने का पानी व टॉर्च तैयार रखें'
        ]
      };

    case 'english':
    default:
      return {
        headline: `ToofanSathi Emergency Alert: ${threat.level} Level for ${districtName}`,
        speech: `Attention field workers. Severe cyclone and depression alert for ${districtName}. The storm center is currently located approximately ${distanceKm} kilometers away towards the ${directionText}. Local surface winds are ${windSpeed} kilometers per hour with violent gusts reaching up to ${gustSpeed} kilometers per hour. ${
          isRed
            ? 'Cease all outdoor, agricultural, and field operations immediately. Evacuate low-lying areas and take shelter in concrete buildings or government multi-purpose cyclone shelters. Stay away from electric poles, tin roofs, and tall trees.'
            : isOrange
            ? 'Wrap up outdoor tasks and return to safe shelters within the hour. Keep phones, battery banks, and emergency lights charged, and store clean drinking water.'
            : 'Expect squally winds and rain bands in the coming hours. Exercise caution and do not venture into open water bodies or sea coast.'
        }`,
        phoneticSpeech: null,
        actionSteps: [
          isRed ? 'Stop all field activities immediately' : 'Suspend non-essential outdoor work',
          'Move to concrete shelter or pucca building',
          'Stay clear of power lines and loose structures',
          'Stock drinking water and emergency battery'
        ]
      };
  }
}
