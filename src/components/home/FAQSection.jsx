import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Who is legally eligible to work through Talent Student Cooperative?',
      a: 'Any student aged 16 or older who possesses an active full-time student status (nappali tagozatos hallgatói jogviszony) at a secondary school, college, or university in Hungary. Students aged 15 can also work during school holidays with parental consent. You can work until the age of 25 with full tax benefits.'
    },
    {
      q: 'How does the Under-25 Tax Exemption (SZJA-mentesség) work?',
      a: 'In Hungary, young individuals under 25 are exempt from paying the 15% Personal Income Tax (SZJA). Furthermore, student cooperative members are exempt from social contribution taxes and pension deductions. Therefore, your Gross Hourly Wage is essentially your Net Take-Home Wage!'
    },
    {
      q: 'Can international students work in Hungary via Talent?',
      a: 'Yes, absolutely! International students holding a valid Hungarian Residence Permit for the Purpose of Study can legally work up to 30 hours per week during academic semesters, and full-time (up to 66 working days) during university breaks. Talent provides all contracts and onboarding in English.'
    },
    {
      q: 'When and how do I get paid for my shifts?',
      a: 'Payments are transferred directly to your bank account twice a month or monthly (depending on your company placement). You will receive an electronic payslip showing exact hours worked, hourly rate, and total gross/net amount.'
    },
    {
      q: 'Can I choose my own working schedule?',
      a: 'Yes. Most positions allow flexible scheduling. You can coordinate your shifts week by week to make sure your lectures, lab seminars, and exam periods come first.'
    },
    {
      q: 'What documents are required to start working?',
      a: 'You only need: 1) Valid Student ID (Diákigazolvány) or official active student certificate from Neptun, 2) Tax ID (Adóazonosító jel), 3) Identity card or passport, and 4) Your Hungarian or SEPA bank account IBAN.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold text-[#0E3D6E] uppercase tracking-wider">
            Clear & Transparent
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Frequently Asked Questions & Labor Law
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Everything you need to know about working legally through a school cooperative in Hungary.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-50 transition font-bold text-sm sm:text-base text-slate-900"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#0E3D6E] shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#0E3D6E]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="p-5 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
