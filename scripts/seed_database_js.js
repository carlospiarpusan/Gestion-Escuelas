
import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const match = envContent.match(/DATABASE_URL="([^"]+)"/);
const connectionString = match ? match[1] : null;

if (!connectionString) {
    console.error('❌ Could not find DATABASE_URL in .env.local');
    process.exit(1);
}

const sql = neon(connectionString);

async function seedQuestions() {
    console.log('🌱 Seeding Questions...');

    const seedFilePath = path.resolve(process.cwd(), 'src/lib/seed_questions.sql');
    if (!fs.existsSync(seedFilePath)) {
        console.error('❌ Seed file not found at:', seedFilePath);
        return;
    }

    const seedSql = fs.readFileSync(seedFilePath, 'utf-8');

    // Split by semicolons to execute statements individually if needed, 
    // but neon serverless might handle the bulk string. Let's try bulk first.
    // Actually, neon driver usually takes a template literal, not a raw string for multiple statements comfortably without some care.
    // But let's try passing it as a single query string if the driver supports it, or split it.
    // The safest way with simple drivers is often splitting.

    // Simple split by semicolon at end of line
    const statements = seedSql.split(/;\s*$/m).filter(s => s.trim().length > 0);

    console.log(`Found ${statements.length} SQL statements to execute.`);

    try {
        // We'll execute them in chunks or serially
        for (const statement of statements) {
            // A simple check to avoid empty statements
            if (statement.trim()) {
                await sql(statement);
            }
        }
        console.log('✅ Seeding complete.');
    } catch (error) {
        console.error('❌ Error seeding database:', error);
    }
}

seedQuestions();
