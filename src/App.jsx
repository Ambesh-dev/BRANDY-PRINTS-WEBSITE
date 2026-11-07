import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import AnnouncementBar from './components/AnnouncementBar';
import Hero from './components/Hero';
import KitUnboxExplorer from './components/KitUnboxExplorer';
import YouTubeSpotlight from './components/YouTubeSpotlight';
import ProductCatalog from './components/ProductCatalog';
import CustomKitBuilder from './components/CustomKitBuilder';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import Toast from './components/Toast';
import AdminDashboard from './components/admin/AdminDashboard';

function MainLayout() {
  const { isAdminView } = useApp();

  if (isAdminView) {
    return (
      <div className="min-h-screen bg-[#07090f]">
        <AdminDashboard />
        <Toast />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#080b11] text-slate-100 selection:bg-cyan-500 selection:text-black">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <KitUnboxExplorer />
        <YouTubeSpotlight />
        <ProductCatalog />
        <CustomKitBuilder />
        <ReviewsSection />
      </main>
      <Footer />
      
      {/* Overlays */}
      <ProductModal />
      <CartDrawer />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
