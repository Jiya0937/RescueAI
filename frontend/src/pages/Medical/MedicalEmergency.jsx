import React, { useState } from 'react';
import { 
  ArrowLeft, Heart, Activity, Mic, Volume2, ShieldAlert, 
  Settings, Globe, Phone, AlertTriangle, Check, ChevronRight, 
  Flame, User
} from 'lucide-react';

export default function MedicalEmergency({ 
  language, 
  onBack, 
  onOpenSOS, 
  onOpenCPR, 
  onOpenFirstAid, 
  onOpenVoiceChat, 
  onPlayAudio, 
  activeTab, 
  setActiveTab 
}) {
  const [audioLang, setAudioLang] = useState('en'); // 'en' or 'hi'

  // Translation sets for this page specifically
  const strings = {
    en: {
      medTitle: "Medical Emergency",
      heroHeading: "Medical Emergency Assistance",
      heroSubtitle: "Get instant offline first-aid guidance with voice support and AI assistance.",
      offlineReady: "Offline Ready",
      offlineReadyDesc: "All medical assistance available",
      cprTitle: "CPR Guide",
      cprDesc: "Step-by-step CPR instructions with illustrations, voice guidance and AI support.",
      cprBtn: "Open CPR Guide",
      firstAidTitle: "First Aid Guide",
      firstAidDesc: "Covers all essential first-aid treatments for common emergencies.",
      firstAidBtn: "Open First Aid",
      firstAidItems: ["Burns", "Bleeding", "Fractures", "Choking", "Snake Bite", "Electric Shock"],
      voiceTitle: "Voice Assistant",
      voiceDesc: "Speak naturally instead of typing. Get instant answers to your emergency questions.",
      voiceBtn: "Start Voice Assistant",
      voicePills: ["\"Someone is unconscious.\"", "\"How do I stop bleeding?\"", "\"Snake bite treatment.\""],
      audioTitle: "Audio Guidance",
      audioDesc: "Listen to emergency instructions in English or Hindi.",
      audioBtn: "Play Audio Guide",
      quickActionsTitle: "Quick Emergency Actions",
      ambulance: "Ambulance",
      natEmergency: "National Emergency",
      police: "Police",
      fire: "Fire Brigade",
      callNow: "Call Now",
      safetyTipTitle: "Today's Safety Tip",
      safetyTipText: "If a person is unconscious and not breathing normally, begin CPR immediately while calling emergency services."
    },
    hi: {
      medTitle: "चिकित्सा आपातकाल",
      heroHeading: "चिकित्सा आपातकालीन सहायता",
      heroSubtitle: "आवाज सहायता और एआई समर्थन के साथ तुरंत ऑफलाइन प्राथमिक चिकित्सा मार्गदर्शन प्राप्त करें।",
      offlineReady: "ऑफलाइन तैयार",
      offlineReadyDesc: "सभी चिकित्सा सहायता उपलब्ध है",
      cprTitle: "सीपीआर गाइड",
      cprDesc: "चित्रों, आवाज मार्गदर्शन और एआई समर्थन के साथ चरण-दर-चरण सीपीआर निर्देश।",
      cprBtn: "सीपीआर गाइड खोलें",
      firstAidTitle: "प्राथमिक चिकित्सा गाइड",
      firstAidDesc: "सामान्य आपात स्थितियों के लिए सभी आवश्यक प्राथमिक चिकित्सा उपचार शामिल हैं।",
      firstAidBtn: "प्राथमिक चिकित्सा खोलें",
      firstAidItems: ["जलन", "रक्तस्राव", "अस्थिभंग", "दम घुटना", "सांप का काटना", "बिजली का झटका"],
      voiceTitle: "वॉइस असिस्टेंट",
      voiceDesc: "टाइप करने के बजाय सामान्य रूप से बोलें। अपने आपातकालीन प्रश्नों के त्वरित उत्तर प्राप्त करें।",
      voiceBtn: "वॉइस असिस्टेंट शुरू करें",
      voicePills: ["\"कोई बेहोश है।\"", "\"रक्तस्राव कैसे रोकें?\"", "\"सांप के काटने का इलाज।\""],
      audioTitle: "ऑडियो मार्गदर्शन",
      audioDesc: "अंग्रेजी या हिंदी में आपातकालीन निर्देशों को सुनें।",
      audioBtn: "ऑडियो गाइड चलाएं",
      quickActionsTitle: "त्वरित आपातकालीन कार्रवाइयां",
      ambulance: "एम्बुलेंस",
      natEmergency: "राष्ट्रीय आपातकाल",
      police: "पुलिस",
      fire: "फायर ब्रिगेड",
      callNow: "कॉल करें",
      safetyTipTitle: "आज की सुरक्षा टिप",
      safetyTipText: "यदि कोई व्यक्ति बेहोश है और सामान्य रूप से सांस नहीं ले रहा है, तो आपातकालीन सेवाओं को कॉल करते हुए तुरंत सीपीआर शुरू करें।"
    }
  };

  const t = strings[language] || strings.en;

  return (
    <div className="space-y-8 animate-fade-in text-[#1E293B] max-w-5xl mx-auto">
      
      {/* HEADER SECTION (Top Navigation inside views) */}
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

        {/* Center Title for larger viewports */}
        <h2 className="hidden md:block font-extrabold text-lg text-slate-800 tracking-tight">
          {t.medTitle}
        </h2>

        {/* Right Buttons */}
        <div className="flex items-center gap-2">
          {/* Quick SOS Trigger in Header */}
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
      <section className="bg-gradient-to-br from-[#FFF5F5] via-white to-[#F0FDF4] rounded-3xl border border-slate-100 p-6 md:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden text-left">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#1565C0]/5 rounded-full blur-3xl pointer-events-none"></div>
        
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

        {/* Paramedics and Patient SVG Illustration */}
        <div className="w-full max-w-[340px] md:max-w-[400px] shrink-0 z-10">
          <svg className="w-full h-auto" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="100%">
                <stop offset="0%" stopColor="#E0F2FE" />
                <stop offset="100%" stopColor="#F8FAFC" />
              </linearGradient>
            </defs>

            {/* Backdrop environment */}
            <path d="M50 200c60-15 140-5 220-25s80-15 100-15h30" stroke="#E2E8F0" strokeWidth="1.5" />
            <circle cx="360" cy="90" r="25" fill="#E2E8F0" opacity="0.3" />
            <circle cx="345" cy="100" r="15" fill="#E2E8F0" opacity="0.3" />

            {/* Ambulance Graphic in Background */}
            <g transform="translate(130, 80)" opacity="0.85">
              {/* Ground shadow */}
              <ellipse cx="60" cy="72" rx="55" ry="6" fill="#CBD5E1" />
              {/* Main Body */}
              <rect x="10" y="10" width="85" height="55" rx="8" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
              {/* Front Cabin slope */}
              <path d="M93 25l18 15v25h-18z" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
              {/* Front Windshield */}
              <path d="M96 28l12 10v12h-12z" fill="#E2E8F0" />
              {/* Side window */}
              <rect x="25" y="20" width="22" height="15" rx="3" fill="#E2E8F0" />
              <rect x="53" y="20" width="22" height="15" rx="3" fill="#E2E8F0" />
              {/* Red Stripes */}
              <rect x="10" y="42" width="100" height="6" fill="#EF4444" />
              {/* Blue Medical Cross */}
              <path d="M36 32v12M30 38h12" stroke="#1E3A8A" strokeWidth="4" strokeLinecap="round" />
              {/* Red Siren on roof */}
              <path d="M30 10c0-4 6-4 6 0z" fill="#EF4444" />
              <path d="M33 10c0-6 2-6 2 0z" fill="#0EA5E9" className="animate-pulse" />
              {/* Wheels */}
              <circle cx="32" cy="68" r="11" fill="#334155" />
              <circle cx="32" cy="68" r="5" fill="#94A3B8" />
              <circle cx="85" cy="68" r="11" fill="#334155" />
              <circle cx="85" cy="68" r="5" fill="#94A3B8" />
            </g>

            {/* Ground line */}
            <ellipse cx="200" cy="225" rx="170" ry="12" fill="#E2E8F0" />
            <ellipse cx="200" cy="222" rx="140" ry="8" fill="#CBD5E1" />

            {/* Patient Lying Down */}
            <g transform="translate(170, 165)">
              <ellipse cx="40" cy="30" rx="35" ry="4" fill="#94A3B8" />
              {/* Legs blue */}
              <rect x="10" y="18" width="55" height="12" rx="5" fill="#3B82F6" />
              {/* Shoes */}
              <rect x="0" y="16" width="12" height="10" rx="3" fill="#1E293B" />
              {/* Torso grey */}
              <path d="M55 12h25v16H55z" fill="#E2E8F0" stroke="#475569" strokeWidth="1" />
              {/* Head skin */}
              <circle cx="92" cy="14" r="8" fill="#FDBA74" />
              <path d="M90 7c0-4 7-4 7 0z" fill="#475569" />
            </g>

            {/* Rescuer 1 (Kneeling, checking pulse/wrist) */}
            <g transform="translate(185, 120)">
              {/* Legs kneeling */}
              <path d="M10 60c5-10 15-15 30-10l5 15-25 15z" fill="#E53935" />
              <circle cx="8" cy="72" r="5" fill="#334155" />
              {/* Torso red jacket */}
              <path d="M15 28h24v28H15z" fill="#E53935" />
              <rect x="15" y="36" width="24" height="4" fill="#FACC15" />
              <rect x="15" y="44" width="24" height="4" fill="#FACC15" />
              {/* Head */}
              <circle cx="28" cy="15" r="9" fill="#FDBA74" />
              <path d="M22 10c0-6 10-6 10 0z" fill="#1E293B" />
              {/* Arms checking patient */}
              <path d="M15 36C5 40 2 48 10 52" stroke="#FDBA74" strokeWidth="4.5" strokeLinecap="round" />
            </g>

            {/* Rescuer 2 (Right side, holding stethoscope/kit) */}
            <g transform="translate(290, 125)">
              {/* Red medical kit box */}
              <rect x="15" y="55" width="26" height="20" rx="4" fill="#EF4444" />
              <rect x="23" y="50" width="10" height="5" rx="1" fill="#FFFFFF" />
              <path d="M28 60v10M23 65h10" stroke="#FFFFFF" strokeWidth="3" />

              {/* Legs kneeling */}
              <path d="M0 60c-2-8-8-12-20-8l-4 15 18 15z" fill="#E53935" />
              <circle cx="-15" cy="74" r="5" fill="#334155" />
              {/* Torso */}
              <path d="M-18 26H6v28H-18z" fill="#E53935" />
              <rect x="-18" y="34" width="24" height="4" fill="#FACC15" />
              <rect x="-18" y="42" width="24" height="4" fill="#FACC15" />
              {/* Head */}
              <circle cx="-6" cy="14" r="9" fill="#FDBA74" />
              <path d="M-12 9c0-6 10-6 10 0z" fill="#1E293B" />
              {/* Arms */}
              <path d="M-10 35C-20 40-20 48-12 52" stroke="#FDBA74" strokeWidth="4" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      </section>

      {/* 4 LARGE PREMIUM FEATURE CARDS GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* CARD 1: CPR GUIDE */}
        <div 
          className="bg-white border border-[#FECACA] rounded-[20px] p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-red-500/10 hover:border-red-300 group cursor-pointer"
          onClick={onOpenCPR}
        >
          <div className="space-y-4">
            {/* 64px Circular Icon Container */}
            <div className="w-16 h-16 rounded-full bg-[#FEE2E2] flex items-center justify-center shadow-sm mx-auto group-hover:scale-105 transition-transform duration-300 shrink-0">
              <Heart className="w-8 h-8 text-[#EF4444]" fill="#EF4444" />
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="font-bold text-2xl text-[#EF4444] tracking-tight">{t.cprTitle}</h3>
              <p className="text-slate-500 text-sm leading-relaxed min-h-[72px] px-1">{t.cprDesc}</p>
            </div>

            {/* Slider visual element matching reference image */}
            <div className="pt-2 pb-1">
              <div className="h-1 bg-slate-100 rounded-full relative">
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#EF4444] border-2 border-white shadow-xxs"></div>
              </div>
            </div>
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); onOpenCPR(); }}
            className="w-full h-[50px] rounded-[14px] mt-6 bg-gradient-to-r from-[#EF4444] to-[#DC2626] hover:brightness-115 text-white font-extrabold text-xs transition-all shadow-md shadow-red-500/10 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>{t.cprBtn}</span>
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        </div>

        {/* CARD 2: FIRST AID GUIDE */}
        <div 
          className="bg-white border border-[#BBF7D0] rounded-[20px] p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-green-500/10 hover:border-green-300 group cursor-pointer"
          onClick={() => onOpenFirstAid('burns')}
        >
          <div className="space-y-4">
            {/* 64px Circular Icon Container */}
            <div className="w-16 h-16 rounded-full bg-[#DCFCE7] flex items-center justify-center shadow-sm mx-auto group-hover:scale-105 transition-transform duration-300 shrink-0">
              <Activity className="w-8 h-8 text-[#16A34A]" />
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="font-bold text-2xl text-[#16A34A] tracking-tight">{t.firstAidTitle}</h3>
              <p className="text-slate-500 text-sm leading-relaxed min-h-[48px] px-1">{t.firstAidDesc}</p>
            </div>

            {/* Checklist Grid */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-2.5 text-[11.5px] font-bold text-slate-700 bg-slate-50/50 rounded-xl p-3 border border-slate-100">
              {t.firstAidItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1 text-left">
                  <span className="w-4 h-4 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" strokeWidth={3} />
                  </span>
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); onOpenFirstAid('burns'); }}
            className="w-full h-[50px] rounded-[14px] mt-6 bg-gradient-to-r from-[#22C55E] to-[#15803D] hover:brightness-115 text-white font-extrabold text-xs transition-all shadow-md shadow-green-500/10 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>{t.firstAidBtn}</span>
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        </div>

        {/* CARD 3: VOICE ASSISTANT */}
        <div 
          className="bg-white border border-[#DDD6FE] rounded-[20px] p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-purple-500/10 hover:border-purple-300 group cursor-pointer"
          onClick={onOpenVoiceChat}
        >
          <div className="space-y-4">
            {/* 64px Circular Icon Container */}
            <div className="w-16 h-16 rounded-full bg-[#F3E8FF] flex items-center justify-center shadow-sm mx-auto group-hover:scale-105 transition-transform duration-300 shrink-0">
              <Mic className="w-8 h-8 text-[#7C3AED]" />
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="font-bold text-2xl text-[#7C3AED] tracking-tight">{t.voiceTitle}</h3>
              <p className="text-slate-500 text-sm leading-relaxed min-h-[48px] px-1">{t.voiceDesc}</p>
            </div>

            {/* Bubble Pills list */}
            <div className="space-y-2 text-left">
              {t.voicePills.map((pill, idx) => (
                <div 
                  key={idx}
                  className="bg-purple-50/50 border border-purple-100/50 rounded-xl px-3 py-1.5 text-[10px] font-bold text-[#7C3AED] cursor-pointer hover:bg-purple-50 transition-colors truncate"
                  onClick={(e) => { e.stopPropagation(); onOpenVoiceChat(pill); }}
                >
                  {pill}
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); onOpenVoiceChat(); }}
            className="w-full h-[50px] rounded-[14px] mt-6 bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] hover:brightness-115 text-white font-extrabold text-xs transition-all shadow-md shadow-purple-500/10 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>{t.voiceBtn}</span>
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        </div>

        {/* CARD 4: AUDIO GUIDANCE */}
        <div 
          className="bg-white border border-[#BFDBFE] rounded-[20px] p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-300 group cursor-pointer"
          onClick={onPlayAudio}
        >
          <div className="space-y-4">
            {/* 64px Circular Icon Container */}
            <div className="w-16 h-16 rounded-full bg-[#DBEAFE] flex items-center justify-center shadow-sm mx-auto group-hover:scale-105 transition-transform duration-300 shrink-0">
              <Volume2 className="w-8 h-8 text-[#2563EB]" />
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="font-bold text-2xl text-[#2563EB] tracking-tight">{t.audioTitle}</h3>
              <p className="text-slate-500 text-sm leading-relaxed min-h-[48px] px-1">{t.audioDesc}</p>
            </div>

            {/* Waveform graphic & English/Hindi toggle pills */}
            <div className="space-y-3.5 pt-1">
              {/* Waveform visual */}
              <div className="h-6 flex items-center justify-center gap-1">
                {[4, 8, 12, 10, 16, 6, 12, 18, 14, 8, 10, 6, 8, 12, 10, 14, 6].map((h, i) => (
                  <span 
                    key={i} 
                    className="w-1 bg-[#2563EB] rounded-full opacity-60 transition-all duration-300"
                    style={{ height: `${h}px`, animation: 'soft-pulse 1.5s infinite ease-in-out', animationDelay: `${i * 0.1}s` }}
                  ></span>
                ))}
              </div>

              {/* Language toggle pills */}
              <div className="flex bg-slate-100 p-0.5 rounded-lg text-[10px] font-bold">
                <button 
                  onClick={(e) => { e.stopPropagation(); setAudioLang('en'); }}
                  className={`flex-1 py-1 rounded transition-all cursor-pointer ${audioLang === 'en' ? 'bg-white text-slate-800 shadow-xxs' : 'text-slate-500'}`}
                >
                  English
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setAudioLang('hi'); }}
                  className={`flex-1 py-1 rounded transition-all cursor-pointer ${audioLang === 'hi' ? 'bg-white text-slate-800 shadow-xxs' : 'text-slate-500'}`}
                >
                  हिंदी
                </button>
              </div>
            </div>
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); onPlayAudio(audioLang); }}
            className="w-full h-[50px] rounded-[14px] mt-6 bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] hover:brightness-115 text-white font-extrabold text-xs transition-all shadow-md shadow-blue-500/10 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>{t.audioBtn}</span>
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        </div>

      </section>

      {/* QUICK EMERGENCY ACTIONS SECTION */}
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
            {/* SVG ambulance icon */}
            <svg className="w-14 h-10 mb-3 text-red-500" viewBox="0 0 60 40" fill="none">
              <rect x="5" y="8" width="40" height="26" rx="4" fill="#FFFFFF" stroke="currentColor" strokeWidth="2" />
              <path d="M44 14l12 6v14h-12z" fill="#FFFFFF" stroke="currentColor" strokeWidth="2" />
              <circle cx="16" cy="34" r="5" fill="#334155" />
              <circle cx="44" cy="34" r="5" fill="#334155" />
              <rect x="5" y="22" width="51" height="3" fill="#EF4444" />
              <path d="M28 17v8M24 21h8" stroke="#E53935" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="text-[10px] uppercase font-bold text-slate-400">{t.ambulance}</span>
            <p className="font-extrabold text-slate-800 text-lg mt-0.5 leading-none">108</p>
            <a 
              href="tel:108"
              className="mt-3.5 w-full py-2 bg-[#E53935] hover:bg-[#D32F2F] text-white rounded-xl font-bold text-[10px] flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-sm shadow-red-500/10"
            >
              <Phone className="w-3 h-3" />
              <span>{t.callNow}</span>
            </a>
          </div>

          {/* National Emergency (112) */}
          <div className="flex flex-col items-center p-5 rounded-2xl border border-slate-150 hover:border-red-200 hover:bg-red-50/10 transition-all text-center group">
            {/* SVG Siren icon */}
            <svg className="w-12 h-10 mb-3 text-red-500 animate-soft-pulse" viewBox="0 0 40 40" fill="none">
              <path d="M20 5c-8 0-10 8-10 16h20c0-8-2-16-10-16z" fill="#FEE2E2" stroke="currentColor" strokeWidth="2" />
              <rect x="5" y="21" width="30" height="6" rx="2" fill="#E53935" />
              <circle cx="20" cy="5" r="2" fill="#EF4444" />
              <path d="M12 10l-4-4M28 10l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="text-[10px] uppercase font-bold text-slate-400">{t.natEmergency}</span>
            <p className="font-extrabold text-slate-800 text-lg mt-0.5 leading-none">112</p>
            <a 
              href="tel:112"
              className="mt-3.5 w-full py-2 bg-[#E53935] hover:bg-[#D32F2F] text-white rounded-xl font-bold text-[10px] flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-sm shadow-red-500/10"
            >
              <Phone className="w-3 h-3" />
              <span>{t.callNow}</span>
            </a>
          </div>

          {/* Police (100) */}
          <div className="flex flex-col items-center p-5 rounded-2xl border border-slate-150 hover:border-blue-200 hover:bg-blue-50/10 transition-all text-center group">
            {/* SVG Police Cap */}
            <svg className="w-12 h-10 mb-3 text-blue-600" viewBox="0 0 40 40" fill="none">
              <path d="M8 20c0-8 8-10 12-10s12 2 12 10H8z" fill="#DBEAFE" stroke="currentColor" strokeWidth="2" />
              <rect x="6" y="20" width="28" height="5" fill="#1565C0" />
              <path d="M4 25c10 4 22 4 32 0l-3 4H7l-3-4z" fill="#1E293B" />
              <path d="M20 12v4M18 14h4" stroke="#EF4444" strokeWidth="1.5" />
            </svg>
            <span className="text-[10px] uppercase font-bold text-slate-400">{t.police}</span>
            <p className="font-extrabold text-slate-800 text-lg mt-0.5 leading-none">100</p>
            <a 
              href="tel:100"
              className="mt-3.5 w-full py-2 bg-[#1565C0] hover:bg-[#0D47A1] text-white rounded-xl font-bold text-[10px] flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-sm shadow-blue-500/10"
            >
              <Phone className="w-3 h-3" />
              <span>{t.callNow}</span>
            </a>
          </div>

          {/* Fire Brigade (101) */}
          <div className="flex flex-col items-center p-5 rounded-2xl border border-slate-150 hover:border-amber-200 hover:bg-amber-50/10 transition-all text-center group">
            {/* SVG Fire Flame */}
            <svg className="w-10 h-10 mb-3 text-amber-500" viewBox="0 0 40 40" fill="none">
              <path d="M20 5c0 0-8 6-8 15a8 8 0 0 0 16 0c0-9-8-15-8-15z" fill="#FEF3C7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 12c0 0-4 4-4 8a4 4 0 0 0 8 0c0-4-4-8-4-8z" fill="#F59E0B" />
            </svg>
            <span className="text-[10px] uppercase font-bold text-slate-400">{t.fire}</span>
            <p className="font-extrabold text-slate-800 text-lg mt-0.5 leading-none">101</p>
            <a 
              href="tel:101"
              className="mt-3.5 w-full py-2 bg-[#FB8C00] hover:bg-[#E57C00] text-white rounded-xl font-bold text-[10px] flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-sm shadow-orange-500/10"
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

        {/* CPR compression flat SVG graphic on the right */}
        <div className="w-full max-w-[140px] shrink-0 opacity-60">
          <svg className="w-full h-auto text-slate-400" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 65h100" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <rect x="25" y="45" width="70" height="20" rx="3" fill="#E2E8F0" />
            <path d="M40 20l20 15 20-15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <circle cx="60" cy="15" r="8" fill="#CBD5E1" />
            <path d="M50 35c2-6 8-6 10 0" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </section>

      {/* FLOATING GLASS BOTTOM NAVIGATION BAR FOR THIS VIEW */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-lg z-40 py-2 px-3 rounded-full glass-nav flex items-center justify-between shadow-md">
        <button 
          onClick={() => setActiveTab('home')} 
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl w-12 cursor-pointer transition-all ${activeTab === 'home' ? 'text-[#E53935] scale-105 font-bold' : 'text-slate-450 hover:text-slate-800'}`}
        >
          <span className="text-base">🏠</span>
          <span className="text-[9px] mt-0.5">Home</span>
        </button>

        <button 
          onClick={() => setActiveTab('medical')} 
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl w-14 cursor-pointer transition-all ${activeTab === 'medical' ? 'text-[#E53935] scale-105 font-bold' : 'text-slate-450 hover:text-slate-800'}`}
        >
          <span className="text-base">🚑</span>
          <span className="text-[9px] mt-0.5">Medical</span>
        </button>

        <button 
          onClick={() => setActiveTab('ai_assistant')} 
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl w-14 cursor-pointer transition-all ${activeTab === 'ai_assistant' ? 'text-indigo-650 scale-105 font-bold' : 'text-slate-450 hover:text-slate-800'}`}
        >
          <span className="text-base">🤖</span>
          <span className="text-[9px] mt-0.5">AI Assist</span>
        </button>

        <button 
          onClick={() => setActiveTab('scan')} 
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl w-12 cursor-pointer transition-all ${activeTab === 'scan' ? 'text-cyan-655 scale-105 font-bold' : 'text-slate-450 hover:text-slate-800'}`}
        >
          <span className="text-base">📄</span>
          <span className="text-[9px] mt-0.5">Scan</span>
        </button>

        <button 
          onClick={() => setActiveTab('contacts')} 
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl w-12 cursor-pointer transition-all ${activeTab === 'contacts' ? 'text-[#E53935] scale-105 font-bold' : 'text-slate-450 hover:text-slate-800'}`}
        >
          <span className="text-base">📞</span>
          <span className="text-[9px] mt-0.5">Contacts</span>
        </button>
      </nav>

    </div>
  );
}
