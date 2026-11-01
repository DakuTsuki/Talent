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
  AlertCircle
} from 'lucide-react';
import { api } from '../services/api';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('matchmaker'); // 'matchmaker' | 'companies' | 'students' | 'matches'
  const [stats, setStats] = useState({
    totalStudents: 0,
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
  const [matchSuccessMessage, setMatchSuccessMessage] = useState('');

  const loadData = async () => {
    const [statsData, studentsData, requestsData, matchesData] = await Promise.all([
      api.getAdminStats(),
      api.getStudents(),
      api.getCompanyRequests(),
      api.getMatches()
    ]);

    setStats(statsData);
    setStudents(studentsData);
    setCompanyRequests(requestsData);
    setMatches(matchesData);

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
      setMatchSuccessMessage(`Candidate ${student.fullName} successfully sent to ${selectedCompanyRequest.companyName}!`);
      setMatchNotes('');
      setTimeout(() => setMatchSuccessMessage(''), 4000);
      loadData();
    } else {
      alert(result.error || 'Failed to match candidate');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0E3D6E] via-[#0b335c] to-[#072442] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#E5A812] uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Cooperative Dispatch & Operations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Talent Admin & Matching Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Receive incoming student applications, review company staffing requests, and match qualified student candidates directly to client companies.
          </p>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={loadData}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition"
          >
            Refresh Data
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
          <span className="text-[11px] text-[#1E5E3A] font-bold">Registered candidates</span>
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
            <span className="text-xs font-semibold text-slate-500">Total Applications</span>
            <Clock className="w-4 h-4 text-[#C92A2A]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">{stats.totalApplications}</div>
          <span className="text-[11px] text-slate-500">Through portal</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-6 text-sm font-bold">
        <button
          onClick={() => setActiveTab('matchmaker')}
          className={`pb-3 transition relative flex items-center gap-2 ${
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
          className={`pb-3 transition relative flex items-center gap-2 ${
            activeTab === 'companies'
              ? 'text-[#0E3D6E] border-b-2 border-[#0E3D6E]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Briefcase className="w-4 h-4 text-[#0E3D6E]" />
          <span>Company Staffing Requests ({companyRequests.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('students')}
          className={`pb-3 transition relative flex items-center gap-2 ${
            activeTab === 'students'
              ? 'text-[#0E3D6E] border-b-2 border-[#0E3D6E]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4 text-[#1E5E3A]" />
          <span>Student Talent Pool ({students.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('matches')}
          className={`pb-3 transition relative flex items-center gap-2 ${
            activeTab === 'matches'
              ? 'text-[#0E3D6E] border-b-2 border-[#0E3D6E]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Send className="w-4 h-4 text-[#8DB828]" />
          <span>Dispatched Matches ({matches.length})</span>
        </button>
      </div>

      {/* Success Notification Alert */}
      {matchSuccessMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#1E5E3A] font-bold text-sm flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{matchSuccessMessage}</span>
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
                      <span>Needs: <strong className="text-slate-800">{req.headcount} students</strong></span>
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
          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-900">Incoming Employer Staffing Inquiries</h3>
              <p className="text-xs text-slate-500">Submitted through the B2B quote request form.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Company</th>
                  <th className="p-3">Role & Skills</th>
                  <th className="p-3">Headcount</th>
                  <th className="p-3">Contact</th>
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
                        Find Students
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Student Talent Pool */}
      {activeTab === 'students' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900">Registered Student Database</h3>
            <p className="text-xs text-slate-500">All student candidates who applied or registered for cooperative work.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {students.map((student) => (
              <div key={student.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{student.fullName}</h4>
                    <div className="text-xs text-slate-500">{student.university}</div>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-blue-100 text-blue-800">
                    ID: {student.studentId || 'N/A'}
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
                  <div>Available: <strong className="text-slate-800">{student.availability?.join(', ')}</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Dispatched Matches */}
      {activeTab === 'matches' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900">Dispatched Student Placements & Matches</h3>
            <p className="text-xs text-slate-500">Audit log of candidates sent to client companies.</p>
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
    </div>
  );
}
