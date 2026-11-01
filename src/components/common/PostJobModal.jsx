import React, { useState } from 'react';
import { X, Briefcase, PlusCircle, CheckCircle2, DollarSign } from 'lucide-react';

export default function PostJobModal({ isOpen, onClose, onJobCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    category: 'IT & Software',
    location: 'Budapest',
    hourlyRateHuf: 3000,
    schedule: 'Flexible (20 hrs/wk)',
    description: '',
    isRemote: false,
    isEnglishFriendly: true,
    isUnder18: false
  });
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = {
      id: `job-${Date.now()}`,
      ...formData,
      hourlyRateEur: (formData.hourlyRateHuf / 392).toFixed(1),
      companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop',
      shifts: ['Flexible', 'Morning'],
      featured: true,
      urgent: true,
      postedAt: 'Just now',
      applicantsCount: 0,
      requirements: ['Enrolled university student status', 'Good communication skills'],
      benefits: ['Flexible student hours', 'Competitive hourly wage']
    };

    if (onJobCreated) {
      onJobCreated(newJob);
    }
    setIsDone(true);
    setTimeout(() => {
      setIsDone(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {isDone ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-14 h-14 text-[#1E5E3A] mx-auto" />
            <h3 className="text-xl font-black text-slate-900">Job Posted Successfully!</h3>
            <p className="text-xs text-slate-500">Your job is now live on the Talent platform for students to apply.</p>
          </div>
        ) : (
          <div className="p-6 sm:p-8 space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#1E5E3A] uppercase tracking-wider mb-1">
                <Briefcase className="w-4 h-4" />
                <span>Employer Portal</span>
              </div>
              <h3 className="text-xl font-black text-slate-900">Post a Student Job</h3>
              <p className="text-xs text-slate-500">
                Reach thousands of verified university and high school candidates.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Junior Graphic Designer / Barista"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E3D6E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E3D6E]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">City / Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="Budapest, District 5"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E3D6E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Hourly Wage (HUF) *</label>
                  <input
                    type="number"
                    min="2000"
                    step="50"
                    required
                    value={formData.hourlyRateHuf}
                    onChange={(e) => setFormData({ ...formData, hourlyRateHuf: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E3D6E]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E3D6E]"
                  >
                    <option value="IT & Software">IT & Software</option>
                    <option value="Admin & Office">Admin & Office</option>
                    <option value="Retail & Sales">Retail & Sales</option>
                    <option value="Hospitality & Food">Hospitality & Food</option>
                    <option value="Warehouse & Logistics">Warehouse & Logistics</option>
                    <option value="Customer Support">Customer Support</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Role Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe tasks, required student hours, and team culture..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E3D6E]"
                />
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-4 pt-1 text-xs">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.isRemote}
                    onChange={(e) => setFormData({ ...formData, isRemote: e.target.checked })}
                    className="w-4 h-4 rounded text-[#0E3D6E] accent-[#0E3D6E]"
                  />
                  <span>Remote / Home Office</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.isEnglishFriendly}
                    onChange={(e) => setFormData({ ...formData, isEnglishFriendly: e.target.checked })}
                    className="w-4 h-4 rounded text-[#E5A812] accent-[#E5A812]"
                  />
                  <span>English Friendly</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.isUnder18}
                    onChange={(e) => setFormData({ ...formData, isUnder18: e.target.checked })}
                    className="w-4 h-4 rounded text-[#8DB828] accent-[#8DB828]"
                  />
                  <span>Under 18 Allowed</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold bg-[#1E5E3A] hover:bg-[#16482d] text-white text-sm transition shadow-md flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publish Student Opportunity</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
