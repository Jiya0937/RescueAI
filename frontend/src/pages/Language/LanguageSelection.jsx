import React, { useState } from 'react';
import { Shield, ShieldAlert, ArrowRight, CheckCircle2, AlertTriangle, Globe } from 'lucide-react';

export default function LanguageSelection({ onSelectLanguage, onOpenSOS }) {
  const [selected, setSelected] = useState(null); // 'en' or 'hi'

  const handleContinue = () => {
    if (selected) {
      onSelectLanguage(selected);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between p-4 md:p-6 font-sans relative overflow-hidden">
      
      {/* Top right SOS trigger button */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10">
        <button
          onClick={onOpenSOS}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-full font-bold text-sm shadow-md shadow-primary/20 hover:shadow-lg transition-all animate-soft-pulse cursor-pointer border border-red-400/20"
        >
          <ShieldAlert className="w-4 h-4 animate-bounce" />
          <span>SOS / आपातकालीन</span>
        </button>
      </div>

      {/* Main card wrapper */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-lg w-full mx-auto my-8">
        
        {/* RescueAI Logo and Brand */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex items-center justify-center w-20 h-20 bg-primary text-white rounded-3xl shadow-lg shadow-primary/10 transform hover:scale-105 transition-transform mb-4">
            <Shield className="w-10 h-10" fill="white" strokeWidth={1} />
            <span className="absolute text-lg font-bold text-primary mt-0.5 select-none" style={{ textShadow: '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff' }}>+</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Rescue<span className="text-primary">AI</span>
          </h2>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">
            Offline Emergency Assistant
          </p>
        </div>

        {/* Inner Card Section */}
        <div className="bg-white rounded-[20px] shadow-sm hover:shadow-md border border-slate-100 p-6 md:p-8 w-full transition-all">
          <div className="text-center mb-6">
            <h3 className="text-xl font-extrabold text-slate-800 font-display">
              Choose Your Language / भाषा चुनें
            </h3>
            <p className="text-slate-500 text-sm mt-1">
              Select your preferred language to continue.
            </p>
          </div>

          {/* Language Cards */}
          <div className="space-y-4">
            
            {/* English Card */}
            <div
              onClick={() => setSelected('en')}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between group ${
                selected === 'en'
                  ? 'border-secondary bg-blue-50/40 text-slate-900 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-slate-50/20'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl select-none" role="img" aria-label="UK flag">
                  🇬🇧
                </span>
                <div className="text-left">
                  <h4 className="font-bold text-base text-slate-800">English</h4>
                  <p className="text-xs text-slate-500 font-medium">Default App Interface</p>
                </div>
              </div>
              <div className="flex items-center">
                {selected === 'en' ? (
                  <CheckCircle2 className="w-6 h-6 text-secondary animate-scale-in" fill="currentColor" stroke="white" />
                ) : (
                  <div className="w-6 h-6 rounded-full border border-slate-300 group-hover:border-slate-400 transition-colors" />
                )}
              </div>
            </div>

            {/* Hindi Card */}
            <div
              onClick={() => setSelected('hi')}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between group ${
                selected === 'hi'
                  ? 'border-primary bg-red-50/30 text-slate-900 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-slate-50/20'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl select-none" role="img" aria-label="India flag">
                  🇮🇳
                </span>
                <div className="text-left">
                  <h4 className="font-bold text-base text-slate-800">हिन्दी (Hindi)</h4>
                  <p className="text-xs text-slate-500 font-medium">हिंदी भाषा इंटरफ़ेस</p>
                </div>
              </div>
              <div className="flex items-center">
                {selected === 'hi' ? (
                  <CheckCircle2 className="w-6 h-6 text-primary animate-scale-in" fill="currentColor" stroke="white" />
                ) : (
                  <div className="w-6 h-6 rounded-full border border-slate-300 group-hover:border-slate-400 transition-colors" />
                )}
              </div>
            </div>

          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!selected}
            className={`w-full mt-6 py-3.5 px-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              selected
                ? selected === 'hi' 
                  ? 'bg-primary text-white hover:bg-primary-hover shadow-md shadow-primary/10'
                  : 'bg-secondary text-white hover:bg-secondary-hover shadow-md shadow-secondary/10'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
            }`}
          >
            <span>Continue / आगे बढ़ें</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Change later note */}
        <div className="mt-4 flex items-center gap-2 text-slate-400 text-xs px-4">
          <Globe className="w-3.5 h-3.5 shrink-0" />
          <span>You can change the language later from Settings.</span>
        </div>

      </div>

      {/* Footer Details */}
      <footer className="w-full max-w-lg mx-auto border-t border-slate-200/80 pt-4 pb-2 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex gap-4">
          <a href="#about" className="hover:text-slate-600 transition-colors font-medium">About RescueAI</a>
          <span className="text-slate-300">|</span>
          <a href="#privacy" className="hover:text-slate-600 transition-colors font-medium">Privacy Policy</a>
        </div>
        <div>
          <span>Version 1.0.0</span>
        </div>
      </footer>

    </div>
  );
}
