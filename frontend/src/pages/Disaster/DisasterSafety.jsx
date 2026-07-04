import React, { useState } from 'react';
import { 
  ArrowLeft, Flame, Map, Phone, Shield, Globe, 
  ChevronRight, ShieldAlert, Check
} from 'lucide-react';

export default function DisasterSafety({ 
  language, 
  onBack, 
  onOpenSOS, 
  onOpenDisasterGuide, 
  onNavigateToMaps, 
  onNavigateToContacts 
}) {
  // Localized strings
  const strings = {
    en: {
      title: "Disaster Safety",
      heroHeading: "Disaster Safety & Support",
      heroSubtitle: "Get instant offline disaster guides, mapping, and emergency contacts.",
      offlineReady: "Offline Ready",
      offlineReadyDesc: "All disaster resources available offline",
      disasterGuideTitle: "Disaster Guide",
      disasterGuideDesc: "Earthquake, Flood, Fire, Cyclone, Heatwave, Lightning.",
      disasterGuideBtn: "Open Disaster Guide",
      mapsTitle: "Offline Maps",
      mapsDesc: "GPS tracker, offline route coordinates, and active compass.",
      mapsBtn: "Open Offline Maps",
      contactsTitle: "Emergency Contacts",
      contactsDesc: "Direct dial emergency numbers and personal rescue contacts.",
      contactsBtn: "Open Contacts",
      quickActionsTitle: "Quick Emergency Actions",
      ambulance: "Ambulance",
      natEmergency: "National Emergency",
      police: "Police",
      fire: "Fire Brigade",
      callNow: "Call Now",
      safetyTipTitle: "Today's Disaster Safety Tip",
      safetyTipText: "During an earthquake: Drop, Cover, and Hold On. Avoid standing near window panes or high shelves."
    },
    hi: {
      title: "आपदा सुरक्षा",
      heroHeading: "आपदा सुरक्षा और सहायता",
      heroSubtitle: "तुरंत ऑफलाइन आपदा गाइड, मानचित्र और आपातकालीन संपर्क प्राप्त करें।",
      offlineReady: "ऑफलाइन तैयार",
      offlineReadyDesc: "सभी आपदा संसाधन ऑफलाइन उपलब्ध हैं",
      disasterGuideTitle: "आपदा गाइड",
      disasterGuideDesc: "भूकंप, बाढ़, आग, चक्रवात, लू, बिजली गिरना।",
      disasterGuideBtn: "आपदा गाइड खोलें",
      mapsTitle: "ऑफलाइन मानचित्र",
      mapsDesc: "जीपीएस ट्रैकर, ऑफलाइन रूट निर्देशांक और सक्रिय कम्पास।",
      mapsBtn: "ऑफलाइन मानचित्र खोलें",
      contactsTitle: "आपातकालीन संपर्क",
      contactsDesc: "त्वरित डायल आपातकालीन नंबर और व्यक्तिगत संपर्क निर्देशिका।",
      contactsBtn: "संपर्क खोलें",
      quickActionsTitle: "त्वरित आपातकालीन कार्रवाइयां",
      ambulance: "एम्बुलेंस",
      natEmergency: "राष्ट्रीय आपातकाल",
      police: "पुलिस",
      fire: "फायर ब्रिगेड",
      callNow: "कॉल करें",
      safetyTipTitle: "आज की आपदा सुरक्षा टिप",
      safetyTipText: "भूकंप के दौरान: झुकें (Drop), ढकें (Cover), और पकड़ कर रखें (Hold On)। शीशे की खिड़कियों या ऊंचे शेल्फ के पास खड़े होने से बचें।"
    }
  };

  const t = strings[language] || strings.en;

  const disasterItems = language === 'en' 
    ? ["Earthquake", "Flood Response", "Fire Evacuation", "Cyclone Shelter", "Heatwave Care", "Lightning Protection"]
    : ["भूकंप उपाय", "बाढ़ प्रतिक्रिया", "अग्नि निकासी", "चक्रवात आश्रय", "लू से बचाव", "बिजली से सुरक्षा"];

  const mapFeatures = language === 'en'
    ? ["GPS Coordinates", "Hospital Layers", "Shelter Layers", "Offline Compass"]
    : ["जीपीएस निर्देशांक", "अस्पताल परतें", "आश्रय परतें", "ऑफलाइन कम्पास"];

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
      <section className="bg-gradient-to-br from-[#ECFDF5] via-white to-[#F0FDF4] rounded-3xl border border-slate-100 p-6 md:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden text-left">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-lg space-y-4 md:space-y-5 z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#2E7D32] border border-emerald-100 shadow-xxs">
            <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-wider">{t.offlineReady}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight">
            {t.heroHeading}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            {t.heroSubtitle}
          </p>

          <div className="inline-flex items-center gap-2 text-[11px] font-bold text-slate-400 bg-white border border-slate-150 rounded-xl px-3.5 py-2 shadow-xxs">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>{t.offlineReadyDesc}</span>
          </div>
        </div>

        {/* Vector SVG Illustration matching design theme */}
        <div className="w-full max-w-[280px] md:max-w-[340px] shrink-0 z-10">
          <svg className="w-full h-auto" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="75" r="55" fill="#10B981" fillOpacity="0.08" />
            <circle cx="100" cy="75" r="45" fill="#10B981" fillOpacity="0.12" />
            <path d="M100 35c-22 0-40 18-40 40 0 16 10 30 25 36l15 19 15-19c15-6 25-20 25-36 0-22-18-40-40-40zm0 18c12 0 22 10 22 22 0 12-10 22-22 22s-22-10-22-22c0-12 10-22 22-22z" fill="#059669" />
            <path d="M100 58l6 12 14 2-10 10 2 14-12-7-12 7 2-14-10-10 14-2 6-12z" fill="#FBBF24" />
          </svg>
        </div>
      </section>

      {/* 3 LARGE PREMIUM FEATURE CARDS GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* CARD 1: DISASTER GUIDE */}
        <div 
          className="bg-white border border-emerald-100 rounded-[20px] p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-emerald-500/10 hover:border-emerald-300 group cursor-pointer"
          onClick={() => onOpenDisasterGuide('earthquake')}
        >
          <div className="space-y-4 text-left">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm mx-auto group-hover:scale-105 transition-transform duration-300 shrink-0">
              <Flame className="w-8 h-8" />
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="font-bold text-2xl text-emerald-600 tracking-tight">{t.disasterGuideTitle}</h3>
              <p className="text-slate-500 text-sm leading-relaxed min-h-[48px] px-1">{t.disasterGuideDesc}</p>
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-2.5 text-[11.5px] font-bold text-slate-700 bg-slate-50/50 rounded-xl p-3 border border-slate-100">
              {disasterItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1 text-left">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" strokeWidth={3} />
                  </span>
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); onOpenDisasterGuide('earthquake'); }}
            className="w-full h-[50px] rounded-[14px] mt-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-115 text-white font-extrabold text-xs transition-all shadow-md shadow-emerald-500/10 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>{t.disasterGuideBtn}</span>
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        </div>

        {/* CARD 2: OFFLINE MAPS */}
        <div 
          className="bg-white border border-blue-100 rounded-[20px] p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-300 group cursor-pointer"
          onClick={onNavigateToMaps}
        >
          <div className="space-y-4 text-left">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm mx-auto group-hover:scale-105 transition-transform duration-300 shrink-0">
              <Map className="w-8 h-8" />
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="font-bold text-2xl text-blue-600 tracking-tight">{t.mapsTitle}</h3>
              <p className="text-slate-500 text-sm leading-relaxed min-h-[48px] px-1">{t.mapsDesc}</p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-2.5 text-[11.5px] font-bold text-slate-700 bg-slate-50/50 rounded-xl p-3 border border-slate-100">
              {mapFeatures.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1 text-left">
                  <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" strokeWidth={3} />
                  </span>
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); onNavigateToMaps(); }}
            className="w-full h-[50px] rounded-[14px] mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:brightness-115 text-white font-extrabold text-xs transition-all shadow-md shadow-blue-500/10 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>{t.mapsBtn}</span>
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        </div>

        {/* CARD 3: EMERGENCY CONTACTS */}
        <div 
          className="bg-white border border-red-100 rounded-[20px] p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-red-500/10 hover:border-red-300 group cursor-pointer"
          onClick={onNavigateToContacts}
        >
          <div className="space-y-4 text-left">
            <div className="w-16 h-16 rounded-full bg-red-50 text-[#E53935] flex items-center justify-center shadow-sm mx-auto group-hover:scale-105 transition-transform duration-300 shrink-0">
              <Phone className="w-8 h-8" />
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="font-bold text-2xl text-[#E53935] tracking-tight">{t.contactsTitle}</h3>
              <p className="text-slate-500 text-sm leading-relaxed min-h-[48px] px-1">{t.contactsDesc}</p>
            </div>

            {/* Quick Contact preview */}
            <div className="space-y-2 text-left bg-slate-50/50 rounded-xl p-3 border border-slate-100 text-[11px] font-bold text-slate-700">
              <div className="flex justify-between items-center">
                <span>National Emergency</span>
                <span className="text-[#E53935]">112</span>
              </div>
              <div className="flex justify-between items-center border-t border-slate-100 pt-1.5">
                <span>Disaster Relief</span>
                <span className="text-[#E53935]">108</span>
              </div>
            </div>
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); onNavigateToContacts(); }}
            className="w-full h-[50px] rounded-[14px] mt-6 bg-gradient-to-r from-[#E53935] to-[#D32F2F] hover:brightness-115 text-white font-extrabold text-xs transition-all shadow-md shadow-red-500/10 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>{t.contactsBtn}</span>
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
            <Shield className="w-8 h-8 text-[#E53935] mb-2" />
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
            <Flame className="w-8 h-8 text-amber-500 mb-2" />
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
