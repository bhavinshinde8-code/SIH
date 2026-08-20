import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DestinationsGrid from './components/DestinationsGrid';
import FeaturesSection from './components/FeaturesSection';
import PlaceDetailModal from './components/PlaceDetailModal';
import LoginModal from './components/LoginModal';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

import { nashikPlaces, features, heroSlides } from './data/tourismData';

export default function App() {
  const [placesList, setPlacesList] = useState(nashikPlaces);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [userRole, setUserRole] = useState('traveler'); // 'traveler' or 'admin'
  const [currentAdmin, setCurrentAdmin] = useState(null); // When logged in as admin
  const [activeView, setActiveView] = useState('home'); // 'home' or 'admin'
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto rotate slides every 4.5 seconds
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

  // Admin CRUD Handlers
  const handleAddPlace = (newPlace) => {
    setPlacesList((prev) => [newPlace, ...prev]);
  };

  const handleUpdatePlace = (updatedPlace) => {
    setPlacesList((prev) =>
      prev.map((p) => (p.id === updatedPlace.id ? updatedPlace : p))
    );
  };

  const handleDeletePlace = (placeId) => {
    setPlacesList((prev) => prev.filter((p) => p.id !== placeId));
  };

  const handleAdminLoginSuccess = (admin) => {
    setCurrentAdmin(admin);
    setActiveView('admin');
  };

  const handleLogout = () => {
    setCurrentAdmin(null);
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

          {/* 3. Top Trending Destinations Grid */}
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
              setUserRole('admin');
              setIsLoginModalOpen(true);
            }}
          />
        </>
      )}

      {/* 7. Auth / Role Modal */}
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
