import React, { useState } from 'react';
import { X, Upload, CheckCircle2, GraduationCap, Calendar, Phone, Mail, User, Sparkles } from 'lucide-react';

export default function QuickApplyModal({ job, onClose, onSubmitSuccess }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    university: '',
    studentIdNumber: '',
    isUnder25: true,
    availableDays: ['Weekdays', 'Weekends'],
    cvFileName: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!job) return null;

  const handleDayToggle = (day) => {
    if (formData.availableDays.includes(day)) {
      setFormData({
        ...formData,
        availableDays: formData.availableDays.filter(d => d !== day)
      });
    } else {
      setFormData({
        ...formData,
        availableDays: [...formData.availableDays, day]
      });
    }
  };

  const handleFakeFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, cvFileName: file.name });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      if (onSubmitSuccess) {
        onSubmitSuccess({ job, ...formData });
      }
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0E3D6E] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#E5A812] uppercase tracking-wider mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>Fast Student Application</span>
          </div>
          <h3 className="text-xl font-bold text-white leading-tight">
            Apply for {job.title}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            {job.company} • {job.hourlyRateHuf.toLocaleString()} Ft / hour
          </p>
        </div>

        {/* Success State */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#1E5E3A] flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-black text-slate-900">Application Submitted!</h4>
            <p className="text-sm text-slate-600 max-w-xs mx-auto leading-relaxed">
              We have forwarded your student profile to <strong className="text-slate-900">{job.company}</strong>. Our Talent coordinator will reach out to you within 24 hours.
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-left space-y-1">
              <div className="font-bold text-slate-800">What happens next?</div>
              <div>1. Electronic student contract verification</div>
              <div>2. Employer schedule confirmation via SMS/WhatsApp</div>
              <div>3. First shift briefing & payroll setup</div>
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl font-bold bg-[#0E3D6E] text-white hover:bg-[#0a2f55] transition text-sm"
            >
              Done & Return to Jobs
            </button>
          </div>
        ) : (
          /* Application Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {step === 1 ? (
              <div className="space-y-4">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Step 1 of 2: Student Information
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Full Legal Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Kovács"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E3D6E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Email Address *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        placeholder="alex@student.uni.hu"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E3D6E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        placeholder="+36 30 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E3D6E]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">University / High School *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. BME, Corvinus, ELTE"
                      value={formData.university}
                      onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E3D6E]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Student ID / Card Number</label>
                    <input
                      type="text"
                      placeholder="e.g. 728491823"
                      value={formData.studentIdNumber}
                      onChange={(e) => setFormData({ ...formData, studentIdNumber: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E3D6E]"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={formData.isUnder25}
                    onChange={(e) => setFormData({ ...formData, isUnder25: e.target.checked })}
                    className="w-4 h-4 rounded text-[#0E3D6E] accent-[#0E3D6E]"
                  />
                  <span className="font-medium">I am under 25 years old (SZJA tax exemption)</span>
                </label>

                <button
                  type="button"
                  onClick={() => {
                    if (formData.fullName && formData.email && formData.phone) {
                      setStep(2);
                    } else {
                      alert('Please fill in required fields.');
                    }
                  }}
                  className="w-full py-2.5 rounded-xl font-bold bg-[#0E3D6E] text-white hover:bg-[#0a2f55] transition text-sm shadow-sm"
                >
                  Continue to Availability & Resume →
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Step 2 of 2: Schedule & Resume
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    When are you available to work?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Morning Shifts', 'Afternoon Shifts', 'Evenings', 'Weekends Only', 'Flexible Anytime'].map((time) => {
                      const isChecked = formData.availableDays.includes(time);
                      return (
                        <button
                          type="button"
                          key={time}
                          onClick={() => handleDayToggle(time)}
                          className={`p-2 rounded-xl text-xs font-semibold border transition text-left ${
                            isChecked
                              ? 'bg-blue-50 border-[#0E3D6E] text-[#0E3D6E]'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Upload CV */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Upload Resume / CV (Optional)
                  </label>
                  <label className="border-2 border-dashed border-slate-200 hover:border-[#0E3D6E] rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer bg-slate-50 transition">
                    <Upload className="w-5 h-5 text-slate-400 mb-1" />
                    <span className="text-xs font-semibold text-slate-700">
                      {formData.cvFileName || 'Click to upload PDF or DOCX'}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">Max size: 10MB</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFakeFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Short message */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Note for the Employer (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell them why you'd be great for this student role..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E3D6E]"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 py-2.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 text-xs transition"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-2/3 py-2.5 rounded-xl font-bold bg-[#1E5E3A] hover:bg-[#16482d] text-white text-xs transition shadow-sm flex items-center justify-center gap-1.5"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Student Application'}
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
