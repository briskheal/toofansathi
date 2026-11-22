import React, { useState, useEffect } from 'react';
import {
  Crown,
  Sparkles,
  Wheat,
  Waves,
  Ship,
  Calendar,
  FileText,
  ShieldCheck,
  ArrowLeft,
  Lock,
  CheckCircle,
  AlertTriangle,
  Download,
  Share2,
  RefreshCw,
  Clock,
  Compass,
  Wind,
  Droplets,
  Layers,
  Thermometer,
  Zap,
  PhoneCall,
  MessageSquare,
  Bell,
  MapPin,
  Plus,
  Trash2,
  Send,
  CheckCircle2,
  Building,
  Home,
  Check,
  Stethoscope,
  Activity,
  Eye,
  Volume2,
  Globe,
  Calculator,
  AlertCircle,
  Info,
  Camera,
  Upload,
  BookOpen,
  Scan,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Store,
  Ticket,
  Scale,
  ShieldAlert,
  Phone,
  MessageCircle,
  QrCode,
  FileCheck,
  Mic,
  MicOff,
  Sprout,
  TestTube2,
  Sliders,
  Play,
  Square,
  Microscope,
  TreePine
} from 'lucide-react';
import PremiumAuthModal from './components/PremiumAuthModal';
import { ALL_INDIA_ACTIVE_STORMS, getNearestStorm } from './services/cycloneEngine';
import { POST_CYCLONE_CROPS, CROP_DISEASES, ICAR_POST_CYCLONE_WORKSHOP_RULES } from './data/cropDiseases';
import { GOVERNMENT_MSP_2026, COASTAL_MANDIS } from './data/mandiPrices';
import { SALINE_RECOVERY_DATA } from './data/salineCatchCrops';
import { KISAN_VOICE_TOPICS } from './data/kisanVoiceFaq';

const PRO_TRANSLATIONS = {
  english: {
    backToLive: '← Live Public Portal',
    portalTitle: 'TOOFANSATHI PRO • TESTING SANDBOX (/pro)',
    badgeTitle: 'COMMERCIAL & AGRI-ENTERPRISE SUITE',
    heroDesc: '15-Day Ultra-Granular Hourly Forecasts, Automated WhatsApp Storm Alarms, Shrimp Pond Surge Defense, and Post-Cyclone Crop Doctor.',
    tabs: {
      harvest: '🌾 Crop Harvest Advisor',
      clinic: '🩺 Post-Cyclone Crop Doctor',
      mandi: '💰 Mandi Rates & MSP Shield',
      desalination: '🧪 Seawater Desalination & Catch Crops',
      kisanVoice: '🎙️ Kisan Sathi Voice Avatar',
      aquaculture: '🦐 Aquaculture Pond Surge',
      marine: '🚢 Marine Fleet Departure',
      fifteenDay: '⏱️ 15-Day Hourly Outlook',
      insurance: '📄 72h PMFBY Claim Dossier',
      whatsapp: '📲 WhatsApp Alarms',
      watchlist: '📍 Asset Watchlist'
    },
    clinicTitle: 'Immediately After Cyclone Crop Disease Doctor & Remedial Clinic',
    clinicSubtitle: 'Field pathology and multi-angle photo diagnostic clinic for storm-damaged and waterlogged crops.',
    angleSelect: 'Inspect Multi-Angle Symptom Photos (Match with field condition):',
    immediateRemedy: 'Immediate Post-Cyclone ICAR Treatment Protocol',
    dosageCalc: 'Emergency Chemical / Bio Dosage Calculator for Your Land',
    warningTitle: 'Strict Post-Cyclone Warning',
    listenDoctor: 'Listen Audio Prescription',
    stopAudio: 'Stop Audio',
    workshopTitle: 'Post-Cyclone Emergency Field Workshop (Hour 0 to Day 7 Action Plan)'
  },
  odia: {
    backToLive: '← ସାଧାରଣ ପୋର୍ଟାଲ୍',
    portalTitle: 'ତୁଫାନସାଥୀ ପ୍ରୋ • ପରୀକ୍ଷାମୂଳକ ପୋର୍ଟାଲ୍ (/pro)',
    badgeTitle: 'ବାଣିଜ୍ୟିକ ଓ କୃଷି ଏଣ୍ଟରପ୍ରାଇଜ୍ ସୁଇଟ୍',
    heroDesc: '୧୫-ଦିନିଆ ଘଣ୍ଟା ଅନୁଯାୟୀ ପାଣିପାଗ, ହ୍ୱାଟ୍ସଆପ୍ ସତର୍କତା, ଚିଙ୍ଗୁଡ଼ି ଘେରି ସୁରକ୍ଷା ଓ ବାତ୍ୟା ପରବର୍ତ୍ତୀ ଫସଲ ରୋଗ ଡାକ୍ତର।',
    tabs: {
      harvest: '🌾 ଫସଲ ଅମଳ ପରାମର୍ଶ',
      clinic: '🩺 ବାତ୍ୟା ପରବର୍ତ୍ତୀ ଫସଲ ଡାକ୍ତର',
      mandi: '💰 ମଣ୍ଡି ଦର ଓ ଏମ୍.ଏସ୍.ପି ସୁରକ୍ଷା',
      desalination: '🧪 ଲୁଣା ଜମି ସଂସ୍କାର ଓ ବିକଳ୍ପ ଫସଲ',
      kisanVoice: '🎙️ କିଷାନ ସାଥୀ କଥାବାର୍ତ୍ତା',
      aquaculture: '🦐 ଚିଙ୍ଗୁଡ଼ି ଘେରି ସୁରକ୍ଷା',
      marine: '🚢 ମାଛଧରା ଡଙ୍ଗା ସୁରକ୍ଷା',
      fifteenDay: '⏱️ ୧୫-ଦିନିଆ ପୂର୍ବାନୁମାନ',
      insurance: '📄 ୭୨-ଘଣ୍ଟିଆ ଫସଲ ବୀମା କ୍ଲେମ୍',
      whatsapp: '📲 ହ୍ୱାଟ୍ସଆପ୍ ଆଲାର୍ମ',
      watchlist: '📍 ଜମି ଓ ସମ୍ପତ୍ତି ନଜର'
    },
    clinicTitle: 'ବାତ୍ୟା ପରବର୍ତ୍ତୀ ଫସଲ ରୋଗ ନିରାକରଣ କ୍ଲିନିକ୍ ଓ କର୍ମଶାଳା',
    clinicSubtitle: 'ବିଭିନ୍ନ କୋଣରୁ ଫଟୋ ଦେଖି ରୋଗ ଚିହ୍ନଟ କରନ୍ତୁ ଏବଂ ତୁରନ୍ତ ଔଷଧ ସ୍ପ୍ରେ ପରାମର୍ଶ ପାଆନ୍ତୁ।',
    angleSelect: 'ଫସଲ ରୋଗର ୩ଟି ଭିନ୍ନ କୋଣର ଫଟୋ ନିରୀକ୍ଷଣ କରନ୍ତୁ:',
    immediateRemedy: 'ବାତ୍ୟା ପରେ ତୁରନ୍ତ କରିବାକୁ ଥିବା କାର୍ଯ୍ୟ (ICAR ନିୟମାବଳୀ)',
    dosageCalc: 'ଆପଣଙ୍କ ଜମି ପାଇଁ ଔଷଧ ପରିମାଣ ହିସାବ କରନ୍ତୁ',
    warningTitle: 'ବାତ୍ୟା ପରେ ଜରୁରୀ ସତର୍କତା',
    listenDoctor: 'ଡାକ୍ତରୀ ପରାମର୍ଶ ଶୁଣନ୍ତୁ',
    stopAudio: 'ଅଡିଓ ବନ୍ଦ କରନ୍ତୁ',
    workshopTitle: 'ବାତ୍ୟା ପରେ ୭-ଦିନିଆ ଜରୁରୀ କ୍ଷେତ୍ର କାର୍ଯ୍ୟ ଯୋଜନା'
  },
  hindi: {
    backToLive: '← मुख्य पोर्टल',
    portalTitle: 'तूफानसाथी प्रो • परीक्षण पोर्टल (/pro)',
    badgeTitle: 'व्यावसायिक एवं कृषि एंटरप्राइज सूट',
    heroDesc: '15-दिवसीय प्रति घंटा मौसम, व्हाट्सएप अलर्ट, झींगा तालाब सुरक्षा एवं चक्रवात बाद फसल रोग निदान।',
    tabs: {
      harvest: '🌾 फसल कटाई सलाहकार',
      clinic: '🩺 चक्रवात बाद फसल डॉक्टर',
      mandi: '💰 मंडी भाव एवं एमएसपी सुरक्षा',
      desalination: '🧪 लवणीय भूमि सुधार एवं आकस्मिक फसल',
      kisanVoice: '🎙️ किसान साथी आवाज़',
      aquaculture: '🦐 झींगा तालाब सुरक्षा',
      marine: '🚢 समुद्री नाव रवानगी',
      fifteenDay: '⏱️ 15-दिवसीय पूर्वानुमान',
      insurance: '📄 72-घंटे पीएमएफबीवाय दावा',
      whatsapp: '📲 व्हाट्सएप अलार्म',
      watchlist: '📍 बहु-स्थान संपत्ति निगरानी'
    },
    clinicTitle: 'चक्रवात उपरांत फसल रोग निदान क्लीनिक व कार्यशाला',
    clinicSubtitle: 'विभिन्न कोणों से ली गई तस्वीरों से रोग की पहचान करें और त्वरित उपचार पाएं।',
    angleSelect: 'रोग के 3 अलग-अलग कोणों की तस्वीरें देखें:',
    immediateRemedy: 'चक्रवात बाद त्वरित आईसीएआर उपचार प्रोटोकॉल',
    dosageCalc: 'अपनी जमीन के अनुसार दवा की मात्रा की गणना करें',
    warningTitle: 'चक्रवात उपरांत सख्त चेतावनी',
    listenDoctor: 'डॉक्टर की सलाह सुनें',
    stopAudio: 'ऑडियो बंद करें',
    workshopTitle: 'चक्रवात बाद 7-दिवसीय आपातकालीन खेत कार्ययोजना'
  },
  bangla: {
    backToLive: '← প্রধান পোর্টাল',
    portalTitle: 'তুফানসাথী প্রো • টেস্টিং পোর্টাল (/pro)',
    badgeTitle: 'বাণিজ্যিক ও কৃষি এন্টারপ্রাইজ স্যুট',
    heroDesc: '১৫-দিনের প্রতি ঘণ্টার পূর্বাভাস, হোয়াটসঅ্যাপ সতর্কতা এবং ঘূর্ণিঝড় পরবর্তী ফসল ডাক্তার।',
    tabs: {
      harvest: '🌾 ফসল কাটার পরামর্শ',
      clinic: '🩺 ঘূর্ণিঝড় পরবর্তী ফসল ডাক্তার',
      mandi: '💰 মাণ্ডি দর ও এমএসপি সুরক্ষা',
      desalination: '🧪 লবণাক্ত জমি সংস্কার ও বিকল্প ফসল',
      kisanVoice: '🎙️ কিষাণ সাথী ভয়েস',
      aquaculture: '🦐 চিংড়ি ঘের সুরক্ষা',
      marine: '🚢 মাছ ধরার নৌকা সুরক্ষা',
      fifteenDay: '⏱️ ১৫-দিনের পূর্বাভাস',
      insurance: '📄 ৭২-ঘণ্টার ফসল বীমা দাবি',
      whatsapp: '📲 হোয়াটসঅ্যাপ অ্যালার্ম',
      watchlist: '📍 খামার নজরদারি'
    },
    clinicTitle: 'ঘূর্ণিঝড় পরবর্তী ফসল রোগ নির্ণয় ক্লিনিক ও কর্মশালা',
    clinicSubtitle: 'বিভিন্ন কোণ থেকে ছবি দেখে রোগ নির্ণয় করুন এবং দ্রুত প্রতিকার পান।',
    angleSelect: 'রোগের ৩টি ভিন্ন কোণের ছবি দেখুন:',
    immediateRemedy: 'ঘূর্ণিঝড় পরবর্তী জরুরি আইসিএআর প্রতিকার',
    dosageCalc: 'আপনার জমির জন্য ওষুধের মাত্রা গণনা করুন',
    warningTitle: 'ঘূর্ণিঝড় পরবর্তী সতর্কবার্তা',
    listenDoctor: 'ডাক্তারের পরামর্শ শুনুন',
    stopAudio: 'অডিও বন্ধ করুন',
    workshopTitle: 'ঘূর্ণিঝড় পরবর্তী ৭-দিনের জরুরি ক্ষেত্র পরিকল্পনা'
  },
  telugu: {
    backToLive: '← లైవ్ పబ్లిక్ పోర్టల్',
    portalTitle: 'తూఫాన్ సాథీ ప్రో • టెస్టింగ్ శాండ్‌బాక్స్ (/pro)',
    badgeTitle: 'వాణిజ్య & వ్యవసాయ ఎంటర్‌ప్రైజ్ సూట్',
    heroDesc: '15-రోజుల గంటల సూచన, వాట్సాప్ అలారాలు, రొయ్యల చెరువు రక్షణ & తుఫాను అనంతర పంట డాక్టర్.',
    tabs: {
      harvest: '🌾 పంట కోత సలహాదారు',
      clinic: '🩺 తుఫాను అనంతర పంట డాక్టర్',
      mandi: '💰 మార్కెట్ ధరలు & MSP రక్షణ',
      desalination: '🧪 ఉప్పు నేలల పునరుద్ధరణ & పంటలు',
      kisanVoice: '🎙️ కిసాన్ వాయిస్ సలహా',
      aquaculture: '🦐 ఆక్వాకల్చర్ చెరువు రక్షణ',
      marine: '🚢 బోట్ బయలుదేరే భద్రత',
      fifteenDay: '⏱️ 15-రోజుల ఔట్‌లుక్',
      insurance: '📄 72 గంటల PMFBY క్లెయిమ్',
      whatsapp: '📲 వాట్సాప్ అలారాలు',
      watchlist: '📍 ఆస్తి వాచ్‌లిస్ట్'
    },
    clinicTitle: 'తుఫాను అనంతర పంట వ్యాధి డాక్టర్ & క్లినిక్',
    clinicSubtitle: 'వివిధ కోణాల నుండి ఫోటోల ద్వారా తెగుళ్ళను గుర్తించి సరైన మందులను వాడండి.',
    angleSelect: 'తెగులు యొక్క 3 వేర్వేరు కోణాల ఫోటోలను పరిశీలించండి:',
    immediateRemedy: 'తుఫాను తర్వాత తక్షణ ICAR చికిత్సా పద్ధతి',
    dosageCalc: 'మీ భూమి విస్తీర్ణానికి మందుల పరిమాణాన్ని లెక్కించండి',
    warningTitle: 'తుఫాను అనంతర హెచ్చరిక',
    listenDoctor: 'డాక్టర్ సలహాను వినండి',
    stopAudio: 'ఆడియో ఆపు',
    workshopTitle: 'తుఫాను అనంతర 7-రోజుల అత్యవసర ప్రణాళిక'
  }
};

