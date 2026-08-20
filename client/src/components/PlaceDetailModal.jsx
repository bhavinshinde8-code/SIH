import React from 'react';
import { X, MapPin } from 'lucide-react';

export default function PlaceDetailModal({ place, onClose, onPlanVisit }) {
  if (!place) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
        {/* Header Image */}
        <div className="relative h-64 w-full bg-slate-800">
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/70 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-900 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {place.tag}
            </span>
            <h2 className="text-2xl font-extrabold text-white mt-1">
              {place.name}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-300 mt-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{place.location}</span>
            </div>
          </div>
        </div>

        {/* Body Details */}
        <div className="p-6 space-y-5">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Description</h4>
            <p className="text-sm text-slate-200 mt-1 leading-relaxed">
              {place.description}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <span className="text-[11px] text-slate-400 block">Best Season</span>
              <span className="text-xs font-bold text-white">{place.bestTime}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 col-span-2 sm:col-span-1">
              <span className="text-[11px] text-slate-400 block">Managed By Host</span>
              <span className="text-xs font-bold text-amber-400 truncate block">{place.host}</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Key Highlights</h4>
            <div className="flex flex-wrap gap-2">
              {place.highlights.map((h, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs font-medium text-amber-300"
                >
                  ✓ {h}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
