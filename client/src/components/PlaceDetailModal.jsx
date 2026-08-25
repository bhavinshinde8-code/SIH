import React, { useState, useEffect } from 'react';
import {
  X,
  MapPin,
  ExternalLink,
  Globe,
  Star,
  ShieldCheck,
  Clock,
  Sparkles,
  Compass,
  Link as LinkIcon,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Volume2,
  VolumeX,
  Play,
  Square,
  Pause,
  RotateCcw,
} from 'lucide-react';

export default function PlaceDetailModal({ place, onClose }) {
  if (!place) return null;

  // Detailed Description accordion/dropdown toggle state
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  // Audio narration state for Detailed Description
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPausedAudio, setIsPausedAudio] = useState(false);

  // Cleanup speech on modal close or unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleTogglePlayAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech audio reader is not supported in this browser.');
      return;
    }

    if (isPlayingAudio) {
      if (isPausedAudio) {
        window.speechSynthesis.resume();
        setIsPausedAudio(false);
      } else {
        window.speechSynthesis.pause();
        setIsPausedAudio(true);
      }
      return;
    }

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    // Prepare speech content: clean numbering for smooth reading
    const textToRead = `${place.name}. Detailed heritage overview. ${place.description}. ${place.detailedDescription || ''}`;
    const cleanText = textToRead.replace(/\d+\.\s*/g, '. ').replace(/[#*_]/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'en-IN';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
    };

    setIsPlayingAudio(true);
    setIsPausedAudio(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleStopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    setIsPausedAudio(false);
  };

  // Timeline slider index
  const timelineItems = Array.isArray(place.visualTimeline) ? place.visualTimeline : [];
  const [timelineIndex, setTimelineIndex] = useState(0);

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
        <div className="place-modal-header relative h-64 sm:h-72 w-full bg-slate-800 shrink-0">
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/20" />
          
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
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {place.tag || 'Heritage & Cultural Tourism'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              {place.name}
            </h2>
            <div className="flex items-center gap-2 text-xs text-white/90 mt-1.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">{place.location}</span>
            </div>
          </div>
        </div>

        {/* Body Details */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
          
          {/* About Destination */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <span>About Destination</span>
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed">
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

          {/* Key Highlights / Key Features */}
          {place.highlights && place.highlights.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Key Features & Highlights</h4>
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

          {/* Comprehensive 50-Line Detailed Information (Interactive Collapsible Dropdown + Voice Reader) */}
          {place.detailedDescription && (
            <div className="rounded-2xl bg-slate-950/90 border border-slate-800 overflow-hidden transition-all duration-300">
              <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/40">
                
                {/* Accordion Click Area */}
                <div
                  onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                  className="flex items-center gap-2.5 cursor-pointer flex-1 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition flex items-center gap-1.5">
                      <span>Detailed Description (In-Depth Heritage & Tourist Guide)</span>
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {isDescriptionOpen ? 'Click to collapse text view' : 'Click to expand text / or listen to voice audio guide'}
                    </p>
                  </div>
                </div>

                {/* Audio Reader & Dropdown Toggle Action Bar */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {/* Listen Voice Audio Reader Button */}
                  <button
                    type="button"
                    onClick={handleTogglePlayAudio}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md ${
                      isPlayingAudio
                        ? isPausedAudio
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-amber-500/20 animate-pulse'
                        : 'bg-slate-800 text-amber-400 hover:bg-slate-700 border border-slate-700'
                    }`}
                    title="Listen to the complete heritage description in natural voice"
                  >
                    {isPlayingAudio ? (
                      isPausedAudio ? (
                        <>
                          <Play className="w-3.5 h-3.5 fill-amber-400" />
                          <span>Resume Audio</span>
                        </>
                      ) : (
                        <>
                          <Pause className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                          <span>Pause Audio</span>
                        </>
                      )
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Listen Audio</span>
                      </>
                    )}
                  </button>

                  {/* Stop Audio Button if Playing */}
                  {isPlayingAudio && (
                    <button
                      type="button"
                      onClick={handleStopAudio}
                      className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 border border-slate-700 transition"
                      title="Stop Audio Narration"
                    >
                      <Square className="w-3.5 h-3.5 fill-current" />
                    </button>
                  )}

                  {/* Read / Expand Button */}
                  <button
                    type="button"
                    onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 transition"
                  >
                    <span>{isDescriptionOpen ? 'Hide' : 'Read'}</span>
                    {isDescriptionOpen ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Collapsible Dropdown Body */}
              {isDescriptionOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-800/80 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="text-xs text-slate-300 leading-loose space-y-3 font-normal whitespace-pre-line max-h-96 overflow-y-auto pr-2 custom-scrollbar mt-3">
                    {place.detailedDescription}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Visual Timeline (Year-by-Year Slider) */}
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

