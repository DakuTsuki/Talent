import React from 'react';
import { MapPin, Clock, Globe2, Sparkles, Bookmark, ArrowUpRight, Check, AlertCircle } from 'lucide-react';

export default function JobCard({ job, onSelectJob, onQuickApply, isSaved, onToggleSave }) {
  return (
    <div className="group relative bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 hover:border-[#0E3D6E]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      {/* Top Bar: Company info + Bookmark */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-2xs"
            />
            <div>
              <span className="text-xs font-semibold text-slate-500 block">
                {job.company}
              </span>
              <h3 
                onClick={() => onSelectJob(job)}
                className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0E3D6E] cursor-pointer transition line-clamp-1"
              >
                {job.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => onToggleSave && onToggleSave(job.id)}
            className={`p-2 rounded-xl border transition ${
              isSaved
                ? 'bg-amber-50 border-amber-300 text-[#E5A812]'
                : 'bg-slate-50 border-slate-200/70 text-slate-400 hover:text-slate-600 hover:bg-slate-100'
            }`}
            title={isSaved ? "Saved to favorites" : "Save job"}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* Location & Schedule line */}
        <div className="mt-3 flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            {job.location}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {job.schedule}
          </span>
        </div>

        {/* Short description */}
        <p className="mt-3 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {job.description}
        </p>

        {/* Tags / Badges */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {job.urgent && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#C92A2A]/10 text-[#C92A2A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C92A2A]" />
              Urgent Hiring
            </span>
          )}

          {job.isEnglishFriendly && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#E5A812]/15 text-[#925400]">
              <Globe2 className="w-3 h-3" />
              English OK
            </span>
          )}

          {job.isUnder18 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#8DB828]/15 text-[#4c6613]">
              Age 16+ (High School)
            </span>
          )}

          {job.isRemote && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700">
              Home Office / Remote
            </span>
          )}

          {job.shifts.slice(0, 2).map((shift) => (
            <span
              key={shift}
              className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600"
            >
              {shift}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Footer: Wage & Quick Apply */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              {job.hourlyRateHuf.toLocaleString()} Ft
            </span>
            <span className="text-xs font-semibold text-slate-500">/ hour</span>
          </div>
          <span className="text-[11px] text-[#1E5E3A] font-bold block">
            ≈ €{job.hourlyRateEur} · 100% Tax-Free
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectJob(job)}
            className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition"
          >
            Details
          </button>
          <button
            onClick={() => onQuickApply(job)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#0E3D6E] hover:bg-[#092b4f] text-white shadow-sm transition active:scale-95"
          >
            <span>Apply</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#E5A812]" />
          </button>
        </div>
      </div>
    </div>
  );
}
