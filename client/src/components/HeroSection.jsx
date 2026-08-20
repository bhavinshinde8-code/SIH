import React from 'react';
import { MapPin } from 'lucide-react';

export default function HeroSection({ heroSlides, currentSlide }) {
  const activeSlideData = heroSlides[currentSlide] || heroSlides[0];

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-between overflow-hidden pt-24 pb-10">
      {/* Background Rotating Slides */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-slate-950">
        {heroSlides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {slide.type === 'video' ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  src={slide.url}
                />
              ) : (
                <img
                  src={slide.url}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Vignette Overlay for photo brilliance + readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/60 z-20 pointer-events-none" />

      {/* Hero Top Pill */}
      <div className="relative z-30 max-w-5xl mx-auto px-4 text-center pt-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/80 border border-amber-400 text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-widest backdrop-blur-md shadow-2xl">
          <MapPin className="w-4 h-4 text-amber-400 animate-bounce" />
          <span>Currently Viewing: {activeSlideData.title}</span>
          <span className="text-slate-400 font-normal">({activeSlideData.location})</span>
        </div>
      </div>

      {/* Hero Central Text: "Let Know Our India" */}
      <div className="relative z-30 max-w-5xl mx-auto px-4 text-center space-y-4 my-auto">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
          Let Know <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-amber-200 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">Our India</span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-100 font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
          Explore timeless temples, Buddhist caves, sacred river ghats, and majestic Sahyadri mountain forts through local registered tourism hosts.
        </p>
      </div>

      {/* Bottom Stats Banner at edge of photos */}
      <div className="relative z-30 max-w-5xl mx-auto px-4 w-full pt-4 pb-2">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
          <div className="p-3 rounded-xl bg-slate-950/85 border border-slate-700/80 backdrop-blur-md text-center shadow-2xl">
            <p className="text-xl sm:text-2xl font-black text-amber-400">12+</p>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-300 font-semibold">Historical Sites</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/85 border border-slate-700/80 backdrop-blur-md text-center shadow-2xl">
            <p className="text-xl sm:text-2xl font-black text-amber-400">2000+</p>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-300 font-semibold">Years Heritage</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/85 border border-slate-700/80 backdrop-blur-md text-center shadow-2xl">
            <p className="text-xl sm:text-2xl font-black text-amber-400">50+</p>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-300 font-semibold">Verified Hosts</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/85 border border-slate-700/80 backdrop-blur-md text-center shadow-2xl">
            <p className="text-xl sm:text-2xl font-black text-amber-400">4.9 ★</p>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-300 font-semibold">Traveler Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
