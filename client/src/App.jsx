import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DestinationsGrid from './components/DestinationsGrid';
import FeaturesSection from './components/FeaturesSection';
import PlaceDetailModal from './components/PlaceDetailModal';
import LoginModal from './components/LoginModal';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

import { features, heroSlides, nashikPlaces } from './data/tourismData';
import {
  fetchPlacesApi,
  createPlaceApi,
  updatePlaceApi,
  deletePlaceApi
} from './services/api';

export default function App() {
  const [placesList, setPlacesList] = useState(nashikPlaces);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [userRole, setUserRole] = useState('traveler');
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [activeView, setActiveView] = useState('home');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Load places live from MongoDB on startup
  useEffect(() => {
    const loadPlaces = async () => {
      try {
        const livePlaces = await fetchPlacesApi();
        if (livePlaces && livePlaces.length > 0) {
          setPlacesList(livePlaces);
        }
      } catch (err) {
        console.warn('Backend offline or loading fallback data:', err.message);
      }
    };
    loadPlaces();
  }, []);

  // Check for stored admin session
  useEffect(() => {
    const storedAdmin = localStorage.getItem('sih_admin_session');
    if (storedAdmin) {
      try {
        setCurrentAdmin(JSON.parse(storedAdmin));
      } catch (e) {
        localStorage.removeItem('sih_admin_session');
      }
    }
  }, []);

  // Auto rotate hero slides every 4.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Filter places based on Search text
  const filteredPlaces = placesList.filter((place) => {
    return (
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Admin CRUD Handlers communicating with MongoDB API
  const handleAddPlace = async (newPlaceData) => {
    if (!currentAdmin?.token) return;
    const saved = await createPlaceApi(newPlaceData, currentAdmin.token);
    setPlacesList((prev) => [saved, ...prev]);
  };

  const handleUpdatePlace = async (id, updatedData) => {
    if (!currentAdmin?.token) return;
    const updated = await updatePlaceApi(id, updatedData, currentAdmin.token);
    setPlacesList((prev) =>
      prev.map((p) => ((p._id || p.id) === (updated._id || updated.id) ? updated : p))
    );
  };

  const handleDeletePlace = async (placeId) => {
    if (!currentAdmin?.token) return;
    await deletePlaceApi(placeId, currentAdmin.token);
    setPlacesList((prev) => prev.filter((p) => (p._id || p.id) !== placeId));
  };

  const handleAdminLoginSuccess = (adminData) => {
    setCurrentAdmin(adminData);
    localStorage.setItem('sih_admin_session', JSON.stringify(adminData));
    setActiveView('admin');
  };

  const handleLogout = () => {
    setCurrentAdmin(null);
    localStorage.removeItem('sih_admin_session');
    setActiveView('home');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* 1. Header / Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onLoginClick={() => {
          setUserRole('traveler');
          setIsLoginModalOpen(true);
        }}
        currentAdmin={currentAdmin}
        activeView={activeView}
        setActiveView={setActiveView}
        onLogout={handleLogout}
      />

      {/* View Switch: Admin Dashboard vs Main Website */}
      {activeView === 'admin' && currentAdmin ? (
        <AdminDashboard
          places={placesList}
          onAddPlace={handleAddPlace}
          onUpdatePlace={handleUpdatePlace}
          onDeletePlace={handleDeletePlace}
          onLogout={handleLogout}
          adminUser={currentAdmin}
        />
      ) : (
        <>
          {/* 2. Hero Background Slideshow & Let Know Our India with bottom stats */}
          <HeroSection
            heroSlides={heroSlides}
            currentSlide={currentSlide}
          />

          {/* 3. Top Trending Destinations Grid (Live MongoDB Data) */}
          <DestinationsGrid
            places={filteredPlaces}
            onSelectPlace={(place) => setSelectedPlace(place)}
            onResetFilters={() => setSearchQuery('')}
          />

          {/* 4. Features Section */}
          <FeaturesSection features={features} />

          {/* 5. Destination Details Modal */}
          <PlaceDetailModal
            place={selectedPlace}
            onClose={() => setSelectedPlace(null)}
          />

          {/* 6. Contact & Footer */}
          <Footer
            onHostDashboardClick={() => {
              if (currentAdmin) {
                setActiveView('admin');
              } else {
                setUserRole('admin');
                setIsLoginModalOpen(true);
              }
            }}
          />
        </>
      )}

      {/* 7. Auth / Role Modal (Connected to MongoDB) */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        userRole={userRole}
        setUserRole={setUserRole}
        onAdminLoginSuccess={handleAdminLoginSuccess}
      />
    </div>
  );
}
