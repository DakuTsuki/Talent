import { localDB } from './storageEngine';
import { supabase, isSupabaseConfigured } from './supabaseClient';

const API_BASE = 'http://localhost:5000/api';

// Safe fetch helper for local backend if present
async function safeFetch(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 1200);

  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    clearTimeout(timeoutId);
    return null;
  }
}

export const api = {
  // Check if connected to Live Supabase Cloud
  isCloudConnected() {
    return isSupabaseConfigured();
  },

  // Student Application Submission
  async submitApplication(applicationData) {
    // 1. If Supabase Cloud is configured, write directly to cloud
    if (isSupabaseConfigured()) {
      try {
        const studentId = `stud-${Date.now()}`;
        const appId = `app-${Date.now()}`;

        // Upsert student
        await supabase.from('students').upsert({
          id: studentId,
          full_name: applicationData.fullName,
          email: applicationData.email,
          phone: applicationData.phone || '',
          university: applicationData.university || '',
          student_id: applicationData.studentIdNumber || '',
          is_under_25: applicationData.isUnder25 ?? true,
          skills: applicationData.skills || ['General Student'],
          availability: applicationData.availableDays || ['Flexible'],
          approval_status: 'Pending',
          status: 'Active'
        }, { onConflict: 'email' });

        // Insert application
        const { data: newApp, error: appErr } = await supabase.from('applications').insert({
          id: appId,
          job_id: applicationData.job?.id || 'job-general',
          job_title: applicationData.job?.title || 'General Student Application',
          company: applicationData.job?.company || 'Talent Cooperative Pool',
          student_id: studentId,
          student_name: applicationData.fullName,
          student_email: applicationData.email,
          student_phone: applicationData.phone || '',
          university: applicationData.university || '',
          skills: applicationData.skills || ['General'],
          message: applicationData.message || '',
          cv_file_name: applicationData.cvFileName || '',
          status: 'Application Received'
        }).select().single();

        if (!appErr) {
          // Also mirror to localDB for offline resilience
          localDB.createApplication(applicationData);
          return { success: true, application: newApp, cloud: true };
        }
      } catch (err) {
        console.warn('Supabase insert failed, falling back to local engine:', err);
      }
    }

    // 2. Fallback to Local Engine + local Node backend
    const localResult = localDB.createApplication(applicationData);
    try {
      safeFetch(`${API_BASE}/students/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData)
      });
    } catch {}

    return { success: true, application: localResult.application, student: localResult.student, cloud: false };
  },

  // Get Students (with skill filter)
  async getStudents(skill = '') {
    if (isSupabaseConfigured()) {
      try {
        let query = supabase.from('students').select('*').order('registered_at', { ascending: false });
        if (skill) {
          query = query.ilike('full_name', `%${skill}%`);
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          // Map snake_case to camelCase
          return data.map(s => ({
            id: s.id,
            fullName: s.full_name,
            email: s.email,
            phone: s.phone,
            university: s.university,
            studentId: s.student_id,
            isUnder25: s.is_under_25,
            skills: s.skills || [],
            availability: s.availability || [],
            approvalStatus: s.approval_status || 'Pending',
            registeredAt: s.registered_at,
            status: s.status
          }));
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back:', err);
      }
    }

    const remote = await safeFetch(skill ? `${API_BASE}/students?skill=${encodeURIComponent(skill)}` : `${API_BASE}/students`);
    if (remote && Array.isArray(remote) && remote.length > 0) {
      return remote;
    }

    return localDB.getStudents(skill);
  },

  // Approve or Reject Student
  async updateStudentApprovalStatus(studentId, approvalStatus, sendEmail = true) {
    let emailDispatched = false;

    // 1. Supabase Cloud update
    if (isSupabaseConfigured()) {
      try {
        await supabase.from('students').update({ approval_status: approvalStatus }).eq('id', studentId);
      } catch (err) {
        console.warn('Supabase approval status update error:', err);
      }
    }

    // 2. Local storage update
    const updated = localDB.updateStudentApprovalStatus(studentId, approvalStatus);

    // 3. Email notification simulation / dispatch
    if (sendEmail && approvalStatus === 'Approved') {
      emailDispatched = true;
      console.log(`[Talent Email Dispatch] Automated approval notification sent to ${updated?.email || studentId}:
        Subject: Welcome to Talent! Your Student Membership is Approved
        Status: Verified. 0% Tax exemption enabled.`);
    }

    return { 
      success: true, 
      student: updated, 
      approvalStatus, 
      emailDispatched 
    };
  },

  // Get Applications
  async getApplications() {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('applications').select('*').order('applied_at', { ascending: false });
        if (!error && data && data.length > 0) {
          return data.map(a => ({
            id: a.id,
            jobId: a.job_id,
            jobTitle: a.job_title,
            company: a.company,
            studentId: a.student_id,
            studentName: a.student_name,
            studentEmail: a.student_email,
            studentPhone: a.student_phone,
            university: a.university,
            skills: a.skills || [],
            status: a.status,
            notes: a.notes,
            appliedAt: a.applied_at
          }));
        }
      } catch {}
    }

    const remote = await safeFetch(`${API_BASE}/applications`);
    if (remote && Array.isArray(remote)) return remote;
    return localDB.getApplications();
  },

  // Company Staffing Request Form Submission
  async submitCompanyRequest(requestData) {
    if (isSupabaseConfigured()) {
      try {
        const reqId = `req-${Date.now()}`;
        const { data, error } = await supabase.from('company_requests').insert({
          id: reqId,
          company_name: requestData.companyName,
          contact_person: requestData.contactPerson,
          email: requestData.email,
          phone: requestData.phone,
          role_needed: requestData.roleNeeded || requestData.jobCategory || 'Student Staff',
          skills_required: requestData.skillsRequired || [requestData.jobCategory || 'General'],
          headcount: requestData.headcount || '1-3 students',
          location: requestData.location || 'Budapest',
          description: requestData.description || '',
          status: 'Open'
        }).select().single();

        if (!error) {
          localDB.createCompanyRequest(requestData);
          return { success: true, request: data, cloud: true };
        }
      } catch (err) {
        console.warn('Supabase company request failed, falling back:', err);
      }
    }

    const localReq = localDB.createCompanyRequest(requestData);
    try {
      safeFetch(`${API_BASE}/company/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });
    } catch {}

    return { success: true, request: localReq, cloud: false };
  },

  // Get Company Requests
  async getCompanyRequests() {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('company_requests').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          return data.map(r => ({
            id: r.id,
            companyName: r.company_name,
            contactPerson: r.contact_person,
            email: r.email,
            phone: r.phone,
            roleNeeded: r.role_needed,
            skillsRequired: r.skills_required || [],
            headcount: r.headcount,
            location: r.location,
            description: r.description,
            status: r.status,
            createdAt: r.created_at
          }));
        }
      } catch {}
    }

    const remote = await safeFetch(`${API_BASE}/company/requests`);
    if (remote && Array.isArray(remote) && remote.length > 0) return remote;
    return localDB.getCompanyRequests();
  },

  // Match Student to Company
  async matchStudentToCompany(studentId, companyRequestId, notes = '') {
    if (isSupabaseConfigured()) {
      try {
        const matchId = `match-${Date.now()}`;
        const students = await this.getStudents();
        const companies = await this.getCompanyRequests();
        const student = students.find(s => s.id === studentId);
        const company = companies.find(r => r.id === companyRequestId);

        if (student && company) {
          await supabase.from('matches').insert({
            id: matchId,
            student_id: student.id,
            student_name: student.fullName,
            student_email: student.email,
            student_phone: student.phone,
            company_request_id: company.id,
            company_name: company.companyName,
            role: company.roleNeeded,
            coordinator_notes: notes || 'Student dispatched by Talent Coordinator.'
          });

          await supabase.from('company_requests').update({ status: 'Partially Matched' }).eq('id', company.id);
        }
      } catch (err) {
        console.warn('Supabase match insert error:', err);
      }
    }

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
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('matches').select('*').order('matched_at', { ascending: false });
        if (!error && data && data.length > 0) {
          return data.map(m => ({
            id: m.id,
            studentId: m.student_id,
            studentName: m.student_name,
            studentEmail: m.student_email,
            studentPhone: m.student_phone,
            companyRequestId: m.company_request_id,
            companyName: m.company_name,
            role: m.role,
            status: m.status,
            coordinatorNotes: m.coordinator_notes,
            matchedAt: m.matched_at
          }));
        }
      } catch {}
    }

    const remote = await safeFetch(`${API_BASE}/admin/matches`);
    if (remote && Array.isArray(remote)) return remote;
    return localDB.getMatches();
  },

  // Admin Settings (Email Approval Configuration)
  async getAdminSettings() {
    return localDB.getAdminSettings();
  },

  async updateAdminSettings(settings) {
    return localDB.updateAdminSettings(settings);
  },

  // Admin Dashboard Stats
  async getAdminStats() {
    const students = await this.getStudents();
    const companyRequests = await this.getCompanyRequests();
    const applications = await this.getApplications();
    const matches = await this.getMatches();

    return {
      totalStudents: students.length,
      pendingApprovalStudents: students.filter(s => s.approvalStatus === 'Pending').length,
      totalApplications: applications.length,
      openCompanyRequests: companyRequests.filter(r => r.status === 'Open').length,
      totalCompanyRequests: companyRequests.length,
      successfulMatches: matches.length
    };
  }
};
