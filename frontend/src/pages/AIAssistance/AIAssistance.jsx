import React from 'react';
import { 
  ArrowLeft, Bot, MessageSquare, Eye, Camera, Settings, 
  ChevronRight, ShieldAlert, Check, Phone
} from 'lucide-react';

export default function AIAssistance({ 
  language, 
  onBack, 
  onOpenSOS, 
  onNavigateToChat, 
  onNavigateToOCR, 
  onNavigateToDetection, 
  onNavigateToSettings 
}) {
  // Localized strings
  const strings = {
    en: {
      title: "AI Assistance",
      heroHeading: "AI Emergency Assistance",
      heroSubtitle: "Access intelligent offline support tools including AI Chat, OCR Scanner, and Object Detection.",
      offlineReady: "Offline AI Active",
      offlineReadyDesc: "All AI models execute 100% locally on your device",
      chatTitle: "AI Chatbot",
      chatDesc: "Interactive chat with the offline llama assistant for safety guidelines.",
      chatBtn: "Open AI Chatbot",
      ocrTitle: "OCR Scanner",
      ocrDesc: "Extract text from notice boards, prescriptions, and signs locally.",
      ocrBtn: "Open OCR Scanner",
      detectionTitle: "Object Detection",
      detectionDesc: "Use safety vision intelligence to locate extinguishers, exits, and aid kits.",
      detectionBtn: "Open Object Detection",
      settingsTitle: "Settings",
      settingsDesc: "Adjust local voice engines, accessibility fonts, and language preferences.",
      settingsBtn: "Configure Settings",
      quickActionsTitle: "Quick Emergency Actions",
      ambulance: "Ambulance",
      natEmergency: "National Emergency",
      police: "Police",
      fire: "Fire Brigade",
      callNow: "Call Now",
      safetyTipTitle: "Today's AI Safety Tip",
      safetyTipText: "You can point the Object Detection camera at any wall to identify the nearest Fire Extinguisher or Exit Sign."
    },
    hi: {
      title: "एआई सहायता",
      heroHeading: "एआई आपातकालीन सहायता",
      heroSubtitle: "बुद्धिमान ऑफलाइन सहायता टूल का उपयोग करें, जिसमें एआई चैट, ओसीआर स्कैनर और ऑब्जेक्ट डिटेक्शन शामिल हैं।",
      offlineReady: "ऑफलाइन एआई सक्रिय",
      offlineReadyDesc: "सभी एआई मॉडल आपके डिवाइस पर 100% स्थानीय रूप से चलते हैं",
      chatTitle: "एआई चैटबॉट",
      chatDesc: "सुरक्षा दिशानिर्देशों के लिए ऑफलाइन लामा असिस्टेंट के साथ इंटरैक्टिव चैट।",
      chatBtn: "एआई चैटबॉट खोलें",
      ocrTitle: "ओसीआर स्कैनर",
      ocrDesc: "सूचना बोर्डों, पर्चे और संकेतों से स्थानीय रूप से पाठ निकालें।",
      ocrBtn: "ओसीआर स्कैनर खोलें",
      detectionTitle: "ऑब्जेक्ट डिटेक्शन",
      detectionDesc: "अग्निशामक यंत्र, निकास द्वार और फर्स्ट एड किट खोजने के लिए विज़न इंटेलिजेंस का उपयोग करें।",
      detectionBtn: "ऑब्जेक्ट डिटेक्शन खोलें",
      settingsTitle: "सेटिंग्स",
      settingsDesc: "स्थानीय वॉयस इंजन, सुगमता फ़ॉन्ट और भाषा प्राथमिकताओं को समायोजित करें।",
      settingsBtn: "सेटिंग्स खोलें",
      quickActionsTitle: "त्वरित आपातकालीन कार्रवाइयां",
      ambulance: "एम्बुलेंस",
      natEmergency: "राष्ट्रीय आपातकाल",
      police: "पुलिस",
      fire: "फायर ब्रिगेड",
      callNow: "कॉल करें",
      safetyTipTitle: "आज की एआई सुरक्षा टिप",
      safetyTipText: "आप निकटतम अग्निशामक यंत्र या निकास द्वार की पहचान करने के लिए ऑब्जेक्ट डिटेक्शन कैमरा को किसी भी दीवार पर घुमा सकते हैं।"
    }
  };

  const t = strings[language] || strings.en;

  const chatFeatures = language === 'en'
    ? ["Llama 3-3B quantized", "Zero data usage", "First-aid procedures", "Disaster guidelines"]
    : ["लामा 3-3B क्वांटाइज्ड", "जीरो डेटा उपयोग", "प्राथमिक उपचार गाइड", "आपदा दिशानिर्देश"];

  const ocrFeatures = language === 'en'
    ? ["Prescription Labels", "Medicine Names", "Medical Advisories", "Notice Readers"]
    : ["दवा पर्चे लेबल", "दवाओं के नाम", "चिकित्सा सलाह", "सूचना पाठक"];

  const detectionFeatures = language === 'en'
    ? ["Fire Extinguishers", "First Aid Kits", "Emergency Exit Signs", "Real-time overlay"]
    : ["अग्निशामक यंत्र", "फर्स्ट एड किट", "आपातकालीन निकास संकेत", "रियल-टाइम ओवरले"];

  const settingsFeatures = language === 'en'
    ? ["Accessibility fonts", "Contrast settings", "Speech rate settings", "Language Switch"]
    : ["पहुंच-योग्यता फ़ॉन्ट", "कंट्रास्ट सेटिंग्स", "भाषण दर सेटिंग्स", "भाषा स्विच"];

  return (
    <div className="space-y-8 animate-fade-in text-[#1E293B] max-w-5xl mx-auto">
      
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-2">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-700 flex items-center justify-center hover:bg-slate-50 hover:border-slate-350 hover:shadow-xs transition-all cursor-pointer"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#E53935] text-white rounded-xl flex items-center justify-center font-bold text-base shadow-sm shrink-0">
              R+
            </div>
            <div className="text-left">
              <h2 className="font-extrabold text-base leading-none text-slate-800">RescueAI</h2>
              <span className="text-[9px] font-bold text-[#E53935] uppercase tracking-wider block mt-0.5">Offline Emergency Assistant</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="hidden md:block font-extrabold text-lg text-slate-800 tracking-tight">
          {t.title}
        </h2>

        {/* SOS Button */}
        <div className="flex items-center gap-2">
          <button 
            onClick={onOpenSOS}
            className="w-10 h-10 bg-[#E53935] hover:bg-[#D32F2F] text-white rounded-full flex items-center justify-center font-bold text-xs shadow-md shadow-[#E53935]/25 hover:shadow-lg transition-all animate-soft-pulse cursor-pointer border border-red-400/20"
            title="SOS Trigger"
          >
            SOS
          </button>
        </div>
      </div>

      {/* HERO BANNER SECTION */}
      <section className="bg-gradient-to-br from-[#FFFFFF] via-[#F8FAFC] to-[#F4F8FF] rounded-[32px] border border-slate-100 p-6 md:p-10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 relative overflow-hidden text-left min-h-[420px]">
        
        {/* Modern Dashboard Background Details */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          {/* Light Dotted World Map style grid */}
          <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-[0.04] text-blue-500" viewBox="0 0 1000 500" fill="none">
            {Array.from({ length: 15 }).map((_, i) => (
              <circle key={`c1-${i}`} cx={100 + i * 60} cy={100 + Math.sin(i) * 50} r="1.5" fill="currentColor" />
            ))}
            {Array.from({ length: 15 }).map((_, i) => (
              <circle key={`c2-${i}`} cx={80 + i * 60} cy={200 + Math.cos(i) * 40} r="1.5" fill="currentColor" />
            ))}
            {Array.from({ length: 15 }).map((_, i) => (
              <circle key={`c3-${i}`} cx={120 + i * 60} cy={300 + Math.sin(i + 1) * 60} r="1.5" fill="currentColor" />
            ))}
            {Array.from({ length: 15 }).map((_, i) => (
              <circle key={`c4-${i}`} cx={140 + i * 60} cy={400 + Math.cos(i + 2) * 50} r="1.5" fill="currentColor" />
            ))}
            <path d="M150,120 Q300,80 500,180 T800,220" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" />
            <path d="M100,250 Q400,320 600,150 T900,350" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" />
          </svg>

          {/* Small heartbeat ECG waveform */}
          <svg className="absolute bottom-4 left-8 w-48 h-12 text-[#2563EB] opacity-[0.08]" viewBox="0 0 100 30" fill="none">
            <path d="M0,15 L25,15 L28,5 L32,25 L35,15 L40,15 L42,10 L44,20 L46,15 L100,15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          {/* Thin glowing connection lines */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.06] text-blue-500" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="10" y1="20" x2="90" y2="20" stroke="currentColor" strokeWidth="0.5" />
            <line x1="10" y1="80" x2="90" y2="80" stroke="currentColor" strokeWidth="0.5" />
            <line x1="20" y1="10" x2="20" y2="90" stroke="currentColor" strokeWidth="0.5" />
          </svg>

          {/* Floating medical plus symbols */}
          <div className="absolute top-8 left-[15%] text-blue-500 font-bold text-lg opacity-[0.08] animate-pulse">+</div>
          <div className="absolute top-1/4 right-[25%] text-blue-500 font-bold text-xl opacity-[0.06] animate-pulse" style={{ animationDelay: '1s' }}>+</div>
          <div className="absolute bottom-1/3 left-[40%] text-blue-500 font-bold text-sm opacity-[0.07] animate-pulse" style={{ animationDelay: '2s' }}>+</div>
          <div className="absolute bottom-8 right-[10%] text-blue-500 font-bold text-lg opacity-[0.08] animate-pulse" style={{ animationDelay: '1.5s' }}>+</div>
        </div>

        {/* Content Area (Left side) */}
        <div className="max-w-lg space-y-5 md:space-y-6 z-10 flex flex-col items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-55 text-[#2563EB] border border-blue-100 shadow-xxs">
            <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-wider">{t.offlineReady}</span>
          </div>
          
          <div className="space-y-2">
            {language === 'en' ? (
              <h2 className="text-4xl sm:text-5xl font-black text-slate-800 tracking-tight leading-tight">
                AI Emergency <span className="bg-gradient-to-r from-[#2563EB] to-[#3B82F6] bg-clip-text text-transparent">Assistance</span>
              </h2>
            ) : (
              <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight leading-tight">
                {t.heroHeading}
              </h2>
            )}
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-md">
              {t.heroSubtitle}
            </p>
          </div>

          {/* Frosted glass 100% Local AI information card */}
          <div className="flex items-center gap-3 text-[11.5px] font-bold text-slate-500 bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl p-3 shadow-xxs max-w-sm">
            <div className="w-8 h-8 bg-blue-500/10 text-[#2563EB] rounded-xl flex items-center justify-center shrink-0 shadow-xxs">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span>{t.offlineReadyDesc}</span>
          </div>

          {/* Quick Action grid buttons */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-md pt-2">
            <button 
              onClick={onNavigateToChat}
              className="h-11 px-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#3B82F6] hover:brightness-110 text-white font-extrabold text-xs transition-all shadow-md shadow-blue-500/10 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>💬</span>
              <span>AI Chat</span>
            </button>
            <button 
              onClick={onNavigateToOCR}
              className="h-11 px-4 rounded-xl bg-white/70 backdrop-blur-md border border-slate-100 hover:border-slate-350 hover:bg-white text-slate-700 font-extrabold text-xs transition-all shadow-xxs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="text-emerald-500">📄</span>
              <span>OCR Scanner</span>
            </button>
            <button 
              onClick={onNavigateToDetection}
              className="h-11 px-4 rounded-xl bg-white/70 backdrop-blur-md border border-slate-100 hover:border-slate-350 hover:bg-white text-slate-700 font-extrabold text-xs transition-all shadow-xxs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="text-purple-500">🧊</span>
              <span>Object Detection</span>
            </button>
            <button 
              onClick={onNavigateToSettings}
              className="h-11 px-4 rounded-xl bg-white/70 backdrop-blur-md border border-slate-100 hover:border-slate-350 hover:bg-white text-slate-700 font-extrabold text-xs transition-all shadow-xxs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="text-amber-500">🎤</span>
              <span>Voice Assist</span>
            </button>
          </div>
        </div>

        {/* Robot Area (Right side) */}
        <div className="relative w-full max-w-[320px] md:max-w-[400px] h-[320px] flex items-center justify-center shrink-0 z-10 select-none">
          
          {/* Circular HUD rings under/behind the robot */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[280px] h-[280px] rounded-full border border-blue-500/10 absolute animate-[spin_40s_linear_infinite]"></div>
            <div className="w-[220px] h-[220px] rounded-full border border-dashed border-blue-500/15 absolute animate-[spin_20s_linear_infinite_reverse]"></div>
            <div className="w-[160px] h-[160px] rounded-full border border-blue-500/10 absolute"></div>
            {/* Soft blue radial glow */}
            <div className="w-[180px] h-[180px] bg-[#60A5FA]/15 rounded-full blur-2xl absolute"></div>
          </div>

          {/* Large translucent medical shield behind the robot */}
          <svg className="absolute w-[220px] h-[220px] text-blue-500/10 opacity-[0.6] pointer-events-none z-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>

          {/* Floating light particles */}
          <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-30 animate-ping"></div>
          <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-blue-300 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-indigo-400 rounded-full opacity-50 animate-ping" style={{ animationDelay: '1.2s' }}></div>

          {/* Holographic lighting glow */}
          <div className="absolute bottom-[20%] w-[120px] h-[10px] bg-[#60A5FA]/30 rounded-full blur-xs pointer-events-none transform -skew-x-12 animate-pulse"></div>

          {/* SVG Dotted connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="20" y1="20" x2="50" y2="50" stroke="#2563EB" strokeWidth="0.6" strokeDasharray="2 2" />
            <line x1="20" y1="80" x2="50" y2="50" stroke="#10B981" strokeWidth="0.6" strokeDasharray="2 2" />
            <line x1="80" y1="20" x2="50" y2="50" stroke="#8B5CF6" strokeWidth="0.6" strokeDasharray="2 2" />
            <line x1="80" y1="80" x2="50" y2="50" stroke="#F59E0B" strokeWidth="0.6" strokeDasharray="2 2" />
          </svg>

          {/* Floating Circle 1: AI Chat (Top-Left) */}
          <div 
            onClick={onNavigateToChat}
            className="absolute top-[8%] left-[2%] flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-white shadow-md shadow-blue-500/5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer z-20 group"
          >
            <div className="w-6 h-6 rounded-full bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-black text-slate-700 tracking-tight">AI Chat</span>
          </div>

          {/* Floating Circle 2: OCR Scanner (Bottom-Left) */}
          <div 
            onClick={onNavigateToOCR}
            className="absolute bottom-[10%] left-0 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-white shadow-md shadow-emerald-500/5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer z-20 group"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
              <Eye className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-black text-slate-700 tracking-tight">OCR Scanner</span>
          </div>

          {/* Floating Circle 3: Object Detection (Top-Right) */}
          <div 
            onClick={onNavigateToDetection}
            className="absolute top-[12%] right-0 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-white shadow-md shadow-purple-500/5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer z-20 group"
          >
            <div className="w-6 h-6 rounded-full bg-purple-500/10 text-purple-600 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
              <Camera className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-black text-slate-700 tracking-tight">Detection</span>
          </div>

          {/* Floating Circle 4: Voice Assistant (Bottom-Right) */}
          <div 
            onClick={onNavigateToSettings}
            className="absolute bottom-[14%] right-[2%] flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-white shadow-md shadow-amber-500/5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer z-20 group"
          >
            <div className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
              <Bot className="w-3.5 h-3.5" strokeWidth={2.5} />
            </div>
            <span className="text-[10px] font-black text-slate-700 tracking-tight">Voice Assist</span>
          </div>

          {/* Robot SVG itself (Original vector illustration, kept exactly as requested) */}
          <div className="z-10 w-[180px] md:w-[220px] transform hover:scale-[1.02] transition-transform duration-500 drop-shadow-xl">
            <svg className="w-full h-auto" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="75" r="55" fill="#4F46E5" fillOpacity="0.08" />
              <circle cx="100" cy="75" r="45" fill="#4F46E5" fillOpacity="0.12" />
              <path d="M100 40c-19.3 0-35 15.7-35 35 0 14.3 8.6 26.6 21 31.9v8.1c0 2.2 1.8 4 4 4h20c2.2 0 4-1.8 4-4v-8.1c12.4-5.3 21-17.6 21-31.9 0-19.3-15.7-35-35-35zm-8 40a8 8 0 1 1 16 0 8 8 0 0 1-16 0z" fill="#4F46E5" />
              <circle cx="100" cy="80" r="3" fill="#FFFFFF" />
            </svg>
          </div>

        </div>
      </section>

      {/* 4 LARGE PREMIUM FEATURE CARDS GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* CARD 1: AI CHATBOT */}
        <div 
          className="bg-white border border-indigo-100 rounded-[20px] p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-indigo-500/10 hover:border-indigo-300 group cursor-pointer"
          onClick={onNavigateToChat}
        >
          <div className="space-y-4 text-left">
            <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-650 flex items-center justify-center shadow-sm mx-auto group-hover:scale-105 transition-transform duration-300 shrink-0">
              <MessageSquare className="w-8 h-8" />
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="font-bold text-2xl text-indigo-650 tracking-tight">{t.chatTitle}</h3>
              <p className="text-slate-500 text-sm leading-relaxed min-h-[48px] px-1">{t.chatDesc}</p>
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-2.5 text-[11.5px] font-bold text-slate-700 bg-slate-50/50 rounded-xl p-3 border border-slate-100">
              {chatFeatures.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1 text-left">
                  <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-650 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" strokeWidth={3} />
                  </span>
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); onNavigateToChat(); }}
            className="w-full h-[50px] rounded-[14px] mt-6 bg-gradient-to-r from-indigo-500 to-blue-600 hover:brightness-115 text-white font-extrabold text-xs transition-all shadow-md shadow-indigo-500/10 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>{t.chatBtn}</span>
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        </div>

        {/* CARD 2: OCR SCANNER */}
        <div 
          className="bg-white border border-cyan-100 rounded-[20px] p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-cyan-500/10 hover:border-cyan-300 group cursor-pointer"
          onClick={onNavigateToOCR}
        >
          <div className="space-y-4 text-left">
            <div className="w-16 h-16 rounded-full bg-cyan-50 text-cyan-650 flex items-center justify-center shadow-sm mx-auto group-hover:scale-105 transition-transform duration-300 shrink-0">
              <Eye className="w-8 h-8" />
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="font-bold text-2xl text-cyan-650 tracking-tight">{t.ocrTitle}</h3>
              <p className="text-slate-500 text-sm leading-relaxed min-h-[48px] px-1">{t.ocrDesc}</p>
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-2.5 text-[11.5px] font-bold text-slate-700 bg-slate-50/50 rounded-xl p-3 border border-slate-100">
              {ocrFeatures.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1 text-left">
                  <span className="w-4 h-4 rounded-full bg-cyan-100 text-cyan-650 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" strokeWidth={3} />
                  </span>
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); onNavigateToOCR(); }}
            className="w-full h-[50px] rounded-[14px] mt-6 bg-gradient-to-r from-cyan-500 to-teal-500 hover:brightness-115 text-white font-extrabold text-xs transition-all shadow-md shadow-cyan-500/10 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>{t.ocrBtn}</span>
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        </div>

        {/* CARD 3: OBJECT DETECTION */}
        <div 
          className="bg-white border border-teal-100 rounded-[20px] p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-teal-500/10 hover:border-teal-300 group cursor-pointer"
          onClick={onNavigateToDetection}
        >
          <div className="space-y-4 text-left">
            <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-650 flex items-center justify-center shadow-sm mx-auto group-hover:scale-105 transition-transform duration-300 shrink-0">
              <Camera className="w-8 h-8" />
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="font-bold text-2xl text-teal-650 tracking-tight">{t.detectionTitle}</h3>
              <p className="text-slate-500 text-sm leading-relaxed min-h-[48px] px-1">{t.detectionDesc}</p>
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-2.5 text-[11.5px] font-bold text-slate-700 bg-slate-50/50 rounded-xl p-3 border border-slate-100">
              {detectionFeatures.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1 text-left">
                  <span className="w-4 h-4 rounded-full bg-teal-100 text-teal-650 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" strokeWidth={3} />
                  </span>
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); onNavigateToDetection(); }}
            className="w-full h-[50px] rounded-[14px] mt-6 bg-gradient-to-r from-teal-500 to-emerald-600 hover:brightness-115 text-white font-extrabold text-xs transition-all shadow-md shadow-teal-500/10 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>{t.detectionBtn}</span>
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        </div>

        {/* CARD 4: SETTINGS */}
        <div 
          className="bg-white border border-slate-200 rounded-[20px] p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-slate-500/10 hover:border-slate-350 group cursor-pointer"
          onClick={onNavigateToSettings}
        >
          <div className="space-y-4 text-left">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shadow-sm mx-auto group-hover:scale-105 transition-transform duration-300 shrink-0">
              <Settings className="w-8 h-8" />
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="font-bold text-2xl text-slate-800 tracking-tight">{t.settingsTitle}</h3>
              <p className="text-slate-500 text-sm leading-relaxed min-h-[48px] px-1">{t.settingsDesc}</p>
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-2.5 text-[11.5px] font-bold text-slate-700 bg-slate-50/50 rounded-xl p-3 border border-slate-100">
              {settingsFeatures.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1 text-left">
                  <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" strokeWidth={3} />
                  </span>
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); onNavigateToSettings(); }}
            className="w-full h-[50px] rounded-[14px] mt-6 bg-gradient-to-r from-slate-600 to-slate-800 hover:brightness-115 text-white font-extrabold text-xs transition-all shadow-md shadow-slate-500/10 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>{t.settingsBtn}</span>
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        </div>

      </section>

      {/* QUICK ACTIONS ACTION SECTION */}
      <section className="bg-white rounded-3xl border border-slate-150 p-6 shadow-xs space-y-5 text-left">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <span className="w-5 h-5 rounded-full bg-red-100 text-[#E53935] flex items-center justify-center animate-soft-pulse">
            <ShieldAlert className="w-3.5 h-3.5" />
          </span>
          <h3 className="text-lg font-extrabold text-slate-800 tracking-tight">{t.quickActionsTitle}</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {/* Ambulance (108) */}
          <div className="flex flex-col items-center p-5 rounded-2xl border border-slate-150 hover:border-red-200 hover:bg-red-50/10 transition-all text-center group">
            <Phone className="w-8 h-8 text-[#E53935] mb-2" />
            <span className="text-[10px] uppercase font-bold text-slate-400">{t.ambulance}</span>
            <p className="font-extrabold text-slate-800 text-lg mt-0.5 leading-none">108</p>
            <a 
              href="tel:108"
              className="mt-3.5 w-full py-2 bg-[#E53935] hover:bg-[#D32F2F] text-white rounded-xl font-bold text-[10px] flex items-center justify-center gap-1 cursor-pointer transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>{t.callNow}</span>
            </a>
          </div>

          {/* National Emergency (112) */}
          <div className="flex flex-col items-center p-5 rounded-2xl border border-slate-150 hover:border-red-200 hover:bg-red-50/10 transition-all text-center group">
            <Bot className="w-8 h-8 text-indigo-650 mb-2" />
            <span className="text-[10px] uppercase font-bold text-slate-400">{t.natEmergency}</span>
            <p className="font-extrabold text-slate-800 text-lg mt-0.5 leading-none">112</p>
            <a 
              href="tel:112"
              className="mt-3.5 w-full py-2 bg-[#E53935] hover:bg-[#D32F2F] text-white rounded-xl font-bold text-[10px] flex items-center justify-center gap-1 cursor-pointer transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>{t.callNow}</span>
            </a>
          </div>

          {/* Police (100) */}
          <div className="flex flex-col items-center p-5 rounded-2xl border border-slate-150 hover:border-blue-200 hover:bg-blue-50/10 transition-all text-center group">
            <ShieldAlert className="w-8 h-8 text-blue-650 mb-2" />
            <span className="text-[10px] uppercase font-bold text-slate-400">{t.police}</span>
            <p className="font-extrabold text-slate-800 text-lg mt-0.5 leading-none">100</p>
            <a 
              href="tel:100"
              className="mt-3.5 w-full py-2 bg-[#1565C0] hover:bg-[#0D47A1] text-white rounded-xl font-bold text-[10px] flex items-center justify-center gap-1 cursor-pointer transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>{t.callNow}</span>
            </a>
          </div>

          {/* Fire Brigade (101) */}
          <div className="flex flex-col items-center p-5 rounded-2xl border border-slate-150 hover:border-amber-200 hover:bg-amber-50/10 transition-all text-center group">
            <Bot className="w-8 h-8 text-amber-500 mb-2" />
            <span className="text-[10px] uppercase font-bold text-slate-400">{t.fire}</span>
            <p className="font-extrabold text-slate-800 text-lg mt-0.5 leading-none">101</p>
            <a 
              href="tel:101"
              className="mt-3.5 w-full py-2 bg-[#FB8C00] hover:bg-[#E57C00] text-white rounded-xl font-bold text-[10px] flex items-center justify-center gap-1 cursor-pointer transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>{t.callNow}</span>
            </a>
          </div>
        </div>
      </section>

      {/* TODAY'S SAFETY TIP SECTION */}
      <section className="bg-white border border-slate-150 rounded-3xl p-5 md:p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden text-left">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 shadow-xxs">
            <span className="text-xl">💡</span>
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-slate-800 mb-1">{t.safetyTipTitle}</h4>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xl">{t.safetyTipText}</p>
          </div>
        </div>
      </section>

    </div>
  );
}