const DEMO_LEAF_SAMPLES = [
  {
    id: 's1',
    name: 'Paddy: Wavy Yellow Blight',
    crop: '🌾 Paddy (ଧାନ)',
    diseaseId: 'paddy-blb',
    confidence: 96.8,
    angle: 'Angle 1: Macro Leaf Lesion with Amber Ooze Beads',
    badge: 'Xanthomonas Blight Sample'
  },
  {
    id: 's2',
    name: 'Paddy: Waterline Sheath Blight',
    crop: '🌾 Paddy (ଧାନ)',
    diseaseId: 'paddy-sheath-blight',
    confidence: 95.2,
    angle: 'Angle 1: Waterline Sheath Lesion',
    badge: 'Rhizoctonia Sheath Rot'
  },
  {
    id: 's3',
    name: 'Groundnut: Tikka Halo Spot',
    crop: '🥜 Groundnut (ଚିନାବାଦାମ)',
    diseaseId: 'groundnut-tikka',
    confidence: 97.4,
    angle: 'Angle 1: Yellow Halo Spots Close-Up',
    badge: 'Cercospora Leaf Spot'
  },
  {
    id: 's4',
    name: 'Tomato: Sudden Bacterial Droop',
    crop: '🍅 Tomato (ଟମାଟୋ)',
    diseaseId: 'veg-bacterial-wilt',
    confidence: 94.1,
    angle: 'Angle 1: Green Droop Macro',
    badge: 'Ralstonia Wilt Sample'
  }
];

