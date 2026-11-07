import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ShoppingBag, ArrowRight, Play, CheckCircle, ShieldCheck, Zap, Star } from 'lucide-react';

export default function Hero() {
  const { settings, setActiveModalProduct, products } = useApp();
  const [activeEdition, setActiveEdition] = useState('cyber'); // 'cyber' or 'girl'

  const cyberProduct = products.find(p => p.id === 'prod-cyber-bunny-01') || products[0];
  const girlProduct = products.find(p => p.id === 'prod-girl-tech-02') || products[1];

  const currentProduct = activeEdition === 'cyber' ? cyberProduct : girlProduct;

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-white/[0.06]">
      {/* Background ambient neon glow spheres */}
      <div 
        className={`absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[140px] pointer-events-none transition-colors duration-700 ${
          activeEdition === 'cyber' ? 'bg-cyan-500/15' : 'bg-pink-500/15'
        }`}
      />
      <div 
        className={`absolute bottom-10 right-1/4 w-[32rem] h-[32rem] rounded-full blur-[160px] pointer-events-none transition-colors duration-700 ${
          activeEdition === 'cyber' ? 'bg-blue-600/10' : 'bg-purple-600/15'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs sm:text-sm font-semibold shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{settings.heroBadge || "Handcrafted Luxury Collector Kits"}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span className="text-slate-400 font-normal">Made for Creators</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12]">
              {settings.heroTitle}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {settings.heroSubtitle}
            </p>

            {/* Key feature pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-white/10">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Heavy Magnetic Box</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-white/10">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Die-Cut Holographic Stickers</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-white/10">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>QR VIP Access Passes</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#catalog"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-heading font-bold text-base bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 text-slate-950 shadow-glow-cyan hover:shadow-cyan-400/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
              >
                <ShoppingBag className="w-5 h-5 text-slate-950" />
                <span>Explore Collector Drops</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#custom-builder"
                className="w-full sm:w-auto px-7 py-4 rounded-xl font-heading font-semibold text-base bg-slate-900/90 hover:bg-slate-800 text-white border border-white/15 hover:border-cyan-400/50 transition-all flex items-center justify-center gap-2"
              >
                <span>Order Custom Channel Kit</span>
              </a>
            </div>

            {/* Social Proof Bar */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-2 font-bold text-white text-sm">4.95/5</span>
                <span className="text-xs text-slate-400">(150+ Creator Kits Delivered)</span>
              </div>
              <div className="h-4 w-[1px] bg-white/20 hidden sm:block"></div>
              <div className="text-xs text-slate-300 font-medium">
                ⚡ Handcrafted in limited numbered editions
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Featured Kit Visualizer */}
          <div className="lg:col-span-5 relative">
            
            {/* Edition Switcher Tabs */}
            <div className="flex items-center justify-center gap-2 mb-4 bg-slate-950/80 p-1.5 rounded-2xl border border-white/10 max-w-sm mx-auto backdrop-blur-md">
              <button
                onClick={() => setActiveEdition('cyber')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeEdition === 'cyber'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>Cyber Hacker Kit</span>
              </button>

              <button
                onClick={() => setActiveEdition('girl')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeEdition === 'girl'
                    ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40 shadow-glow-pink'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-pink-400"></span>
                <span>Girl Tech Kit</span>
              </button>
            </div>

            {/* Main Interactive Showcase Card */}
            <div className={`relative rounded-3xl p-3 sm:p-4 transition-all duration-500 ${
              activeEdition === 'cyber' ? 'glass-panel-cyan' : 'glass-panel-pink'
            }`}>
              
              {/* Product Badge */}
              <div className="absolute top-6 left-6 z-20 flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase shadow-lg ${
                  activeEdition === 'cyber'
                    ? 'bg-cyan-500 text-slate-950'
                    : 'bg-pink-500 text-white'
                }`}>
                  {currentProduct?.badge || "Signature Drop"}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-black/70 backdrop-blur-md text-slate-200 border border-white/15">
                  {currentProduct?.edition || "Limited Edition"}
                </span>
              </div>

              {/* Photo Display */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-950 group cursor-pointer shadow-2xl">
                <img
                  src={activeEdition === 'cyber' ? '/images/kit-cyber-bunny.jpg' : '/images/kit-girl-edition.jpg'}
                  alt={currentProduct?.title}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                  onClick={() => currentProduct && setActiveModalProduct(currentProduct)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                
                {/* Click to inspect overlay hint */}
                <div 
                  onClick={() => currentProduct && setActiveModalProduct(currentProduct)}
                  className="absolute bottom-4 right-4 bg-slate-900/90 hover:bg-slate-800 text-xs text-white px-3 py-1.5 rounded-lg border border-white/20 backdrop-blur-md flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Click to Inspect Items</span>
                </div>
              </div>

              {/* Bottom Quick Info inside card */}
              <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading font-bold text-lg text-white">
                    {currentProduct?.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-heading font-black text-2xl text-cyan-400">
                      {settings.currencySymbol}{currentProduct?.price}
                    </span>
                    {currentProduct?.originalPrice && (
                      <span className="text-sm line-through text-slate-500 font-medium">
                        {settings.currencySymbol}{currentProduct.originalPrice}
                      </span>
                    )}
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      20% OFF
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => currentProduct && setActiveModalProduct(currentProduct)}
                  className={`px-4 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-md ${
                    activeEdition === 'cyber'
                      ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20'
                      : 'bg-pink-500 hover:bg-pink-400 text-white shadow-pink-500/20'
                  }`}
                >
                  View Details
                </button>
              </div>

            </div>

            {/* Included highlights pill */}
            <div className="mt-3 text-center">
              <span className="text-xs text-slate-400 font-medium">
                Includes: Rigid Magnetic Box • 12+ Vinyl Stickers • Postcards • Letter • 4x Ticket Passes • Notepads
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
