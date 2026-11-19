export const ALL_INDIA_REGIONS = [
  // 1. Bay of Bengal - Odisha
  { id: 'puri', name: 'Puri', state: 'Odisha', basin: 'Bay of Bengal', lat: 19.8135, lon: 85.8312, highRisk: true, deoc: '06752-223230' },
  { id: 'paradip', name: 'Paradip (Jagatsinghpur)', state: 'Odisha', basin: 'Bay of Bengal', lat: 20.3165, lon: 86.6114, highRisk: true, deoc: '06722-221262' },
  { id: 'balasore', name: 'Balasore (Baleswar)', state: 'Odisha', basin: 'Bay of Bengal', lat: 21.4934, lon: 86.9135, highRisk: true, deoc: '06782-262674' },
  { id: 'bhadrak', name: 'Bhadrak (Dhamra)', state: 'Odisha', basin: 'Bay of Bengal', lat: 21.0574, lon: 86.4958, highRisk: true, deoc: '06784-251881' },
  { id: 'kendrapara', name: 'Kendrapara', state: 'Odisha', basin: 'Bay of Bengal', lat: 20.5015, lon: 86.4224, highRisk: true, deoc: '06727-232803' },
  { id: 'ganjam', name: 'Ganjam (Gopalpur / Berhampur)', state: 'Odisha', basin: 'Bay of Bengal', lat: 19.3149, lon: 84.9818, highRisk: true, deoc: '06811-263700' },
  { id: 'bhubaneswar', name: 'Bhubaneswar / Khordha', state: 'Odisha', basin: 'Bay of Bengal', lat: 20.2961, lon: 85.8245, highRisk: false, deoc: '0674-2395531' },
  { id: 'cuttack', name: 'Cuttack', state: 'Odisha', basin: 'Bay of Bengal', lat: 20.4625, lon: 85.8828, highRisk: false, deoc: '0671-2507842' },

  // 2. Bay of Bengal - West Bengal
  { id: 'digha', name: 'Digha (Purba Medinipur)', state: 'West Bengal', basin: 'Bay of Bengal', lat: 21.6266, lon: 87.5074, highRisk: true, deoc: '03228-263013' },
  { id: 'sagar_island', name: 'Sagar Island (South 24 Parganas)', state: 'West Bengal', basin: 'Bay of Bengal', lat: 21.6517, lon: 88.0772, highRisk: true, deoc: '033-24791010' },
  { id: 'kakdwip', name: 'Kakdwip / Sundarbans', state: 'West Bengal', basin: 'Bay of Bengal', lat: 21.8744, lon: 88.1887, highRisk: true, deoc: '033-24791010' },
  { id: 'kolkata', name: 'Kolkata', state: 'West Bengal', basin: 'Bay of Bengal', lat: 22.5726, lon: 88.3639, highRisk: false, deoc: '033-22143526' },
  { id: 'haldia', name: 'Haldia', state: 'West Bengal', basin: 'Bay of Bengal', lat: 22.0667, lon: 88.0698, highRisk: true, deoc: '03224-252100' },

  // 3. Bay of Bengal - Andhra Pradesh
  { id: 'visakhapatnam', name: 'Visakhapatnam (Vizag)', state: 'Andhra Pradesh', basin: 'Bay of Bengal', lat: 17.6868, lon: 83.2185, highRisk: true, deoc: '0891-2560820' },
  { id: 'srikakulam', name: 'Srikakulam', state: 'Andhra Pradesh', basin: 'Bay of Bengal', lat: 18.2969, lon: 83.8968, highRisk: true, deoc: '08942-240557' },
  { id: 'kakinada', name: 'Kakinada', state: 'Andhra Pradesh', basin: 'Bay of Bengal', lat: 16.9891, lon: 82.2475, highRisk: true, deoc: '0884-2365506' },
  { id: 'machilipatnam', name: 'Machilipatnam (Krishna)', state: 'Andhra Pradesh', basin: 'Bay of Bengal', lat: 16.1875, lon: 81.1389, highRisk: true, deoc: '08672-252572' },
  { id: 'nellore', name: 'Nellore', state: 'Andhra Pradesh', basin: 'Bay of Bengal', lat: 14.4426, lon: 79.9865, highRisk: true, deoc: '0861-2331477' },

  // 4. Bay of Bengal - Tamil Nadu & Puducherry
  { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', basin: 'Bay of Bengal', lat: 13.0827, lon: 80.2707, highRisk: true, deoc: '044-25619206' },
  { id: 'cuddalore', name: 'Cuddalore', state: 'Tamil Nadu', basin: 'Bay of Bengal', lat: 11.7480, lon: 79.7714, highRisk: true, deoc: '04142-220700' },
  { id: 'nagapattinam', name: 'Nagapattinam', state: 'Tamil Nadu', basin: 'Bay of Bengal', lat: 10.7672, lon: 79.8449, highRisk: true, deoc: '04365-251992' },
  { id: 'puducherry', name: 'Puducherry', state: 'Puducherry', basin: 'Bay of Bengal', lat: 11.9416, lon: 79.8083, highRisk: true, deoc: '0413-2253407' },
  { id: 'port_blair', name: 'Port Blair (Andaman)', state: 'Andaman & Nicobar', basin: 'Bay of Bengal', lat: 11.6234, lon: 92.7265, highRisk: true, deoc: '03192-238881' },

  // 5. Arabian Sea - Gujarat
  { id: 'porbandar', name: 'Porbandar', state: 'Gujarat', basin: 'Arabian Sea', lat: 21.6417, lon: 69.6293, highRisk: true, deoc: '0286-2220800' },
  { id: 'dwarka', name: 'Dwarka / Jamnagar', state: 'Gujarat', basin: 'Arabian Sea', lat: 22.2442, lon: 68.9685, highRisk: true, deoc: '02833-232125' },
  { id: 'kutch', name: 'Kutch (Bhuj / Kandla)', state: 'Gujarat', basin: 'Arabian Sea', lat: 23.2420, lon: 69.6669, highRisk: true, deoc: '02832-250020' },
  { id: 'surat', name: 'Surat', state: 'Gujarat', basin: 'Arabian Sea', lat: 21.1702, lon: 72.8311, highRisk: false, deoc: '0261-2463000' },

  // 6. Arabian Sea - Maharashtra & Goa
  { id: 'mumbai', name: 'Mumbai (Coastal)', state: 'Maharashtra', basin: 'Arabian Sea', lat: 18.9220, lon: 72.8347, highRisk: true, deoc: '022-22694725' },
  { id: 'ratnagiri', name: 'Ratnagiri', state: 'Maharashtra', basin: 'Arabian Sea', lat: 16.9902, lon: 73.3120, highRisk: true, deoc: '02352-226248' },
  { id: 'panaji', name: 'Goa (Panaji / Vasco)', state: 'Goa', basin: 'Arabian Sea', lat: 15.4909, lon: 73.8278, highRisk: true, deoc: '0832-2419554' },

  // 7. Arabian Sea - Karnataka & Kerala
  { id: 'mangaluru', name: 'Mangaluru (Dakshina Kannada)', state: 'Karnataka', basin: 'Arabian Sea', lat: 12.9141, lon: 74.8560, highRisk: true, deoc: '0824-2220587' },
  { id: 'kochi', name: 'Kochi (Ernakulam)', state: 'Kerala', basin: 'Arabian Sea', lat: 9.9312, lon: 76.2673, highRisk: true, deoc: '0484-2423513' },
  { id: 'thiruvananthapuram', name: 'Thiruvananthapuram', state: 'Kerala', basin: 'Arabian Sea', lat: 8.5241, lon: 76.9366, highRisk: true, deoc: '0471-2730045' },

  // 8. Inland Depression Belts (Affected when storm moves inland)
  { id: 'ranchi', name: 'Ranchi / Jamshedpur', state: 'Jharkhand', basin: 'Inland Depression', lat: 23.3441, lon: 85.3096, highRisk: false, deoc: '0651-2400220' },
  { id: 'raipur', name: 'Raipur', state: 'Chhattisgarh', basin: 'Inland Depression', lat: 21.2514, lon: 81.6296, highRisk: false, deoc: '0771-2426666' },
  { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana', basin: 'Inland Depression', lat: 17.3850, lon: 78.4867, highRisk: false, deoc: '040-23454088' },
  { id: 'patna', name: 'Patna', state: 'Bihar', basin: 'Inland Depression', lat: 25.5941, lon: 85.1376, highRisk: false, deoc: '0612-2217305' },
  { id: 'bhopal', name: 'Bhopal', state: 'Madhya Pradesh', basin: 'Inland Depression', lat: 23.2599, lon: 77.4126, highRisk: false, deoc: '0755-2441419' },
  { id: 'delhi', name: 'New Delhi (NCR)', state: 'Delhi NCR', basin: 'North India', lat: 28.6139, lon: 77.2090, highRisk: false, deoc: '011-23438084' }
];

export const COASTAL_DISTRICTS = ALL_INDIA_REGIONS;

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
  { name: 'Odisha SDMA (OSDMA)', number: '1070', desc: 'State Emergency Control Room (Odisha)' },
  { name: 'West Bengal Disaster Management', number: '1070', desc: 'State Emergency Hotline (WB)' },
  { name: 'Andhra Pradesh SDMA', number: '1070', desc: 'State Emergency Control (AP)' },
  { name: 'Tamil Nadu SDMA', number: '1070', desc: 'State Emergency Control (TN)' },
  { name: 'Gujarat SDMA', number: '1070', desc: 'State Emergency Control (Gujarat)' },
  { name: 'Maharashtra SDMA', number: '1070', desc: 'State Disaster Management Control' }
];

export const SAFETY_TIPS = [
  { id: 1, title: 'Immediate Shelter', desc: 'Avoid staying under tin/asbestos roofs, thatched huts, or near loose electrical poles.' },
  { id: 2, title: 'Power Down', desc: 'Switch off agricultural pumps, solar inverters, and main circuit breakers if water is entering.' },
  { id: 3, title: 'Emergency Drinking Water', desc: 'Store at least 5 liters of clean drinking water in sealed jerrycans or bottles.' },
  { id: 4, title: 'Livestock Safety', desc: 'Untie cattle and livestock from poles or sheds so they can move to higher ground if flooded.' },
  { id: 5, title: 'Eye of the Storm Warning', desc: 'If wind suddenly dies down for 20-40 minutes, do NOT step out. The opposite side of the cyclone will strike with equal fury.' }
];
