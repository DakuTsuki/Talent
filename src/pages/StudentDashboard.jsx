import React, { useState } from 'react';
import { 
  User, 
  FileCheck2, 
  Clock, 
  Calendar, 
  Bookmark, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  ArrowUpRight,
  TrendingUp,
  Download,
  CreditCard
} from 'lucide-react';
import { MOCK_JOBS } from '../data/mockJobs';

export default function StudentDashboard({ onSelectJob, appliedJobs = [] }) {
  const [activeTab, setActiveTab] = useState('applications');

  // Default mock applications if none submitted yet
  const defaultApplications = [
    {
      id: 'app-1',
      jobTitle: 'Junior Web Developer (React / Frontend)',
      company: 'TechFlow Solutions',
      appliedDate: '28 Oct 2026',
      status: 'Interview Scheduled',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      hourlyRate: '3,450 Ft / hr',
      nextStep: 'Online technical interview on Monday, 14:00'
    },
    {
      id: 'app-2',
      jobTitle: 'English Customer Support Specialist',
      company: 'GlobalConnect Services',
      appliedDate: '24 Oct 2026',
      status: 'Application Under Review',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-200',
      hourlyRate: '2,850 Ft / hr',
      nextStep: 'Talent cooperative coordinator reviewing CV'
    }
  ];

  const applications = appliedJobs.length > 0 
    ? appliedJobs.map((item, idx) => ({
        id: `app-dyn-${idx}`,
        jobTitle: item.job.title,
        company: item.job.company,
        appliedDate: 'Today',
        status: 'Application Received',
        statusColor: 'bg-blue-100 text-blue-800 border-blue-200',
        hourlyRate: `${item.job.hourlyRateHuf.toLocaleString()} Ft / hr`,
        nextStep: 'Document verification in progress'
      })).concat(defaultApplications)
    : defaultApplications;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Student Welcome Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0E3D6E] to-[#1E5E3A] text-white flex items-center justify-center font-black text-2xl shadow-md">
            AK
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">Alex Kovács</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#8DB828]/20 text-[#3f5710] border border-[#8DB828]/30">
                Verified Student
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Budapest University of Technology & Economics (BME) • Computer Engineering
            </p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <span className="text-[#1E5E3A] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 0% SZJA Exemption Active (Under 25)
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600">Talent Coop ID: #TL-84920</span>
            </div>
          </div>
        </div>

        {/* Quick Earnings preview */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center gap-6 self-stretch md:self-auto justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              October Payout
            </span>
            <div className="text-xl font-black text-[#0E3D6E]">184,500 Ft</div>
            <span className="text-[11px] text-[#1E5E3A] font-semibold">Processed on Nov 10</span>
          </div>
          <button className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex border-b border-slate-200 gap-6 text-sm font-bold">
        <button
          onClick={() => setActiveTab('applications')}
          className={`pb-3 transition relative ${
            activeTab === 'applications'
              ? 'text-[#0E3D6E] border-b-2 border-[#0E3D6E]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          My Applications ({applications.length})
        </button>
        <button
          onClick={() => setActiveTab('documents')}
          className={`pb-3 transition relative ${
            activeTab === 'documents'
              ? 'text-[#0E3D6E] border-b-2 border-[#0E3D6E]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Digital Contracts & Documents (3/3 Complete)
        </button>
        <button
          onClick={() => setActiveTab('shifts')}
          className={`pb-3 transition relative ${
            activeTab === 'shifts'
              ? 'text-[#0E3D6E] border-b-2 border-[#0E3D6E]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Shift Schedule & Timesheet
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">{app.company}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-semibold text-[#1E5E3A]">{app.hourlyRate}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{app.jobTitle}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    Next: <strong className="text-slate-700">{app.nextStep}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${app.statusColor}`}>
                    {app.status}
                  </span>
                  <button className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition">
                    View Thread
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900">Paperless Cooperative Membership Documents</h3>
            <p className="text-xs text-slate-500">
              Under Hungarian law, electronic verification allows you to sign and start work within 15 minutes.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { title: 'Talent School Cooperative Framework Agreement', date: 'Signed on 15 Sept 2026', status: 'Active & Verified' },
              { title: 'Student Status Certificate (Autumn Semester 2026/2027)', date: 'Uploaded from Neptun', status: 'Verified' },
              { title: 'Tax & Bank Account Declaration (SZJA exemption statement)', date: 'OTP Bank IBAN verified', status: 'Approved' },
            ].map((doc, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                <div className="flex items-center gap-3">
                  <FileCheck2 className="w-5 h-5 text-[#1E5E3A]" />
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800">{doc.title}</div>
                    <div className="text-[11px] text-slate-500">{doc.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#1E5E3A] bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    {doc.status}
                  </span>
                  <button className="p-2 text-slate-500 hover:text-slate-800">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'shifts' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900">Upcoming Shifts & Timesheet</h3>
          <p className="text-xs text-slate-500">Log your worked hours here for instant bi-weekly approval.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl border border-blue-100 bg-blue-50/50 space-y-2">
              <span className="text-xs font-bold text-blue-700 uppercase">Upcoming Shift</span>
              <div className="text-sm font-bold text-slate-900">Frontend Component Build @ TechFlow</div>
              <div className="text-xs text-slate-600">Tuesday, 09:00 - 13:00 (4 hours)</div>
              <div className="text-xs font-semibold text-[#0E3D6E]">Location: Remote / Home Office</div>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Upcoming Shift</span>
              <div className="text-sm font-bold text-slate-900">Sprint Review & Mentorship @ TechFlow</div>
              <div className="text-xs text-slate-600">Thursday, 14:00 - 18:00 (4 hours)</div>
              <div className="text-xs font-semibold text-slate-700">Location: Budapest, District 11 Office</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
