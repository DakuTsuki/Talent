import React, { useState } from 'react';
import TalentLogo from '../common/TalentLogo';
import { 
  Globe, 
  Menu, 
  X, 
  Briefcase, 
  GraduationCap, 
  User, 
  PlusCircle, 
  Calculator,
  ChevronDown,
  ShieldCheck
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  currentLanguage, 
  setCurrentLanguage,
  currentUser,
  onSignOut,
  onOpenAuthModal,
  onOpenPostJobModal,
  isAdminAuthenticated,
  onExitAdmin,
  isCalculatorOpen,
  onToggleCalculator
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'hu', label: 'Magyar', flag: '🇭🇺' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'uk', label: 'Українська', flag: '🇺🇦' }
  ];

  const isCompanyView = activeTab === 'employers';

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('students')}
          className="cursor-pointer shrink-0"
        >
          <TalentLogo size="default" />
        </div>

        {/* The Two Main Action Buttons: Student vs Company (WHC Style) */}
        <div className="hidden sm:flex items-center p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80 shadow-inner">
          <button
            onClick={() => setActiveTab('students')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
              !isCompanyView
                ? 'bg-[#0E3D6E] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <GraduationCap className={`w-4 h-4 ${!isCompanyView ? 'text-[#E5A812]' : ''}`} />
            <span>I am a Student</span>
          </button>

          <button
            onClick={() => setActiveTab('employers')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
              isCompanyView
                ? 'bg-[#1E5E3A] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Briefcase className={`w-4 h-4 ${isCompanyView ? 'text-[#8DB828]' : ''}`} />
            <span>I am a Company</span>
          </button>
        </div>

        {/* Right Navigation & Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Wage Calculator quick toggle button */}
          {!isCompanyView && (
            <button
              onClick={onToggleCalculator}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition border ${
                isCalculatorOpen 
                  ? 'bg-amber-50 text-amber-900 border-amber-300' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
              title="Toggle Student Net Wage Calculator"
            >
              <Calculator className="w-3.5 h-3.5 text-[#E5A812]" />
              <span>Wage Calculator</span>
            </button>
          )}

          {/* Employer Job Post button */}
          {isCompanyView && (
            <button
              onClick={onOpenPostJobModal}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#1E5E3A] hover:bg-[#16482d] text-white shadow-xs transition"
            >
              <PlusCircle className="w-4 h-4 text-[#8DB828]" />
              <span>Post a Job</span>
            </button>
          )}

          {/* Admin Mode Badge if authenticated */}
          {isAdminAuthenticated && (
            <div className="flex items-center gap-1.5 bg-[#E5A812] text-slate-950 px-2.5 py-1.5 rounded-xl font-bold text-xs shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Active</span>
              <button
                onClick={onExitAdmin}
                className="ml-1 text-[10px] underline text-slate-900 hover:text-black font-black"
              >
                Exit
              </button>
            </div>
          )}

          {/* Language selector */}
          <div className="relative">
            <button 
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/70 px-2.5 py-2 rounded-xl transition"
            >
              <Globe className="w-3.5 h-3.5 text-[#0E3D6E]" />
              <span className="uppercase">{currentLanguage}</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 py-1.5 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLanguage(lang.code);
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-slate-50 transition ${
                      currentLanguage === lang.code ? 'font-bold text-[#0E3D6E] bg-slate-50' : ''
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Student Account / Sign In */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                  activeTab === 'dashboard' 
                    ? 'bg-[#0E3D6E] text-white shadow-xs' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-[#E5A812] text-slate-950 text-[10px] flex items-center justify-center font-black">
                  {currentUser.fullName ? currentUser.fullName[0].toUpperCase() : 'S'}
                </div>
                <span>{currentUser.fullName?.split(' ')[0] || 'My'} Portal</span>
              </button>
              <button
                onClick={onSignOut}
                className="px-2.5 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
                title="Sign out"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-black bg-[#0E3D6E] hover:bg-[#0a2f55] text-white shadow-sm transition active:scale-95"
            >
              <User className="w-4 h-4 text-[#E5A812]" />
              <span>Student Sign In</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2 pb-2">
            <button
              onClick={() => { setActiveTab('students'); setIsMobileMenuOpen(false); }}
              className={`py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 ${
                !isCompanyView ? 'bg-[#0E3D6E] text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student</span>
            </button>

            <button
              onClick={() => { setActiveTab('employers'); setIsMobileMenuOpen(false); }}
              className={`py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 ${
                isCompanyView ? 'bg-[#1E5E3A] text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Company</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                onToggleCalculator();
                setIsMobileMenuOpen(false);
              }}
              className="text-xs font-bold text-slate-700 flex items-center gap-1.5 py-1.5"
            >
              <Calculator className="w-4 h-4 text-[#E5A812]" />
              <span>Wage Calculator</span>
            </button>

            {currentUser ? (
              <button
                onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }}
                className="text-xs font-bold text-[#0E3D6E]"
              >
                My Applications
              </button>
            ) : (
              <button
                onClick={() => { onOpenAuthModal(); setIsMobileMenuOpen(false); }}
                className="text-xs font-bold text-[#0E3D6E]"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
