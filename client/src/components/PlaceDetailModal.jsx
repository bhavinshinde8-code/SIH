import React from 'react';
import { X, MapPin, ExternalLink, Globe, Star, ShieldCheck } from 'lucide-react';

export default function PlaceDetailModal({ place, onClose }) {
  if (!place) return null;

  // Determine web URL if available or generate search URL
  const destinationWebUrl =
    place.webUrl ||
    `https://en.wikipedia.org/wiki/${encodeURIComponent(place.name.replace(/\s+/g, '_'))}`;

  const searchGoogleUrl = `https://www.google.com/search?q=${encodeURIComponent(
    `${place.name} ${place.location} tourism guide timings history`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header Image */}
        <div className="relative h-64 sm:h-72 w-full bg-slate-800 shrink-0">
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-900 transition shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/90 backdrop-blur-md text-slate-950 font-black text-[11px] tracking-wider uppercase shadow-md flex items-center gap-1">
              <Star className="w-3 h-3 fill-slate-950" /> {place.rating || '4.9'} ({place.reviews || '1.2k'}+ Reviews)
            </span>
          </div>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {place.tag || 'Heritage & Cultural Tourism'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 drop-shadow-md">
              {place.name}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-300 mt-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate font-medium">{place.location}</span>
            </div>
          </div>
        </div>

        {/* Body Details */}
        <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span>About Destination</span>
            </h4>
            <p className="text-sm text-slate-200 mt-1.5 leading-relaxed">
              {place.description}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/60">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Best Season</span>
              <span className="text-xs font-extrabold text-white mt-0.5 block">{place.bestTime || 'Oct - March'}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/60 col-span-2 sm:col-span-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Managed Authority</span>
              <span className="text-xs font-bold text-amber-400 truncate block mt-0.5 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{place.host || 'Registered Tourism Trust / ASI'}</span>
              </span>
            </div>
          </div>

          {place.highlights && place.highlights.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Key Highlights</h4>
              <div className="flex flex-wrap gap-2">
                {place.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs font-medium text-amber-300 flex items-center gap-1"
                  >
                    <span className="text-amber-400">✓</span> {h}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Web Knowledge & External Pages Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-white flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-amber-400" />
                <span>Live Destination Web Resource</span>
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Explore real-time encyclopedia articles, historical archives, and guide pages on the web.
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={destinationWebUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black tracking-wide uppercase transition shadow-md shadow-amber-500/20"
              >
                <span>Read Web Guide</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={searchGoogleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition border border-slate-700"
                title="Search live web info"
              >
                <span>Google</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

