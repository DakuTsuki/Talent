import React, { useState } from 'react';
import { 
  Briefcase, 
  TrendingDown, 
  Users, 
  ShieldCheck, 
  Zap, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  Send,
  Building,
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
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.submitCompanyRequest({
        ...formData,
        roleNeeded: formData.jobCategory,
        skillsRequired: [formData.jobCategory, 'English Friendly']
      });
    } catch (err) {
      console.warn('API submission error:', err);
    }
    setSubmitted(true);
  };

  const advantages = [
    {
      icon: TrendingDown,
      color: 'text-[#1E5E3A]',
      bg: 'bg-emerald-50',
      title: 'Zero Employer Payroll Taxes',
      desc: 'No 13% social contribution tax (szocho) and no vocational training contribution. Save up to 25-35% on total staff costs.'
    },
    {
      icon: Zap,
      color: 'text-[#E5A812]',
      bg: 'bg-amber-50',
      title: '100% Flexible Capacity',
      desc: 'Scale your team up or down based on seasonal peaks, project deadlines, or unexpected customer demand with zero severance risk.'
    },
    {
      icon: FileText,
      color: 'text-[#0E3D6E]',
      bg: 'bg-blue-50',
      title: 'Complete Paperless Administration',
      desc: 'Talent Cooperative handles all student contracts, attendance sheets, medical checks, and payroll disbursement.'
    },
    {
      icon: Users,
      color: 'text-[#C92A2A]',
      bg: 'bg-red-50',
      title: 'Pipeline to Future Graduates',
      desc: 'Train university students during their studies and smoothly transition top performers into full-time roles upon graduation.'
    }
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0E3D6E] via-[#0b3158] to-[#071f38] text-white py-16 sm:py-24 rounded-3xl mx-4 sm:mx-8 px-6 sm:px-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#8DB828]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-96 h-96 bg-[#E5A812]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#8DB828] text-slate-950 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            B2B Student Workforce Solutions
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Hire Motivated Student Talent with <br />
            <span className="text-[#E5A812]">Zero Administrative Headache.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto">
            Leverage Hungary's most advantageous labor framework. Tap into 1,200+ top university students for IT, retail, customer care, and logistics with instant deployment.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                document.getElementById('b2b-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-2xl font-bold bg-[#E5A812] hover:bg-[#c9930f] text-slate-950 shadow-lg hover:shadow-xl transition flex items-center gap-2"
            >
              <span>Request Student Staff</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenPostJobModal}
              className="px-6 py-3.5 rounded-2xl font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition"
            >
              Post a Position Direct
            </button>
          </div>
        </div>
      </section>

      {/* 4 Core Employer Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Why Hundreds of Enterprises Partner with Talent
          </h2>
          <p className="text-sm text-slate-600">
            School cooperative staffing offers legal, financial, and operational benefits unmatched by standard employment agencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition space-y-3"
              >
                <div className={`w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Fast Quote / Request Form */}
      <section id="b2b-form" className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-2xl font-black text-slate-900">Get a Fast Student Staffing Quote</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Tell us your staffing requirements. Our corporate account manager will reply within 2 business hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200">
              <CheckCircle2 className="w-12 h-12 text-[#1E5E3A] mx-auto" />
              <h4 className="text-xl font-bold text-slate-900">Quote Request Received!</h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                Thank you! Our dedicated enterprise consultant is preparing a personalized rate card and student availability estimate.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Logistics Kft."
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
                  <label className="text-xs font-bold text-slate-700 block mb-1">Corporate Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="hr@company.com"
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
                    placeholder="+36 1 234 5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E3D6E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Category Needed</label>
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
                  <label className="text-xs font-bold text-slate-700 block mb-1">Number of Students Needed</label>
                  <select
                    value={formData.headcount}
                    onChange={(e) => setFormData({ ...formData, headcount: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E3D6E]"
                  >
                    <option value="1-3 students">1-3 students</option>
                    <option value="4-10 students">4-10 students</option>
                    <option value="10-30 students">10-30 students (Seasonal project)</option>
                    <option value="30+ students">30+ students (Enterprise volume)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Brief Description of the Task</label>
                <textarea
                  rows={3}
                  placeholder="e.g. We require 4 university students for warehouse order picking during night shifts in Győr..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E3D6E]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl font-bold bg-[#0E3D6E] hover:bg-[#082b4f] text-white transition text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-[#E5A812]" />
                <span>Submit Staffing Request</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
