import React from 'react';
import { TESTIMONIALS } from '../data/defaultData';
import { Star, CheckCircle, Quote, Sparkles } from 'lucide-react';

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 bg-[#080b11] relative overflow-hidden border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Community Verified</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Loved By <span className="glow-gradient-text">Top Creators</span> & Tech Fans
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            See unboxing reviews and feedback from creators who elevated their channel merchandise with Brandy Prints.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative flex flex-col justify-between hover:border-cyan-500/30 transition-all hover:-translate-y-1"
            >
              <div>
                {/* Stars & Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {t.tag}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                  "{t.comment}"
                </p>
              </div>

              {/* Author */}
              <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 font-heading font-black text-xs flex items-center justify-center">
                  {t.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-white">{t.name}</h4>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
