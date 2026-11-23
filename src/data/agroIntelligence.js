// Authoritative State-Adaptive Coastal Agro-Meteorological & Marine Intelligence
// Supporting TNAU (Tamil Nadu), ANGRAU (Andhra Pradesh), KAU (Kerala), BCKV (West Bengal), AAU (Gujarat), and ICAR-NRRI (Odisha / National).

export function getStateAgroIntelligence(stateName = 'Odisha', selectedLang = 'english', livePrecip = 0, liveWind = 14) {
  const state = (stateName || '').toLowerCase();
  const lang = (selectedLang || 'english').toLowerCase();

  // 1. TAMIL NADU & PUDUCHERRY (Northeast Monsoon & Easterly Waves Season, Nov 23-27)
  if (state.includes('tamil nadu') || state.includes('puducherry') || state.includes('pondicherry') || state.includes('chennai')) {
    if (lang === 'tamil') {
      return {
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
    // Default English for Tamil Nadu
    return {
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

  // 2. ANDHRA PRADESH & TELANGANA (Rayalaseema & Coastal AP Showers)
  if (state.includes('andhra') || state.includes('telangana')) {
    if (lang === 'telugu') {
      return {
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

  // 3. KERALA & MAHE (Monsoon Showers 24-26 Nov)
  if (state.includes('kerala')) {
    if (lang === 'malayalam') {
      return {
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

  // 4. WEST BENGAL (Aman Harvest & Early Potato Sowing Window)
  if (state.includes('bengal') || state.includes('kolkata')) {
    if (lang === 'bengali' || lang === 'bangla') {
      return {
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

  // 5. GUJARAT & MAHARASHTRA (Saurashtra Cotton, Groundnut & Wheat Window)
  if (state.includes('gujarat') || state.includes('maharashtra') || state.includes('mumbai')) {
    if (lang === 'gujarati') {
      return {
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

  // 6. ODISHA & NATIONAL DEFAULT (ICAR-NRRI Cuttack & OUAT Mandate)
  if (lang === 'odia') {
    return {
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

  // English Default
  return {
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
