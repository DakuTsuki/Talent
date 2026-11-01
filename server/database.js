import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'data', 'talent-db.json');

// Initial seed data for the talent agency
const INITIAL_DATA = {
  students: [
    {
      id: 'stud-101',
      fullName: 'Alex Kovács',
      email: 'alex.kovacs@student.bme.hu',
      phone: '+36 30 555 1234',
      university: 'Budapest University of Technology (BME)',
      studentId: '728491823',
      isUnder25: true,
      skills: ['React', 'JavaScript', 'English C1', 'Web Development'],
      availability: ['Morning Shifts', 'Weekdays'],
      preferredLocations: ['Budapest', 'Remote'],
      registeredAt: '2026-10-24T10:00:00Z',
      status: 'Active'
    },
    {
      id: 'stud-102',
      fullName: 'Anna Szabó',
      email: 'anna.szabo@uni-corvinus.hu',
      phone: '+36 70 888 4321',
      university: 'Corvinus University of Budapest',
      studentId: '739201948',
      isUnder25: true,
      skills: ['Customer Support', 'English C1', 'German B2', 'Communication'],
      availability: ['Afternoon Shifts', 'Evenings', 'Flexible'],
      preferredLocations: ['Budapest', 'Remote'],
      registeredAt: '2026-10-26T14:30:00Z',
      status: 'Active'
    },
    {
      id: 'stud-103',
      fullName: 'Bence Tóth',
      email: 'bence.toth@inf.elte.hu',
      phone: '+36 20 444 9876',
      university: 'ELTE University',
      studentId: '710293847',
      isUnder25: true,
      skills: ['Warehouse & Logistics', 'Barcode Scanning', 'Physical Fitness'],
      availability: ['Night Shifts', 'Weekends'],
      preferredLocations: ['Győr', 'Budapest'],
      registeredAt: '2026-10-27T09:15:00Z',
      status: 'Active'
    },
    {
      id: 'stud-104',
      fullName: 'Maria Petrova',
      email: 'maria.p@unideb.hu',
      phone: '+36 30 777 6543',
      university: 'University of Debrecen',
      studentId: '748392019',
      isUnder25: false,
      skills: ['Hospitality', 'Barista', 'Cashier', 'English B2'],
      availability: ['Weekends Only', 'Morning Shifts'],
      preferredLocations: ['Debrecen', 'Budapest'],
      registeredAt: '2026-10-28T16:00:00Z',
      status: 'Active'
    }
  ],
  applications: [
    {
      id: 'app-501',
      jobId: 'job-1',
      jobTitle: 'Junior Web Developer (React / Frontend)',
      company: 'TechFlow Solutions',
      studentId: 'stud-101',
      studentName: 'Alex Kovács',
      studentEmail: 'alex.kovacs@student.bme.hu',
      studentPhone: '+36 30 555 1234',
      university: 'Budapest University of Technology (BME)',
      skills: ['React', 'JavaScript', 'English C1'],
      appliedAt: '2026-10-28T11:20:00Z',
      status: 'Interview Scheduled',
      notes: 'Matches frontend criteria. Interview booked for Monday 14:00.'
    },
    {
      id: 'app-502',
      jobId: 'job-2',
      jobTitle: 'English Customer Support Specialist',
      company: 'GlobalConnect Services',
      studentId: 'stud-102',
      studentName: 'Anna Szabó',
      studentEmail: 'anna.szabo@uni-corvinus.hu',
      studentPhone: '+36 70 888 4321',
      university: 'Corvinus University of Budapest',
      skills: ['Customer Support', 'English C1'],
      appliedAt: '2026-10-29T15:45:00Z',
      status: 'Sent to Company',
      notes: 'Profile forwarded to HR coordinator at GlobalConnect.'
    }
  ],
  companyRequests: [
    {
      id: 'req-301',
      companyName: 'TechFlow Solutions',
      contactPerson: 'David Miller (Head of Engineering)',
      email: 'david@techflow.io',
      phone: '+36 1 450 9988',
      roleNeeded: 'Junior React Frontend Student',
      skillsRequired: ['React', 'JavaScript', 'English'],
      headcount: 2,
      location: 'Budapest / Hybrid',
      offeredRateHuf: 3450,
      status: 'Partially Matched',
      notes: '1 candidate assigned (Alex Kovács). Looking for 1 more.',
      createdAt: '2026-10-25T08:00:00Z'
    },
    {
      id: 'req-302',
      companyName: 'GlobalConnect Services',
      contactPerson: 'Sophie Kovács (Talent Lead)',
      email: 'recruitment@globalconnect.hu',
      phone: '+36 1 333 4455',
      roleNeeded: 'English Support Agents',
      skillsRequired: ['English C1', 'Customer Support'],
      headcount: 3,
      location: 'Budapest / 100% Remote',
      offeredRateHuf: 2850,
      status: 'Open',
      notes: 'Urgent for November launch. 1 candidate shortlisted.',
      createdAt: '2026-10-26T12:00:00Z'
    },
    {
      id: 'req-303',
      companyName: 'EuroLog Distribution Hub',
      contactPerson: 'Gábor Nagy (Logistics Supervisor)',
      email: 'gabor.nagy@eurolog.hu',
      phone: '+36 96 220 110',
      roleNeeded: 'Night Shift Order Pickers',
      skillsRequired: ['Warehouse & Logistics', 'Physical Fitness'],
      headcount: 5,
      location: 'Győr Hub',
      offeredRateHuf: 2700,
      status: 'Open',
      notes: 'Shuttle bus provided from Győr station.',
      createdAt: '2026-10-28T14:10:00Z'
    }
  ],
  matches: [
    {
      id: 'match-1',
      studentId: 'stud-101',
      studentName: 'Alex Kovács',
      companyRequestId: 'req-301',
      companyName: 'TechFlow Solutions',
      role: 'Junior React Frontend Student',
      matchedAt: '2026-10-28T12:00:00Z',
      status: 'Candidate Sent',
      coordinatorNotes: 'Alex meets all React requirements. Waiting for final interview feedback.'
    }
  ]
};

