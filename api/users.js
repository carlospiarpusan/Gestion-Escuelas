import { sql } from './_db.js';

export default async function handler(req, res) {
    try {
        // GET users (Global or School specific)
        if (req.method === 'GET') {
            const { school_id, role } = req.query;

            // If school_id provided, filter by it. If not, list all (for SuperAdmin)
            // In real app, check auth token role here.

            let query = sql`
            SELECT u.id, u.full_name, u.email, u.role, u.active, u.created_at,
                   s.name as "schoolName", u.school_id
            FROM users u
            LEFT JOIN schools s ON u.school_id = s.id
            WHERE 1=1
        `;

            if (school_id) {
                query = sql`${query} AND u.school_id = ${school_id}`;
            }

            if (role) {
                query = sql`${query} AND u.role = ${role}`;
            }

            const users = await sql`${query} ORDER BY u.created_at DESC`;
            return res.status(200).json(users);
        }

        // CREATE User (Admin, Instructor, Secretary, etc.)
        if (req.method === 'POST') {
            const { school_id, full_name, email, password, role } = req.body;

            if (!school_id || !full_name || !email || !password || !role) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            // Check if email exists
            const existing = await sql`SELECT id FROM users WHERE email = ${email}`;
            if (existing.length > 0) {
                return res.status(409).json({ error: 'User with this email already exists' });
            }

            // Hash password (TODO: Use bcrypt in production. Using plain for migration compatibility)
            const password_hash = password;

            const result = await sql`
        INSERT INTO users (school_id, full_name, email, password_hash, role, active)
        VALUES (${school_id}, ${full_name}, ${email}, ${password_hash}, ${role}, true)
        RETURNING id, full_name, email, role, school_id
      `;

            return res.status(201).json(result[0]);
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
