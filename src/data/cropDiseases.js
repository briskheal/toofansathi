// Comprehensive Post-Cyclone Crop Disease Pathology & Emergency Remedial Clinic
// Standardized on ICAR (Indian Council of Agricultural Research), OUAT, TNAU, and BCKV protocols

export const POST_CYCLONE_CROPS = [
  { id: 'paddy', name: 'Paddy / Rice', odia: 'ଧାନ ଫସଲ', hindi: 'धान / चावल', bangla: 'ধান', telugu: 'వరి', icon: '🌾' },
  { id: 'pulses', name: 'Pulses (Mung / Biri)', odia: 'ମୁଗ / ବିରି', hindi: 'मूंग / उड़द', bangla: 'মুগ / কলাই', telugu: 'మినుములు', icon: '🌱' },
  { id: 'groundnut', name: 'Groundnut / Peanut', odia: 'ଚିନାବାଦାମ', hindi: 'मूंगफली', bangla: 'চীনাবাদাম', telugu: 'వేరుశనగ', icon: '🥜' },
  { id: 'vegetables', name: 'Vegetables (Tomato / Chilli)', odia: 'ପନିପରିବା (ଟମାଟୋ / ଲଙ୍କା)', hindi: 'सब्जियां (टमाटर / मिर्च)', bangla: 'সবজি', telugu: 'కూరగాయలు', icon: '🍅' },
  { id: 'betel', name: 'Betel Vine (Paan) & Coconut', odia: 'ପାନ ବରଜ ଓ ନଡ଼ିଆ', hindi: 'पान और नारियल', bangla: 'পান ও নারকেল', telugu: 'తమలపాకు & కొబ్బరి', icon: '🍃' },
  { id: 'sugarcane', name: 'Sugarcane', odia: 'ଆଖୁ ଫସଲ', hindi: 'गन्ना', bangla: 'আখ', telugu: 'చెరకు', icon: '🎋' }
];

