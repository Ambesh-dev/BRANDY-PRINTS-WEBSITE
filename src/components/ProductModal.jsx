import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle, ShoppingBag, MessageCircle, Star, ShieldCheck, Truck, Sparkles } from 'lucide-react';

export default function ProductModal() {
  const { activeModalProduct, setActiveModalProduct, addToCart, settings } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!activeModalProduct) return null;

  const product = activeModalProduct;
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const currentImage = gallery[activeImageIndex] || product.image;

  const handleWhatsAppOrder = () => {
    const phone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const total = product.price * quantity;
    const text = `Hi Brandy Prints! I want to order ${quantity}x "${product.title}" (${settings.currencySymbol}${total}) from your website. Please share payment and shipping details.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-[#0b101a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setActiveModalProduct(null)}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center border border-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Left: Product Images & Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-white/10 shadow-xl">
                <img
                  src={currentImage}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-cyan-500 text-slate-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails if gallery > 1 */}
              {gallery.length > 1 && (
                <div className="flex items-center gap-3">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx ? 'border-cyan-400 scale-105' : 'border-white/10 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Quality Guarantee Mini Badges */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>100% Handcrafted & Verified Quality by Brandy Prints</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-400" />
                  <span>Fast Insured Dispatch in Bubble Guard Protective Shell</span>
                </div>
              </div>
            </div>

            {/* Right: Product Details & Purchase Actions */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  {product.category}
                </span>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-white mt-1">
                  {product.title}
                </h2>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-white">{product.rating || "5.0"}</span>
                  <span className="text-xs text-slate-400">({product.reviewsCount || 48} Creator Reviews)</span>
                </div>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-slate-950/70 border border-white/5">
                <span className="font-heading font-black text-3xl text-white">
                  {settings.currencySymbol}{product.price * quantity}
                </span>
                {product.originalPrice && (
                  <span className="text-base line-through text-slate-500">
                    {settings.currencySymbol}{product.originalPrice * quantity}
                  </span>
                )}
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed">
                {product.description}
              </p>

              {/* What's Included in this Kit */}
              {product.itemsIncluded && product.itemsIncluded.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Everything Included in This Box:</span>
                  </h4>
                  <ul className="grid grid-cols-1 gap-2 text-xs text-slate-300 bg-slate-950/40 p-4 rounded-2xl border border-white/5">
                    {product.itemsIncluded.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technical Specifications */}
              {product.specs && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Specifications
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="bg-slate-900/60 p-2.5 rounded-xl border border-white/5">
                        <span className="text-slate-400 block text-[10px] font-medium">{key}</span>
                        <span className="text-slate-200 font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Controls & CTAs */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-300">Quantity:</span>
                  <div className="flex items-center border border-white/10 rounded-xl bg-slate-950">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-1.5 text-slate-300 hover:text-white font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 py-1.5 text-sm font-bold text-white min-w-[2rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 py-1.5 text-slate-300 hover:text-white font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => {
                      addToCart(product, quantity);
                      setActiveModalProduct(null);
                    }}
                    className="w-full py-3.5 px-4 rounded-xl font-heading font-bold text-sm bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 hover:brightness-110 shadow-glow-cyan transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4 text-slate-950" />
                    <span>Add to Bag ({settings.currencySymbol}{product.price * quantity})</span>
                  </button>

                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full py-3.5 px-4 rounded-xl font-heading font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                  >
                    <MessageCircle className="w-4 h-4 text-slate-950 fill-slate-950" />
                    <span>Instant WhatsApp Order</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
