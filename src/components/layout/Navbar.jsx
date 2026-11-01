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
  Search, 
  Calculator,
  ChevronDown
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
  onExitAdmin
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'hu', label: 'Magyar', flag: '🇭🇺' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'uk', label: 'Українська', flag: '🇺🇦' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Banner / Audience Selector Bar */}
      <div className="bg-[#0E3D6E] text-white text-xs py-1.5 px-4 sm:px-8 flex justify-between items-center font-medium">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('students')}
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded transition ${
              activeTab === 'students' 
                ? 'bg-white/20 text-[#E5A812] font-bold' 
                : 'text-slate-200 hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>I am a Student</span>
          </button>
          <span className="text-white/30">|</span>
          <button 
            onClick={() => setActiveTab('employers')}
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded transition ${
              activeTab === 'employers' 
                ? 'bg-white/20 text-[#8DB828] font-bold' 
                : 'text-slate-200 hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>For Employers & Companies</span>
          </button>

          {/* Secure Admin Badge - only visible when actually unlocked */}
          {isAdminAuthenticated && (
            <>
              <span className="text-white/30">|</span>
              <div className="flex items-center gap-1.5 bg-[#E5A812] text-slate-950 px-2 py-0.5 rounded-md font-bold text-[11px] shadow-xs">
                <span>🔒 Coordinator Admin Mode</span>
                <button
                  onClick={onExitAdmin}
                  className="ml-1 text-[10px] underline text-slate-900 hover:text-black font-extrabold"
                  title="Lock and exit admin"
                >
                  Exit
                </button>
              </div>
            </>
          )}
        </div>

        {/* Language selector & quick hotline */}
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-slate-200">
          <span className="hidden md:inline">Hotline for Students: +36 1 800 8253</span>
          <div className="relative">
            <button 
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-1 hover:text-white bg-white/10 px-2 py-0.5 rounded"
            >
              <Globe className="w-3 h-3 text-[#E5A812]" />
              <span className="uppercase">{currentLanguage}</span>
              <ChevronDown className="w-3 h-3 opacity-70" />
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
                <div className="border-t border-slate-100 my-1 pt-1 px-3">
                  <span className="text-[10px] text-slate-400 block">Google Translate Ready</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('students')}
          className="cursor-pointer"
        >
          <TalentLogo size="default" />
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
          <button 
            onClick={() => setActiveTab('jobs')}
            className={`transition hover:text-[#0E3D6E] flex items-center gap-1.5 ${
              activeTab === 'jobs' ? 'text-[#0E3D6E] font-bold' : ''
            }`}
          >
            <Search className="w-4 h-4 text-[#E5A812]" />
            Find Student Jobs
          </button>

          <button 
            onClick={() => setActiveTab('calculator')}
            className={`transition hover:text-[#0E3D6E] flex items-center gap-1.5 ${
              activeTab === 'calculator' ? 'text-[#0E3D6E] font-bold' : ''
            }`}
          >
            <Calculator className="w-4 h-4 text-[#8DB828]" />
            Wage Calculator
          </button>

          <button 
            onClick={() => setActiveTab('how-it-works')}
            className={`transition hover:text-[#0E3D6E] ${
              activeTab === 'how-it-works' ? 'text-[#0E3D6E] font-bold' : ''
            }`}
          >
            How It Works (Cooperative)
          </button>

          <button 
            onClick={() => setActiveTab('employers')}
            className={`transition hover:text-[#0E3D6E] ${
              activeTab === 'employers' ? 'text-[#0E3D6E] font-bold' : ''
            }`}
          >
            Hire Students
          </button>

          <button 
            onClick={() => setActiveTab('faq')}
            className={`transition hover:text-[#0E3D6E] ${
              activeTab === 'faq' ? 'text-[#0E3D6E] font-bold' : ''
            }`}
          >
            FAQ & Law
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-2.5">
          {activeTab === 'employers' ? (
            <button
              onClick={onOpenPostJobModal}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-[#1E5E3A] hover:bg-[#16482d] text-white shadow-sm transition active:scale-[0.98]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Student Job</span>
            </button>
          ) : null}

          {currentUser ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                  activeTab === 'dashboard' 
                    ? 'bg-[#0E3D6E] text-white shadow-sm' 
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
                title="Sign out of student account"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-[#0E3D6E] hover:bg-[#092b4f] text-white shadow-md hover:shadow-lg transition active:scale-[0.98]"
            >
              <User className="w-4 h-4 text-[#E5A812]" />
              <span>Student Sign In</span>
            </button>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center gap-2">
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
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <button
              onClick={() => { setActiveTab('students'); setIsMobileMenuOpen(false); }}
              className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 ${
                activeTab === 'students' ? 'bg-[#0E3D6E] text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              For Students
            </button>
            <button
              onClick={() => { setActiveTab('employers'); setIsMobileMenuOpen(false); }}
              className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 ${
                activeTab === 'employers' ? 'bg-[#1E5E3A] text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              For Employers
            </button>
          </div>

          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-800">
            <button 
              onClick={() => { setActiveTab('jobs'); setIsMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#E5A812]" />
                Browse Student Jobs
              </span>
              <span className="text-xs bg-[#E5A812]/20 text-slate-900 font-bold px-2 py-0.5 rounded-full">48+</span>
            </button>

            <button 
              onClick={() => { setActiveTab('calculator'); setIsMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50 flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-[#8DB828]" />
              Wage & Tax Calculator
            </button>

            <button 
              onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50 flex items-center gap-2"
            >
              <User className="w-4 h-4 text-[#0E3D6E]" />
              Student Portal & Applications
            </button>

            <button 
              onClick={() => { setActiveTab('how-it-works'); setIsMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              How School Cooperative Works
            </button>

            <button 
              onClick={() => { setActiveTab('faq'); setIsMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              Student Legal Rules & Tax Exemption
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {currentUser ? (
              <div className="space-y-2">
                <button
                  onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }}
                  className="w-full py-2.5 rounded-xl font-bold bg-[#0E3D6E] text-white text-center text-sm shadow"
                >
                  View My Dashboard ({currentUser.fullName?.split(' ')[0]})
                </button>
                <button
                  onClick={() => { onSignOut(); setIsMobileMenuOpen(false); }}
                  className="w-full py-2 rounded-xl font-bold bg-rose-50 text-rose-700 text-center text-xs border border-rose-200"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => { onOpenAuthModal(); setIsMobileMenuOpen(false); }}
                className="w-full py-2.5 rounded-xl font-bold bg-[#0E3D6E] text-white text-center text-sm shadow"
              >
                Student Log In / Register
              </button>
            )}
            <button
              onClick={() => { onOpenPostJobModal(); setIsMobileMenuOpen(false); }}
              className="w-full py-2.5 rounded-xl font-bold bg-slate-100 text-[#0E3D6E] text-center text-sm"
            >
              Post a Job for Students
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