export const CROP_DISEASES = [
  // PADDY DISEASES
  {
    id: 'paddy-blb',
    cropId: 'paddy',
    name: 'Bacterial Leaf Blight (BLB)',
    vernacular: {
      odia: 'ଜୀବାଣୁ ଜନିତ ପତ୍ରପୋଡ଼ା ରୋଗ (ବି.ଏଲ୍.ବି)',
      hindi: 'जीवाणु पत्ती झुलसा रोग (बीएलबी)',
      bangla: 'ব্যাকটেরিয়া পাতা ঝলসানো রোগ',
      telugu: 'బాక్టీరియల్ ఆకు ఎండు తెగులు'
    },
    cycloneTrigger: 'Severe cyclone winds cause microscopic tears on leaves; flood water submersion carries Xanthomonas bacteria into leaf vascular bundles within 24-48 hours.',
    severity: 'High (Causes 40–60% crop yield collapse if untreated)',
    symptoms: [
      'Water-soaked translucent stripes near leaf tips extending downward along edges.',
      'Lesions turn wavy, straw-yellow, and milky-white.',
      'Bacterial amber-colored dew droplets (ooze) appear early morning on leaf surfaces.',
      'Kresek stage: Complete plant wilting and seedling death in inundated fields.'
    ],
    angles: [
      {
        title: 'Angle 1: Macro Leaf Lesion Inspection',
        label: 'Close-Up Microscopic Inspection',
        badge: 'Leaf Blade Close-Up Target',
        imageUrl: '/assets/diseases/paddy_blb_angle1.jpg',
        desc: 'Translucent water-soaked streaks near leaf margins; look for milky/amber bacterial ooze beads early in morning.',
        targetSymptom: 'Wavy yellow margin with amber bacterial ooze beads on veins.',
        tissueRisk: 'Wind micro-tears allow Xanthomonas bacteria colonization within 24-48 hours.'
      },
      {
        title: 'Angle 2: Full Canopy & Stalk Lodging',
        label: 'Mid-Plant Canopy Angle',
        badge: 'Plant Height & Canopy Target',
        imageUrl: '/assets/diseases/paddy_blb_angle2.jpg',
        desc: 'Extensive straw-colored leaf drying across the top crop canopy with bent/lodged tillers in wet mud.',
        targetSymptom: 'Straw-colored bleached canopy & weakened lodging stems.',
        tissueRisk: 'Submergence and high humidity (>90%) cause rapid xylem blockage.'
      },
      {
        title: 'Angle 3: Waterlogged Field Panoramic',
        label: 'Field-Wide Inundation Pattern',
        badge: 'Field Damage Extent Target',
        imageUrl: '/assets/diseases/paddy_blb_angle3.jpg',
        desc: 'Broad field view showing circular patches of wilting/submerged crops in standing receding storm runoff.',
        targetSymptom: 'Irregular yellowed patches concentrated in drainage depressions.',
        tissueRisk: 'Anaerobic root zone hypoxia accelerating vascular collapse.'
      }
    ],
    remedySteps: [
      {
        step: 1,
        title: 'Immediate Field Drainage (First 24 Hours)',
        desc: 'Cut boundary bund trenches to drain standing cyclone water to expose plant collars. Stagnant water multiplies bacterial colonies rapidly.'
      },
      {
        step: 2,
        title: 'Bactericide & Copper Spray (Hour 48-72)',
        desc: 'Spray Streptocycline @ 1.5 g PLUS Copper Oxychloride 50 WP (Blitox) @ 25 g dissolved in 10 Litres of fresh water (150-200 L water/acre).'
      },
      {
        step: 3,
        title: 'Nutrient Recovery & Salinity Countermeasure',
        desc: 'Foliar spray of 1% Potassium Nitrate (KNO3 @ 10 g/L) or 2% Urea + 1% MOP after water drains to revive lodged root uptake.'
      },
      {
        step: 4,
        title: 'Strict Post-Cyclone Warning',
        desc: 'DO NOT apply high Nitrogen/Urea top-dressing while leaves are waterlogged; excessive nitrogen accelerates bacterial spread.'
      }
    ],
    audioGuide: {
      odia: 'ବାତ୍ୟା ପରେ ଧାନ ଜମିରୁ ତୁରନ୍ତ ପାଣି ନିଷ୍କାସନ କରନ୍ତୁ। ପ୍ରତି ୧୦ ଲିଟର ପାଣିରେ ଦେଢ଼ ଗ୍ରାମ ଷ୍ଟ୍ରେପ୍ଟୋସାଇକ୍ଲିନ୍ ଏବଂ ୨୫ ଗ୍ରାମ ବ୍ଲାଇଟକ୍ସ ମିଶାଇ ସ୍ପ୍ରେ କରନ୍ତୁ। ୟୁରିଆ ସାର ଦିଅନ୍ତୁ ନାହିଁ।',
      hindi: 'चक्रवात के बाद धान के खेत से तुरंत पानी निकालें। 10 लीटर पानी में 1.5 ग्राम स्ट्रेप्टोसाइक्लिन और 25 ग्राम कॉपर ऑक्सीक्लोराइड मिलाकर छिड़काव करें। तुरंत यूरिया न डालें।'
    }
  },
  {
    id: 'paddy-sheath-blight',
    cropId: 'paddy',
    name: 'Sheath Blight & Stem Rot',
    vernacular: {
      odia: 'ଖୋଳପତ୍ର ପୋଡ଼ା ଓ କାଣ୍ଡପଚା ରୋଗ',
      hindi: 'शीथ ब्लाइट (तने की सड़न)',
      bangla: 'শীথ ব্লাইট ও কান্ড পচা',
      telugu: 'ఆకు తొడుగు ఎండు తెగులు'
    },
    cycloneTrigger: 'Prolonged relative humidity (>95%) combined with waterlogged plant bases after tropical cyclones creates ideal incubators for Rhizoctonia solani fungus.',
    severity: 'Severe (Panicles fail to emerge, stems break at water line)',
    symptoms: [
      'Oval or irregular greenish-grey water-soaked spots on leaf sheaths near waterline.',
      'Spots enlarge and coalesce with distinct dark reddish-brown borders (snake-skin pattern).',
      'Brown mustard-seed-like sclerotia develop inside infected leaf sheaths.',
      'Tillers rot, causing mature plants to lodge flat into wet mud.'
    ],
    angles: [
      {
        title: 'Angle 1: Waterline Sheath Lesion Inspection',
        label: 'Stem Base Macro Target',
        badge: 'Waterline Sheath View',
        imageUrl: '/assets/diseases/paddy_sheath_angle1.jpg',
        desc: 'Characteristic serpent-skin lesions with dark reddish margins near root collar.',
        targetSymptom: 'Oval greenish-grey water-soaked spots on leaf sheaths near waterline.',
        tissueRisk: 'Prolonged relative humidity (>95%) combined with waterlogged plant bases triggers fungal spread.'
      },
      {
        title: 'Angle 2: Tiller Lodging & Sclerotia Inspection',
        label: 'Mid-Stem Cross Section',
        badge: 'Fungal Sclerotia Target',
        imageUrl: '/assets/diseases/paddy_sheath_angle2.jpg',
        desc: 'Mustard-seed brown fungal sclerotia grains visible upon pulling sheath back.',
        targetSymptom: 'Brown mustard-seed-like sclerotia inside infected leaf sheaths.',
        tissueRisk: 'Tillers rot, causing mature plants to lodge flat into wet mud.'
      },
      {
        title: 'Angle 3: Collapsed Field Patch View',
        label: 'Field Canopy Collapse Pattern',
        badge: 'Lodging Patch Target',
        imageUrl: '/assets/diseases/paddy_sheath_angle3.jpg',
        desc: 'Circular patches of lodged, rotten rice stalks flattened across muddy field.',
        targetSymptom: 'Extensive dead lodging patches with rotting stem bases.',
        tissueRisk: 'Panicles fail to emerge, stems break at water line.'
      }
    ],
    remedySteps: [
      {
        step: 1,
        title: 'Stem Base Drainage',
        desc: 'Drain floodwater so plant stems dry in wind. Remove decaying floating leaf debris from ponding pockets.'
      },
      {
        step: 2,
        title: 'Targeted Sheath Fungicide Spray',
        desc: 'Spray Hexaconazole 5% SC (Contaf) @ 2 ml/L or Validamycin 3% L (Sheathmar) @ 2.5 ml/L, targeting plant bases.'
      },
      {
        step: 3,
        title: 'Advanced Systemic Control (Heavy Infection)',
        desc: 'For high-yielding hybrid paddy, spray Azoxystrobin 18.2% + Difenoconazole 11.4% SC (Amistar Top) @ 1 ml/L.'
      },
      {
        step: 4,
        title: 'Potash Fortification',
        desc: 'Apply additional MOP (Muriate of Potash) @ 15 kg/acre to strengthen cell walls against fungal penetration.'
      }
    ],
    audioGuide: {
      odia: 'ଧାନ ଗଛର ମୂଳକୁ ତୁରନ୍ତ ଶୁଖାନ୍ତୁ। ପ୍ରତି ଲିଟର ପାଣିରେ ୨ ମିଲିଲିଟର ହେକ୍ସାକୋନାଜୋଲ କିମ୍ବା ଅଢ଼େଇ ମିଲିଲିଟର ଭାଲିଡ଼ାମାଇସିନ୍ ମିଶାଇ ଗଛର ମୂଳ ଭାଗରେ ସ୍ପ୍ରେ କରନ୍ତୁ।',
      hindi: 'पौधों के निचले हिस्से से पानी निकालें। हेक्साकोनाज़ोल 2 मिली या वैलिडामाइसिन 2.5 मिली प्रति लीटर पानी में मिलाकर तनों के आधार पर छिड़कें।'
    }
  },

  // PULSES (MUNG / BIRI)
  {
    id: 'pulses-wet-rot',
    cropId: 'pulses',
    name: 'Wet Root Rot & Seedling Blight',
    vernacular: {
      odia: 'ମୁଗ-ବିରି ମୂଳପଚା ଓ ଢଳିପଡ଼ା ରୋଗ',
      hindi: 'दलहन गीला जड़ सड़न व उकठा रोग',
      bangla: 'ডাল জাতীয় ফসলের মূল পচা ও ঢলে পড়া',
      telugu: 'వేరు కుళ్లు మరియు ఎండు తెగులు'
    },
    cycloneTrigger: 'Pulses cannot withstand 24 hours of root submergence. Anaerobic mud triggers immediate Pythium & Rhizoctonia root rot.',
    severity: 'Catastrophic (100% loss in waterlogged hollows within 3 days)',
    symptoms: [
      'Leaves droop suddenly without yellowing; whole green plant collapses.',
      'Stem near soil turns blackish-brown and soft/mushy.',
      'Taproot rots completely with bark sloughing off when pulled gently.',
      'Foul sour fermentation odor from waterlogged soil root zone.'
    ],
    angles: [
      {
        title: 'Angle 1: Decayed Taproot Macro Inspection',
        label: 'Uprooted Taproot Target',
        badge: 'Root Disintegration View',
        imageUrl: '/assets/diseases/pulses_rot_angle1.jpg',
        desc: 'Complete disintegration of feeder root hairs; blackened waterlogged taproot.',
        targetSymptom: 'Taproot rots completely with bark sloughing off when pulled gently.',
        tissueRisk: 'Anaerobic mud triggers immediate Pythium & Rhizoctonia root rot within 24 hours.'
      },
      {
        title: 'Angle 2: Collar Constriction Zone Inspection',
        label: 'Stem Collar Target',
        badge: 'Stem Collar View',
        imageUrl: '/assets/diseases/pulses_rot_angle2.jpg',
        desc: 'Pencil-like brown pinching at ground level causing seedling to topple.',
        targetSymptom: 'Stem near soil turns blackish-brown and soft/mushy.',
        tissueRisk: 'Loss of vascular transport to upper foliage.'
      },
      {
        title: 'Angle 3: Wilted Patch in Mud Pattern',
        label: 'Field Submersion Plot',
        badge: 'Field Wilt Pattern',
        imageUrl: '/assets/diseases/pulses_rot_angle3.jpg',
        desc: 'Sudden yellow and brown death patches where rain water stagnated for 36 hours.',
        targetSymptom: 'Leaves droop suddenly without yellowing; whole green plant collapses.',
        tissueRisk: '100% loss in waterlogged hollows within 3 days.'
      }
    ],
    remedySteps: [
      {
        step: 1,
        title: 'Emergency Drainage Furrows',
        desc: 'Dig 1-foot deep drainage furrows across every 10 meters immediately to pull capillary water away from roots.'
      },
      {
        step: 2,
        title: 'Soil Drenching with Bio-Fungicide',
        desc: 'Drench root collars with Trichoderma viride @ 5 g/L or Copper Oxychloride 50 WP @ 3 g/L as soon as soil surface cracks.'
      },
      {
        step: 3,
        title: 'Foliar Revival Spray',
        desc: 'Spray 19-19-19 water-soluble NPK @ 5 g/L + Micronutrient mixture to stimulate new feeder root growth.'
      }
    ],
    audioGuide: {
      odia: 'ଜମିରୁ ତୁରନ୍ତ ନାଳ କରି ପାଣି କାଢ଼ନ୍ତୁ। ପ୍ରତି ଲିଟର ପାଣିରେ ୩ ଗ୍ରାମ ବ୍ଲାଇଟକ୍ସ କିମ୍ବା ୫ ଗ୍ରାମ ଟ୍ରାଇକୋଡର୍ମା ମିଶାଇ ଗଛ ମୂଳକୁ ଭିଜାନ୍ତୁ।',
      hindi: 'खेत से नाली बनाकर तुरंत जल निकासी करें। 3 ग्राम कॉपर ऑक्सीक्लोराइड प्रति लीटर पानी से पौधों की जड़ों की मिट्टी को तर करें।'
    }
  },

  // GROUNDNUT / PEANUT
  {
    id: 'groundnut-tikka',
    cropId: 'groundnut',
    name: 'Tikka Leaf Spot & Stem Rot',
    vernacular: {
      odia: 'ଚିନାବାଦାମ ଟିକ୍କା ପତ୍ରଦାଗ ଓ କାଣ୍ଡପଚା',
      hindi: 'मूंगफली टिक्का रोग व तना सड़न',
      bangla: 'চীনাবাদাম টিক্কা রোগ',
      telugu: 'వేరుశనగ తిక్కా ఆకుమచ్చ తెగులు'
    },
    cycloneTrigger: 'Coastal high humidity and rain splashes disperse Cercospora spores across the entire canopy within 48 hours of cyclone passage.',
    severity: 'High (Premature defoliation prevents pod filling)',
    symptoms: [
      'Early Tikka: Circular reddish-brown spots with prominent bright yellow halos on upper leaf surfaces.',
      'Late Tikka: Dark brown to black spots without yellow halos on leaf underside.',
      'Severe defoliation leaves bare stems with poor pod development.',
      'Stem Rot: White cottony fungal mycelium at soil level with mustard-like sclerotia.'
    ],
    angles: [
      {
        title: 'Angle 1: Yellow Halo Spots Close-Up Inspection',
        label: 'Leaf Surface Macro Target',
        badge: 'Halo Lesion Target',
        imageUrl: '/assets/diseases/groundnut_tikka_angle1.jpg',
        desc: 'Circular necrotic spots surrounded by luminous yellow chlorotic halos on foliage.',
        targetSymptom: 'Circular reddish-brown spots with prominent bright yellow halos on upper leaf surfaces.',
        tissueRisk: 'Coastal high humidity and rain splashes disperse Cercospora spores across the entire canopy.'
      },
      {
        title: 'Angle 2: Defoliated Canopy Stems Inspection',
        label: 'Canopy Bareness View',
        badge: 'Defoliation Extent Target',
        desc: 'Lower leaves dropped completely, leaving only top leaves on bare stalks.',
        targetSymptom: 'Severe defoliation leaving bare stems with stunted pod development.',
        tissueRisk: 'Premature defoliation prevents pod filling.'
      },
      {
        title: 'Angle 3: Coastal Sandy Field Bed Pattern',
        label: 'Groundnut Field View',
        badge: 'Field Overview Target',
        desc: 'Broad field view showing brown patches on sandy coastal groundnut strips.',
        targetSymptom: 'Stem Rot: White cottony fungal mycelium at soil level with mustard-like sclerotia.',
        tissueRisk: 'Soil-level collar rot rotting gynophores/pegs.'
      }
    ],
    remedySteps: [
      {
        step: 1,
        title: 'Foliar Fungicide Barrier Spray',
        desc: 'Spray Mancozeb 75 WP @ 2.5 g/L or Chlorothalonil 75 WP (Kavach) @ 2 g/L on dry foliage.'
      },
      {
        step: 2,
        title: 'Systemic Eradication (Severe Attack)',
        desc: 'Spray Tebuconazole 25.9% EC (Folicur) @ 1.5 ml/L or Hexaconazole 5% SC @ 2 ml/L.'
      },
      {
        step: 3,
        title: 'Gypsum Top-Dressing for Pod Hardening',
        desc: 'Apply Gypsum @ 200 kg/acre at flowering/pegging zone to replenish calcium displaced by storm rain.'
      }
    ],
    audioGuide: {
      odia: 'ଚିନାବାଦାମରେ ପତ୍ର ଝଡ଼ିବା ରୋକିବା ପାଇଁ ୨.୫ ଗ୍ରାମ ମାଙ୍କୋଜେବ୍ କିମ୍ବା ୧.୫ ମିଲି ଫଲିକୁର ପ୍ରତି ଲିଟର ପାଣିରେ ମିଶାଇ ସ୍ପ୍ରେ କରନ୍ତୁ। ଜିପସମ ସାର ଦିଅନ୍ତୁ।',
      hindi: 'पत्तियों को झड़ने से बचाने के लिए 2.5 ग्राम मैंकोज़ेब या 1.5 मिली टेबुकोनाज़ोल प्रति लीटर पानी में मिलाकर छिड़काव करें।'
    }
  },

  // VEGETABLES (TOMATO / CHILLI / BRINJAL)
  {
    id: 'veg-bacterial-wilt',
    cropId: 'vegetables',
    name: 'Bacterial Wilt & Damping-Off (Tomato / Chilli)',
    vernacular: {
      odia: 'ପନିପରିବା ଢଳିପଡ଼ା ଓ କାଣ୍ଡପଚା ରୋଗ (ଟମାଟୋ/ଲଙ୍କା)',
      hindi: 'सब्जियों का जीवाणु उकठा व आर्द्र गलन (टमाटर/मिर्च)',
      bangla: 'টমেটো ও লঙ্কার ব্যাকটেরিয়াজনিত ঢলে পড়া',
      telugu: 'కూరగాయల బాక్టీరియల్ ఎండు తెగులు'
    },
    cycloneTrigger: 'High soil temperatures right after stormy rains cause rapid multiplication of soil-borne Ralstonia bacteria in submerged roots.',
    severity: 'Very Severe (100% loss of affected plants within 48 hours)',
    symptoms: [
      'Rapid wilting of entire green plant during hot sunny hours without leaf yellowing.',
      'Vascular ring browning visible when stem is sliced horizontally.',
      'Bacterial Stream Test: Sliced stem in a glass of clear water shows white thread-like bacterial ooze.',
      'Fruit rot: Mud splashes deposit Phytophthora spores onto green tomatoes/chillies.'
    ],
    angles: [
      {
        title: 'Angle 1: Green Droop Macro Inspection',
        label: 'Whole Plant Green Droop Target',
        badge: 'Bacterial Droop View',
        imageUrl: '/assets/diseases/veg_wilt_angle1.jpg',
        desc: 'Total foliage wilting while leaves remain lush green, characteristic of bacterial attack.',
        targetSymptom: 'Rapid wilting of entire green plant during hot sunny hours without leaf yellowing.',
        tissueRisk: 'High soil temperatures right after stormy rains cause rapid multiplication of soil-borne Ralstonia.'
      },
      {
        title: 'Angle 2: Glass Water Ooze Test Inspection',
        label: 'Diagnostic Ooze Test Target',
        badge: 'Diagnostic Ooze Test',
        imageUrl: '/assets/diseases/veg_wilt_angle2.jpg',
        desc: 'Stem cut suspended in water releasing cloudy milky streaming threads within 60 seconds.',
        targetSymptom: 'Vascular ring browning visible when stem is sliced horizontally.',
        tissueRisk: 'Vascular xylem clogging leading to total turgor collapse.'
      },
      {
        title: 'Angle 3: Splash-Soaked Vegetable Beds Pattern',
        label: 'Field Raised Bed Overview',
        badge: 'Raised Bed Plot Target',
        imageUrl: '/assets/diseases/veg_wilt_angle3.jpg',
        desc: 'Mulched raised vegetable beds with mud-splattered drooping tomato and pepper plants.',
        targetSymptom: 'Fruit rot: Mud splashes deposit Phytophthora spores onto green fruits.',
        tissueRisk: '100% loss of affected plants within 48 hours.'
      }
    ],
    remedySteps: [
      {
        step: 1,
        title: 'Uproot & Burn Dead Plants Immediately',
        desc: 'Carefully remove completely wilted plants with roots and burn them. Do not toss into irrigation channels.'
      },
      {
        step: 2,
        title: 'Root Drenching with Bactericide',
        desc: 'Drench root zones of healthy neighboring plants with Streptocycline (1 g in 10 L) + Copper Oxychloride (30 g in 10 L).'
      },
      {
        step: 3,
        title: 'Foliar Fruit Rot Protective Spray',
        desc: 'Spray Metalaxyl 8% + Mancozeb 64% WP (Ridomil Gold) @ 2.5 g/L to prevent Buckeye fruit rot from rain splashes.'
      },
      {
        step: 4,
        title: 'Bleaching Powder Treatment',
        desc: 'Apply bleaching powder (chlorine) @ 2 kg/acre mixed with sand along irrigation furrows to sanitize bacteria.'
      }
    ],
    audioGuide: {
      odia: 'ରୋଗିଣା ଗଛକୁ ତୁରନ୍ତ ଉପାଡ଼ି ନଷ୍ଟ କରନ୍ତୁ। ସୁସ୍ଥ ଗଛ ମୂଳରେ ୧୦ ଲିଟର ପାଣିରେ ୧ ଗ୍ରାମ ଷ୍ଟ୍ରେପ୍ଟୋସାଇକ୍ଲିନ୍ ଓ ୩୦ ଗ୍ରାମ ବ୍ଲାଇଟକ୍ସ ମିଶାଇ ଢାଳନ୍ତୁ। ଫଳପଚା ପାଇଁ ରିଡୋମିଲ୍ ଗୋଲ୍ଡ ସ୍ପ୍ରେ କରନ୍ତୁ।',
      hindi: 'मुरझाए पौधों को तुरंत उखाड़कर नष्ट करें। स्वस्थ पौधों की जड़ों में 1 ग्राम स्ट्रेप्टोसाइक्लिन व 30 ग्राम कॉपर फफूंदनाशी 10 लीटर पानी में घोलकर डालें।'
    }
  },

  // BETEL VINE & COCONUT
  {
    id: 'betel-foot-rot',
    cropId: 'betel',
    name: 'Betel Vine Foot Rot & Coconut Bud Rot',
    vernacular: {
      odia: 'ପାନ ବରଜ ମୂଳପଚା ଓ ନଡ଼ିଆ କାନ୍ଦିପଚା ରୋଗ',
      hindi: 'पान की जड़ सड़न व नारियल का कली सड़न रोग',
      bangla: 'পানের গোড়া পচা ও নারকেলের কুঁড়ি পচা',
      telugu: 'తమలపాకు మొదలు కుళ్లు & కొబ్బరి మొవ్వు కుళ్లు'
    },
    cycloneTrigger: 'Severe cyclone winds break paan baroj bamboo structures, causing rainwater ponding and Phytophthora fungal infestation in humid enclosed vines.',
    severity: 'Devastating (Entire Paan Baroj wipes out in 7–10 days)',
    symptoms: [
      'Betel vine: Brown water-soaked lesions at soil level; leaves turn dull yellow and drop rapidly.',
      'Rapid rotting of underground rhizome; vine snaps easily near the base.',
      'Coconut: Central spear leaf bends, withers, and rots with foul smell; crown detaches.',
      'Coastal storm saline spray burns leaf margins brown.'
    ],
    angles: [
      {
        title: 'Angle 1: Betel Vine Collar Lesion Inspection',
        label: 'Vine Stem Macro Target',
        badge: 'Vine Foot Rot Collar View',
        imageUrl: '/assets/diseases/betel_paan_angle1.jpg',
        desc: 'Dark blackened waterlogged foot rot lesion where vine emerges from muddy soil.',
        targetSymptom: 'Betel vine: Brown water-soaked lesions at soil level; leaves turn dull yellow.',
        tissueRisk: 'Severe cyclone winds break paan baroj bamboo structures, causing rainwater ponding.'
      },
      {
        title: 'Angle 2: Paan Baroj Thatch Interior Inspection',
        label: 'Mid-Canopy Enclosure Target',
        badge: 'Baroj Interior Target',
        desc: 'Humid thatched baroj interior with wilting yellow leaves shedding along trellis.',
        targetSymptom: 'Rapid rotting of underground rhizome; vine snaps easily near the base.',
        tissueRisk: 'Phytophthora fungal infestation in humid enclosed vines.'
      },
      {
        title: 'Angle 3: Coconut Palm Crown Rot Inspection',
        label: 'Palm Crown Aerial Target',
        badge: 'Palm Crown Spindle Target',
        desc: 'Damaged coconut palm with yellowed central spindle leaf rotting post-storm.',
        targetSymptom: 'Coconut: Central spear leaf bends, withers, and rots with foul smell; crown detaches.',
        tissueRisk: 'Coastal storm saline spray burns leaf margins brown, bud rot kills growing tip.'
      }
    ],
    remedySteps: [
      {
        step: 1,
        title: 'Baroj Ventilation & De-silting',
        desc: 'Open side thatched bamboo screens to allow fresh air movement and sunlight to dry humid vine collars.'
      },
      {
        step: 2,
        title: 'Bordeaux Mixture or Metalaxyl Drenching',
        desc: 'Drench vine root bases with 0.5% to 1.0% fresh Bordeaux Mixture or Metalaxyl MZ @ 2 g/L.'
      },
      {
        step: 3,
        title: 'Coconut Crown Treatment',
        desc: 'Clean rotten tissues from coconut crown, pour 10 g Copper Oxychloride in 1 L water into the crown spindle, and cover with cloth/plastic hood against rain.'
      }
    ],
    audioGuide: {
      odia: 'ପାନ ବରଜରୁ ତୁରନ୍ତ ପାଣି ବାହାର କରି ପବନ ଯିବା ଆସିବା ବ୍ୟବସ୍ଥା କରନ୍ତୁ। ଗଛ ମୂଳରେ ୧ ପ୍ରତିଶତ ବୋର୍ଡୋ ମିଶ୍ରଣ କିମ୍ବା ରିଡୋମିଲ୍ ଗୋଲ୍ଡ ଢାଳନ୍ତୁ। ନଡ଼ିଆ ଗଛର ଅଗ ଭାଗ ସଫା କରି ବ୍ଲାଇଟକ୍ସ ଲଗାନ୍ତୁ।',
      hindi: 'पान के बरेजे से पानी निकालकर हवा आने दें। जड़ों में 1% बोर्डो मिश्रण या रिडोमिल गोल्ड डालें। नारियल के मुकुट को साफ कर कॉपर ऑक्सीक्लोराइड का लेप लगाएं।'
    }
  },

  // SUGARCANE (RED ROT & STALK LODGING)
  {
    id: 'sugarcane-red-rot',
    cropId: 'sugarcane',
    name: 'Red Rot & Stalk Lodging (Sett Rot)',
    vernacular: {
      odia: 'ଆଖୁ ରକ୍ତରୋଗ ଓ କାଣ୍ଡପଚା (ରେଡ୍ ରଟ୍)',
      hindi: 'गन्ने का लाल सड़न रोग (रेड रॉट)',
      bangla: 'আখের লাল পচা রোগ (রেড রট)',
      telugu: 'చెరకు ఎర్ర కుళ్లు తెగులు (రెడ్ రాట్)'
    },
    cycloneTrigger: 'Severe cyclonic gale winds crack mature cane stalks and strip leaf sheaths. Flood water stagnation carries Colletotrichum fungal spores into root eyes and wind fractures within 48-72 hours.',
    severity: 'Catastrophic (Causes 100% juice deterioration and total clump death)',
    symptoms: [
      'Third or fourth leaf from top shows yellowing, drying along margins, and tip withering.',
      'Longitudinal splitting of cane stalk reveals red pith interspersed with diagnostic white cross-bands.',
      'Alcoholic sour fermentation odor emitted from split stalk tissue.',
      'Nodes break easily and hollow out with greyish-white fungal hyphae.'
    ],
    angles: [
      {
        title: 'Angle 1: Split Stalk Red Pith Macro Inspection',
        label: 'Internal Vascular Core View',
        badge: 'Red Pith & White Cross-Bands',
        desc: 'Split cane stalk showing deep reddish-brown discoloration interrupted by distinct transverse white patches across the pith.',
        targetSymptom: 'Longitudinal splitting of cane reveals red pith interspersed with diagnostic white cross-bands.',
        tissueRisk: 'Wind micro-cracks allow rapid mycelial invasion of vascular parenchyma.'
      },
      {
        title: 'Angle 2: Crown Canopy Desiccation & Lodging',
        label: 'Mid-Canopy Stalk Target',
        badge: 'Canopy Crown Target',
        desc: 'Upper foliage drying from margins inwards, midrib showing reddish lesions, and stalks bent or snapped in mud.',
        targetSymptom: 'Third or fourth leaf from top shows yellowing, drying along margins, and tip withering.',
        tissueRisk: 'Vascular vessel clogging halts sucrose synthesis and water translocation.'
      },
      {
        title: 'Angle 3: Waterlogged Furrow Plot Pattern',
        label: 'Field Submersion Overview',
        badge: 'Field Inundation Target',
        desc: 'Standing flood water in sugarcane furrows with scattered dead clumps and collapsed cane hills.',
        targetSymptom: 'Extensive clump collapse in poorly drained depression furrows.',
        tissueRisk: 'Root zone hypoxia and rapid subterranean sett rot.'
      }
    ],
    remedySteps: [
      {
        step: 1,
        title: 'Deep Furrow Drainage (First 24 Hours)',
        desc: 'Excavate 45 cm deep drainage trenches between cane rows to drain standing water immediately. Standing water accelerates sett rot exponentially.'
      },
      {
        step: 2,
        title: 'Prophylactic Fungicide Drench & Spray',
        desc: 'Spray and drench root stools with Carbendazim 50 WP (Bavistin) @ 1 g/L or Thiophanate Methyl 70 WP (Roko) @ 1.5 g/L dissolved in 200 L water/acre.'
      },
      {
        step: 3,
        title: 'Clump Uprighting & Trash Removal',
        desc: 'Carefully prop up lodged cane stalks by tying 4–5 stalks together into tripods. Strip muddy, rotting lower dry leaves (trash) to increase air circulation.'
      },
      {
        step: 4,
        title: 'Strict Seed Cane Warning',
        desc: 'NEVER use storm-inundated or cracked stalks as seed cane (setts) for next season; red rot is strictly sett-borne and will wipe out the subsequent crop.'
      }
    ],
    audioGuide: {
      odia: 'ବାତ୍ୟା ପରେ ଆଖୁ ଜମିରୁ ତୁରନ୍ତ ଗଭୀର ନାଳ କରି ପାଣି ନିଷ୍କାସନ କରନ୍ତୁ। ପ୍ରତି ଲିଟର ପାଣିରେ ୧ ଗ୍ରାମ ବାଭିଷ୍ଟିନ୍ କିମ୍ବା ୧.୫ ଗ୍ରାମ ରୋକୋ ମିଶାଇ ଗଛ ମୂଳରେ ସ୍ପ୍ରେ କରନ୍ତୁ। ଭାଙ୍ଗି ପଡ଼ିଥିବା ଆଖୁକୁ ବାନ୍ଧି ଛିଡ଼ା କରନ୍ତୁ।',
      hindi: 'गन्ने के खेत से तुरंत नाली बनाकर जल निकासी करें। 1 ग्राम बाविस्टिन या 1.5 ग्राम रोको प्रति लीटर पानी में मिलाकर जड़ों पर छिड़कें। गिरे हुए गन्नों को सहारा देकर बांधें।'
    }
  }
];

export const ICAR_POST_CYCLONE_WORKSHOP_RULES = [
  {
    step: 'Hour 0 – 24',
    title: 'De-silting & Gravitational Drainage',
    desc: 'Excavate 30 cm deep cross-furrows at field margins. Standing flood water reduces root oxygen to near-zero within 36 hours.'
  },
  {
    step: 'Hour 24 – 48',
    title: 'Stem Uprighting & Mud Washing',
    desc: 'For lodged paddy/pulses, gently lift entangled bunches and bundle together in small sheaves. Wash silt and slime off leaf surfaces with fresh pond water to restore photosynthesis.'
  },
  {
    step: 'Hour 48 – 72',
    title: 'Prophylactic Fungicide / Bactericide Blanket Spray',
    desc: 'Apply a dual-action bactericide + fungicide mix (e.g., Streptocycline + Copper Oxychloride) before microscopic storm wounds begin showing fungal spores.'
  },
  {
    step: 'Day 4 – 7',
    title: 'Salinity Leaching & Potassium Boosting',
    desc: 'In coastal storm surge inundated soils (EC > 4 dS/m), broadcast 150 kg/acre Agricultural Gypsum to displace toxic sodium ions, followed by 1% KNO3 foliar nutrition.'
  }
];
