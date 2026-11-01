import React from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Building2, 
  Globe2, 
  ShieldAlert, 
  ArrowUpRight, 
  Share2, 
  Bookmark,
  Coins
} from 'lucide-react';

export default function JobDetailModal({ job, onClose, onApply }) {
  if (!job) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8">
        {/* Top Header Banner with Brand Color Gradient */}
        <div className="bg-gradient-to-r from-[#0E3D6E] via-[#1E5E3A] to-[#8DB828] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-16 h-16 rounded-2xl object-cover bg-white p-1 shadow-md"
            />
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-white/80 block">
                {job.company}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {job.title}
              </h2>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-white/90">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {job.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {job.schedule}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Wage Card Highlight */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">
                Hourly Student Wage
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900">
                  {job.hourlyRateHuf.toLocaleString()} Ft
                </span>
                <span className="text-sm text-slate-500">/ hour net (Under 25)</span>
              </div>
              <span className="text-xs text-[#1E5E3A] font-bold">
                ≈ €{job.hourlyRateEur} · Legal student cooperative contract
              </span>
            </div>

            <button
              onClick={() => onApply(job)}
              className="px-6 py-3 rounded-xl font-bold bg-[#0E3D6E] hover:bg-[#092b4f] text-white flex items-center gap-2 shadow-md hover:shadow-lg transition active:scale-95 text-sm"
            >
              <span>Apply for this Job</span>
              <ArrowUpRight className="w-4 h-4 text-[#E5A812]" />
            </button>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Role Overview
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* Requirements */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Requirements & Conditions
            </h4>
            <ul className="space-y-2">
              {job.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#1E5E3A] shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              What We Offer / Perks
            </h4>
            <ul className="space-y-2">
              {job.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E5A812] shrink-0 mt-2" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Shifts and Schedule */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Shift Options
            </h4>
            <div className="flex flex-wrap gap-2">
              {job.shifts.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Student Legal Notice */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/60 text-xs text-blue-900 leading-relaxed">
            <strong className="block font-bold mb-0.5">Student School Cooperative Guarantee:</strong>
            Employment is administered fully online via the Talent Student Cooperative. You receive all earnings with 0% personal tax deduction if you are under 25.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {job.applicantsCount} students have applied for this position
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition"
            >
              Close
            </button>
            <button
              onClick={() => onApply(job)}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0E3D6E] text-white hover:bg-[#0a2f55] transition shadow-xs"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
