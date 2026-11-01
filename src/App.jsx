import React, { useState, useMemo } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/home/Hero';
import CategoryGrid from './components/home/CategoryGrid';
import WhyTalent from './components/home/WhyTalent';
import FAQSection from './components/home/FAQSection';
import JobCard from './components/jobs/JobCard';
import JobFilter from './components/jobs/JobFilter';
import StudentWageCalculator from './components/calculator/StudentWageCalculator';
import JobDetailModal from './components/jobs/JobDetailModal';
import QuickApplyModal from './components/jobs/QuickApplyModal';
import EmployersView from './pages/EmployersView';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AuthModal from './components/common/AuthModal';
import AdminAuthModal from './components/common/AdminAuthModal';
import PostJobModal from './components/common/PostJobModal';
import GoogleTranslateBanner from './components/common/GoogleTranslateBanner';
import { MOCK_JOBS } from './data/mockJobs';
import { Search, Sparkles, Filter, Briefcase, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [jobs, setJobs] = useState(MOCK_JOBS);
  const [savedJobIds, setSavedJobIds] = useState(new Set());
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [activeTab, setActiveTab] = useState('students'); // 'students' | 'jobs' | 'calculator' | 'how-it-works' | 'employers' | 'dashboard' | 'faq'
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Authenticated Student User
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('talent_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Admin Security State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem('talent_admin_auth') === 'true';
  });
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState(false);

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

  const handleAdminAuthenticated = () => {
    setIsAdminAuthenticated(true);
    sessionStorage.setItem('talent_admin_auth', 'true');
    setActiveTab('admin');
  };

  const handleExitAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('talent_admin_auth');
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
        setFilters(f => ({ ...f, minWage: 3000 }));
      }
    } else {
      setFilters(f => ({
        ...f,
        keyword: searchParams.keyword || '',
        city: searchParams.city || 'All Cities',
        category: searchParams.category || 'all'
      }));
    }
    setActiveTab('jobs');
    // Scroll to jobs section
    const el = document.getElementById('jobs-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFindJobsWithRate = (targetWage) => {
    setFilters(f => ({ ...f, minWage: targetWage }));
    setActiveTab('jobs');
    const el = document.getElementById('jobs-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Filtered Jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Keyword
      if (filters.keyword.trim()) {
        const q = filters.keyword.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(q);
        const matchesCompany = job.company.toLowerCase().includes(q);
        const matchesDesc = job.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCompany && !matchesDesc) return false;
      }

      // Category
      if (filters.category !== 'all' && job.category !== filters.category) {
        return false;
      }

      // City
      if (filters.city !== 'All Cities') {
        if (!job.location.toLowerCase().includes(filters.city.toLowerCase())) return false;
      }

      // Min Wage
      if (job.hourlyRateHuf < filters.minWage) {
        return false;
      }

      // English only
      if (filters.englishOnly && !job.isEnglishFriendly) {
        return false;
      }

      // Under 18
      if (filters.under18 && !job.isUnder18) {
        return false;
      }

      // Remote only
      if (filters.remoteOnly && !job.isRemote) {
        return false;
      }

      // Shifts
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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Multilingual / Google Translate Banner */}
      <GoogleTranslateBanner 
        currentLanguage={currentLanguage} 
        onLanguageChange={setCurrentLanguage} 
      />

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenPostJobModal={() => setIsPostJobModalOpen(true)}
        isAdminAuthenticated={isAdminAuthenticated}
        onExitAdmin={handleExitAdmin}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'admin' ? (
          isAdminAuthenticated ? (
            <AdminDashboard />
          ) : (
            <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl border border-slate-200 text-center space-y-4 shadow-md">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center mx-auto text-xl">
                🔒
              </div>
              <h3 className="text-xl font-black text-slate-900">Restricted Coordinator Access</h3>
              <p className="text-xs text-slate-500">
                This console is protected for Talent school cooperative staff. Please enter your coordinator passkey to continue.
              </p>
              <button
                onClick={() => setIsAdminAuthModalOpen(true)}
                className="w-full py-2.5 rounded-xl font-bold bg-[#0E3D6E] text-white text-xs shadow-sm"
              >
                Enter Coordinator Passkey
              </button>
            </div>
          )
        ) : activeTab === 'employers' ? (
          /* B2B Employers Page */
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
          /* Default Students Portal (Home, Jobs, Calculator, FAQ) */
          <>
            {/* Hero Section */}
            <Hero
              onSearch={handleHeroSearch}
              onSelectCategory={(catId) => {
                setFilters({ ...filters, category: catId });
                setActiveTab('jobs');
              }}
            />

            {/* Category Grid Section */}
            <CategoryGrid
              selectedCategory={filters.category}
              onSelectCategory={(catId) => {
                setFilters({ ...filters, category: catId });
                setActiveTab('jobs');
                const el = document.getElementById('jobs-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Interactive Student Wage Calculator Section */}
            <section id="calculator-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <StudentWageCalculator onFindJobsWithRate={handleFindJobsWithRate} />
            </section>

            {/* Jobs Listing & Filter Section */}
            <section id="jobs-section" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
                <div>
                  <span className="text-xs font-bold text-[#0E3D6E] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#E5A812]" />
                    Live Opportunities
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                    Featured Student Jobs
                  </h2>
                </div>
                <div className="text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200">
                  Showing <strong className="text-slate-900">{filteredJobs.length}</strong> available positions
                </div>
              </div>

              {/* Grid: Left Filters, Right Job Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
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
                      <h4 className="text-lg font-bold text-slate-900">No jobs match your filters</h4>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Try lowering the minimum wage or clearing category and shift preferences to see more results.
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

            {/* Why Talent vs Traditional Cooperatives */}
            <WhyTalent />

            {/* Frequently Asked Questions & Law */}
            <FAQSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer 
        setActiveTab={setActiveTab} 
        onOpenAdminAuth={() => setIsAdminAuthModalOpen(true)}
      />

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

      <AdminAuthModal
        isOpen={isAdminAuthModalOpen}
        onClose={() => setIsAdminAuthModalOpen(false)}
        onAuthenticated={handleAdminAuthenticated}
      />

      <PostJobModal
        isOpen={isPostJobModalOpen}
        onClose={() => setIsPostJobModalOpen(false)}
        onJobCreated={handleJobCreated}
      />
    </div>
  );
}
