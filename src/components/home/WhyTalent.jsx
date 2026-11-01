import React from 'react';
import { ShieldCheck, Zap, HeartHandshake, Award, CheckCircle, XCircle } from 'lucide-react';

export default function WhyTalent() {
  const comparison = [
    {
      feature: 'Contract Signing & Administration',
      legacy: 'Physical office visits, queuing for paper signatures',
      talent: '100% online in 3 minutes via smartphone'
    },
    {
      feature: 'Tax Deductions (Under 25)',
      legacy: 'Delayed reimbursements and complex tax cards',
      talent: 'Instant 0% SZJA tax exemption directly on your payslip'
    },
    {
      feature: 'Schedule Management',
      legacy: 'Rigid fixed shifts with penalties for exams',
      talent: 'Flexible shift swapping and guaranteed exam leave'
    },
    {
      feature: 'Payment Speed',
      legacy: 'Once a month on the 15th with paperwork delays',
      talent: 'Bi-weekly and rapid direct bank account transfers'
    },
    {
      feature: 'Language & Accessibility',
      legacy: 'Hungarian-only portal and documentation',
      talent: 'Full English interface + dedicated international student team'
    }
  ];

  return (
    <section className="py-16 bg-slate-50 border-t border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <span className="text-xs font-bold text-[#1E5E3A] uppercase tracking-wider">
            Why Talent Cooperative
          </span>
          <h2 className="text-3xl font-black text-slate-900">
            Reimagining Student Work for the Digital Generation
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Old school cooperatives belong in the past. We built Talent from the ground up to give students and modern companies freedom, speed, and fairness.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg">
          <div className="grid grid-cols-12 bg-[#0E3D6E] text-white p-4 sm:p-5 text-xs sm:text-sm font-bold">
            <div className="col-span-4">Feature</div>
            <div className="col-span-4 text-slate-300">Traditional Cooperatives</div>
            <div className="col-span-4 text-[#E5A812] font-black flex items-center gap-1.5">
              <span>TALENT Platform</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5A812]" />
            </div>
          </div>

          <div className="divide-y divide-slate-100 text-xs sm:text-sm">
            {comparison.map((row, idx) => (
              <div key={idx} className="grid grid-cols-12 p-4 sm:p-5 items-center gap-2">
                <div className="col-span-4 font-bold text-slate-800">
                  {row.feature}
                </div>
                <div className="col-span-4 text-slate-500 flex items-start gap-1.5 text-xs">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{row.legacy}</span>
                </div>
                <div className="col-span-4 text-[#1E5E3A] font-semibold flex items-start gap-1.5 text-xs">
                  <CheckCircle className="w-4 h-4 text-[#1E5E3A] shrink-0 mt-0.5" />
                  <span>{row.talent}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
