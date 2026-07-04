import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, ShieldAlert, Activity, Heart, Home, Search, MessageSquare, 
  Map, Eye, Volume2, Settings, Info, LogOut, Phone, MapPin, 
  Sparkles, Accessibility, Volume1, Compass, Crosshair, AlertTriangle, 
  Check, Send, Mic, Flame, Droplets, Stethoscope, Layers, Globe, 
  Bell, RotateCcw, Play, Pause, User, Copy, ChevronRight, Share2, 
  Upload, Camera, Bot
} from 'lucide-react';
import MedicalEmergency from '../Medical/MedicalEmergency.jsx';
import DisasterSafety from '../Disaster/DisasterSafety.jsx';
import AIAssistancePage from '../AIAssistance/AIAssistance.jsx';

// Translation Dictionary defined outside the component to prevent reference errors during initialization
const t = {
  en: {
    appName: "RescueAI",
    offlineMode: "Offline Mode Active",
    offlineModeDesc: "All emergency services are available.",
    logoSub: "Offline Emergency Assistant",
    heroHeading: "Your Offline Emergency Companion",
    heroSubtitle: "Instant AI-powered emergency guidance anytime, anywhere—even without internet.",
    searchPlaceholder: "Search emergency guides...",
    sosBtn: "🚨 SOS Emergency Help",
    cpr: "CPR Guide",
    cprDesc: "Step-by-step CPR instructions.",
    firstAid: "First Aid & Burns",
    firstAidDesc: "Burns, Bleeding, Fracture, Choking, Snake Bite.",
    voiceAssistant: "Voice Assistant",
    voiceAssistantDesc: "Speak instead of typing.",
    audioGuidance: "Audio Guidance",
    audioGuidanceDesc: "Listen to emergency instructions.",
    disasterSafety: "Disaster Safety",
    disasterGuide: "Disaster Guide",
    disasterGuideDesc: "Earthquake, Flood, Fire, Cyclone, Heatwave, Lightning.",
    offlineMaps: "Offline Maps",
    offlineMapsDesc: "GPS, Offline Map, Compass.",
    emergencyContacts: "Emergency Contacts",
    emergencyContactsDesc: "Emergency services dial numbers.",
    aiAssistance: "AI Assistance",
    aiEmergencyAssistant: "AI Emergency Assistant",
    aiEmergencyAssistantDesc: "Offline AI Chat support.",
    ocrScanner: "OCR Scanner",
    ocrScannerDesc: "Medicine Scanner & Notice Reader.",
    objectDetection: "Object Detection",
    objectDetectionDesc: "Detect Extinguisher, Aid Kit, Exit Sign.",
    settings: "Settings",
    settingsDesc: "Language, Accessibility, Voice, Theme.",
    quickNumbers: "Quick Emergency Numbers",
    ambulance: "Ambulance",
    natEmergency: "National Emergency",
    police: "Police",
    fire: "Fire Dept",
    call: "Call",
    medicalEmergencyTitle: "🚑 Medical Emergencies",
    disasterSafetyTitle: "🌍 Disaster Safety",
    aiAssistanceTitle: "🤖 AI Assistance",
    home: "Home",
    aiAssistant: "AI Assistant",
    scan: "Scan",
    maps: "Maps",
    contacts: "Contacts",
    notificationTitle: "Notifications",
    noNotifications: "No new notifications",
    close: "Close",
    cprInstructions: "CPR Steps (Cardiopulmonary Resuscitation)",
    cprStep1: "1. Call 112 / 108 immediately or ask someone else to call.",
    cprStep2: "2. Lay the person flat on their back on a firm surface.",
    cprStep3: "3. Place the heel of one hand in the center of their chest, and interlocking your other hand on top.",
    cprStep4: "4. Press hard and fast: Compress at least 2 inches deep, at a rate of 100 to 120 compressions per minute.",
    cprStep5: "5. Let the chest rise completely between compressions. Repeat until professional help arrives.",
    metronomeStart: "Start Visual & Sound Metronome (100 BPM)",
    metronomeStop: "Stop Metronome",
    cprCounterText: "Compression Beats:",
    firstAidTitle: "First Aid Guidance",
    disasterGuideTitle: "Disaster Response Checklist",
    accessibilitySettings: "Accessibility Options",
    largeTextToggle: "Large Fonts & Readable Spacing",
    highContrastToggle: "High Contrast Design (Pure White/Black)",
    voiceSettings: "Speech & Audio Preferences",
    voiceGenderText: "Voice Engine Accent",
    speechRateText: "Speech Guidance Speed",
    databases: "Offline Databases Cached Locally",
    aboutText: "RescueAI is optimized for network-outage environments during severe disasters. No telemetry leaves your device."
  },
  hi: {
    appName: "रेस्क्यूएआई",
    offlineMode: "ऑफलाइन मोड सक्रिय",
    offlineModeDesc: "सभी आपातकालीन सेवाएं उपलब्ध हैं।",
    logoSub: "ऑफलाइन आपातकालीन सहायक",
    heroHeading: "आपका ऑफलाइन आपातकालीन साथी",
    heroSubtitle: "बिना इंटरनेट के भी, कभी भी, कहीं भी - तुरंत एआई-संचालित आपातकालीन मार्गदर्शन।",
    searchPlaceholder: "आपातकालीन गाइड खोजें...",
    sosBtn: "🚨 एसओएस आपातकालीन सहायता",
    cpr: "सीपीआर गाइड",
    cprDesc: "सीपीआर के लिए चरण-दर-चरण निर्देश।",
    firstAid: "प्राथमिक उपचार और जलन",
    firstAidDesc: "जलन, रक्तस्राव, फ्रैक्चर, दम घुटना, सांप का काटना।",
    voiceAssistant: "वॉइस असिस्टेंट",
    voiceAssistantDesc: "टाइप करने के बजाय बोलें।",
    audioGuidance: "ऑडियो मार्गदर्शन",
    audioGuidanceDesc: "आपातकालीन निर्देशों को सुनें।",
    disasterSafety: "आपदा सुरक्षा",
    disasterGuide: "आपदा गाइड",
    disasterGuideDesc: "भूकंप, बाढ़, आग, चक्रवात, लू, बिजली गिरना।",
    offlineMaps: "ऑफलाइन मानचित्र",
    offlineMapsDesc: "जीपीएस, ऑफलाइन नक्शा, कम्पास।",
    emergencyContacts: "आपातकालीन संपर्क",
    emergencyContactsDesc: "डायल करने योग्य आपातकालीन नंबर।",
    aiAssistance: "एआई सहायता",
    aiEmergencyAssistant: "एआई आपातकालीन सहायक",
    aiEmergencyAssistantDesc: "ऑफलाइन एआई चैट सहायता।",
    ocrScanner: "ओसीआर स्कैनर",
    ocrScannerDesc: "दवा स्कैनर और सूचना पाठक।",
    objectDetection: "ऑब्जेक्ट डिटेक्शन",
    objectDetectionDesc: "अग्निशामक यंत्र, फर्स्ट एड किट, निकास द्वार खोजें।",
    settings: "सेटिंग्स",
    settingsDesc: "भाषा, सुगमता, आवाज, थीम।",
    quickNumbers: "त्वरित आपातकालीन नंबर",
    ambulance: "एम्बुलेंस",
    natEmergency: "राष्ट्रीय आपातकाल",
    police: "पुलिस",
    fire: "फायर ब्रिगेड",
    call: "कॉल करें",
    medicalEmergencyTitle: "आपातकालीन चिकित्सा",
    disasterSafetyTitle: "आपदा सुरक्षा",
    aiAssistanceTitle: "एआई सहायता",
    home: "होम",
    aiAssistant: "एआई सहायक",
    scan: "स्कैन",
    maps: "मानचित्र",
    contacts: "संपर्क",
    notificationTitle: "सूचनाएं",
    noNotifications: "कोई नई सूचना नहीं",
    close: "बंद करें",
    cprInstructions: "सीपीआर निर्देश (कार्डियोपल्मोनरी पुनर्जीवन)",
    cprStep1: "1. तुरंत 112 या 108 पर कॉल करें या किसी को कॉल करने के लिए कहें।",
    cprStep2: "2. पीड़ित व्यक्ति को किसी सख्त सतह पर पीठ के बल सीधा लेटाएं।",
    cprStep3: "3. अपनी एक हथेली को पीड़ित के छाती के बीच में रखें, और दूसरी हथेली को उसके ऊपर रखकर उंगलियों को आपस में फंसाएं।",
    cprStep4: "4. जोर से और तेजी से दबाएं: कम से कम 2 इंच गहरा दबाएं, प्रति मिनट 100 से 120 बार दबाने की गति रखें।",
    cprStep5: "5. दबाने के बाद छाती को पूरी तरह से ऊपर उठने दें। चिकित्सा सहायता आने तक इसे दोहराते रहें।",
    metronomeStart: "दृश्य और ध्वनि मेट्रोनोम शुरू करें (100 BPM)",
    metronomeStop: "मेट्रोनोम बंद करें",
    cprCounterText: "कंप्रेशन बीट्स:",
    firstAidTitle: "प्राथमिक चिकित्सा गाइड",
    disasterGuideTitle: "आपदा प्रतिक्रिया चेकलिस्ट",
    accessibilitySettings: "पहुंच-योग्यता (Accessibility) विकल्प",
    largeTextToggle: "बड़े अक्षर और आसान रिक्ति",
    highContrastToggle: "उच्च कंट्रास्ट डिजाइन (शुद्ध सफेद/काला)",
    voiceSettings: "आवाज और ऑडियो प्राथमिकताएं",
    voiceGenderText: "आवाज इंजन का लहजा",
    speechRateText: "आवाज मार्गदर्शन की गति",
    databases: "ऑफलाइन डेटाबेस सुरक्षित सहेजे गए",
    aboutText: "रेस्क्यूएआई को आपदाओं के दौरान नेटवर्क बंद होने की स्थिति में काम करने के लिए बनाया गया है। आपके डिवाइस से कोई भी डेटा बाहर नहीं भेजा जाता।"
  }
};