// Database helper
class Database {
  async init() {
    try {
      await fs.access(DB_FILE);
    } catch {
      // Create db file with initial seed data if not present
      await this.save(INITIAL_DATA);
    }
  }

  async read() {
    try {
      const content = await fs.readFile(DB_FILE, 'utf-8');
      return JSON.parse(content);
    } catch (err) {
      return INITIAL_DATA;
    }
  }

  async save(data) {
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  }

  // --- Students ---
  async getStudents(skillFilter = '') {
    const data = await this.read();
    if (!skillFilter) return data.students;
    const q = skillFilter.toLowerCase();
    return data.students.filter(s => 
      s.skills.some(skill => skill.toLowerCase().includes(q)) ||
      s.fullName.toLowerCase().includes(q) ||
      s.university.toLowerCase().includes(q)
    );
  }

  async createStudent(student) {
    const data = await this.read();
    const newStudent = {
      id: `stud-${Date.now()}`,
      ...student,
      registeredAt: new Date().toISOString(),
      status: 'Active'
    };
    data.students.unshift(newStudent);
    await this.save(data);
    return newStudent;
  }

  // --- Applications ---
  async getApplications() {
    const data = await this.read();
    return data.applications;
  }

  async createApplication(appData) {
    const data = await this.read();
    
    // Check if student already registered, otherwise register automatically
    let existingStudent = data.students.find(s => s.email.toLowerCase() === appData.email?.toLowerCase());
    if (!existingStudent && appData.fullName && appData.email) {
      existingStudent = {
        id: `stud-${Date.now()}`,
        fullName: appData.fullName,
        email: appData.email,
        phone: appData.phone || '',
        university: appData.university || '',
        studentId: appData.studentIdNumber || '',
        isUnder25: appData.isUnder25 ?? true,
        skills: appData.skills || ['General Student'],
        availability: appData.availableDays || ['Flexible'],
        registeredAt: new Date().toISOString(),
        status: 'Active'
      };
      data.students.unshift(existingStudent);
    }

    const newApplication = {
      id: `app-${Date.now()}`,
      jobId: appData.job?.id || appData.jobId || 'job-general',
      jobTitle: appData.job?.title || appData.jobTitle || 'General Application',
      company: appData.job?.company || appData.company || 'Talent Cooperative Pool',
      studentId: existingStudent ? existingStudent.id : `stud-${Date.now()}`,
      studentName: appData.fullName,
      studentEmail: appData.email,
      studentPhone: appData.phone,
      university: appData.university,
      skills: appData.skills || ['General'],
      message: appData.message || '',
      cvFileName: appData.cvFileName || '',
      appliedAt: new Date().toISOString(),
      status: 'Application Received',
      notes: 'New submission pending talent coordinator review.'
    };

    data.applications.unshift(newApplication);
    await this.save(data);
    return { application: newApplication, student: existingStudent };
  }

