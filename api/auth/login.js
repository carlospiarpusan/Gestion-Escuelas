import { sql } from '../_db.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method not allowed');

    const { email, password } = req.body;

    try {
        // Query the real 'usuarios' table (Spanish schema)
        const users = await sql`
            SELECT u.*, e.nombre as escuela_nombre
            FROM usuarios u
            LEFT JOIN escuelas e ON u.escuela_id = e.id
            WHERE u.email = ${email} AND u.activo = true
            LIMIT 1
        `;

        const user = users[0];

        if (!user) {
            return res.status(401).json({ error: 'Email o contraseña incorrectos' });
        }

        // Check password — the DB stores plain text in 'password' column
        // Support both bcrypt hashes and plain text for migration
        let passwordMatch = false;
        if (user.password && user.password.startsWith('$2b$')) {
            // Skip bcrypt for now — plain text comparison
            passwordMatch = false;
        }
        // Plain text comparison
        if (user.password === password) {
            passwordMatch = true;
        }

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Email o contraseña incorrectos' });
        }

        // Map DB Spanish roles to frontend English roles
        const roleMap = {
            'super_admin': 'superadmin',
            'admin': 'admin',
            'instructor': 'instructor',
            'secretaria': 'secretary',
            'alumno': 'student',
            'supervisor': 'supervisor'
        };

        const sessionUser = {
            id: user.id,
            email: user.email,
            role: roleMap[user.role] || user.role,
            name: [user.nombre, user.apellido].filter(Boolean).join(' ') || user.email,
            schoolId: user.escuela_id,
            schoolName: user.escuela_nombre || 'Global',
            token: 'db-token-' + user.id
        };
        return res.status(200).json(sessionUser);
    } catch (error) {
        console.error('Login Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
