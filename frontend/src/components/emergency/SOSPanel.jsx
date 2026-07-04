import React, { useState } from 'react';
import { Phone, ShieldAlert, ArrowLeft, Heart, Eye, Siren, Compass, Copy } from 'lucide-react';

export default function SOSPanel({ onClose }) {
  const [copied, setCopied] = useState(false);
  const [sirenPlaying, setSirenPlaying] = useState(false);

  const emergencyContacts = [
    { name: 'Ambulance / चिकित्सा', number: '102', desc: 'Medical Emergency', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { name: 'Disaster Management / आपदा', number: '108', desc: 'Disaster Relief / Trauma Care', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { name: 'Police / पुलिस', number: '100', desc: 'Safety & Security Services', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { name: 'National Helpline / राष्ट्रीय हेल्पलाइन', number: '112', desc: 'All-in-One Emergency Line', color: 'bg-rose-50 text-rose-700 border-rose-200' }
  ];

  const quickGuides = [
    { title: 'CPR Steps / सीपीआर', desc: 'Push hard & fast at center of chest' },
    { title: 'Severe Bleeding / रक्तस्राव', desc: 'Apply firm, direct pressure with clean cloth' },
    { title: 'Choking / दम घुटना', desc: 'Give 5 back blows & 5 abdominal thrusts' },
    { title: 'Severe Burns / जलना', desc: 'Cool with running water for 10-20 min' }
  ];

  const handleCopyCoords = () => {
    navigator.clipboard.writeText("28.6139° N, 77.2090° E");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/95 text-white flex flex-col z-50 overflow-y-auto animate-fade-in font-sans">
      
      {/* Red Pulse SOS Alert Bar */}
      <div className="bg-primary px-4 py-5 flex items-center justify-between border-b border-rose-800 shadow-md sticky top-0 z-10">
        <button 
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 hover:bg-black/30 text-white font-medium text-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit SOS / वापस जाएं</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <span className="font-extrabold tracking-widest text-lg font-display">SOS LIVE ACTIVE</span>
        </div>
      </div>

      {/* Main SOS Panel Content */}
      <div className="flex-1 max-w-2xl mx-auto w-full p-5 space-y-6">
        
        {/* Offline Emergency Coordinates */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-secondary/20 rounded-xl text-secondary">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Your Offline Location (GPS)</p>
              <p className="text-base font-mono font-bold text-white mt-0.5">28.6139° N, 77.2090° E</p>
              <p className="text-xs text-slate-500">Provide this to first responders</p>
            </div>
          </div>
          <button 
            onClick={handleCopyCoords}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl text-xs font-semibold transition-all w-full sm:w-auto justify-center"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copied ? 'Copied!' : 'Copy Coordinates'}</span>
          </button>
        </div>

        {/* Action: Siren / Pulse Toggle */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setSirenPlaying(!sirenPlaying)}
            className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all cursor-pointer ${
              sirenPlaying 
                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30 animate-pulse' 
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
            }`}
          >
            <Siren className={`w-8 h-8 mb-2 ${sirenPlaying ? 'text-white' : 'text-primary'}`} />
            <span className="text-sm font-bold">{sirenPlaying ? 'Siren Playing' : 'Trigger Audio Siren'}</span>
            <span className="text-[10px] opacity-70 mt-0.5">Alert nearby rescuers</span>
          </button>

          <a
            href="tel:112"
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white border border-rose-500 text-center transition-all shadow-lg shadow-rose-600/20"
          >
            <Phone className="w-8 h-8 mb-2 text-white animate-bounce" />
            <span className="text-sm font-bold">Call National Help</span>
            <span className="text-[10px] opacity-70 mt-0.5">Dial 112 directly</span>
          </a>
        </div>

        {/* Emergency Contacts List */}
        <div>
          <h3 className="text-base font-bold text-slate-300 uppercase tracking-wider mb-3 px-1">
            Immediate Call Lines / आपातकालीन नंबर
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {emergencyContacts.map((contact, idx) => (
              <a
                key={idx}
                href={`tel:${contact.number}`}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-slate-500 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-rose-500/10 text-rose-500 font-bold text-lg">
                    {contact.number}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-100 group-hover:text-white">{contact.name}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{contact.desc}</p>
                  </div>
                </div>
                <div className="p-2 bg-slate-700 rounded-lg text-slate-300 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Offline Rescue Guides */}
        <div>
          <h3 className="text-base font-bold text-slate-300 uppercase tracking-wider mb-3 px-1">
            Quick Offline Guides / प्राथमिक उपचार
          </h3>
          <div className="space-y-2.5">
            {quickGuides.map((guide, idx) => (
              <div 
                key={idx} 
                className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80 flex items-start gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center text-xs font-bold mt-0.5 shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-200">{guide.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{guide.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warning Indicator */}
        <div className="bg-amber-950/40 border border-amber-900 text-amber-200/90 rounded-2xl p-4 flex gap-3 text-xs leading-relaxed">
          <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold uppercase tracking-wider text-amber-400">Offline Warning / ऑफलाइन चेतावनी</p>
            <p className="mt-0.5 text-slate-300">
              All guides and resources shown here are loaded locally and do not require internet access. Standard carrier rates may apply for direct phone calls.
            </p>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="bg-slate-950 text-center py-4 border-t border-slate-800/60 text-xs text-slate-500 mt-auto">
        RescueAI v1.0.0 • Emergency Mode
      </div>
    </div>
  );
}
