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
      <section className="bg-gradient-to-br from-[#EEF2FF] via-white to-[#E0E7FF] rounded-3xl border border-slate-100 p-6 md:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden text-left">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-lg space-y-4 md:space-y-5 z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-xxs">
            <span className="w-2 h-2 rounded-full bg-indigo-650 animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-wider">{t.offlineReady}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight">
            {t.heroHeading}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            {t.heroSubtitle}
          </p>

          <div className="inline-flex items-center gap-2 text-[11px] font-bold text-slate-400 bg-white border border-slate-150 rounded-xl px-3.5 py-2 shadow-xxs">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            <span>{t.offlineReadyDesc}</span>
          </div>
        </div>

        {/* Vector SVG Illustration */}
        <div className="w-full max-w-[280px] md:max-w-[340px] shrink-0 z-10">
          <svg className="w-full h-auto" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="75" r="55" fill="#4F46E5" fillOpacity="0.08" />
            <circle cx="100" cy="75" r="45" fill="#4F46E5" fillOpacity="0.12" />
            <path d="M100 40c-19.3 0-35 15.7-35 35 0 14.3 8.6 26.6 21 31.9v8.1c0 2.2 1.8 4 4 4h20c2.2 0 4-1.8 4-4v-8.1c12.4-5.3 21-17.6 21-31.9 0-19.3-15.7-35-35-35zm-8 40a8 8 0 1 1 16 0 8 8 0 0 1-16 0z" fill="#4F46E5" />
            <circle cx="100" cy="80" r="3" fill="#FFFFFF" />
          </svg>
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
