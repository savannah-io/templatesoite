-- Create the job_references table first (since it will be referenced)
CREATE TABLE job_references (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    relationship TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    application_id UUID
);

-- Create the main job_applications table
CREATE TABLE job_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip TEXT NOT NULL,
    position TEXT NOT NULL,
    start_date TEXT NOT NULL,
    experience TEXT,
    resume_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Add foreign key constraint to job_references
ALTER TABLE job_references
ADD CONSTRAINT fk_job_application
FOREIGN KEY (application_id)
REFERENCES job_applications(id)
ON DELETE CASCADE;

-- Enable Row Level Security
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_references ENABLE ROW LEVEL SECURITY;

-- Create policies for job_applications
CREATE POLICY "Enable read access for all users" ON job_applications
FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON job_applications
FOR INSERT WITH CHECK (true);

-- Create policies for job_references
CREATE POLICY "Enable read access for all users" ON job_references
FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON job_references
FOR INSERT WITH CHECK (true); 