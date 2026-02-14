-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ROLES ENUM
CREATE TYPE user_role AS ENUM ('superadmin', 'admin', 'secretary', 'instructor', 'student', 'auditor');

-- SCHOOLS (Tenants)
CREATE TABLE schools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL, -- For personalized URLs or identifying tenant
    logo_url TEXT,
    active BOOLEAN DEFAULT TRUE,
    plan_type VARCHAR(50) DEFAULT 'standard', -- basic, premium, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- USERS
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE, -- NULL for Superadmin
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role user_role NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraint: Only superadmin can have null school_id
    CONSTRAINT check_school_id CHECK (
        (role = 'superadmin' AND school_id IS NULL) OR 
        (role != 'superadmin' AND school_id IS NOT NULL)
    )
);

-- INSTRUCTOR HOURS LOG
CREATE TABLE instructor_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
    instructor_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    date DATE NOT NULL,
    hours DECIMAL(4, 2) NOT NULL, -- e.g., 8.5
    created_by UUID REFERENCES users(id), -- Secretary/Admin who logged it
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(instructor_id, date) -- Prevent duplicate logs for same day
);

-- EXAM CATEGORIES ENUM
CREATE TYPE exam_category AS ENUM ('A2', 'B1', 'C1', 'C2', 'SEGURIDAD_VIAL');

-- EXAMS (Question Banks)
CREATE TABLE exams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE, -- NULL = Global Bank
    title VARCHAR(200) NOT NULL,
    category exam_category NOT NULL,
    questions JSONB NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- EXAM RESULTS
CREATE TABLE exam_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE NOT NULL, -- Generic helper for analytics
    exam_category exam_category NOT NULL,
    mode INT NOT NULL, -- 15 or 40 questions
    score INT NOT NULL,
    total_questions INT NOT NULL,
    passed BOOLEAN NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PAYMENTS (Abonos)
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
    student_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    concept VARCHAR(255), -- e.g., "Matrícula", "Mensualidad Marzo"
    payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    receipt_url TEXT,
    recorded_by UUID REFERENCES users(id) -- The secretary/admin who registered it
);
