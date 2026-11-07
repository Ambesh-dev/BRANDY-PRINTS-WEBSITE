import React from 'react';
import { useApp } from '../context/AppContext';
import { MessageCircle, Lock, Heart, Shield, ArrowUp } from 'lucide-react';
import { YoutubeIcon, InstagramIcon } from './icons/SocialIcons';

export default function Footer() {
  const { settings } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    const phone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${phone}?text=Hi%20Brandy%20Prints!`, '_blank');
  };

  return (
    <footer className="bg-[#05070c] border-t border-white/10 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-pink-500 p-[1.5px]">
                <div className="w-full h-full bg-[#05070c] rounded-[6px] flex items-center justify-center font-heading font-black text-xs text-white">
                  BP
                </div>
              </div>
              <span className="font-heading font-black text-xl text-white tracking-wider">
                {settings.brandName}
              </span>
            </div>

            <p className="text-slate-400 max-w-sm leading-relaxed text-xs">
              {settings.tagline} We design, engineer, and hand-assemble premium collector boxes, die-cut vinyl stickers, VIP ticket passes, and creator merchandise for YouTubers and communities worldwide.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.youtubeChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-red-600/20 text-slate-300 hover:text-red-400 border border-white/5 flex items-center justify-center transition-colors"
                title="YouTube Channel"
              >
                <YoutubeIcon className="w-4 h-4 fill-current" />
              </a>

              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-pink-600/20 text-slate-300 hover:text-pink-400 border border-white/5 flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              <button
                onClick={handleWhatsApp}
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-emerald-600/20 text-slate-300 hover:text-emerald-400 border border-white/5 flex items-center justify-center transition-colors"
                title="WhatsApp Direct"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2">
              <li><a href="#catalog" className="hover:text-cyan-400 transition-colors">Collector Drops</a></li>
              <li><a href="#unbox-explorer" className="hover:text-cyan-400 transition-colors">What's in the Box</a></li>
              <li><a href="#custom-builder" className="hover:text-cyan-400 transition-colors">Custom Creator Kits</a></li>
              <li><a href="#youtube-spotlight" className="hover:text-cyan-400 transition-colors">YouTube Channel</a></li>
              <li><a href="#reviews" className="hover:text-cyan-400 transition-colors">Creator Reviews</a></li>
            </ul>
          </div>

          {/* Support & Policies */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider">Studio Guarantee</h4>
            <ul className="space-y-2 text-slate-400">
              <li>100% Insured Shipping</li>
              <li>Waterproof 3M Vinyl</li>
              <li>Matte Velvet Finish</li>
              <li>Prototype Approval</li>
              <li>WhatsApp Support</li>
            </ul>
          </div>

          {/* Contact & Custom Orders */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider">Direct Studio Inquiry</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Have questions about sample kits, bulk merchandise drops, or custom packaging? Chat directly with our print team.
            </p>
            <button
              onClick={handleWhatsApp}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all hover:scale-105"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Direct WhatsApp Inquiry</span>
            </button>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} {settings.brandName}. All rights reserved. Handcrafted with passion for the creator community.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
