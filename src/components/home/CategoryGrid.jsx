import React from 'react';
import { 
  Code, 
  Briefcase, 
  ShoppingBag, 
  Coffee, 
  Box, 
  Bike, 
  Headphones, 
  Flame, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { CATEGORIES } from '../../data/mockJobs';

export default function CategoryGrid({ onSelectCategory, selectedCategory }) {
  const iconMap = {
    Code: Code,
    Briefcase: Briefcase,
    ShoppingBag: ShoppingBag,
    Coffee: Coffee,
    Box: Box,
    Bike: Bike,
    Headphones: Headphones,
    Flame: Flame,
    Sparkles: Sparkles
  };

  // Skip "all" for the highlighted grid, show the remaining categories
  const gridCategories = CATEGORIES.filter(c => c.id !== 'all');

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-[#0E3D6E] uppercase tracking-wider">
              Explore by Industry
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Popular Student Job Sectors
            </h2>
          </div>
          <button 
            onClick={() => onSelectCategory('all')}
            className="flex items-center gap-1.5 text-xs font-bold text-[#0E3D6E] hover:text-[#0a2f55] transition"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {gridCategories.map((cat) => {
            const Icon = iconMap[cat.icon] || Briefcase;
            const isSelected = selectedCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group cursor-pointer p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#0E3D6E] bg-blue-50/50 shadow-md ring-2 ring-[#0E3D6E]/20'
                    : 'border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-[#0E3D6E]/40 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-[#0E3D6E] group-hover:scale-110 transition shadow-2xs">
                    <Icon className="w-5 h-5 text-[#0E3D6E]" />
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-200/70 text-slate-700">
                    {cat.count} jobs
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0E3D6E] transition">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">
                    Flexible hours & high rates
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
