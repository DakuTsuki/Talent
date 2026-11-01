import express from 'express';
import cors from 'cors';
import { db } from './database.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Talent API Backend', time: new Date().toISOString() });
});

// --- Student Endpoints ---

// 1. Submit Application & Student Details
app.post('/api/students/apply', async (req, res) => {
  try {
    const { fullName, email, phone, university, studentIdNumber, isUnder25, availableDays, cvFileName, message, job } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({ error: 'Full name and email are required' });
    }

    const result = await db.createApplication(req.body);
    res.status(201).json({
      success: true,
      message: 'Student application received and registered successfully',
      application: result.application,
      student: result.student
    });
  } catch (error) {
    console.error('Apply error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
});

// 2. Get All Students (with optional skill search query)
app.get('/api/students', async (req, res) => {
  try {
    const { skill } = req.query;
    const students = await db.getStudents(skill);
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Get All Applications
app.get('/api/applications', async (req, res) => {
  try {
    const applications = await db.getApplications();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Update Application Status (e.g., Shortlisted, Interview Scheduled, Sent to Company)
app.patch('/api/applications/:id', async (req, res) => {
  try {
    const { status, notes } = req.body;
    const updated = await db.updateApplicationStatus(req.params.id, status, notes);
    if (!updated) return res.status(404).json({ error: 'Application not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Company Endpoints ---

// 5. Submit Company Staffing Request Form
app.post('/api/company/request', async (req, res) => {
  try {
    const { companyName, contactPerson, email, phone } = req.body;
    if (!companyName || !email) {
      return res.status(400).json({ error: 'Company name and email are required' });
    }

    const newRequest = await db.createCompanyRequest(req.body);
    res.status(201).json({
      success: true,
      message: 'Company staffing request recorded successfully',
      request: newRequest
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6. Get All Company Requests
app.get('/api/company/requests', async (req, res) => {
  try {
    const requests = await db.getCompanyRequests();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7. Update Company Request Status
app.patch('/api/company/requests/:id', async (req, res) => {
  try {
    const { status, notes } = req.body;
    const updated = await db.updateCompanyRequestStatus(req.params.id, status, notes);
    if (!updated) return res.status(404).json({ error: 'Request not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Admin Matchmaking Endpoints (The Core of Mr. Samuel's Workflow) ---

// 8. Match a Student to a Company Request
app.post('/api/admin/match', async (req, res) => {
  try {
    const { studentId, companyRequestId, notes } = req.body;
    if (!studentId || !companyRequestId) {
      return res.status(400).json({ error: 'studentId and companyRequestId are required' });
    }

    const match = await db.matchStudentToCompany(studentId, companyRequestId, notes);
    res.status(201).json({
      success: true,
      message: 'Student successfully matched and sent to company',
      match
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 9. Get All Matches
app.get('/api/admin/matches', async (req, res) => {
  try {
    const matches = await db.getMatches();
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 10. Admin Stats Dashboard
app.get('/api/admin/stats', async (req, res) => {
  try {
    const students = await db.getStudents();
    const applications = await db.getApplications();
    const companyRequests = await db.getCompanyRequests();
    const matches = await db.getMatches();

    res.json({
      totalStudents: students.length,
      totalApplications: applications.length,
      openCompanyRequests: companyRequests.filter(r => r.status === 'Open').length,
      totalCompanyRequests: companyRequests.length,
      successfulMatches: matches.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Talent Backend running on http://localhost:${PORT}`);
});
