// Authoritative Directory of Key Cities, Agricultural Mandis & Wholesale Markets across all 28 States & 8 UTs of India

export const ALL_INDIA_REGIONS = [
  // ==========================================
  // 1. ODISHA (Key Coastal, Interior Hubs & Mandis)
  // ==========================================
  { id: 'bhubaneswar', name: 'Bhubaneswar', state: 'Odisha', basin: 'Bay of Bengal', lat: 20.2961, lon: 85.8245, highRisk: false, isMajorCity: true, category: 'State Capital & Tech Hub', market: 'Unit-1 Daily Market & AG Square Wholesale Hub', deoc: '0674-2395531' },
  { id: 'cuttack', name: 'Cuttack', state: 'Odisha', basin: 'Bay of Bengal', lat: 20.4625, lon: 85.8828, highRisk: false, isMajorCity: true, category: 'Millennium City & Judicial Hub', market: 'Malgodown Grain Wholesale Mandi & Chhatra Bazar', deoc: '0671-2507842' },
  { id: 'puri', name: 'Puri', state: 'Odisha', basin: 'Bay of Bengal', lat: 19.8135, lon: 85.8312, highRisk: true, isMajorCity: true, category: 'Coastal Pilgrim Hub', market: 'Swargadwar Fish & Sea Market, Grand Road Mandi', deoc: '06752-223230' },
  { id: 'rourkela', name: 'Rourkela', state: 'Odisha', basin: 'Inland Depression', lat: 22.2604, lon: 84.8536, highRisk: false, isMajorCity: true, category: 'Steel City & Western Odisha Hub', market: 'Daily Market & Bisra Commercial Steel Mandi', deoc: '0661-2500120' },
  { id: 'berhampur', name: 'Berhampur / Ganjam', state: 'Odisha', basin: 'Bay of Bengal', lat: 19.3149, lon: 84.9818, highRisk: true, isMajorCity: true, category: 'Southern Commercial Hub', market: 'Bada Bazar Silk, Grain & Hill Produce Mandi', deoc: '06811-263700' },
  { id: 'balasore', name: 'Balasore (Baleswar)', state: 'Odisha', basin: 'Bay of Bengal', lat: 21.4934, lon: 86.9135, highRisk: true, isMajorCity: true, category: 'Northern Coastal Hub', market: 'Fakir Mohan Vegetable & Marine Fish Landing Market', deoc: '06782-262674' },
  { id: 'sambalpur', name: 'Sambalpur', state: 'Odisha', basin: 'Inland Depression', lat: 21.4669, lon: 83.9812, highRisk: false, isMajorCity: true, category: 'Hirakud & Cultural Hub', market: 'Golbazar Agricultural Mandi & Sambalpuri Handloom Hub', deoc: '0663-2412500' },
  { id: 'bargarh', name: 'Bargarh (Rice Bowl)', state: 'Odisha', basin: 'Inland Depression', lat: 21.3323, lon: 83.6190, highRisk: false, isMajorCity: true, category: 'Agricultural Rice Capital', market: 'Regulated Market Committee (RMC) Paddy & Grain Mandi', deoc: '06646-231145' },
  { id: 'paradip', name: 'Paradip (Jagatsinghpur)', state: 'Odisha', basin: 'Bay of Bengal', lat: 20.3165, lon: 86.6114, highRisk: true, isMajorCity: false, category: 'Major Deepwater Port', market: 'Marine Fishing Harbor & Port Cargo Commercial Yard', deoc: '06722-221262' },
  { id: 'bhadrak', name: 'Bhadrak (Dhamra Port)', state: 'Odisha', basin: 'Bay of Bengal', lat: 21.0574, lon: 86.4958, highRisk: true, isMajorCity: false, category: 'Coastal Belt', market: 'Dhamra Marine Fish Harbor & Puruna Bazar Mandi', deoc: '06784-251881' },
  { id: 'kendrapara', name: 'Kendrapara', state: 'Odisha', basin: 'Bay of Bengal', lat: 20.5015, lon: 86.4224, highRisk: true, isMajorCity: false, category: 'Bhitarkanika Coastal Belt', market: 'Tinikonia Daily Market & Jute Trade Center', deoc: '06727-232803' },
  { id: 'baripada', name: 'Baripada (Mayurbhanj)', state: 'Odisha', basin: 'Inland Depression', lat: 21.9346, lon: 86.7329, highRisk: false, isMajorCity: false, category: 'Simlipal Forest & Tribal Belt', market: 'Katchery Bazaar & Sabai Grass/Forest Mandi', deoc: '06792-252758' },
  { id: 'jeypore', name: 'Jeypore / Koraput', state: 'Odisha', basin: 'Inland Depression', lat: 18.8550, lon: 82.5695, highRisk: false, isMajorCity: false, category: 'Eastern Ghats Highlands', market: 'Daily Agricultural Produce & Coffee/Cashew Mandi', deoc: '06852-251422' },

  // ==========================================
  // 2. WEST BENGAL (Key Cities & Major Wholesale Markets)
  // ==========================================
  { id: 'kolkata', name: 'Kolkata', state: 'West Bengal', basin: 'Bay of Bengal', lat: 22.5726, lon: 88.3639, highRisk: false, isMajorCity: true, category: 'State Capital & Mega Metro', market: 'Burrabazar Posta Wholesale Hub, Sealdah Koley Market', deoc: '033-22143526' },
  { id: 'howrah', name: 'Howrah', state: 'West Bengal', basin: 'Bay of Bengal', lat: 22.5958, lon: 88.2636, highRisk: false, isMajorCity: true, category: 'Railway & Industrial Hub', market: 'Howrah Wholesale Fish Market & Mullick Ghat Flower Market', deoc: '033-26381240' },
  { id: 'digha', name: 'Digha (Purba Medinipur)', state: 'West Bengal', basin: 'Bay of Bengal', lat: 21.6266, lon: 87.5074, highRisk: true, isMajorCity: true, category: 'Primary Coastal Beach Hub', market: 'Digha Mohana Fish Auction Harbor & Marine Market', deoc: '03228-263013' },
  { id: 'haldia', name: 'Haldia', state: 'West Bengal', basin: 'Bay of Bengal', lat: 22.0667, lon: 88.0698, highRisk: true, isMajorCity: true, category: 'Major Industrial Port City', market: 'Durgachak Commercial Center & Port Logistic Yard', deoc: '03224-252100' },
  { id: 'siliguri', name: 'Siliguri', state: 'West Bengal', basin: 'Inland Depression', lat: 26.7271, lon: 88.3953, highRisk: false, isMajorCity: true, category: 'North Bengal Gateway Hub', market: 'Regulated Agricultural Mandi & Hong Kong Trade Market', deoc: '0353-2512300' },
  { id: 'asansol', name: 'Asansol / Durgapur', state: 'West Bengal', basin: 'Inland Depression', lat: 23.6739, lon: 86.9524, highRisk: false, isMajorCity: true, category: 'Mining & Steel Belt', market: 'Bastian Market & Benachity Commercial Center', deoc: '0341-2253011' },
  { id: 'darjeeling', name: 'Darjeeling', state: 'West Bengal', basin: 'Inland Depression', lat: 27.0410, lon: 88.2663, highRisk: false, isMajorCity: true, category: 'Himalayan Foothills (Winter Cold)', market: 'Chowk Bazaar & Tea Auction Trading Center', deoc: '0354-2252125' },
  { id: 'sagar_island', name: 'Sagar Island (South 24 Pgs)', state: 'West Bengal', basin: 'Bay of Bengal', lat: 21.6517, lon: 88.0772, highRisk: true, isMajorCity: false, category: 'Ganga Sagar Coastal Delta', market: 'Gangasagar Fish & Pilgrim Pilgrimage Market', deoc: '033-24791010' },
  { id: 'kakdwip', name: 'Kakdwip / Sundarbans', state: 'West Bengal', basin: 'Bay of Bengal', lat: 21.8744, lon: 88.1887, highRisk: true, isMajorCity: false, category: 'Sundarbans Mangrove Delta', market: 'Kakdwip Marine Fish Auction Harbor & Honey Mandi', deoc: '033-24791010' },

  // ==========================================
  // 3. NORTH EAST INDIA (8 Sister & Brother States)
  // ==========================================
  // ASSAM
  { id: 'guwahati', name: 'Guwahati', state: 'Assam', basin: 'Brahmaputra Valley', lat: 26.1445, lon: 91.7362, highRisk: false, isMajorCity: true, category: 'Commercial Capital of North East', market: 'Fancy Bazaar, Machkhowa Wholesale Fruit & Fish Mandi, Pamohi APMC', deoc: '0361-2733052' },
  { id: 'silchar', name: 'Silchar', state: 'Assam', basin: 'Barak Valley', lat: 24.8333, lon: 92.7789, highRisk: false, isMajorCity: true, category: 'Barak Valley Economic Hub', market: 'Fatuk Bazaar Wholesale Mandi & Cachar Tea Trading Yard', deoc: '03842-245866' },
  { id: 'dibrugarh', name: 'Dibrugarh', state: 'Assam', basin: 'Upper Assam', lat: 27.4728, lon: 94.9120, highRisk: false, isMajorCity: true, category: 'Tea City of India & Upper Assam Hub', market: 'New Market Commercial Area & Graham Bazar Tea/Timber Trade', deoc: '0373-2313434' },
  { id: 'jorhat', name: 'Jorhat', state: 'Assam', basin: 'Upper Assam', lat: 26.7509, lon: 94.2037, highRisk: false, isMajorCity: true, category: 'Cultural Capital & Tea Research Hub', market: 'Jorhat Tea Auction Centre & Gar-Ali Wholesale Market', deoc: '0376-2320021' },
  { id: 'tezpur', name: 'Tezpur', state: 'Assam', basin: 'Brahmaputra Valley', lat: 26.6528, lon: 92.7926, highRisk: false, isMajorCity: true, category: 'Sonitpur Commercial & Agricultural Hub', market: 'Chowk Bazaar Daily Market & Mahabhairab Mandi', deoc: '03712-220011' },

  // MEGHALAYA
  { id: 'shillong', name: 'Shillong', state: 'Meghalaya', basin: 'Khasi Hills', lat: 25.5788, lon: 91.8933, highRisk: false, isMajorCity: true, category: 'State Capital & Scotland of East (Winter 3-15°C)', market: "Iewduh (Bara Bazaar - NE's Oldest Traditional Market) & Police Bazar", deoc: '0364-2225289' },
  { id: 'tura', name: 'Tura', state: 'Meghalaya', basin: 'Garo Hills', lat: 25.5144, lon: 90.2033, highRisk: false, isMajorCity: true, category: 'Garo Hills Commercial Center', market: 'Tura Super Market & Ginger, Cashew and Arecanut APMC Mandi', deoc: '03651-222285' },

  // TRIPURA
  { id: 'agartala', name: 'Agartala', state: 'Tripura', basin: 'Surma-Meghna Basin', lat: 23.8315, lon: 91.2868, highRisk: false, isMajorCity: true, category: 'State Capital & Border Trade Hub', market: 'Gol Bazar (Maharaj Ganj - Largest Wholesale Market in Tripura) & Battala', deoc: '0381-2412414' },

  // MANIPUR
  { id: 'imphal', name: 'Imphal', state: 'Manipur', basin: 'Manipur River Valley', lat: 24.8170, lon: 93.9368, highRisk: false, isMajorCity: true, category: 'State Capital (Winter Cold 4-20°C)', market: "Ima Keithel (Mother's Market - World's Largest All-Women Market)", deoc: '0385-2450144' },

  // NAGALAND
  { id: 'dimapur', name: 'Dimapur', state: 'Nagaland', basin: 'Dhansiri Valley', lat: 25.9068, lon: 93.7274, highRisk: false, isMajorCity: true, category: 'Commercial Capital & Rail Gateway of Nagaland', market: 'New Market, Hong Kong Market & APMC Daily Agricultural Mandi', deoc: '03862-248888' },
  { id: 'kohima', name: 'Kohima', state: 'Nagaland', basin: 'Naga Hills', lat: 25.6751, lon: 94.1086, highRisk: false, isMajorCity: true, category: 'State Capital (Winter Cold 2-14°C)', market: 'BOC Market & Mao Market (Organic Vegetables & Exotic Spices)', deoc: '0370-2290028' },

  // MIZORAM
  { id: 'aizawl', name: 'Aizawl', state: 'Mizoram', basin: 'Tlawng Valley', lat: 23.7271, lon: 92.7176, highRisk: false, isMajorCity: true, category: 'State Capital (Winter Range 6-18°C)', market: 'Bara Bazar, Millennium Centre Market & Dawrpui Commercial Hub', deoc: '0389-2325372' },

  // ARUNACHAL PRADESH
  { id: 'itanagar', name: 'Itanagar / Naharlagun', state: 'Arunachal Pradesh', basin: 'Sub-Himalayan Foothills', lat: 27.0844, lon: 93.6053, highRisk: false, isMajorCity: true, category: 'State Capital & Foothills Belt (Winter 6-18°C)', market: 'Ganga Market, Naharlagun Daily APMC Subzi Mandi', deoc: '0360-2212373' },
  { id: 'pasighat', name: 'Pasighat', state: 'Arunachal Pradesh', basin: 'Siang Valley', lat: 28.0664, lon: 95.3268, highRisk: false, isMajorCity: true, category: 'Oldest Town & Agricultural Trade Gateway', market: 'Pasighat Main Market & Siang Organic Citrus/Ginger Mandi', deoc: '0368-2222234' },

  // SIKKIM
  { id: 'gangtok', name: 'Gangtok', state: 'Sikkim', basin: 'Eastern Himalayas', lat: 27.3389, lon: 88.6065, highRisk: false, isMajorCity: true, category: 'State Capital (Severe Winter 2-12°C)', market: 'Lal Bazaar (Kanchenjunga Shopping Complex - Large Cardamom Mandi)', deoc: '03592-202933' },

  // ==========================================
  // 4. ANDHRA PRADESH (Major Cities & Agriculture Mandis)
  // ==========================================
  { id: 'guntur', name: 'Guntur', state: 'Andhra Pradesh', basin: 'Bay of Bengal', lat: 16.3067, lon: 80.4365, highRisk: false, isMajorCity: true, category: 'Agriculture & Chilli Trade Hub', market: "Asia's Largest Dry Chilli Market Yard (APMC)", deoc: '0863-2234070' },
  { id: 'visakhapatnam', name: 'Visakhapatnam (Vizag)', state: 'Andhra Pradesh', basin: 'Bay of Bengal', lat: 17.6868, lon: 83.2185, highRisk: true, isMajorCity: true, category: 'Port & Industrial Metro', market: 'Fishing Harbor & Jagadamba Commercial Market', deoc: '0891-2560820' },
  { id: 'vijayawada', name: 'Vijayawada', state: 'Andhra Pradesh', basin: 'Bay of Bengal', lat: 16.5062, lon: 80.6480, highRisk: false, isMajorCity: true, category: 'Commercial Capital & Rail Hub', market: 'One Town Wholesale Cloth & Foodgrain Mandi', deoc: '0866-2574450' },
  { id: 'tirupati', name: 'Tirupati', state: 'Andhra Pradesh', basin: 'Bay of Bengal', lat: 13.6288, lon: 79.4192, highRisk: false, isMajorCity: true, category: 'World Pilgrim Hub', market: 'APMC Agricultural Produce Market & Temple Bazaar', deoc: '0877-2287777' },
  { id: 'kakinada', name: 'Kakinada', state: 'Andhra Pradesh', basin: 'Bay of Bengal', lat: 16.9891, lon: 82.2475, highRisk: true, isMajorCity: true, category: 'Deepwater Port & Fertilizer Hub', market: 'Port Edible Oil Trading Center & Main Bazaar', deoc: '0884-2365506' },
  { id: 'srikakulam', name: 'Srikakulam', state: 'Andhra Pradesh', basin: 'Bay of Bengal', lat: 18.2969, lon: 83.8968, highRisk: true, isMajorCity: false, category: 'Northern Coast Cyclone Belt', market: 'Rythu Bazaar & Cashew Processing Center', deoc: '08942-240557' },
  { id: 'machilipatnam', name: 'Machilipatnam', state: 'Andhra Pradesh', basin: 'Bay of Bengal', lat: 16.1875, lon: 81.1389, highRisk: true, isMajorCity: false, category: 'Krishna Delta Coast', market: 'Kalamkari Handloom & Marine Fishery Mandi', deoc: '08672-252572' },
  { id: 'nellore', name: 'Nellore', state: 'Andhra Pradesh', basin: 'Bay of Bengal', lat: 14.4426, lon: 79.9865, highRisk: true, isMajorCity: false, category: 'Southern Coast Hub', market: 'Nellore Rice Millers & Aqua Shrimp Export Market', deoc: '0861-2331477' },
  { id: 'rajahmundry', name: 'Rajahmundry', state: 'Andhra Pradesh', basin: 'Bay of Bengal', lat: 17.0005, lon: 81.8040, highRisk: false, isMajorCity: true, category: 'Godavari Cultural City', market: 'Main Flower Market & Tobacco Auction Platform', deoc: '0883-2471600' },

  // ==========================================
  // 5. MAHARASHTRA & GOA (APMC & Commercial Hubs)
  // ==========================================
  { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', basin: 'Arabian Sea', lat: 18.9220, lon: 72.8347, highRisk: true, isMajorCity: true, category: 'Financial Capital & Coastal Metro', market: 'APMC Vashi Wholesale Mandi, Crawford & Zaveri Bazaar', deoc: '022-22694725' },
  { id: 'pune', name: 'Pune', state: 'Maharashtra', basin: 'Inland Depression', lat: 18.5204, lon: 73.8567, highRisk: false, isMajorCity: true, category: 'IT & Automobile Hub (Mild Winter)', market: 'Gultekdi Market Yard (Major Agricultural APMC)', deoc: '020-26123371' },
  { id: 'nagpur', name: 'Nagpur', state: 'Maharashtra', basin: 'Inland Depression', lat: 21.1458, lon: 79.0882, highRisk: false, isMajorCity: true, category: 'Central India Winter Capital', market: 'Kalamna APMC Cotton, Grain & Orange Mandi', deoc: '0712-2562668' },
  { id: 'nashik', name: 'Nashik', state: 'Maharashtra', basin: 'Inland Depression', lat: 19.9975, lon: 73.7898, highRisk: false, isMajorCity: true, category: 'Northern Maharashtra (Winter Chill)', market: "Asia's Largest Onion & Grape APMC Mandi (Lasalgaon/Nashik)", deoc: '0253-2578500' },
  { id: 'ratnagiri', name: 'Ratnagiri', state: 'Maharashtra', basin: 'Arabian Sea', lat: 16.9902, lon: 73.3120, highRisk: true, isMajorCity: false, category: 'Konkan Coast Port', market: 'Mirkarwada Fishing Harbor & Alphonso Mango Mandi', deoc: '02352-226248' },
  { id: 'panaji', name: 'Goa (Panaji / Vasco)', state: 'Goa', basin: 'Arabian Sea', lat: 15.4909, lon: 73.8278, highRisk: true, isMajorCity: true, category: 'Coastal Tourism & Port Hub', market: 'Panaji Municipal Market, Margao Gandhi Market & Mormugao Harbor', deoc: '0832-2419554' },

  // ==========================================
  // 6. GUJARAT (Spice, Diamond & Textile Mandis)
  // ==========================================
  { id: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat', basin: 'Arabian Sea', lat: 23.0225, lon: 72.5714, highRisk: false, isMajorCity: true, category: 'Mega Commercial & Industrial Metro', market: 'Kalupur Wholesale Grain Market & Maskati Cloth Market', deoc: '079-27551581' },
  { id: 'surat', name: 'Surat', state: 'Gujarat', basin: 'Arabian Sea', lat: 21.1702, lon: 72.8311, highRisk: true, isMajorCity: true, category: 'Diamond & Coastal Textile Hub', market: 'Ring Road Textile Market Complex & Surat Diamond Bourse', deoc: '0261-2463000' },
  { id: 'vadodara', name: 'Vadodara (Baroda)', state: 'Gujarat', basin: 'Arabian Sea', lat: 22.3072, lon: 73.1812, highRisk: false, isMajorCity: true, category: 'Cultural & Chemical Hub', market: 'Khanderao Market & Makarpura Industrial Center', deoc: '0265-2420000' },
  { id: 'rajkot', name: 'Rajkot', state: 'Gujarat', basin: 'Arabian Sea', lat: 22.3039, lon: 70.8022, highRisk: false, isMajorCity: true, category: 'Saurashtra Industrial Hub', market: 'Bedi Para APMC Groundnut & Cotton Mandi', deoc: '0281-2471561' },
  { id: 'porbandar', name: 'Porbandar', state: 'Gujarat', basin: 'Arabian Sea', lat: 21.6417, lon: 69.6293, highRisk: true, isMajorCity: true, category: 'Coastal Cyclone Belt Port', market: 'Porbandar Deep Sea Fishing Harbor & Port Yard', deoc: '0286-2220800' },
  { id: 'dwarka', name: 'Dwarka / Jamnagar', state: 'Gujarat', basin: 'Arabian Sea', lat: 22.2442, lon: 68.9685, highRisk: true, isMajorCity: true, category: 'Pilgrim Coast & Refinery Hub', market: 'Jamnagar Brass Parts Market & Grain Market', deoc: '02833-232125' },
  { id: 'kutch', name: 'Kutch (Bhuj / Kandla)', state: 'Gujarat', basin: 'Arabian Sea', lat: 23.2420, lon: 69.6669, highRisk: true, isMajorCity: true, category: 'Major Port & Salt Desert Belt', market: 'Gandhidham Timber Market & Kandla Cargo Terminal', deoc: '02832-250020' },

  // ==========================================
  // 7. TAMIL NADU & PUDUCHERRY
  // ==========================================
  { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', basin: 'Bay of Bengal', lat: 13.0827, lon: 80.2707, highRisk: true, isMajorCity: true, category: 'Auto & IT Metro (Northeast Monsoon)', market: 'Koyambedu Wholesale Flower, Fruit & Veg Complex (APMC)', deoc: '044-25619206' },
  { id: 'coimbatore', name: 'Coimbatore', state: 'Tamil Nadu', basin: 'Inland Depression', lat: 11.0168, lon: 76.9558, highRisk: false, isMajorCity: true, category: 'Textile Capital & Foothills', market: 'RS Puram Cotton & Yarn Exchange, Thyagi Kumaran Market', deoc: '0422-2301114' },
  { id: 'madurai', name: 'Madurai', state: 'Tamil Nadu', basin: 'Inland Depression', lat: 9.9252, lon: 78.1198, highRisk: false, isMajorCity: true, category: 'Temple City & Cultural Capital', market: 'Mattuthavani Wholesale Flower Market & East Masi Street', deoc: '0452-2531110' },
  { id: 'cuddalore', name: 'Cuddalore', state: 'Tamil Nadu', basin: 'Bay of Bengal', lat: 11.7480, lon: 79.7714, highRisk: true, isMajorCity: false, category: 'Vulnerable Cyclone Belt', market: 'Cuddalore Port Fish Harbor & Cashew Processing Hub', deoc: '04142-220700' },
  { id: 'nagapattinam', name: 'Nagapattinam', state: 'Tamil Nadu', basin: 'Bay of Bengal', lat: 10.7672, lon: 79.8449, highRisk: true, isMajorCity: false, category: 'Cauvery Delta Coast', market: 'Nagore Marine Fishery Harbor & Delta Paddy Mandi', deoc: '04365-251992' },
  { id: 'kanyakumari', name: 'Kanyakumari', state: 'Tamil Nadu', basin: 'Indian Ocean', lat: 8.0883, lon: 77.5385, highRisk: true, isMajorCity: true, category: 'Southernmost Tip of India', market: 'Vadasery Plantain Market & Coastal Fishery Point', deoc: '04652-227000' },
  { id: 'puducherry', name: 'Puducherry', state: 'Puducherry', basin: 'Bay of Bengal', lat: 11.9416, lon: 79.8083, highRisk: true, isMajorCity: true, category: 'Heritage Coastal Territory', market: 'Goubert Market (Grand Bazaar) & Fish Auction Shore', deoc: '0413-2253407' },

  // ==========================================
  // 8. ISLAND TERRITORIES: LAKSHADWEEP & ANDAMAN-NICOBAR
  // ==========================================
  { id: 'port_blair', name: 'Port Blair', state: 'Andaman & Nicobar', basin: 'Bay of Bengal Deep Sea', lat: 11.6234, lon: 92.7265, highRisk: true, isMajorCity: true, category: 'Bay of Bengal Island Capital', market: 'Aberdeen Bazaar & Junglighat Marine Jetty', deoc: '03192-238881' },
  { id: 'car_nicobar', name: 'Car Nicobar', state: 'Andaman & Nicobar', basin: 'Bay of Bengal Deep Sea', lat: 9.1549, lon: 92.7566, highRisk: true, isMajorCity: true, category: 'Nicobar District Capital', market: 'Malacca Jetty Coconut & Marine Copra Yard', deoc: '03193-265241' },
  { id: 'diglipur', name: 'Diglipur', state: 'Andaman & Nicobar', basin: 'Bay of Bengal Deep Sea', lat: 13.2667, lon: 92.9833, highRisk: true, isMajorCity: true, category: 'North Andaman Agricultural & Rice Hub', market: 'Subhash Gram Main Market & Aerial Bay Jetty', deoc: '03192-272234' },
  { id: 'kavaratti', name: 'Kavaratti', state: 'Lakshadweep', basin: 'Arabian Sea Island', lat: 10.5667, lon: 72.6417, highRisk: true, isMajorCity: true, category: 'Lakshadweep UT Capital & Coral Atoll', market: 'Ujra Mandi, Coconut Copra & Oceanic Tuna Jetty', deoc: '04896-262244' },
  { id: 'agatti', name: 'Agatti', state: 'Lakshadweep', basin: 'Arabian Sea Island', lat: 10.8533, lon: 72.1931, highRisk: true, isMajorCity: true, category: 'Airport Island & Coral Lagoon Hub', market: 'Agatti Marine Fishery Center & Coral Lagoon Jetty', deoc: '04896-242222' },
  { id: 'minicoy', name: 'Minicoy (Maliku)', state: 'Lakshadweep', basin: 'Arabian Sea Island', lat: 8.2833, lon: 73.0500, highRisk: true, isMajorCity: true, category: 'Southernmost Lakshadweep Atoll & Light House', market: 'Minicoy Tuna Processing Yard & Harbor Jetty', deoc: '04892-222225' },

  // ==========================================
  // 8. KARNATAKA & KERALA
  // ==========================================
  { id: 'bengaluru', name: 'Bengaluru', state: 'Karnataka', basin: 'Inland Depression', lat: 12.9716, lon: 77.5946, highRisk: false, isMajorCity: true, category: 'Silicon Valley of India (Pleasant Winter)', market: 'Yeshwanthpur APMC Yard & KR City Wholesale Market', deoc: '080-22221188' },
  { id: 'mangaluru', name: 'Mangaluru', state: 'Karnataka', basin: 'Arabian Sea', lat: 12.9141, lon: 74.8560, highRisk: true, isMajorCity: true, category: 'Karnataka Coast Port', market: 'Old Port (Bunder) Fish Auction Yard & Central Market', deoc: '0824-2220587' },
  { id: 'mysuru', name: 'Mysuru', state: 'Karnataka', basin: 'Inland Depression', lat: 12.2958, lon: 76.6394, highRisk: false, isMajorCity: true, category: 'Heritage & Tourism City', market: 'Devaraja Heritage Market & Bandipalya APMC Mandi', deoc: '0821-2422100' },
  { id: 'kochi', name: 'Kochi (Cochin)', state: 'Kerala', basin: 'Arabian Sea', lat: 9.9312, lon: 76.2673, highRisk: true, isMajorCity: true, category: 'Major Commercial Port & Backwaters', market: 'Mattancherry Spice Auction Market & Thoppumpady Harbor', deoc: '0484-2423513' },
  { id: 'thiruvananthapuram', name: 'Thiruvananthapuram', state: 'Kerala', basin: 'Arabian Sea', lat: 8.5241, lon: 76.9366, highRisk: true, isMajorCity: true, category: 'State Capital & Coastal Hub', market: 'Chalai Heritage Market & Vizhinjam Fishing Harbor', deoc: '0471-2730045' },
  { id: 'kozhikode', name: 'Kozhikode (Calicut)', state: 'Kerala', basin: 'Arabian Sea', lat: 11.2588, lon: 75.7804, highRisk: true, isMajorCity: true, category: 'Malabar Coast Trade Hub', market: 'Valiyangadi (Big Bazaar) Spice & Copra Mandi', deoc: '0495-2371400' },

  // ==========================================
  // 9. TELANGANA
  // ==========================================
  { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana', basin: 'Inland Depression', lat: 17.3850, lon: 78.4867, highRisk: false, isMajorCity: true, category: 'IT Metro & Capital (Winter Range 13-28°C)', market: 'Begum Bazar Wholesale Hub & Bowenpally/Gaddiannaram APMC', deoc: '040-23454088' },
  { id: 'warangal', name: 'Warangal', state: 'Telangana', basin: 'Inland Depression', lat: 17.9689, lon: 79.5941, highRisk: false, isMajorCity: true, category: 'Heritage City & North Telangana Hub', market: 'Enumamula Agricultural Market Yard (Cotton & Grain)', deoc: '0870-2510200' },

  // ==========================================
  // 10. BIHAR & JHARKHAND
  // ==========================================
  { id: 'patna', name: 'Patna', state: 'Bihar', basin: 'North India Plain', lat: 25.5941, lon: 85.1376, highRisk: false, isMajorCity: true, category: 'State Capital (Winter Fog & Cold 8-22°C)', market: 'Bazar Samiti Agricultural Produce Market & Marufganj Mandi', deoc: '0612-2217305' },
  { id: 'gaya', name: 'Gaya', state: 'Bihar', basin: 'North India Plain', lat: 24.7955, lon: 85.0002, highRisk: false, isMajorCity: true, category: 'Pilgrim Hub (Cold Winter Lows)', market: 'Purani Godown Grain Wholesale Market & Tekari Bazaar', deoc: '0631-2222253' },
  { id: 'ranchi', name: 'Ranchi', state: 'Jharkhand', basin: 'Inland Depression', lat: 23.3441, lon: 85.3096, highRisk: false, isMajorCity: true, category: 'Plateau Capital (Chilly Winter 8-24°C)', market: 'Pandra APMC Krishi Upaj Mandi & Daily Market', deoc: '0651-2400220' },
  { id: 'jamshedpur', name: 'Jamshedpur', state: 'Jharkhand', basin: 'Inland Depression', lat: 22.8046, lon: 86.2029, highRisk: false, isMajorCity: true, category: 'Steel City (East Singhbhum)', market: 'Sakchi Market Complex & Bistupur Trade Center', deoc: '0657-2431012' },
  { id: 'dhanbad', name: 'Dhanbad', state: 'Jharkhand', basin: 'Inland Depression', lat: 23.7957, lon: 86.4304, highRisk: false, isMajorCity: true, category: 'Coal Capital of India', market: 'Bank More Commercial Center & Purana Bazar Mandi', deoc: '0326-2312600' },

  // ==========================================
  // 11. UTTAR PRADESH & DELHI NCR (Major North Trade Hubs)
  // ==========================================
  { id: 'delhi', name: 'New Delhi (NCR)', state: 'Delhi NCR', basin: 'North India Plain', lat: 28.6139, lon: 77.2090, highRisk: false, isMajorCity: true, category: 'National Capital (Severe Winter Chill 5-20°C)', market: "Asia's Largest Azadpur Fruit & Veg Mandi, Khari Baoli Spice Hub", deoc: '011-23438084' },
  { id: 'ghaziabad', name: 'Ghaziabad', state: 'Uttar Pradesh', basin: 'Delhi NCR', lat: 28.6692, lon: 77.4538, highRisk: false, isMajorCity: true, category: 'Industrial & Engineering Metro (Winter Cold 6-20°C)', market: 'Sahibabad APMC Fruit & Subzi Mandi, Kirana Mandi & Iron/Steel Yard', deoc: '0120-2824410' },
  { id: 'meerut', name: 'Meerut', state: 'Uttar Pradesh', basin: 'North India Plain', lat: 28.9845, lon: 77.7064, highRisk: false, isMajorCity: true, category: 'Sports Goods & Sugarcane Capital (Winter Fog 6-20°C)', market: 'Naveen Mandi Sthal (APMC Produce) & Delhi Road Trade Complex', deoc: '0121-2664133' },
  { id: 'muzaffarnagar', name: 'Muzaffarnagar', state: 'Uttar Pradesh', basin: 'North India Plain', lat: 29.4727, lon: 77.7085, highRisk: false, isMajorCity: true, category: 'Sugar & Jaggery Capital (Severe Winter Fog 5-19°C)', market: "Asia's Largest Gur (Jaggery) & Sugar Trading Mandi Sthal", deoc: '0131-2436918' },
  { id: 'saharanpur', name: 'Saharanpur', state: 'Uttar Pradesh', basin: 'North India Plain', lat: 29.9671, lon: 77.5510, highRisk: false, isMajorCity: true, category: 'Wood Carving & Agricultural Hub (Winter Chill 5-19°C)', market: 'Saharanpur APMC Mango, Grain & Woodcraft Mandi', deoc: '0132-2726110' },
  { id: 'noida', name: 'Noida / Greater Noida', state: 'Uttar Pradesh', basin: 'Delhi NCR', lat: 28.5355, lon: 77.3910, highRisk: false, isMajorCity: true, category: 'IT & Industrial NCR Hub', market: 'Atta Market Sector 18 & Greater Noida Wholesale Hub', deoc: '0120-2565600' },
  { id: 'lucknow', name: 'Lucknow', state: 'Uttar Pradesh', basin: 'North India Plain', lat: 26.8467, lon: 80.9462, highRisk: false, isMajorCity: true, category: 'State Capital (Winter Fog Belt 7-22°C)', market: 'Dubagga APMC Mandi, Aminabad & Chowk Chikan Hub', deoc: '0522-2238084' },
  { id: 'kanpur', name: 'Kanpur', state: 'Uttar Pradesh', basin: 'North India Plain', lat: 26.4499, lon: 80.3319, highRisk: false, isMajorCity: true, category: 'Industrial & Leather Hub', market: 'Nayaganj Foodgrain Wholesale Mandi & Collectorganj', deoc: '0512-2303100' },
  { id: 'varanasi', name: 'Varanasi (Kashi)', state: 'Uttar Pradesh', basin: 'North India Plain', lat: 25.3176, lon: 82.9739, highRisk: false, isMajorCity: true, category: 'Ganges Spiritual Hub', market: 'Visheshwarganj Grain Mandi & Chowk Silk Brocade Market', deoc: '0542-2508100' },
  { id: 'agra', name: 'Agra', state: 'Uttar Pradesh', basin: 'North India Plain', lat: 27.1767, lon: 78.0081, highRisk: false, isMajorCity: true, category: 'Taj Mahal City & Western UP', market: 'Rawatpara Wholesale Spice Mandi & Shoe Export Market', deoc: '0562-2260555' },
  { id: 'bareilly', name: 'Bareilly', state: 'Uttar Pradesh', basin: 'North India Plain', lat: 28.3670, lon: 79.4304, highRisk: false, isMajorCity: true, category: 'Rohilkhand Commercial Hub (Winter Fog 6-21°C)', market: 'Delapeer APMC Grain & Vegetable Mandi, Zari-Zardozi Bazaar', deoc: '0581-2420088' },
  { id: 'moradabad', name: 'Moradabad', state: 'Uttar Pradesh', basin: 'North India Plain', lat: 28.8386, lon: 78.7733, highRisk: false, isMajorCity: true, category: 'Brass City / Peetal Nagri (Winter Lows 6-20°C)', market: 'Peetal Mandi & Sambhal Road Agricultural Produce Mandi', deoc: '0591-2412555' },

  // ==========================================
  // 12. UTTARAKHAND, HIMACHAL, J&K & LADAKH (Hills & Sub-Zero Winter Belts)
  // ==========================================
  { id: 'dehradun', name: 'Dehradun', state: 'Uttarakhand', basin: 'Himalayan Foothills', lat: 30.3165, lon: 78.0322, highRisk: false, isMajorCity: true, category: 'State Capital & Doon Valley (Winter Cold 4-18°C)', market: 'Niranjanpur APMC Wholesale Mandi & Paltan Bazaar', deoc: '0135-2726066' },
  { id: 'haridwar', name: 'Haridwar / Roorkee', state: 'Uttarakhand', basin: 'Himalayan Foothills', lat: 29.9457, lon: 78.1642, highRisk: false, isMajorCity: true, category: 'Pilgrimage Gateway & Industrial Hub (Winter Fog 5-19°C)', market: 'Jwalapur APMC Grain & Subzi Mandi, BHEL Industrial Zone', deoc: '01334-223999' },
  { id: 'haldwani', name: 'Haldwani', state: 'Uttarakhand', basin: 'Himalayan Foothills', lat: 29.2183, lon: 79.5130, highRisk: false, isMajorCity: true, category: 'Commercial Gateway to Kumaon Hills (Winter Cold 5-20°C)', market: 'Bareilly Road APMC Fruit & Subzi Mandi & Timber Market', deoc: '05946-220020' },
  { id: 'shimla', name: 'Shimla', state: 'Himachal Pradesh', basin: 'Himalayan Foothills', lat: 31.1048, lon: 77.1734, highRisk: false, isMajorCity: true, category: 'Queen of Hills & State Capital (Severe Winter 0-12°C)', market: 'Dhalli APMC Apple & Hill Potato Mandi, The Mall Bazaar', deoc: '0177-2800100' },
  { id: 'jammu', name: 'Jammu', state: 'Jammu & Kashmir', basin: 'Himalayan Foothills', lat: 32.7266, lon: 74.8570, highRisk: false, isMajorCity: true, category: 'Winter Capital of J&K (Cold Nights 5-18°C)', market: 'Narwal Wholesale APMC Fruit & Grain Mandi', deoc: '0191-2544444' },
  { id: 'srinagar', name: 'Srinagar', state: 'Jammu & Kashmir', basin: 'Himalayan Foothills', lat: 34.0837, lon: 74.7973, highRisk: false, isMajorCity: true, category: 'Kashmir Valley Capital (Sub-Zero Winter Chill -2 to 10°C)', market: 'Parimpora Fruit & Saffron/Dry Fruit Mandi, Lal Chowk', deoc: '0194-2452222' },
  { id: 'leh', name: 'Leh (Ladakh)', state: 'Ladakh', basin: 'High Altitude Cold Desert', lat: 34.1526, lon: 77.5771, highRisk: false, isMajorCity: true, category: 'High Altitude Cold Desert (-15 to 2°C in Winter)', market: 'Main Bazaar Leh, Pashmina Wool & Apricot Trade Hub', deoc: '01982-255555' },

  // ==========================================
  // 13. HARYANA & PUNJAB (Granary of India & Basmati Mandis)
  // ==========================================
  { id: 'chandigarh', name: 'Chandigarh', state: 'Punjab / Haryana', basin: 'North India Plain', lat: 30.7333, lon: 76.7794, highRisk: false, isMajorCity: true, category: 'Sub-Himalayan Capital (Cold 6-19°C)', market: 'Sector 26 Grain & Vegetable Market (APMC)', deoc: '0172-2740000' },
  { id: 'karnal', name: 'Karnal', state: 'Haryana', basin: 'North India Plain', lat: 29.6857, lon: 76.9905, highRisk: false, isMajorCity: true, category: 'Basmati Rice Capital of India (Cold Wave 5-19°C)', market: 'National Basmati Rice APMC Mandi & Dairy Research Hub', deoc: '0184-2267700' },
  { id: 'panipat', name: 'Panipat', state: 'Haryana', basin: 'North India Plain', lat: 29.3909, lon: 76.9635, highRisk: false, isMajorCity: true, category: 'City of Weavers & Textile Recycling Hub (Winter 5-20°C)', market: 'Textile Wholesale Market & GT Road APMC Grain Mandi', deoc: '0180-2651100' },
  { id: 'ambala', name: 'Ambala', state: 'Haryana', basin: 'North India Plain', lat: 30.3782, lon: 76.7767, highRisk: false, isMajorCity: true, category: 'Scientific Instruments & Cloth Hub (Winter Chill 5-18°C)', market: 'Cloth Market Ambala City & APMC Grain Mandi Cantt', deoc: '0171-2530100' },
  { id: 'amritsar', name: 'Amritsar', state: 'Punjab', basin: 'North India Plain', lat: 31.6340, lon: 74.8723, highRisk: false, isMajorCity: true, category: 'Golden Temple City & Grain Mandi (Winter 4-18°C)', market: 'Bhagtanwala APMC Grain Mandi & Katra Jaimal Singh Textile', deoc: '0183-2226161' },
  { id: 'ludhiana', name: 'Ludhiana', state: 'Punjab', basin: 'North India Plain', lat: 30.9010, lon: 75.8573, highRisk: false, isMajorCity: true, category: 'Manchester of India (Hosiery & Woolen Hub)', market: 'New Grain Market Salem Tabri & Chaura Bazar Hosiery', deoc: '0161-2403100' },

  // ==========================================
  // 14. MADHYA PRADESH, CHHATTISGARH & RAJASTHAN
  // ==========================================
  { id: 'bhopal', name: 'Bhopal', state: 'Madhya Pradesh', basin: 'Inland Depression', lat: 23.2599, lon: 77.4126, highRisk: false, isMajorCity: true, category: 'City of Lakes & State Capital (10-25°C)', market: 'Karond APMC Krishi Upaj Mandi & New Market', deoc: '0755-2441419' },
  { id: 'indore', name: 'Indore', state: 'Madhya Pradesh', basin: 'Inland Depression', lat: 22.7196, lon: 75.8577, highRisk: false, isMajorCity: true, category: 'Commercial Capital & Cleanest City', market: 'Choithram APMC Agri Mandi & Sarafa/Cloth Market', deoc: '0731-2449111' },
  { id: 'raipur', name: 'Raipur', state: 'Chhattisgarh', basin: 'Inland Depression', lat: 21.2514, lon: 81.6296, highRisk: false, isMajorCity: true, category: 'Capital of Chhattisgarh', market: 'Dumartarai Wholesale Mandi & Golbazar Trade Hub', deoc: '0771-2426666' },
  { id: 'jaipur', name: 'Jaipur', state: 'Rajasthan', basin: 'North India Plain', lat: 26.9124, lon: 75.7873, highRisk: false, isMajorCity: true, category: 'Pink City & Capital (Winter Nights 8-22°C)', market: 'Muhana Terminal Mandi (APMC) & Johari Gem Bazaar', deoc: '0141-2227656' },
  { id: 'jodhpur', name: 'Jodhpur', state: 'Rajasthan', basin: 'Thar Desert Fringe', lat: 26.2389, lon: 73.0243, highRisk: false, isMajorCity: true, category: 'Sun City & Spices / Handicrafts Hub', market: 'Mandi Yard Basni (Red Chilli & Cumin APMC) & Clock Tower', deoc: '0291-2650349' }
];

export const COASTAL_DISTRICTS = ALL_INDIA_REGIONS.filter(d => d.basin === 'Bay of Bengal' || d.basin === 'Arabian Sea');

export function findNearestDistrict(lat, lon) {
  let nearest = ALL_INDIA_REGIONS[0];
  let minDistance = Infinity;

  const R = 6371;
  for (const d of ALL_INDIA_REGIONS) {
    const dLat = ((d.lat - lat) * Math.PI) / 180;
    const dLon = ((d.lon - lon) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat * Math.PI) / 180) *
        Math.cos((d.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dist = Math.round(R * c);

    if (dist < minDistance) {
      minDistance = dist;
      nearest = { ...d, distanceToUserKm: dist };
    }
  }
  return nearest;
}

export const EMERGENCY_NUMBERS = [
  { name: 'National Disaster Response Force (NDRF)', number: '1078', desc: 'Central Disaster Helpline (Toll-Free Across All India)' },
  { name: 'National Emergency Response System', number: '112', desc: 'Police / Fire / Immediate Rescue (All India)' },
  { name: 'Medical Ambulance Service', number: '108', desc: 'Urgent Medical Evacuation (All India)' },
  { name: 'Coast Guard Emergency SAR', number: '1554', desc: 'Maritime & Coastal Search & Rescue' },
  { name: 'Assam State Disaster Management (ASDMA)', number: '1070', desc: 'Assam & Brahmaputra Control Room' },
  { name: 'Meghalaya State Disaster Management', number: '1070', desc: 'Shillong / Khasi Hills Emergency' },
  { name: 'Tripura State Disaster Management', number: '1070', desc: 'Agartala Disaster Hotline' },
  { name: 'Manipur Disaster Management Authority', number: '1070', desc: 'Imphal State Control Room' },
  { name: 'Nagaland State Disaster Management', number: '1070', desc: 'Kohima / Dimapur Emergency' },
  { name: 'Mizoram Disaster Management', number: '1070', desc: 'Aizawl Emergency Hotline' },
  { name: 'Arunachal Pradesh Disaster Management', number: '1070', desc: 'Itanagar State Control Room' },
  { name: 'Sikkim State Disaster Management', number: '1070', desc: 'Gangtok Emergency Hotline' },
  { name: 'Odisha SDMA (OSDMA)', number: '1070', desc: 'State Emergency Control Room (Odisha)' },
  { name: 'West Bengal Disaster Management', number: '1070', desc: 'State Emergency Hotline (WB)' },
  { name: 'Andhra Pradesh SDMA', number: '1070', desc: 'State Emergency Control (AP)' },
  { name: 'Tamil Nadu SDMA', number: '1070', desc: 'State Emergency Control (TN)' },
  { name: 'Gujarat SDMA', number: '1070', desc: 'State Emergency Control (Gujarat)' },
  { name: 'Maharashtra SDMA', number: '1070', desc: 'State Disaster Management Control' },
  { name: 'Uttarakhand State Disaster Response (USDMA)', number: '1070', desc: 'Disaster Helpline (Dehradun / Hills)' },
  { name: 'Uttar Pradesh Relief Commissioner', number: '1070', desc: 'State Control Room (UP / Ghaziabad / Meerut)' }
];

export const SAFETY_TIPS = [
  { id: 1, title: 'Immediate Shelter', desc: 'Avoid staying under tin/asbestos roofs, thatched huts, or near loose electrical poles.' },
  { id: 2, title: 'Power Down', desc: 'Switch off agricultural pumps, solar inverters, and main circuit breakers if water is entering.' },
  { id: 3, title: 'Winter Cold & Storm Gear', desc: 'In winter low-pressure events, wind chill reduces body temperature rapidly. Keep warm thermal clothing, coats, and dry rations.' },
  { id: 4, title: 'Emergency Water & Lighting', desc: 'Store 3-4 days of potable drinking water in clean sealed containers, and keep fully charged battery lamps.' }
];
