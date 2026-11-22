// Post-Cyclone Coastal Saline Surge Desalination Protocols & Contingency Catch-Crops
// Sourced from ICAR-NRRI (National Rice Research Institute, Cuttack), ICAR-CSSRI Karnal, and OUAT

export const SALINE_RECOVERY_DATA = {
  desalinationProtocols: [
    {
      stage: 'Phase 1: Deep Trench Brine Drainage (Days 1 - 4)',
      icon: 'Waves',
      action: 'Drain Stagnant Seawater Immediately',
      importance: 'CRITICAL',
      guidelines: [
        'Cut open lateral drainage bunds every 15 meters to let trapped high-tide seawater drain into primary escape canals on low tide.',
        'Do NOT let seawater evaporate on the field; evaporation concentrates sodium chloride (NaCl) into a rock-hard white crust.',
        'If canal fresh water or rainwater is accessible, flood field with 5–7 cm fresh water and drain within 6 hours to flush topsoil salts.'
      ]
    },
    {
      stage: 'Phase 2: Agricultural Gypsum Soil Amelioration (Days 5 - 10)',
      icon: 'ShieldCheck',
      action: 'Apply Phosphogypsum / Agricultural Gypsum',
      importance: 'MANDATORY FOR SOIL RECLAMATION',
      guidelines: [
        'Seawater replaces exchangeable calcium with toxic sodium (ESP > 15%). Broadcast Gypsum (CaSO4·2H2O) at 250 - 350 kg/acre (10-14 bags).',
        'Calcium ions in gypsum displace sodium into the soil solution, which is then leached down past the root zone with drainage water.',
        'Incorporate into the top 10 cm of soil using a shallow cultivator or disc harrow. Do not plow deep.'
      ]
    },
    {
      stage: 'Phase 3: Dhaincha Green Manuring & Microbial Shield (Days 11 - 25)',
      icon: 'Sprout',
      action: 'Sow Sesbania (Dhaincha) Bio-Plow',
      importance: 'ORGANIC REJUVENATION',
      guidelines: [
        'Broadcast Sesbania aculeata (Dhaincha) seed @ 20 kg/acre. It can germinate in moderately saline soils (up to 6.5 dS/m).',
        'Produces 8 to 10 tonnes of lush green biomass in 40 days, fixing 45-60 kg of atmospheric nitrogen per acre.',
        'Plow under into soil at 40-45 days. The decomposing organic acids neutralize soil alkalinity and restore porous root aeration.'
      ]
    },
    {
      stage: 'Phase 4: Zinc & Foliar Potassium Shock Remedy (Day 25+)',
      icon: 'Sparkles',
      action: 'Foliar Spray 0.5% ZnSO4 + 1% KNO3',
      importance: 'NUTRIENT RESCUE',
      guidelines: [
        'Salinity blocks root uptake of Potassium and Zinc. Spray 0.5% Zinc Sulfate + 0.25% Lime solution to prevent yellow chlorosis.',
        'Apply Potassium Nitrate (13:0:45) @ 10g/L water to maintain plant leaf turgor and stomatal regulation against osmotic stress.'
      ]
    }
  ],

  saltTolerantPaddy: [
    {
      id: 'cr-dhan-409',
      name: 'CR Dhan 409 (Luna Barial)',
      institute: 'ICAR-NRRI, Cuttack',
      salinityTolerance: 'High (Up to 8.5 dS/m)',
      duration: '125 - 130 Days',
      grainType: 'Medium Slender, White Grain',
      yield: '4.5 - 5.2 Tonnes / Hectare',
      submergenceSurvival: 'Can survive 10 days complete submergence + saline surge',
      idealDistricts: 'Puri, Jagatsinghpur, Kendrapara, Bhadrak, Balasore'
    },
    {
      id: 'lunishree',
      name: 'Lunishree',
      institute: 'ICAR-NRRI & OUAT Coastal Station',
      salinityTolerance: 'Very High (Up to 9.5 dS/m)',
      duration: '140 - 145 Days',
      grainType: 'Long Bold Grain, Traditional High Biomass',
      yield: '3.8 - 4.4 Tonnes / Hectare',
      submergenceSurvival: 'Semi-deep water tolerant (up to 50 cm standing brackish water)',
      idealDistricts: 'Ganjam (Chilika fringe), South 24 Parganas, East Midnapore'
    },
    {
      id: 'sr-26b',
      name: 'SR 26B (Saline Resistant)',
      institute: 'Central Soil Salinity Research Institute (CSSRI)',
      salinityTolerance: 'High (Up to 8.0 dS/m)',
      duration: '135 - 140 Days',
      grainType: 'Medium Bold, High Milling Recovery',
      yield: '4.0 - 4.6 Tonnes / Hectare',
      submergenceSurvival: 'Moderate lodging resistance after cyclone water recedes',
      idealDistricts: 'Coastal belt of Odisha, West Bengal and North Andhra'
    },
    {
      id: 'csr-36',
      name: 'CSR 36',
      institute: 'ICAR-CSSRI Regional Research Station',
      salinityTolerance: 'Extreme (Up to 10.0 dS/m, pH up to 9.6)',
      duration: '135 - 140 Days',
      grainType: 'Fine Grain, High Export Grade Quality',
      yield: '4.8 - 5.5 Tonnes / Hectare',
      submergenceSurvival: 'Excellent salt exclusion mechanism in roots',
      idealDistricts: 'Severely affected saline tidal creek villages'
    }
  ],

  catchCrops: [
    {
      id: 'moong-ipm',
      crop: 'Green Gram / Moong',
      variety: 'IPM 02-03 / TARM-1',
      maturityDays: '60 - 65 Days',
      sowingWindow: 'Immediate 10 days after standing water drains',
      waterRequirement: 'Low (Utilizes residual post-cyclone soil moisture)',
      expectedYield: '4.5 - 6.0 Qtl / Acre',
      mspRate: '₹8,558 / Qtl (Government MSP 2026)',
      estimatedRevenue: '₹38,500 - ₹51,300 per Acre in 65 Days',
      benefit: 'Fixes 35 kg nitrogen per acre; replaces destroyed paddy with high-value cash returns.',
      seedRate: '8 - 10 kg / acre with Rhizobium bio-fertilizer treatment'
    },
    {
      id: 'biri-pu31',
      crop: 'Black Gram / Urad (Biri)',
      variety: 'Pant U-31 / Sarala (OUAT)',
      maturityDays: '65 - 72 Days',
      sowingWindow: 'Paira / Relay sowing directly into wet mud or light tilling',
      waterRequirement: 'Zero irrigation needed; thrives on residual moisture',
      expectedYield: '4.0 - 5.5 Qtl / Acre',
      mspRate: '₹6,950 / Qtl',
      estimatedRevenue: '₹27,800 - ₹38,200 per Acre',
      benefit: 'Deep taproot opens up compacted salt-crusted soil; high coastal pulse demand.',
      seedRate: '10 - 12 kg / acre'
    },
    {
      id: 'til-prachi',
      crop: 'Sesamum / Gingelly (Til)',
      variety: 'Prachi / Uma (OUAT)',
      maturityDays: '75 - 80 Days',
      sowingWindow: 'Once soil moisture reaches workable friable status',
      waterRequirement: 'Extremely drought and salt hardy',
      expectedYield: '2.5 - 3.5 Qtl / Acre',
      mspRate: '₹8,635 / Qtl (Highest return per quintal)',
      estimatedRevenue: '₹21,500 - ₹30,200 per Acre',
      benefit: 'Can tolerate moderate salinity (up to 5.5 dS/m); zero pest pressure post-cyclone.',
      seedRate: '3 - 4 kg / acre mixed with sand for uniform sowing'
    },
    {
      id: 'sunflower-kbsh',
      crop: 'Hybrid Sunflower',
      variety: 'KBSH-41 / DRSH-1',
      maturityDays: '80 - 85 Days',
      sowingWindow: '15-20 days post-cyclone',
      waterRequirement: 'Medium (1-2 light furrow irrigations if rain ceases)',
      expectedYield: '7.0 - 9.0 Qtl / Acre',
      mspRate: '₹6,760 / Qtl',
      estimatedRevenue: '₹47,300 - ₹60,800 per Acre',
      benefit: 'Extracts deep subsoil moisture, high coastal market demand from edible oil mills.',
      seedRate: '2.5 kg / acre'
    }
  ]
};
