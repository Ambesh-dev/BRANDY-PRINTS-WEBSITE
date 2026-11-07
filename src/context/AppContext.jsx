import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_SITE_SETTINGS, DEFAULT_PRODUCTS, CATEGORIES, DEFAULT_INQUIRIES } from '../data/defaultData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Settings State with LocalStorage
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('brandy_site_settings');
      return saved ? JSON.parse(saved) : DEFAULT_SITE_SETTINGS;
    } catch {
      return DEFAULT_SITE_SETTINGS;
    }
  });

  // Products State with LocalStorage
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('brandy_products');
      return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
    } catch {
      return DEFAULT_PRODUCTS;
    }
  });

  // Inquiries State with LocalStorage
  const [inquiries, setInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('brandy_inquiries');
      return saved ? JSON.parse(saved) : DEFAULT_INQUIRIES;
    } catch {
      return DEFAULT_INQUIRIES;
    }
  });

  // Cart State with LocalStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('brandy_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [isAdminView, setIsAdminView] = useState(() => {
    return window.location.hash === '#admin' || window.location.search.includes('admin');
  });
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Listen for hash changes (e.g., #admin in URL) and Secret Keypress (Ctrl + Shift + A)
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin' || window.location.search.includes('admin')) {
        setIsAdminView(true);
      }
    };

    const handleKeyDown = (e) => {
      // Secret key combination: Ctrl + Shift + A
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminView(prev => {
          const next = !prev;
          if (next) {
            window.location.hash = '#admin';
          } else {
            window.location.hash = '';
          }
          return next;
        });
      }
    };

    window.addEventListener('hashchange', handleHash);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const openAdmin = () => {
    window.location.hash = '#admin';
    setIsAdminView(true);
  };

  const closeAdmin = () => {
    if (window.location.hash === '#admin') {
      history.pushState("", document.title, window.location.pathname + window.location.search);
    }
    setIsAdminView(false);
  };

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('brandy_site_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('brandy_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('brandy_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('brandy_cart', JSON.stringify(cart));
  }, [cart]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Settings Actions
  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    showToast("Website settings updated successfully!");
  };

  // Product Actions
  const addProduct = (newProd) => {
    const productWithId = {
      ...newProd,
      id: newProd.id || `prod-${Date.now()}`,
      rating: newProd.rating || 5.0,
      reviewsCount: newProd.reviewsCount || 1,
      inStock: newProd.inStock !== undefined ? newProd.inStock : true
    };
    setProducts(prev => [productWithId, ...prev]);
    showToast(`Added product "${productWithId.title}"`);
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    showToast("Product updated successfully!");
  };

  const deleteProduct = (id) => {
    const prod = products.find(p => p.id === id);
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast(`Deleted "${prod?.title || 'Product'}"`, 'info');
  };

  // Cart Actions
  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${quantity}x "${product.title}" to cart!`);
    setIsCartOpen(true);
  };

  const updateCartQuantity = (productId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast("Item removed from cart", "info");
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Inquiries Actions
  const addInquiry = (inquiry) => {
    const newInq = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: "New"
    };
    setInquiries(prev => [newInq, ...prev]);
    showToast("Your inquiry has been submitted! We will contact you on WhatsApp/Email.", "success");
    return newInq;
  };

  const updateInquiryStatus = (id, newStatus) => {
    setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
    showToast("Inquiry status updated");
  };

  const deleteInquiry = (id) => {
    setInquiries(prev => prev.filter(inq => inq.id !== id));
    showToast("Inquiry deleted", "info");
  };

  // Factory Reset
  const resetToDefaultData = () => {
    setSettings(DEFAULT_SITE_SETTINGS);
    setProducts(DEFAULT_PRODUCTS);
    setInquiries(DEFAULT_INQUIRIES);
    localStorage.removeItem('brandy_site_settings');
    localStorage.removeItem('brandy_products');
    localStorage.removeItem('brandy_inquiries');
    showToast("Reset all website data to initial factory defaults!", "info");
  };

  return (
    <AppContext.Provider
      value={{
        settings,
        updateSettings,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        categories: CATEGORIES,
        selectedCategory,
        setSelectedCategory,
        inquiries,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartItemsCount,
        isCartOpen,
        setIsCartOpen,
        activeModalProduct,
        setActiveModalProduct,
        isAdminView,
        setIsAdminView,
        openAdmin,
        closeAdmin,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        toasts,
        showToast,
        removeToast,
        resetToDefaultData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
