import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function AnnouncementBar() {
  const { settings } = useApp();

  if (!settings.announcementActive || !settings.announcementText) return null;

  return (
    <div className="bg-gradient-to-r from-cyan-950 via-[#0b1b2d] to-purple-950 border-b border-cyan-500/20 text-xs sm:text-sm py-2 px-4 text-center text-cyan-200 flex items-center justify-center gap-2 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent animate-pulse-slow"></div>
      <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
      <span className="font-medium tracking-wide">
        {settings.announcementText}
      </span>
      <a 
        href="#catalog" 
        className="hidden md:inline-flex items-center gap-1 font-semibold text-cyan-400 hover:text-white underline underline-offset-4 ml-1 transition-colors"
      >
        Shop Drops <ArrowRight className="w-3 h-3" />
      </a>
    </div>
  );
}
