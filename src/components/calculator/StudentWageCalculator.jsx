import React, { useState } from 'react';
import { Calculator, Sparkles, TrendingUp, HelpCircle, ArrowRight } from 'lucide-react';

export default function StudentWageCalculator({ onFindJobsWithRate }) {
  const [hourlyWage, setHourlyWage] = useState(2800);
  const [weeklyHours, setWeeklyHours] = useState(20);
  const [isUnder25, setIsUnder25] = useState(true);
  const [currency, setCurrency] = useState('HUF'); // 'HUF' | 'EUR'

  const exchangeRate = 392; // HUF per EUR approximately

  // Calculation:
  // Under student coop law (Hungarian school coop):
  // Under 25: 0% tax, 0% contributions. Net = Gross.
  // 25 or older student: 15% personal income tax deduction.
  const taxRate = isUnder25 ? 0.0 : 0.15;
  
  const weeklyGrossHuf = hourlyWage * weeklyHours;
  const monthlyGrossHuf = Math.round(weeklyGrossHuf * 4.33);
  const monthlyNetHuf = Math.round(monthlyGrossHuf * (1 - taxRate));
  const taxSavedHuf = isUnder25 ? Math.round(monthlyGrossHuf * 0.15) : 0;

  const displayRate = currency === 'HUF' ? hourlyWage.toLocaleString() : (hourlyWage / exchangeRate).toFixed(1);
  const displayMonthlyNet = currency === 'HUF' 
    ? `${monthlyNetHuf.toLocaleString()} Ft` 
    : `€${Math.round(monthlyNetHuf / exchangeRate)}`;
  const displaySaved = currency === 'HUF' 
    ? `${taxSavedHuf.toLocaleString()} Ft` 
    : `€${Math.round(taxSavedHuf / exchangeRate)}`;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0E3D6E] via-[#0b2f54] to-[#08223d] text-white p-6 sm:p-10 shadow-2xl border border-white/10">
      {/* Decorative background glow accents using brand colors */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#E5A812]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#8DB828]/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E5A812] text-slate-950 uppercase tracking-wider">
              <Calculator className="w-3.5 h-3.5" />
              Interactive Tool
            </span>
            <span className="text-xs text-white/70">Updated with latest student tax guidelines</span>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Student Earnings & Wage Calculator
            </h3>
            <p className="mt-2 text-sm sm:text-base text-slate-300">
              Find out your exact monthly net take-home pay with 100% transparent student cooperative tax rates.
            </p>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-xs font-medium text-slate-300">Display Currency:</span>
            <div className="flex gap-1 bg-black/30 p-1 rounded-xl">
              <button
                onClick={() => setCurrency('HUF')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  currency === 'HUF' ? 'bg-[#E5A812] text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
              >
                HUF (Ft)
              </button>
              <button
                onClick={() => setCurrency('EUR')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  currency === 'EUR' ? 'bg-[#E5A812] text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
              >
                EUR (€)
              </button>
            </div>
          </div>

          {/* Slider 1: Hourly Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-300 font-medium">Hourly Wage</span>
              <span className="text-lg font-bold text-[#E5A812]">
                {currency === 'HUF' ? `${hourlyWage.toLocaleString()} Ft / hour` : `€${(hourlyWage / exchangeRate).toFixed(1)} / hour`}
              </span>
            </div>
            <input
              type="range"
              min="2000"
              max="5000"
              step="50"
              value={hourlyWage}
              onChange={(e) => setHourlyWage(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-700/80 rounded-lg appearance-none cursor-pointer accent-[#E5A812]"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Min. Student Wage: 2,000 Ft</span>
              <span>Avg: ~2,800 Ft</span>
              <span>High-Tech: 5,000+ Ft</span>
            </div>
          </div>

          {/* Slider 2: Weekly Hours */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-300 font-medium">Planned Hours per Week</span>
              <span className="text-lg font-bold text-white">
                {weeklyHours} <span className="text-sm font-normal text-slate-300">hours/week</span>
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="40"
              step="1"
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-700/80 rounded-lg appearance-none cursor-pointer accent-[#8DB828]"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Light (5-10 hrs)</span>
              <span>Balanced (20 hrs)</span>
              <span>Full-time / Summer (40 hrs)</span>
            </div>
          </div>

          {/* Under 25 Tax-Free Toggle */}
          <div className="pt-2">
            <label className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition">
              <input
                type="checkbox"
                checked={isUnder25}
                onChange={(e) => setIsUnder25(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-[#8DB828] accent-[#8DB828] cursor-pointer"
              />
              <div className="text-xs">
                <span className="font-semibold text-white block">
                  I am under 25 years old (SZJA tax exemption)
                </span>
                <span className="text-slate-300 mt-0.5 block">
                  Under Hungarian student law, students under 25 receive 100% gross wage into their account without any personal income tax deducted.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Right Output Card */}
        <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/15 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">
                Estimated Net Earnings
              </span>
              <span className="flex items-center gap-1 text-[11px] text-[#8DB828] bg-[#8DB828]/20 px-2.5 py-0.5 rounded-full font-bold">
                <TrendingUp className="w-3 h-3" />
                Guaranteed
              </span>
            </div>

            {/* Big Net Sum */}
            <div className="my-6">
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                {displayMonthlyNet}
              </div>
              <span className="text-xs text-slate-300 font-medium mt-1 block">
                Net monthly take-home into your bank account
              </span>
            </div>

            {/* Breakdown stats */}
            <div className="space-y-3 py-4 border-t border-b border-white/10 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Weekly Hours:</span>
                <span className="font-semibold text-white">{weeklyHours} hrs/week</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Monthly Hours (~4.33 wks):</span>
                <span className="font-semibold text-white">{Math.round(weeklyHours * 4.33)} hours</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Effective Tax Rate:</span>
                <span className="font-semibold text-[#8DB828]">
                  {isUnder25 ? '0% (Tax-Free)' : '15% SZJA'}
                </span>
              </div>
              {isUnder25 && (
                <div className="flex justify-between text-[#E5A812] bg-[#E5A812]/10 p-2 rounded-lg font-medium">
                  <span>Monthly tax saved:</span>
                  <span className="font-bold">+{displaySaved}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 pt-2">
            <button
              onClick={() => onFindJobsWithRate && onFindJobsWithRate(hourlyWage)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold bg-[#E5A812] hover:bg-[#c9930f] text-slate-950 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              <span>Explore Jobs with this Wage</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-center text-slate-400 mt-2">
              Talent processes bi-weekly and monthly payroll directly to student bank accounts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
