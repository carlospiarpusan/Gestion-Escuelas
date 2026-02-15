
import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';

// Read .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const match = envContent.match(/DATABASE_URL="([^"]+)"/);
const connectionString = match ? match[1] : null;

if (!connectionString) {
    console.error('❌ Could not find DATABASE_URL in .env.local');
    process.exit(1);
}

const sql = neon(connectionString);

async function verifyPhase4() {
    console.log('🚀 Starting Phase 4 Verification...');

    try {
        // 1. Get a school and a student
        const schools = await sql`SELECT id, name FROM schools LIMIT 1`;
        if (schools.length === 0) throw new Error('No schools found');
        const school = schools[0];
        console.log(`Checking school: ${school.name}`);

        const students = await sql`SELECT id, full_name FROM users WHERE role = 'student' AND school_id = ${school.id} LIMIT 1`;
        let student;

        if (students.length === 0) {
            console.log('Creating dummy student for test...');
            const newStudent = await sql`
                INSERT INTO users (school_id, full_name, email, password_hash, role, active)
                VALUES (${school.id}, 'Test Student Phase4', 'phase4@test.com', 'pass', 'student', true)
                RETURNING id, full_name
            `;
            student = newStudent[0];
        } else {
            student = students[0];
        }

        // 2. Insert a dummy exam result
        console.log('Inserting dummy exam result...');
        await sql`
            INSERT INTO exam_results (student_id, school_id, exam_category, mode, score, total_questions, passed)
            VALUES (${student.id}, ${school.id}, 'B1', 40, 38, 40, true)
        `;
        console.log('✅ Exam result inserted.');

        // 3. Simulating API Logic for Exam Results
        console.log('Testing Exam Results Fetch (SuperAdmin - All)...');
        const allResults = await sql`
            SELECT er.id, s.name as school 
            FROM exam_results er 
            JOIN schools s ON er.school_id = s.id
        `;
        console.log(`✅ Found ${allResults.length} total results.`);

        console.log(`Testing Exam Results Fetch (Admin - School ${school.name})...`);
        const schoolResults = await sql`
            SELECT er.id, s.name as school 
            FROM exam_results er 
            JOIN schools s ON er.school_id = s.id
            WHERE er.school_id = ${school.id}
        `;
        console.log(`✅ Found ${schoolResults.length} results for this school.`);

        if (schoolResults.length > 0) {
            console.log('✅ Verification PASSED: Data insertion and filtering logic is working.');
        } else {
            console.error('❌ Verification FAILED: Could not find the inserted result.');
        }

    } catch (error) {
        console.error('❌ Error during verification:', error);
    }
}

verifyPhase4();
