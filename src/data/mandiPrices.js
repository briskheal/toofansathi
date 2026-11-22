// Coastal Mandi Rates & Government MSP Watchdog Database
// Synchronized with e-NAM, Agmarknet, and State Civil Supplies Corporations

export const GOVERNMENT_MSP_2026 = [
  { commodity: 'Paddy (Common / ସାଧାରଣ ଧାନ)', msp: 2183, unit: '₹ / Quintal', category: 'Cereals', icon: '🌾' },
  { commodity: 'Paddy (Grade A / ସୁପର ଧାନ)', msp: 2203, unit: '₹ / Quintal', category: 'Cereals', icon: '🌾' },
  { commodity: 'Green Gram (Moong / ମୁଗ)', msp: 8558, unit: '₹ / Quintal', category: 'Pulses', icon: '🌱' },
  { commodity: 'Black Gram (Urad / ବିରି)', msp: 6950, unit: '₹ / Quintal', category: 'Pulses', icon: '🌱' },
  { commodity: 'Groundnut (Peanut / ଚିନାବାଦାମ)', msp: 6377, unit: '₹ / Quintal', category: 'Oilseeds', icon: '🥜' },
  { commodity: 'Sesame (Til / ରାଶି)', msp: 8635, unit: '₹ / Quintal', category: 'Oilseeds', icon: '🍃' }
];

export const COASTAL_MANDIS = [
  {
    id: 'puri-rmc',
    district: 'Puri',
    state: 'Odisha',
    name: 'Puri Regulated Market Committee (RMC)',
    distanceKm: 14,
    intakeCapacity: '3,800 Qtl/day',
    queueTime: 'Approx 35 mins',
    moistureLimit: '17% (Cyclone relaxation approved up to 19%)',
    commodities: [
      { name: 'Paddy (Common)', modalPrice: 2240, minPrice: 2183, maxPrice: 2275, trend: '+₹35', status: 'Active Procurement', alert: 'High demand from state buffer' },
      { name: 'Green Gram (Mung)', modalPrice: 8750, minPrice: 8500, maxPrice: 8900, trend: '+₹110', status: 'Brisk Trading', alert: 'Millers buying before rain' },
      { name: 'Groundnut (In Shell)', modalPrice: 6520, minPrice: 6380, maxPrice: 6680, trend: '+₹50', status: 'Normal', alert: 'Stable pod pricing' },
      { name: 'Green Chilli (ଲଙ୍କା)', modalPrice: 4200, minPrice: 3800, maxPrice: 4600, trend: '+₹380', status: 'Spike', alert: 'Pre-cyclone shortage surge' }
    ]
  },
  {
    id: 'cuttack-malgodown',
    district: 'Cuttack',
    state: 'Odisha',
    name: 'Cuttack Malgodown & Banki Mandi',
    distanceKm: 46,
    intakeCapacity: '8,500 Qtl/day',
    queueTime: 'Approx 1 hour 15 mins',
    moistureLimit: '17% (Grain dryers operating at depot)',
    commodities: [
      { name: 'Paddy (Grade A)', modalPrice: 2280, minPrice: 2205, maxPrice: 2310, trend: '+₹40', status: 'High Volume', alert: 'Buffer procurement ongoing' },
      { name: 'Black Gram (Biri)', modalPrice: 7180, minPrice: 6950, maxPrice: 7350, trend: '+₹75', status: 'Brisk Trading', alert: 'Dal millers stocking up' },
      { name: 'Tomato (Local Hybrid)', modalPrice: 2800, minPrice: 2400, maxPrice: 3100, trend: '+₹250', status: 'Spike', alert: 'Transportation delays ahead' }
    ]
  },
  {
    id: 'balasore-fmc',
    district: 'Balasore',
    state: 'Odisha',
    name: 'Balasore Fakir Mohan Mandi',
    distanceKm: 78,
    intakeCapacity: '4,200 Qtl/day',
    queueTime: 'Approx 45 mins',
    moistureLimit: '17% (Temporary cover sheds open)',
    commodities: [
      { name: 'Paddy (Common)', modalPrice: 2235, minPrice: 2183, maxPrice: 2260, trend: '+₹25', status: 'Procurement Open', alert: 'FCI godowns receiving trucks' },
      { name: 'Mustard (ସୋରିଷ)', modalPrice: 5650, minPrice: 5450, maxPrice: 5800, trend: '+₹60', status: 'Stable', alert: 'Oil mills operational' },
      { name: 'Green Gram (Moong)', modalPrice: 8680, minPrice: 8558, maxPrice: 8850, trend: '+₹90', status: 'Brisk Trading', alert: 'Dal mills purchasing before rain' }
    ]
  },
  {
    id: 'berhampur-rmc',
    district: 'Ganjam',
    state: 'Odisha',
    name: 'Berhampur Commercial RMC',
    distanceKm: 92,
    intakeCapacity: '5,000 Qtl/day',
    queueTime: 'Approx 30 mins',
    moistureLimit: '17% (Port transit depot)',
    commodities: [
      { name: 'Paddy (Common)', modalPrice: 2250, minPrice: 2183, maxPrice: 2290, trend: '+₹45', status: 'High Demand', alert: 'Andhra transit buyers active' },
      { name: 'Groundnut', modalPrice: 6600, minPrice: 6400, maxPrice: 6750, trend: '+₹80', status: 'Brisk Trading', alert: 'Export quality lots' },
      { name: 'Sesamum (Til)', modalPrice: 8750, minPrice: 8635, maxPrice: 8900, trend: '+₹115', status: 'High Volume', alert: 'Oil processing crushers active' }
    ]
  },
  {
    id: 'midnapore-rmc',
    district: 'Purba Medinipur',
    state: 'West Bengal',
    name: 'Contai / Midnapore Central Mandi',
    distanceKm: 135,
    intakeCapacity: '6,000 Qtl/day',
    queueTime: 'Approx 50 mins',
    moistureLimit: '17% (Cyclone relaxation approved)',
    commodities: [
      { name: 'Paddy (Common Aman)', modalPrice: 2260, minPrice: 2185, maxPrice: 2300, trend: '+₹50', status: 'Heavy Inflow', alert: 'Emergency procurement active' },
      { name: 'Potato (Jyoti)', modalPrice: 1650, minPrice: 1500, maxPrice: 1800, trend: '+₹120', status: 'Spike', alert: 'Cold storage intake high' },
      { name: 'Mustard (Pahar)', modalPrice: 5720, minPrice: 5500, maxPrice: 5900, trend: '+₹80', status: 'Active Trading', alert: 'Local oil mills stocking' }
    ]
  },
  {
    id: 'srikakulam-amc',
    district: 'Srikakulam',
    state: 'Andhra Pradesh',
    name: 'Srikakulam Agricultural Market Committee',
    distanceKm: 155,
    intakeCapacity: '4,500 Qtl/day',
    queueTime: 'Approx 40 mins',
    moistureLimit: '17% (Moisture meters calibrated)',
    commodities: [
      { name: 'Paddy (Common)', modalPrice: 2270, minPrice: 2183, maxPrice: 2315, trend: '+₹60', status: 'Active', alert: 'Rythu Bharosa Kendra linked' },
      { name: 'Cashew (Raw Nut)', modalPrice: 11200, minPrice: 10800, maxPrice: 11600, trend: '+₹200', status: 'Normal', alert: 'Processing mills active' },
      { name: 'Black Gram (Urad)', modalPrice: 7150, minPrice: 6950, maxPrice: 7300, trend: '+₹90', status: 'Brisk Trading', alert: 'Tiffin millers stocking' }
    ]
  }
];
