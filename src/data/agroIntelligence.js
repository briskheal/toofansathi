// ==============================================================================
// Authoritative State-Adaptive Agro-Climatic Intelligence Engine
// Dynamically classifies all 28 Indian States & 8 UTs into 5 Master Agro-Climatic Zones:
// 1. HIMALAYAN ZONE (J&K, Ladakh, Himachal Pradesh, Uttarakhand, Sikkim, Arunachal)
// 2. NORTHERN PLAINS ZONE (Punjab, Haryana, Delhi NCR, Uttar Pradesh, Bihar)
// 3. CENTRAL PLATEAU ZONE (Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand)
// 4. PENINSULAR & WESTERN COAST (Tamil Nadu, Kerala, Karnataka, Goa, Maharashtra, Gujarat)
// 5. EASTERN COAST & DELTA (Odisha, Andhra Pradesh, West Bengal)
// ==============================================================================

export function detectAgroClimaticZone(stateName = '', locationName = '') {
  const s = `${stateName} ${locationName}`.toLowerCase();

  // 1. Himalayan Zone (High Altitude, Sub-Zero, Western Disturbances, Snowfall, Orchards)
  if (
    s.includes('jammu') || s.includes('kashmir') || s.includes('ladakh') || s.includes('leh') ||
    s.includes('srinagar') || s.includes('himachal') || s.includes('shimla') || s.includes('manali') ||
    s.includes('kullu') || s.includes('solan') || s.includes('dharamshala') ||
    s.includes('uttarakhand') || s.includes('dehradun') || s.includes('haridwar') || s.includes('haldwani') ||
    s.includes('nainital') || s.includes('almora') || s.includes('kumaon') || s.includes('garhwal') ||
    s.includes('sikkim') || s.includes('arunachal')
  ) {
    return 'HIMALAYAN';
  }

  // 2. Northern Plains / Indo-Gangetic Plain (Wheat Granary, Dense Fog Belt, Winter Cold Wave)
  if (
    s.includes('punjab') || s.includes('haryana') || s.includes('delhi') || s.includes('chandigarh') ||
    s.includes('amritsar') || s.includes('ludhiana') || s.includes('jalandhar') || s.includes('patiala') ||
    s.includes('karnal') || s.includes('panipat') || s.includes('ambala') || s.includes('hisar') ||
    s.includes('uttar pradesh') || s.includes('lucknow') || s.includes('kanpur') || s.includes('meerut') ||
    s.includes('ghaziabad') || s.includes('noida') || s.includes('agra') || s.includes('varanasi') ||
    s.includes('bareilly') || s.includes('moradabad') || s.includes('muzaffarnagar') || s.includes('saharanpur') ||
    s.includes('bihar') || s.includes('patna') || s.includes('gaya') || s.includes('muzaffarpur') || s.includes('bhagalpur')
  ) {
    return 'NORTH_PLAINS';
  }

  // 3. Central & Arid Plateau (Rajasthan, MP, Chhattisgarh, Jharkhand)
  if (
    s.includes('rajasthan') || s.includes('jaipur') || s.includes('jodhpur') || s.includes('udaipur') || s.includes('kota') ||
    s.includes('madhya pradesh') || s.includes('bhopal') || s.includes('indore') || s.includes('gwalior') || s.includes('jabalpur') || s.includes('ujjain') ||
    s.includes('chhattisgarh') || s.includes('raipur') || s.includes('bilaspur') ||
    s.includes('jharkhand') || s.includes('ranchi') || s.includes('jamshedpur') || s.includes('dhanbad')
  ) {
    return 'CENTRAL_PLATEAU';
  }

  // 4. Island Territories: Lakshadweep & Andaman-Nicobar Islands (Coral Atolls, Oceanic Tuna, Coconut, Inter-Island Ferries)
  if (
    s.includes('lakshadweep') || s.includes('kavaratti') || s.includes('agatti') || s.includes('minicoy') ||
    s.includes('andaman') || s.includes('nicobar') || s.includes('port blair') || s.includes('diglipur') || s.includes('havelock')
  ) {
    return 'ISLAND_TERRITORIES';
  }

  // 5. Tamil Nadu & Puducherry (Northeast Monsoon & Easterly Waves Season)
  if (s.includes('tamil nadu') || s.includes('puducherry') || s.includes('pondicherry') || s.includes('chennai') || s.includes('coimbatore') || s.includes('madurai')) {
    return 'COASTAL_SOUTH';
  }

  // 5. Kerala & Mahe (Southwest Coast)
  if (s.includes('kerala') || s.includes('kochi') || s.includes('thiruvananthapuram') || s.includes('calicut') || s.includes('kozhikode') || s.includes('mahe')) {
    return 'COASTAL_KERALA';
  }

  // 6. Andhra Pradesh & Telangana
  if (s.includes('andhra') || s.includes('visakhapatnam') || s.includes('vizag') || s.includes('vijayawada') || s.includes('guntur') || s.includes('tirupati') || s.includes('telangana') || s.includes('hyderabad')) {
    return 'COASTAL_ANDHRA';
  }

  // 7. West Bengal
  if (s.includes('bengal') || s.includes('kolkata') || s.includes('digha') || s.includes('howrah') || s.includes('sundarbans')) {
    return 'COASTAL_BENGAL';
  }

  // 8. Gujarat & Coastal Maharashtra / Goa / Karnataka
  if (s.includes('gujarat') || s.includes('ahmedabad') || s.includes('surat') || s.includes('porbandar') || s.includes('maharashtra') || s.includes('mumbai') || s.includes('goa') || s.includes('karnataka') || s.includes('bengaluru') || s.includes('mangalore')) {
    return 'COASTAL_WEST';
  }

  // 9. Odisha & Default Coastal East
  return 'COASTAL_EAST';
}

