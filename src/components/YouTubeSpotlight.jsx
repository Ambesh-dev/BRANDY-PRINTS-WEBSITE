import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Play, CheckCircle, ExternalLink, Users, Bell, Sparkles } from 'lucide-react';
import { YoutubeIcon } from './icons/SocialIcons';

export default function YouTubeSpotlight() {
  const { settings } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="youtube-spotlight" className="py-20 bg-[#090d16] relative overflow-hidden border-b border-white/[0.06]">
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
              <YoutubeIcon className="w-3.5 h-3.5 fill-red-500 text-red-500" />
              <span>Official YouTube Studio</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Behind The Scenes & <span className="text-red-500">Kit Unboxings</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl">
              Watch how our collector kits are conceptualized, printed, assembled, and unboxed on our official channel.
            </p>
          </div>

          <a
            href={settings.youtubeChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-heading font-bold text-sm shadow-lg shadow-red-600/25 transition-all hover:scale-105"
          >
            <YoutubeIcon className="w-5 h-5 fill-white" />
            <span>Visit YouTube Channel</span>
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>

        {/* Video & Channel Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Video Frame */}
          <div className="lg:col-span-8 rounded-3xl overflow-hidden glass-panel border border-white/10 relative group">
            {isPlaying ? (
              <div className="aspect-video w-full">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${settings.youtubeVideoId}?autoplay=1`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950 flex items-center justify-center cursor-pointer">
                <img
                  src="/images/kit-cyber-bunny.jpg"
                  alt="YouTube Video Unboxing Thumbnail"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700"
                />
                
                {/* Play Button Overlay */}
                <div 
                  onClick={() => setIsPlaying(true)}
                  className="absolute flex flex-col items-center gap-3 z-20"
                >
                  <div className="w-20 h-20 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-red-500 transition-all">
                    <Play className="w-8 h-8 fill-white ml-1" />
                  </div>
                  <span className="text-white font-heading font-bold text-sm bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                    Watch Complete 4K Kit Unboxing
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/80 bg-black/50 p-2.5 rounded-xl backdrop-blur-md">
                  <span className="font-semibold text-white">
                    Unboxing the AI Bunny Cyber & Girl Tech Collector Boxes
                  </span>
                  <span className="text-red-400 font-mono font-bold">10:45 min</span>
                </div>
              </div>
            )}
          </div>

          {/* Right: Channel Metrics & Creator Merch Benefits */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            
            {/* Channel Profile Card */}
            <div className="p-6 rounded-3xl glass-panel border border-white/10 relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 p-[2px]">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                    <YoutubeIcon className="w-7 h-7 text-red-500 fill-red-500" />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-black text-xl text-white">
                    {settings.youtubeChannelName}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Users className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{settings.youtubeSubscribers}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Subscribe for live unboxings, manufacturing tutorials, merchandise design breakdowns, and exclusive drop announcements!
              </p>

              <a
                href={settings.youtubeChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-center gap-2 border border-white/10 transition-colors"
              >
                <Bell className="w-4 h-4 text-amber-400" />
                <span>Subscribe on YouTube</span>
              </a>
            </div>

            {/* Why YouTubers Order From Us */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-white/10 space-y-3">
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>For Content Creators</span>
              </div>
              <h4 className="font-heading font-bold text-white text-base">
                Monetize Your Audience With High-Ticket Collector Kits
              </h4>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Higher margins than generic print-on-demand t-shirts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Insane unboxing reaction videos that boost your channel views</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Low minimum order quantities—start with just 10 kits</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