export default function Dashboard({ language: initialLanguage, onResetLanguage, onOpenSOS }) {
  // Navigation & Interactive States
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'ai_assistant', 'scan', 'maps', 'contacts', 'settings'
  const [language, setLanguage] = useState(initialLanguage || 'en');
  
  // Accessibility States
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  
  // Audio guidance and Speech States
  const [speechRate, setSpeechRate] = useState(1);
  const [voiceGender, setVoiceGender] = useState('female');
  const [voiceGuidanceActive, setVoiceGuidanceActive] = useState(false);
  
  // Modals
  const [cprModalOpen, setCprModalOpen] = useState(false);
  const [firstAidModalTab, setFirstAidModalTab] = useState(null); // 'burns', 'bleeding', 'fracture', 'choking', 'snake_bite' or null
  const [disasterModalTab, setDisasterModalTab] = useState(null); // 'earthquake', 'flood', 'fire', 'cyclone', 'heatwave', 'lightning' or null
  
  // CPR Metronome State
  const [cprBeatsActive, setCprBeatsActive] = useState(false);
  const [cprCount, setCprCount] = useState(0);
  const audioCtxRef = useRef(null);
  const metronomeIntervalRef = useRef(null);

  // AI Assistant Chat State
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'bot',
      text: initialLanguage === 'en' 
        ? "Hello! I am your offline AI Emergency Companion. I have access to first-aid procedures and disaster response guides locally. How can I help you?"
        : "नमस्ते! मैं आपका ऑफलाइन एआई आपातकालीन साथी हूं। मेरे पास स्थानीय स्तर पर प्राथमिक चिकित्सा प्रक्रियाओं और आपदा प्रतिक्रिया गाइडों की जानकारी है। मैं आपकी क्या मदद कर सकता हूं?"
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Scan mockup State
  const [scanType, setScanType] = useState('ocr'); // 'ocr' or 'detection'
  const [scanResult, setScanResult] = useState(null);
  const [scanningEffect, setScanningEffect] = useState(false);

  // Maps mockup State
  const [mapLayer, setMapLayer] = useState('all'); // 'all', 'hospitals', 'shelters'
  const [compassHeading, setCompassHeading] = useState(45);
  const [coordinatesCopied, setCoordinatesCopied] = useState(false);

  // Contacts State
  const [contactSearch, setContactSearch] = useState('');
  const [personalContacts, setPersonalContacts] = useState([
    { name: 'Dr. Ramesh Kumar (Family Doctor)', relation: 'Doctor', number: '9876543210' },
    { name: 'Sita Sharma (Mother)', relation: 'Emergency Contact', number: '9812345678' }
  ]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactNum, setNewContactNum] = useState('');
  const [newContactRel, setNewContactRel] = useState('');
  const [showAddContact, setShowAddContact] = useState(false);

  // Notifications State
  const [showNotifications, setShowNotifications] = useState(false);

  const currentT = t[language] || t.en;

  // Sync initial language if it changes
  useEffect(() => {
    if (initialLanguage) {
      setLanguage(initialLanguage);
    }
  }, [initialLanguage]);

  // Notifications List
  const notifications = [
    { title: language === 'en' ? "⚡ Offline GPS Lock Acquired" : "⚡ ऑफलाइन जीपीएस सिग्नल लॉक", time: "Just now" },
    { title: language === 'en' ? "📦 Llama AI Model cached successfully" : "📦 लामा एआई मॉडल सफलतापूर्वक सहेजा गया", time: "10 mins ago" },
    { title: language === 'en' ? "🟢 All 11 emergency guides available offline" : "🟢 सभी 11 आपातकालीन गाइड ऑफलाइन उपलब्ध हैं", time: "1 hour ago" }
  ];

  // Sound Metronome handler for CPR (Web Audio API)
  useEffect(() => {
    if (cprBeatsActive) {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      metronomeIntervalRef.current = setInterval(() => {
        if (audioCtxRef.current) {
          const ctx = audioCtxRef.current;
          if (ctx.state === 'suspended') {
            ctx.resume();
          }
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          osc.type = 'sine';
          osc.frequency.setValueAtTime(880, ctx.currentTime);
          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.start();
          osc.stop(ctx.currentTime + 0.1);
        }
        
        setCprCount(prev => prev + 1);
      }, 600); // 100 Beats Per Minute
    } else {
      if (metronomeIntervalRef.current) {
        clearInterval(metronomeIntervalRef.current);
      }
    }

    return () => {
      if (metronomeIntervalRef.current) {
        clearInterval(metronomeIntervalRef.current);
      }
    };
  }, [cprBeatsActive]);

  // Simulate compass oscillation
  useEffect(() => {
    const interval = setInterval(() => {
      setCompassHeading(prev => {
        const drift = Math.floor(Math.random() * 3) - 1;
        return (prev + drift + 360) % 360;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // AI Chat responses simulation
  const handleAIPrompt = (promptText) => {
    setChatMessages(prev => [...prev, { sender: 'user', text: promptText }]);
    setIsTyping(true);
    
    setTimeout(() => {
      let botResponse = "";
      const lower = promptText.toLowerCase();
      
      if (lower.includes('cpr') || lower.includes('सीपीआर')) {
        botResponse = language === 'en'
          ? "For CPR: Place hands in center of chest. Press hard & fast (100-120 compressions per min, 2 inches deep). Allow full chest recoil. Do not stop until paramedics arrive."
          : "सीपीआर के लिए: हाथों को छाती के केंद्र में रखें। जोर से और तेजी से दबाएं (100-120 बार प्रति मिनट, 2 इंच गहरा)। छाती को पूरी तरह वापस सामान्य स्थिति में आने दें।";
      } else if (lower.includes('bleed') || lower.includes('खून') || lower.includes('रक्त')) {
        botResponse = language === 'en'
          ? "For severe bleeding: Apply direct pressure to the wound with a clean cloth. Elevate the injured limb if possible. Keep pressure applied until help arrives. Do not remove soaked cloths."
          : "गंभीर रक्तस्राव के लिए: साफ कपड़े स�  // 1. Home dashboard overview
  const renderHome = () => (
    <div className="space-y-8 animate-fade-in">
      {/* Hero card with clean medical illustration */}
      <section className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#1565C0]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#E53935]/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="text-left max-w-lg space-y-4 md:space-y-5 z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#2E7D32] border border-emerald-100 shadow-xxs">
            <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-wider">{currentT.offlineMode}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight">
            {currentT.heroHeading}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-md">
            {currentT.heroSubtitle}
          </p>

          <div className="bg-[#F8FAFC] border border-slate-150 rounded-2xl p-4 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-[#2E7D32] flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-xs text-slate-800">{currentT.offlineMode}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{currentT.offlineModeDesc}</p>
            </div>
          </div>
        </div>

        {/* Flat SVG Rescuer/Patient Medical Illustration */}
        <div className="w-full max-w-[320px] md:max-w-[360px] shrink-0 z-10">
          <svg className="w-full h-auto" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="200" cy="245" rx="140" ry="18" fill="#F1F5F9" />
            <ellipse cx="200" cy="242" rx="120" ry="12" fill="#E2E8F0" />
            <circle cx="90" cy="110" r="30" fill="#E0F2FE" />
            <path d="M90 102v16M82 110h16" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
            <line x1="90" y1="110" x2="200" y2="60" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="200" y1="60" x2="310" y2="130" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="200" y1="60" x2="200" y2="150" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />
            <path d="M200 40c45 0 70 20 70 20v65c0 45-30 75-70 85-40-10-70-40-70-85V60s25-20 70-20z" fill="#1565C0" fillOpacity="0.15" />
            <path d="M200 50c38 0 60 16 60 16v54c0 38-25 63-60 72-35-9-60-34-60-72V66s22-16 60-16z" fill="#1565C0" />
            <path d="M200 90v40M180 110h40" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />

            {/* Rescuer */}
            <g transform="translate(60, 110)">
              <rect x="75" y="100" width="12" height="35" rx="6" fill="#475569" />
              <rect x="93" y="100" width="12" height="35" rx="6" fill="#475569" />
              <path d="M65 65h50v40H65V65z" fill="#0EA5E9" />
              <rect x="65" y="73" width="50" height="5" fill="#FACC15" />
              <rect x="65" y="85" width="50" height="5" fill="#FACC15" />
              <circle cx="90" cy="45" r="16" fill="#FDBA74" />
              <path d="M74 42c0-10 8-15 16-15s16 5 16 15z" fill="#1E293B" />
              <path d="M65 70c-10 5-12 18-5 24l15-15" fill="#FDBA74" stroke="#0EA5E9" strokeWidth="4" strokeLinecap="round" />
              <rect x="42" y="80" width="16" height="22" rx="2" fill="#E2E8F0" stroke="#475569" strokeWidth="2" />
              <path d="M47 91h6M50 88v6" stroke="#E53935" strokeWidth="1.5" />
            </g>

            {/* Patient */}
            <g transform="translate(240, 130)">
              <rect x="35" y="85" width="10" height="30" rx="5" fill="#334155" />
              <rect x="51" y="85" width="10" height="30" rx="5" fill="#334155" />
              <path d="M25 55h46v35H25V55z" fill="#94A3B8" />
              <circle cx="48" cy="35" r="14" fill="#FDBA74" />
              <path d="M34 32c0-8 6-12 14-12s14 4 14 12z" fill="#475569" />
              <path d="M28 60c-8 3-10 12-8 18" stroke="#FDBA74" strokeWidth="5" strokeLinecap="round" />
            </g>
            <path d="M60 270h80l8-15 8 30 10-45 10 40 8-10 6 5h150" stroke="#EF5350" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
          </svg>
        </div>
      </section>

      {/* Three Premium Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1 — Medical Emergency */}
        <div 
          onClick={() => setActiveTab('medical')}
          className="bg-white border border-slate-100 rounded-[20px] p-6 shadow-sm hover:shadow-md hover:border-red-200 transition-all cursor-pointer group flex flex-col justify-between text-left relative overflow-hidden"
        >
          <div className="space-y-4">
            {/* Glassmorphism Icon container */}
            <div className="w-16 h-16 rounded-full bg-red-50 text-[#E53935] flex items-center justify-center shadow-xs mx-auto group-hover:scale-105 transition-transform duration-300">
              <Heart className="w-8 h-8 animate-pulse" />
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="font-bold text-2xl text-slate-800 tracking-tight group-hover:text-[#E53935] transition-colors">
                {language === 'en' ? 'Medical Emergency' : 'चिकित्सा आपातकाल'}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed min-h-[48px] px-1">
                {language === 'en' 
                  ? 'CPR, First Aid, Voice Assistant and Audio Guidance.'
                  : 'सीपीआर, प्राथमिक चिकित्सा, वॉयस असिस्टेंट और ऑडियो मार्गदर्शन।'}
              </p>
            </div>
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); setActiveTab('medical'); }}
            className="w-full h-[50px] rounded-[14px] mt-6 bg-gradient-to-r from-[#E53935] to-[#D32F2F] hover:brightness-115 text-white font-extrabold text-xs transition-all shadow-md shadow-red-500/10 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>{language === 'en' ? 'Open Medical Emergency' : 'चिकित्सा आपातकाल खोलें'}</span>
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        </div>

        {/* Card 2 — Disaster Safety */}
        <div 
          onClick={() => setActiveTab('disaster')}
          className="bg-white border border-slate-100 rounded-[20px] p-6 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer group flex flex-col justify-between text-left relative overflow-hidden"
        >
          <div className="space-y-4">
            {/* Glassmorphism Icon container */}
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-xs mx-auto group-hover:scale-105 transition-transform duration-300">
              <Globe className="w-8 h-8" />
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="font-bold text-2xl text-slate-800 tracking-tight group-hover:text-emerald-600 transition-colors">
                {language === 'en' ? 'Disaster Safety' : 'आपदा सुरक्षा'}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed min-h-[48px] px-1">
                {language === 'en'
                  ? 'Disaster Guide, Offline Maps and Emergency Contacts.'
                  : 'आपदा गाइड, ऑफलाइन मानचित्र और आपातकालीन संपर्क।'}
              </p>
            </div>
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); setActiveTab('disaster'); }}
            className="w-full h-[50px] rounded-[14px] mt-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-115 text-white font-extrabold text-xs transition-all shadow-md shadow-emerald-500/10 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>{language === 'en' ? 'Open Disaster Safety' : 'आपदा सुरक्षा खोलें'}</span>
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        </div>

        {/* Card 3 — AI Assistance */}
        <div 
          onClick={() => setActiveTab('ai_assistance_page')}
          className="bg-white border border-slate-100 rounded-[20px] p-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group flex flex-col justify-between text-left relative overflow-hidden"
        >
          <div className="space-y-4">
            {/* Glassmorphism Icon container */}
            <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-650 flex items-center justify-center shadow-xs mx-auto group-hover:scale-105 transition-transform duration-300">
              <Bot className="w-8 h-8" />
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="font-bold text-2xl text-slate-800 tracking-tight group-hover:text-indigo-650 transition-colors">
                {language === 'en' ? 'AI Assistance' : 'एआई सहायता'}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed min-h-[48px] px-1">
                {language === 'en'
                  ? 'AI Chatbot, OCR Scanner, Object Detection and Settings.'
                  : 'एआई चैटबॉट, ओसीआर स्कैनर, ऑब्जेक्ट डिटेक्शन और सेटिंग्स।'}
              </p>
            </div>
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); setActiveTab('ai_assistance_page'); }}
            className="w-full h-[50px] rounded-[14px] mt-6 bg-gradient-to-r from-indigo-500 to-blue-600 hover:brightness-115 text-white font-extrabold text-xs transition-all shadow-md shadow-indigo-500/10 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>{language === 'en' ? 'Open AI Assistance' : 'एआई सहायता खोलें'}</span>
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        </div>

      </div>

      {/* Ambulance / Emergency large phone buttons */}
      <section className="bg-white rounded-3xl border border-slate-150 p-6 shadow-xs space-y-4">
        <div className="text-left border-b border-slate-100 pb-2">
          <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">{currentT.quickNumbers}</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a 
            href="tel:108"
            className="flex flex-col sm:flex-row items-center gap-3.5 p-4 rounded-2xl border border-slate-150 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all text-center sm:text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-[#2E7D32] flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400">{currentT.ambulance}</span>
              <p className="font-extrabold text-slate-800 text-base leading-tight group-hover:text-[#2E7D32]">108</p>
              <span className="text-[9px] font-bold text-[#1565C0] group-hover:underline mt-0.5 block">{currentT.call}</span>
            </div>
          </a>

          <a 
            href="tel:112"
            className="flex flex-col sm:flex-row items-center gap-3.5 p-4 rounded-2xl border border-slate-150 hover:border-red-300 hover:bg-red-50/20 transition-all text-center sm:text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-red-500/10 text-[#E53935] flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5 animate-soft-pulse" />
            </div>
            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400">{currentT.natEmergency}</span>
              <p className="font-extrabold text-slate-800 text-base leading-tight group-hover:text-[#E53935]">112</p>
              <span className="text-[9px] font-bold text-[#1565C0] group-hover:underline mt-0.5 block">{currentT.call}</span>
            </div>
          </a>

          <a 
            href="tel:100"
            className="flex flex-col sm:flex-row items-center gap-3.5 p-4 rounded-2xl border border-slate-150 hover:border-blue-300 hover:bg-blue-50/20 transition-all text-center sm:text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-[#1565C0] flex items-center justify-center shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400">{currentT.police}</span>
              <p className="font-extrabold text-slate-800 text-base leading-tight group-hover:text-[#1565C0]">100</p>
              <span className="text-[9px] font-bold text-[#1565C0] group-hover:underline mt-0.5 block">{currentT.call}</span>
            </div>
          </a>

          <a 
            href="tel:101"
            className="flex flex-col sm:flex-row items-center gap-3.5 p-4 rounded-2xl border border-slate-150 hover:border-amber-300 hover:bg-amber-50/20 transition-all text-center sm:text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-[#FB8C00] flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400">{currentT.fire}</span>
              <p className="font-extrabold text-slate-800 text-base leading-tight group-hover:text-[#FB8C00]">101</p>
              <span className="text-[9px] font-bold text-[#1565C0] group-hover:underline mt-0.5 block">{currentT.call}</span>
            </div>
          </a>
        </div>
      </section>
    </div>
  );ustify-center mb-4 group-hover:bg-slate-700 group-hover:text-white transition-all">
                  <Settings className="w-5.5 h-5.5" />
                </div>
                <h4 className="font-extrabold text-slate-800 text-sm mb-1 group-hover:text-slate-800 transition-colors">{currentT.settings}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{currentT.settingsDesc}</p>
              </div>
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-455 group-hover:text-slate-750 transition-colors pt-4 mt-6 border-t border-slate-50">
                <span>Configure Options</span>
                <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Ambulance / Emergency large phone buttons */}
      <section className="bg-white rounded-3xl border border-slate-150 p-6 shadow-xs space-y-4">
        <div className="text-left border-b border-slate-100 pb-2">
          <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">{currentT.quickNumbers}</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a 
            href="tel:108"
            className="flex flex-col sm:flex-row items-center gap-3.5 p-4 rounded-2xl border border-slate-150 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all text-center sm:text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-[#2E7D32] flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400">{currentT.ambulance}</span>
              <p className="font-extrabold text-slate-800 text-base leading-tight group-hover:text-[#2E7D32]">108</p>
              <span className="text-[9px] font-bold text-[#1565C0] group-hover:underline mt-0.5 block">{currentT.call}</span>
            </div>
          </a>

          <a 
            href="tel:112"
            className="flex flex-col sm:flex-row items-center gap-3.5 p-4 rounded-2xl border border-slate-150 hover:border-red-300 hover:bg-red-50/20 transition-all text-center sm:text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-red-500/10 text-[#E53935] flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5 animate-soft-pulse" />
            </div>
            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400">{currentT.natEmergency}</span>
              <p className="font-extrabold text-slate-800 text-base leading-tight group-hover:text-[#E53935]">112</p>
              <span className="text-[9px] font-bold text-[#1565C0] group-hover:underline mt-0.5 block">{currentT.call}</span>
            </div>
          </a>

          <a 
            href="tel:100"
            className="flex flex-col sm:flex-row items-center gap-3.5 p-4 rounded-2xl border border-slate-150 hover:border-blue-300 hover:bg-blue-50/20 transition-all text-center sm:text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-[#1565C0] flex items-center justify-center shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400">{currentT.police}</span>
              <p className="font-extrabold text-slate-800 text-base leading-tight group-hover:text-[#1565C0]">100</p>
              <span className="text-[9px] font-bold text-[#1565C0] group-hover:underline mt-0.5 block">{currentT.call}</span>
            </div>
          </a>

          <a 
            href="tel:101"
            className="flex flex-col sm:flex-row items-center gap-3.5 p-4 rounded-2xl border border-slate-150 hover:border-amber-300 hover:bg-amber-50/20 transition-all text-center sm:text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-[#FB8C00] flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400">{currentT.fire}</span>
              <p className="font-extrabold text-slate-800 text-base leading-tight group-hover:text-[#FB8C00]">101</p>
              <span className="text-[9px] font-bold text-[#1565C0] group-hover:underline mt-0.5 block">{currentT.call}</span>
            </div>
          </a>
        </div>
      </section>
    </div>
  );

  // 2. Local AI Assistant Mock view
  const renderAIAssistant = () => (
    <div className="bg-white rounded-3xl border border-slate-150 shadow-sm flex flex-col h-[520px] overflow-hidden animate-fade-in text-left">
      <div className="bg-slate-50 border-b border-slate-150 p-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-650 rounded-xl flex items-center justify-center font-bold text-lg">
            🤖
          </div>
          <div>
            <h3 className="font-extrabold text-xs text-slate-800">Llama-3 Local Emergency Chat</h3>
            <p className="text-[9px] text-[#2E7D32] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              Secure Offline AI Ready
            </p>
          </div>
        </div>
        <button 
          onClick={() => setChatMessages([{ sender: 'bot', text: language === 'en' ? "Chat reset. How can I help you today?" : "चैट रीसेट। मैं आज आपकी क्या मदद कर सकता हूं?" }])}
          className="p-1.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          title="Reset Chat"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {chatMessages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
          >
            <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${msg.sender === 'user' ? 'bg-[#1565C0] text-white rounded-tr-none' : 'bg-slate-100 text-slate-850 rounded-tl-none border border-slate-150'}`}>
              <p className="whitespace-pre-line">{msg.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-100 text-slate-400 rounded-2xl rounded-tl-none px-4 py-2.5 text-xs border border-slate-150 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50 flex gap-2 overflow-x-auto shrink-0 no-scrollbar">
        <button 
          onClick={() => handleAIPrompt(language === 'en' ? "How to perform CPR?" : "सीपीआर कैसे करें?")}
          className="text-[9px] font-bold text-indigo-755 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full shrink-0 hover:bg-indigo-100 transition-colors cursor-pointer"
        >
          ❤️ CPR Guide
        </button>
        <button 
          onClick={() => handleAIPrompt(language === 'en' ? "Stop severe bleeding guide" : "रक्तस्राव रोकने का गाइड")}
          className="text-[9px] font-bold text-red-755 bg-red-50 border border-red-100 px-3 py-1.5 rounded-full shrink-0 hover:bg-red-100 transition-colors cursor-pointer"
        >
          🩹 Bleeding Aid
        </button>
        <button 
          onClick={() => handleAIPrompt(language === 'en' ? "Earthquake drop cover hold" : "भूकंप से बचाव के नियम")}
          className="text-[9px] font-bold text-emerald-755 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full shrink-0 hover:bg-emerald-100 transition-colors cursor-pointer"
        >
          🌍 Earthquake Rules
        </button>
      </div>

      {/* Input */}
      <form onSubmit={handleSendChat} className="p-3 border-t border-slate-150 flex gap-2 items-center shrink-0">
        <div className="relative flex-1">
          <input 
            type="text" 
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder={currentT.searchPlaceholder}
            className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
          <button 
            type="button"
            onClick={() => handleAIPrompt(language === 'en' ? "How to treat a burn?" : "जलने का प्राथमिक उपचार क्या है?")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-indigo-650 cursor-pointer"
          >
            <Mic className="w-4 h-4" />
          </button>
        </div>
        <button 
          type="submit"
          className="px-4 py-2.5 bg-[#1565C0] hover:bg-[#0D47A1] text-white rounded-xl font-bold text-xs transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );

  // 3. OCR and Device Scanning mock view
  const renderScan = () => (
    <div className="bg-white rounded-3xl border border-slate-150 shadow-sm p-5 space-y-5 animate-fade-in text-left">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-extrabold text-base text-slate-800">{language === 'en' ? 'AI Vision Scan' : 'एआई विज़न स्कैन'}</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">{language === 'en' ? 'Offline document reading and safety detection' : 'ऑफलाइन दस्तावेज और सुरक्षा उपकरण पहचान'}</p>
        </div>
        <div className="flex bg-slate-100 p-0.5 rounded-xl shrink-0">
          <button 
            onClick={() => { setScanType('ocr'); setScanResult(null); }}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${scanType === 'ocr' ? 'bg-white text-slate-800 shadow-xxs' : 'text-slate-500'}`}
          >
            📄 OCR Scanner
          </button>
          <button 
            onClick={() => { setScanType('detection'); setScanResult(null); }}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${scanType === 'detection' ? 'bg-white text-slate-800 shadow-xxs' : 'text-slate-500'}`}
          >
            📸 Detection
          </button>
        </div>
      </div>

      <div className="relative aspect-video max-w-lg mx-auto bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 flex flex-col justify-center items-center">
        {scanningEffect && (
          <div className="absolute inset-x-0 h-1 bg-[#E53935] shadow-md shadow-[#E53935]/50 animate-scanner-sweep z-10"></div>
        )}
        
        {scanType === 'ocr' ? (
          <>
            <div className="absolute inset-6 border border-white/20 border-dashed rounded-xl pointer-events-none flex items-center justify-center">
              <span className="text-[9px] text-white/30 tracking-widest uppercase">Align Notice or prescription label</span>
            </div>
            <div className="absolute top-1/3 left-1/4 bg-white/10 border border-emerald-400/40 text-[9px] text-emerald-300 font-mono px-1 rounded backdrop-blur-xs select-none">
              PARACETAMOL 500
            </div>
            <p className="text-white/50 text-[10px] text-center z-10 px-6 mt-16">
              {scanningEffect ? <span className="text-emerald-400 animate-pulse font-bold">Scanning...</span> : 'Position medical notice in the layout box'}
            </p>
          </>
        ) : (
          <>
            <div className="absolute top-1/4 left-1/3 border border-[#E53935] text-[8px] text-[#E53935] font-bold px-1.5 py-0.5 rounded bg-red-950/20 backdrop-blur-xs select-none">
              First Aid Kit [94%]
            </div>
            <div className="absolute bottom-1/4 right-1/4 border border-[#1565C0] text-[8px] text-[#1565C0] font-bold px-1.5 py-0.5 rounded bg-blue-950/20 backdrop-blur-xs select-none">
              Fire Extinguisher [98%]
            </div>
            <p className="text-white/50 text-[10px] text-center z-10 px-6 mt-16">
              {scanningEffect ? <span className="text-[#E53935] animate-pulse font-bold">Analyzing Frame...</span> : 'Point at extinguisher, aid kit, or exit signage'}
            </p>
          </>
        )}

        <button 
          onClick={triggerScan}
          disabled={scanningEffect}
          className="absolute bottom-3 px-5 py-2 bg-white text-slate-800 rounded-xl font-bold text-[10px] shadow-md cursor-pointer flex items-center gap-1 disabled:opacity-50"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>{scanningEffect ? 'Analyzing...' : 'Scan Item'}</span>
        </button>
      </div>

      {scanResult && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-lg mx-auto space-y-2.5 animate-slide-up text-left">
          <p className="font-extrabold text-xs text-slate-800 border-b border-slate-200 pb-1.5">🟢 {scanResult.title}</p>
          {scanType === 'ocr' ? (
            <div className="space-y-2">
              <pre className="text-[10.5px] text-slate-650 bg-white border border-slate-150 rounded-xl p-3 overflow-x-auto whitespace-pre-wrap font-sans leading-relaxed">
                {scanResult.content}
              </pre>
              <div className="flex gap-1">
                {scanResult.tags.map((tag, idx) => (
                  <span key={idx} className="bg-slate-200 text-slate-600 text-[9px] px-2 py-0.5 rounded-full font-bold">{tag}</span>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {scanResult.objects.map((obj, idx) => (
                <div key={idx} className="flex justify-between items-center bg-white border border-slate-150 p-2 rounded-xl text-[11px]">
                  <span className="font-bold text-slate-700">{obj.name} <span className="text-[9px] text-slate-400 font-normal">({obj.box})</span></span>
                  <span className="bg-emerald-50 text-[#2E7D32] border border-emerald-100 font-extrabold text-[9px] px-2 py-0.5 rounded-full">{obj.confidence} match</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );

  // 4. GPS Offline vector map view
  const renderMaps = () => (
    <div className="bg-white rounded-3xl border border-[#1565C0]/10 shadow-sm p-4 space-y-5 animate-fade-in text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-3">
        <div>
          <h3 className="font-extrabold text-base text-slate-800">{language === 'en' ? 'Offline Vector Maps' : 'ऑफलाइन वेक्टर मानचित्र'}</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">{language === 'en' ? 'GPS tracker & route guides loaded locally' : 'जीपीएस ट्रैकर और मार्ग गाइड स्थानीय स्तर पर सहेजे गए'}</p>
        </div>

        <div className="flex bg-slate-100 p-0.5 rounded-xl shrink-0 text-[10px] font-bold w-fit">
          <button onClick={() => setMapLayer('all')} className={`px-3 py-1.5 rounded-lg cursor-pointer ${mapLayer === 'all' ? 'bg-[#1565C0] text-white shadow-xxs' : 'text-slate-500'}`}>All</button>
          <button onClick={() => setMapLayer('hospitals')} className={`px-3 py-1.5 rounded-lg cursor-pointer ${mapLayer === 'hospitals' ? 'bg-[#1565C0] text-white shadow-xxs' : 'text-slate-500'}`}>🏥 Hospitals</button>
          <button onClick={() => setMapLayer('shelters')} className={`px-3 py-1.5 rounded-lg cursor-pointer ${mapLayer === 'shelters' ? 'bg-[#1565C0] text-white shadow-xxs' : 'text-slate-500'}`}>⛺ Shelters</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 aspect-video bg-[#F1F5F9] rounded-2xl overflow-hidden border border-slate-200 relative flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:16px_16px] opacity-70"></div>
          <div className="absolute w-[200%] h-[200%] bg-[conic-gradient(from_0deg,rgba(21,101,192,0.06)_0deg,transparent_90deg)] rounded-full animate-radar-sweep pointer-events-none"></div>

          <svg className="absolute inset-0 w-full h-full text-slate-300 opacity-40" viewBox="0 0 600 400" fill="none">
            <path d="M0 80h600M0 240h600M200 0v400M450 0v400" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            <path d="M100 80l100 160M450 240l80 80" stroke="currentColor" strokeWidth="4" />
            <path d="M0 350c150-50 250-20 400-80s150 40 200 10" stroke="#90CDF4" strokeWidth="8" strokeLinecap="round" opacity="0.6" />
          </svg>

          {/* User pin */}
          <div className="absolute top-[180px] left-[250px] flex flex-col items-center z-15">
            <span className="w-3.5 h-3.5 rounded-full bg-[#1565C0] border-2 border-white animate-soft-pulse flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            </span>
            <span className="bg-slate-900/90 text-white text-[8px] font-bold px-1.5 py-0.5 rounded mt-1 shadow-xxs whitespace-nowrap">You</span>
          </div>

          {/* Hospitals */}
          {(mapLayer === 'all' || mapLayer === 'hospitals') && (
            <>
              <div className="absolute top-[90px] left-[150px] flex flex-col items-center z-15">
                <div className="w-6 h-6 rounded-lg bg-white border border-red-200 flex items-center justify-center shadow-xxs">🏥</div>
                <span className="bg-white/90 text-slate-800 text-[8px] font-bold px-1 rounded border border-slate-200 mt-0.5">District Clinic</span>
              </div>
              <div className="absolute top-[280px] left-[420px] flex flex-col items-center z-15">
                <div className="w-6 h-6 rounded-lg bg-white border border-red-200 flex items-center justify-center shadow-xxs">🏥</div>
                <span className="bg-white/90 text-slate-800 text-[8px] font-bold px-1 rounded border border-slate-200 mt-0.5">City Hospital</span>
              </div>
            </>
          )}

          {/* Shelters */}
          {(mapLayer === 'all' || mapLayer === 'shelters') && (
            <>
              <div className="absolute top-[120px] left-[390px] flex flex-col items-center z-15">
                <div className="w-6 h-6 rounded-lg bg-white border border-emerald-250 flex items-center justify-center shadow-xxs">⛺</div>
                <span className="bg-white/90 text-slate-800 text-[8px] font-bold px-1 rounded border border-slate-200 mt-0.5">Shelter 1</span>
              </div>
              <div className="absolute top-[320px] left-[120px] flex flex-col items-center z-15">
                <div className="w-6 h-6 rounded-lg bg-white border border-emerald-250 flex items-center justify-center shadow-xxs">⛺</div>
                <span className="bg-white/90 text-slate-800 text-[8px] font-bold px-1 rounded border border-slate-200 mt-0.5">Shelter 2</span>
              </div>
            </>
          )}

          <div className="absolute bottom-3 left-3 bg-white/80 border border-slate-200 px-2 py-0.5 rounded text-[8px] font-mono font-bold text-slate-650">
            Scale: 1 : 10,000 (GPS Connected)
          </div>
        </div>

        {/* Compass Panel */}
        <div className="space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left">
            <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Coordinates</span>
            <p className="font-mono font-extrabold text-slate-800 text-sm mt-1">28.6139° N, 77.2090° E</p>
            <p className="text-[9px] text-slate-450 mt-0.5">District: New Delhi, IN</p>
            <button 
              onClick={handleCopyCoords}
              className="mt-3 w-full py-2 bg-white hover:bg-slate-100 border border-slate-250 rounded-xl text-xs font-bold text-slate-700 transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span>{coordinatesCopied ? 'Copied' : 'Copy Coordinates'}</span>
            </button>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center">
            <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider mb-2">Offline Compass</span>
            
            <div className="relative w-20 h-20 rounded-full border border-slate-250 flex items-center justify-center bg-white shadow-xxs" style={{ transform: `rotate(${compassHeading}deg)`, transition: 'transform 0.4s ease-out' }}>
              <div className="absolute inset-1 rounded-full bg-slate-50/50"></div>
              <span className="absolute top-1 text-[8px] font-bold text-red-500">N</span>
              <span className="absolute bottom-1 text-[8px] font-bold text-slate-500">S</span>
              <svg className="w-14 h-14 text-slate-800 absolute" viewBox="0 0 100 100">
                <polygon points="50,15 46,50 54,50" fill="#E53935" />
                <polygon points="50,85 46,50 54,50" fill="#1565C0" />
                <circle cx="50" cy="50" r="3.5" fill="#FFFFFF" />
              </svg>
            </div>
            
            <p className="font-extrabold text-xs text-slate-800 mt-2">{compassHeading}° NNE</p>
          </div>
        </div>
      </div>
    </div>
  );

  // 5. Contacts directory view
  const renderContacts = () => (
    <div className="bg-white rounded-3xl border border-slate-150 shadow-sm p-5 space-y-5 animate-fade-in text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-3">
        <div>
          <h3 className="font-extrabold text-base text-slate-800">{language === 'en' ? 'Emergency Directory' : 'आपातकालीन निर्देशिका'}</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">{language === 'en' ? 'Always dialable emergency and personal contacts' : 'हमेशा डायल करने योग्य आपातकालीन और व्यक्तिगत नंबर'}</p>
        </div>
        
        <div className="relative max-w-xs w-full shrink-0">
          <Search className="w-4 h-4 text-slate-450 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            value={contactSearch}
            onChange={(e) => setContactSearch(e.target.value)}
            placeholder="Search contacts..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#1565C0]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h4 className="font-bold text-[10px] text-slate-400 uppercase tracking-wider">Government Services</h4>
          <div className="space-y-2">
            {[
              { name: 'National Emergency Line', number: '112', type: 'All-in-One' },
              { name: 'Disaster Relief Management', number: '108', type: 'Trauma Relief' },
              { name: 'Ambulance Medical Care', number: '102', type: 'Medical' },
              { name: 'Police Helpline', number: '100', type: 'Safety' },
              { name: 'Fire Response Control', number: '101', type: 'Fire' }
            ].filter(c => c.name.toLowerCase().includes(contactSearch.toLowerCase()) || c.number.includes(contactSearch)).map((c, idx) => (
              <a 
                key={idx}
                href={`tel:${c.number}`}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-150 hover:border-blue-200 bg-slate-50/40 hover:bg-slate-50 transition-all group"
              >
                <div>
                  <p className="font-bold text-xs text-slate-800">{c.name}</p>
                  <span className="text-[9px] text-slate-400 font-medium">{c.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xs text-[#1565C0]">{c.number}</span>
                  <div className="p-1.5 bg-white rounded-lg border border-slate-200 text-slate-500 group-hover:bg-[#1565C0] group-hover:text-white transition-all">
                    <Phone className="w-3 h-3" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-[10px] text-slate-400 uppercase tracking-wider">Personal Contacts</h4>
            <button onClick={() => setShowAddContact(!showAddContact)} className="text-[10px] font-bold text-[#1565C0] hover:underline cursor-pointer">
              {showAddContact ? 'Cancel' : '+ Add'}
            </button>
          </div>

          {showAddContact && (
            <form onSubmit={handleAddContact} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 animate-slide-up text-left">
              <div>
                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Name</label>
                <input type="text" required value={newContactName} onChange={(e) => setNewContactName(e.target.value)} placeholder="Papa / Sister" className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Phone</label>
                  <input type="tel" required value={newContactNum} onChange={(e) => setNewContactNum(e.target.value)} placeholder="9876543210" className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs" />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Relation</label>
                  <input type="text" value={newContactRel} onChange={(e) => setNewContactRel(e.target.value)} placeholder="Family / Doctor" className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs" />
                </div>
              </div>
              <button type="submit" className="w-full py-2 bg-[#1565C0] text-white font-bold text-[10px] rounded-xl cursor-pointer">Save Contact</button>
            </form>
          )}

          <div className="space-y-2">
            {personalContacts.filter(c => c.name.toLowerCase().includes(contactSearch.toLowerCase()) || c.number.includes(contactSearch)).map((c, idx) => (
              <a 
                key={idx}
                href={`tel:${c.number}`}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-150 hover:border-emerald-250 bg-slate-50/40 hover:bg-slate-50 transition-all group"
              >
                <div>
                  <p className="font-bold text-xs text-slate-800">{c.name}</p>
                  <span className="text-[9px] text-slate-400 font-medium">{c.relation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xs text-slate-750">{c.number}</span>
                  <div className="p-1.5 bg-white rounded-lg border border-slate-200 text-slate-500 group-hover:bg-[#2E7D32] group-hover:text-white transition-all">
                    <Phone className="w-3 h-3" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // 6. Settings layout view
  const renderSettings = () => (
    <div className="bg-white rounded-3xl border border-slate-150 shadow-sm p-5 space-y-5 animate-fade-in text-left">
      <div className="border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-base text-slate-800">{currentT.accessibilitySettings}</h3>
        <p className="text-[11px] text-slate-400 mt-0.5">Customize layouts and voice systems</p>
      </div>

      <div className="space-y-5 max-w-xl mx-auto">
        <div className="space-y-3.5 bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <h4 className="font-bold text-[9px] text-slate-400 uppercase tracking-wider">Display Sizing</h4>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-xs text-slate-800">{currentT.largeTextToggle}</p>
              <p className="text-[9.5px] text-slate-500 mt-0.5">Scales text and inputs up for easier reading</p>
            </div>
            <button 
              onClick={() => setLargeText(!largeText)}
              className={`w-10 h-5.5 rounded-full transition-all relative cursor-pointer ${largeText ? 'bg-[#1565C0]' : 'bg-slate-300'}`}
            >
              <span className={`absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white transition-all ${largeText ? 'right-0.5' : 'left-0.5'}`}></span>
            </button>
          </div>

          <div className="flex items-center justify-between border-t border-slate-200/50 pt-3">
            <div>
              <p className="font-bold text-xs text-slate-800">{currentT.highContrastToggle}</p>
              <p className="text-[9.5px] text-slate-500 mt-0.5">Sets contrast to solid black & white lines</p>
            </div>
            <button 
              onClick={() => setHighContrast(!highContrast)}
              className={`w-10 h-5.5 rounded-full transition-all relative cursor-pointer ${highContrast ? 'bg-[#1565C0]' : 'bg-slate-300'}`}
            >
              <span className={`absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white transition-all ${highContrast ? 'right-0.5' : 'left-0.5'}`}></span>
            </button>
          </div>
        </div>

        <div className="space-y-3.5 bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <h4 className="font-bold text-[9px] text-slate-400 uppercase tracking-wider">{currentT.voiceSettings}</h4>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-xs text-slate-800">{currentT.voiceGenderText}</p>
              <p className="text-[9.5px] text-slate-500 mt-0.5">Announcer accent option</p>
            </div>
            <div className="flex bg-white rounded-lg border border-slate-250 p-0.5 text-[10px] font-semibold">
              <button onClick={() => setVoiceGender('female')} className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${voiceGender === 'female' ? 'bg-[#1565C0] text-white' : 'text-slate-500'}`}>Female</button>
              <button onClick={() => setVoiceGender('male')} className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${voiceGender === 'male' ? 'bg-[#1565C0] text-white' : 'text-slate-500'}`}>Male</button>
            </div>
          </div>

          <div className="space-y-1.5 border-t border-slate-200/50 pt-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-850">{currentT.speechRateText}</span>
              <span className="font-bold text-[#1565C0]">{speechRate}x</span>
            </div>
            <input type="range" min="0.5" max="2.0" step="0.25" value={speechRate} onChange={(e) => setSpeechRate(parseFloat(e.target.value))} className="w-full accent-[#1565C0]" />
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-[10px] space-y-1.5">
          <p className="font-bold text-[#1565C0] uppercase tracking-wider text-[9px] mb-1.5">{currentT.databases}</p>
          <div className="flex justify-between border-b border-slate-200/40 pb-1">
            <span>Ollama Llama-3-3B quantized engine:</span>
            <span className="font-bold">2.1 GB</span>
          </div>
          <div className="flex justify-between border-b border-slate-200/40 pb-1">
            <span>Vosk Speech Recognition indexing weights:</span>
            <span className="font-bold">52 MB</span>
          </div>
          <div className="flex justify-between">
            <span>EasyOCR English/Hindi detection:</span>
            <span className="font-bold">18 MB</span>
          </div>
        </div>

        <div className="text-center text-[9.5px] text-slate-400 leading-relaxed px-4 pt-3 border-t border-slate-100">
          <p>{currentT.aboutText}</p>
          <button onClick={onResetLanguage} className="mt-2 text-[#E53935] font-bold underline cursor-pointer block mx-auto">Switch Language Setup</button>
        </div>
      </div>
    </div>
  );

  const renderMedical = () => (
    <MedicalEmergency 
      language={language}
      onBack={() => setActiveTab('home')}
      onOpenSOS={onOpenSOS}
      onOpenCPR={() => setCprModalOpen(true)}
      onOpenFirstAid={(tab) => setFirstAidModalTab(tab || 'burns')}
      onOpenVoiceChat={(prompt) => {
        setActiveTab('ai_assistant');
        if (prompt) {
          setTimeout(() => handleAIPrompt(prompt), 100);
        }
      }}
      onPlayAudio={(audioLang) => {
        setVoiceGuidanceActive(!voiceGuidanceActive);
        if (!voiceGuidanceActive && 'speechSynthesis' in window) {
          const speechText = audioLang === 'en' 
            ? "Emergency audio guidance active. Check your surrounding safety, stay low, and call ambulance if needed." 
            : "आपातकालीन ऑडियो मार्गदर्शन सक्रिय है। अपने आस-पास की सुरक्षा की जांच करें, नीचे झुकें और जरूरत पड़ने पर एम्बुलेंस को कॉल करें।";
          const speech = new SpeechSynthesisUtterance(speechText);
          speech.rate = speechRate;
          speech.lang = audioLang === 'en' ? 'en-US' : 'hi-IN';
          window.speechSynthesis.speak(speech);
        }
      }}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />
  );

  const renderDisasterSafety = () => (
    <DisasterSafety
      language={language}
      onBack={() => setActiveTab('home')}
      onOpenSOS={onOpenSOS}
      onOpenDisasterGuide={(tab) => setDisasterModalTab(tab || 'earthquake')}
      onNavigateToMaps={() => setActiveTab('maps')}
      onNavigateToContacts={() => setActiveTab('contacts')}
    />
  );

  const renderAIAssistancePage = () => (
    <AIAssistancePage
      language={language}
      onBack={() => setActiveTab('home')}
      onOpenSOS={onOpenSOS}
      onNavigateToChat={() => setActiveTab('ai_assistant')}
      onNavigateToOCR={() => { setActiveTab('scan'); setScanType('ocr'); }}
      onNavigateToDetection={() => { setActiveTab('scan'); setScanType('detection'); }}
      onNavigateToSettings={() => setActiveTab('settings')}
    />
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return renderHome();
      case 'medical': return renderMedical();
      case 'disaster': return renderDisasterSafety();
      case 'ai_assistance_page': return renderAIAssistancePage();
      case 'ai_assistant': return renderAIAssistant();
      case 'scan': return renderScan();
      case 'maps': return renderMaps();
      case 'contacts': return renderContacts();
      case 'settings': return renderSettings();
      default: return renderHome();
    }
  };

  return (
    <div className={wrapperClasses}>
      {/* Top Header */}
      <header className="sticky top-0 z-30 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 py-3 sm:px-6 shadow-xxs">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-9 h-9 bg-[#E53935] text-white rounded-xl flex items-center justify-center font-bold text-base shadow-sm shadow-[#E53935]/20 shrink-0">R+</div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-[#1E293B] text-base leading-none tracking-tight">{currentT.appName}</h1>
                <span className="bg-[#E53935]/10 text-[#E53935] text-[8px] px-1.5 py-0.5 rounded font-extrabold uppercase">Offline</span>
              </div>
              <p className="text-[9px] text-slate-400 font-semibold mt-0.5">{currentT.logoSub}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setLanguage(prev => prev === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[10px] font-bold text-slate-700 transition-all cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#1565C0]" />
              <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className="p-1.5 hover:bg-slate-100 rounded-full border border-slate-200 text-slate-500 cursor-pointer">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#E53935] rounded-full"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-3.5 animate-slide-up text-left">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-2">
                    <h4 className="font-bold text-xs text-slate-800">{currentT.notificationTitle}</h4>
                    <button onClick={() => setShowNotifications(false)} className="text-[10px] text-slate-400 font-bold hover:text-slate-650 cursor-pointer">✕</button>
                  </div>
                  <div className="space-y-2.5">
                    {notifications.map((n, idx) => (
                      <div key={idx} className="text-[10.5px] border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                        <p className="font-bold text-slate-700">{n.title}</p>
                        <span className="text-[9px] text-slate-400">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button onClick={() => setActiveTab('settings')} className={`p-1.5 rounded-full border text-slate-500 cursor-pointer ${activeTab === 'settings' ? 'bg-slate-150' : 'border-slate-200'}`}>
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Render Main Content */}
      <main className="max-w-5xl w-full mx-auto p-4 sm:p-6">
        {renderContent()}
      </main>

      {/* FLOATING RED SOS BUTTON */}
      <button 
        onClick={onOpenSOS}
        className="fixed bottom-24 right-6 sm:bottom-28 sm:right-8 z-40 bg-[#E53935] hover:bg-[#D32F2F] text-white flex items-center gap-2 px-5 py-3.5 rounded-full font-extrabold text-xs shadow-lg shadow-[#E53935]/20 transition-all cursor-pointer select-none active:scale-95 duration-100"
        style={{ animation: 'soft-pulse 2s infinite ease-in-out' }}
      >
        <ShieldAlert className="w-4.5 h-4.5 animate-bounce" />
        <span>{currentT.sosBtn}</span>
      </button>

      {/* FLOATING GLASS BOTTOM NAVIGATION BAR */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-lg z-40 py-2 px-3 rounded-full glass-nav flex items-center justify-between shadow-md">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center justify-center p-1.5 rounded-xl w-12 cursor-pointer transition-all ${activeTab === 'home' ? 'text-[#E53935] scale-105 font-bold' : 'text-slate-450 hover:text-slate-800'}`}>
          <Home className="w-4.5 h-4.5" />
          <span className="text-[9px] mt-0.5">{currentT.home}</span>
        </button>

        <button onClick={() => setActiveTab('medical')} className={`flex flex-col items-center justify-center p-1.5 rounded-xl w-14 cursor-pointer transition-all ${activeTab === 'medical' ? 'text-[#E53935] scale-105 font-bold' : 'text-slate-450 hover:text-slate-800'}`}>
          <Activity className="w-4.5 h-4.5" />
          <span className="text-[9px] mt-0.5">Medical</span>
        </button>

        <button onClick={() => setActiveTab('ai_assistant')} className={`flex flex-col items-center justify-center p-1.5 rounded-xl w-14 cursor-pointer transition-all ${activeTab === 'ai_assistant' ? 'text-indigo-650 scale-105 font-bold' : 'text-slate-450 hover:text-slate-800'}`}>
          <MessageSquare className="w-4.5 h-4.5" />
          <span className="text-[9px] mt-0.5">AI Assist</span>
        </button>

        <button onClick={() => setActiveTab('scan')} className={`flex flex-col items-center justify-center p-1.5 rounded-xl w-12 cursor-pointer transition-all ${activeTab === 'scan' ? 'text-cyan-655 scale-105 font-bold' : 'text-slate-450 hover:text-slate-800'}`}>
          <Eye className="w-4.5 h-4.5" />
          <span className="text-[9px] mt-0.5">{currentT.scan}</span>
        </button>

        <button onClick={() => setActiveTab('contacts')} className={`flex flex-col items-center justify-center p-1.5 rounded-xl w-12 cursor-pointer transition-all ${activeTab === 'contacts' ? 'text-[#E53935] scale-105 font-bold' : 'text-slate-450 hover:text-slate-800'}`}>
          <Phone className="w-4.5 h-4.5" />
          <span className="text-[9px] mt-0.5">{currentT.contacts}</span>
        </button>
      </nav>

      {/* CPR STEP-BY-STEP MODAL */}
      {cprModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xxs flex items-center justify-center z-50 p-4 animate-fade-in text-left">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-xl border border-slate-100 flex flex-col max-h-[90vh]">
            <div className="bg-red-50 border-b border-red-100 p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E53935] text-white flex items-center justify-center">
                  <Heart className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-xs">{currentT.cprInstructions}</h3>
                  <p className="text-[9px] text-[#E53935] font-bold">100-120 Compress / Min</p>
                </div>
              </div>
              <button onClick={() => { setCprModalOpen(false); setCprBeatsActive(false); setCprCount(0); }} className="text-slate-400 hover:text-slate-600 font-extrabold text-xs cursor-pointer">✕</button>
            </div>

            <div className="flex-1 p-5 overflow-y-auto space-y-4 text-slate-700">
              <div className="space-y-2 text-[11px] leading-relaxed">
                <p className="font-bold text-[#E53935]">{currentT.cprStep1}</p>
                <p>{currentT.cprStep2}</p>
                <p>{currentT.cprStep3}</p>
                <p className="font-semibold text-slate-850">{currentT.cprStep4}</p>
                <p>{currentT.cprStep5}</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3.5">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-slate-850">CPR Compression Metronome</h4>
                    <p className="text-[9px] text-slate-450 mt-0.5">Compress rhythmically with the pulsing circle</p>
                  </div>
                  <button onClick={() => setCprBeatsActive(!cprBeatsActive)} className={`px-3 py-1.5 rounded-xl font-bold text-[10px] transition-colors cursor-pointer ${cprBeatsActive ? 'bg-[#E53935] text-white animate-soft-pulse' : 'bg-slate-200 text-slate-700'}`}>
                    {cprBeatsActive ? 'Stop Beats' : 'Start Beats'}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-6 py-3 bg-white rounded-xl border border-slate-150">
                  <div className={`w-12 h-12 rounded-full bg-[#E53935]/15 border border-[#E53935] flex items-center justify-center transition-all ${cprBeatsActive ? 'animate-cpr-compress' : ''}`}>
                    <Heart className="w-5 h-5 text-[#E53935]" fill="#E53935" />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">{currentT.cprCounterText}</span>
                    <p className="font-mono text-xl font-extrabold text-slate-800">{cprCount}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border-t border-slate-100 p-4 flex justify-end shrink-0">
              <button onClick={() => { setCprModalOpen(false); setCprBeatsActive(false); setCprCount(0); }} className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-[10px] cursor-pointer">Got it</button>
            </div>
          </div>
        </div>
      )}

      {/* FIRST AID PROCEDURES MODAL */}
      {firstAidModalTab && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xxs flex items-center justify-center z-50 p-4 animate-fade-in text-left">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-xl border border-slate-100 flex flex-col max-h-[85vh]">
            <div className="bg-blue-50 border-b border-blue-100 p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#1565C0] text-white flex items-center justify-center shrink-0">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-xs">{currentT.firstAidTitle}</h3>
                  <p className="text-[9px] text-[#1565C0] font-bold">Offline Reference Procedures</p>
                </div>
              </div>
              <button onClick={() => setFirstAidModalTab(null)} className="text-slate-400 hover:text-slate-650 font-extrabold text-xs cursor-pointer">✕</button>
            </div>

            <div className="bg-slate-50 border-b border-slate-150 flex px-3 overflow-x-auto shrink-0 no-scrollbar text-[10px] font-bold py-1.5 gap-1">
              {[
                { key: 'burns', name: language === 'en' ? '🔥 Burns' : '🔥 जलन' },
                { key: 'bleeding', name: language === 'en' ? '🩸 Bleeding' : '🩸 रक्तस्राव' },
                { key: 'fracture', name: language === 'en' ? '🦴 Fracture' : '🦴 फ्रैक्चर' },
                { key: 'choking', name: language === 'en' ? '🗣 Choking' : '🗣 दम घुटना' },
                { key: 'snake_bite', name: language === 'en' ? '🐍 Snake Bite' : '🐍 सर्पदंश' }
              ].map((tTab) => (
                <button key={tTab.key} onClick={() => setFirstAidModalTab(tTab.key)} className={`px-3 py-1 rounded-lg transition-colors cursor-pointer shrink-0 ${firstAidModalTab === tTab.key ? 'bg-[#1565C0] text-white' : 'text-slate-500 hover:bg-slate-200'}`}>{tTab.name}</button>
              ))}
            </div>

            <div className="flex-1 p-5 overflow-y-auto space-y-3.5">
              {firstAidModalTab === 'burns' && (
                <div className="space-y-3 text-[11px] text-slate-600 leading-relaxed font-sans">
                  <h4 className="font-extrabold text-slate-800 text-xs">Burns Treatment</h4>
                  <div className="p-2.5 bg-blue-50/50 border border-blue-100 rounded-xl text-[#1565C0] font-bold">Do NOT apply butter or ice. Cool water only.</div>
                  <ol className="list-decimal pl-4 space-y-1.5">
                    <li><strong>Cool Area:</strong> Run cool water over burn for 10-20 minutes.</li>
                    <li><strong>Remove Constraints:</strong> Gently slip off rings/bands before swelling.</li>
                    <li><strong>Cover Loosely:</strong> Drape sterile gauze or cling wrap loosely.</li>
                  </ol>
                </div>
              )}
              {firstAidModalTab === 'bleeding' && (
                <div className="space-y-3 text-[11px] text-slate-600 leading-relaxed font-sans">
                  <h4 className="font-extrabold text-slate-800 text-xs">Bleeding Control</h4>
                  <div className="p-2.5 bg-red-50/50 border border-red-100 rounded-xl text-[#E53935] font-bold">Apply firm, direct pressure without stopping.</div>
                  <ol className="list-decimal pl-4 space-y-1.5">
                    <li><strong>Press Hard:</strong> Place clean cloth on wound and push firmly.</li>
                    <li><strong>Elevate:</strong> Lift limb above heart level.</li>
                    <li><strong>Wrap:</strong> Bandage firmly. Layer new cloths over if blood leaks through.</li>
                  </ol>
                </div>
              )}
              {firstAidModalTab === 'fracture' && (
                <div className="space-y-3 text-[11px] text-slate-600 leading-relaxed font-sans">
                  <h4 className="font-extrabold text-slate-800 text-xs">Fracture Care</h4>
                  <div className="p-2.5 bg-amber-50/50 border border-amber-100 rounded-xl text-[#FB8C00] font-bold">Do NOT try to push bones back. Keep still.</div>
                  <ol className="list-decimal pl-4 space-y-1.5">
                    <li><strong>Support:</strong> Hold limb in place found. Do not move.</li>
                    <li><strong>Splint:</strong> Secure soft padding and rigid board along bone.</li>
                    <li><strong>Cool:</strong> Use icepack over cloth to drop swelling.</li>
                  </ol>
                </div>
              )}
              {firstAidModalTab === 'choking' && (
                <div className="space-y-3 text-[11px] text-slate-600 leading-relaxed font-sans">
                  <h4 className="font-extrabold text-slate-800 text-xs">Choking (Heimlich)</h4>
                  <div className="p-2.5 bg-red-50/50 border border-red-100 rounded-xl text-[#E53935] font-bold">Perform back blows & abdominal thrusts.</div>
                  <ol className="list-decimal pl-4 space-y-1.5">
                    <li><strong>5 Back Blows:</strong> Strike firmly between shoulder blades with palm heel.</li>
                    <li><strong>5 Thrusts:</strong> Fist above navel, pull in & up quickly.</li>
                    <li><strong>Repeat:</strong> Cycle until blockage clears.</li>
                  </ol>
                </div>
              )}
              {firstAidModalTab === 'snake_bite' && (
                <div className="space-y-3 text-[11px] text-slate-600 leading-relaxed font-sans">
                  <h4 className="font-extrabold text-slate-800 text-xs">Snake Bite</h4>
                  <div className="p-2.5 bg-amber-50/50 border border-amber-100 rounded-xl text-[#FB8C00] font-bold">Do NOT cut wound or suck venom. Stay calm.</div>
                  <ol className="list-decimal pl-4 space-y-1.5">
                    <li><strong>Stay Still:</strong> Prevent movement. Keep bite below heart level.</li>
                    <li><strong>Bandage:</strong> Bind limb with elastic wrap to limit venom spread.</li>
                    <li><strong>Transport:</strong> Move to clinic with Anti-Snake Venom immediately.</li>
                  </ol>
                </div>
              )}
            </div>

            <div className="bg-slate-50 border-t border-slate-100 p-4 flex justify-end shrink-0">
              <button onClick={() => setFirstAidModalTab(null)} className="px-4 py-2 bg-slate-800 text-white rounded-xl font-bold text-[10px] cursor-pointer">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* DISASTER SAFETY CHECKLISTS MODAL */}
      {disasterModalTab && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xxs flex items-center justify-center z-50 p-4 animate-fade-in text-left">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-xl border border-slate-100 flex flex-col max-h-[85vh]">
            <div className="bg-emerald-50 border-b border-emerald-100 p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#2E7D32] text-white flex items-center justify-center shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-xs">{currentT.disasterGuideTitle}</h3>
                  <p className="text-[9px] text-[#2E7D32] font-bold">Offline Disaster Safety Checklists</p>
                </div>
              </div>
              <button onClick={() => setDisasterModalTab(null)} className="text-slate-400 hover:text-slate-650 font-extrabold text-xs cursor-pointer">✕</button>
            </div>

            <div className="bg-slate-50 border-b border-slate-150 flex px-3 overflow-x-auto shrink-0 no-scrollbar text-[10px] font-bold py-1.5 gap-1">
              {[
                { key: 'earthquake', name: language === 'en' ? '🌍 Earthquake' : '🌍 भूकंप' },
                { key: 'flood', name: language === 'en' ? '🌊 Flood' : '🌊 बाढ़' },
                { key: 'fire', name: language === 'en' ? '🔥 Fire' : '🔥 आग' },
                { key: 'cyclone', name: language === 'en' ? '🌀 Cyclone' : '🌀 चक्रवात' },
                { key: 'heatwave', name: language === 'en' ? '☀️ Heatwave' : '☀️ लू' },
                { key: 'lightning', name: language === 'en' ? '⚡ Lightning' : '⚡ बिजली' }
              ].map((dTab) => (
                <button key={dTab.key} onClick={() => setDisasterModalTab(dTab.key)} className={`px-3 py-1 rounded-lg transition-colors cursor-pointer shrink-0 ${disasterModalTab === dTab.key ? 'bg-[#2E7D32] text-white' : 'text-slate-550 hover:bg-slate-200'}`}>{dTab.name}</button>
              ))}
            </div>

            <div className="flex-1 p-5 overflow-y-auto space-y-3.5">
              {disasterModalTab === 'earthquake' && (
                <div className="space-y-3 text-[11px] text-slate-600 leading-relaxed font-sans">
                  <h4 className="font-extrabold text-slate-850 text-xs">Earthquake Checklists</h4>
                  <ul className="list-disc pl-4 space-y-1.5">
                    <li><strong>Drop, Cover, Hold:</strong> Crawl under a sturdy table/desk and cover head.</li>
                    <li><strong>Stay Inside:</strong> Stay clear of exterior walls and window glass.</li>
                    <li><strong>Post-Quake:</strong> Shut off water/gas mains. Evacuate to assembly zones.</li>
                  </ul>
                </div>
              )}
              {disasterModalTab === 'flood' && (
                <div className="space-y-3 text-[11px] text-slate-600 leading-relaxed font-sans">
                  <h4 className="font-extrabold text-slate-850 text-xs">Flood Safety</h4>
                  <ul className="list-disc pl-4 space-y-1.5">
                    <li><strong>Move High:</strong> Relocate instantly to upper levels or elevated zones.</li>
                    <li><strong>Shut Off Power:</strong> Switch off main electricity blocks before flooding hits.</li>
                    <li><strong>ORS & Water:</strong> Avoid tap water; consume boiled or bottled supplies only.</li>
                  </ul>
                </div>
              )}
              {disasterModalTab === 'fire' && (
                <div className="space-y-3 text-[11px] text-slate-600 leading-relaxed font-sans">
                  <h4 className="font-extrabold text-slate-850 text-xs">Fire Escape Directives</h4>
                  <ul className="list-disc pl-4 space-y-1.5">
                    <li><strong>Crawl Low:</strong> Keep face close to floor to dodge hot smoke.</li>
                    <li><strong>Feel Doors:</strong> back-touch door handles; if hot, keep closed.</li>
                    <li><strong>Stop, Drop, Roll:</strong> If clothing catches fire, roll flat on ground.</li>
                  </ul>
                </div>
              )}
              {disasterModalTab === 'cyclone' && (
                <div className="space-y-3 text-[11px] text-slate-600 leading-relaxed font-sans">
                  <h4 className="font-extrabold text-slate-850 text-xs">Cyclone Protection</h4>
                  <ul className="list-disc pl-4 space-y-1.5">
                    <li><strong>Safe Room:</strong> Stay in internal rooms without windows.</li>
                    <li><strong>Eye of Storm:</strong> Do NOT step out when wind drops; storm will surge back.</li>
                    <li><strong>Secure Yard:</strong> Store loose objects indoors.</li>
                  </ul>
                </div>
              )}
              {disasterModalTab === 'heatwave' && (
                <div className="space-y-3 text-[11px] text-slate-600 leading-relaxed font-sans">
                  <h4 className="font-extrabold text-slate-850 text-xs">Heatwave Safety</h4>
                  <ul className="list-disc pl-4 space-y-1.5">
                    <li><strong>Sun Avoidance:</strong> Avoid going outdoors from 11 AM to 4 PM.</li>
                    <li><strong>Hydration:</strong> Drink sugar-salt water and ORS.</li>
                    <li><strong>Clothing:</strong> Wear light loose cotton shirts.</li>
                  </ul>
                </div>
              )}
              {disasterModalTab === 'lightning' && (
                <div className="space-y-3 text-[11px] text-slate-600 leading-relaxed font-sans">
                  <h4 className="font-extrabold text-slate-850 text-xs">Lightning Safety</h4>
                  <ul className="list-disc pl-4 space-y-1.5">
                    <li><strong>Shelter:</strong> Go inside concrete buildings or cars immediately.</li>
                    <li><strong>Crouch:</strong> If caught in open field: tuck head, heels touching.</li>
                    <li><strong>Electronics:</strong> Unplug television and computers. Avoid running water.</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="bg-slate-50 border-t border-slate-100 p-4 flex justify-end shrink-0">
              <button onClick={() => setDisasterModalTab(null)} className="px-4 py-2 bg-slate-800 text-white rounded-xl font-bold text-[10px] cursor-pointer">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
