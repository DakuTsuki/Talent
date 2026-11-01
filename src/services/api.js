import { localDB } from './storageEngine';

const API_BASE = 'http://localhost:5000/api';

// Helper to safely execute fetch with fallback to localDB
async function safeFetch(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 1500); // 1.5s timeout for local checks

  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    clearTimeout(timeoutId);
    return null; // Signals fallback to localDB
  }
}

export const api = {
  // Check health
  async checkHealth() {
    const data = await safeFetch(`${API_BASE}/health`);
    return Boolean(data);
  },

  // Student Application Submission
  async submitApplication(applicationData) {
    // Save to local engine first so it's guaranteed to persist in browser
    const localResult = localDB.createApplication(applicationData);

    // Try syncing with backend if available
    try {
      safeFetch(`${API_BASE}/students/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData)
      });
    } catch {}

    return { success: true, application: localResult.application, student: localResult.student };
  },

  // Get Students (with skill filter)
  async getStudents(skill = '') {
    const remote = await safeFetch(skill ? `${API_BASE}/students?skill=${encodeURIComponent(skill)}` : `${API_BASE}/students`);
    if (remote && Array.isArray(remote) && remote.length > 0) {
      return remote;
    }
    // Autonomous browser database
    return localDB.getStudents(skill);
  },

  // Get Applications
  async getApplications() {
    const remote = await safeFetch(`${API_BASE}/applications`);
    if (remote && Array.isArray(remote)) {
      return remote;
    }
    return localDB.getApplications();
  },

  // Company Staffing Request Form Submission
  async submitCompanyRequest(requestData) {
    const localReq = localDB.createCompanyRequest(requestData);

    try {
      safeFetch(`${API_BASE}/company/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });
    } catch {}

    return { success: true, request: localReq };
  },

  // Get Company Requests
  async getCompanyRequests() {
    const remote = await safeFetch(`${API_BASE}/company/requests`);
    if (remote && Array.isArray(remote) && remote.length > 0) {
      return remote;
    }
    return localDB.getCompanyRequests();
  },

  // Match Student to Company
  async matchStudentToCompany(studentId, companyRequestId, notes = '') {
    const localMatch = localDB.matchStudentToCompany(studentId, companyRequestId, notes);

    try {
      safeFetch(`${API_BASE}/admin/match`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, companyRequestId, notes })
      });
    } catch {}

    return { success: true, match: localMatch };
  },

  // Get All Matches
  async getMatches() {
    const remote = await safeFetch(`${API_BASE}/admin/matches`);
    if (remote && Array.isArray(remote)) {
      return remote;
    }
    return localDB.getMatches();
  },

  // Admin Dashboard Stats
  async getAdminStats() {
    const remote = await safeFetch(`${API_BASE}/admin/stats`);
    if (remote && remote.totalStudents !== undefined) {
      return remote;
    }
    return localDB.getStats();
  }
};