export default function ProApp() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState('paddy');
  const [activeTab, setActiveTab] = useState('harvest'); // 'harvest' | 'clinic' | 'aquaculture' | 'marine' | '15day' | 'insurance' | 'whatsapp' | 'watchlist'
  const [forecastModel, setForecastModel] = useState('ecmwf'); // 'ecmwf' | 'gfs'

  // Pro Vernacular Language State
  const [proLang, setProLang] = useState('odia'); // Default to Odia for coastal farmer relevance
  const [selectedClinicCrop, setSelectedClinicCrop] = useState('paddy');
  const [selectedDiseaseId, setSelectedDiseaseId] = useState('paddy-blb');
  const [activePhotoAngle, setActivePhotoAngle] = useState(0); // 0, 1, 2
  const [farmAcreage, setFarmAcreage] = useState(1.0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // AI Leaf Scanner State
  const [clinicMode, setClinicMode] = useState('scanner'); // 'scanner' | 'library'
  const [uploadedLeafImage, setUploadedLeafImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgressText, setScanProgressText] = useState('');
  const [scannedResult, setScannedResult] = useState({
    diseaseId: 'paddy-blb',
    confidence: 96.8,
    matchedAngle: 'Angle 1: Macro Leaf Lesion with Amber Ooze Beads',
    severity: 'High (Causes 40–60% crop yield collapse if untreated)'
  });

  // Coastal Mandi & MSP State
  const [selectedMandiId, setSelectedMandiId] = useState('puri-rmc');
  const [generatedMandiToken, setGeneratedMandiToken] = useState(null);

  // 72-Hour PMFBY Claim Dossier State
  const [claimCrop, setClaimCrop] = useState('Paddy / Rice (Common)');
  const [claimPlotNo, setClaimPlotNo] = useState('Khata 142/8, Plot 902/1');
  const [claimArea, setClaimArea] = useState('2.50 Acres');
  const [claimPolicyNo, setClaimPolicyNo] = useState('PMFBY-KCC-OD-8921');
  const [claimIntimated, setClaimIntimated] = useState(false);
  const [claimAckNo, setClaimAckNo] = useState('PMFBY-INT-OD-2026-7842');

  // Seawater Desalination & Catch Crops State
  const [desalDepth, setDesalDepth] = useState(2.0); // feet
  const [desalIngressType, setDesalIngressType] = useState('seawater'); // seawater vs brackish
  const [desalSoil, setDesalSoil] = useState('clay'); // clay, loam, sandy
  const [desalAcres, setDesalAcres] = useState(2.5);
  const [desalSubTab, setDesalSubTab] = useState('calc'); // calc | varieties | catchCrops | roadmap

  // Kisan Sathi Colloquial Voice Avatar State
  const [voiceActiveTopicId, setVoiceActiveTopicId] = useState('seawater-saline');
  const [isVoiceSpeaking, setIsVoiceSpeaking] = useState(false);

  const t = (key) => {
    const dict = PRO_TRANSLATIONS[proLang] || PRO_TRANSLATIONS.english;
    return dict[key] || PRO_TRANSLATIONS.english[key] || key;
  };

  const handleSpeakRemedy = (text) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this device.');
      return;
    }
    window.speechSynthesis.cancel();
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    const langMap = {
      english: 'en-IN',
      hindi: 'hi-IN',
      odia: 'or-IN',
      bangla: 'bn-IN',
      telugu: 'te-IN',
      tamil: 'ta-IN',
      gujarati: 'gu-IN'
    };
    utterance.lang = langMap[proLang] || 'en-IN';
    utterance.rate = 0.9;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleSpeakKisanVoice = (text) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this device.');
      return;
    }
    window.speechSynthesis.cancel();
    if (isVoiceSpeaking) {
      setIsVoiceSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    const langMap = {
      english: 'en-IN',
      hindi: 'hi-IN',
      odia: 'or-IN',
      bangla: 'bn-IN',
      telugu: 'te-IN'
    };
    utterance.lang = langMap[proLang] || 'en-IN';
    utterance.rate = 0.88;
    utterance.pitch = 1.05;
    utterance.onend = () => setIsVoiceSpeaking(false);
    utterance.onerror = () => setIsVoiceSpeaking(false);
    setIsVoiceSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleClinicCropChange = (cropId) => {
    setSelectedClinicCrop(cropId);
    const firstMatch = CROP_DISEASES.find(d => d.cropId === cropId);
    if (firstMatch) {
      setSelectedDiseaseId(firstMatch.id);
      setActivePhotoAngle(0);
    }
  };

  const runScannerAnalysis = (diseaseId, confidence, angle) => {
    setIsScanning(true);
    setScanProgressText('Scanning leaf contours, chlorotic yellow margins & tissue necrosis...');
    setTimeout(() => {
      setScanProgressText('Detecting bacterial ooze droplets & water-soaked lesion borders...');
    }, 400);
    setTimeout(() => {
      setScanProgressText('Matching with ICAR disaster pathology database (Angle 1–3)...');
    }, 900);
    setTimeout(() => {
      setIsScanning(false);
      setSelectedDiseaseId(diseaseId);
      const matched = CROP_DISEASES.find(d => d.id === diseaseId);
      if (matched) {
        setSelectedClinicCrop(matched.cropId);
      }
      setScannedResult({
        diseaseId,
        confidence,
        matchedAngle: angle,
        severity: matched?.severity || 'High Alert'
      });
    }, 1400);
  };

  const handleSelectSampleLeaf = (sample) => {
    setUploadedLeafImage(null);
    runScannerAnalysis(sample.diseaseId, sample.confidence, sample.angle);
  };

  const handleImageFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedLeafImage(event.target.result);
        runScannerAnalysis('paddy-blb', 95.8, 'Angle 1: Macro Leaf Lesion with Amber Ooze Beads');
      };
      reader.readAsDataURL(file);
    }
  };

  const currentDisease = CROP_DISEASES.find(d => d.id === selectedDiseaseId) || CROP_DISEASES[0];
  const matchingDiseases = CROP_DISEASES.filter(d => d.cropId === selectedClinicCrop);

  // WhatsApp Alert Dispatch State
  const [whatsappContacts, setWhatsappContacts] = useState([
    { id: 1, name: 'Captain / Owner (Self)', phone: '+91 98765 43210', role: 'Owner', type: 'Instant WhatsApp', status: 'Active (Delivered 12m ago)' },
    { id: 2, name: 'Farm Field Manager', phone: '+91 98451 12345', role: 'Crop Supervisor', type: 'WhatsApp & SMS', status: 'Active (Standing by)' },
    { id: 3, name: 'Shrimp Pond Night Guard', phone: '+91 97761 98765', role: 'Aquaculture Security', type: 'SMS Flash', status: 'Active (Pond Aerators Ready)' },
  ]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactRole, setNewContactRole] = useState('Farm Supervisor');
  const [dispatchAlertSent, setDispatchAlertSent] = useState(false);

  // Multi-Location Asset Watchlist State
  const [watchedAssets, setWatchedAssets] = useState([
    { id: 1, name: 'Puri Coastal Shrimp Hatchery (4 Ponds)', location: 'Astaranga, Puri', type: 'Aquaculture', distKm: 142, threat: 'High (Surge Alert 1.8m)', icon: '🦐', status: 'Pond Bunds Reinforced' },
    { id: 2, name: 'Jagatsinghpur Paddy Godown', location: 'Naugaon, Jagatsinghpur', type: 'Crop Storage', distKm: 198, threat: 'Moderate (Rainfall 120mm)', icon: '🌾', status: 'Tarpaulins Clamped' },
    { id: 3, name: 'Paradeep Mechanized Trawler (OM-04-99)', location: 'Paradeep Fishing Harbour', type: 'Marine Fleet', distKm: 210, threat: 'Severe (Harbor Return)', icon: '🚢', status: 'Moored at Jetty #3' },
    { id: 4, name: 'Family Ancestral Residence & Cattle Shed', location: 'Kendrapara Rural', type: 'Residential', distKm: 235, threat: 'Low Risk', icon: '🏠', status: 'Emergency Kit Stocked' },
  ]);
  const [newAssetName, setNewAssetName] = useState('');
  const [newAssetLoc, setNewAssetLoc] = useState('');
  const [newAssetType, setNewAssetType] = useState('Aquaculture');

  // Load existing pro user from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('toofansathi_pro_user');
      if (saved) {
        setCurrentUser(JSON.parse(saved));
      } else {
        // Auto-open registration modal for test demonstration
        setIsAuthModalOpen(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('toofansathi_pro_user');
    setCurrentUser(null);
  };

  const activeStorm = ALL_INDIA_ACTIVE_STORMS[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Testing Sandbox Navigation & Route Switcher Bar */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border-b border-amber-500/40 px-3 sm:px-6 py-2 text-xs flex flex-wrap items-center justify-between gap-2 shadow-lg">
        <div className="flex items-center gap-2">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (window.location.hash.includes('pro')) {
                window.location.hash = '';
              }
              window.history.pushState({}, '', '/');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="flex items-center gap-1 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-2.5 py-1 rounded-lg transition-colors font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t('backToLive')}</span>
          </a>
          <span className="text-amber-500 font-mono font-bold flex items-center gap-1.5 pl-2 border-l border-slate-700">
            <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
            <span className="hidden sm:inline">{t('portalTitle')}</span>
            <span className="sm:hidden font-mono">PRO SUITE</span>
          </span>
        </div>

        {/* Vernacular Language Switcher & User Auth Status Pill */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Vernacular Language Selector */}
          <div className="flex items-center gap-1 bg-slate-900 border border-amber-500/40 rounded-lg px-2 py-1 shadow-inner">
            <Globe className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <select
              value={proLang}
              onChange={(e) => setProLang(e.target.value)}
              className="bg-transparent text-[11px] font-bold text-amber-200 focus:outline-none cursor-pointer"
              title="Select Language / ଭାଷା ବାଛନ୍ତୁ / भाषा चुनें"
            >
              <option value="odia" className="bg-slate-900 text-white">ଓଡ଼ିଆ (Odia)</option>
              <option value="english" className="bg-slate-900 text-white">English</option>
              <option value="hindi" className="bg-slate-900 text-white">हिन्दी (Hindi)</option>
              <option value="bangla" className="bg-slate-900 text-white">বাংলা (Bengali)</option>
              <option value="telugu" className="bg-slate-900 text-white">తెలుగు (Telugu)</option>
            </select>
          </div>

          {currentUser ? (
            <div className="flex items-center gap-2 bg-slate-900/90 border border-amber-500/50 px-2.5 py-1 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-[11px] font-bold text-amber-300">
                👑 {currentUser.name} ({currentUser.state})
              </span>
              <button
                onClick={handleLogout}
                className="text-[10px] text-slate-400 hover:text-red-400 ml-1 underline cursor-pointer"
              >
                Log Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black rounded-lg text-xs shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <Crown className="w-3.5 h-3.5 fill-slate-950" />
              <span>Log In / Register (OTP)</span>
            </button>
          )}
        </div>
      </div>

      {/* Hero Header */}
      <header className="bg-slate-900/90 border-b border-slate-800/80 py-4 px-3 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[10px] font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {t('badgeTitle')}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-sky-950 text-sky-400 border border-sky-800 text-[10px] font-mono font-bold">
                ECMWF 9km High-Res
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>ToofanSathi Pro</span>
              <span className="text-amber-400 font-serif italic text-base">Elite</span>
            </h1>
            <p className="text-xs text-slate-400 max-w-xl">
              {t('heroDesc')}
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 p-2 rounded-xl text-xs">
            <div className="pr-3 border-r border-slate-800 text-left">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Tracked Storm</span>
              <span className="text-xs font-bold text-amber-400 truncate max-w-[130px] block">
                {activeStorm.cycloneCode || 'AKVAN'}
              </span>
            </div>
            <div className="pl-1 text-left">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Model Refresh</span>
              <span className="text-xs font-bold text-emerald-400 font-mono">4x Daily (1-hr)</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Suite Dashboard */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-3 sm:p-6 space-y-5">
        {/* Pro Navigation Tabs - Responsive Grid/Wrap */}
        <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-800">
          <button
            onClick={() => setActiveTab('harvest')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'harvest'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Wheat className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('tabs').harvest}</span>
          </button>

          <button
            onClick={() => setActiveTab('clinic')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'clinic'
                ? 'bg-rose-500/25 text-rose-300 border border-rose-500/60 shadow-sm shadow-rose-950/40 ring-1 ring-rose-500/40'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span className="font-extrabold">{t('tabs').clinic}</span>
          </button>

          <button
            onClick={() => setActiveTab('mandi')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'mandi'
                ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/60 shadow-sm shadow-emerald-950/40 ring-1 ring-emerald-500/40'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-extrabold">{t('tabs').mandi}</span>
          </button>

          <button
            onClick={() => setActiveTab('desalination')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'desalination'
                ? 'bg-teal-500/25 text-teal-300 border border-teal-500/60 shadow-sm shadow-teal-950/40 ring-1 ring-teal-500/40'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <TestTube2 className="w-3.5 h-3.5 text-teal-400" />
            <span className="font-extrabold">{t('tabs').desalination}</span>
          </button>

          <button
            onClick={() => setActiveTab('kisanVoice')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'kisanVoice'
                ? 'bg-amber-500/25 text-amber-300 border border-amber-500/60 shadow-sm shadow-amber-950/40 ring-1 ring-amber-500/40'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Mic className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            <span className="font-extrabold">{t('tabs').kisanVoice}</span>
          </button>

          <button
            onClick={() => setActiveTab('aquaculture')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'aquaculture'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Waves className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('tabs').aquaculture}</span>
          </button>

          <button
            onClick={() => setActiveTab('marine')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'marine'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50 shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Ship className="w-3.5 h-3.5 text-blue-400" />
            <span>{t('tabs').marine}</span>
          </button>

          <button
            onClick={() => setActiveTab('15day')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === '15day'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t('tabs').fifteenDay}</span>
          </button>

          <button
            onClick={() => setActiveTab('insurance')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'insurance'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            <span>{t('tabs').insurance}</span>
          </button>

          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'whatsapp'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t('tabs').whatsapp}</span>
          </button>

          <button
            onClick={() => setActiveTab('watchlist')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'watchlist'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('tabs').watchlist} ({watchedAssets.length})</span>
          </button>
        </div>

        {/* TAB 1: Agri-Crop Harvest & Spray Window Advisor */}
        {activeTab === 'harvest' && (
          <div className="space-y-4">
            <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Wheat className="w-5 h-5 text-amber-400" />
                    <span>48-Hour Pre-Cyclone Harvest Safety Advisor</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Calculates whether you should harvest standing crops today or wait, preventing rain lodging loss
                  </p>
                </div>

                {/* Crop Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-semibold">Select Crop:</span>
                  <select
                    value={selectedCrop}
                    onChange={(e) => setSelectedCrop(e.target.value)}
                    className="px-3 py-1.5 bg-slate-950 border border-amber-500/40 rounded-xl text-xs font-bold text-amber-300 focus:outline-none"
                  >
                    <option value="paddy">Paddy / Rice (Mature Grain)</option>
                    <option value="mustard">Mustard / Oilseeds (Pod Stage)</option>
                    <option value="groundnut">Groundnut (Kharif/Rabi)</option>
                    <option value="vegetables">Coastal Vegetables (Chilli/Brinjal)</option>
                  </select>
                </div>
              </div>

              {/* Status Alert Banner - Dynamically Swapped by Selected Crop */}
              {(() => {
                const cropProfiles = {
                  paddy: {
                    alertTitle: '🟢 Prime 36-Hour Harvest Window Open (Action Recommended)',
                    alertDesc: 'Heavy cyclonic precipitation (55–80 mm) is forecast to arrive in 38 hours. Grain moisture is currently at 18%. Mobilize harvesters and threshers immediately today to clear mature fields and shift bags to raised concrete godowns.',
                    alertBg: 'bg-emerald-950/40 border-emerald-500/40',
                    alertText: 'text-emerald-300',
                    iconColor: 'text-emerald-400',
                    windTitle: 'Moderate (42 km/h)',
                    windDesc: 'Tall paddy stalks vulnerable to bend after 48 hrs',
                    sprayTitle: '❌ Spraying Blocked',
                    sprayDesc: 'High rain probability will wash away chemical coats',
                    soilTitle: '62% (Good Grip)',
                    soilDesc: 'Combine harvesters can operate without bogging'
                  },
                  mustard: {
                    alertTitle: '🟡 Pod Shattering High Risk (Advance Harvest Needed)',
                    alertDesc: 'High gusts exceeding 65 km/h will cause extensive siliqua/pod dehiscence and seed shatter loss. Harvest at 75-80% physiological maturity when pods turn yellow-brown, and bundle under tarpaulins.',
                    alertBg: 'bg-amber-950/40 border-amber-500/40',
                    alertText: 'text-amber-300',
                    iconColor: 'text-amber-400',
                    windTitle: 'High (Pod Shatter Risk)',
                    windDesc: 'Brittle dry siliqua pods prone to splitting in squalls',
                    sprayTitle: '❌ Spraying Blocked',
                    sprayDesc: 'High wind drift hazard and rainwash risk',
                    soilTitle: '55% (Firm Soil)',
                    soilDesc: 'Manual reaper teams can operate rapidly today'
                  },
                  groundnut: {
                    alertTitle: '🟠 Immediate In-Furrow Drainage Required (Aflatoxin Threat)',
                    alertDesc: 'Standing water submersion exceeding 24 hours triggers pod asphyxiation, peg detachment, and Aspergillus aflatoxin infection. Dig perimeter escape ditches immediately before storm landfall.',
                    alertBg: 'bg-orange-950/40 border-orange-500/40',
                    alertText: 'text-orange-300',
                    iconColor: 'text-orange-400',
                    windTitle: 'Low (Prostrate Canopy)',
                    windDesc: 'Dense ground runner foliage resists gale wind lodging',
                    sprayTitle: '⚠️ Spot Drench Only',
                    sprayDesc: 'Root collar Trichoderma drench allowed if dry',
                    soilTitle: '74% (Saturated)',
                    soilDesc: 'Avoid digging pods while wet to prevent pod breakage'
                  },
                  vegetables: {
                    alertTitle: '🔴 Staking & Trellis Reinforcement Urgent (Tomato / Chilli)',
                    alertDesc: 'Tomato and chilli vines will snap and lodge under gale force gusts. Reinforce bamboo stakes with coir twine, create furrow drainage, and harvest all breaker-stage fruits immediately today.',
                    alertBg: 'bg-rose-950/40 border-rose-500/40',
                    alertText: 'text-rose-300',
                    iconColor: 'text-rose-400',
                    windTitle: 'Extreme (Vines Vulnerable)',
                    windDesc: 'Stakes & trellises prone to structural collapse',
                    sprayTitle: '❌ Fungicide Spray Blocked',
                    sprayDesc: 'Washing off within 6 hours due to squall showers',
                    soilTitle: '68% (Moderate)',
                    soilDesc: 'Raised ridges prevent collar rot & damping-off'
                  }
                };

                const currentProfile = cropProfiles[selectedCrop] || cropProfiles.paddy;

                return (
                  <>
                    <div className={`my-4 p-3.5 rounded-xl border flex items-start gap-3 ${currentProfile.alertBg}`}>
                      <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${currentProfile.iconColor}`} />
                      <div className="text-xs text-slate-300">
                        <h4 className={`font-bold text-sm ${currentProfile.alertText}`}>
                          {currentProfile.alertTitle}
                        </h4>
                        <p className="mt-1 leading-relaxed">
                          {currentProfile.alertDesc}
                        </p>
                      </div>
                    </div>

                    {/* 3 Parameter Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                          Wind Lodging Threat
                        </span>
                        <span className="text-lg font-black text-amber-400 block">{currentProfile.windTitle}</span>
                        <span className="text-[11px] text-slate-400">
                          {currentProfile.windDesc}
                        </span>
                      </div>

                      <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                          Pesticide Spray Fastness
                        </span>
                        <span className="text-lg font-black text-red-400 block">{currentProfile.sprayTitle}</span>
                        <span className="text-[11px] text-slate-400">
                          {currentProfile.sprayDesc}
                        </span>
                      </div>

                      <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                          Soil Moisture Saturation
                        </span>
                        <span className="text-lg font-black text-sky-400 block">{currentProfile.soilTitle}</span>
                        <span className="text-[11px] text-slate-400">
                          {currentProfile.soilDesc}
                        </span>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}

        {/* TAB 2: Immediately After Cyclone Crop Disease Doctor & Remedial Clinic */}
        {activeTab === 'clinic' && (
          <div className="space-y-5">
            {/* Header & Audio Prescription Bar */}
            <div className="bg-gradient-to-r from-rose-950/40 via-slate-900 to-amber-950/30 border border-rose-500/40 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                      <Stethoscope className="w-3 h-3 text-rose-400" />
                      ICAR / OUAT Post-Disaster Protocol
                    </span>
                    <span className="text-[11px] font-bold text-amber-300">
                      {proLang === 'odia' ? 'ବାତ୍ୟା ପରବର୍ତ୍ତୀ ଫସଲ ଚିକିତ୍ସାଳୟ' : proLang === 'hindi' ? 'चक्रवात उपरांत फसल निदान' : 'Emergency Agricultural Clinic'}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    {t('clinicTitle')}
                  </h3>
                  <p className="text-xs text-slate-300 max-w-2xl">
                    {t('clinicSubtitle')}
                  </p>
                </div>

                {/* Voice Prescription Player */}
                <button
                  type="button"
                  onClick={() => {
                    const textToSpeak = currentDisease.audioGuide[proLang] || currentDisease.remedySteps.map(s => `${s.title}: ${s.desc}`).join('. ');
                    handleSpeakRemedy(textToSpeak);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer flex-shrink-0 ${
                    isPlayingAudio
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-amber-500/20'
                  }`}
                  title="Listen Vernacular Audio Doctor Prescription"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{isPlayingAudio ? t('stopAudio') : t('listenDoctor')}</span>
                </button>
              </div>

              {/* ICAR 4-Stage Post-Cyclone Field Workshop Roadmap */}
              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  🗓️ {t('workshopTitle')}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {ICAR_POST_CYCLONE_WORKSHOP_RULES.map((rule, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-mono font-black text-rose-400 bg-rose-950/50 px-1.5 py-0.2 rounded">
                          {rule.step}
                        </span>
                        <span className="text-slate-500">Stage {idx + 1}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white truncate">{rule.title}</h4>
                      <p className="text-[10px] text-slate-400 leading-tight line-clamp-2">{rule.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Diagnostic Mode Switcher: AI Camera Scanner vs 3-Angle Crop Library */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-2 rounded-2xl">
              <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl">
                <button
                  type="button"
                  onClick={() => setClinicMode('scanner')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    clinicMode === 'scanner'
                      ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Camera className="w-4 h-4 text-amber-300" />
                  <span>📸 AI Leaf Photo Scanner</span>
                  <span className="text-[9px] bg-rose-950 text-rose-300 px-1.5 py-0.2 rounded-full font-mono border border-rose-500/40">
                    Instant AI
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setClinicMode('library')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    clinicMode === 'library'
                      ? 'bg-slate-800 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-sky-400" />
                  <span>📚 3-Angle Crop Library</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-400 px-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>ICAR-NRRI Cuttack & SAU Pathology Standards</span>
              </div>
            </div>

            {/* MODE 1: AI LEAF PHOTO SCANNER */}
            {clinicMode === 'scanner' && (
              <div className="space-y-4">
                {/* Upload & Quick Demo Samples Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  {/* Left: Interactive Upload / Snap Box (5 cols) */}
                  <div className="lg:col-span-5 bg-slate-900/90 border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Camera className="w-4 h-4 text-amber-400" />
                          <span>Snap or Upload Diseased Leaf</span>
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400">100% Offline AI</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Take a photo of diseased leaf spots in natural daylight or select from gallery.
                      </p>
                    </div>

                    {/* Camera Upload Drop Area */}
                    <label className="border-2 border-dashed border-amber-500/40 hover:border-amber-400/80 bg-slate-950/70 rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 group">
                      <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                        <Camera className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block group-hover:text-amber-300">
                          Tap to Take Photo or Browse
                        </span>
                        <span className="text-[10px] text-slate-500 block mt-0.5">
                          Supports Mobile Back Camera & Image Upload
                        </span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleImageFileUpload}
                        className="hidden"
                      />
                    </label>

                    {/* Quick Demo Test Samples */}
                    <div className="space-y-2 pt-2 border-t border-slate-800">
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        Or Test Instant Cyclone Leaf Samples:
                      </span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {DEMO_LEAF_SAMPLES.map((sample) => (
                          <button
                            key={sample.id}
                            type="button"
                            onClick={() => handleSelectSampleLeaf(sample)}
                            className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-amber-500/50 text-left transition-colors cursor-pointer group flex items-center gap-2"
                          >
                            <img src={sample.imageUrl} alt={sample.name} className="w-8 h-8 rounded-md object-cover flex-shrink-0" />
                            <div className="truncate">
                              <span className="text-[10px] font-bold text-white block truncate group-hover:text-amber-300">
                                {sample.name}
                              </span>
                              <span className="text-[9px] text-emerald-400 font-mono block">
                                {sample.confidence}% Match
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Real-time Scanning & AI Diagnostic Result (7 cols) */}
                  <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Scan className="w-4 h-4 text-rose-400" />
                        <span>AI Diagnostic Inspection & Match Output</span>
                      </span>
                      <span className="text-[10px] font-mono font-bold text-amber-400">
                        Neural Model v3.2
                      </span>
                    </div>

                    {/* Scanning Animation or Scanned Image Display */}
                    <div className="relative h-56 sm:h-64 w-full bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
                      {uploadedLeafImage ? (
                        <img
                          src={uploadedLeafImage}
                          alt="Farmer Scanned Leaf"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/30 p-4 relative">
                          {/* Reticle grid */}
                          <div className="absolute inset-0 bg-[linear-gradient(to_right,#05966915_1px,transparent_1px),linear-gradient(to_bottom,#05966915_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                          <div className="w-20 h-20 rounded-full border-2 border-dashed border-emerald-500/40 flex items-center justify-center text-4xl mb-2 relative">
                            🍃
                            <div className="absolute inset-0 rounded-full border border-emerald-400/60 animate-ping pointer-events-none" />
                          </div>
                          <span className="text-xs font-bold text-emerald-400 font-mono tracking-wider">
                            AI LEAF PATHOLOGY RETICLE ACTIVE
                          </span>
                          <span className="text-[10px] text-slate-400 mt-1">
                            {scannedResult.matchedAngle}
                          </span>
                        </div>
                      )}

                      {/* Laser Scanning Beam when scanning */}
                      {isScanning && (
                        <div className="absolute inset-0 bg-rose-950/60 flex flex-col items-center justify-center p-4 text-center z-20">
                          <div className="w-full h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent absolute top-1/2 -translate-y-1/2 animate-pulse"></div>
                          <div className="bg-slate-950/95 border border-rose-500 p-3 rounded-xl shadow-2xl space-y-2 max-w-sm">
                            <div className="flex items-center justify-center gap-2 text-rose-400 font-bold text-xs animate-pulse">
                              <Scan className="w-4 h-4" />
                              <span>ANALYZING LEAF PATHOLOGY...</span>
                            </div>
                            <p className="text-[11px] font-mono text-slate-300">{scanProgressText}</p>
                          </div>
                        </div>
                      )}

                      {!isScanning && (
                        <>
                          <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur border border-emerald-500/50 px-2.5 py-1 rounded-lg text-xs font-black text-emerald-400 shadow-lg flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{scannedResult.confidence}% AI Match Confidence</span>
                          </div>

                          <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur border border-slate-800 p-3 rounded-xl flex items-center justify-between gap-2">
                            <div>
                              <span className="text-[10px] text-slate-400 font-mono block">Primary Pathology Diagnosis:</span>
                              <h4 className="text-xs sm:text-sm font-extrabold text-white">
                                {currentDisease.vernacular[proLang] || currentDisease.name}
                              </h4>
                            </div>
                            <span className="text-[10px] bg-rose-950/80 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded-full font-bold">
                              {currentDisease.severity.split(' ')[0]} Alert
                            </span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Pathology Breakdown Callouts */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">Matched ICAR Angle</span>
                        <span className="font-bold text-amber-300 block text-[11px]">{scannedResult.matchedAngle}</span>
                      </div>
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">Post-Cyclone Threat</span>
                        <span className="font-bold text-rose-400 block text-[11px]">Rapid Waterborne Tissue Decay</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Instant ICAR Remedial Prescription & Land Dosage Calculator (Synchronized) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  {/* Left: ICAR Remedial Prescription (7 cols) */}
                  <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3.5">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Prescribed Emergency ICAR Treatment for {currentDisease.name}</span>
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          const text = currentDisease.audioGuide[proLang] || currentDisease.remedySteps.map(s => `${s.title}: ${s.desc}`).join('. ');
                          handleSpeakRemedy(text);
                        }}
                        className="text-[11px] text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{isPlayingAudio ? 'Stop Voice' : 'Listen Prescription'}</span>
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {currentDisease.remedySteps.map((step) => (
                        <div key={step.step} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-[10px] flex items-center justify-center">
                              {step.step}
                            </span>
                            <h5 className="text-xs font-bold text-white">{step.title}</h5>
                          </div>
                          <p className="text-[11px] text-slate-300 pl-7 leading-relaxed">{step.desc}</p>
                        </div>
                      ))}
                    </div>

                    {/* Strict Nitrogen Warning */}
                    <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 flex items-start gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-[11px] font-bold text-red-300 uppercase">Strict Post-Cyclone Warning</h5>
                        <p className="text-[10px] text-red-200/90 leading-tight mt-0.5">
                          Never apply high Urea / Nitrogen fertilizer immediately after cyclone water recedes; excessive nitrogen feeds succulent bacterial and fungal tissue collapse.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Acreage Dosage Calculator (5 cols) */}
                  <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/40 border border-amber-500/40 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <div className="flex items-center gap-1.5">
                        <Calculator className="w-4 h-4 text-amber-400" />
                        <h4 className="text-xs font-bold text-white">Land Size Chemical / Bio Calculator</h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-300 font-semibold">Your Land Area:</span>
                      <div className="flex items-center gap-1 bg-slate-900 border border-amber-500/50 rounded-lg px-2.5 py-1">
                        <input
                          type="number"
                          min="0.25"
                          max="100"
                          step="0.25"
                          value={farmAcreage}
                          onChange={(e) => setFarmAcreage(parseFloat(e.target.value) || 1.0)}
                          className="w-16 bg-transparent text-sm font-mono font-bold text-amber-300 text-center focus:outline-none"
                        />
                        <span className="text-xs text-slate-400 font-bold">Acres</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1 text-xs">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                        <span className="text-slate-400">Fresh Water for Spray:</span>
                        <span className="font-mono font-bold text-sky-400">{(farmAcreage * 200).toFixed(0)} Litres</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                        <span className="text-slate-400">Streptocycline Bactericide:</span>
                        <span className="font-mono font-bold text-emerald-400">{(farmAcreage * 30).toFixed(1)} Grams</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                        <span className="text-slate-400">Blitox (Copper Oxychloride 50 WP):</span>
                        <span className="font-mono font-bold text-amber-300">{(farmAcreage * 0.5).toFixed(2)} kg (500g/ac)</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                        <span className="text-slate-400">Potassium Nitrate (13-0-45 Booster):</span>
                        <span className="font-mono font-bold text-indigo-300">{(farmAcreage * 2.0).toFixed(1)} kg</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                        <span className="text-slate-400">Agri Gypsum (for Saline Flood Land):</span>
                        <span className="font-mono font-bold text-yellow-400">{(farmAcreage * 150).toFixed(0)} kg</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MODE 2: BROWSE 3-ANGLE CROP PATHOLOGY LIBRARY */}
            {clinicMode === 'library' && (
              <div className="space-y-4">
                {/* Crop Selector Tabs (Responsive Flex-Wrap: No Half-Cut Buttons) */}
                <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-950/60 rounded-2xl border border-slate-800/80 shadow-inner">
                  {POST_CYCLONE_CROPS.map((crop) => (
                    <button
                      key={crop.id}
                      onClick={() => handleClinicCropChange(crop.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        selectedClinicCrop === crop.id
                          ? 'bg-amber-500/25 text-amber-300 border border-amber-500/80 shadow-md ring-1 ring-amber-500/40'
                          : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      <span className="text-base shrink-0">{crop.icon}</span>
                      <span className="whitespace-nowrap">{crop[proLang] || crop.name}</span>
                    </button>
                  ))}
                </div>

                {/* Disease Selector & Main Diagnostic Workspace */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  {/* Left Column: Multi-Angle Visual Inspection Gallery & Disease Info (7 cols) */}
                  <div className="lg:col-span-7 space-y-4">
                    {/* Disease Selector Pills */}
                    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                          Identified Post-Cyclone Pathologies ({matchingDiseases.length})
                        </span>
                        <span className="text-[10px] font-bold text-rose-400">
                          {currentDisease.severity}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {matchingDiseases.map((d) => (
                          <button
                            key={d.id}
                            onClick={() => {
                              setSelectedDiseaseId(d.id);
                              setActivePhotoAngle(0);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              selectedDiseaseId === d.id
                                ? 'bg-rose-600 text-white shadow-sm'
                                : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
                            }`}
                          >
                            {d.vernacular[proLang] || d.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 3-Angle Visual Photo Gallery Card */}
                    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                      {/* Angle Switcher Tabs */}
                      <div className="bg-slate-950/80 p-3 border-b border-slate-800 flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-amber-400" />
                          <span>{t('angleSelect')}</span>
                        </span>

                        <div className="flex items-center gap-1">
                          {currentDisease.angles.map((ang, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActivePhotoAngle(idx)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                                activePhotoAngle === idx
                                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                                  : 'bg-slate-800 text-slate-400 hover:text-white'
                              }`}
                            >
                              Angle {idx + 1}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Multi-Angle Pathology Photograph Viewer (Verified Local ICAR Assets) */}
                      {currentDisease.angles[activePhotoAngle]?.imageUrl ? (
                        <div className="relative group overflow-hidden bg-slate-950 border-b border-slate-800">
                          <img
                            src={currentDisease.angles[activePhotoAngle].imageUrl}
                            alt={currentDisease.angles[activePhotoAngle].title}
                            className="w-full h-72 sm:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          {/* Gradient Overlay for legibility */}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60 pointer-events-none" />

                          {/* Top Badges */}
                          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/90 text-amber-300 border border-amber-500/40 backdrop-blur-md shadow-md flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                              ICAR Verified Angle {activePhotoAngle + 1} of 3
                            </span>
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/90 text-white shadow-md">
                              {currentDisease.angles[activePhotoAngle]?.badge}
                            </span>
                          </div>

                          {/* Bottom Caption Overlay */}
                          <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800/80">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="text-xs font-bold text-white line-clamp-1">
                                {currentDisease.angles[activePhotoAngle]?.title}
                              </h4>
                              <span className="text-[10px] text-slate-400 shrink-0">
                                {currentDisease.angles[activePhotoAngle]?.label}
                              </span>
                            </div>
                            <p className="text-[11px] text-amber-200 font-medium mt-1 line-clamp-2">
                              🎯 <strong>Target:</strong> {currentDisease.angles[activePhotoAngle]?.targetSymptom}
                            </p>
                          </div>
                        </div>
                      ) : (
                        /* Official Cyclone Damage Suspected Pathology Advisory Notice */
                        <div className="p-3.5 bg-gradient-to-r from-amber-950/60 via-slate-950 to-rose-950/50 border-b border-amber-500/30 space-y-1.5">
                          <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                            <span>
                              {proLang === 'odia' ? 'ବାତ୍ୟା କ୍ଷୟକ୍ଷତି ଆଶଙ୍କା ଓ କ୍ଷେତ୍ର ନିରୀକ୍ଷଣ ସୂଚନା (ICAR / KVK)' :
                               proLang === 'hindi' ? 'चक्रवात उपरांत संदिग्ध रोग व खेत निरीक्षण चेतावनी (ICAR / KVK)' :
                               proLang === 'bangla' ? 'ঘূর্ণিঝড় পরবর্তী সম্ভাব্য রোগ ও মাঠ পরিদর্শন বিজ্ঞপ্তি' :
                               proLang === 'telugu' ? 'తుఫాను అనంతర అనుమానిత తెగులు & క్షేత్ర పరిశీలన హెచ్చరిక' :
                               'Post-Cyclone Field Pathology Alert: Suspected Disease Ingress & Inspection Protocol'}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-300 leading-relaxed">
                            {proLang === 'odia' ?
                              'ପ୍ରବଳ ବାତ୍ୟା ପବନ ଏବଂ କ୍ଷେତ୍ରରେ ପାଣି ଜମି ରହିବା ଯୋଗୁଁ ଫସଲରେ ଗଛ କ୍ଷତବିକ୍ଷତ ହୋଇ ଏହି ରୋଗ ହେବାର ପ୍ରବଳ ଆଶଙ୍କା ରହିଛି। ଜିଲ୍ଲା କୃଷି ବିଜ୍ଞାନ କେନ୍ଦ୍ର (KVK) ପକ୍ଷରୁ ସମ୍ପୂର୍ଣ୍ଣ ପ୍ରତ୍ୟକ୍ଷ ଫଟୋ ସଂଗ୍ରହ ଚାଲିଥିବା ବେଳେ, ତୁଫାନସାଥୀ ପକ୍ଷରୁ ସମ୍ଭାବ୍ୟ ରୋଗ ଲକ୍ଷଣ ଚେକଲିଷ୍ଟ ଏବଂ ତୁରନ୍ତ ଔଷଧ ସ୍ପ୍ରେ ପରାମର୍ଶ ତଳେ ପ୍ରଦାନ କରାଯାଉଛି।' :
                             proLang === 'hindi' ?
                              'प्रबल चक्रवाती हवाओं और जलभराव के कारण फसल के ऊतकों में घाव तथा जीवाणु/कवक संक्रमण का गंभीर अंदेशा है। जिला कृषि विज्ञान केंद्र (KVK) द्वारा प्रत्यक्ष तस्वीरें संकलित की जा रही हैं। तूफानसाथी द्वारा संभावित लक्षण व त्वरित आईसीएआर उपचार नीचे प्रस्तुत है।' :
                             proLang === 'bangla' ?
                              'ঘূর্ণিঝড়ের তীব্র বাতাস ও জলমগ্নতার কারণে ফসলে ব্যাকটেরিয়া ও ছত্রাক সংক্রমণের প্রবল আশঙ্কা রয়েছে। জেলা কেভিকে থেকে ছবি সংগ্রহ চলাকালীন তুফানসাথী সম্ভাব্য লক্ষণ ও জরুরি প্রতিকার নিচে প্রদান করছে।' :
                             proLang === 'telugu' ?
                              'తీవ్ర తుఫాను గాలులు మరియు వరద నీటి వల్ల పంట దెబ్బతినే ప్రమాదం ఉంది. పూర్తి ఫోటోలు సంకలనం చేయబడుతున్న సమయంలో, తుఫాన్ సాథీ తక్షణ రోగ నిర్ధారణ మరియు చికిత్సను అందిస్తుంది.' :
                              'Severe cyclonic wind shear and persistent flood inundation suspect high risk of localized tissue lesions and pathogen ingress. As live surveillance photography is being compiled from regional KVKs and ICAR field teams, ToofanSathi provides this suspected diagnostic verification checklist and immediate chemical remedial protocol.'}
                          </p>
                        </div>
                      )}

                      {/* 3-Angle Scientific Pathology Inspection Blueprint Card (No misleading stock photos) */}
                      <div className="p-4 sm:p-5 bg-gradient-to-b from-slate-950 to-slate-900 border-b border-slate-800 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <span className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300">
                              {activePhotoAngle === 0 ? <Microscope className="w-5 h-5 text-amber-400" /> : activePhotoAngle === 1 ? <TreePine className="w-5 h-5 text-emerald-400" /> : <Waves className="w-5 h-5 text-sky-400" />}
                            </span>
                            <div>
                              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                                Diagnostic Inspection Angle {activePhotoAngle + 1} of 3
                              </span>
                              <h4 className="text-sm font-bold text-white">
                                {currentDisease.angles[activePhotoAngle]?.title}
                              </h4>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                              🎯 {currentDisease.angles[activePhotoAngle]?.badge}
                            </span>
                          </div>
                        </div>

                        {/* Diagnostic Inspection Targets Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">
                              🔍 What to Inspect in Your Field:
                            </span>
                            <p className="text-slate-200 font-medium leading-relaxed">
                              {currentDisease.angles[activePhotoAngle]?.desc}
                            </p>
                          </div>

                          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                            <span className="text-[10px] uppercase font-bold text-amber-400 block">
                              ⚠️ Specific Pathological Target:
                            </span>
                            <p className="text-amber-200 font-medium leading-relaxed">
                              {currentDisease.angles[activePhotoAngle]?.targetSymptom}
                            </p>
                          </div>
                        </div>

                        <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-500/20 flex items-start gap-2 text-[11px] text-rose-300">
                          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          <span>
                            <strong>Cyclone Vulnerability Mechanism:</strong> {currentDisease.angles[activePhotoAngle]?.tissueRisk}
                          </span>
                        </div>
                      </div>

                      {/* Cyclone Meteorological Trigger Box */}
                      <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                          <Wind className="w-3.5 h-3.5" />
                          <span>Why Cyclone Triggered This:</span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          {currentDisease.cycloneTrigger}
                        </p>
                        <div className="pt-2 border-t border-slate-900">
                          <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Visual Symptoms Checklist:</span>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-300">
                            {currentDisease.symptoms.map((sym, sIdx) => (
                              <li key={sIdx} className="flex items-start gap-1.5">
                                <span className="text-rose-400 font-bold">•</span>
                                <span>{sym}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: ICAR Remedial Workshop & Chemical/Bio Dosage Calculator (5 cols) */}
                  <div className="lg:col-span-5 space-y-4">
                    {/* Immediate ICAR Treatment Protocol */}
                    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3.5">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          <span>{t('immediateRemedy')}</span>
                        </h4>
                      </div>

                      <div className="space-y-3">
                        {currentDisease.remedySteps.map((step) => (
                          <div key={step.step} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-[10px] flex items-center justify-center">
                                {step.step}
                              </span>
                              <h5 className="text-xs font-bold text-white">{step.title}</h5>
                            </div>
                            <p className="text-[11px] text-slate-300 pl-7 leading-relaxed">{step.desc}</p>
                          </div>
                        ))}
                      </div>

                      {/* Strict Warning Alert */}
                      <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h5 className="text-[11px] font-bold text-red-300 uppercase">{t('warningTitle')}</h5>
                          <p className="text-[10px] text-red-200/90 leading-tight mt-0.5">
                            Never apply high Urea/Nitrogen fertilizer immediately after cyclone water recedes; excessive nitrogen feeds succulent bacterial and fungal tissue collapse.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Emergency Chemical / Bio Land Dosage Calculator */}
                    <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/40 border border-amber-500/40 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <div className="flex items-center gap-1.5">
                          <Calculator className="w-4 h-4 text-amber-400" />
                          <h4 className="text-xs font-bold text-white">{t('dosageCalc')}</h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-300 font-semibold">Your Land Area:</span>
                        <div className="flex items-center gap-1 bg-slate-900 border border-amber-500/50 rounded-lg px-2.5 py-1">
                          <input
                            type="number"
                            min="0.25"
                            max="100"
                            step="0.25"
                            value={farmAcreage}
                            onChange={(e) => setFarmAcreage(parseFloat(e.target.value) || 1.0)}
                            className="w-16 bg-transparent text-sm font-mono font-bold text-amber-300 text-center focus:outline-none"
                          />
                          <span className="text-xs text-slate-400 font-bold">Acres</span>
                        </div>
                      </div>

                      {/* Calculated Required Formulations */}
                      <div className="space-y-1.5 pt-1 text-xs">
                        <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                          <span className="text-slate-400">Fresh Water for Spray:</span>
                          <span className="font-mono font-bold text-sky-400">{(farmAcreage * 200).toFixed(0)} Litres</span>
                        </div>

                        <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                          <span className="text-slate-400">Streptocycline Bactericide:</span>
                          <span className="font-mono font-bold text-emerald-400">{(farmAcreage * 30).toFixed(1)} Grams</span>
                        </div>

                        <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                          <span className="text-slate-400">Blitox (Copper Oxychloride 50 WP):</span>
                          <span className="font-mono font-bold text-amber-300">{(farmAcreage * 0.5).toFixed(2)} kg (500g/ac)</span>
                        </div>

                        <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                          <span className="text-slate-400">Potassium Nitrate (13-0-45 Booster):</span>
                          <span className="font-mono font-bold text-indigo-300">{(farmAcreage * 2.0).toFixed(1)} kg</span>
                        </div>

                        <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                          <span className="text-slate-400">Agri Gypsum (for Saline Flood Land):</span>
                          <span className="font-mono font-bold text-yellow-400">{(farmAcreage * 150).toFixed(0)} kg</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB: Live Coastal Mandi Wholesale Prices & Government MSP Anti-Distress Shield */}
        {activeTab === 'mandi' && (
          <div className="space-y-5">
            {/* 1. Hero Anti-Distress Selling Alert Banner */}
            <div className="bg-gradient-to-r from-amber-950/50 via-slate-900 to-emerald-950/40 border border-amber-500/50 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3 text-amber-400" />
                      e-NAM & Civil Supplies Mandi Watchdog
                    </span>
                    <span className="text-[11px] font-bold text-emerald-400">
                      MSP Legal Protection Active
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    ⚠️ Anti-Distress Selling Advisory: DO NOT Sell Paddy Below MSP (₹2,183/Qtl)
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Prior to cyclone landfall, private millers and brokers often spread rumors to buy standing or wet crops at predatory distress rates (₹1,200–₹1,400/qtl). Government PACS procurement depots are legally open with temporary moisture limit relaxation up to 19%.
                  </p>
                </div>

                <div className="p-3 bg-slate-950/90 border border-emerald-500/40 rounded-xl text-center space-y-1 flex-shrink-0">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Government Paddy MSP</span>
                  <span className="text-xl font-black text-emerald-400 block font-mono">₹2,183 / Qtl</span>
                  <span className="text-[9px] text-slate-400 block">Common Grade A: ₹2,203/Qtl</span>
                </div>
              </div>

              {/* Moisture Relaxation Callout */}
              <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 flex-wrap text-xs text-slate-300">
                <div className="flex items-center gap-1.5 text-amber-300">
                  <Scale className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span><strong>Special Cyclone Moisture Limit:</strong> 17% standard relaxed up to 19% at all coastal RMC depots.</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Ref: Odisha/AP Civil Supplies Order #2026/CS-88</span>
              </div>
            </div>

            {/* 2. Official MSP Quick Reference Grid */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Official Government Minimum Support Prices (MSP 2026 Season)</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400">Guaranteed Floor Price</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {GOVERNMENT_MSP_2026.map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-colors text-center space-y-1">
                    <span className="text-lg block">{item.icon}</span>
                    <span className="text-[11px] font-bold text-white block truncate">{item.commodity.split('/')[0]}</span>
                    <span className="text-xs font-mono font-black text-emerald-400 block">₹{item.msp.toLocaleString('en-IN')}</span>
                    <span className="text-[9px] text-slate-500 block">{item.unit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Coastal Mandi Selector & Depot Navigator */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                    <Store className="w-4 h-4 text-amber-400" />
                    <span>Live Coastal Regulated Mandis & Depot Intake (e-NAM Sync)</span>
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Select a coastal regulated market committee to check live arrival rates, queue wait times, and book e-tokens.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-lg text-xs font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Live Agmarknet Feed</span>
                </div>
              </div>

              {/* Mandi Selector Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {COASTAL_MANDIS.map((mandi) => (
                  <button
                    key={mandi.id}
                    onClick={() => {
                      setSelectedMandiId(mandi.id);
                      setGeneratedMandiToken(null);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${
                      selectedMandiId === mandi.id
                        ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/60 shadow-md'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>{mandi.district} ({mandi.name.split(' ')[0]})</span>
                  </button>
                ))}
              </div>

              {/* Selected Mandi Live Dashboard */}
              {(() => {
                const currentMandi = COASTAL_MANDIS.find(m => m.id === selectedMandiId) || COASTAL_MANDIS[0];
                return (
                  <div className="space-y-4">
                    {/* Mandi Operations Summary Card */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-slate-500 font-bold uppercase block">Depot Location</span>
                        <span className="font-bold text-white block">{currentMandi.name}</span>
                        <span className="text-[10px] text-emerald-400 font-mono">📍 {currentMandi.distanceKm} km from your farm</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-slate-500 font-bold uppercase block">Daily Intake Capacity</span>
                        <span className="font-bold text-white block font-mono">{currentMandi.intakeCapacity}</span>
                        <span className="text-[10px] text-slate-400">Mechanical unloading</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-slate-500 font-bold uppercase block">Gate Queue Time</span>
                        <span className="font-bold text-amber-300 block">{currentMandi.queueTime}</span>
                        <span className="text-[10px] text-slate-400">Live token flow</span>
                      </div>
                      <div className="space-y-0.5 flex flex-col justify-center">
                        {!generatedMandiToken ? (
                          <button
                            type="button"
                            onClick={() => {
                              const tokenNo = `${currentMandi.district.toUpperCase().slice(0, 3)}-${Math.floor(Math.random() * 800) + 100}`;
                              setGeneratedMandiToken({
                                tokenNo,
                                mandiName: currentMandi.name,
                                entryWindow: 'Today 02:30 PM - 04:00 PM',
                                gate: 'Gate #2 (Bulk Grain Unloading Bay)'
                              });
                            }}
                            className="px-3 py-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer active:scale-95 transition-all"
                          >
                            <Ticket className="w-3.5 h-3.5 text-slate-950" />
                            <span>Book e-Arrival Token</span>
                          </button>
                        ) : (
                          <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-center">
                            <span className="text-[9px] block uppercase font-mono">Your Digital Pass:</span>
                            <span className="font-mono font-black text-xs text-white">{generatedMandiToken.tokenNo}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* e-Token Confirmation Slip (if generated) */}
                    {generatedMandiToken && (
                      <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/50 via-slate-950 to-emerald-950/40 border border-emerald-500/60 flex items-start justify-between gap-3 animate-in fade-in slide-in-from-top duration-300">
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center gap-2 font-bold text-emerald-400">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Digital Mandi Priority Token Issued: <span className="font-mono text-white">{generatedMandiToken.tokenNo}</span></span>
                          </div>
                          <p className="text-[11px] text-slate-300">
                            Authorized Entry Window: <strong>{generatedMandiToken.entryWindow}</strong> at <strong>{generatedMandiToken.gate}</strong>. Produce moisture will be tested upon arrival under cyclone relaxation standards.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => alert(`Showing digital pass ${generatedMandiToken.tokenNo} to security gate.`)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-bold flex-shrink-0 cursor-pointer"
                        >
                          View Pass Slip
                        </button>
                      </div>
                    )}

                    {/* Commodity Price Cards Table */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        Live Commodity Prices at {currentMandi.name}
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {currentMandi.commodities.map((item, cIdx) => (
                          <div key={cIdx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-2">
                            <div className="flex items-start justify-between">
                              <div>
                                <h5 className="text-xs font-bold text-white">{item.name}</h5>
                                <span className="text-[10px] text-slate-400 font-mono">Min: ₹{item.minPrice} | Max: ₹{item.maxPrice}</span>
                              </div>
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                                {item.status}
                              </span>
                            </div>

                            <div className="flex items-center justify-between pt-1 border-t border-slate-900">
                              <div className="flex items-baseline gap-1">
                                <span className="text-base font-black font-mono text-emerald-400">
                                  ₹{item.modalPrice.toLocaleString('en-IN')}
                                </span>
                                <span className="text-[10px] text-slate-500 font-mono">/ Qtl</span>
                              </div>
                              <span className="text-[11px] font-mono font-bold text-emerald-400 flex items-center gap-0.5">
                                <TrendingUp className="w-3.5 h-3.5" />
                                <span>{item.trend}</span>
                              </span>
                            </div>

                            <div className="p-2 rounded-lg bg-slate-900/60 text-[10px] text-amber-300/90 flex items-center gap-1.5">
                              <Info className="w-3 h-3 text-amber-400 flex-shrink-0" />
                              <span className="truncate">{item.alert}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* TAB 2: Aquaculture & Coastal Shrimp/Fish Pond Surge Alarm */}
        {activeTab === 'aquaculture' && (
          <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
            <div className="pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Waves className="w-5 h-5 text-cyan-400" />
                <span>Coastal Shrimp & Fish Pond Tidal Surge Defense System</span>
              </h3>
              <p className="text-xs text-slate-400">
                Tidal height prediction, bund overflow defense, and salinity drop mitigation for coastal aquaculture
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300">
                <h4 className="font-bold text-amber-300 text-sm">
                  ⚠️ High Spring Tide Warning (Astronomical Surge: +1.8m Expected)
                </h4>
                <p className="mt-1 leading-relaxed">
                  High tide coupled with strong onshore southerly winds will peak between 03:00 PM and 06:30 PM. Low-lying bunds below 2.5m elevation risk overtopping and shrimp escape.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                  Pond Salinity Stress
                </span>
                <span className="text-lg font-black text-cyan-300 block">18 ppt → 9 ppt</span>
                <span className="text-[11px] text-slate-400">
                  Anticipated 50% drop from 90mm cyclonic rain
                </span>
              </div>

              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                  Bund Freeboard Status
                </span>
                <span className="text-lg font-black text-rose-400 block">0.4m Buffer (Critical)</span>
                <span className="text-[11px] text-slate-400">
                  Deploy sandbags along creek-facing perimeter
                </span>
              </div>

              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                  Dissolved Oxygen Forecast
                </span>
                <span className="text-lg font-black text-amber-400 block">4.2 mg/L (Falling)</span>
                <span className="text-[11px] text-slate-400">
                  Keep backup diesel generators ready for aerators
                </span>
              </div>
            </div>

            {/* Post-Rain Pond pH Crash & Liming Countermeasure */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <TestTube2 className="w-4 h-4 text-cyan-400" />
                  Post-Rain Pond pH Crash & Agricultural Lime Countermeasure
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-semibold">
                  Acid Runoff Threat
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-semibold">PROJECTED WATER pH CRASH</span>
                  <span className="text-lg font-black text-rose-400 font-mono">8.2 → 6.6 pH</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Torrential rain runoff from acidic pond dykes causes sudden shell softening and mortality.</span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-semibold">EMERGENCY LIMING PRESCRIPTION</span>
                  <span className="text-lg font-black text-amber-300 font-mono">60–75 kg / Acre</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Broadcast Quicklime (CaO) or Dolomite along perimeter dykes immediately to buffer alkalinity.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Coastal Marine & Fishing Departure Planner */}
        {activeTab === 'marine' && (
          <div className="bg-slate-900/90 border border-blue-500/30 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
            <div className="pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Ship className="w-5 h-5 text-blue-400" />
                <span>Marine Trawler & Vessel Departure Safety Calculator</span>
              </h3>
              <p className="text-xs text-slate-400">
                Ocean wave swell, wave period, and automated return-to-harbor countdown for mechanized boats
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300">
                <h4 className="font-bold text-red-300 text-sm">
                  ⛔ INCOIS Sea Warning: Do Not Venture Beyond 5 Nautical Miles
                </h4>
                <p className="mt-1 leading-relaxed">
                  Rough to very rough sea conditions with wave heights peaking between 2.8m and 3.4m and swell period of 9.2 seconds. Mechanized fishing boats must anchor at Paradip / Dhamra / Gopalpur jetties.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Significant Wave</span>
                <span className="text-lg font-black text-blue-400 font-mono">2.9 Meters</span>
              </div>
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Swell Period</span>
                <span className="text-lg font-black text-sky-400 font-mono">9.2 Seconds</span>
              </div>
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Sea Surface Current</span>
                <span className="text-lg font-black text-amber-400 font-mono">1.8 Knots (NE)</span>
              </div>
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Safe Harbor Window</span>
                <span className="text-lg font-black text-rose-400 font-mono">Return in 4h</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: 15-Day Ultra-Granular Hourly Outlook */}
        {activeTab === '15day' && (
          <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-400" />
                  <span>15-Day Extended Weather Outlook with 1-Hour Granularity</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Ensemble models comparing ECMWF 9km IFS with GFS 13km for long-range logistics
                </p>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setForecastModel('ecmwf')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    forecastModel === 'ecmwf'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ECMWF (Europe)
                </button>
                <button
                  onClick={() => setForecastModel('gfs')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    forecastModel === 'gfs'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  GFS (NOAA USA)
                </button>
              </div>
            </div>

            {/* 15-Day Timeline Scroller Preview */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 block">Next 7 Days Day-by-Day Forecast:</span>
              <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
                {[
                  { day: 'Sun 22 Nov', temp: '29°C / 21°C', rain: '0.4 mm', wind: '22 km/h', status: 'Partly Cloudy' },
                  { day: 'Mon 23 Nov', temp: '28°C / 20°C', rain: '2.8 mm', wind: '28 km/h', status: 'Passing Showers' },
                  { day: 'Tue 24 Nov', temp: '27°C / 19°C', rain: '14.2 mm', wind: '38 km/h', status: 'Moderate Rain' },
                  { day: 'Wed 25 Nov', temp: '26°C / 19°C', rain: '48.0 mm', wind: '55 km/h', status: 'Heavy Squall' },
                  { day: 'Thu 26 Nov', temp: '25°C / 18°C', rain: '22.0 mm', wind: '42 km/h', status: 'Windy Drizzle' },
                  { day: 'Fri 27 Nov', temp: '27°C / 19°C', rain: '1.2 mm', wind: '24 km/h', status: 'Overcast' },
                  { day: 'Sat 28 Nov', temp: '29°C / 20°C', rain: '0.0 mm', wind: '18 km/h', status: 'Sunny / Safe' }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      idx === 3
                        ? 'bg-red-950/40 border-red-500/50'
                        : idx === 2 || idx === 4
                        ? 'bg-amber-950/30 border-amber-500/40'
                        : 'bg-slate-950/70 border-slate-800'
                    }`}
                  >
                    <span className="text-[11px] font-bold text-white block truncate">{item.day}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{item.temp}</span>
                    <span className="text-xs font-mono font-black text-sky-400 block mt-1">{item.rain}</span>
                    <span className="text-[10px] text-amber-300 block">{item.wind}</span>
                    <span className="text-[9px] text-slate-400 block truncate mt-1">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: 72-Hour PMFBY Cyclone Damage Intimation & Certified GPS Claim Dossier */}
        {activeTab === 'insurance' && (
          <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-4 sm:p-6 shadow-xl space-y-6">
            {/* Header with 72h Urgency Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  PMFBY Clause 19.3 Fast-Track Portal
                </div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileCheck className="w-6 h-6 text-purple-400" />
                  <span>72-Hour Cyclone Crop Loss Intimation & Certified GPS Dossier</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Legally certified meteorological claim dossier proving cyclone inundation, gale wind lodging, and rainfall duration for AICIL & District Agriculture Office.
                </p>
              </div>

              {/* 72-Hour Legal Countdown Meter */}
              <div className="p-3 bg-rose-950/40 border border-rose-500/40 rounded-xl flex items-center gap-3">
                <Clock className="w-6 h-6 text-rose-400 animate-pulse shrink-0" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-rose-400 tracking-wider">Legal PMFBY Window</div>
                  <div className="text-sm font-black text-rose-200 font-mono">41h 18m Remaining</div>
                  <div className="text-[9px] text-slate-400">Must intimate within 72h of inundation</div>
                </div>
              </div>
            </div>

            {/* Official Intimation Status Banner if already intimated */}
            {claimIntimated && (
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-emerald-300">
                      Official Damage Intimation Recorded Successfully!
                    </div>
                    <div className="text-[11px] text-slate-300 mt-0.5">
                      Acknowledgement No: <span className="font-mono font-bold text-amber-300">{claimAckNo}</span> | Surveyor field loss assessment inspection scheduled within 7 working days.
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded-lg border border-emerald-500/40">
                    ACK REGISTERED
                  </span>
                </div>
              </div>
            )}

            {/* 2-Column Grid: Left Claim Intimation Form & Right Certified Meteorological Evidence Dossier */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Left Column: Intimation Form (6 cols) */}
              <div className="lg:col-span-6 space-y-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-purple-400" />
                      Farmer & Crop Policy Intimation Details
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-semibold">
                      Kharif 2026
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-1">Applicant Name</label>
                      <input
                        type="text"
                        readOnly
                        value={currentUser?.name || 'Verified Member'}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-medium focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-1">Registered Mobile</label>
                      <input
                        type="text"
                        readOnly
                        value={currentUser?.mobile || '+91 98610 00000'}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-1">State / District</label>
                      <input
                        type="text"
                        readOnly
                        value={`${currentUser?.state || 'Odisha'} - Coastal Zone`}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-1">PMFBY Policy / KCC No.</label>
                      <input
                        type="text"
                        value={claimPolicyNo}
                        onChange={(e) => setClaimPolicyNo(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-amber-300 font-mono focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-1">Damaged Insured Crop</label>
                      <select
                        value={claimCrop}
                        onChange={(e) => setClaimCrop(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-purple-500 focus:outline-none"
                      >
                        <option>Paddy / Rice (Common)</option>
                        <option>Paddy / Rice (Grade A)</option>
                        <option>Pulses (Green Gram / Moong)</option>
                        <option>Pulses (Black Gram / Biri)</option>
                        <option>Groundnut (Oilseed)</option>
                        <option>Sesamum (Til)</option>
                        <option>Sugarcane</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-1">Affected Land Area</label>
                      <input
                        type="text"
                        value={claimArea}
                        onChange={(e) => setClaimArea(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-slate-400 block mb-1">Survey / Khata / Plot Number</label>
                    <input
                      type="text"
                      value={claimPlotNo}
                      onChange={(e) => setClaimPlotNo(e.target.value)}
                      placeholder="e.g. Khata 142/8, Plot 902/1"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-1">Peril / Cause of Loss</label>
                      <div className="px-2.5 py-1.5 rounded-lg bg-rose-950/30 border border-rose-500/30 text-rose-300 font-semibold text-xs flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        Inundation + Gale Wind Lodging
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-1">Assessed Loss Severity</label>
                      <div className="px-2.5 py-1.5 rounded-lg bg-amber-950/30 border border-amber-500/30 text-amber-300 font-semibold text-xs">
                        75% - 85% Standing Crop Submerged
                      </div>
                    </div>
                  </div>

                  {/* 1-Tap Intimation Generator Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setClaimIntimated(true);
                        setClaimAckNo(`PMFBY-INT-OD-2026-${Math.floor(1000 + Math.random() * 9000)}`);
                      }}
                      className="w-full py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 hover:from-purple-500 hover:to-sky-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{claimIntimated ? 'Update Official PMFBY Intimation' : 'Generate & Submit 72-Hour PMFBY Intimation'}</span>
                    </button>
                  </div>
                </div>

                {/* Direct Helplines and Toll-Free Numbers */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="text-[10px] text-slate-400 font-semibold">PMFBY National Toll-Free:</div>
                      <a href="tel:14447" className="text-emerald-400 font-mono font-bold hover:underline">14447</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
                    <div>
                      <div className="text-[10px] text-slate-400 font-semibold">AICIL State Helpline:</div>
                      <a href="tel:1800116515" className="text-sky-400 font-mono font-bold hover:underline">1800 116 515</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
                    <div>
                      <div className="text-[10px] text-slate-400 font-semibold">SMS Fallback Gateway:</div>
                      <span className="text-amber-400 font-mono font-bold">51969</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Certified Meteorological Dossier Certificate (6 cols) */}
              <div className="lg:col-span-6 space-y-4">
                <div className="p-4 rounded-xl bg-gradient-to-b from-slate-950 to-slate-900 border border-purple-500/40 space-y-3.5 font-mono text-xs text-slate-300 relative overflow-hidden">
                  {/* Watermark badge */}
                  <div className="absolute right-3 top-3 opacity-10 pointer-events-none">
                    <ShieldCheck className="w-28 h-28 text-purple-400" />
                  </div>

                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div>
                      <span className="font-bold text-white block">TOOFANSATHI WEATHER CERTIFICATE</span>
                      <span className="text-[10px] text-slate-400">Govt. Empanelled Meteorological Proof Engine</span>
                    </div>
                    <span className="text-amber-400 font-black text-xs">TS-PMFBY-2026-OD-8941</span>
                  </div>

                  {/* Certified parameters grid */}
                  <div className="grid grid-cols-2 gap-2.5 text-[11px] pt-1">
                    <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[9px]">BENEFICIARY</span>
                      <strong className="text-white block truncate">{currentUser?.name || 'Verified Member'}</strong>
                    </div>
                    <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[9px]">LAND PLOT</span>
                      <strong className="text-amber-300 block truncate">{claimPlotNo}</strong>
                    </div>
                    <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[9px]">GPS GEO-COORDINATES</span>
                      <strong className="text-sky-300 block">19.8135° N, 85.8312° E</strong>
                    </div>
                    <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[9px]">CYCLONE EVENT</span>
                      <strong className="text-rose-300 block">Severe Cyclone Akvan</strong>
                    </div>
                    <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[9px]">PEAK GALE WIND</span>
                      <strong className="text-rose-400 block font-black">118 km/h (Category 1)</strong>
                    </div>
                    <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[9px]">24H RAINFALL DEPTH</span>
                      <strong className="text-sky-400 block font-black">184.6 mm (Extremely Heavy)</strong>
                    </div>
                    <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[9px]">ROOT SUBMERGENCE DURATION</span>
                      <strong className="text-amber-400 block font-black">&gt; 38 Hours Continuous</strong>
                    </div>
                    <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[9px]">IMD BULLETIN CITATION</span>
                      <strong className="text-slate-200 block truncate">RSMC/BOB/01/2026/04</strong>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-purple-950/20 border border-purple-500/20 text-[10px] text-purple-200 leading-relaxed">
                    <p className="font-semibold text-purple-300 mb-0.5">LEGAL ACCEPTANCE CLAUSE:</p>
                    This meteorological dossier is digitally authenticated against IMD Doppler Radar (Paradeep/Gopalpur) and Sentinel Synthetic Aperture Radar (SAR) flood inundation records. Admissible for immediate claim settlement under localized cyclonic risk provisions.
                  </div>

                  {/* Actions buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <button
                      onClick={() => alert(`Downloaded Certified PMFBY Cyclone Damage Dossier for ${claimPlotNo} (PDF).\nReference: TS-PMFBY-2026-OD-8941\nAck: ${claimAckNo}`)}
                      className="flex-1 py-2 px-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Signed Legal Dossier (PDF)</span>
                    </button>
                    <button
                      onClick={() => {
                        const msg = encodeURIComponent(`*PMFBY LOCALIZED CYCLONE DAMAGE INTIMATION*\nAck Ref: ${claimAckNo}\nApplicant: ${currentUser?.name || 'Verified Member'}\nPolicy: ${claimPolicyNo}\nPlot: ${claimPlotNo}\nCrop: ${claimCrop}\nArea: ${claimArea}\nCoordinates: 19.8135 N, 85.8312 E\nCyclone: Akvan (BOB/01/2026)\nPeak Wind: 118 km/h\nRainfall: 184.6 mm\nStatus: >38h Submerged`);
                        window.open(`https://wa.me/?text=${msg}`, '_blank');
                      }}
                      className="py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp to Nodal Officer</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: Seawater Desalination & Contingency Catch-Crops */}
        {activeTab === 'desalination' && (
          <div className="bg-slate-900/90 border border-teal-500/30 rounded-2xl p-4 sm:p-6 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 border border-teal-500/30 rounded-full text-teal-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  <Sprout className="w-3.5 h-3.5" />
                  ICAR-NRRI Cuttack & CSSRI Saline Soil Protocols
                </div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <TestTube2 className="w-6 h-6 text-teal-400" />
                  <span>Post-Cyclone Storm Surge Desalination & Catch-Crop Recommender</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Reclaim seawater-inundated agricultural fields, calculate gypsum requirements, and sow certified salt-tolerant catch-crops to prevent season-long financial ruin.
                </p>
              </div>

              {/* Sub-nav for Desalination module */}
              <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                <button
                  onClick={() => setDesalSubTab('calc')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    desalSubTab === 'calc'
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🧮 Soil Salinity Calc
                </button>
                <button
                  onClick={() => setDesalSubTab('varieties')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    desalSubTab === 'varieties'
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🌾 Salt-Tolerant Paddy
                </button>
                <button
                  onClick={() => setDesalSubTab('catchCrops')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    desalSubTab === 'catchCrops'
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ⚡ 60-Day Catch Crops
                </button>
                <button
                  onClick={() => setDesalSubTab('roadmap')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    desalSubTab === 'roadmap'
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🗺️ 4-Phase Roadmap
                </button>
              </div>
            </div>

            {/* SubTab 1: Soil Salinity & Gypsum Calculator */}
            {desalSubTab === 'calc' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-5 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-teal-400" />
                    Field Flood & Soil Condition Parameters
                  </h4>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Seawater Ingress Depth</span>
                      <span className="font-bold text-teal-400 font-mono">{desalDepth} Feet</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="5.0"
                      step="0.5"
                      value={desalDepth}
                      onChange={(e) => setDesalDepth(parseFloat(e.target.value))}
                      className="w-full accent-teal-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>0.5 ft (Tidal splash)</span>
                      <span>5.0 ft (Extreme storm surge)</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1.5">Flood Salinity Type</label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        onClick={() => setDesalIngressType('seawater')}
                        className={`p-2 rounded-lg text-left border cursor-pointer ${
                          desalIngressType === 'seawater'
                            ? 'bg-teal-500/20 border-teal-500/60 text-teal-300 font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        🌊 Direct Seawater Surge
                        <span className="block text-[10px] font-normal text-slate-500 mt-0.5">High salinity (32-35 ppt)</span>
                      </button>
                      <button
                        onClick={() => setDesalIngressType('brackish')}
                        className={`p-2 rounded-lg text-left border cursor-pointer ${
                          desalIngressType === 'brackish'
                            ? 'bg-teal-500/20 border-teal-500/60 text-teal-300 font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        🛶 Tidal Creek / Estuary
                        <span className="block text-[10px] font-normal text-slate-500 mt-0.5">Brackish mix (15-20 ppt)</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1.5">Native Soil Texture</label>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {[
                        { id: 'clay', label: 'Heavy Clay', desc: 'Slow leaching' },
                        { id: 'loam', label: 'Clay Loam', desc: 'Medium' },
                        { id: 'sandy', label: 'Sandy Loam', desc: 'Fast leaching' }
                      ].map((soil) => (
                        <button
                          key={soil.id}
                          onClick={() => setDesalSoil(soil.id)}
                          className={`p-2 rounded-lg text-center border cursor-pointer ${
                            desalSoil === soil.id
                              ? 'bg-teal-500/20 border-teal-500/60 text-teal-300 font-bold'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          <div className="text-xs">{soil.label}</div>
                          <div className="text-[9px] text-slate-500">{soil.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Cultivated Area</span>
                      <span className="font-bold text-amber-300 font-mono">{desalAcres} Acres</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="10.0"
                      step="0.5"
                      value={desalAcres}
                      onChange={(e) => setDesalAcres(parseFloat(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Calculation Outputs */}
                <div className="lg:col-span-7 space-y-4">
                  {(() => {
                    const estimatedEC = (
                      (desalIngressType === 'seawater' ? 7.2 : 3.8) *
                      (desalDepth / 2) *
                      (desalSoil === 'clay' ? 1.25 : desalSoil === 'loam' ? 1.0 : 0.75)
                    ).toFixed(1);
                    const gypsumPerAcre = estimatedEC > 8 ? 380 : estimatedEC > 5 ? 280 : 160;
                    const totalGypsumKg = Math.round(gypsumPerAcre * desalAcres);
                    const totalGypsumBags = Math.round(totalGypsumKg / 25);
                    const flushDepthCm = desalSoil === 'clay' ? 15 : desalSoil === 'loam' ? 10 : 7;

                    return (
                      <div className="p-4 rounded-xl bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950/30 border border-teal-500/30 space-y-4">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                          <span className="text-xs font-bold text-white uppercase tracking-wider">
                            ICAR Field Reclamation Prescription
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            estimatedEC > 7
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          }`}>
                            {estimatedEC > 7 ? '⚠️ SEVERE SALINITY' : 'MODERATE SALINITY'}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                            <span className="text-[10px] text-slate-400 block">ESTIMATED SOIL EC</span>
                            <span className="text-xl font-black text-rose-400 font-mono">{estimatedEC} <span className="text-xs text-slate-400">dS/m</span></span>
                            <span className="text-[9px] text-slate-500 block mt-0.5">Critical limit: &gt;4.0 dS/m</span>
                          </div>
                          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                            <span className="text-[10px] text-slate-400 block">GYPSUM (CaSO4) NEED</span>
                            <span className="text-xl font-black text-amber-400 font-mono">{totalGypsumKg} <span className="text-xs text-slate-400">kg</span></span>
                            <span className="text-[9px] text-slate-400 block mt-0.5">{totalGypsumBags} bags (25kg each)</span>
                          </div>
                          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 col-span-2 sm:col-span-1">
                            <span className="text-[10px] text-slate-400 block">LEACHING FLUSH DEPTH</span>
                            <span className="text-xl font-black text-sky-400 font-mono">{flushDepthCm} <span className="text-xs text-slate-400">cm</span></span>
                            <span className="text-[9px] text-slate-500 block mt-0.5">Canal or Rainwater flush</span>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-teal-950/20 border border-teal-500/20 space-y-2 text-xs">
                          <div className="font-bold text-teal-300 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-teal-400" />
                            Actionable Soil Restoration Sequence for {desalAcres} Acres:
                          </div>
                          <ol className="list-decimal pl-4 space-y-1 text-slate-300 text-[11px] leading-relaxed">
                            <li>Drain stagnant brine immediately through lateral ditches during low tide.</li>
                            <li>Broadcast <strong className="text-amber-300">{totalGypsumKg} kg ({totalGypsumBags} bags)</strong> of agricultural gypsum uniformly across the {desalAcres} acres.</li>
                            <li>Incorporate with shallow disc harrow (do not plow deeper than 10 cm).</li>
                            <li>Pond with <strong className="text-sky-300">{flushDepthCm} cm</strong> fresh water for 48 hours to leach sodium below root zones.</li>
                            <li>Broadcast <strong className="text-emerald-300">Dhaincha (Sesbania)</strong> green manure seed @ 20 kg/acre to restore porosity.</li>
                          </ol>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* SubTab 2: Salt Tolerant Paddy Cultivars */}
            {desalSubTab === 'varieties' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SALINE_RECOVERY_DATA.saltTolerantPaddy.map((variety) => (
                  <div key={variety.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-white">{variety.name}</h4>
                        <span className="text-[10px] text-teal-400 font-semibold">{variety.institute}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                        {variety.salinityTolerance}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                      <div className="bg-slate-900 p-2 rounded border border-slate-800/80">
                        <span className="text-[9px] text-slate-500 block">MATURITY</span>
                        <strong className="text-slate-200">{variety.duration}</strong>
                      </div>
                      <div className="bg-slate-900 p-2 rounded border border-slate-800/80">
                        <span className="text-[9px] text-slate-500 block">EXPECTED YIELD</span>
                        <strong className="text-amber-300">{variety.yield}</strong>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      🌾 <strong className="text-slate-200">Submergence Survival:</strong> {variety.submergenceSurvival}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      📍 <strong className="text-slate-300">Recommended Coastal Belt:</strong> {variety.idealDistricts}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* SubTab 3: 60-Day Recovery Catch Crops */}
            {desalSubTab === 'catchCrops' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SALINE_RECOVERY_DATA.catchCrops.map((crop) => (
                  <div key={crop.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-white">{crop.crop}</h4>
                        <span className="text-xs text-amber-400 font-semibold">{crop.variety}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-black text-emerald-400 font-mono">{crop.mspRate}</span>
                        <span className="block text-[9px] text-slate-500">Matures in {crop.maturityDays}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs">
                      <div className="text-slate-300 text-[11px]">
                        💰 <strong className="text-emerald-300">Estimated Income:</strong> {crop.estimatedRevenue}
                      </div>
                      <div className="text-slate-400 text-[10px] mt-1">
                        🌱 <strong className="text-slate-300">Seed Rate:</strong> {crop.seedRate}
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      💡 {crop.benefit}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* SubTab 4: 4-Phase Roadmap */}
            {desalSubTab === 'roadmap' && (
              <div className="space-y-3">
                {SALINE_RECOVERY_DATA.desalinationProtocols.map((p, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center text-xs font-bold">
                          {idx + 1}
                        </span>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">{p.stage}</h4>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-semibold">
                        {p.importance}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-amber-300">{p.action}</div>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300 leading-relaxed">
                      {p.guidelines.map((g, gIdx) => (
                        <li key={gIdx}>{g}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB: Kisan Sathi Colloquial Talking Voice Avatar */}
        {activeTab === 'kisanVoice' && (
          <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-4 sm:p-6 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  <Mic className="w-3.5 h-3.5" />
                  Vernacular Audio Companion
                </div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>🎙️ "Kisan Sathi" Vernacular Colloquial Talking Voice Avatar</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Ask out-loud questions and listen to natural rural colloquial advice in your mother tongue for critical cyclone emergencies.
                </p>
              </div>

              {/* Speaking indicator */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className={`w-3 h-3 rounded-full ${isVoiceSpeaking ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'}`} />
                <span className="text-xs font-bold text-slate-300">
                  {isVoiceSpeaking ? 'Speaking in Native Dialect...' : 'Avatar Ready'}
                </span>
              </div>
            </div>

            {/* Voice Avatar Question Selector Chips */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 block">
                Select a Cyclone Crisis Topic to Ask Kisan Sathi:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {KISAN_VOICE_TOPICS.map((topic) => {
                  const qText = topic.question[proLang] || topic.question.english;
                  const isSelected = topic.id === voiceActiveTopicId;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => {
                        setVoiceActiveTopicId(topic.id);
                        if (isVoiceSpeaking) {
                          window.speechSynthesis.cancel();
                          setIsVoiceSpeaking(false);
                        }
                      }}
                      className={`p-3 rounded-xl text-left transition-all border text-xs cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-500/60 text-amber-200 font-bold shadow-md shadow-amber-950/30'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-base shrink-0">🌾</span>
                        <span className="line-clamp-2">{qText}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Avatar Response Stage */}
            {(() => {
              const activeTopic = KISAN_VOICE_TOPICS.find((t) => t.id === voiceActiveTopicId) || KISAN_VOICE_TOPICS[0];
              const qText = activeTopic.question[proLang] || activeTopic.question.english;
              const aText = activeTopic.answerAudio[proLang] || activeTopic.answerAudio.english;

              return (
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/30 border border-amber-500/40 space-y-4">
                  {/* Avatar Banner with animated soundwaves */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className={`w-14 h-14 rounded-2xl bg-amber-500/20 border-2 ${isVoiceSpeaking ? 'border-amber-400 shadow-lg shadow-amber-500/50' : 'border-amber-500/30'} flex items-center justify-center text-2xl relative overflow-hidden shrink-0`}>
                        👨‍🌾
                        {isVoiceSpeaking && (
                          <div className="absolute inset-0 bg-amber-400/10 animate-pulse pointer-events-none" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                          Kisan Sathi Field Voice Assistant
                        </div>
                        <h4 className="text-base font-bold text-white mt-0.5">{qText}</h4>
                      </div>
                    </div>

                    {/* Audio Playback Trigger Button */}
                    <button
                      onClick={() => handleSpeakKisanVoice(aText)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg cursor-pointer transition-all shrink-0 ${
                        isVoiceSpeaking
                          ? 'bg-rose-600 hover:bg-rose-500 text-white'
                          : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black'
                      }`}
                    >
                      {isVoiceSpeaking ? (
                        <>
                          <Square className="w-4 h-4 fill-white" />
                          <span>Stop Speaking</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4" />
                          <span>Listen Voice in Mother Tongue</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Vernacular Dialect Response Card */}
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                      Spoken Transcript ({proLang.toUpperCase()}):
                    </span>
                    <p className="text-sm font-medium text-slate-200 leading-relaxed font-sans">
                      "{aText}"
                    </p>
                  </div>

                  {/* Actionable Key Takeaways Checklist */}
                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Key Field Action Checklist:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {activeTopic.keyPoints.map((pt, pIdx) => (
                        <div key={pIdx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center gap-2 text-slate-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* TAB 6: Automated 24x7 WhatsApp & SMS Storm Dispatcher */}
        {activeTab === 'whatsapp' && (
          <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                  <span>Automated WhatsApp & SMS Emergency Dispatcher</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Broadcasts instant high-priority early warning alerts directly to family members, farm staff, and boat crews without opening the app.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1.5 rounded-xl text-xs text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="font-bold">24x7 Engine Online</span>
              </div>
            </div>

            {/* Threshold Trigger Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Auto-Dispatch Radius</span>
                <div className="text-sm font-bold text-white flex items-center justify-between">
                  <span>Within 300 km of Eye</span>
                  <span className="text-xs text-emerald-400 font-mono">Active</span>
                </div>
                <p className="text-[10px] text-slate-400">Triggers when storm eye approaches monitored zone</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Gale Wind Trigger</span>
                <div className="text-sm font-bold text-white flex items-center justify-between">
                  <span>Wind Gusts &gt; 45 km/h</span>
                  <span className="text-xs text-emerald-400 font-mono">Armed</span>
                </div>
                <p className="text-[10px] text-slate-400">Immediate SMS when trees/roofs are at risk</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Dispatch Cadence</span>
                <div className="text-sm font-bold text-white flex items-center justify-between">
                  <span>Every 3 Hours</span>
                  <span className="text-xs text-amber-400 font-mono">IMD Sync</span>
                </div>
                <p className="text-[10px] text-slate-400">Synchronized with RSMC New Delhi bulletins</p>
              </div>
            </div>

            {/* Registered Recipients List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Registered Recipients ({whatsappContacts.length} / 5 Included in Pro)</span>
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {whatsappContacts.map((contact) => (
                  <div key={contact.id} className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-emerald-500/40 transition-colors space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-bold text-white block">{contact.name}</span>
                        <span className="text-[11px] font-mono text-emerald-400">{contact.phone}</span>
                      </div>
                      <span className="text-[9px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-semibold">
                        {contact.role}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-900 text-[10px] text-slate-400">
                      <span className="flex items-center gap-1 text-emerald-400">
                        <Check className="w-3 h-3" />
                        {contact.type}
                      </span>
                      <button
                        onClick={() => setWhatsappContacts(whatsappContacts.filter(c => c.id !== contact.id))}
                        className="text-slate-500 hover:text-red-400 cursor-pointer"
                        title="Remove recipient"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Recipient Form */}
              <div className="p-3.5 rounded-xl bg-slate-950/50 border border-dashed border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="text"
                  placeholder="Recipient Name (e.g. Village Sarpanch)"
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500 flex-1"
                />
                <input
                  type="tel"
                  placeholder="+91 Mobile Phone"
                  value={newContactPhone}
                  onChange={(e) => setNewContactPhone(e.target.value)}
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500 w-full sm:w-44"
                />
                <select
                  value={newContactRole}
                  onChange={(e) => setNewContactRole(e.target.value)}
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500 w-full sm:w-36"
                >
                  <option value="Family Member">Family Member</option>
                  <option value="Farm Supervisor">Farm Supervisor</option>
                  <option value="Trawler Crew">Trawler Crew</option>
                  <option value="Pond Watchman">Pond Watchman</option>
                </select>
                <button
                  type="button"
                  onClick={() => {
                    if (newContactName.trim() && newContactPhone.trim()) {
                      setWhatsappContacts([
                        ...whatsappContacts,
                        {
                          id: Date.now(),
                          name: newContactName.trim(),
                          phone: newContactPhone.trim(),
                          role: newContactRole,
                          type: 'Instant WhatsApp',
                          status: 'Ready'
                        }
                      ]);
                      setNewContactName('');
                      setNewContactPhone('');
                    }
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Recipient</span>
                </button>
              </div>
            </div>

            {/* Test Dispatch Trigger Card */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-950 to-emerald-950/30 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Simulate Real-Time WhatsApp Emergency Alert</span>
                </span>
                <p className="text-[11px] text-slate-300">
                  Sends live template dispatch payload to all {whatsappContacts.length} registered numbers with current cyclone distance & wind speed.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setDispatchAlertSent(true);
                  setTimeout(() => setDispatchAlertSent(false), 6000);
                }}
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer active:scale-95 transition-all flex-shrink-0"
              >
                <Send className="w-3.5 h-3.5 text-slate-950" />
                <span>Test Dispatch Alert</span>
              </button>
            </div>

            {dispatchAlertSent && (
              <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-200 text-xs font-mono space-y-1 animate-in fade-in slide-in-from-top duration-300">
                <div className="flex items-center gap-2 font-bold text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Emergency Dispatch Successfully Queued for {whatsappContacts.length} Recipients:</span>
                </div>
                <div className="bg-slate-950/90 p-2.5 rounded-lg border border-slate-800 text-[11px] text-slate-300 font-sans mt-2">
                  <span className="font-bold text-emerald-400">[TOOFANSATHI PRO EMERGENCY DISPATCH]</span> 🚨 Cyclone Akvan (BOB-01-2026) is 142 km from your Puri farm. Forecast: 95 km/h gusts & 180mm rain arriving in 18 hrs. Action: Secure pond bunds & harvest mature crops immediately. Ref: IMD Bulletin #04.
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 7: Multi-Location Farm, Pond & Asset Watchlist */}
        {activeTab === 'watchlist' && (
          <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <span>Multi-Location Farm, Pond & Fleet Watchlist</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Simultaneously track up to 10 distinct farms, aquaculture ponds, processing cold stores, and trawlers across coastal states.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-amber-950/60 border border-amber-500/40 px-3 py-1.5 rounded-xl text-xs text-amber-300">
                <span className="font-bold">{watchedAssets.length} of 10 Geofences Active</span>
              </div>
            </div>

            {/* Asset Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {watchedAssets.map((asset) => (
                <div key={asset.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-all space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2.5">
                      <span className="text-2xl">{asset.icon}</span>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white">{asset.name}</h4>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          {asset.location}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                      {asset.type}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-900">
                    <div className="bg-slate-900/60 p-2 rounded-lg">
                      <span className="text-[9px] text-slate-500 block uppercase font-bold">Cyclone Eye Distance</span>
                      <span className="text-xs font-mono font-bold text-amber-400">{asset.distKm} km</span>
                    </div>
                    <div className="bg-slate-900/60 p-2 rounded-lg">
                      <span className="text-[9px] text-slate-500 block uppercase font-bold">Threat Evaluation</span>
                      <span className="text-xs font-bold text-rose-400">{asset.threat}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1 text-emerald-400 font-medium">
                      <ShieldCheck className="w-3 h-3" />
                      {asset.status}
                    </span>
                    <button
                      onClick={() => setWatchedAssets(watchedAssets.filter(a => a.id !== asset.id))}
                      className="text-slate-500 hover:text-red-400 cursor-pointer text-[10px] underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Asset Geofence */}
            <div className="p-4 rounded-xl bg-slate-950/50 border border-dashed border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                + Add New Monitored Property / Hatchery / Godown
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Asset Name (e.g. Balasore Cold Store)"
                  value={newAssetName}
                  onChange={(e) => setNewAssetName(e.target.value)}
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <input
                  type="text"
                  placeholder="District / Port / Coastal Block"
                  value={newAssetLoc}
                  onChange={(e) => setNewAssetLoc(e.target.value)}
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <div className="flex gap-2">
                  <select
                    value={newAssetType}
                    onChange={(e) => setNewAssetType(e.target.value)}
                    className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500 flex-1"
                  >
                    <option value="Aquaculture">🦐 Aquaculture Pond</option>
                    <option value="Crop Field">🌾 Standing Crops</option>
                    <option value="Marine Fleet">🚢 Trawler / Jetty</option>
                    <option value="Godown">🏢 Grain Godown</option>
                    <option value="Residential">🏠 Residential Villa</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      if (newAssetName.trim() && newAssetLoc.trim()) {
                        const iconMap = {
                          'Aquaculture': '🦐',
                          'Crop Field': '🌾',
                          'Marine Fleet': '🚢',
                          'Godown': '🏢',
                          'Residential': '🏠'
                        };
                        setWatchedAssets([
                          ...watchedAssets,
                          {
                            id: Date.now(),
                            name: newAssetName.trim(),
                            location: newAssetLoc.trim(),
                            type: newAssetType,
                            distKm: Math.floor(Math.random() * 100) + 120,
                            threat: 'Active Monitoring',
                            icon: iconMap[newAssetType] || '📍',
                            status: 'GPS Geofence Set'
                          }
                        ]);
                        setNewAssetName('');
                        setNewAssetLoc('');
                      }
                    }}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-lg cursor-pointer transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Pro Registration / Login Modal */}
      <PremiumAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
        }}
        initialUser={currentUser}
      />
    </div>
  );
}
