import React from 'react';
import { Compass, Search, LogIn } from 'lucide-react';

export default function Navbar({
  searchQuery,
  setSearchQuery,
  onLoginClick,
  currentAdmin,
  activeView,
  setActiveView,
  onLogout
}) {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/85 backdrop-blur-lg border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo Section with India Emblem / Tiranga Chakra */}
        <div
          onClick={() => setActiveView && setActiveView('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl p-[2px] bg-gradient-to-b from-[#FF9933] via-white to-[#138808] shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center relative overflow-hidden">
              {/* Ashoka Chakra vector */}
              <svg
                viewBox="0 0 100 100"
                className="w-7 h-7 text-blue-600 animate-spin-slow"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="3" />
                <circle cx="50" cy="50" r="8" fill="currentColor" />
                {Array.from({ length: 24 }).map((_, i) => {
                  const angle = (i * 360) / 24;
                  return (
                    <line
                      key={i}
                      x1="50"
                      y1="50"
                      x2={50 + 40 * Math.cos((angle * Math.PI) / 180)}
                      y2={50 + 40 * Math.sin((angle * Math.PI) / 180)}
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  );
                })}
              </svg>
            </div>
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
              Deepak<span className="text-amber-400">Tambe</span>
            </span>
            <p className="text-[10px] tracking-widest uppercase text-slate-400 font-medium">
              Incredible India Tourism
            </p>
          </div>
        </div>

        {/* Center Search Bar */}
        <div className="hidden md:flex items-center relative w-80 lg:w-96">
          <Search className="w-4 h-4 absolute left-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search Nashik temples, forts, caves..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-700/70 text-xs text-slate-200 placeholder-slate-400 rounded-full pl-9 pr-4 py-2.5 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-slate-400 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Right Action */}
        <div className="flex items-center gap-3">
          {currentAdmin ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveView(activeView === 'admin' ? 'home' : 'admin')}
                className="px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider hover:bg-amber-500/20 transition"
              >
                {activeView === 'admin' ? 'View Website' : 'Admin Panel'}
              </button>
              <button
                onClick={onLogout}
                className="px-3 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 text-xs transition"
              >
                Log Out
              </button>
            </div>
          ) : (
            <>
              <a
                href="#destinations"
                className="text-xs uppercase tracking-wider font-semibold text-slate-300 hover:text-amber-400 transition px-3 py-2 hidden sm:inline-block"
              >
                Explore
              </a>
              <button
                onClick={onLoginClick}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs tracking-wide uppercase shadow-lg shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <LogIn className="w-4 h-4" />
                <span>Log In</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
