import React, { useState, useEffect } from 'react';
import {
  PlusCircle,
  Trash2,
  Edit3,
  MapPin,
  Star,
  LogOut,
  CheckCircle,
  Building,
  ShieldCheck,
  X,
  Loader2,
  LayoutDashboard,
  Map,
  Image as ImageIcon,
  MessageSquare,
  Users,
  Eye,
  ChevronRight,
  Menu,
  Sparkles,
  TrendingUp,
  FileCheck,
  Clock,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { fetchAdminUsersApi } from '../services/api';

export default function AdminDashboard({
  places = [],
  onAddPlace,
  onUpdatePlace,
  onDeletePlace,
  onLogout,
  adminUser
}) {
  // Navigation Tabs matching sketch: Overview | Site Info | Monument Photo | Reviews | Users Info
  const [activeTab, setActiveTab] = useState('overview');
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  // Live Real Users loaded from MongoDB
  const [liveUsers, setLiveUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  // Modal State for adding / editing site
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlace, setEditingPlace] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Selected Site & Custom Config Data
  const [selectedSite, setSelectedSite] = useState(null);
  const [siteCustomData, setSiteCustomData] = useState({});

  // Load Real Registered Users directly from MongoDB on mount
  const loadLiveUsers = async () => {
    if (!adminUser?.token) return;
    try {
      setIsLoadingUsers(true);
      const data = await fetchAdminUsersApi(adminUser.token);
      setLiveUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.warn('Could not load live registered users:', err.message);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  useEffect(() => {
    loadLiveUsers();
  }, [adminUser?.token]);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    tag: '',
    location: '',
    image: '',
    rating: 4.8,
    reviews: 100,
    description: '',
    bestTime: '',
    host: 'Nashik Municipal Tourism Board',
    highlights: ''
  });

  // Safe Places array fallback
  const safePlaces = Array.isArray(places) ? places : [];

  // Auto-select first site by default so the bottom panel is always visible immediately
  useEffect(() => {
    if (!selectedSite && safePlaces.length > 0) {
      setSelectedSite(safePlaces[0]);
    }
  }, [safePlaces, selectedSite]);

  // Calculate real metrics directly from MongoDB data
  let totalReviewsCount = 0;
  let averageRating = '5.0';
  try {
    totalReviewsCount = safePlaces.reduce((acc, p) => acc + (Number(p?.reviews) || 0), 0);
    if (safePlaces.length > 0) {
      const sum = safePlaces.reduce((acc, p) => acc + (Number(p?.rating) || 0), 0);
      averageRating = (sum / safePlaces.length).toFixed(1);
    }
  } catch (e) {
    console.error('Error calculating metrics:', e);
  }

  const handleOpenAdd = () => {
    setEditingPlace(null);
    setFormData({
      name: '',
      tag: '',
      location: '',
      image: '',
      rating: 4.8,
      reviews: 100,
      description: '',
      bestTime: '',
      host: 'Nashik Municipal Tourism Board',
      highlights: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (place) => {
    setEditingPlace(place);
    const hl = Array.isArray(place.highlights)
      ? place.highlights.join(', ')
      : typeof place.highlights === 'string'
      ? place.highlights
      : '';

    setFormData({
      name: place.name || '',
      tag: place.tag || '',
      location: place.location || '',
      image: place.image || '',
      rating: place.rating || 4.8,
      reviews: place.reviews || 100,
      description: place.description || '',
      bestTime: place.bestTime || '',
      host: place.host || 'Nashik Municipal Tourism Board',
      highlights: hl
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formattedData = {
      ...formData,
      highlights: formData.highlights.split(',').map((h) => h.trim()).filter(Boolean)
    };

    try {
      if (editingPlace) {
        await onUpdatePlace(editingPlace._id || editingPlace.id, formattedData);
      } else {
        await onAddPlace(formattedData);
      }
      setIsModalOpen(false);
    } catch (error) {
      alert(`Error saving place: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header Card (Matches App Name: BhavinShinde & Admin Dashboard Header) */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 z-10">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Incredible India • Admin Suite
              </span>
              <span className="text-xs text-slate-400">({adminUser?.department || 'Nashik Municipal Tourism'})</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Live tourism portal management synced in real-time with MongoDB Atlas.
            </p>
          </div>

          <div className="flex items-center gap-3 z-10">
            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs uppercase tracking-wide shadow-lg shadow-amber-500/25 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Destination</span>
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-3 rounded-full bg-slate-900 hover:bg-rose-500/20 hover:text-rose-400 hover:border-rose-500/30 border border-slate-800 text-slate-300 font-semibold text-xs transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Left Dropdown Sidebar & Right Content Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* LEFT SIDEBAR (Collapsible Dropdown matching sketch: Overview, Site Info, Monument Photo, Reviews, Users Info) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-3 shadow-xl space-y-2">
              
              {/* Dropdown Header Toggle */}
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Menu className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      Admin Navigation
                    </p>
                    <p className="text-xs font-bold text-white capitalize">
                      Active: {activeTab === 'overview' ? 'Overview' : activeTab === 'siteinfo' ? 'Site Info' : activeTab === 'photos' ? 'Monument Photo' : activeTab === 'reviews' ? 'Reviews' : 'Users Info'}
                    </p>
                  </div>
                </div>
                <div className={`p-1.5 rounded-lg bg-slate-900 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-amber-400' : ''}`}>
                  <ChevronRight className="w-4 h-4 rotate-90" />
                </div>
              </button>

              {/* Collapsible Menu List */}
              {isDropdownOpen && (
                <div className="space-y-1.5 pt-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  
                  {/* 1. Overview */}
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition duration-200 ${
                      activeTab === 'overview'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/20'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <LayoutDashboard className="w-5 h-5" />
                      <span>Overview</span>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-70" />
                  </button>

                  {/* 2. Site Info */}
                  <button
                    onClick={() => setActiveTab('siteinfo')}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition duration-200 ${
                      activeTab === 'siteinfo'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/20'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Map className="w-5 h-5" />
                      <span>Site Info</span>
                    </div>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-950/60 font-mono">
                      {safePlaces.length}
                    </span>
                  </button>

                  {/* 3. Monument Photo */}
                  <button
                    onClick={() => setActiveTab('photos')}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition duration-200 ${
                      activeTab === 'photos'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/20'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <ImageIcon className="w-5 h-5" />
                      <span>Monument Photo</span>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-70" />
                  </button>

                  {/* 4. Reviews */}
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition duration-200 ${
                      activeTab === 'reviews'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/20'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5" />
                      <span>Reviews</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                      {safePlaces.length}
                    </span>
                  </button>

                  {/* 5. Users Info */}
                  <button
                    onClick={() => setActiveTab('users')}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition duration-200 ${
                      activeTab === 'users'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/20'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5" />
                      <span>Users Info</span>
                    </div>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-950/60 font-mono">
                      {liveUsers.length}
                    </span>
                  </button>

                </div>
              )}
            </div>

            {/* Admin Profile Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 flex items-center justify-center font-black text-lg">
                  A
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{adminUser?.name || 'Administrator'}</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </h3>
                  <p className="text-xs text-slate-400">{adminUser?.email || 'admin1@tourism.in'}</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Department</span>
                  <span className="font-semibold text-white">{adminUser?.department || 'Tourism Office'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Database</span>
                  <span className="text-emerald-400 font-mono">MongoDB Atlas (Live)</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT MAIN CONTENT PANEL */}
          <div className="lg:col-span-8 space-y-6">

            {/* TAB 1: OVERVIEW (Matches Sketch 4 Stat Boxes: Published Site No, Registered User No, Total Reviews, Pending Monument Photo) */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* 4 Stat Boxes from Hand-Drawn Sketch (Real DB Values) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Box 1: Published Site No */}
                  <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-2 relative overflow-hidden group hover:border-amber-500/40 transition">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Published Site No.
                      </span>
                      <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                        <MapPin className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="text-4xl font-black text-white font-mono">
                      {safePlaces.length}
                    </div>
                    <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                      <TrendingUp className="w-3.5 h-3.5" /> Real-time active sites in database
                    </p>
                  </div>

                  {/* Box 2: Registered User No */}
                  <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-2 relative overflow-hidden group hover:border-amber-500/40 transition">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Registered User No.
                      </span>
                      <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <Users className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="text-4xl font-black text-white font-mono">
                      {isLoadingUsers ? <Loader2 className="w-8 h-8 animate-spin text-amber-400" /> : liveUsers.length}
                    </div>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Live MongoDB user accounts
                    </p>
                  </div>

                  {/* Box 3: Total Reviews */}
                  <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-2 relative overflow-hidden group hover:border-amber-500/40 transition">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Total Reviews
                      </span>
                      <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="text-4xl font-black text-white font-mono">
                      {totalReviewsCount}
                    </div>
                    <p className="text-[11px] text-amber-400 flex items-center gap-1 font-medium">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {averageRating} / 5.0 Average Live Rating
                    </p>
                  </div>

                  {/* Box 4: Pending Monument Photo */}
                  <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-2 relative overflow-hidden group hover:border-amber-500/40 transition">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Pending Monument Photo
                      </span>
                      <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="text-4xl font-black text-amber-400 font-mono">
                      {safePlaces.filter(p => !p.image).length}
                    </div>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1">
                      <FileCheck className="w-3.5 h-3.5 text-emerald-400" /> {safePlaces.filter(p => !!p.image).length} / {safePlaces.length} active images verified
                    </p>
                  </div>

                </div>

                {/* Quick Manage Destinations List */}
                <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Map className="w-4 h-4 text-amber-400" />
                      <span>Recently Managed Destinations</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('siteinfo')}
                      className="text-xs font-bold text-amber-400 hover:underline"
                    >
                      View All Sites →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {safePlaces.slice(0, 4).map((place) => (
                      <div
                        key={place._id || place.id}
                        className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center gap-3"
                      >
                        <img
                          src={place.image}
                          alt={place.name}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div className="overflow-hidden">
                          <h4 className="text-xs font-bold text-white truncate">{place.name}</h4>
                          <p className="text-[11px] text-slate-400 truncate">{place.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SITE INFO (Full CRUD place management from MongoDB) */}
            {activeTab === 'siteinfo' && (
              <div className="space-y-6">
                <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Map className="w-5 h-5 text-amber-400" />
                        <span>Site Information & Destination Database</span>
                      </h2>
                      <p className="text-xs text-slate-400">Click any site to inspect and configure advanced features below</p>
                    </div>
                    <button
                      onClick={handleOpenAdd}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow self-start sm:self-auto flex items-center gap-1.5"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Add New Site</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {safePlaces.map((place) => {
                      const placeKey = place._id || place.id;
                      return (
                        <div
                          key={placeKey}
                          className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-700 transition"
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={place.image}
                              alt={place.name}
                              className="w-16 h-16 rounded-xl object-cover bg-slate-800 shrink-0"
                            />
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 px-2 py-0.5 rounded-full bg-amber-500/10">
                                  {place.tag}
                                </span>
                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {place.rating}
                                </span>
                              </div>
                              <h3 className="text-sm font-bold text-white">{place.name}</h3>
                              <p className="text-xs text-slate-400 flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-slate-500" /> {place.location}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <button
                              onClick={() => handleOpenEdit(place)}
                              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to delete "${place.name}" from MongoDB?`)) {
                                  onDeletePlace(placeKey);
                                }
                              }}
                              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-rose-500/20 hover:text-rose-400 text-xs font-semibold text-slate-400 transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: MONUMENT PHOTO (Photo Gallery & Upload verification) */}
            {activeTab === 'photos' && (
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-amber-400" />
                    <span>Monument Photo Gallery & Media Vault</span>
                  </h2>
                  <p className="text-xs text-slate-400">High-resolution photography for Nashik heritage attractions</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {safePlaces.map((place) => (
                    <div
                      key={place._id || place.id}
                      className="group relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800"
                    >
                      <img
                        src={place.image}
                        alt={place.name}
                        className="w-full h-44 object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90"></div>
                      <div className="absolute bottom-3 left-3 right-3 space-y-1">
                        <p className="text-xs font-bold text-white truncate">{place.name}</p>
                        <p className="text-[10px] text-amber-400">{place.tag}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: REVIEWS (Live place reviews from MongoDB) */}
            {activeTab === 'reviews' && (
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-amber-400" />
                      <span>Tourist Reviews & Rating Analytics</span>
                    </h2>
                    <p className="text-xs text-slate-400">Live aggregated reviews across all published places in MongoDB</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-amber-400 font-mono">
                      {totalReviewsCount} Total Reviews
                    </span>
                    <p className="text-[11px] text-slate-400">Avg {averageRating} / 5.0 ★</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {safePlaces.map((place) => (
                    <div
                      key={place._id || place.id}
                      className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5">
                        <img
                          src={place.image}
                          alt={place.name}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-white">{place.name}</h4>
                          <p className="text-xs text-slate-400">{place.location} • <span className="text-amber-400">{place.tag}</span></p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 self-end sm:self-center">
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <span>{place.rating || 4.8} / 5.0</span>
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono">{place.reviews || 0} reviews</span>
                        </div>
                        <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                          Active
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: USERS INFO (Real Registered Traveler Accounts from MongoDB Atlas) */}
            {activeTab === 'users' && (
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <Users className="w-5 h-5 text-amber-400" />
                      <span>Live Registered Travelers & Accounts</span>
                    </h2>
                    <p className="text-xs text-slate-400">Real MongoDB Atlas database records created via SMS OTP sign up</p>
                  </div>
                  <button
                    onClick={loadLiveUsers}
                    className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 text-amber-400 text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingUsers ? 'animate-spin' : ''}`} />
                    <span>Refresh Users</span>
                  </button>
                </div>

                {isLoadingUsers ? (
                  <div className="p-12 text-center flex flex-col items-center gap-2 text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
                    <span className="text-xs">Fetching users from MongoDB Atlas...</span>
                  </div>
                ) : liveUsers.length === 0 ? (
                  <div className="p-12 text-center rounded-2xl bg-slate-950 border border-slate-800 text-slate-400 space-y-2">
                    <Users className="w-8 h-8 mx-auto text-slate-600" />
                    <h4 className="text-sm font-bold text-white">No registered users in database yet</h4>
                    <p className="text-xs text-slate-500">When users sign up via the Traveler Portal with SMS OTP, their live records will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {liveUsers.map((user) => (
                      <div
                        key={user._id || user.id}
                        className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 flex items-center justify-center font-black text-sm uppercase">
                            {user.name ? user.name.charAt(0) : 'U'}
                          </div>
                          <div className="space-y-0.5">
                            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                              <span>{user.name}</span>
                              {user.isPhoneVerified && (
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                              )}
                            </h4>
                            <p className="text-xs text-slate-400">{user.email}</p>
                            <p className="text-[11px] text-slate-500 font-mono">+91 {user.phone}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-center">
                          <div className="text-right">
                            <span className="text-[10px] text-slate-500 block">Joined</span>
                            <span className="text-xs text-slate-300 font-mono">
                              {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Active'}
                            </span>
                          </div>
                          <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                            {user.isPhoneVerified ? 'SMS OTP Verified' : 'Registered'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

      </div>

      {/* Add / Edit Destination Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">
                {editingPlace ? 'Edit Destination in MongoDB' : 'Add New Historical Destination to MongoDB'}
              </h3>
              <p className="text-xs text-slate-400">
                Data saved here will be stored permanently in MongoDB Atlas.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Place Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Trimbakeshwar Shiva Temple"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Badge / Tagline</label>
                  <input
                    type="text"
                    required
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    placeholder="e.g. Jyotirlinga & Ancient Heritage"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Trimbak, Nashik"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Best Time to Visit</label>
                  <input
                    type="text"
                    required
                    value={formData.bestTime}
                    onChange={(e) => setFormData({ ...formData, bestTime: e.target.value })}
                    placeholder="e.g. Oct - Mar"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Historical background and visitor information..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Key Highlights (Comma Separated)</label>
                <input
                  type="text"
                  value={formData.highlights}
                  onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                  placeholder="e.g. 12 Jyotirlingas, Brahmagiri Hill, Kushavarta Kund"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* When Editing a specific site, show the extended features inside the Edit dialog */}
              {editingPlace && (
                <div className="pt-6 mt-6 border-t border-slate-800 space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider text-amber-400">
                      Advanced Site Features & Media Configuration
                    </h4>
                    <span className="text-[10px] bg-amber-500/10 text-amber-400 font-bold px-2 py-0.5 rounded-full border border-amber-500/20">
                      Interactive Modules
                    </span>
                  </div>

                  {/* QR Code Section */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center gap-4">
                    <div className="bg-white p-2 rounded-xl shrink-0">
                      <svg className="w-16 h-16" viewBox="0 0 100 100" fill="black">
                        <path d="M0 0h30v30H0zM5 5h20v20H5zM10 10h10v10H10zM70 0h30v30H70zM75 5h20v20H75zM80 10h10v10H80zM0 70h30v30H0zM5 75h20v20H5zM10 80h10v10H10zM35 10h10v10H35zM50 10h10v10H50zM35 25h25v10H35zM10 35h10v25H10zM25 35h10v10H25zM25 50h10v10H25zM70 35h10v10H70zM85 35h15v10H85zM70 50h25v10H70zM35 70h10v25H35zM50 70h10v10H50zM50 85h10v10H50zM70 70h10v10H70zM85 70h15v25H85zM70 85h10v10H70z" />
                      </svg>
                    </div>
                    <div className="space-y-1.5 text-center sm:text-left">
                      <p className="text-xs text-slate-300">
                        Visitors scan this from their dashboard to jump straight to this site.
                      </p>
                      <button
                        type="button"
                        onClick={() => alert(`Downloading QR Code for ${editingPlace.name}`)}
                        className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition"
                      >
                        Download QR
                      </button>
                    </div>
                  </div>

                  {/* Unique / hidden history */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-200">
                      Unique / hidden history
                    </label>
                    <textarea
                      rows={3}
                      value={siteCustomData[editingPlace._id || editingPlace.id]?.hiddenHistory ?? (editingPlace.description || '')}
                      onChange={(e) => {
                        const key = editingPlace._id || editingPlace.id;
                        setSiteCustomData({
                          ...siteCustomData,
                          [key]: {
                            ...(siteCustomData[key] || {}),
                            hiddenHistory: e.target.value
                          }
                        });
                      }}
                      placeholder="Enter hidden history and local folklore..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="editPublishCheck"
                        defaultChecked={true}
                        className="w-4 h-4 rounded text-amber-500 bg-slate-900 border-slate-700 focus:ring-0"
                      />
                      <label htmlFor="editPublishCheck" className="text-xs font-semibold text-slate-300">
                        Published (visible to visitors)
                      </label>
                    </div>
                  </div>

                  {/* 4 Feature Action Accordions */}
                  <div className="space-y-3 pt-2">
                    {/* 1. History Content */}
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                      <div>
                        <h5 className="text-xs font-bold text-white">History Content (Audio / Video / Text)</h5>
                        <p className="text-[10px] text-slate-400">Multilingual audio commentaries and narration</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => alert('Add audio commentary or video')}
                        className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition"
                      >
                        + Add
                      </button>
                    </div>

                    {/* 2. Visual Timeline */}
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <h5 className="text-xs font-bold text-white">Visual Timeline (year-by-year slider)</h5>
                        <p className="text-[10px] text-slate-400">
                          Give each photo a year — visitors get a drag-to-slide timeline that jumps to the closest photo as they move the pointer. Photos are kept sorted by year automatically.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => alert('Add historical era photo')}
                        className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shrink-0"
                      >
                        + Add
                      </button>
                    </div>

                    {/* 3. Nearby Places */}
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                      <div>
                        <h5 className="text-xs font-bold text-white">Nearby Places To Visit</h5>
                        <p className="text-[10px] text-slate-400">Recommended stops within 15km</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => alert('Add nearby attraction')}
                        className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition"
                      >
                        + Add
                      </button>
                    </div>

                    {/* 4. Co-Related Places */}
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                      <div>
                        <h5 className="text-xs font-bold text-white">Co-Related Places</h5>
                        <p className="text-[10px] text-slate-400">Monuments sharing historical heritage circuits</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => alert('Link related place')}
                        className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs uppercase tracking-wide shadow-lg shadow-amber-500/25 transition flex items-center gap-2"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{editingPlace ? 'Save Changes' : 'Add Destination'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
