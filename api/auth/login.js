import { sql } from '../_db.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method not allowed');

    const { email, password } = req.body;

    try {
        // In production, use password_hash with bcrypt/scrypt. 
        // For this migration, we'll check plain text if that's what's in the DB or 
        // simulate the lookup. Better yet, let's assume standard security.
        const users = await sql`
      SELECT u.*, s.name as "schoolName" 
      FROM users u
      LEFT JOIN schools s ON u.school_id = s.id
      WHERE u.email = ${email} AND u.active = true
      LIMIT 1
    `;

        const user = users[0];

        // Simple verification (Replace with bcrypt.compare in real setup)
        if (user && user.password_hash === password) {
            const sessionUser = {
                id: user.id,
                email: user.email,
                role: user.role,
                name: user.full_name,
                schoolId: user.school_id,
                schoolName: user.schoolName || 'Global Management',
                token: 'real-db-token-' + user.id
            };
            return res.status(200).json(sessionUser);
        }

        return res.status(401).json({ error: 'Credenciales inválidas' });
    } catch (error) {
        console.error('Login Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
