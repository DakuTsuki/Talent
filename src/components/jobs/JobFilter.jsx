import React from 'react';
import { Filter, RotateCcw, Check, Sparkles } from 'lucide-react';
import { CATEGORIES, CITIES } from '../../data/mockJobs';

export default function JobFilter({ filters, setFilters, onReset }) {
  const shiftsList = ['Morning', 'Afternoon', 'Evening', 'Weekend', 'Night', 'Flexible'];

  const toggleShift = (shift) => {
    if (filters.shifts.includes(shift)) {
      setFilters({ ...filters, shifts: filters.shifts.filter(s => s !== shift) });
    } else {
      setFilters({ ...filters, shifts: [...filters.shifts, shift] });
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#0E3D6E]" />
          <h3 className="font-bold text-slate-900 text-sm">Filter Opportunities</h3>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
          Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-[#0E3D6E]"
        >
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* City */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
          City / Region
        </label>
        <select
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-[#0E3D6E]"
        >
          {CITIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Min Wage Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <label className="font-bold text-slate-700 uppercase tracking-wider">
            Min. Wage
          </label>
          <span className="font-bold text-[#0E3D6E]">
            {filters.minWage.toLocaleString()} Ft / hr
          </span>
        </div>
        <input
          type="range"
          min="2000"
          max="4000"
          step="100"
          value={filters.minWage}
          onChange={(e) => setFilters({ ...filters, minWage: Number(e.target.value) })}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0E3D6E]"
        />
      </div>

      {/* Shifts */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
          Available Shifts
        </label>
        <div className="flex flex-wrap gap-1.5">
          {shiftsList.map((shift) => {
            const isSelected = filters.shifts.includes(shift);
            return (
              <button
                key={shift}
                onClick={() => toggleShift(shift)}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition ${
                  isSelected
                    ? 'bg-[#0E3D6E] text-white border-[#0E3D6E]'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {shift}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Toggles */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
          Student Preferences
        </label>
        <div className="space-y-2">
          <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-slate-700">
            <input
              type="checkbox"
              checked={filters.englishOnly}
              onChange={(e) => setFilters({ ...filters, englishOnly: e.target.checked })}
              className="w-4 h-4 rounded text-[#E5A812] accent-[#E5A812]"
            />
            <span>English friendly (No Hungarian)</span>
          </label>

          <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-slate-700">
            <input
              type="checkbox"
              checked={filters.under18}
              onChange={(e) => setFilters({ ...filters, under18: e.target.checked })}
              className="w-4 h-4 rounded text-[#8DB828] accent-[#8DB828]"
            />
            <span>Age 16-17 (High School)</span>
          </label>

          <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-slate-700">
            <input
              type="checkbox"
              checked={filters.remoteOnly}
              onChange={(e) => setFilters({ ...filters, remoteOnly: e.target.checked })}
              className="w-4 h-4 rounded text-[#0E3D6E] accent-[#0E3D6E]"
            />
            <span>Home Office / Remote</span>
          </label>
        </div>
      </div>
    </div>
  );
}
