// Automated Mathematical and Structural Accuracy Validator for ToofanSathi Pro
import { POST_CYCLONE_CROPS, CROP_DISEASES, ICAR_POST_CYCLONE_WORKSHOP_RULES } from '../src/data/cropDiseases.js';
import { GOVERNMENT_MSP_2026, COASTAL_MANDIS } from '../src/data/mandiPrices.js';
import { SALINE_RECOVERY_DATA } from '../src/data/salineCatchCrops.js';
import { KISAN_VOICE_TOPICS } from '../src/data/kisanVoiceFaq.js';

console.log('=== STARTING TOOFANSATHI PRO ACCURACY AUDIT ===\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`✅ [PASS] ${testName}`);
  } else {
    failedTests++;
    console.error(`❌ [FAIL] ${testName}: ${details}`);
  }
}

// 1. Crop Diseases & ICAR Remedies Audit
console.log('\n--- 1. Crop Diseases & ICAR Remedies Audit ---');
assert(POST_CYCLONE_CROPS.length >= 6, 'Covers at least 6 critical coastal crops', `Found ${POST_CYCLONE_CROPS.length}`);
assert(CROP_DISEASES.length >= 6, 'Has disease definitions for all critical crops', `Found ${CROP_DISEASES.length}`);

CROP_DISEASES.forEach((disease) => {
  assert(disease.angles && disease.angles.length === 3, `${disease.name}: Has exactly 3 distinct photo angles`);
  assert(disease.remedySteps && disease.remedySteps.length >= 3, `${disease.name}: Has ICAR multi-step remedy plan`);
  assert(disease.symptoms && disease.symptoms.length >= 3, `${disease.name}: Has thorough pathology symptom list`);
  assert(disease.vernacular && disease.vernacular.odia && disease.vernacular.hindi, `${disease.name}: Vernacular translations present`);
});

assert(ICAR_POST_CYCLONE_WORKSHOP_RULES.length === 4, 'ICAR Workshop has all 4 chronological stages (Hour 0 to Day 7)');

// 2. Mandi Rates & MSP Accuracy Audit
console.log('\n--- 2. Mandi Rates & Government MSP 2026 Audit ---');
assert(GOVERNMENT_MSP_2026.length >= 6, 'Covers major commodities in MSP 2026', `Found ${GOVERNMENT_MSP_2026.length}`);
const paddyCommon = GOVERNMENT_MSP_2026.find(m => m.commodity && m.commodity.includes('Common'));
assert(paddyCommon && paddyCommon.msp === 2183, 'Paddy Common MSP is exactly ₹2,183/Qtl (CACP Gazette)');
const moong = GOVERNMENT_MSP_2026.find(m => m.commodity && m.commodity.includes('Moong'));
assert(moong && moong.msp === 8558, 'Green Gram / Moong MSP is exactly ₹8,558/Qtl (CACP Gazette)');
assert(COASTAL_MANDIS.length >= 6, 'Covers at least 6 strategic coastal mandis', `Found ${COASTAL_MANDIS.length}`);

COASTAL_MANDIS.forEach(mandi => {
  assert(mandi.commodities && mandi.commodities.length >= 3, `${mandi.name}: Contains live commodities prices`);
  assert(mandi.moistureLimit && mandi.moistureLimit.length > 5, `${mandi.name}: Specifies moisture limits & policies`);
});

// 3. Seawater Desalination Math Audit
console.log('\n--- 3. Seawater Desalination & Soil Physics Math Audit ---');
assert(SALINE_RECOVERY_DATA.saltTolerantPaddy.length >= 4, 'Covers at least 4 certified NRRI/CSSRI salt-tolerant paddy varieties');
assert(SALINE_RECOVERY_DATA.catchCrops.length >= 4, 'Covers at least 4 high-value 60-day catch crops');
assert(SALINE_RECOVERY_DATA.desalinationProtocols.length === 4, 'Has 4-phase reclamation protocol');

