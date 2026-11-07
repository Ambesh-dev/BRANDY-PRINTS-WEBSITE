import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Send, CheckCircle2, ShieldCheck, Box, MessageCircle } from 'lucide-react';
import { YoutubeIcon } from './icons/SocialIcons';
import confetti from 'canvas-confetti';

const KIT_STYLES = [
  { id: "cyber", name: "Cyber Hacker (Dark & Cyan Neon)", desc: "Like AI Bunny Hacker Edition" },
  { id: "kawaii", name: "Girl Tech / Aesthetic Pastel", desc: "Like AI Bunny Girl Edition" },
  { id: "luxury", name: "Luxury Black & Gold Foil", desc: "Matte Black with Metallic Foil" },
  { id: "gaming", name: "Esports & Gaming Vivid", desc: "High contrast vivid RGB gaming style" },
];

const ITEMS_OPTIONS = [
  "Rigid Magnetic Gift Box with Custom Art",
  "Die-Cut Holographic Vinyl Stickers",
  "Scannable VIP Passes / Ticket Cards",
  "Personalized Welcome Letter & Envelope",
  "Custom Printed Desk Notepad / Planner",
  "Numbered Collector Foil Card",
  "Art Print Postcards (Set of 3)"
];

export default function CustomKitBuilder() {
  const { addInquiry, settings } = useApp();

  const [formData, setFormData] = useState({
    creatorName: "",
    channelName: "",
    email: "",
    whatsapp: "",
    kitStyle: "Cyber Hacker (Dark & Cyan Neon)",
    selectedItems: [
      "Rigid Magnetic Gift Box with Custom Art",
      "Die-Cut Holographic Vinyl Stickers",
      "Scannable VIP Passes / Ticket Cards"
    ],
    estimatedQuantity: "25 Kits (Recommended for First Run)",
    notes: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleItem = (item) => {
    setFormData(prev => {
      const exists = prev.selectedItems.includes(item);
      if (exists) {
        return { ...prev, selectedItems: prev.selectedItems.filter(i => i !== item) };
      } else {
        return { ...prev, selectedItems: [...prev.selectedItems, item] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.creatorName || !formData.whatsapp) {
      alert("Please enter your name and WhatsApp number.");
      return;
    }

    addInquiry({
      customerName: formData.creatorName,
      channelName: formData.channelName || "Independent Creator",
      email: formData.email,
      whatsapp: formData.whatsapp,
      kitStyle: formData.kitStyle,
      estimatedQuantity: formData.estimatedQuantity,
      notes: `Included items: ${formData.selectedItems.join(', ')}. Details: ${formData.notes || 'None'}`
    });

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    setIsSubmitted(true);
  };

  const handleOpenWhatsAppChat = () => {
    const phone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const message = `Hi Brandy Prints! I just requested a Custom Creator Kit quote on your site.\n\nName: ${formData.creatorName}\nChannel: ${formData.channelName}\nStyle: ${formData.kitStyle}\nQuantity: ${formData.estimatedQuantity}\nItems: ${formData.selectedItems.join(', ')}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="custom-builder" className="py-20 bg-[#07090f] relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/20 text-purple-300 text-xs font-bold uppercase tracking-wider">
            <Box className="w-3.5 h-3.5 text-purple-400" />
            <span>For YouTubers, Streamers & Brands</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Build Your Own <span className="glow-gradient-text">Creator Merch Box</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Want an AI Bunny-style collector kit tailored to your own YouTube channel, mascot, and branding? Fill out the creator spec sheet below and we'll craft a custom quote for you!
          </p>
        </div>

        {isSubmitted ? (
          <div className="glass-panel rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto border border-emerald-500/30 shadow-2xl animate-fade-in space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-heading font-black text-2xl text-white">
                Request Sent to Brandy Prints Studio!
              </h3>
              <p className="text-sm text-slate-300">
                Thank you <strong className="text-cyan-400">{formData.creatorName}</strong>. Your custom kit specification has been logged in our system. We will review your channel and message you directly on WhatsApp.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleOpenWhatsAppChat}
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-heading font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950 text-slate-950" />
                <span>Chat Instantly on WhatsApp</span>
              </button>

              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm transition-all"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit}
            className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl space-y-8"
          >
            {/* Step 1: Creator & Channel details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase tracking-wider">
                <YoutubeIcon className="w-4 h-4" />
                <span>1. Creator & Channel Information</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Your Name / Founder *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.creatorName}
                    onChange={(e) => setFormData({ ...formData, creatorName: e.target.value })}
                    placeholder="e.g. Aman Sharma"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    YouTube Channel / Brand Name
                  </label>
                  <input
                    type="text"
                    value={formData.channelName}
                    onChange={(e) => setFormData({ ...formData, channelName: e.target.value })}
                    placeholder="e.g. CodeCraft Hindi (50k subs)"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    WhatsApp Number (for Design Proofs & Quotes) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. contact@yourchannel.com"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Preferred Style */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>2. Select Kit Aesthetic Style</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {KIT_STYLES.map((style) => (
                  <div
                    key={style.id}
                    onClick={() => setFormData({ ...formData, kitStyle: style.name })}
                    className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                      formData.kitStyle === style.name
                        ? 'bg-slate-900 border-cyan-400 shadow-glow-cyan'
                        : 'bg-slate-950/60 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-heading font-bold text-sm text-white">{style.name}</span>
                      <span className={`w-3.5 h-3.5 rounded-full border ${
                        formData.kitStyle === style.name ? 'border-cyan-400 bg-cyan-400' : 'border-slate-500'
                      }`}></span>
                    </div>
                    <p className="text-xs text-slate-400">{style.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3: Choose items to include */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-cyan-400 font-bold text-sm uppercase tracking-wider">
                  3. Select Items to Include in Box
                </span>
                <span className="text-xs text-slate-400">
                  {formData.selectedItems.length} items chosen
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ITEMS_OPTIONS.map((item) => {
                  const isChecked = formData.selectedItems.includes(item);
                  return (
                    <div
                      key={item}
                      onClick={() => toggleItem(item)}
                      className={`p-3 rounded-xl border cursor-pointer text-xs font-semibold flex items-center justify-between transition-all ${
                        isChecked
                          ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300'
                          : 'bg-slate-950/40 border-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>{item}</span>
                      <span className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                        isChecked ? 'bg-cyan-400 border-cyan-400 text-slate-950 font-bold' : 'border-slate-600'
                      }`}>
                        {isChecked ? "✓" : ""}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Estimated Quantity & Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Estimated Quantity
                </label>
                <select
                  value={formData.estimatedQuantity}
                  onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                  <option value="1 Sample Kit (Prototype First)">1 Prototype Sample Kit (Test before full run)</option>
                  <option value="10 Kits (Limited Elite Batch)">10 Kits (Limited Drop for Top Fans)</option>
                  <option value="25 Kits (Recommended for First Run)">25 Kits (Recommended First Channel Drop)</option>
                  <option value="50 Kits (Standard Community Drop)">50 Kits (Community Drop)</option>
                  <option value="100+ Kits (Full Production Run)">100+ Kits (Full Mass Production)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Channel Theme / Mascot Notes
                </label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. We have a cyber wolf mascot, need purple/black theme"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-xl font-heading font-black text-sm uppercase tracking-wider bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-slate-950 hover:brightness-110 shadow-glow-cyan transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-slate-950" />
                <span>Request Custom Channel Kit Quote</span>
              </button>
              <p className="text-center text-xs text-slate-400 mt-3">
                No upfront commitment. Our design studio will review your mascot/branding and send a 3D mock preview.
              </p>
            </div>

          </form>
        )}

      </div>
    </section>
  );
}
