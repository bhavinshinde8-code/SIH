import React, { useState } from 'react';
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
  Loader2
} from 'lucide-react';

export default function AdminDashboard({
  places,
  onAddPlace,
  onUpdatePlace,
  onDeletePlace,
  onLogout,
  adminUser
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlace, setEditingPlace] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      highlights: (place.highlights || []).join(', ')
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
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Authorized Admin
              </span>
              <span className="text-xs text-slate-400">({adminUser?.name || 'Admin'})</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Tourism Management Dashboard
            </h1>
            <p className="text-xs text-slate-400">
              Live updates directly syncing with MongoDB Atlas.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs uppercase tracking-wide shadow-lg shadow-amber-500/20 transition-all duration-200"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Destination</span>
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 hover:border-rose-500/30 border border-slate-700 text-slate-300 font-semibold text-xs transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <p className="text-xs uppercase text-slate-400 font-semibold">Total Destinations in MongoDB</p>
            <p className="text-3xl font-black text-amber-400 mt-1">{places.length}</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <p className="text-xs uppercase text-slate-400 font-semibold">Municipal Department</p>
            <p className="text-xl font-bold text-white mt-1 flex items-center gap-2">
              <Building className="w-5 h-5 text-amber-400" /> {adminUser?.department || 'Nashik Municipal Tourism'}
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <p className="text-xs uppercase text-slate-400 font-semibold">Active MongoDB Admin</p>
            <p className="text-sm font-semibold text-emerald-400 mt-1 flex items-center gap-1.5 truncate">
              <CheckCircle className="w-4 h-4" /> {adminUser?.email || 'admin@tourism.in'}
            </p>
          </div>
        </div>

        {/* Destination List Table / Cards */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Live Places from MongoDB</span>
            <span className="text-xs font-normal text-slate-400">({places.length} active records)</span>
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {places.map((place) => {
              const placeKey = place._id || place.id;
              return (
                <div
                  key={placeKey}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-700 transition"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover bg-slate-800 shrink-0"
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
                      <h3 className="text-base font-bold text-white">{place.name}</h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" /> {place.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => handleOpenEdit(place)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
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
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-xs font-semibold text-slate-400 transition"
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

      {/* Add / Edit Destination Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
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

              <div className="pt-2 flex justify-end gap-3">
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
