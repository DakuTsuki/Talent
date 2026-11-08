import React, { useState } from 'react';
import { Search, MapPin, Briefcase, ArrowRight } from 'lucide-react';
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
    { label: 'English Friendly', filterKey: 'english' },
    { label: 'Under 18 (High School)', filterKey: 'under18' },
    { label: 'Remote / Home Office', filterKey: 'remote' },
    { label: 'Over 2,800 Ft / hr', filterKey: 'highPay' },
  ];

  return (
    <section className="bg-gradient-to-b from-slate-100/80 to-white pt-8 pb-8 px-4 sm:px-6 lg:px-8 border-b border-slate-200/60">
      <div className="max-w-5xl mx-auto text-center space-y-4">
        
        {/* Simple Clean Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          Find Your Next <span className="text-[#0E3D6E]">Student Job</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          Flexible shifts around your studies. <strong>100% tax-free gross wages</strong> under 25 via school cooperative.
        </p>

        {/* Clean Search Form (WHC Style) */}
        <form 
          onSubmit={handleSearchSubmit}
          className="mt-6 bg-white rounded-2xl p-2.5 sm:p-3 shadow-lg border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-2 text-left"
        >
          {/* 1. Keyword */}
          <div className="md:col-span-5 flex items-center gap-2.5 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200/80 focus-within:border-[#0E3D6E] focus-within:bg-white transition">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Position or skill (e.g. Barista, IT, Cashier)..."
              className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none font-medium"
            />
          </div>

          {/* 2. City */}
          <div className="md:col-span-3 flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200/80 focus-within:border-[#0E3D6E] focus-within:bg-white transition">
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

          {/* 3. Category */}
          <div className="md:col-span-2 flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200/80 focus-within:border-[#0E3D6E] focus-within:bg-white transition">
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

          {/* 4. Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full h-full min-h-[42px] rounded-xl font-bold text-xs sm:text-sm bg-[#0E3D6E] hover:bg-[#0a2f55] text-white flex items-center justify-center gap-1.5 shadow-sm transition active:scale-98"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4 text-[#E5A812]" />
            </button>
          </div>
        </form>

        {/* Quick Filter Badges */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold text-[11px]">Quick filters:</span>
          {quickBadges.map((badge) => (
            <button
              key={badge.filterKey}
              onClick={() => onSearch({ quickFilter: badge.filterKey })}
              className="px-3 py-1 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-medium text-xs shadow-2xs transition active:scale-95"
            >
              {badge.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
