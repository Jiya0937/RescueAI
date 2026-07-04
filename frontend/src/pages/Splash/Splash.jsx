import React, { useEffect, useState } from 'react';
import { Shield, Activity } from 'lucide-react';

export default function Splash({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 300); // Small delay for smooth exit
          return 100;
        }
        return prev + 4; // Fills up in about 2.5 seconds
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 flex flex-col justify-between bg-gradient-to-b from-[#FFF5F5] to-[#F8FAFC] p-8 select-none z-50">
      {/* Top Section: Skip button */}
      <div className="flex justify-end">
        <button
          onClick={onFinish}
          className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors bg-white/80 rounded-full border border-slate-200 shadow-xs backdrop-blur-xs cursor-pointer hover:bg-white"
        >
          Skip Intro
        </button>
      </div>

      {/* Center Section: Animated Logo & App Name */}
      <div className="flex flex-col items-center justify-center text-center">
        {/* Shield with Medical Cross Logo */}
        <div className="relative mb-6">
          {/* External Pulse Ring */}
          <div className="absolute -inset-4 rounded-full bg-primary/10 animate-ping opacity-60"></div>
          
          <div className="relative flex items-center justify-center w-24 h-24 bg-primary text-white rounded-3xl shadow-xl shadow-primary/20 transform hover:scale-105 transition-transform">
            <Shield className="w-12 h-12" fill="white" strokeWidth={1} />
            <span className="absolute text-xl font-bold text-primary font-sans mt-0.5 select-none" style={{ textShadow: '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff' }}>+</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-2">
          Rescue<span className="text-primary">AI</span>
        </h1>
        
        {/* Tagline */}
        <p className="text-sm font-semibold tracking-wider uppercase text-slate-500 mb-6 font-display">
          Offline Emergency Assistant
        </p>

        {/* Help Tagline */}
        <p className="text-slate-600 max-w-xs text-sm leading-relaxed font-sans px-4">
          Help anywhere, anytime.<br />
          <span className="font-semibold text-secondary">Even without internet.</span>
        </p>
      </div>

      {/* Bottom Section: Progress bar and offline indicator */}
      <div className="flex flex-col items-center w-full max-w-sm mx-auto mb-6">
        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-3">
          <div 
            className="h-full bg-primary transition-all duration-100 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium font-sans">
          <Activity className="w-3.5 h-3.5 text-green-500 animate-pulse" />
          <span>Locally Initializing AI Core Modules...</span>
        </div>
      </div>
    </div>
  );
}
