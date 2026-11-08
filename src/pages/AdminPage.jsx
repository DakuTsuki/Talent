import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard';
import TalentLogo from '../components/common/TalentLogo';
import { Lock, KeyRound, AlertCircle, ArrowLeft, ShieldCheck, LogOut } from 'lucide-react';

export default function AdminPage({ onNavigateHome }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('talent_admin_auth') === 'true';
  });
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const cleanKey = passkey.trim();
    if (cleanKey === 'admin123' || cleanKey === 'talent2026' || cleanKey === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('talent_admin_auth', 'true');
      setError('');
    } else {
      setError('Invalid passkey. Access restricted to authorized staff.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('talent_admin_auth');
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col">
        {/* Dedicated Admin Header */}
        <header className="bg-slate-900 text-white border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40 shadow-md">
          <div className="flex items-center gap-4">
            <TalentLogo size="small" />
            <span className="hidden sm:inline text-xs font-bold px-2.5 py-1 rounded-full bg-[#E5A812] text-slate-950">
              Staff Portal (/admin)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Site</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-800/60 transition"
              title="Lock Admin Console"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock & Sign Out</span>
            </button>
          </div>
        </header>

        {/* Full Admin Management & Matching Console */}
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <AdminDashboard />
        </main>
      </div>
    );
  }

  // Dedicated Admin Login Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0E3D6E] via-[#09294b] to-[#041627] flex flex-col items-center justify-center p-4">
      {/* Back button */}
      <div className="w-full max-w-md mb-6 flex justify-start">
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl transition"
        >
          <ArrowLeft className="w-4 h-4 text-[#E5A812]" />
          <span>← Back to Public Jobs Portal</span>
        </button>
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/20 space-y-6">
        <div className="text-center space-y-3">
          <div className="mx-auto flex justify-center mb-2">
            <TalentLogo size="default" />
          </div>

          <div className="w-12 h-12 rounded-2xl bg-[#0E3D6E] text-[#E5A812] flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-6 h-6" />
          </div>

          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Staff Coordination Console
          </h1>
          <p className="text-xs text-slate-500">
            Internal administration for Talent School Cooperative staff. Enter your passkey to manage student applications, employer requests, and AI matchmaking.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Coordinator Passkey
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                autoFocus
                placeholder="Enter passkey (e.g. admin123)"
                value={passkey}
                onChange={(e) => {
                  setPasskey(e.target.value);
                  if (error) setError('');
                }}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#0E3D6E] focus:bg-white transition"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              Authorized default passkey: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-mono">admin123</code>
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-black text-sm bg-[#0E3D6E] hover:bg-[#092b4f] text-white shadow-md transition active:scale-98 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-[#E5A812]" />
            <span>Unlock Admin Console</span>
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center">
          <span className="text-[11px] text-slate-400">
            Dedicated URL path: <strong className="text-slate-600">/admin</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
