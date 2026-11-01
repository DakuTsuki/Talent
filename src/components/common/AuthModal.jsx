import React, { useState } from 'react';
import { X, GraduationCap, Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import TalentLogo from './TalentLogo';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [university, setUniversity] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Derive name from email if signing in without full name
    const derivedName = fullName.trim() 
      ? fullName.trim() 
      : email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    const userProfile = {
      id: `stud-${Date.now()}`,
      fullName: derivedName,
      email: email.trim(),
      university: university.trim() || 'Budapest University of Technology & Economics (BME)',
      studentId: `#TL-${Math.floor(10000 + Math.random() * 90000)}`,
      isUnder25: true,
      registeredAt: new Date().toISOString()
    };

    if (onLoginSuccess) {
      onLoginSuccess(userProfile);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <TalentLogo size="small" className="justify-center" />
            <h3 className="text-2xl font-black text-slate-900">
              {isRegister ? 'Join Talent Cooperative' : 'Student Sign In'}
            </h3>
            <p className="text-xs text-slate-500">
              {isRegister
                ? 'Sign up to unlock 100% tax-free student jobs and 1-click applications'
                : 'Log in to manage your student profile, tracked applications, and contracts'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Full Legal Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Kovács"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E3D6E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">University / College *</label>
                  <div className="relative">
                    <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. BME, Corvinus, ELTE"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E3D6E]"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Student Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="student@university.hu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E3D6E]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E3D6E]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold bg-[#0E3D6E] hover:bg-[#092b4f] text-white text-sm transition shadow-md flex items-center justify-center gap-2"
            >
              <span>{isRegister ? 'Create Free Student Account' : 'Sign In to Dashboard'}</span>
              <ArrowRight className="w-4 h-4 text-[#E5A812]" />
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs font-bold text-[#0E3D6E] hover:underline"
            >
              {isRegister
                ? 'Already have an account? Sign In'
                : "Don't have an account yet? Register here"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
