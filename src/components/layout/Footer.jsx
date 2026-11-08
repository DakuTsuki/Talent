import React from 'react';
import TalentLogo from '../common/TalentLogo';
import { Mail, Phone, MapPin, Send, Lock } from 'lucide-react';

export default function Footer({ setActiveTab, onNavigateAdmin }) {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/5 p-3 rounded-2xl inline-block">
              <TalentLogo size="default" className="text-white" />
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Talent is the premier digital student cooperative platform in Central Europe. Connecting university and secondary students with flexible, tax-exempt employment opportunities at leading enterprises.
            </p>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#E5A812]" />
                <span>Budapest, Hungary • Reg. No. 01-09-982451</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#8DB828]" />
                <span>+36 1 800 8253 (Mon–Fri: 9:00 - 17:00)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0E3D6E]" />
                <span>hello@talent-jobs.com</span>
              </div>
            </div>
          </div>

          {/* Col 2: For Students */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              For Students
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('students')} className="hover:text-white transition">
                  Browse Student Jobs
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-white transition">
                  Student Portal & Applications
                </button>
              </li>
              <li>
                <span className="text-slate-500">0% Tax Exemption Under 25</span>
              </li>
              <li>
                <span className="text-slate-500">International Students Hub</span>
              </li>
            </ul>
          </div>

          {/* Col 3: For Employers */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              For Employers
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('employers')} className="hover:text-white transition">
                  Hire Student Staff
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('employers')} className="hover:text-white transition">
                  Tax Advantages (0% Szocho)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('employers')} className="hover:text-white transition">
                  Seasonal & Event Staffing
                </button>
              </li>
              <li>
                <span className="text-slate-500">Corporate Internship Programs</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter / Job Alerts */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Student Job Alerts
            </h4>
            <p className="text-xs text-slate-400">
              Get notified first when high-paying student gigs launch in your city.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to student job alerts!'); }} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Your student email..."
                className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#E5A812]"
              />
              <button
                type="submit"
                className="w-full py-2 px-3 rounded-xl bg-[#E5A812] hover:bg-[#c9930f] text-slate-950 font-bold text-xs transition flex items-center justify-center gap-1.5"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} TALENT Iskolaszövetkezet (School Cooperative). All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy (GDPR)</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <a 
              href="/admin"
              onClick={(e) => {
                e.preventDefault();
                onNavigateAdmin();
              }}
              className="text-slate-500 hover:text-[#E5A812] transition flex items-center gap-1 font-medium"
              title="Staff coordination portal (/admin)"
            >
              <Lock className="w-3 h-3" />
              <span>Staff & Coordinator Access</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
