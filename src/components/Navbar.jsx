import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Menu, X, MessageCircle, Sparkles } from 'lucide-react';
import { YoutubeIcon } from './icons/SocialIcons';

export default function Navbar() {
  const { settings, cartItemsCount, setIsCartOpen, isAdminView, setIsAdminView } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Collector Drops", href: "#catalog" },
    { label: "Unbox Explorer", href: "#unbox-explorer" },
    { label: "Custom Creator Kits", href: "#custom-builder" },
    { label: "YouTube Studio", href: "#youtube-spotlight" },
    { label: "Creator Reviews", href: "#reviews" },
  ];

  const handleWhatsAppClick = () => {
    const phone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(settings.whatsappPrefillMessage || "Hi Brandy Prints!")}`;
    window.open(url, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080b11]/85 backdrop-blur-xl border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center gap-3 group">
          {settings.logoType === 'image' && settings.logoImage ? (
            <img 
              src={settings.logoImage} 
              alt={settings.brandName} 
              className="h-10 w-auto object-contain rounded-lg border border-cyan-500/30"
            />
          ) : (
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-pink-500 p-[1.5px] shadow-glow-cyan transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
                <span className="font-heading font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
                  BP
                </span>
              </div>
            </div>
          )}

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-black tracking-wider text-xl sm:text-2xl text-white group-hover:text-cyan-400 transition-colors">
                {settings.logoType === 'text' && settings.logoText ? settings.logoText : settings.brandName}
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            </div>
            <span className="text-[10px] sm:text-xs text-slate-400 tracking-wider uppercase font-medium">
              Collector Kits & Studio
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-cyan-400 after:to-blue-500 after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Quick WhatsApp Inquiry */}
          <button
            onClick={handleWhatsAppClick}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all hover:scale-105"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-white/10 transition-all hover:border-cyan-500/40"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 text-xs font-bold flex items-center justify-center animate-bounce">
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#090d16] px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-base font-medium text-slate-200 hover:text-cyan-400 border-b border-white/5"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={handleWhatsAppClick}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp Orders</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
