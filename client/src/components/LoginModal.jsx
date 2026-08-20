import React, { useState } from 'react';
import { X, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { loginAdminApi } from '../services/api';

export default function LoginModal({
  isOpen,
  onClose,
  userRole,
  setUserRole,
  onAdminLoginSuccess
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (userRole === 'admin') {
      try {
        setIsLoading(true);
        // Call MongoDB backend to verify admin credentials & receive JWT token
        const data = await loginAdminApi(email, password);
        onAdminLoginSuccess(data);
        onClose();
        setEmail('');
        setPassword('');
      } catch (err) {
        setErrorMsg(err.message || 'Invalid credentials or unauthorized account.');
      } finally {
        setIsLoading(false);
      }
    } else {
      // Regular traveler login
      onClose();
    }
  };

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

        {/* Role Switcher: Traveler vs Admin */}
        <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-950 border border-slate-800">
          <button
            onClick={() => {
              setUserRole('traveler');
              setErrorMsg('');
            }}
            className={`py-2 text-xs font-bold rounded-lg transition ${
              userRole === 'traveler'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Traveler
          </button>
          <button
            onClick={() => {
              setUserRole('admin');
              setErrorMsg('');
            }}
            className={`py-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
              userRole === 'admin'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Portal</span>
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Notice for Admin Mode */}
        {userRole === 'admin' && (
          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Real-time verification against MongoDB Atlas.</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={userRole === 'admin' ? 'admin1@tourism.in' : 'traveler@gmail.com'}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs tracking-wider uppercase shadow-lg shadow-amber-500/25 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <span>Log In as {userRole === 'admin' ? 'Admin' : 'Traveler'}</span>
            )}
          </button>
        </form>

        {userRole === 'traveler' && (
          <p className="text-center text-[11px] text-slate-500">
            Don't have an account?{' '}
            <span className="text-amber-400 font-semibold cursor-pointer hover:underline">
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
