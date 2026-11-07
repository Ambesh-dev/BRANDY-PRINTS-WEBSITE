import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, ShoppingBag, Eye, Star, MessageCircle, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export default function ProductCatalog() {
  const { 
    products, 
    categories, 
    selectedCategory, 
    setSelectedCategory, 
    settings, 
    addToCart, 
    setActiveModalProduct 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured"); // 'featured' | 'price-low' | 'price-high' | 'rating'

  // Filter & Search logic
  const filteredProducts = products.filter((prod) => {
    const matchesCategory = selectedCategory === "All" || prod.category === selectedCategory;
    const matchesSearch = prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return 0; // default featured
  });

  const handleWhatsAppOrder = (product, e) => {
    e.stopPropagation();
    const phone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const text = `Hi Brandy Prints! I want to order "${product.title}" (${settings.currencySymbol}${product.price}) from your website. Is it available?`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="catalog" className="py-20 bg-[#080b11] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <span>Exclusive Catalog</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Official Drops & <span className="glow-gradient-text">Creator Gear</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            From complete limited-run collector boxes to holographic vinyl sticker sheets and bespoke creator merch.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
          
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-slate-900/90 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-900/90 border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-cyan-400 cursor-pointer appearance-none pr-8"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Product Cards Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-16 bg-slate-950/40 rounded-3xl border border-white/5">
            <p className="text-slate-400 text-base">No products found matching your filter.</p>
            <button
              onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
              className="mt-4 px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-400 text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {sortedProducts.map((product) => {
              const isCyber = product.themeColor === 'cyan' || product.title.includes('Cyber');
              const isPink = product.themeColor === 'pink' || product.title.includes('Girl');

              return (
                <div
                  key={product.id}
                  onClick={() => setActiveModalProduct(product)}
                  className="group relative bg-[#0d121c] rounded-3xl overflow-hidden border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col cursor-pointer"
                >
                  {/* Image Display */}
                  <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d121c] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                      {product.badge && (
                        <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-md ${
                          isPink 
                            ? 'bg-pink-500 text-white' 
                            : 'bg-cyan-500 text-slate-950'
                        }`}>
                          {product.badge}
                        </span>
                      )}
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalProduct(product);
                        }}
                        className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-cyan-500 hover:text-slate-950 transition-colors"
                        title="Quick View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Items count tag */}
                    {product.itemsIncluded && product.itemsIncluded.length > 0 && (
                      <div className="absolute bottom-3 left-4 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-300 border border-white/10">
                        {product.itemsIncluded.length} Items Included
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category & Rating */}
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-slate-400 font-medium">
                          {product.category}
                        </span>
                        <div className="flex items-center gap-1 text-amber-400 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{product.rating || "5.0"}</span>
                          <span className="text-slate-500 text-[11px]">({product.reviewsCount || 12})</span>
                        </div>
                      </div>

                      {/* Product Title */}
                      <h3 className="font-heading font-bold text-lg text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                        {product.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Price & Action Buttons */}
                    <div className="pt-5 mt-4 border-t border-white/5 space-y-3">
                      <div className="flex items-baseline justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="font-heading font-black text-2xl text-white">
                            {settings.currencySymbol}{product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs line-through text-slate-500">
                              {settings.currencySymbol}{product.originalPrice}
                            </span>
                          )}
                        </div>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                          product.inStock 
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' 
                            : 'bg-red-500/15 text-red-400'
                        }`}>
                          {product.inStock ? 'Ready to Ship' : 'Out of Stock'}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product, 1);
                          }}
                          className="py-2.5 px-3 rounded-xl text-xs font-bold bg-white/10 hover:bg-cyan-500 hover:text-slate-950 text-white border border-white/10 transition-all flex items-center justify-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </button>

                        <button
                          onClick={(e) => handleWhatsAppOrder(product, e)}
                          className="py-2.5 px-3 rounded-xl text-xs font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 transition-all flex items-center justify-center gap-1.5"
                          title="Instant WhatsApp Order"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
