
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

async function checkQuestions() {
    console.log('🔍 Checking Questions Table...');
    try {
        const count = await sql`SELECT COUNT(*) FROM questions`;
        console.log(`📊 Total Question Count: ${count[0].count}`);

        if (parseInt(count[0].count) === 0) {
            console.log('⚠️ The table is empty. You need to run the seed script.');
        } else {
            console.log('✅ Questions exist. Fetching first 3...');
            const samples = await sql`SELECT id, question_text, category FROM questions LIMIT 3`;
            console.log(samples);
        }
    } catch (error) {
        console.error('❌ Database Error:', error);
    }
}

checkQuestions();
