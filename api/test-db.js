import { neon } from '@neondatabase/serverless';

export default async function handler(request, response) {
    try {
        const sql = neon(process.env.DATABASE_URL);
        const result = await sql`SELECT version()`;
        return response.status(200).json({ version: result[0].version });
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}
