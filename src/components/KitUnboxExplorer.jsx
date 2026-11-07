import React, { useState } from 'react';
import { Package, Layers, QrCode, FileText, Image, Sparkles, Check, ArrowRight } from 'lucide-react';

const KIT_ITEMS = [
  {
    id: "box",
    title: "1. Rigid Magnetic Collector Box",
    category: "Packaging",
    icon: Package,
    shortDesc: "1200 GSM Hardboard with Velvet Matte Coating",
    details: "Custom engineered heavy-gauge board box with hidden magnetic clasp closure. Features high-contrast neon accents, gold foil accents, and protective custom foam/board compartments inside.",
    specs: "28cm x 20cm x 5.5cm • 1200 GSM • Soft-touch lamination"
  },
  {
    id: "stickers",
    title: "2. Die-Cut Vinyl Sticker Collection",
    category: "Decals",
    icon: Sparkles,
    shortDesc: "12+ Heavyweight Waterproof Vinyl Stickers",
    details: "Precision die-cut stickers featuring mascots, terminal codes, ethical hacking badges, and cyber emblems. UV-cured ink prevents fading on laptops, water bottles, and cars.",
    specs: "3M Vinyl • 100% Waterproof & Scratchproof • Zero residue"
  },
  {
    id: "passes",
    title: "3. VIP Event Passes & Tickets (with QR)",
    category: "VIP Cards",
    icon: QrCode,
    shortDesc: "Scannable Access Cards with Real URLs",
    details: "Authentic festival & tech conference admission tickets: Access Pass, Ethical Hacking Workshop, AI Tools Masterclass, and Lifetime Community Member. Scannable QR codes link directly to online resources.",
    specs: "400 GSM Art Board • Foil stamped • Perforated ticket edges"
  },
  {
    id: "letter",
    title: "4. Personal Letter & Branded Envelope",
    category: "Stationery",
    icon: FileText,
    shortDesc: "Handwritten Note from Creator to Fans",
    details: "A bespoke typed welcome letter warmly welcoming fans or tech learners into the inner circle, sealed in a matching luxury stamped envelope with custom wax-seal artwork.",
    specs: "120 GSM Fine Parchment • Matching colored kraft envelope"
  },
  {
    id: "prints",
    title: "5. Fine Art Prints & Postcards",
    category: "Artwork",
    icon: Image,
    shortDesc: "3x Full-Color Landscape Collector Prints",
    details: "High-gamut vivid prints illustrating the mascot in anime/cyber landscapes, sunset rooftops, and tech workstations. Perfect for framing or pinning above your desk setup.",
    specs: "350 GSM Matte Pearl Board • High Dmax Deep Black Inks"
  },
  {
    id: "notepads",
    title: "6. Code To-Do & Dot-Grid Notepads",
    category: "Productivity",
    icon: Layers,
    shortDesc: "2x 50-Sheet Tear-Off Desk Sprints",
    details: "Compact desk companions featuring an ethical hacker task checklist and a technical dot-grid notepad for wireframes, algorithms, and daily developer notes.",
    specs: "100 GSM Bleed-Resistant Cream Paper • Chipboard Backing"
  }
];

export default function KitUnboxExplorer() {
  const [selectedItem, setSelectedItem] = useState(KIT_ITEMS[0]);

  return (
    <section id="unbox-explorer" className="py-20 bg-[#07090f] relative overflow-hidden border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-400 text-xs font-bold tracking-wider uppercase">
            <Layers className="w-3.5 h-3.5" />
            <span>Anatomy of a Brandy Prints Collector Kit</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            What Makes Our Kits Truly <span className="glow-gradient-text">World Class?</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Every single piece inside the box is designed, cut, stamped, and curated with obsessive attention to detail. No cheap fillers—pure collectible value.
          </p>
        </div>

        {/* Interactive 2-Column Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Item Selector Cards */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
              Select any component to inspect:
            </h3>

            {KIT_ITEMS.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedItem.id === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border flex items-center justify-between ${
                    isSelected
                      ? 'bg-slate-900/90 border-cyan-400/60 shadow-glow-cyan translate-x-2'
                      : 'bg-slate-950/60 border-white/5 hover:border-white/20 hover:bg-slate-900/40'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`font-heading font-bold text-sm ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {item.shortDesc}
                      </p>
                    </div>
                  </div>

                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                    isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-500'
                  }`}>
                    {item.category}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right: Detailed Deep Dive of the selected item */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
              
              {/* Background ambient badge */}
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Package className="w-64 h-64 text-white" />
              </div>

              {/* Tag & Title */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  {selectedItem.category} Focus
                </span>
                <span className="text-xs text-slate-400">
                  Inspecting item {KIT_ITEMS.findIndex(i => i.id === selectedItem.id) + 1} of {KIT_ITEMS.length}
                </span>
              </div>

              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mb-4">
                {selectedItem.title}
              </h3>

              <p className="text-slate-300 text-base leading-relaxed mb-6">
                {selectedItem.details}
              </p>

              {/* Technical Specifications Box */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-white/10 mb-8">
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Technical Specifications & Materials</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 font-mono">
                  {selectedItem.specs}
                </p>
              </div>

              {/* Photos Gallery teaser inside unbox */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden aspect-video border border-white/10 shadow-lg relative group">
                  <img
                    src="/images/kit-cyber-bunny.jpg"
                    alt="Cyber Edition Detail"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/75 px-2 py-0.5 rounded text-[11px] font-medium text-cyan-300">
                    Cyber Edition View
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden aspect-video border border-white/10 shadow-lg relative group">
                  <img
                    src="/images/kit-girl-edition.jpg"
                    alt="Girl Edition Detail"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/75 px-2 py-0.5 rounded text-[11px] font-medium text-pink-300">
                    Girl Edition View
                  </div>
                </div>
              </div>

              {/* Bottom CTA for custom creators */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-400 text-center sm:text-left">
                  Want this exact kit format customized with your YouTube channel branding?
                </div>
                <a
                  href="#custom-builder"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center gap-2"
                >
                  <span>Build Channel Kit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
