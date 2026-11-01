import React, { useState } from 'react';
import { X, Lock, ShieldCheck, KeyRound, AlertCircle } from 'lucide-react';
import TalentLogo from './TalentLogo';

export default function AdminAuthModal({ isOpen, onClose, onAuthenticated }) {
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Authorized passkeys
    if (passkey.trim() === 'admin123' || passkey.trim() === 'talent2026' || passkey.trim() === 'admin') {
      setError('');
      setPasskey('');
      onAuthenticated();
      onClose();
    } else {
      setError('Invalid Coordinator Passkey. Access restricted.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-8 space-y-5">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#0E3D6E] text-[#E5A812] flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Talent Coordinator Access
            </h3>
            <p className="text-xs text-slate-500">
              Restricted management console for Talent school cooperative staff and matching coordinators.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Admin Passkey / PIN
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  autoFocus
                  placeholder="Enter Passkey (e.g. admin123)"
                  value={passkey}
                  onChange={(e) => {
                    setPasskey(e.target.value);
                    setError('');
                  }}
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E3D6E]"
                />
              </div>
              {error && (
                <div className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-600 font-semibold">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500">
              <strong className="text-slate-700 block mb-0.5">Staff Notice:</strong>
              Default authorized passkey for demo: <code className="bg-white px-1.5 py-0.5 rounded border font-mono font-bold text-[#0E3D6E]">admin123</code>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold bg-[#0E3D6E] hover:bg-[#082b4f] text-white text-xs sm:text-sm transition shadow-md flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#E5A812]" />
              <span>Unlock Admin Console</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
