import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/home/Hero';
import JobCard from './components/jobs/JobCard';
import JobFilter from './components/jobs/JobFilter';
import StudentWageCalculator from './components/calculator/StudentWageCalculator';
import JobDetailModal from './components/jobs/JobDetailModal';
import QuickApplyModal from './components/jobs/QuickApplyModal';
import EmployersView from './pages/EmployersView';
import StudentDashboard from './pages/StudentDashboard';
import AdminPage from './pages/AdminPage';
import AuthModal from './components/common/AuthModal';
import PostJobModal from './components/common/PostJobModal';
import GoogleTranslateBanner from './components/common/GoogleTranslateBanner';
import { MOCK_JOBS } from './data/mockJobs';
import { Search, Sparkles, X, Calculator } from 'lucide-react';

export default function App() {
  const [jobs, setJobs] = useState(MOCK_JOBS);
  const [savedJobIds, setSavedJobIds] = useState(new Set());
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [activeTab, setActiveTab] = useState('students'); // 'students' | 'employers' | 'dashboard'
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  // Path routing: detects (domain)/admin
  const [currentPath, setCurrentPath] = useState(() => {
    return window.location.pathname.toLowerCase();
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname.toLowerCase());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path.toLowerCase());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Authenticated Student User
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('talent_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Modals
  const [selectedJobForModal, setSelectedJobForModal] = useState(null);
  const [selectedJobForApply, setSelectedJobForApply] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);

  const handleLoginSuccess = (userProfile) => {
    setCurrentUser(userProfile);
    localStorage.setItem('talent_auth_user', JSON.stringify(userProfile));
    setActiveTab('dashboard');
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    localStorage.removeItem('talent_auth_user');
    setActiveTab('students');
  };

  // Filters State
  const [filters, setFilters] = useState({
    keyword: '',
    category: 'all',
    city: 'All Cities',
    shifts: [],
    minWage: 2000,
    englishOnly: false,
    under18: false,
    remoteOnly: false
  });

  const handleToggleSave = (jobId) => {
    setSavedJobIds((prev) => {
      const next = new Set(prev);
      if (next.has(jobId)) next.delete(jobId);
      else next.add(jobId);
      return next;
    });
  };

  const handleResetFilters = () => {
    setFilters({
      keyword: '',
      category: 'all',
      city: 'All Cities',
      shifts: [],
      minWage: 2000,
      englishOnly: false,
      under18: false,
      remoteOnly: false
    });
  };

  const handleHeroSearch = (searchParams) => {
    if (searchParams.quickFilter) {
      if (searchParams.quickFilter === 'remote') {
        setFilters(f => ({ ...f, remoteOnly: true }));
      } else if (searchParams.quickFilter === 'english') {
        setFilters(f => ({ ...f, englishOnly: true }));
      } else if (searchParams.quickFilter === 'under18') {
        setFilters(f => ({ ...f, under18: true }));
      } else if (searchParams.quickFilter === 'highPay') {
        setFilters(f => ({ ...f, minWage: 2800 }));
      }
    } else {
      setFilters(f => ({
        ...f,
        keyword: searchParams.keyword || '',
        city: searchParams.city || 'All Cities',
        category: searchParams.category || 'all'
      }));
    }
    setActiveTab('students');
    const el = document.getElementById('jobs-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFindJobsWithRate = (targetWage) => {
    setFilters(f => ({ ...f, minWage: targetWage }));
    setIsCalculatorOpen(false);
    const el = document.getElementById('jobs-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Filtered Jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (filters.keyword.trim()) {
        const q = filters.keyword.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(q);
        const matchesCompany = job.company.toLowerCase().includes(q);
        const matchesDesc = job.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCompany && !matchesDesc) return false;
      }

      if (filters.category !== 'all' && job.category !== filters.category) {
        return false;
      }

      if (filters.city !== 'All Cities') {
        if (!job.location.toLowerCase().includes(filters.city.toLowerCase())) return false;
      }

      if (job.hourlyRateHuf < filters.minWage) {
        return false;
      }

      if (filters.englishOnly && !job.isEnglishFriendly) {
        return false;
      }

      if (filters.under18 && !job.isUnder18) {
        return false;
      }

      if (filters.remoteOnly && !job.isRemote) {
        return false;
      }

      if (filters.shifts.length > 0) {
        const hasShift = filters.shifts.some(s => job.shifts.includes(s));
        if (!hasShift) return false;
      }

      return true;
    });
  }, [jobs, filters]);

  const handleJobCreated = (newJob) => {
    setJobs([newJob, ...jobs]);
  };

  const handleApplicationSuccess = (applicationData) => {
    setAppliedJobs([applicationData, ...appliedJobs]);
  };

  // 1. If path is /admin or /admin/, render the dedicated Staff Coordination Portal
  if (currentPath === '/admin' || currentPath === '/admin/') {
    return <AdminPage onNavigateHome={() => navigateTo('/')} />;
  }

  // 2. Default Public Portal (Students & Companies)
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Multilingual / Google Translate Banner */}
      <GoogleTranslateBanner 
        currentLanguage={currentLanguage} 
        onLanguageChange={setCurrentLanguage} 
      />

      {/* Main Clean Navbar with Student & Company buttons */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenPostJobModal={() => setIsPostJobModalOpen(true)}
        isCalculatorOpen={isCalculatorOpen}
        onToggleCalculator={() => setIsCalculatorOpen(!isCalculatorOpen)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'employers' ? (
          /* B2B Company View */
          <EmployersView onOpenPostJobModal={() => setIsPostJobModalOpen(true)} />
        ) : activeTab === 'dashboard' ? (
          /* Student Dashboard */
          <StudentDashboard 
            currentUser={currentUser}
            onSignOut={handleSignOut}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onSelectJob={setSelectedJobForModal} 
            appliedJobs={appliedJobs} 
          />
        ) : (
          /* Clean, Direct Student Jobs Board (WHC Style) */
          <>
            {/* WHC-Style Minimal Hero Search */}
            <Hero onSearch={handleHeroSearch} />

            {/* Optional Collapsible Wage Calculator */}
            {isCalculatorOpen && (
              <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-top-4">
                <div className="flex justify-between items-center mb-2 px-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Calculator className="w-3.5 h-3.5 text-[#E5A812]" />
                    Student Earnings Calculator
                  </span>
                  <button
                    onClick={() => setIsCalculatorOpen(false)}
                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 transition"
                    title="Close calculator"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <StudentWageCalculator onFindJobsWithRate={handleFindJobsWithRate} />
              </section>
            )}

            {/* Live Student Jobs Section */}
            <section id="jobs-section" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-6 gap-3">
                <div>
                  <span className="text-xs font-bold text-[#0E3D6E] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#E5A812]" />
                    Active Positions
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
                    Student Jobs & Internships
                  </h2>
                </div>
                <div className="text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs">
                  Showing <strong className="text-slate-900">{filteredJobs.length}</strong> vacancies
                </div>
              </div>

              {/* Grid: Left Filters, Right Job Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-4 sticky top-24">
                  <JobFilter
                    filters={filters}
                    setFilters={setFilters}
                    onReset={handleResetFilters}
                  />
                </div>

                <div className="lg:col-span-8 space-y-4">
                  {filteredJobs.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                        <Search className="w-6 h-6" />
                      </div>
                      <h4 className="text-base font-bold text-slate-900">No jobs match your filter</h4>
                      <p className="text-xs text-slate-500 max-w-xs mx-auto">
                        Try lowering minimum wage or clearing category filters to view more positions.
                      </p>
                      <button
                        onClick={handleResetFilters}
                        className="mt-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#0E3D6E] text-white"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredJobs.map((job) => (
                        <JobCard
                          key={job.id}
                          job={job}
                          onSelectJob={setSelectedJobForModal}
                          onQuickApply={setSelectedJobForApply}
                          isSaved={savedJobIds.has(job.id)}
                          onToggleSave={handleToggleSave}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Clean Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Modals */}
      <JobDetailModal
        job={selectedJobForModal}
        onClose={() => setSelectedJobForModal(null)}
        onApply={(job) => {
          setSelectedJobForModal(null);
          setSelectedJobForApply(job);
        }}
      />

      <QuickApplyModal
        job={selectedJobForApply}
        onClose={() => setSelectedJobForApply(null)}
        onSubmitSuccess={handleApplicationSuccess}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <PostJobModal
        isOpen={isPostJobModalOpen}
        onClose={() => setIsPostJobModalOpen(false)}
        onJobCreated={handleJobCreated}
      />
    </div>
  );
}
