import React from 'react';
import { X } from 'lucide-react';

export default function LoginModal({
  isOpen,
  onClose,
  userRole,
  setUserRole
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1">
          <h3 className="text-xl font-bold text-white">Welcome Back</h3>
          <p className="text-xs text-slate-400">Choose your portal to proceed</p>
        </div>

        {/* Role Switcher: Traveler vs Host */}
        <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-950 border border-slate-800">
          <button
            onClick={() => setUserRole('traveler')}
            className={`py-2 text-xs font-bold rounded-lg transition ${
              userRole === 'traveler'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Traveler / User
          </button>
          <button
            onClick={() => setUserRole('host')}
            className={`py-2 text-xs font-bold rounded-lg transition ${
              userRole === 'host'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Tourism Host
          </button>
        </div>

        {/* Login Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder={userRole === 'host' ? 'host@tourism.in' : 'traveler@gmail.com'}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs tracking-wider uppercase shadow-lg shadow-amber-500/25 transition duration-200"
          >
            Log In as {userRole === 'host' ? 'Host' : 'Traveler'}
          </button>
        </form>

        <p className="text-center text-[11px] text-slate-500">
          Don't have an account?{' '}
          <span className="text-amber-400 font-semibold cursor-pointer hover:underline">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
