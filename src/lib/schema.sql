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

-- QUESTION BANK (Granular)
CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category exam_category NOT NULL,
    question_text TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_option CHAR(1) NOT NULL CHECK (correct_option IN ('A', 'B', 'C', 'D')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- EXAM RESULTS
CREATE TABLE exam_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
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
    currency VARCHAR(3) DEFAULT 'COP',
    concept VARCHAR(255), -- e.g., "Matrícula", "Mensualidad Marzo"
    payment_method VARCHAR(50) NOT NULL, -- Efectivo, Tarjeta, Nequi, Sistecredito, etc.
    payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    receipt_url TEXT,
    recorded_by UUID REFERENCES users(id) -- The secretary/admin who registered it
);

-- TRAMITADORES (Agents)
CREATE TABLE tramitadores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- STUDENT DETAILS (Extension of Users)
CREATE TABLE student_details (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    cedula VARCHAR(20) UNIQUE NOT NULL,
    contract_number VARCHAR(50) NOT NULL,
    license_category VARCHAR(20) NOT NULL, -- A2, B1, C1, RC1, A2-B1, A2-C1, A2-RC1
    course_value DECIMAL(10, 2) NOT NULL,
    tramitador_id UUID REFERENCES tramitadores(id) ON DELETE SET NULL,
    tramitador_fee DECIMAL(10, 2) DEFAULT 0,
    registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