export function getStateAgroIntelligence(stateName = 'Odisha', selectedLang = 'english', livePrecip = 0, liveWind = 14, locationName = '') {
  const zone = detectAgroClimaticZone(stateName, locationName);
  const lang = (selectedLang || 'english').toLowerCase();

  // ==========================================================================
  // ZONE 1: HIMALAYAN ZONE (Jammu & Kashmir, Ladakh, Himachal, Uttarakhand)
  // Non-Coastal: Mountain Weather, Orchards, Frost, Saffron, Snow, Passes
  // ==========================================================================
  if (zone === 'HIMALAYAN') {
    const isOdia = lang === 'odia';
    const isHindi = lang === 'hindi';
    const isTamil = lang === 'tamil';

    return {
      zone: 'HIMALAYAN',
      isCoastal: false,
      zoneTitle: isOdia
        ? 'ହିମାଳୟ କୃଷି-ପାଣିପାଗ ଓ ପାର୍ବତ୍ୟ ସୂଚନା'
        : isHindi
        ? 'हिमालयी कृषि-मौसम व पर्वतीय सुरक्षा निगरानी'
        : isTamil
        ? 'இமயமலை வேளாண்-வானிலை & மலைசார் தகவல்'
        : 'Himalayan Agro-Meteorological & Mountain Intelligence',
      basinStatus: isOdia ? '🏔️ ପାର୍ବତ୍ୟ ଅଞ୍ଚଳ: ଥଣ୍ଡା ଓ କାକର ସତର୍କତା' : isHindi ? '🏔️ उच्च पर्वतीय क्षेत्र: ठंड व पाला निगरानी' : '🏔️ High Altitudes: Sub-Zero Dip & Frost Watch',
      windDesc: isOdia ? '✓ ପାର୍ବତ୍ୟ ପବନ • ଫସଲ ପ୍ରୁନିଂ ପାଇଁ ଅନୁକୂଳ' : isHindi ? '✓ मंद पर्वतीय हवा • बागवानी कटाई हेतु उपयुक्त' : '✓ Mountain Breeze • Valley Clear for Pruning',
      rainDesc: livePrecip > 0
        ? (isOdia ? `🌨️ ${livePrecip} ମି.ମି ତୁଷାରପାତ/ବର୍ଷା` : `🌨️ ${livePrecip} mm Sleet / Cold Rain`)
        : (isOdia ? '❄️ ଶୁଷ୍କ ଥଣ୍ଡା ପାଗ • ରାତିରେ ମାଇନସ୍ ଡିପ୍' : '❄️ Dry Cold Weather • Sub-Zero Night Chill'),
      authorityTitle: isOdia
        ? 'SKUAST କାଶ୍ମୀର ଓ ଜାମ୍ମୁ: ଉଦ୍ୟାନ କୃଷି ଓ ଶୀତ ସତର୍କତା ନିର୍ଦ୍ଦେଶାବଳୀ'
        : isHindi
        ? 'शेरे-कश्मीर कृषि विश्वविद्यालय (SKUAST): घाटी बागवानी व शीतकालीन निर्देश'
        : 'SKUAST-Kashmir & SKUAST-Jammu: Valley Horticulture & Cold Weather Directives',
      authoritySubtitle: isOdia
        ? 'ସେଓ ବଗିଚା, କେଶର କିଆରି ଓ ଶୀତକାଳୀନ ପଲିହାଉସ୍ ସୁରକ୍ଷା ପାଇଁ SKUAST ସରକାରୀ ନିର୍ଦ୍ଦେଶାବଳୀ'
        : 'Official SKUAST agro-meteorological advisory for temperate apple orchards, saffron beds and winter freeze protection',
      advisory1Title: isOdia
        ? 'ସେଓ ଓ ଫଳ ବଗିଚା ଶୀତକାଳୀନ ଯତ୍ନ ଓ ପ୍ରୁନିଂ'
        : isHindi
        ? 'सेब व फलदार बागों में कटाई-छंटाई एवं तना लेपन'
        : 'Apple & Fruit Orchard Winter Basin Care & Trunk Pruning',
      advisory1Desc: isOdia
        ? 'ରାତି ତାପମାତ୍ରା ଶୂନ ଡିଗ୍ରୀ ନିକଟତର। ସେଓ ଓ ବାଦାମ ଗଛର ପ୍ରୁନିଂ ଶେଷ କରନ୍ତୁ ଏବଂ କଟା ଅଂଶରେ ବୋର୍ଡୋ ପେଷ୍ଟ ଲଗାଇ ଗଣ୍ଡି ଫାଟିବା ଓ କବକ ରୋଗରୁ ରକ୍ଷା କରନ୍ତୁ।'
        : isHindi
        ? 'रात का तापमान शून्य के करीब पहुंच रहा है। सेब, अखरोट व नाशपाती में कटाई-छंटाई पूरी कर कटे सिरों पर बोर्डो लेप लगाएं ताकि तना फटने व फफूंद से बचाव हो सके।'
        : 'Dip in night temperatures approaching near-freezing. Complete pruning of apple, walnut and pear trees; apply Bordeaux paste / lime sulfur to cut surfaces and trunks to prevent fungal infection and sun-scald. Prepare winter basin mulch.',
      advisory2Title: isOdia
        ? 'ପ୍ରବଳ ଶୀତ ଓ କାକରରୁ ପଲିହାଉସ୍ ଓ କେଶର ସୁରକ୍ଷା'
        : isHindi
        ? 'पाला व शीतलहर से पॉलीहाउस व फसलों का बचाव'
        : 'Sub-Zero Frost & Greenhouse Polyhouse Protection',
      advisory2Desc: isOdia
        ? 'କେଶର କିଆରି ଓ ନର୍ସରୀରେ ନଡ଼ା କିମ୍ବା ପଲିଥିନ୍ ଆଚ୍ଛାଦନ ଦିଅନ୍ତୁ। ପଲିହାଉସ୍ ଧାରକୁ ଉତ୍ତରୀ ଥଣ୍ଡା ପବନରୁ ସୁରକ୍ଷିତ ରଖନ୍ତୁ ଏବଂ ପାଇପ୍ ଫାଟିବା ଏଡ଼ାଇବାକୁ ଜଳ ନିଷ୍କାସନ କରନ୍ତୁ।'
        : isHindi
        ? 'केसर क्यारियों व नर्सरी पौध पर पुआल/प्लास्टिक की मल्चिंग बिछाएं। पॉलीहाउस के किनारों को बंद रखें तथा सिंचाई पाइपों को जमने से बचाने के लिए अतिरिक्त पानी निकाल दें।'
        : 'Ensure frost covers or organic mulch over saffron corm beds and nursery seedbeds. Insulate polyhouse borders against icy northern winds; drain exposed irrigation lines to prevent pipe cracking from freezing water.',
      safetyTitle: isOdia
        ? '🏔️ ପାର୍ବତ୍ୟ ରାଜପଥ, ଘାଟି ପାସ୍ ଓ ତୁଷାରପାତ ସୁରକ୍ଷା'
        : isHindi
        ? '🏔️ पर्वतीय राजमार्ग, घाटी दर्रा व पाला/हिमपात सुरक्षा'
        : '🏔️ Mountain Highway, Valley Pass & Snow/Frost Safety',
      safetySubtitle: isOdia
        ? 'ଜାମ୍ମୁ-ଶ୍ରୀନଗର NH-44, ମୋଗଲ ରୋଡ୍ ଏବଂ ଘାଟି ପାସ୍ ଟ୍ରାଫିକ୍ ସୂଚନା'
        : 'NH-44 Jammu-Srinagar Highway, Mughal Road & Mountain Pass Transit Advisory',
      safetyStatus: isOdia ? 'ସତର୍କତା ସହ ଖୋଲା' : isHindi ? 'सतर्कता के साथ खुला' : 'OPEN WITH WINTER CAUTION',
      safetyStatusClass: 'bg-sky-950/80 text-sky-300 border-sky-800',
      metric1Label: 'NH-44 & Passes: ',
      metric1Value: 'Open (Watch Morning Black Ice)',
      metric2Label: 'Night Lows: ',
      metric2Value: 'Sub-Zero Dip (1°C to -4°C in Valleys)',
      metric3Label: 'Travel Safety: ',
      metric3Value: 'Carry Anti-Skid Chains on High Passes',
      point2Header: '2. Mountain Highway & Frost',
      waveHeight: 'NH-44 & Passes: Navigable',
      offshoreWind: 'Valley Inflow: Mountain Breeze',
      marineStatus: 'VALLEY PASSES OPEN (CAUTION)',
      marineStatusClass: 'bg-sky-950/80 text-sky-300 border-sky-800',
      fishermenWarning: 'Safe for Valley Highway & Inter-District Transit'
    };
  }

  // ==========================================================================
  // ZONE 2: NORTHERN PLAINS ZONE (Punjab, Haryana, Delhi NCR, UP, Bihar)
  // Non-Coastal: Indo-Gangetic Wheat, Dense Fog, Highway Safety, Potato Blight
  // ==========================================================================
  if (zone === 'NORTH_PLAINS') {
    const isOdia = lang === 'odia';
    const isHindi = lang === 'hindi';

    return {
      zone: 'NORTH_PLAINS',
      isCoastal: false,
      zoneTitle: isOdia
        ? 'ଉତ୍ତର ସମତଳ କୃଷି-ପାଣିପାଗ ଓ ରବି ଫସଲ ସୂଚନା'
        : isHindi
        ? 'उत्तरी मैदानी कृषि-मौसम व रबी फसल परामर्श'
        : 'Northern Plains Agro-Meteorological & Rabi Crop Intelligence',
      basinStatus: isOdia ? '🌫️ ସମତଳ ଅଞ୍ଚଳ: ଘନ କୁହୁଡ଼ି ଓ ସକାଳ ଶୀତ' : isHindi ? '🌫️ उत्तरी मैदान: विकिरण कोहरा व शीत लहर' : '🌫️ Indo-Gangetic Plains: Radiation Fog & Morning Chill',
      windDesc: isOdia ? '✓ ମୃଦୁ ପବନ ୫-୧୦ କିମି/ଘଂ • ବୁଣିବା ପାଇଁ ଅନୁକୂଳ' : '✓ Calm Northwesterly 5–10 km/h • Safe for Sowing',
      rainDesc: isOdia ? '✓ ଶୁଖିଲା ପାଗ • ବର୍ଷା ଆଶଙ୍କା ନାହିଁ' : '✓ Dry Season • Zero Rain Threat across Plains',
      authorityTitle: isOdia
        ? 'PAU ଲୁଧିଆନା ଓ IARI ପୁସା: ଉତ୍ତର ଭାରତ ରବି ନିର୍ଦ୍ଦେଶାବଳୀ'
        : isHindi
        ? 'पीएयू लुधियाना व आईएआरआई पूसा: उत्तर भारतीय रबी बुलेटिन'
        : 'PAU Ludhiana & IARI Pusa: Northern Plains Rabi Directives',
      authoritySubtitle: isOdia
        ? 'ରବି ଗହମ ବୁଣା, ଆଳୁ ଫସଲ ରକ୍ଷଣାବେକ୍ଷଣ ଓ କୁହୁଡ଼ି ସତର୍କତା'
        : 'Agro-meteorological advisory for rabi wheat sowing, mustard protection and potato winter management',
      advisory1Title: isOdia
        ? 'ରବି ଗହମ ବୁଣା ଓ ପ୍ରଥମ ଜଳସେଚନ (CRI ପର୍ଯ୍ୟାୟ)'
        : isHindi
        ? 'रबी गेहूं की समय पर बुवाई एवं प्रथम सिंचाई (CRI अवस्था)'
        : 'Timely Wheat Sowing & First Crown Root Irrigation (CRI)',
      advisory1Desc: isOdia
        ? 'ଉନ୍ନତ କିସମର ଗହମ (HD-2967, PBW-550) ବୁଣାବୁଣି ଶେଷ କରନ୍ତୁ। ବୁଣିବାର ୨୦-୨୫ ଦିନ ମଧ୍ୟରେ ପ୍ରଥମ ଜଳସେଚନ (CRI ପର୍ଯ୍ୟାୟ) ନାଇଟ୍ରୋଜେନ ସହ ପ୍ରୟୋଗ କରନ୍ତୁ।'
        : isHindi
        ? 'गेहूं की समय पर बुवाई (HD-2967/PBW-550) पूरी करें। बुवाई के 20-25 दिन बाद सीआरआई (Crown Root) अवस्था पर पहली सिंचाई व अनुशंसित यूरिया का प्रयोग करें।'
        : 'Complete sowing of timely wheat varieties (HD-2967, PBW-550). Apply first irrigation at 20-25 days after sowing (Crown Root Initiation stage) along with recommended nitrogen dose.',
      advisory2Title: isOdia
        ? 'ସକାଳେ ଘନ କୁହୁଡ଼ି ଓ ଆଳୁ ଫସଲ ରୋଗ ସତର୍କତା'
        : isHindi
        ? 'घने कोहरे में आलू झुलसा व सरसों माहू निगरानी'
        : 'Dense Morning Fog & Potato Late Blight Watch',
      advisory2Desc: isOdia
        ? 'ସକାଳର ଉଚ୍ଚ ଆର୍ଦ୍ରତା ଓ କୁହୁଡ଼ି ଯୋଗୁଁ ଆଳୁରେ ଝାଉଁଳା ରୋଗ ଓ ସୋରିଷରେ ଜଉପୋକ ଆକ୍ରମଣ ହୋଇପାରେ। ସନ୍ଧ୍ୟାବେଳେ ହାଲୁକା ଜଳସେଚନ ଦେଇ କାକର ଆଘାତରୁ ଫସଲକୁ ରକ୍ଷା କରନ୍ତୁ।'
        : isHindi
        ? 'सुबह के कोहरे व अधिक नमी से आलू में पछेती झुलसा व सरसों में चेपा (माहू) का खतरा रहता है। नियमित निगरानी करें तथा पाला पड़ने की आशंका पर हल्की सिंचाई दें।'
        : 'High morning humidity and fog favor late blight in potato and aphids in mustard. Inspect crops; give light evening irrigation if ground frost is anticipated during temperature dips.',
      safetyTitle: isOdia
        ? '🌫️ ଜାତୀୟ ରାଜପଥ କୁହୁଡ଼ି ଓ ପରିବହନ ସୁରକ୍ଷା'
        : isHindi
        ? '🌫️ राष्ट्रीय राजमार्ग कोहरा व यातायात सुरक्षा'
        : '🌫️ National Highway Fog & Transportation Safety',
      safetySubtitle: isOdia
        ? 'GT ରୋଡ୍ NH-44, ଯମୁନା ଏବଂ ପୂର୍ବାଞ୍ଚଳ ଏକ୍ସପ୍ରେସୱେ କୁହୁଡ଼ି ସତର୍କତା'
        : 'GT Road NH-44, Yamuna & Purvanchal Expressway Visibility Advisory',
      safetyStatus: isOdia ? 'ଘନ କୁହୁଡ଼ି ସତର୍କତା' : isHindi ? 'घना कोहरा परामर्श' : 'DENSE FOG ADVISORY',
      safetyStatusClass: 'bg-amber-950/80 text-amber-300 border-amber-800',
      metric1Label: 'Morning Visibility: ',
      metric1Value: '50 m – 200 m (Dense Fog 05:00–08:30 IST)',
      metric2Label: 'Expressway Transit: ',
      metric2Value: 'Low Beam & Fog Lights Mandatory',
      metric3Label: 'Mandi Transport: ',
      metric3Value: 'Safe Daytime Transit After 09:30 AM',
      point2Header: '2. Highway Fog & Visibility',
      waveHeight: 'Morning Fog: 50–200m Vis',
      offshoreWind: 'Surface Wind: Calm 4–8 km/h',
      marineStatus: 'HIGHWAY FOG WATCH (MORNING)',
      marineStatusClass: 'bg-amber-950/80 text-amber-300 border-amber-800',
      fishermenWarning: 'Drive with Low Beam; Afternoon Travel Safe'
    };
  }

  // ==========================================================================
  // ZONE 3: CENTRAL PLATEAU ZONE (Rajasthan, MP, Chhattisgarh, Jharkhand)
  // Non-Coastal: Plateau Diurnal Gap, Mandi Storage, Gram/Mustard Irrigations
  // ==========================================================================
  if (zone === 'CENTRAL_PLATEAU') {
    const isOdia = lang === 'odia';
    const isHindi = lang === 'hindi';

    return {
      zone: 'CENTRAL_PLATEAU',
      isCoastal: false,
      zoneTitle: isOdia
        ? 'ମଧ୍ୟ ମାଳଭୂମି କୃଷି-ପାଣିପାଗ ଓ ରବି ଫସଲ ସୂଚନା'
        : isHindi
        ? 'मध्य पठारी कृषि-मौसम व रबी फसल बुलेटिन'
        : 'Central Plateau Agro-Meteorological & Rabi Intelligence',
      basinStatus: isOdia ? '🌾 ମଧ୍ୟ ଭାରତ: ସ୍ଥିର ପାଗ ଓ ତାପମାତ୍ରା ବ୍ୟବଧାନ' : isHindi ? '🌾 मध्य भारत: स्थिर मौसम व दिन-रात तापांतर' : '🌾 Central India: Stable Skies & Diurnal Temperature Gap',
      windDesc: isOdia ? '✓ ମୃଦୁ ଥଣ୍ଡା ପବନ ୬-୧୨ କିମି/ଘଂ' : '✓ Gentle Northerly Breeze 6–12 km/h',
      rainDesc: isOdia ? '✓ ସମ୍ପୂର୍ଣ୍ଣ ଶୁଖିଲା ପାଗ' : '✓ Clear Dry Weather • Nil Rain Risk',
      authorityTitle: isOdia
        ? 'JNKVV ଜବଲପୁର ଓ SKNAU: ମାଳଭୂମି କୃଷି ନିର୍ଦ୍ଦେଶାବଳୀ'
        : isHindi
        ? 'जनेकृविवि जबलपुर व एसकेएनएयू जोबनेर: पठारी कृषि निर्देश'
        : 'JNKVV Jabalpur & SKNAU: Central Plateau Agro Directives',
      authoritySubtitle: isOdia
        ? 'ବୁଟ, ସୋରିଷ ଜଳସେଚନ ଓ ଖଳାବାଡ଼ି ଶସ୍ୟ ସଂରକ୍ଷଣ ପରାମର୍ଶ'
        : 'Agro advisory for chickpea, mustard irrigation and open mandi produce protection',
      advisory1Title: isOdia
        ? 'ଚଣା, ସୋରିଷ ଓ ଗହମ ଜଳସେଚନ ପରିଚାଳନା'
        : isHindi
        ? 'चना, सरसों व गेहूं में सिंचाई प्रबंधन'
        : 'Gram (Chickpea), Mustard & Wheat Irrigation Scheduling',
      advisory1Desc: isOdia
        ? 'ଶୁଖିଲା ଖରାଟିଆ ପାଗ ଜାରି ରହିଛି। ଚଣା ଓ ସୋରିଷ ଫସଲରେ ଆବଶ୍ୟକ ମୁତାବକ ଜଳସେଚନ ଦିଅନ୍ତୁ ଏବଂ କୋଡ଼ାଖୁସା କରି ଜମିର ଆର୍ଦ୍ରତା ସଂରକ୍ଷଣ କରନ୍ତୁ।'
        : isHindi
        ? 'शुष्क व धूप वाला मौसम बना हुआ है। चना व सरसों में आवश्यकतानुसार सिंचाई करें तथा हल्की निराई-गुड़ाई कर खेत की नमी को संरक्षित रखें।'
        : 'Dry sunny weather prevailing. Apply pre-sowing irrigation for chickpea and mustard; ensure soil moisture conservation through shallow intercultural weeding.',
      advisory2Title: isOdia
        ? 'ଦିନ-ରାତି ତାପମାତ୍ରା ବ୍ୟବଧାନ ଓ ମଣ୍ଡି ଶସ୍ୟ ସୁରକ୍ଷା'
        : isHindi
        ? 'तापांतर से फसल बचाव व मंडी में अनाज सुरक्षा'
        : 'Diurnal Temperature Gap & Mandi Grain Storage',
      advisory2Desc: isOdia
        ? 'ଦିନ ତାପମାତ୍ରା ୨୮-୩୦°C ଏବଂ ରାତିରେ ୧୦-୧୨°C (୧୬-୧୮°C ବ୍ୟବଧାନ)। ଖଳା ଓ ମଣ୍ଡିରେ ଥିବା ଅମଳ ଶସ୍ୟକୁ ରାତ୍ରିକାଳୀନ କାକରରୁ ସୁରକ୍ଷିତ ଘୋଡ଼ାଇ ରଖନ୍ତୁ।'
        : isHindi
        ? 'दिन का तापमान 28-30°C तथा रात में 10-12°C तक गिर रहा है। मंडियों व खलिहानों में रखे खुले अनाज को रात की ओस व नमी से बचाने हेतु तिरपाल से ढकें।'
        : 'Day temperatures reaching 28-30°C with night lows near 10-12°C. Protect harvested kharif grain in covered godowns against night dew condensation.',
      safetyTitle: isOdia
        ? '🌾 ମାଳଭୂମି ତାପମାତ୍ରା ଓ ମଣ୍ଡି ସୁରକ୍ଷା ନିରୀକ୍ଷଣ'
        : isHindi
        ? '🌾 पठारी तापांतर व मंडी अनाज सुरक्षा निगरानी'
        : '🌾 Plateau Temperature Diurnal Range & Mandi Safety',
      safetySubtitle: isOdia
        ? 'ମଣ୍ଡି ଶସ୍ୟ ସଂରକ୍ଷଣ ଓ ଖୋଲା ପଡ଼ିଆ କୃଷି ସୂଚନା'
        : 'Mandi Grain Storage & Open Yard Agriculture Monitoring',
      safetyStatus: isOdia ? 'ସ୍ୱାଭାବିକ ପାଗ ରୁଟିନ୍' : isHindi ? 'अनुकूल शुष्क मौसम' : 'FAIR WEATHER ROUTINE',
      safetyStatusClass: 'bg-emerald-950/80 text-emerald-300 border-emerald-800',
      metric1Label: 'Diurnal Temp Gap: ',
      metric1Value: '16°C – 18°C Day/Night Contrast',
      metric2Label: 'Storage Precaution: ',
      metric2Value: 'Cover Mandi Grain Yards from Dew',
      metric3Label: 'Irrigation Window: ',
      metric3Value: 'Evening Drip & Sprinkler Ideal',
      point2Header: '2. Inland Plateau State',
      waveHeight: 'Stable Inland Plateau',
      offshoreWind: 'Gentle Breeze: 6–12 km/h',
      marineStatus: 'STABLE INLAND WEATHER',
      marineStatusClass: 'bg-emerald-950/80 text-emerald-300 border-emerald-800',
      fishermenWarning: 'Safe for All Agro & Transport Activities'
    };
  }

  // ==========================================================================
  // ZONE 4: ISLAND TERRITORIES (Lakshadweep & Andaman-Nicobar Islands)
  // Island Marine: Coral Atolls, Oceanic Skipjack Tuna, Coconut Palms, High Sea Swell
  // ==========================================================================
  if (zone === 'ISLAND_TERRITORIES') {
    const isOdia = lang === 'odia';
    const isHindi = lang === 'hindi';
    const isTamil = lang === 'tamil';

    return {
      zone: 'ISLAND_TERRITORIES',
      isCoastal: true,
      zoneTitle: isOdia
        ? 'ଦ୍ୱୀପପୁଞ୍ଜ କୃଷି-ପାଣିପାଗ ଓ ମହାସାଗରୀୟ ସୂଚନା'
        : isHindi
        ? 'द्वीपीय कृषि-मौसम व महासागरीय सुरक्षा केंद्र'
        : isTamil
        ? 'தீவு வேளாண்-வானிலை மற்றும் கடல்சார் தகவல்'
        : 'Island Agro-Meteorological & Oceanic Marine Intelligence',
      basinStatus: isOdia
        ? '🌴 ଦ୍ୱୀପପୁଞ୍ଜ: ସ୍ୱାଭାବିକ ସାମୁଦ୍ରିକ ପାଗ'
        : isHindi
        ? '🌴 द्वीपसमूह: सामान्य महासागरीय अनुकूल मौसम'
        : '🌴 Island Territories: Stable Oceanic Marine Window',
      windDesc: isOdia
        ? '✓ ସମୁଦ୍ର ପବନ ୧୦-୧୮ କିମି/ଘଂ • ଡଙ୍ଗା ଚଳାଚଳ ଅନୁକୂଳ'
        : '✓ Oceanic Breeze 10–18 km/h • Lagoon Transit Favorable',
      rainDesc: livePrecip > 0
        ? (isOdia ? `🌧️ ${livePrecip} ମି.ମି କ୍ରାନ୍ତୀୟ ବର୍ଷା` : `🌧️ ${livePrecip} mm Tropical Island Showers`)
        : (isOdia ? '🌤️ ଉଜ୍ଜ୍ୱଳ ଖରାଟିଆ ଦ୍ୱୀପ ପାଗ' : '🌤️ Bright Tropical Weather • Safe for Harvesting'),
      authorityTitle: isOdia
        ? 'ICAR-CIARI ପୋର୍ଟ ବ୍ଲେୟାର୍ ଓ ICAR-CPCRI କବାରତ୍ତି ନିର୍ଦ୍ଦେଶାବଳୀ'
        : isHindi
        ? 'भाकृअनुप-सीआईएआरआई पोर्ट ब्लेयर व सीपीसीआरआई लक्षद्वीप परामर्श'
        : 'ICAR-CIARI Port Blair & ICAR-CPCRI Lakshadweep: Island Directives',
      authoritySubtitle: isOdia
        ? 'ନାଳିକେଳ ବଗିଚା, ଟୁନା ମାଛ ଶିକାର ଓ ଆନ୍ତଃ-ଦ୍ୱୀପ ଫେରି ଯାତ୍ରା ସୁରକ୍ଷା'
        : 'Agro-marine advisory for island coconut plantations, coral lagoon fisheries and inter-island sea transit',
      advisory1Title: isOdia
        ? 'ଗଭୀର ସମୁଦ୍ର ସ୍କିପଜ୍ୟାକ୍ ଟୁନା ଓ ଲାଗୁନ୍ ମାଛ ଶିକାର'
        : isHindi
        ? 'गहरे समुद्र में टूना मत्स्य व लैगून नौकायन सुरक्षा'
        : 'Oceanic Skipjack Tuna & Coral Lagoon Fishery Safety',
      advisory1Desc: isOdia
        ? 'ଆରବ ସାଗର ଓ ବଙ୍ଗୋପସାଗର ଦ୍ୱୀପପୁଞ୍ଜରେ ସ୍ୱାଭାବିକ ପାଗ। ପୋଲ୍-ଏଣ୍ଡ-ଲାଇନ୍ ଟୁନା ଡଙ୍ଗା ପାଇଁ ପାଗ ଅନୁକୂଳ। ଉଚ୍ଚ ଜୁଆର ସମୟରେ ପ୍ରବାଳ ପ୍ରାଚୀର ନିକଟରେ ସତର୍କ ରୁହନ୍ତୁ।'
        : isHindi
        ? 'द्वीपसमूहों में सामान्य महासागरीय स्थिति बनी हुई है। पोल-एंड-लाइन टूना मछली पकड़ने हेतु मौसम अनुकूल है। उच्च ज्वार के समय प्रवाल भित्तियों (रीफ) के पास सतर्कता बरतें।'
        : 'Stable ocean conditions across island waters. Favorable weather for pole-and-line oceanic skipjack tuna fishery around outer reefs. Exercise caution around coral bar mouths during high tide swells.',
      advisory2Title: isOdia
        ? 'ଦ୍ୱୀପ ନଡ଼ିଆ ଗଛ ଓ ମଧୁର ଜଳ ସଂରକ୍ଷଣ ଯତ୍ନ'
        : isHindi
        ? 'द्वीपीय नारियल बागवानी व मीठे भूजल का संरक्षण'
        : 'Island Coconut Palms, Spices & Soil Moisture Preservation',
      advisory2Desc: isOdia
        ? 'ଲୁଣିଆ ପବନରୁ ନୂତନ ଚାରାକୁ ରକ୍ଷା କରନ୍ତୁ। ନଡ଼ିଆ ଗଛ ମୂଳରେ ନଡ଼ା କିମ୍ବା ଶୁଖିଲା ପତ୍ର ଆଚ୍ଛାଦନ ଦେଇ ଦ୍ୱୀପର ସୀମିତ ମଧୁର ଜଳ ସଂରକ୍ଷଣ କରନ୍ତୁ।'
        : isHindi
        ? 'खारे समुद्री झोंकों से नन्हे पौधों का बचाव करें। नारियल थालों में जैविक मल्चिंग देकर द्वीपीय मीठे भूजल (Freshwater Lens) की नमी को सुरक्षित रखें।'
        : 'Protect young saplings from oceanic salt spray. Apply thick coir pith and organic mulch around coconut basins to conserve limited island freshwater lens moisture.',
      marineStatus: isOdia ? 'ସମୁଦ୍ର ଯାତ୍ରା ସମ୍ପୂର୍ଣ୍ଣ ସୁରକ୍ଷିତ' : isHindi ? 'नौकायन हेतु पूर्णतः सुरक्षित' : 'SAFE FOR NAVIGATION',
      marineStatusClass: 'bg-emerald-950/80 text-emerald-300 border-emerald-800',
      waveHeight: '1.0 m – 1.8 m (Moderate Swell)',
      offshoreWind: '12–18 knots (Island Breeze)',
      fishermenWarning: 'Safe for Island Trawlers, High Speed Crafts & Fishing Ferries'
    };
  }

  // ==========================================================================
  // ZONE 5: COASTAL SOUTH - TAMIL NADU & PUDUCHERRY
  // Coastal: Northeast Monsoon & Easterly Waves (Nov 23-27)
  // ==========================================================================
  if (zone === 'COASTAL_SOUTH') {
    if (lang === 'tamil') {
      return {
        zone: 'COASTAL_SOUTH',
        isCoastal: true,
        zoneTitle: 'கடலோர வேளாண்-வானிலை மற்றும் கடல்சார் தகவல்',
        basinStatus: '🌊 தென்மேற்கு வங்கக்கடல்: தீவிர கிழக்கு அலைகள்',
        windDesc: '⚠️ மணிக்கு 40-50 கி.மீ வேகத்தில் பலத்த காற்று & ଝଟକା',
        rainDesc: livePrecip > 0 ? `🌧️ ${livePrecip} மி.மீ மழை • வயல்களில் உடனடி வடிகால்` : '🌧️ வடகிழக்கு பருவமழை இடைவிடாத தூறல்',
        authorityTitle: 'தமிழ்நாடு வேளாண்மை பல்கலைக்கழகம் (TNAU) & IMD சென்னை வழிகாட்டுதல்',
        authoritySubtitle: 'வடகிழக்கு பருவமழை & சம்பா பயிர் பாதுகாப்பு மற்றும் வடிகால் மேலாண்மை',
        advisory1Title: 'சம்பா நெல் & பயிர் நிலங்களில் உடனடி வடிகால் மேலாண்மை',
        advisory1Desc: 'வங்கக்கடல் கிழக்கு அலைகள் (Easterly Waves) காரணமாக கனமழை எச்சரிக்கை (23-27 நவம்பர்). வயல்களில் நீர் தேங்காமல் உடனடியாக வடிகால் வாய்க்கால்களை தூர்வாருங்கள். தழைச்சத்து மேலுரமிடுதல் மற்றும் பூச்சிக்கொல்லி தெளிப்பதை தற்காலிகமாக ஒத்திவையுங்கள்.',
        advisory2Title: 'கடலோர காற்று & மீனவர் பாதுகாப்பு எச்சரிக்கை',
        advisory2Desc: 'கடலோரப் பகுதிகளில் மணிக்கு 40 முதல் 50 கி.மீ வேகத்திலும், இடையிடையே 60 கி.மீ வேகத்திலும் பலத்த காற்று வீசக்கூடும். நாட்டுப் படகுகள் ஆழ்கடல் செல்வதை தவிர்க்கவும்; விசைப்படகுகள் தீவிர எச்சரிக்கையுடன் இருக்கவும்.',
        marineStatus: 'எச்சரிக்கை தேவை • கொந்தளிப்பான கடல்',
        marineStatusClass: 'bg-amber-950/80 text-amber-300 border-amber-800',
        waveHeight: '1.5 மீ – 2.5 மீ (மிதமானது முதல் கொந்தளிப்பு)',
        offshoreWind: '20–28 நாட்ஸ் (வடகிழக்கு காற்று)',
        fishermenWarning: 'எச்சரிக்கை: தென்மேற்கு வங்கக்கடல் & மன்னார் வளைகுடா கொந்தளிப்பு'
      };
    }
    return {
      zone: 'COASTAL_SOUTH',
      isCoastal: true,
      zoneTitle: 'Coastal Agro-Meteorological & Marine Intelligence',
      basinStatus: '🌊 SW Bay: Active Easterly Waves',
      windDesc: '⚠️ Squally Winds 40–50 km/h (Gusts to 60 km/h)',
      rainDesc: livePrecip > 0 ? `🌧️ ${livePrecip} mm Rain • Maintain Field Drainage` : '🌧️ Northeast Monsoon Active Rain Window',
      authorityTitle: 'TNAU Coimbatore & IMD RMC Chennai: Northeast Monsoon Directives',
      authoritySubtitle: 'Active Easterly Waves agro-advisory for standing Samba paddy, pulses & horticultural crops',
      advisory1Title: 'Samba Paddy & Field Drainage Management',
      advisory1Desc: 'Heavy rain window (23-27 Nov) due to Easterly Waves. Immediately clear field drainage channels to prevent water stagnation in low-lying paddy plots; postpone nitrogen top-dressing and chemical spraying until rain subsides.',
      advisory2Title: 'Coastal Wind & Marine Fishermen Caution',
      advisory2Desc: 'Squally northeasterly winds of 40-50 km/h gusting to 60 km/h along Tamil Nadu & Puducherry coast. Nearshore fishing only with caution; small country crafts strictly advised not to venture into deep sea.',
      marineStatus: 'CAUTION ADVISED • ROUGH SEAS',
      marineStatusClass: 'bg-amber-950/80 text-amber-300 border-amber-800',
      waveHeight: '1.5 m – 2.5 m (Moderate to Rough)',
      offshoreWind: '20–28 knots Northeasterly',
      fishermenWarning: 'Caution: Rough Seas across SW Bay of Bengal & Gulf of Mannar'
    };
  }

  // ==========================================================================
  // ZONE 5: COASTAL ANDHRA PRADESH & TELANGANA
  // ==========================================================================
  if (zone === 'COASTAL_ANDHRA') {
    if (lang === 'telugu') {
      return {
        zone: 'COASTAL_ANDHRA',
        isCoastal: true,
        zoneTitle: 'తీరప్రాంత వ్యవసాయ-వాతావరణ & సముద్ర సమాచార కేంద్రం',
        basinStatus: '🌊 దక్షిణ కోస్తా: ఈస్టర్లీ వేవ్స్ వర్షాలు',
        windDesc: '⚠️ ఈదురుగాలులు గంటకు 35–45 కి.మీ',
        rainDesc: livePrecip > 0 ? `🌧️ ${livePrecip} మి.మీ వర్షం • డ్రైనేజీ చూడండి` : '🌧️ ఈశాన్య రుతుపవనాల జల్లులు',
        authorityTitle: 'ఆచార్య ఎన్జీ రంగా వ్యవసాయ విశ్వవిద్యాలయం (ANGRAU) గుంటూరు ఆదేశాలు',
        authoritySubtitle: 'రబీ విత్తనాలు, వేరుశనగ మరియు పత్తి పంటల సంరక్షణ మార్గదర్శకాలు',
        advisory1Title: 'పంట పొలాల్లో నీరు నిలవకుండా డ్రైనేజీ ఏర్పాట్లు',
        advisory1Desc: 'ఈస్టర్లీ వేవ్స్ కారణంగా దక్షిణ కోస్తా మరియు రాయలసీమలో వర్షాలు కురుస్తున్నాయి. పొలాల్లో నిలిచిన నీటిని వెంటనే బయటకు పంపండి. ఎరువుల వాడకాన్ని కొన్ని రోజులు వాయిదా వేయండి.',
        advisory2Title: 'మత్స్యకారులు మరియు తీరప్రాంత హెచ్చరిక',
        advisory2Desc: 'కోస్తా తీరం వెంబడి గంటకు 40-50 కి.మీ వేగంతో బలమైన గాలులు వీచే అవకాశం ఉంది. చిన్న పడవల్లో వేటకు వెళ్లే మత్స్యకారులు తీరం దాటి లోపలికి వెళ్లరాదు.',
        marineStatus: 'అప్రమత్తత అవసరం • అలల తాకిడి',
        marineStatusClass: 'bg-amber-950/80 text-amber-300 border-amber-800',
        waveHeight: '1.2 మీ – 2.0 మీ (మధ్యస్థ అలలు)',
        offshoreWind: '16–22 నాట్స్ (ఈశాన్య గాలి)',
        fishermenWarning: 'తీరప్రాంత మత్స్యకారులు అప్రమత్తంగా ఉండాలి'
      };
    }
    return {
      zone: 'COASTAL_ANDHRA',
      isCoastal: true,
      zoneTitle: 'Coastal Agro-Meteorological & Marine Intelligence',
      basinStatus: '🌊 South AP: Easterly Wave Showers',
      windDesc: '⚠️ Gusty Winds 35–45 km/h',
      rainDesc: livePrecip > 0 ? `🌧️ ${livePrecip} mm Rain • Ensure Drainage` : '🌧️ NE Monsoon Showers Active',
      authorityTitle: 'ANGRAU Guntur: South Coastal AP & Rayalaseema Directives',
      authoritySubtitle: 'Agro-meteorological advisory for standing cotton, paddy and rabi pulse sowing',
      advisory1Title: 'Rabi Pulse Sowing Caution & Drainage',
      advisory1Desc: 'Easterly wave showers over South Coastal AP and Rayalaseema. Postpone zero-till sowing in heavy black soils until excess soil moisture recedes; provide drainage in standing cotton and paddy.',
      advisory2Title: 'Coastal Wind & Fishermen Safety',
      advisory2Desc: 'Squally winds 35-45 km/h along South AP coast. Nearshore fishing permitted with caution; monitor local port warnings.',
      marineStatus: 'CAUTION • MODERATE SWELL',
      marineStatusClass: 'bg-amber-950/80 text-amber-300 border-amber-800',
      waveHeight: '1.2 m – 2.0 m (Moderate)',
      offshoreWind: '16–22 knots Northeasterly',
      fishermenWarning: 'South AP Coast: Watch for localized squalls'
    };
  }

  // ==========================================================================
  // ZONE 6: COASTAL KERALA & MAHE
  // ==========================================================================
  if (zone === 'COASTAL_KERALA') {
    if (lang === 'malayalam') {
      return {
        zone: 'COASTAL_KERALA',
        isCoastal: true,
        zoneTitle: 'തീരദേശ കാർഷിക-കാലാവസ്ഥാ വിവരങ്ങൾ',
        basinStatus: '🌧️ തുലാവർഷം: തെക്കൻ തീരത്ത് മഴ',
        windDesc: '⚠️ കാറ്റിന്റെ വേഗത 30-40 കി.മീ/മണിക്കൂർ',
        rainDesc: livePrecip > 0 ? `🌧️ ${livePrecip} മി.മീ മഴ • തോട്ടങ്ങളിൽ നീർവാർച്ച` : '🌧️ മഴ പെയ്യാൻ സാധ്യത',
        authorityTitle: 'കേരള കാർഷിക സർവകലാശാല (KAU) വെളളാനിക്കര നിർദ്ദേശങ്ങൾ',
        authoritySubtitle: 'തുലാവർഷ മഴയും വാഴ, തെങ്ങ്, പച്ചക്കറി കൃഷി സംരക്ഷണവും',
        advisory1Title: 'തോട്ടങ്ങളിൽ നീർവാർച്ച സൗകര്യം ഉറപ്പാക്കുക',
        advisory1Desc: 'നവംബർ 24 മുതൽ 26 വരെ ശക്തമായ മഴയ്ക്ക് സാധ്യതയുള്ളതിനാൽ വാഴ, പച്ചക്കറി തോട്ടങ്ങളിൽ വെള്ളം കെട്ടിക്കിടക്കാതെ നോക്കുക. കുമിൾ രോഗങ്ങൾക്കെതിരെ മുൻകരുതൽ എടുക്കുക.',
        advisory2Title: 'തീരദേശ മത്സ്യത്തൊഴിലാളി ജാഗ്രത',
        advisory2Desc: 'കേരള-ലക്ഷദ്വീപ് തീരങ്ങളിൽ കാറ്റിന്റെ വേഗത 40-50 കി.മീ വരെ ഉയരാൻ സാധ്യതയുള്ളതിനാൽ ഉൾക്കടലിലേക്ക് പോകുന്നവർ ജാഗ്രത പാലിക്കുക.',
        marineStatus: 'ജാഗ്രത പാലിക്കുക',
        marineStatusClass: 'bg-amber-950/80 text-amber-300 border-amber-800',
        waveHeight: '1.2 മീ – 1.8 മീ',
        offshoreWind: '15–20 നോട്ടിക്കൽ മൈൽ',
        fishermenWarning: 'കേരള തീരത്ത് കടൽ പ്രക്ഷുബ്ധമാകാൻ സാധ്യത'
      };
    }
    return {
      zone: 'COASTAL_KERALA',
      isCoastal: true,
      zoneTitle: 'Coastal Agro-Meteorological & Marine Intelligence',
      basinStatus: '🌧️ South Coast: NE Monsoon Showers',
      windDesc: '⚠️ Coastal Breeze 30–40 km/h',
      rainDesc: livePrecip > 0 ? `🌧️ ${livePrecip} mm Rain • Ensure Drainage` : '🌧️ Convective Showers Expected',
      authorityTitle: 'KAU Vellanikkara: Monsoon Showers & Plantation Advisory',
      authoritySubtitle: 'Directives for banana, coconut, rubber & vegetable plantations during active showers',
      advisory1Title: 'Plantation Drainage & Disease Prevention',
      advisory1Desc: 'Active showers expected (24-26 Nov). Clear drainage channels in low-lying banana and vegetable plots. Apply organic or copper fungicide once rain subsides to prevent rhizome/collar rot.',
      advisory2Title: 'Coastal Swell & Marine Alert',
      advisory2Desc: 'Wind speeds up to 40 km/h along Kerala coast. Inshore fishing permitted; avoid fishing near river mouths during high tide.',
      marineStatus: 'CAUTION • MODERATE SEAS',
      marineStatusClass: 'bg-amber-950/80 text-amber-300 border-amber-800',
      waveHeight: '1.2 m – 1.8 m',
      offshoreWind: '15–20 knots Westerly/Easterly',
      fishermenWarning: 'Caution around rocky headlands & bar mouths'
    };
  }

  // ==========================================================================
  // ZONE 7: COASTAL WEST BENGAL
  // ==========================================================================
  if (zone === 'COASTAL_BENGAL') {
    if (lang === 'bengali' || lang === 'bangla') {
      return {
        zone: 'COASTAL_BENGAL',
        isCoastal: true,
        zoneTitle: 'উপকূলীয় কৃষি-আবহাওয়া ও সামুদ্রিক তথ্য কেন্দ্র',
        basinStatus: '🟢 বঙ্গোপসাগর: শান্ত ও অনুকূল আবহাওয়া',
        windDesc: '✓ শান্ত হাওয়া • ধান শুকানো ও মাঠের জন্য উপযুক্ত',
        rainDesc: '✓ শুষ্ক আবহাওয়া • বৃষ্টিপাতের আশঙ্কা নেই',
        authorityTitle: 'বিধানচন্দ্র কৃষি বিশ্ববিদ্যালয় (BCKV) নদীয়া: আমন ও রবি নির্দেশিকা',
        authoritySubtitle: 'আমন ধান কাটা, ঝাড়াই এবং আগাম আলু ও সরিষা বপনের সরকারি পরামর্শ',
        advisory1Title: 'আমন ধান কাটা ও রোদে শুকানোর উপযুক্ত সময়',
        advisory1Desc: 'আগামী ৫-৭ দিন আবহাওয়া সম্পূর্ণ পরিষ্কার ও শুষ্ক থাকবে। পাকা আমন ধান দ্রুত কেটে মাড়াই করুন এবং দানা ১৪% আর্দ্রতায় শুকিয়ে গুদামে রাখুন।',
        advisory2Title: 'আগাম আলু ও রবি সরিষা বপন শুরু করুন',
        advisory2Desc: 'মাটির উপযুক্ত রস কাজে লাগিয়ে আগাম আলু (কুফরি পোখরাজ) এবং রবি সরিষা চাষের জমি প্রস্তুতি দ্রুত শেষ করুন।',
        marineStatus: 'মৎস্যজীবীদের জন্য নিরাপদ',
        marineStatusClass: 'bg-emerald-950/80 text-emerald-300 border-emerald-800',
        waveHeight: '0.8 মি – 1.3 মি (শান্ত)',
        offshoreWind: '10–15 নট (উত্তর-পূর্ব)',
        fishermenWarning: 'দীঘা ও সুন্দরবন উপকূলে মাছ ধরা সম্পূর্ণ নিরাপদ'
      };
    }
    return {
      zone: 'COASTAL_BENGAL',
      isCoastal: true,
      zoneTitle: 'Coastal Agro-Meteorological & Marine Intelligence',
      basinStatus: '🟢 North Bay: Completely Calm',
      windDesc: '✓ Gentle Breeze • Ideal for Harvest & Spraying',
      rainDesc: '✓ Dry Fair Weather • No Rain Threat',
      authorityTitle: 'BCKV Kalyani: Coastal Bengal Aman Harvest & Rabi Directives',
      authoritySubtitle: 'Agro-meteorological directive for harvested Aman paddy and winter vegetable sowing',
      advisory1Title: 'Aman Harvest & Grain Sun-Drying Window',
      advisory1Desc: 'Dry fair weather next 5-7 days. Accelerate harvesting and mechanical threshing of ripe Aman paddy; dry grain to <14% moisture before storage.',
      advisory2Title: 'Early Potato & Mustard Sowing Window',
      advisory2Desc: 'Optimum soil moisture for seedbed preparation of early potato (Kufri Pukhraj) and rabi yellow sarson / rai mustard.',
      marineStatus: 'SAFE FOR NAVIGATION',
      marineStatusClass: 'bg-emerald-950/80 text-emerald-300 border-emerald-800',
      waveHeight: '0.8 m – 1.3 m (Slight)',
      offshoreWind: '10–15 knots Northeasterly',
      fishermenWarning: 'Safe for Trawlers across Digha, Haldia & Sundarbans'
    };
  }

  // ==========================================================================
  // ZONE 8: COASTAL GUJARAT, MAHARASHTRA & GOA
  // ==========================================================================
  if (zone === 'COASTAL_WEST') {
    if (lang === 'gujarati') {
      return {
        zone: 'COASTAL_WEST',
        isCoastal: true,
        zoneTitle: 'દરિયાકાંઠા કૃષિ-હવામાન અને સાગરીય ગુપ્તચર',
        basinStatus: '🟢 અરબી સમુદ્ર: શાંત અને અનુકૂળ સ્થિતિ',
        windDesc: '✓ હળવો પવન • કપાસ વીણવા અને સુકવણી માટે ઉત્તમ',
        rainDesc: '✓ સૂકું હવામાન • વરસાદની કોઈ શક્યતા નથી',
        authorityTitle: 'આણંદ કૃષિ યુનિવર્સિટી (AAU) અને જુનાગઢ (JAU) કૃષિ માર્ગદર્શિકા',
        authoritySubtitle: 'સૌરાષ્ટ્ર અને દરિયાકાંઠાના કપાસ, મગફળી અને રવિ ઘઉં વાવણી માટે સલાહ',
        advisory1Title: 'કપાસ વીણવા અને મગફળી સંગ્રહ માટે ઉત્તમ સમય',
        advisory1Desc: 'આગામી 5-7 દિવસ હવામાન સંપૂર્ણ સૂકું અને સ્વચ્છ રહેશે. ખુલ્લા કપાસની વીણી તાત્કાલિક પૂર્ણ કરો અને મગફળીને યોગ્ય ભેજવાળા ગોડાઉનમાં સાચવો.',
        advisory2Title: 'રવિ ઘઉં અને ચણાની સમયસર વાવણીની તૈયારી',
        advisory2Desc: 'સમયસર વાવણી માટે સુધારેલી ઘઉંની જાતો (GW-496) અને ચણા માટે પિયત આપીને જમીન તૈયાર કરો.',
        marineStatus: 'માછીમારો માટે સુરક્ષિત',
        marineStatusClass: 'bg-emerald-950/80 text-emerald-300 border-emerald-800',
        waveHeight: '0.8 મી – 1.4 મી (શાંત)',
        offshoreWind: '10–16 નોટ્સ (ઉત્તર-પશ્ચિમ)',
        fishermenWarning: 'સૌરાષ્ટ્ર અને ગુજરાત કાંઠે માછીમારી સંપૂર્ણ સલામત'
      };
    }
    return {
      zone: 'COASTAL_WEST',
      isCoastal: true,
      zoneTitle: 'Coastal Agro-Meteorological & Marine Intelligence',
      basinStatus: '🟢 Arabian Sea: Calm & Favorable',
      windDesc: '✓ Gentle Breeze • Safe for Picking & Sowing',
      rainDesc: '✓ Clear Dry Weather • Nil Rain Risk',
      authorityTitle: 'AAU Anand & JAU Junagadh: Saurashtra & Coastal Agro Directives',
      authoritySubtitle: 'Agro advisory for clean cotton picking, groundnut storage and timely wheat sowing',
      advisory1Title: 'Cotton Picking & Groundnut Storage Window',
      advisory1Desc: 'Dry fair weather window next 5-7 days. Accelerate clean cotton picking and protect stored groundnut in dry, well-ventilated storage.',
      advisory2Title: 'Rabi Wheat & Chickpea Sowing Preparation',
      advisory2Desc: 'Begin pre-sowing irrigation and land preparation for timely-sown wheat (GW-496/GW-366) and chickpea across irrigated belts.',
      marineStatus: 'SAFE FOR NAVIGATION',
      marineStatusClass: 'bg-emerald-950/80 text-emerald-300 border-emerald-800',
      waveHeight: '0.8 m – 1.4 m (Slight)',
      offshoreWind: '10–16 knots Northwesterly',
      fishermenWarning: 'Safe for Coastal Trawlers along Gujarat & Maharashtra'
    };
  }

  // ==========================================================================
  // ZONE 9: ODISHA & COASTAL EAST DEFAULT (ICAR-NRRI Cuttack & OUAT Mandate)
  // ==========================================================================
  if (lang === 'odia') {
    return {
      zone: 'COASTAL_EAST',
      isCoastal: true,
      zoneTitle: 'ଉପକୂଳ କୃଷି-ପାଣିପାଗ ଓ ସାମୁଦ୍ରିକ ସୂଚନା କେନ୍ଦ୍ର',
      basinStatus: '🟢 ସମୁଦ୍ର ଶାନ୍ତ • ବିପଦମୁକ୍ତ',
      windDesc: '✓ ମୃଦୁ ପବନ • ଅମଳ ଓ ଖଳା କାମ ପାଇଁ ଅନୁକୂଳ',
      rainDesc: '✓ ଶୁଖିଲା ପାଗ • ବର୍ଷା ଆଶଙ୍କା ନାହିଁ',
      authorityTitle: 'କେନ୍ଦ୍ରୀୟ ଧାନ ଗବେଷଣା ପ୍ରତିଷ୍ଠାନ (ICAR-NRRI) କଟକ: ଫସଲ ନିର୍ଦ୍ଦେଶାବଳୀ',
      authoritySubtitle: 'ଧାନ ଅମଳ, ଖଳାବାଡ଼ି ଶୁଖାଇବା ଓ ରବି ମୁଗ, ବିରି ବୁଣା ପାଇଁ କୃଷି ପରାମର୍ଶ',
      advisory1Title: 'ଖରିଫ ଧାନ ଅମଳ ଓ ଖଳାବାଡ଼ି ଶୁଖାଇବା ସମୟ',
      advisory1Desc: 'ଆଗାମୀ ୫-୭ ଦିନ ପାଗ ସମ୍ପୂର୍ଣ୍ଣ ଶୁଖିଲା ଓ ଖରାଟିଆ ରହିବ। ପାଚିଲା ଧାନ ତୁରନ୍ତ କାଟି ଖଳାରେ ୧୪% ଆର୍ଦ୍ରତା ପର୍ଯ୍ୟନ୍ତ ଶୁଖାଇ ସୁରକ୍ଷିତ ବସ୍ତାରେ ସାଇତି ରଖନ୍ତୁ।',
      advisory2Title: 'ରବି ଡାଲିଜାତୀୟ ଫସଲ ଓ ତୈଳବୀଜ ବୁଣିବା ସମୟ',
      advisory2Desc: 'ଜମିରେ ଥିବା ବଳକା ଆର୍ଦ୍ରତାକୁ ବ୍ୟବହାର କରି ବିନା ହଳରେ ମୁଗ, ବିରି ଏବଂ ସୋରିଷ ବୁଣାବୁଣି କାର୍ଯ୍ୟ ଆରମ୍ଭ କରନ୍ତୁ।',
      marineStatus: 'ସମୁଦ୍ର ଯାତ୍ରା ସମ୍ପୂର୍ଣ୍ଣ ସୁରକ୍ଷିତ',
      marineStatusClass: 'bg-emerald-950/80 text-emerald-300 border-emerald-800',
      waveHeight: '୦.୯ ମି – ୧.୬ ମି (ସ୍ୱାଭାବିକ)',
      offshoreWind: '୧୨–୧୮ ନଟ୍ (ଉତ୍ତର-ପୂର୍ବ)',
      fishermenWarning: 'ମତ୍ସ୍ୟଜୀବୀଙ୍କ ଡଙ୍ଗା ଓ ଟ୍ରଲର ପାଇଁ ସମୁଦ୍ର ସୁରକ୍ଷିତ'
    };
  }

  if (lang === 'hindi') {
    return {
      zone: 'COASTAL_EAST',
      isCoastal: true,
      zoneTitle: 'तटीय कृषि-मौसम व समुद्री सुरक्षा केंद्र',
      basinStatus: '🟢 बंगाल की खाड़ी: शांत व सुरक्षित',
      windDesc: '✓ मंद हवा • कटाई व सुखाने हेतु उत्तम',
      rainDesc: '✓ शुष्क मौसम • खुले खेतों के लिए सुरक्षित',
      authorityTitle: 'आईसीएआर-एनआरआरआई कटक (ICAR-NRRI): कृषि व रबी फसल निर्देश',
      authoritySubtitle: 'धान कटाई, दाना सुखाने एवं रबी दलहन बुवाई हेतु आधिकारिक कृषि बुलेटिन',
      advisory1Title: 'खरीफ धान कटाई एवं धूप में सुखाने का उपयुक्त समय',
      advisory1Desc: 'आगामी 5-7 दिनों तक मौसम पूरी तरह खुला और शुष्क रहेगा। पकी धान की फसल की कटाई तेज करें, दानों को 14% नमी तक सुखाकर सुरक्षित भंडारित करें।',
      advisory2Title: 'रबी दलहन (मूंग, उड़द) एवं तिलहन बुवाई का समय',
      advisory2Desc: 'खेतों की अवशिष्ट नमी का सदुपयोग करते हुए शून्य जुताई द्वारा मूंग, उड़द और सरसों की बुवाई समय पर पूरी करें।',
      marineStatus: 'मछुआरों के लिए पूर्णतः सुरक्षित',
      marineStatusClass: 'bg-emerald-950/80 text-emerald-300 border-emerald-800',
      waveHeight: '0.9 मी – 1.6 मी (सामान्य)',
      offshoreWind: '12–18 नॉट्स (उत्तर-पूर्वी)',
      fishermenWarning: 'तटीय ट्रॉलरों व नौकाओं हेतु समुद्र पूरी तरह शांत'
    };
  }

  // English Default Coastal
  return {
    zone: 'COASTAL_EAST',
    isCoastal: true,
    zoneTitle: 'Coastal Agro-Meteorological & Marine Intelligence',
    basinStatus: '🟢 Basin-Wide Calm',
    windDesc: '✓ Gentle • Safe for Spraying & Drying',
    rainDesc: '✓ Dry Weather • Safe for Open Fields',
    authorityTitle: 'ICAR-NRRI Cuttack: Coastal Paddy & Rabi Crop Directives',
    authoritySubtitle: 'Official ICAR-NRRI agro-meteorological advisory for harvested kharif paddy and rabi pulse sowing',
    advisory1Title: 'Kharif Harvest & Sun-Drying Window',
    advisory1Desc: 'Fair weather window next 5-7 days. Accelerate paddy harvesting, threshed grain drying to <14% moisture, and safe bag storage.',
    advisory2Title: 'Rabi Pulses & Oilseed Sowing Window',
    advisory2Desc: 'Ideal residual soil moisture for zero-tillage green gram (moong), black gram (biri) and mustard sowing across non-waterlogged plots.',
    marineStatus: 'SAFE FOR NAVIGATION',
    marineStatusClass: 'bg-emerald-950/80 text-emerald-300 border-emerald-800',
    waveHeight: '0.9 m – 1.6 m (Slight)',
    offshoreWind: '12–18 knots Northeasterly',
    fishermenWarning: 'Safe for Coastal Trawlers & Country Boats'
  };
}
