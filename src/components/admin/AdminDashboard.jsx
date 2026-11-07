import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Package, 
  Settings as SettingsIcon, 
  Inbox, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Check, 
  Upload, 
  Image as ImageIcon, 
  MessageCircle, 
  RotateCcw, 
  Download, 
  FileUp, 
  ShieldCheck, 
  ArrowLeft,
  DollarSign,
  TrendingUp,
  Tag,
  Eye
} from 'lucide-react';
import { YoutubeIcon } from '../icons/SocialIcons';

export default function AdminDashboard() {
  const { 
    settings, 
    updateSettings, 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    categories, 
    inquiries, 
    updateInquiryStatus, 
    deleteInquiry, 
    resetToDefaultData, 
    setIsAdminView,
    closeAdmin,
    isAdminAuthenticated,
    setIsAdminAuthenticated,
    showToast
  } = useApp();

  const [enteredPin, setEnteredPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'settings' | 'inquiries' | 'backup'
  
  // Product Edit / Create Modal state
  const [editingProduct, setEditingProduct] = useState(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  
  // Temporary form state for product
  const [productForm, setProductForm] = useState({
    title: "",
    subtitle: "",
    category: "Collector Kits",
    price: 1999,
    originalPrice: 2499,
    badge: "New Drop",
    image: "/images/kit-cyber-bunny.jpg",
    inStock: true,
    themeColor: "cyan",
    description: "",
    itemsIncludedText: "",
    specsText: ""
  });

  // Website Settings Form State
  const [settingsForm, setSettingsForm] = useState({ ...settings });

  // Sync settingsForm whenever settings change
  const handleSettingsChange = (field, value) => {
    setSettingsForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateSettings(settingsForm);
  };

  // Open Create Product
  const startCreateProduct = () => {
    setProductForm({
      title: "",
      subtitle: "",
      category: categories[1] || "Collector Kits",
      price: 1499,
      originalPrice: 1999,
      badge: "New Drop",
      image: "/images/kit-cyber-bunny.jpg",
      inStock: true,
      themeColor: "cyan",
      description: "Handcrafted unboxing kit with custom collector components.",
      itemsIncludedText: "1x Custom Rigid Collector Box\n1x Holographic Foil Collector Card\n1x Die-Cut Vinyl Sticker Pack (12x Stickers)\n1x Welcome Letter & Matching Envelope\n3x Art Card Prints\n4x VIP Event Ticket Passes with QR Codes",
      specsText: "Box Dimensions: 28 x 20 x 5.5 cm\nBox Material: 1200 GSM Hardboard\nStickers: Waterproof Vinyl"
    });
    setIsCreatingProduct(true);
    setEditingProduct(null);
  };

  // Open Edit Product
  const startEditProduct = (prod) => {
    setEditingProduct(prod);
    setIsCreatingProduct(false);
    setProductForm({
      title: prod.title,
      subtitle: prod.subtitle || "",
      category: prod.category || "Collector Kits",
      price: prod.price,
      originalPrice: prod.originalPrice || "",
      badge: prod.badge || "",
      image: prod.image || "",
      inStock: prod.inStock !== undefined ? prod.inStock : true,
      themeColor: prod.themeColor || "cyan",
      description: prod.description || "",
      itemsIncludedText: (prod.itemsIncluded || []).join('\n'),
      specsText: Object.entries(prod.specs || {}).map(([k, v]) => `${k}: ${v}`).join('\n')
    });
  };

  // Save Product (Create or Update)
  const handleSaveProduct = (e) => {
    e.preventDefault();
    
    // Parse itemsIncluded from newline text
    const itemsIncluded = productForm.itemsIncludedText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    // Parse specs from key: value lines
    const specs = {};
    productForm.specsText.split('\n').forEach(line => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        specs[parts[0].trim()] = parts.slice(1).join(':').trim();
      }
    });

    const productPayload = {
      title: productForm.title,
      subtitle: productForm.subtitle,
      category: productForm.category,
      price: Number(productForm.price) || 0,
      originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : null,
      badge: productForm.badge,
      image: productForm.image,
      gallery: [productForm.image],
      inStock: productForm.inStock,
      themeColor: productForm.themeColor,
      description: productForm.description,
      itemsIncluded,
      specs
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productPayload);
      setEditingProduct(null);
    } else {
      addProduct(productPayload);
      setIsCreatingProduct(false);
    }
  };

  // Image File Upload Helper (converts to base64 data url)
  const handleImageUpload = (e, callback) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size should be less than 2MB for browser local storage.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Export JSON Backup
  const handleExportData = () => {
    const exportObject = {
      settings,
      products,
      inquiries,
      exportedAt: new Date().toISOString()
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObject, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `brandy_prints_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Downloaded backup JSON file!");
  };

  // Import JSON Backup
  const handleImportData = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.settings) updateSettings(parsed.settings);
        if (parsed.products && Array.isArray(parsed.products)) {
          localStorage.setItem('brandy_products', JSON.stringify(parsed.products));
          window.location.reload();
        }
        showToast("Backup restored successfully!");
      } catch (err) {
        alert("Invalid JSON backup file!");
      }
    };
    reader.readAsText(file);
  };

  // PIN Verification Check
  const handleVerifyPin = (e) => {
    e.preventDefault();
    const correctPin = settings.adminPin || "2026";
    if (enteredPin === correctPin) {
      setIsAdminAuthenticated(true);
      setPinError(false);
      showToast("Access Granted: Welcome back, Admin!");
    } else {
      setPinError(true);
      showToast("Incorrect PIN. Please try again.", "error");
    }
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#07090f] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0b101a] border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6 text-center animate-fade-in">
          
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-pink-500 p-[2px] mx-auto shadow-glow-cyan">
            <div className="w-full h-full bg-[#080b11] rounded-[14px] flex items-center justify-center font-heading font-black text-xl text-white">
              BP
            </div>
          </div>

          <div>
            <h2 className="font-heading font-black text-2xl text-white">Brandy Prints Admin</h2>
            <p className="text-xs text-slate-400 mt-1">
              Private Content & Catalog Management System
            </p>
          </div>

          <form onSubmit={handleVerifyPin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 text-left">
                Enter Admin Security PIN (Default: 2026)
              </label>
              <input
                type="password"
                maxLength={8}
                autoFocus
                value={enteredPin}
                onChange={(e) => { setEnteredPin(e.target.value); setPinError(false); }}
                placeholder="Enter 4-digit PIN..."
                className={`w-full bg-slate-950 border rounded-xl px-4 py-3 text-center text-lg tracking-widest text-white focus:outline-none ${
                  pinError ? 'border-red-500 bg-red-950/20' : 'border-white/10 focus:border-cyan-400'
                }`}
              />
              {pinError && (
                <p className="text-xs text-red-400 mt-1.5 text-left">
                  Incorrect PIN entered. Default is 2026.
                </p>
              )}
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-glow-cyan transition-all"
              >
                Unlock Admin Dashboard
              </button>

              <button
                type="button"
                onClick={closeAdmin}
                className="w-full py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                Back to Website
              </button>
            </div>
          </form>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090f] text-slate-200">
      
      {/* Admin Top Navbar */}
      <header className="sticky top-0 z-30 bg-[#0b101a] border-b border-white/10 px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-glow-pink">
            BP
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-black text-lg text-white">Brandy Prints Studio Admin</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                LIVE CMS
              </span>
            </div>
            <p className="text-xs text-slate-400">Manage catalog, logo, hero texts, YouTube links & creator quotes</p>
          </div>
        </div>

        <button
          onClick={closeAdmin}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Website</span>
        </button>
      </header>

      {/* Main Admin Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 border-b border-white/10 scrollbar-none">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'products'
                ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan'
                : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Product Catalog ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'settings'
                ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan'
                : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <SettingsIcon className="w-4 h-4" />
            <span>Website Branding & Texts</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'inquiries'
                ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan'
                : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Creator Inquiries ({inquiries.length})</span>
            {inquiries.some(i => i.status === 'New') && (
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'backup'
                ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan'
                : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Backup & Reset</span>
          </button>
        </div>

        {/* TAB 1: PRODUCT CATALOG MANAGER */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-heading font-black text-xl text-white">All Store Products & Collector Kits</h2>
                <p className="text-xs text-slate-400">Add new items, update prices, edit included box contents, or upload kit photos.</p>
              </div>

              <button
                onClick={startCreateProduct}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-heading font-bold text-xs uppercase tracking-wider shadow-glow-cyan transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            {/* Products Table / Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod) => (
                <div 
                  key={prod.id}
                  className="bg-[#0b101a] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-cyan-500/30 transition-all shadow-xl"
                >
                  <div className="relative aspect-video bg-slate-950">
                    <img 
                      src={prod.image} 
                      alt={prod.title} 
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded border border-white/10">
                      {prod.category}
                    </span>
                    <span className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded ${
                      prod.inStock ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {prod.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-heading font-bold text-sm text-white line-clamp-1">{prod.title}</h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{prod.description}</p>
                      
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="font-heading font-black text-lg text-cyan-400">
                          {settings.currencySymbol}{prod.price}
                        </span>
                        {prod.originalPrice && (
                          <span className="text-xs line-through text-slate-500">
                            {settings.currencySymbol}{prod.originalPrice}
                          </span>
                        )}
                      </div>

                      {prod.itemsIncluded && (
                        <div className="mt-2 text-[11px] text-slate-400 font-medium">
                          📦 {prod.itemsIncluded.length} items configured in kit
                        </div>
                      )}
                    </div>

                    <div className="pt-4 mt-3 border-t border-white/5 flex items-center justify-between gap-2">
                      <button
                        onClick={() => startEditProduct(prod)}
                        className="flex-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${prod.title}"?`)) {
                            deleteProduct(prod.id);
                          }
                        }}
                        className="py-2 px-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: WEBSITE BRANDING & SETTINGS MANAGER */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="space-y-8 max-w-4xl">
            
            {/* 1. Brand Identity & Logo */}
            <div className="bg-[#0b101a] p-6 rounded-2xl border border-white/10 space-y-4">
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <Tag className="w-4 h-4 text-cyan-400" />
                <span>1. Brand Name & Logo Customization</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Website Name (Brand Name)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.brandName}
                    onChange={(e) => handleSettingsChange('brandName', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Brand Tagline
                  </label>
                  <input
                    type="text"
                    value={settingsForm.tagline}
                    onChange={(e) => handleSettingsChange('tagline', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Logo Selection: Text vs Image */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-3">
                <label className="block text-xs font-bold text-slate-300">
                  Logo Display Style
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-200">
                    <input
                      type="radio"
                      name="logoType"
                      checked={settingsForm.logoType === 'text'}
                      onChange={() => handleSettingsChange('logoType', 'text')}
                      className="text-cyan-400"
                    />
                    <span>Text Typography Logo</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-200">
                    <input
                      type="radio"
                      name="logoType"
                      checked={settingsForm.logoType === 'image'}
                      onChange={() => handleSettingsChange('logoType', 'image')}
                      className="text-cyan-400"
                    />
                    <span>Upload Custom Image Logo</span>
                  </label>
                </div>

                {settingsForm.logoType === 'text' ? (
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Logo Text Displayed</label>
                    <input
                      type="text"
                      value={settingsForm.logoText}
                      onChange={(e) => handleSettingsChange('logoText', e.target.value)}
                      placeholder="BRANDY PRINTS"
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="block text-xs text-slate-400">Upload Logo Image (PNG / SVG / JPG)</label>
                    <div className="flex items-center gap-3">
                      <label className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white cursor-pointer flex items-center gap-2 border border-white/10">
                        <Upload className="w-4 h-4 text-cyan-400" />
                        <span>Choose File</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, (dataUrl) => handleSettingsChange('logoImage', dataUrl))}
                        />
                      </label>
                      {settingsForm.logoImage && (
                        <div className="flex items-center gap-2">
                          <img src={settingsForm.logoImage} alt="logo preview" className="h-8 max-w-[120px] object-contain rounded bg-black/40 p-1" />
                          <button
                            type="button"
                            onClick={() => handleSettingsChange('logoImage', '')}
                            className="text-xs text-red-400 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 2. Announcement Bar & Hero Texts */}
            <div className="bg-[#0b101a] p-6 rounded-2xl border border-white/10 space-y-4">
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>2. Announcement Bar & Hero Headline Texts</span>
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300">
                    Announcement Bar Text (Top of page)
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settingsForm.announcementActive}
                      onChange={(e) => handleSettingsChange('announcementActive', e.target.checked)}
                      className="rounded"
                    />
                    <span>Show Announcement</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={settingsForm.announcementText}
                  onChange={(e) => handleSettingsChange('announcementText', e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Hero Main Headline
                </label>
                <input
                  type="text"
                  value={settingsForm.heroTitle}
                  onChange={(e) => handleSettingsChange('heroTitle', e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Hero Subtitle Paragraph
                </label>
                <textarea
                  rows={3}
                  value={settingsForm.heroSubtitle}
                  onChange={(e) => handleSettingsChange('heroSubtitle', e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Hero Top Pill Badge
                </label>
                <input
                  type="text"
                  value={settingsForm.heroBadge}
                  onChange={(e) => handleSettingsChange('heroBadge', e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                />
              </div>
            </div>

            {/* 3. YouTube Channel Integration */}
            <div className="bg-[#0b101a] p-6 rounded-2xl border border-white/10 space-y-4">
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <YoutubeIcon className="w-5 h-5 text-red-500 fill-red-500" />
                <span>3. YouTube Channel & Video Embed</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    YouTube Channel Name
                  </label>
                  <input
                    type="text"
                    value={settingsForm.youtubeChannelName}
                    onChange={(e) => handleSettingsChange('youtubeChannelName', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Subscribers Badge Text
                  </label>
                  <input
                    type="text"
                    value={settingsForm.youtubeSubscribers}
                    onChange={(e) => handleSettingsChange('youtubeSubscribers', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    YouTube Channel Link
                  </label>
                  <input
                    type="text"
                    value={settingsForm.youtubeChannelUrl}
                    onChange={(e) => handleSettingsChange('youtubeChannelUrl', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Featured Unboxing Video ID (e.g. dQw4w9WgXcQ)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.youtubeVideoId}
                    onChange={(e) => handleSettingsChange('youtubeVideoId', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>
              </div>
            </div>

            {/* 4. Contact & WhatsApp Integration */}
            <div className="bg-[#0b101a] p-6 rounded-2xl border border-white/10 space-y-4">
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>4. WhatsApp Order Receiving & Contact Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    WhatsApp Number (with Country Code)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.whatsappNumber}
                    onChange={(e) => handleSettingsChange('whatsappNumber', e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Contact Email Address
                  </label>
                  <input
                    type="email"
                    value={settingsForm.contactEmail}
                    onChange={(e) => handleSettingsChange('contactEmail', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Instagram Profile URL
                  </label>
                  <input
                    type="text"
                    value={settingsForm.instagramUrl}
                    onChange={(e) => handleSettingsChange('instagramUrl', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Currency Symbol
                  </label>
                  <input
                    type="text"
                    value={settingsForm.currencySymbol}
                    onChange={(e) => handleSettingsChange('currencySymbol', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>
              </div>

              {/* Admin Security PIN */}
              <div className="pt-2 border-t border-white/5">
                <label className="block text-xs font-semibold text-cyan-400 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Panel Secret PIN (Security Lock)</span>
                </label>
                <div className="max-w-xs">
                  <input
                    type="text"
                    value={settingsForm.adminPin || "2026"}
                    onChange={(e) => handleSettingsChange('adminPin', e.target.value)}
                    placeholder="2026"
                    className="w-full bg-slate-950 border border-cyan-500/30 rounded-xl px-4 py-2 text-sm text-white font-mono tracking-widest"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    This PIN protects the Admin page when accessing via #admin or Ctrl+Shift+A.
                  </p>
                </div>
              </div>
            </div>

            {/* Save Settings Button */}
            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="px-8 py-3.5 rounded-xl font-heading font-black text-xs uppercase tracking-wider bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-glow-cyan transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save All Website Settings</span>
              </button>
            </div>

          </form>
        )}

        {/* TAB 3: INQUIRIES & ORDERS MANAGER */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading font-black text-xl text-white">Creator Inquiries & Store Orders</h2>
                <p className="text-xs text-slate-400">All submissions from the Custom Kit Builder and Store Bag checkouts.</p>
              </div>
            </div>

            {inquiries.length === 0 ? (
              <div className="p-12 text-center bg-[#0b101a] rounded-2xl border border-white/10">
                <p className="text-slate-400 text-sm">No incoming creator inquiries or orders yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div 
                    key={inq.id}
                    className="bg-[#0b101a] p-5 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-base text-white">{inq.customerName}</span>
                        <span className="text-xs text-cyan-400 font-medium">({inq.channelName})</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          inq.status === 'New' ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {inq.status}
                        </span>
                      </div>
                      
                      <div className="text-xs text-slate-400 flex flex-wrap gap-x-4 gap-y-1">
                        <span>📅 {inq.date}</span>
                        <span>🎨 Style: {inq.kitStyle}</span>
                        <span>📦 Qty: {inq.estimatedQuantity}</span>
                        <span>📱 WhatsApp: <strong className="text-emerald-400">{inq.whatsapp}</strong></span>
                      </div>

                      <p className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-white/5 whitespace-pre-wrap">
                        {inq.notes}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-center">
                      {/* WhatsApp Direct Chat */}
                      {inq.whatsapp && (
                        <a
                          href={`https://wa.me/${inq.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${inq.customerName}! I received your kit inquiry on Brandy Prints.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Chat</span>
                        </a>
                      )}

                      {/* Status Selector */}
                      <select
                        value={inq.status}
                        onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                        className="bg-slate-900 border border-white/10 text-xs text-slate-300 rounded-lg px-2.5 py-2 focus:outline-none"
                      >
                        <option value="New">New</option>
                        <option value="In Discussion">In Discussion</option>
                        <option value="Design Proof Approved">Proof Approved</option>
                        <option value="In Production">In Production</option>
                        <option value="Completed">Completed</option>
                      </select>

                      <button
                        onClick={() => deleteInquiry(inq.id)}
                        className="p-2 text-slate-500 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: BACKUP & FACTORY RESET */}
        {activeTab === 'backup' && (
          <div className="max-w-2xl space-y-6">
            <div className="bg-[#0b101a] p-6 rounded-2xl border border-white/10 space-y-4">
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Export Store Data Backup</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Download a complete JSON snapshot containing all your products, website settings, logo configuration, and creator inquiries.
              </p>
              <button
                onClick={handleExportData}
                className="px-5 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download JSON Backup</span>
              </button>
            </div>

            <div className="bg-[#0b101a] p-6 rounded-2xl border border-white/10 space-y-4">
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <FileUp className="w-4 h-4 text-purple-400" />
                <span>Restore from Backup</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Upload a previously exported Brandy Prints JSON backup file to restore products and settings.
              </p>
              <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold cursor-pointer">
                <Upload className="w-4 h-4" />
                <span>Choose Backup JSON File</span>
                <input
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={handleImportData}
                />
              </label>
            </div>

            <div className="bg-red-950/20 p-6 rounded-2xl border border-red-500/30 space-y-4">
              <h3 className="font-heading font-bold text-base text-red-400 flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-red-400" />
                <span>Reset to Initial Factory Defaults</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Restores the site settings and products to the original AI Bunny Cyber and Girl editions and sample creator merch.
              </p>
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to reset all store data to factory defaults?")) {
                    resetToDefaultData();
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors"
              >
                Reset to Factory Defaults
              </button>
            </div>
          </div>
        )}

      </div>

      {/* CREATE / EDIT PRODUCT MODAL */}
      {(isCreatingProduct || editingProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#0b101a] border border-white/10 rounded-3xl max-w-2xl w-full p-6 sm:p-8 my-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-heading font-bold text-lg text-white">
                {editingProduct ? `Edit "${editingProduct.title}"` : "Add New Collector Kit or Product"}
              </h3>
              <button
                onClick={() => { setIsCreatingProduct(false); setEditingProduct(null); }}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={productForm.title}
                  onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                  placeholder="e.g. AI Bunny Cyber Edition Collector's Box"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    {categories.filter(c => c !== "All").map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={productForm.badge}
                    onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                    placeholder="e.g. Bestseller / Limited Drop"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Selling Price ({settings.currencySymbol}) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Original Price (Strike-through)</label>
                  <input
                    type="number"
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Image URL or Upload */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">Product Image</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    placeholder="Image URL or path (e.g. /images/kit-cyber-bunny.jpg)"
                    className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                  <label className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white rounded-xl flex items-center gap-1.5 cursor-pointer border border-white/10">
                    <Upload className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, (dataUrl) => setProductForm({ ...productForm, image: dataUrl }))}
                    />
                  </label>
                </div>
                {productForm.image && (
                  <div className="w-24 h-16 rounded-lg overflow-hidden border border-white/10 mt-1">
                    <img src={productForm.image} alt="preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Items Included (One per line) */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Items Included in Box (One per line)
                </label>
                <textarea
                  rows={4}
                  value={productForm.itemsIncludedText}
                  onChange={(e) => setProductForm({ ...productForm, itemsIncludedText: e.target.value })}
                  placeholder="1x Custom Rigid Collector Box&#10;1x Die-Cut Sticker Pack&#10;1x Welcome Letter&#10;4x VIP Passes"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="inStockCheck"
                  checked={productForm.inStock}
                  onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="inStockCheck" className="text-xs font-semibold text-slate-200 cursor-pointer">
                  In Stock & Ready for Shipping
                </label>
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => { setIsCreatingProduct(false); setEditingProduct(null); }}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-heading font-black text-xs uppercase tracking-wider shadow-glow-cyan"
                >
                  {editingProduct ? "Save Changes" : "Create Product"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
