import React, { useState } from 'react';
import {
  X,
  MapPin,
  ExternalLink,
  Globe,
  Star,
  ShieldCheck,
  Headphones,
  Volume2,
  Clock,
  Sparkles,
  Compass,
  Link as LinkIcon,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export default function PlaceDetailModal({ place, onClose }) {
  if (!place) return null;

  // Timeline slider index
  const timelineItems = Array.isArray(place.visualTimeline) ? place.visualTimeline : [];
  const [timelineIndex, setTimelineIndex] = useState(0);

  // Audio Commentary active state
  const historyItems = Array.isArray(place.historyContent) ? place.historyContent : [];
  const [playingAudio, setPlayingAudio] = useState(null);

  // Nearby & Co-related places
  const nearbyPlaces = Array.isArray(place.nearbyPlaces) ? place.nearbyPlaces : [];
  const coRelatedPlaces = Array.isArray(place.coRelatedPlaces) ? place.coRelatedPlaces : [];

  // Determine web URL if available or generate search URL
  const destinationWebUrl =
    place.webUrl ||
    `https://en.wikipedia.org/wiki/${encodeURIComponent(place.name.replace(/\s+/g, '_'))}`;

  const searchGoogleUrl = `https://www.google.com/search?q=${encodeURIComponent(
    `${place.name} ${place.location} tourism guide timings history`
  )}`;

  const currentTimelineEra = timelineItems[timelineIndex] || null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
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
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
          
          {/* About Destination */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span>About Destination</span>
            </h4>
            <p className="text-sm text-slate-200 mt-1.5 leading-relaxed">
              {place.description}
            </p>
          </div>

          {/* Hidden / Unique History (if stored) */}
          {place.hiddenHistory && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1.5">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Unique & Hidden History
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "{place.hiddenHistory}"
              </p>
            </div>
          )}

          {/* Key Facts */}
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

          {/* Highlights */}
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

          {/* 1. History Content (Multilingual Audio / Video / Commentary) */}
          {historyItems.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-amber-400" />
                  <span>Multilingual Audio Commentaries & Guides ({historyItems.length})</span>
                </h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                  Live Audio Vault
                </span>
              </div>

              <div className="space-y-2">
                {historyItems.map((item, idx) => {
                  const isPlaying = playingAudio === idx;
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-amber-500/40 transition"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{item.title}</span>
                          <span className="text-[10px] px-2 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-semibold uppercase">
                            {item.language} • {item.mediaType}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 flex items-center gap-2">
                          {item.narrator && <span>Narrated by {item.narrator}</span>}
                          {item.duration && <span>• {item.duration}</span>}
                        </p>
                      </div>

                      <button
                        onClick={() => setPlayingAudio(isPlaying ? null : idx)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shrink-0 self-start sm:self-auto ${
                          isPlaying
                            ? 'bg-amber-500 text-slate-950 shadow-md'
                            : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{isPlaying ? 'Playing Narration...' : 'Play Commentary'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. Visual Timeline (Year-by-Year Slider) */}
          {timelineItems.length > 0 && currentTimelineEra && (
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>Visual Timeline (Year-by-Year Era Slider)</span>
                  </h4>
                  <p className="text-[11px] text-slate-400">Slide to travel through historical eras of {place.name}</p>
                </div>
                <span className="text-xs font-black text-amber-400 font-mono px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                  {timelineIndex + 1} / {timelineItems.length}
                </span>
              </div>

              {/* Slider Input */}
              <div className="space-y-2">
                <input
                  type="range"
                  min={0}
                  max={timelineItems.length - 1}
                  value={timelineIndex}
                  onChange={(e) => setTimelineIndex(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>{timelineItems[0]?.year}</span>
                  <span>{timelineItems[timelineItems.length - 1]?.year}</span>
                </div>
              </div>

              {/* Active Era Card */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center gap-4">
                {currentTimelineEra.imageUrl && (
                  <img
                    src={currentTimelineEra.imageUrl}
                    alt={currentTimelineEra.title}
                    className="w-full sm:w-36 h-28 rounded-lg object-cover bg-slate-800 shrink-0"
                  />
                )}
                <div className="space-y-1 text-center sm:text-left flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-xs font-mono">
                      {currentTimelineEra.year}
                    </span>
                    <h5 className="text-sm font-bold text-white">{currentTimelineEra.title}</h5>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentTimelineEra.description}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-1">
                <button
                  disabled={timelineIndex === 0}
                  onClick={() => setTimelineIndex((prev) => Math.max(0, prev - 1))}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-xs text-slate-300 font-semibold flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Previous Era
                </button>
                <button
                  disabled={timelineIndex === timelineItems.length - 1}
                  onClick={() => setTimelineIndex((prev) => Math.min(timelineItems.length - 1, prev + 1))}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-xs text-slate-300 font-semibold flex items-center gap-1"
                >
                  Next Era <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* 3. Nearby Places To Visit */}
          {nearbyPlaces.length > 0 && (
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Nearby Places To Visit (Within 15km)</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {nearbyPlaces.map((np, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                    {np.imageUrl ? (
                      <img src={np.imageUrl} alt={np.name} className="w-12 h-12 rounded-lg object-cover bg-slate-800 shrink-0" />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                    )}
                    <div className="overflow-hidden">
                      <h5 className="text-xs font-bold text-white truncate">{np.name}</h5>
                      <p className="text-[11px] text-amber-400">{np.distance} • <span className="text-slate-400">{np.category}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Co-Related Places */}
          {coRelatedPlaces.length > 0 && (
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-amber-400" />
                <span>Co-Related Historical Circuits & Heritage Links</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {coRelatedPlaces.map((cr, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold text-white truncate">{cr.name}</h5>
                      <span className="text-[10px] px-2 py-0.2 rounded-full bg-amber-500/10 text-amber-400 font-bold">
                        {cr.circuit}
                      </span>
                    </div>
                    {cr.connection && (
                      <p className="text-[11px] text-slate-400 leading-snug">{cr.connection}</p>
                    )}
                  </div>
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

