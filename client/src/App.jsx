import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DestinationsGrid from './components/DestinationsGrid';
import FeaturesSection from './components/FeaturesSection';
import PlaceDetailModal from './components/PlaceDetailModal';
import LoginModal from './components/LoginModal';
import Footer from './components/Footer';

import { nashikPlaces, features, heroSlides } from './data/tourismData';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [userRole, setUserRole] = useState('traveler'); // 'traveler' or 'host'
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto rotate slides every 4.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Filter places based on Search text
  const filteredPlaces = nashikPlaces.filter((place) => {
    return (
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* 1. Header / Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onLoginClick={() => setIsLoginModalOpen(true)}
      />

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
        onPlanVisit={() => {
          setSelectedPlace(null);
          setIsLoginModalOpen(true);
        }}
      />

      {/* 6. Auth / Role Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        userRole={userRole}
        setUserRole={setUserRole}
      />

      {/* 7. Contact & Footer */}
      <Footer
        onHostDashboardClick={() => {
          setUserRole('host');
          setIsLoginModalOpen(true);
        }}
      />
    </div>
  );
}
