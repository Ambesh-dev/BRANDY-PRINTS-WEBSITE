import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Trash2, ShoppingBag, ArrowRight, MessageCircle, Truck, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    cartTotal, 
    settings,
    addInquiry
  } = useApp();

  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'form' | 'success'
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: ""
  });

  if (!isCartOpen) return null;

  const freeShippingThreshold = settings.freeShippingThreshold || 999;
  const freeShippingUnlocked = cartTotal >= freeShippingThreshold;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);
  const progressPercent = Math.min(100, Math.round((cartTotal / freeShippingThreshold) * 100));

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    const phone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    let orderSummary = `*NEW ORDER - BRANDY PRINTS*\n\n`;
    orderSummary += `*Items:*\n`;
    cart.forEach((item, idx) => {
      orderSummary += `${idx + 1}. ${item.product.title} (x${item.quantity}) - ${settings.currencySymbol}${item.product.price * item.quantity}\n`;
    });
    orderSummary += `\n*Subtotal:* ${settings.currencySymbol}${cartTotal}\n`;
    orderSummary += `*Shipping:* ${freeShippingUnlocked ? 'FREE' : `${settings.currencySymbol}99`}\n`;
    
    if (customerInfo.name) {
      orderSummary += `\n*Customer Details:*\nName: ${customerInfo.name}\nPhone: ${customerInfo.phone}\nAddress: ${customerInfo.address}, ${customerInfo.city} - ${customerInfo.pincode}\n`;
    }

    orderSummary += `\nPlease confirm availability and payment link!`;

    // Also record in inquiries for admin dashboard
    addInquiry({
      customerName: customerInfo.name || "Direct WhatsApp Shopper",
      channelName: "Store Order",
      email: "order@whatsapp.com",
      whatsapp: customerInfo.phone || "Via WhatsApp",
      kitStyle: "Online Order",
      estimatedQuantity: `${cart.reduce((sum, i) => sum + i.quantity, 0)} items`,
      notes: orderSummary
    });

    try {
      confetti({ particleCount: 70, spread: 50 });
    } catch {}

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(orderSummary)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0b101a] border-l border-white/10 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="font-heading font-black text-xl text-white">Your Order Bag</h2>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3 bg-slate-950 border-b border-white/5 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-cyan-400" />
                {freeShippingUnlocked ? (
                  <span className="text-emerald-400 font-bold">You unlocked FREE Express Delivery!</span>
                ) : (
                  <span>Add <strong className="text-cyan-400">{settings.currencySymbol}{amountToFreeShipping}</strong> for Free Delivery</span>
                )}
              </span>
              <span className="text-slate-400 text-[11px] font-mono">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mx-auto text-slate-600 border border-white/5">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold text-lg text-white">Your bag is empty</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Browse our limited edition collector kits or die-cut sticker drops and add something cool to your desk!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-glow-cyan"
                >
                  Explore Drops
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.product.id}
                  className="flex gap-4 p-3.5 rounded-2xl bg-slate-950/70 border border-white/5"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-18 h-18 rounded-xl object-cover bg-slate-900 border border-white/10 flex-shrink-0"
                    style={{ width: '72px', height: '72px' }}
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-heading font-bold text-xs text-white line-clamp-1">
                        {item.product.title}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-500 hover:text-red-400 p-0.5 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity selector */}
                      <div className="flex items-center border border-white/10 rounded-lg bg-slate-900 text-xs">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, -1)}
                          className="px-2 py-0.5 text-slate-400 hover:text-white font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, 1)}
                          className="px-2 py-0.5 text-slate-400 hover:text-white font-bold"
                        >
                          +
                        </button>
                      </div>

                      {/* Line Price */}
                      <span className="font-heading font-black text-sm text-cyan-400">
                        {settings.currencySymbol}{item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#090d16] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-white font-semibold">{settings.currencySymbol}{cartTotal}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Insured Shipping</span>
                  <span className={freeShippingUnlocked ? "text-emerald-400 font-bold" : "text-white font-semibold"}>
                    {freeShippingUnlocked ? "FREE" : `${settings.currencySymbol}99`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/5">
                  <span className="font-heading">Estimated Total</span>
                  <span className="font-heading font-black text-lg text-cyan-400">
                    {settings.currencySymbol}{freeShippingUnlocked ? cartTotal : cartTotal + 99}
                  </span>
                </div>
              </div>

              {/* Instant WhatsApp Order CTA */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-4 rounded-xl font-heading font-black text-xs uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950 text-slate-950" />
                <span>Confirm & Order on WhatsApp</span>
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>⚡ Direct chat with Brandy Prints team</span>
                <button
                  onClick={clearCart}
                  className="hover:text-red-400 transition-colors"
                >
                  Clear Bag
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
