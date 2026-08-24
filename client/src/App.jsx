import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DestinationsGrid from './components/DestinationsGrid';
import FeaturesSection from './components/FeaturesSection';
import PlaceDetailModal from './components/PlaceDetailModal';
import LoginModal from './components/LoginModal';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Footer from './components/Footer';

import { features, heroSlides, nashikPlaces } from './data/tourismData';
import { searchTouristDestinations } from './data/indiaWebPlaces';
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
  const [currentUser, setCurrentUser] = useState(null);
  const [activeView, setActiveView] = useState('home'); // 'home' | 'admin' | 'user'
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

  // Check for stored admin & user session
  useEffect(() => {
    const storedAdmin = localStorage.getItem('sih_admin_session');
    if (storedAdmin) {
      try {
        setCurrentAdmin(JSON.parse(storedAdmin));
      } catch (e) {
        localStorage.removeItem('sih_admin_session');
      }
    }

    const storedUser = localStorage.getItem('sih_user_session');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('sih_user_session');
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

  // Filter places based on Search text with smart fuzzy & spell alias matching
  const filteredPlaces = searchQuery.trim()
    ? searchTouristDestinations(searchQuery, placesList)
    : placesList;


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

  // Auth Success Handlers
  const handleAdminLoginSuccess = (adminData) => {
    setCurrentAdmin(adminData);
    localStorage.setItem('sih_admin_session', JSON.stringify(adminData));
    setActiveView('admin');
  };

  const handleUserLoginSuccess = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('sih_user_session', JSON.stringify(userData));
    setActiveView('user');
  };

  const handleAdminLogout = () => {
    setCurrentAdmin(null);
    localStorage.removeItem('sih_admin_session');
    setActiveView('home');
  };

  const handleUserLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('sih_user_session');
    setActiveView('home');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* 1. Header / Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placesList={placesList}
        onSelectPlace={(place) => setSelectedPlace(place)}
        onLoginClick={() => {
          setUserRole('traveler');
          setIsLoginModalOpen(true);
        }}
        currentAdmin={currentAdmin}
        currentUser={currentUser}
        activeView={activeView}
        setActiveView={setActiveView}
        onAdminLogout={handleAdminLogout}
        onUserLogout={handleUserLogout}
      />

      {/* View Switch: Admin Dashboard vs User Dashboard vs Main Website */}
      {activeView === 'admin' ? (
        <AdminDashboard
          places={placesList}
          onAddPlace={handleAddPlace}
          onUpdatePlace={handleUpdatePlace}
          onDeletePlace={handleDeletePlace}
          onLogout={() => {
            if (currentAdmin) handleAdminLogout();
            else setActiveView('home');
          }}
          adminUser={currentAdmin || { name: 'Super Admin', email: 'admin1@tourism.in', department: 'Nashik Municipal Tourism Board' }}
        />
      ) : activeView === 'user' ? (
        <UserDashboard
          currentUser={currentUser || { name: 'Bhavin Shinde', email: 'traveler@tourism.in', phone: '9579039845' }}
          places={placesList}
          onLogout={() => {
            if (currentUser) handleUserLogout();
            else setActiveView('home');
          }}
          onExploreDestinations={() => setActiveView('home')}
          onSelectPlace={(place) => setSelectedPlace(place)}
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

      {/* 7. Auth / Role Modal (Connected to MongoDB with SMS OTP) */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        userRole={userRole}
        setUserRole={setUserRole}
        onAdminLoginSuccess={handleAdminLoginSuccess}
        onUserLoginSuccess={handleUserLoginSuccess}
      />
    </div>
  );
}