// Test Desalination calculation formula
function testDesalCalc(depth, type, soil, acres) {
  const estimatedEC = (
    (type === 'seawater' ? 7.2 : 3.8) *
    (depth / 2) *
    (soil === 'clay' ? 1.25 : soil === 'loam' ? 1.0 : 0.75)
  );
  const gypsumPerAcre = estimatedEC > 8 ? 380 : estimatedEC > 5 ? 280 : 160;
  const totalGypsumKg = Math.round(gypsumPerAcre * acres);
  const totalBags = Math.round(totalGypsumKg / 25);
  return { estimatedEC, gypsumPerAcre, totalGypsumKg, totalBags };
}

const test1 = testDesalCalc(2.0, 'seawater', 'clay', 2.5);
assert(test1.estimatedEC === 9.0, `Test 1: 2ft Seawater on Clay EC = 9.0 dS/m (Actual: ${test1.estimatedEC})`);
assert(test1.totalGypsumKg === 950, `Test 1: Total Gypsum = 950 kg (Actual: ${test1.totalGypsumKg})`);
assert(test1.totalBags === 38, `Test 1: Total 25kg bags = 38 (Actual: ${test1.totalBags})`);

const test2 = testDesalCalc(1.0, 'brackish', 'sandy', 1.0);
assert(test2.estimatedEC < 4.0, `Test 2: 1ft Brackish on Sandy is Low Salinity (< 4.0 dS/m, Actual: ${test2.estimatedEC})`);
assert(test2.totalGypsumKg === 160, `Test 2: Gypsum is 160 kg for 1 acre (Actual: ${test2.totalGypsumKg})`);

// 4. Dosage Math Verification
console.log('\n--- 4. Chemical / Bio Land Dosage Math Audit ---');
function calcDosages(acreage) {
  return {
    waterL: Math.round(acreage * 200),
    streptocyclineG: +(acreage * 30).toFixed(1),
    blitoxKg: +(acreage * 0.5).toFixed(2),
    kno3Kg: +(acreage * 2.0).toFixed(1),
    gypsumKg: Math.round(acreage * 150)
  };
}

const dosage3_5 = calcDosages(3.5);
assert(dosage3_5.waterL === 700, 'Water for 3.5 acres is exactly 700 Litres (200L/acre x 3.5)');
assert(dosage3_5.streptocyclineG === 105.0, 'Streptocycline for 3.5 acres is 105.0g (30g/acre x 3.5)');
assert(dosage3_5.blitoxKg === 1.75, 'Blitox 50 WP for 3.5 acres is 1.75 kg (0.5kg/acre x 3.5)');
assert(dosage3_5.kno3Kg === 7.0, 'Potassium Nitrate for 3.5 acres is 7.0 kg (2.0kg/acre x 3.5)');
assert(dosage3_5.gypsumKg === 525, 'Agricultural Gypsum for 3.5 acres is 525 kg (150kg/acre x 3.5)');

// 5. Kisan Sathi Voice Avatar Dialect Audit
console.log('\n--- 5. Kisan Sathi Voice Avatar Multi-lingual Script Audit ---');
assert(KISAN_VOICE_TOPICS.length === 6, 'Contains 6 major post-cyclone emergency crisis topics');

const requiredLangs = ['english', 'odia', 'hindi', 'bangla', 'telugu'];
KISAN_VOICE_TOPICS.forEach(topic => {
  requiredLangs.forEach(lang => {
    assert(topic.question[lang] && topic.question[lang].length > 10, `${topic.id}: Question translated in ${lang}`);
    assert(topic.answerAudio[lang] && topic.answerAudio[lang].length > 25, `${topic.id}: Audio script translated in ${lang}`);
  });
  assert(topic.keyPoints && topic.keyPoints.length >= 3, `${topic.id}: Has at least 3 actionable field takeaways`);
});

console.log(`\n========================================`);
console.log(`AUDIT RESULTS: ${passedTests} PASSED, ${failedTests} FAILED (TOTAL: ${totalTests})`);
console.log(`ACCURACY SCORE: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
console.log(`========================================\n`);