  async updateApplicationStatus(id, status, notes = '') {
    const data = await this.read();
    const index = data.applications.findIndex(a => a.id === id);
    if (index !== -1) {
      data.applications[index].status = status;
      if (notes) data.applications[index].notes = notes;
      await this.save(data);
      return data.applications[index];
    }
    return null;
  }

  // --- Company Requests ---
  async getCompanyRequests() {
    const data = await this.read();
    return data.companyRequests;
  }

  async createCompanyRequest(reqData) {
    const data = await this.read();
    const newRequest = {
      id: `req-${Date.now()}`,
      companyName: reqData.companyName,
      contactPerson: reqData.contactPerson,
      email: reqData.email,
      phone: reqData.phone,
      roleNeeded: reqData.roleNeeded || reqData.jobCategory || 'Student Staff',
      skillsRequired: reqData.skillsRequired || [reqData.jobCategory || 'General'],
      headcount: reqData.headcount || 1,
      location: reqData.location || 'Budapest',
      description: reqData.description || '',
      status: 'Open',
      notes: 'New staffing request from employer form.',
      createdAt: new Date().toISOString()
    };
    data.companyRequests.unshift(newRequest);
    await this.save(data);
    return newRequest;
  }

  async updateCompanyRequestStatus(id, status, notes = '') {
    const data = await this.read();
    const index = data.companyRequests.findIndex(r => r.id === id);
    if (index !== -1) {
      data.companyRequests[index].status = status;
      if (notes) data.companyRequests[index].notes = notes;
      await this.save(data);
      return data.companyRequests[index];
    }
    return null;
  }

  // --- Matching Engine ---
  async matchStudentToCompany(studentId, companyRequestId, coordinatorNotes = '') {
    const data = await this.read();
    const student = data.students.find(s => s.id === studentId);
    const company = data.companyRequests.find(r => r.id === companyRequestId);

    if (!student || !company) {
      throw new Error('Student or Company request not found');
    }

    const newMatch = {
      id: `match-${Date.now()}`,
      studentId: student.id,
      studentName: student.fullName,
      studentEmail: student.email,
      studentPhone: student.phone,
      companyRequestId: company.id,
      companyName: company.companyName,
      role: company.roleNeeded,
      matchedAt: new Date().toISOString(),
      status: 'Candidate Sent',
      coordinatorNotes: coordinatorNotes || `Student profile matched by Talent Coordinator.`
    };

    data.matches.unshift(newMatch);

    // Update company request status if needed
    if (company.status === 'Open') {
      company.status = 'Partially Matched';
    }

    await this.save(data);
    return newMatch;
  }

  async getMatches() {
    const data = await this.read();
    return data.matches;
  }
}

export const db = new Database();
await db.init();
