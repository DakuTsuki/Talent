-- TALENT PLATFORM - SUPABASE CLOUD DATABASE SCHEMA
-- Copy and paste this script into the Supabase SQL Editor to initialize all live cloud tables.

-- 1. Students Table
CREATE TABLE IF NOT EXISTS public.students (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  university TEXT,
  student_id TEXT,
  is_under_25 BOOLEAN DEFAULT true,
  skills TEXT[] DEFAULT '{}',
  availability TEXT[] DEFAULT '{}',
  preferred_locations TEXT[] DEFAULT '{}',
  approval_status TEXT DEFAULT 'Pending' CHECK (approval_status IN ('Pending', 'Approved', 'Rejected')),
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'Active'
);

-- 2. Company Staffing Requests Table
CREATE TABLE IF NOT EXISTS public.company_requests (
  id TEXT PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  role_needed TEXT NOT NULL,
  skills_required TEXT[] DEFAULT '{}',
  headcount TEXT DEFAULT '1-3 students',
  location TEXT DEFAULT 'Budapest',
  description TEXT,
  status TEXT DEFAULT 'Open' CHECK (status IN ('Open', 'Partially Matched', 'Closed')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Applications Table
CREATE TABLE IF NOT EXISTS public.applications (
  id TEXT PRIMARY KEY,
  job_id TEXT,
  job_title TEXT NOT NULL,
  company TEXT NOT NULL,
  student_id TEXT,
  student_name TEXT NOT NULL,
  student_email TEXT NOT NULL,
  student_phone TEXT,
  university TEXT,
  skills TEXT[] DEFAULT '{}',
  message TEXT,
  cv_file_name TEXT,
  status TEXT DEFAULT 'Application Received' CHECK (status IN ('Application Received', 'Under Review', 'Interview Scheduled', 'Sent to Company', 'Hired', 'Rejected')),
  notes TEXT,
  applied_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Dispatched Candidate Matches Table
CREATE TABLE IF NOT EXISTS public.matches (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL,
  student_name TEXT NOT NULL,
  student_email TEXT NOT NULL,
  student_phone TEXT,
  company_request_id TEXT NOT NULL,
  company_name TEXT NOT NULL,
  role TEXT NOT NULL,
  matched_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'Candidate Sent',
  coordinator_notes TEXT
);

-- 5. Admin Settings (Email Approval Preferences)
CREATE TABLE IF NOT EXISTS public.admin_settings (
  id TEXT PRIMARY KEY DEFAULT 'global_settings',
  send_approval_email BOOLEAN DEFAULT true,
  notify_admin_on_request BOOLEAN DEFAULT true,
  email_sender_name TEXT DEFAULT 'Talent School Cooperative',
  approval_email_subject TEXT DEFAULT 'Your Student Membership is Approved! Welcome to Talent',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert Default Settings
INSERT INTO public.admin_settings (id, send_approval_email, notify_admin_on_request)
VALUES ('global_settings', true, true)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- Permissive public policies for the agency workflow
CREATE POLICY "Public students read" ON public.students FOR SELECT USING (true);
CREATE POLICY "Public students insert" ON public.students FOR INSERT WITH CHECK (true);
CREATE POLICY "Public students update" ON public.students FOR UPDATE USING (true);

CREATE POLICY "Public company_requests read" ON public.company_requests FOR SELECT USING (true);
CREATE POLICY "Public company_requests insert" ON public.company_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public company_requests update" ON public.company_requests FOR UPDATE USING (true);

CREATE POLICY "Public applications read" ON public.applications FOR SELECT USING (true);
CREATE POLICY "Public applications insert" ON public.applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Public applications update" ON public.applications FOR UPDATE USING (true);

CREATE POLICY "Public matches read" ON public.matches FOR SELECT USING (true);
CREATE POLICY "Public matches insert" ON public.matches FOR INSERT WITH CHECK (true);
CREATE POLICY "Public matches update" ON public.matches FOR UPDATE USING (true);

CREATE POLICY "Public admin_settings read" ON public.admin_settings FOR SELECT USING (true);
CREATE POLICY "Public admin_settings update" ON public.admin_settings FOR UPDATE USING (true);
