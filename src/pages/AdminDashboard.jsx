import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Briefcase, 
  Send, 
  CheckCircle2, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  GraduationCap, 
  ArrowRight, 
  Sparkles,
  Building,
  Clock,
  Check,
  X,
  AlertCircle,
  Settings,
  Database,
  ShieldCheck,
  Bell
} from 'lucide-react';
import { api } from '../services/api';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('matchmaker'); // 'matchmaker' | 'companies' | 'students' | 'matches' | 'settings'
  const [stats, setStats] = useState({
    totalStudents: 0,
    pendingApprovalStudents: 0,
    totalApplications: 0,
    openCompanyRequests: 0,
    totalCompanyRequests: 0,
    successfulMatches: 0
  });

  const [students, setStudents] = useState([]);
  const [companyRequests, setCompanyRequests] = useState([]);
  const [matches, setMatches] = useState([]);
  const [selectedCompanyRequest, setSelectedCompanyRequest] = useState(null);
  const [skillSearch, setSkillSearch] = useState('');
  const [matchNotes, setMatchNotes] = useState('');
  const [isMatching, setIsMatching] = useState(false);
  const [actionMessage, setActionMessage] = useState('');
  
  // Settings & Email preferences
  const [adminSettings, setAdminSettings] = useState({
    sendApprovalEmail: true,
    notifyAdminOnRequest: true,
    emailSender: 'Talent School Cooperative <welcome@talent-jobs.hu>'
  });

  const isCloudActive = api.isCloudConnected();

  const loadData = async () => {
    const [statsData, studentsData, requestsData, matchesData, settingsData] = await Promise.all([
      api.getAdminStats(),
      api.getStudents(),
      api.getCompanyRequests(),
      api.getMatches(),
      api.getAdminSettings()
    ]);

    setStats(statsData);
    setStudents(studentsData);
    setCompanyRequests(requestsData);
    setMatches(matchesData);
    if (settingsData) setAdminSettings(settingsData);

    if (requestsData.length > 0 && !selectedCompanyRequest) {
      setSelectedCompanyRequest(requestsData[0]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter students based on selected company request or manual search
  const filteredStudents = students.filter(student => {
    const q = skillSearch.toLowerCase();
    const matchesManualSearch = !skillSearch || 
      student.fullName.toLowerCase().includes(q) ||
      student.skills.some(s => s.toLowerCase().includes(q)) ||
      student.university.toLowerCase().includes(q);

    return matchesManualSearch;
  });

  const handleSendStudent = async (student) => {
    if (!selectedCompanyRequest) {
      alert('Please select a company request first.');
      return;
    }

    setIsMatching(true);
    const result = await api.matchStudentToCompany(
      student.id, 
      selectedCompanyRequest.id, 
      matchNotes || `Coordinator assigned ${student.fullName} for role: ${selectedCompanyRequest.roleNeeded}`
    );

    setIsMatching(false);
    if (result.success) {
      setActionMessage(`Candidate ${student.fullName} successfully dispatched to ${selectedCompanyRequest.companyName}!`);
      setMatchNotes('');
      setTimeout(() => setActionMessage(''), 5000);
      loadData();
    } else {
      alert(result.error || 'Failed to match candidate');
    }
  };

  const handleApprovalChange = async (student, newStatus) => {
    const result = await api.updateStudentApprovalStatus(
      student.id, 
      newStatus, 
      adminSettings.sendApprovalEmail
    );

    if (result.success) {
      const emailNote = (newStatus === 'Approved' && adminSettings.sendApprovalEmail)
        ? ' (Automated approval email sent to student)'
        : '';
      setActionMessage(`Student ${student.fullName} status updated to "${newStatus}"${emailNote}`);
      setTimeout(() => setActionMessage(''), 5000);
      loadData();
    }
  };

  const handleToggleSetting = async (key) => {
    const updated = { ...adminSettings, [key]: !adminSettings[key] };
    setAdminSettings(updated);
    await api.updateAdminSettings(updated);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner with Cloud Status */}
      <div className="bg-gradient-to-r from-[#0E3D6E] via-[#0b335c] to-[#072442] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E5A812] text-slate-950 font-black">
              <Sparkles className="w-3.5 h-3.5" />
              Coordinator Operations
            </span>
            {isCloudActive ? (
              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Supabase Cloud Connected
              </span>
            ) : (
              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40">
                <Database className="w-3 h-3" />
                Dual-Mode Ready (Cloud config available)
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Talent Admin & Matching Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Real-time management: review student registrations, verify memberships, inspect employer leads, and match student skills to company vacancies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={loadData}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition"
          >
            Refresh Live Data
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Student Talent Pool</span>
            <Users className="w-4 h-4 text-[#0E3D6E]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">{stats.totalStudents}</div>
          <span className="text-[11px] text-[#1E5E3A] font-bold">
            {stats.pendingApprovalStudents || 0} pending verification
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Company Inquiries</span>
            <Briefcase className="w-4 h-4 text-[#E5A812]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">{stats.totalCompanyRequests}</div>
          <span className="text-[11px] text-[#0E3D6E] font-bold">{stats.openCompanyRequests} currently open</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Candidates Sent</span>
            <Send className="w-4 h-4 text-[#1E5E3A]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#1E5E3A] mt-2">{stats.successfulMatches}</div>
          <span className="text-[11px] text-slate-500">Dispatched to clients</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Email Status</span>
            <Bell className="w-4 h-4 text-[#C92A2A]" />
          </div>
          <div className="text-lg font-black text-slate-900 mt-2">
            {adminSettings.sendApprovalEmail ? 'Auto Email ON' : 'Auto Email OFF'}
          </div>
          <span className="text-[11px] text-slate-500">Configurable approval</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-6 text-sm font-bold overflow-x-auto">
        <button
          onClick={() => setActiveTab('matchmaker')}
          className={`pb-3 transition relative flex items-center gap-2 shrink-0 ${
            activeTab === 'matchmaker'
              ? 'text-[#0E3D6E] border-b-2 border-[#0E3D6E]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#E5A812]" />
          <span>Matchmaker Workspace</span>
        </button>

        <button
          onClick={() => setActiveTab('companies')}
          className={`pb-3 transition relative flex items-center gap-2 shrink-0 ${
            activeTab === 'companies'
              ? 'text-[#0E3D6E] border-b-2 border-[#0E3D6E]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Briefcase className="w-4 h-4 text-[#0E3D6E]" />
          <span>Company Requests ({companyRequests.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('students')}
          className={`pb-3 transition relative flex items-center gap-2 shrink-0 ${
            activeTab === 'students'
              ? 'text-[#0E3D6E] border-b-2 border-[#0E3D6E]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4 text-[#1E5E3A]" />
          <span>Student Verification & Pool ({students.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('matches')}
          className={`pb-3 transition relative flex items-center gap-2 shrink-0 ${
            activeTab === 'matches'
              ? 'text-[#0E3D6E] border-b-2 border-[#0E3D6E]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Send className="w-4 h-4 text-[#8DB828]" />
          <span>Dispatched ({matches.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3 transition relative flex items-center gap-2 shrink-0 ${
            activeTab === 'settings'
              ? 'text-[#0E3D6E] border-b-2 border-[#0E3D6E]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Settings className="w-4 h-4 text-slate-600" />
          <span>Email & Cloud Settings</span>
        </button>
      </div>

      {/* Success Notification Alert */}
      {actionMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#1E5E3A] font-bold text-sm flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* TAB 1: Matchmaker Workspace */}
      {activeTab === 'matchmaker' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Select Company Request */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                Step 1: Select Client Request
              </h3>
              <span className="text-xs text-slate-500">{companyRequests.length} available</span>
            </div>

            <div className="space-y-3">
              {companyRequests.map((req) => {
                const isSelected = selectedCompanyRequest?.id === req.id;
                return (
                  <div
                    key={req.id}
                    onClick={() => setSelectedCompanyRequest(req)}
                    className={`cursor-pointer p-4 rounded-2xl border transition text-left ${
                      isSelected
                        ? 'bg-blue-50/70 border-[#0E3D6E] ring-2 ring-[#0E3D6E]/20 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold text-slate-400 block">{req.companyName}</span>
                        <h4 className="text-sm font-bold text-slate-900">{req.roleNeeded}</h4>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        req.status === 'Open' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {req.status}
                      </span>
                    </div>

                    <div className="mt-2 text-xs text-slate-600 flex flex-wrap gap-x-3 gap-y-1">
                      <span>Needs: <strong className="text-slate-800">{req.headcount}</strong></span>
                      <span>•</span>
                      <span>Loc: <strong className="text-slate-800">{req.location}</strong></span>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-1">
                      {req.skillsRequired?.map((skill, sIdx) => (
                        <span key={sIdx} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-semibold text-slate-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Matched Candidate List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                Step 2: Match & Send Qualified Students
              </h3>

              {/* Quick skill filter */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter student skill (e.g. React)..."
                  value={skillSearch}
                  onChange={(e) => setSkillSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E3D6E]"
                />
              </div>
            </div>

            {selectedCompanyRequest && (
              <div className="p-3 bg-slate-100 rounded-xl text-xs text-slate-700 flex items-center justify-between">
                <span>Matching for: <strong className="text-[#0E3D6E]">{selectedCompanyRequest.companyName}</strong> ({selectedCompanyRequest.roleNeeded})</span>
                <span className="font-semibold">{filteredStudents.length} candidates found</span>
              </div>
            )}

            <div className="space-y-3">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:border-slate-300 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-slate-900">{student.fullName}</h4>
                      {student.isUnder25 && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#8DB828]/20 text-[#3f5710]">
                          Under 25 (0% Tax)
                        </span>
                      )}
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        student.approvalStatus === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : student.approvalStatus === 'Rejected'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {student.approvalStatus || 'Pending Verification'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                      {student.university}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1.5">
                      {student.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-[#0E3D6E] border border-blue-100"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="text-[11px] text-slate-400 pt-1 flex items-center gap-3">
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {student.phone}</span>
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {student.email}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSendStudent(student)}
                    disabled={isMatching}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl font-bold text-xs bg-[#1E5E3A] hover:bg-[#16482d] text-white shadow-xs transition active:scale-95 flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <Send className="w-3.5 h-3.5 text-[#E5A812]" />
                    <span>Send to Client</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Company Staffing Requests */}
      {activeTab === 'companies' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900">Incoming Employer Staffing Inquiries</h3>
            <p className="text-xs text-slate-500">Live requests submitted by partner companies.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Company</th>
                  <th className="p-3">Role & Skills</th>
                  <th className="p-3">Headcount</th>
                  <th className="p-3">Contact Person</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {companyRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/60 transition">
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{req.companyName}</div>
                      <div className="text-[11px] text-slate-500">{req.location}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-slate-800">{req.roleNeeded}</div>
                      <div className="text-[11px] text-slate-500">{req.skillsRequired?.join(', ')}</div>
                    </td>
                    <td className="p-3 font-semibold text-slate-700">{req.headcount}</td>
                    <td className="p-3">
                      <div>{req.contactPerson}</div>
                      <div className="text-[11px] text-slate-500">{req.email} • {req.phone}</div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold ${
                        req.status === 'Open' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => {
                          setSelectedCompanyRequest(req);
                          setActiveTab('matchmaker');
                        }}
                        className="px-3 py-1.5 rounded-lg font-bold bg-[#0E3D6E] text-white hover:bg-[#0a2f55] transition text-xs"
                      >
                        Match Students
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Student Verification & Approval */}
      {activeTab === 'students' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-slate-900">Student Talent Pool & Verification Console</h3>
              <p className="text-xs text-slate-500">
                Review student memberships. Approving a student enables them to accept corporate shifts with 0% tax exemption.
              </p>
            </div>
            <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-xl">
              Approval Email: {adminSettings.sendApprovalEmail ? '🟢 Enabled' : '⚪ Disabled'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {students.map((student) => {
              const isApproved = student.approvalStatus === 'Approved';
              const isPending = !student.approvalStatus || student.approvalStatus === 'Pending';

              return (
                <div key={student.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{student.fullName}</h4>
                        <div className="text-xs text-slate-500">{student.university}</div>
                      </div>
                      <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold ${
                        isApproved
                          ? 'bg-emerald-100 text-emerald-800'
                          : student.approvalStatus === 'Rejected'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {student.approvalStatus || 'Pending Verification'}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {student.skills.map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-semibold text-slate-700">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="text-xs text-slate-600 pt-1 space-y-0.5">
                      <div>Phone: <strong className="text-slate-800">{student.phone}</strong></div>
                      <div>Email: <strong className="text-slate-800">{student.email}</strong></div>
                      <div>ID Number: <strong className="text-slate-800">{student.studentId || 'Under Verification'}</strong></div>
                    </div>
                  </div>

                  {/* Approval Actions */}
                  <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-400">
                      Registered: {new Date(student.registeredAt).toLocaleDateString()}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {!isApproved ? (
                        <button
                          onClick={() => handleApprovalChange(student, 'Approved')}
                          className="px-3 py-1.5 rounded-xl font-bold bg-[#1E5E3A] hover:bg-[#15462a] text-white text-xs transition flex items-center gap-1 shadow-xs"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve & Verify</span>
                        </button>
                      ) : (
                        <span className="text-xs font-bold text-[#1E5E3A] flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Verified
                        </span>
                      )}

                      {student.approvalStatus !== 'Rejected' && (
                        <button
                          onClick={() => handleApprovalChange(student, 'Rejected')}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                          title="Reject / Flag profile"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: Dispatched Matches */}
      {activeTab === 'matches' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900">Dispatched Student Placements & Matches</h3>
            <p className="text-xs text-slate-500">Live audit log of candidate profiles sent to client companies.</p>
          </div>

          <div className="space-y-3">
            {matches.map((m) => (
              <div key={m.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{m.studentName}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-bold text-[#0E3D6E] text-sm">{m.companyName}</span>
                  </div>
                  <div className="text-xs text-slate-600">Role: <strong className="text-slate-800">{m.role}</strong></div>
                  <div className="text-[11px] text-slate-500">Notes: {m.coordinatorNotes}</div>
                </div>

                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    {m.status}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">
                    {new Date(m.matchedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Email & Cloud Settings */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          {/* Email Approval Preferences Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-xl font-black text-slate-900">Student Approval & Email Settings</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Configure automated student approval emails and notification behavior.
              </p>
            </div>

            <div className="space-y-4">
              {/* Toggle 1: Approval Email */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900 text-sm">
                    Send Automated Approval Email to Students
                  </div>
                  <div className="text-xs text-slate-500 max-w-md">
                    When you click "Approve & Verify" on a student, send an automated welcome message with their cooperative membership confirmation.
                  </div>
                </div>

                <button
                  onClick={() => handleToggleSetting('sendApprovalEmail')}
                  className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors ${
                    adminSettings.sendApprovalEmail ? 'bg-[#1E5E3A] justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-white shadow-md transform transition" />
                </button>
              </div>

              {/* Toggle 2: Admin Request Notification */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900 text-sm">
                    Notify Coordinators on New Employer Requests
                  </div>
                  <div className="text-xs text-slate-500 max-w-md">
                    Alert the coordinator team when a company submits a new staffing quote inquiry on the website.
                  </div>
                </div>

                <button
                  onClick={() => handleToggleSetting('notifyAdminOnRequest')}
                  className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors ${
                    adminSettings.notifyAdminOnRequest ? 'bg-[#0E3D6E] justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-white shadow-md transform transition" />
                </button>
              </div>
            </div>

            {/* Email Template Preview */}
            <div className="mt-6 border-t border-slate-100 pt-6">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Live Student Approval Email Template Preview
              </span>
              <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 font-mono text-xs space-y-2 border border-slate-800">
                <div className="text-slate-400">From: <span className="text-white">{adminSettings.emailSender}</span></div>
                <div className="text-slate-400">Subject: <span className="text-[#E5A812] font-bold">Your Student Membership is Approved! Welcome to Talent</span></div>
                <div className="border-t border-slate-800 my-2 pt-2 text-slate-300 leading-relaxed font-sans">
                  <p>Dear Student,</p>
                  <p className="mt-2">
                    Congratulations! Your active student status certificate and school ID have been approved by the Talent Cooperative coordinator team.
                  </p>
                  <p className="mt-2">
                    Under Hungarian student labor laws, you are officially enabled for <strong>100% tax-free student earnings (0% SZJA deduction)</strong> if you are under 25 years old.
                  </p>
                  <p className="mt-2 text-[#8DB828]">
                    You can now browse open shifts and apply directly for client positions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Supabase Cloud Connection Guide */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900">Live Cloud Database (Supabase)</h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Status: {isCloudActive ? '🟢 Live Connected' : '🟠 Running in Dual-Mode Engine'}
                </p>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-[#0E3D6E] font-bold border border-blue-200">
                Option A Config
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-slate-700">
              <strong className="text-slate-900 block">How to connect your live Supabase project:</strong>
              <div>1. Create a free project at <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-[#0E3D6E] underline font-bold">supabase.com</a>.</div>
              <div>2. Go to the <strong>SQL Editor</strong> in Supabase, paste the contents of <code className="bg-white px-1.5 py-0.5 rounded border font-mono">supabase-schema.sql</code>, and click <strong>Run</strong>.</div>
              <div>3. In your project, create a <code className="bg-white px-1.5 py-0.5 rounded border font-mono">.env</code> file with:</div>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-[11px] overflow-x-auto">
{`VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key`}
              </pre>
              <div className="text-slate-500 pt-1">
                Once saved, your live mobile site will instantly read and write from the central cloud database!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
