import React from 'react';
import { Star, MapPin, ArrowRight, Compass, Sparkles } from 'lucide-react';

export default function DestinationsGrid({
  places,
  onSelectPlace,
  onResetFilters
}) {
  return (
    <section id="destinations" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">
            <Sparkles className="w-4 h-4" /> Curated By Host Community
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Top Trending Destinations
          </h2>
        </div>
        <p className="text-sm text-slate-400 max-w-md">
          Discover sacred temples, Buddhist caves, and cliff-side Sahyadri treks with detailed host-managed guides.
        </p>
      </div>

      {/* Destinations Grid */}
      {places.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800">
          <Compass className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-lg font-medium text-slate-300">No destinations match your query.</p>
          <p className="text-xs text-slate-500 mt-1">Try resetting the category filter or searching another keyword.</p>
          <button
            onClick={onResetFilters}
            className="mt-4 px-4 py-2 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {places.map((place) => (
            <div
              key={place._id || place.id}
              onClick={() => onSelectPlace(place)}
              className="group cursor-pointer rounded-2xl bg-slate-900 border border-slate-800/80 hover:border-amber-500/50 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Card Image */}
                <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-slate-800">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                  {/* Tag badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-[10px] uppercase font-bold tracking-wider text-amber-300">
                    {place.tag}
                  </div>

                  {/* Rating badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-xs font-bold text-white flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{place.rating}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({place.reviews})</span>
                  </div>

                  {/* Location strip */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 text-xs text-slate-200 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{place.location}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {place.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {place.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {place.highlights.slice(0, 3).map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-slate-800/80 text-[11px] font-medium text-slate-300 border border-slate-700/40"
                      >
                        • {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer / Host info */}
              <div className="px-5 py-3.5 border-t border-slate-800/60 bg-slate-950/40 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Host: <strong className="text-slate-200">{place.host}</strong></span>
                </div>
                <button className="text-xs font-semibold text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>View Info</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
