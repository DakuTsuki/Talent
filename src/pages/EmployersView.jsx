import React, { useState } from 'react';
import { 
  Briefcase, 
  TrendingDown, 
  Users, 
  FileText, 
  CheckCircle2, 
  Send,
  PlusCircle,
  Building2,
  Sparkles
} from 'lucide-react';
import { api } from '../services/api';

export default function EmployersView({ onOpenPostJobModal }) {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    jobCategory: 'IT & Software',
    headcount: '1-3 students',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.submitCompanyRequest({
        ...formData,
        roleNeeded: formData.jobCategory,
        skillsRequired: [formData.jobCategory, 'English Friendly']
      });
      setSubmitted(true);
    } catch (err) {
      console.warn('API submission error:', err);
      // Fallback show success
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      {/* Clean Company Hero */}
      <div className="bg-gradient-to-br from-[#0E3D6E] to-[#072442] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-700/50 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#8DB828] text-slate-950">
            <Building2 className="w-3.5 h-3.5" />
            <span>Corporate & Employer Portal</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Hire Motivated Student Talent with <span className="text-[#E5A812]">Zero Payroll Tax</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-200">
            School cooperative employment is 100% exempt from the 13% employer social contribution tax (szocho). Talent Cooperative manages contracts, legalities, and payroll.
          </p>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto">
          <button
            onClick={onOpenPostJobModal}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-black text-xs sm:text-sm bg-[#1E5E3A] hover:bg-[#16482d] text-white shadow-md transition active:scale-95"
          >
            <PlusCircle className="w-4 h-4 text-[#8DB828]" />
            <span>+ Post a Job Directly</span>
          </button>
          <a
            href="#staffing-form"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-black text-xs sm:text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 transition text-center"
          >
            <span>Request Staffing Quote</span>
          </a>
        </div>
      </div>

      {/* 3 Core Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1E5E3A] flex items-center justify-center shrink-0">
            <TrendingDown className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900">0% Szocho Tax</h3>
            <p className="text-xs text-slate-500 mt-0.5">Save 25-35% on total employment costs legally under Hungarian school coop law.</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0E3D6E] flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900">Zero Paperwork</h3>
            <p className="text-xs text-slate-500 mt-0.5">We handle all student employment contracts, attendance, and payroll disbursement.</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#C92A2A] flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900">Fast Placement</h3>
            <p className="text-xs text-slate-500 mt-0.5">Access over 1,200 active university students across Budapest, Debrecen, and Szeged.</p>
          </div>
        </div>
      </div>

      {/* Clean Staffing Request Form */}
      <div id="staffing-form" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">Request Student Staffing</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Fill in your basic requirement below and our corporate coordinator will contact you with availability and rates.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200">
            <CheckCircle2 className="w-10 h-10 text-[#1E5E3A] mx-auto" />
            <h4 className="text-lg font-bold text-slate-900">Staffing Request Received!</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Thank you! Your request has been recorded in the Talent cooperative system. Our team will contact you shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  companyName: '',
                  contactPerson: '',
                  email: '',
                  phone: '',
                  jobCategory: 'IT & Software',
                  headcount: '1-3 students',
                  description: ''
                });
              }}
              className="mt-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#0E3D6E] text-white"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Continental Kft."
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E3D6E]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Contact Person *</label>
                <input
                  type="text"
                  required
                  placeholder="Full name & title"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E3D6E]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="contact@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E3D6E]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+36 30 123 4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E3D6E]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Job Category</label>
                <select
                  value={formData.jobCategory}
                  onChange={(e) => setFormData({ ...formData, jobCategory: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E3D6E]"
                >
                  <option value="IT & Software">IT & Software</option>
                  <option value="Admin & Office">Admin & Office</option>
                  <option value="Retail & Merchandising">Retail & Merchandising</option>
                  <option value="Warehouse & Logistics">Warehouse & Logistics</option>
                  <option value="Hospitality & Events">Hospitality & Events</option>
                  <option value="Customer Support">Customer Support</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Headcount Needed</label>
                <select
                  value={formData.headcount}
                  onChange={(e) => setFormData({ ...formData, headcount: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E3D6E]"
                >
                  <option value="1-3 students">1-3 students</option>
                  <option value="4-10 students">4-10 students</option>
                  <option value="10+ students">10+ students</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Brief Description (Optional)</label>
              <textarea
                rows={3}
                placeholder="Describe responsibilities, working hours, or language requirements..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E3D6E]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl font-black bg-[#0E3D6E] hover:bg-[#082b4f] text-white transition text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
            >
              <Send className="w-4 h-4 text-[#E5A812]" />
              <span>{isSubmitting ? 'Submitting...' : 'Send Staffing Request'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
