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
        title: 'Angle 1: Macro Leaf Lesion',
        label: 'Close-Up Microscopic View',
        desc: 'Wavy yellow margin with milky bacterial ooze beads on leaf veins.',
        imageUrl: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80',
        badge: 'Leaf Blade Close-Up'
      },
      {
        title: 'Angle 2: Full Canopy & Stalk Wilt',
        label: 'Mid-Plant Canopy Angle',
        desc: 'Extensive straw-colored leaf drying across the top crop canopy.',
        imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        badge: 'Plant Height Angle'
      },
      {
        title: 'Angle 3: Waterlogged Field Panoramic',
        label: 'Field-Wide Lodged View',
        desc: 'Patches of yellowing blighted crops submerged in receding flood mud.',
        imageUrl: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=800&q=80',
        badge: 'Field Damage Extent'
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
        title: 'Angle 1: Waterline Sheath Lesion',
        label: 'Stem Base Macro View',
        desc: 'Characteristic serpent-skin lesions with dark reddish margins near root collar.',
        imageUrl: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80',
        badge: 'Waterline Sheath View'
      },
      {
        title: 'Angle 2: Tiller Lodging & Sclerotia',
        label: 'Mid-Stem Cross Section',
        desc: 'Mustard-seed brown fungal sclerotia grains visible upon pulling sheath back.',
        imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80',
        badge: 'Fungal Sclerotia Angle'
      },
      {
        title: 'Angle 3: Collapsed Field Patch',
        label: 'Field Canopy Collapse',
        desc: 'Circular patches of lodged, rotten rice stalks flattened across muddy field.',
        imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80',
        badge: 'Lodging Patch View'
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
        title: 'Angle 1: Decayed Taproot Macro',
        label: 'Uprooted Taproot Angle',
        desc: 'Complete disintegration of feeder root hairs; blackened waterlogged taproot.',
        imageUrl: 'https://images.unsplash.com/photo-1599818816941-78e794354c00?auto=format&fit=crop&w=800&q=80',
        badge: 'Root Disintegration'
      },
      {
        title: 'Angle 2: Collar Constriction Zone',
        label: 'Stem Collar Angle',
        desc: 'Pencil-like brown pinching at ground level causing seedling to topple.',
        imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=800&q=80',
        badge: 'Stem Collar View'
      },
      {
        title: 'Angle 3: Wilted Patch in Mud',
        label: 'Field Submersion Plot',
        desc: 'Sudden yellow and brown death patches where rain water stagnated for 36 hours.',
        imageUrl: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80',
        badge: 'Field Wilt Pattern'
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
        title: 'Angle 1: Yellow Halo Spots Close-Up',
        label: 'Leaf Surface Macro',
        desc: 'Circular necrotic spots surrounded by luminous yellow chlorotic halos.',
        imageUrl: 'https://images.unsplash.com/photo-1598512752271-33f913a5af13?auto=format&fit=crop&w=800&q=80',
        badge: 'Halo Lesion Angle'
      },
      {
        title: 'Angle 2: Defoliated Canopy Stems',
        label: 'Canopy Bareness View',
        desc: 'Lower leaves dropped completely, leaving only top leaves on bare stalks.',
        imageUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
        badge: 'Defoliation Extent'
      },
      {
        title: 'Angle 3: Coastal Sandy Field Bed',
        label: 'Groundnut Field View',
        desc: 'Broad field view showing brown patches on sandy coastal groundnut strips.',
        imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        badge: 'Field Overview'
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
        title: 'Angle 1: Green Droop Macro',
        label: 'Whole Plant Green Droop',
        desc: 'Total foliage wilting while leaves remain lush green, characteristic of bacterial attack.',
        imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=800&q=80',
        badge: 'Bacterial Droop View'
      },
      {
        title: 'Angle 2: Glass Water Ooze Test',
        label: 'Diagnostic Ooze Test Angle',
        desc: 'Stem cut suspended in water releasing cloudy milky streaming threads within 60 seconds.',
        imageUrl: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80',
        badge: 'Diagnostic Ooze Test'
      },
      {
        title: 'Angle 3: Splash-Soaked Vegetable Beds',
        label: 'Field Raised Bed Overview',
        desc: 'Mulched raised vegetable beds with mud-splattered drooping tomato and pepper plants.',
        imageUrl: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80',
        badge: 'Raised Bed Plot'
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
        title: 'Angle 1: Betel Vine Collar Lesion',
        label: 'Vine Stem Macro View',
        desc: 'Dark blackened waterlogged foot rot lesion where vine emerges from muddy soil.',
        imageUrl: 'https://images.unsplash.com/photo-1599818816941-78e794354c00?auto=format&fit=crop&w=800&q=80',
        badge: 'Vine Foot Rot Collar'
      },
      {
        title: 'Angle 2: Paan Baroj Thatch Interior',
        label: 'Mid-Canopy Enclosure View',
        desc: 'Humid thatched baroj interior with wilting yellow leaves shedding along trellis.',
        imageUrl: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80',
        badge: 'Baroj Interior Angle'
      },
      {
        title: 'Angle 3: Coconut Palm Crown Rot',
        label: 'Palm Crown Aerial Angle',
        desc: 'Damaged coconut palm with yellowed central spindle leaf rotting post-storm.',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        badge: 'Palm Crown Spindle'
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
