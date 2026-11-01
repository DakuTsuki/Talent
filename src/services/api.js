const API_BASE = 'http://localhost:5000/api';

export const api = {
  // Check health
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`);
      return res.ok;
    } catch {
      return false;
    }
  },

  // Student Application Submission
  async submitApplication(applicationData) {
    try {
      const res = await fetch(`${API_BASE}/students/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData)
      });
      return await res.json();
    } catch (err) {
      console.warn('Backend offline, using local state:', err);
      return { success: true, application: applicationData };
    }
  },

  // Get Students (with skill filter)
  async getStudents(skill = '') {
    try {
      const url = skill ? `${API_BASE}/students?skill=${encodeURIComponent(skill)}` : `${API_BASE}/students`;
      const res = await fetch(url);
      return await res.json();
    } catch (err) {
      console.warn('Backend offline, returning empty list:', err);
      return [];
    }
  },

  // Get Applications
  async getApplications() {
    try {
      const res = await fetch(`${API_BASE}/applications`);
      return await res.json();
    } catch (err) {
      return [];
    }
  },

  // Update Application Status
  async updateApplicationStatus(id, status, notes = '') {
    try {
      const res = await fetch(`${API_BASE}/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes })
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  // Company Staffing Request Form Submission
  async submitCompanyRequest(requestData) {
    try {
      const res = await fetch(`${API_BASE}/company/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });
      return await res.json();
    } catch (err) {
      return { success: true, request: requestData };
    }
  },

  // Get Company Requests
  async getCompanyRequests() {
    try {
      const res = await fetch(`${API_BASE}/company/requests`);
      return await res.json();
    } catch (err) {
      return [];
    }
  },

  // Match Student to Company
  async matchStudentToCompany(studentId, companyRequestId, notes = '') {
    try {
      const res = await fetch(`${API_BASE}/admin/match`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, companyRequestId, notes })
      });
      return await res.json();
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  // Get All Matches
  async getMatches() {
    try {
      const res = await fetch(`${API_BASE}/admin/matches`);
      return await res.json();
    } catch (err) {
      return [];
    }
  },

  // Admin Dashboard Stats
  async getAdminStats() {
    try {
      const res = await fetch(`${API_BASE}/admin/stats`);
      return await res.json();
    } catch (err) {
      return {
        totalStudents: 4,
        totalApplications: 2,
        openCompanyRequests: 2,
        totalCompanyRequests: 3,
        successfulMatches: 1
      };
    }
  }
};
