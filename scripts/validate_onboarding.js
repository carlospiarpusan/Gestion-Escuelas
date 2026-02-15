import { neon } from '@neondatabase/serverless';
// Actually, I'll just use the connection string directly or rely on the environment being loaded. 
// Since I can't easily rely on dotenv being installed if it's not in package.json (it's not), I'll read .env.local manually.

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

async function testOnboarding() {
    console.log('🚀 Starting Onboarding Test...');

    const schoolName = `Test School ${Date.now()}`;
    const schoolSlug = `test-school-${Date.now()}`;

    try {
        // 1. Create School
        console.log(`\n1️⃣ Creating School: "${schoolName}"...`);
        const schoolQuery = await sql`
            INSERT INTO schools (name, slug, plan_type, active, address, phone, nit, contact_email)
            VALUES (${schoolName}, ${schoolSlug}, 'Standard', true, 'Calle 123 Test', '555-0000', '900123456', 'contact@test.com')
            RETURNING *
        `;
        const school = schoolQuery[0];
        console.log('✅ School Created:', school);

        // 2. Create Admin User
        console.log(`\n2️⃣ Creating Admin User for School ID: ${school.id}...`);
        const adminEmail = `admin-${Date.now()}@test.com`;
        const userQuery = await sql`
            INSERT INTO users (school_id, full_name, email, password_hash, role, active)
            VALUES (${school.id}, 'Test Admin', ${adminEmail}, 'secret123', 'admin', true)
            RETURNING id, full_name, email, role, school_id
        `;
        const user = userQuery[0];
        console.log('✅ Admin User Created:', user);

        // 3. Verify Link
        if (user.school_id === school.id) {
            console.log('\n🎉 SUCCESS: Admin is correctly linked to the new school.');
        } else {
            console.error('\n❌ FAILURE: School ID mismatch.');
        }

        // Cleanup (Optional, but good to keep DB clean)
        // await sql`DELETE FROM schools WHERE id = ${school.id}`;
        // console.log('\n🧹 Test data cleaned up.');

    } catch (error) {
        console.error('\n❌ TEST FAILED:', error);
        if (error.message.includes('column "nit" of relation "schools" does not exist')) {
            console.error('⚠️  CRITICAL: It looks like the migration script was not run. The "nit" column is missing.');
        }
    }
}

testOnboarding();
