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

async function debugUsersGet() {
    console.log('🚀 Debugging Users GET Query...');

    try {
        // Replicating the query from api/users.js
        console.log('Running SQL query...');
        const users = await sql`
            SELECT u.id, u.full_name, u.email, u.role, u.active, u.created_at,
                   s.name as "schoolName", u.school_id
            FROM users u
            LEFT JOIN schools s ON u.school_id = s.id
            ORDER BY u.created_at DESC
        `;

        console.log(`✅ Query successful. Found ${users.length} users.`);
        console.log(JSON.stringify(users, null, 2));

    } catch (error) {
        console.error('\n❌ QUERY FAILED:', error);
    }
}

debugUsersGet();
