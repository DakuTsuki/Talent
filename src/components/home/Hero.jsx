import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Sparkles, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { CITIES, CATEGORIES } from '../../data/mockJobs';

export default function Hero({ onSearch }) {
  const [keyword, setKeyword] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch({
      keyword,
      city: selectedCity,
      category: selectedCategory
    });
  };

  const quickBadges = [
    { label: 'Remote / Home Office', filterKey: 'remote' },
    { label: 'English Only (No HU required)', filterKey: 'english' },
    { label: 'High School / Under 18', filterKey: 'under18' },
    { label: 'Over 2,800 Ft / hr', filterKey: 'highPay' },
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-14 lg:pt-14 lg:pb-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200/60">
      {/* Visual Accent Glows matching the brand palette */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E5A812]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-[#8DB828]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-10 w-96 h-96 bg-[#0E3D6E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#0E3D6E]/10 text-[#0E3D6E] border border-[#0E3D6E]/15 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#E5A812] animate-pulse" />
            <span>Next-Gen Student School Cooperative Platform</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
            Work on Your Own Terms. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0E3D6E] via-[#1E5E3A] to-[#8DB828]">
              Earn Big While Studying.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            Find flexible hourly jobs, paid internships, and remote gigs fitted around your lectures. 
            Enjoy <strong className="text-slate-900">100% tax-free gross wages</strong> if you're under 25, 
            backed by digital paperless administration.
          </p>

          {/* Key Trust Perks */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-semibold text-slate-700 pt-1">
            <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              0% Tax Deducted (Under 25)
            </span>
            <span className="flex items-center gap-1.5 bg-blue-50 text-blue-800 px-3 py-1 rounded-full border border-blue-200">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              1-Click Online Contract
            </span>
            <span className="flex items-center gap-1.5 bg-amber-50 text-amber-800 px-3 py-1 rounded-full border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              International Student Friendly
            </span>
          </div>
        </div>

        {/* Live Search Engine Bar */}
        <div className="mt-10 max-w-4xl mx-auto">
          <form 
            onSubmit={handleSearchSubmit}
            className="bg-white rounded-3xl p-3 sm:p-4 shadow-xl border border-slate-200/90 grid grid-cols-1 md:grid-cols-12 gap-3"
          >
            {/* Input 1: Keyword */}
            <div className="md:col-span-5 flex items-center gap-3 px-3 py-2 bg-slate-50/80 hover:bg-slate-50 rounded-2xl border border-slate-200/60 focus-within:border-[#0E3D6E] focus-within:bg-white transition">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Job title, skill (e.g. Barista, React, Cashier)..."
                className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none font-medium"
              />
            </div>

            {/* Input 2: City */}
            <div className="md:col-span-3 flex items-center gap-2 px-3 py-2 bg-slate-50/80 hover:bg-slate-50 rounded-2xl border border-slate-200/60 focus-within:border-[#0E3D6E] focus-within:bg-white transition">
              <MapPin className="w-4 h-4 text-[#C92A2A] shrink-0" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-slate-700 focus:outline-none font-medium cursor-pointer"
              >
                {CITIES.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Input 3: Category */}
            <div className="md:col-span-2 flex items-center gap-2 px-3 py-2 bg-slate-50/80 hover:bg-slate-50 rounded-2xl border border-slate-200/60 focus-within:border-[#0E3D6E] focus-within:bg-white transition">
              <Briefcase className="w-4 h-4 text-[#8DB828] shrink-0" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-slate-700 focus:outline-none font-medium cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full h-full min-h-[46px] rounded-2xl font-bold text-sm bg-[#0E3D6E] hover:bg-[#0a2f55] text-white flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition active:scale-[0.98]"
              >
                <span>Find Jobs</span>
                <ArrowRight className="w-4 h-4 text-[#E5A812]" />
              </button>
            </div>
          </form>

          {/* Quick Filter Badges */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Quick Filters:</span>
            {quickBadges.map((badge) => (
              <button
                key={badge.filterKey}
                onClick={() => onSearch({ quickFilter: badge.filterKey })}
                className="px-3 py-1 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 font-medium shadow-2xs transition hover:border-slate-300 active:scale-95"
              >
                {badge.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Metrics Row */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur rounded-2xl p-4 border border-slate-200/70 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-[#0E3D6E]">1,250+</div>
            <div className="text-xs font-semibold text-slate-500 mt-0.5">Active Student Members</div>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-2xl p-4 border border-slate-200/70 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-[#8DB828]">320+</div>
            <div className="text-xs font-semibold text-slate-500 mt-0.5">Verified Companies</div>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-2xl p-4 border border-slate-200/70 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-[#E5A812]">2,800 Ft</div>
            <div className="text-xs font-semibold text-slate-500 mt-0.5">Avg. Hourly Wage</div>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-2xl p-4 border border-slate-200/70 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-[#1E5E3A]">100%</div>
            <div className="text-xs font-semibold text-slate-500 mt-0.5">Paperless Onboarding</div>
          </div>
        </div>
      </div>
    </section>
  );
}
