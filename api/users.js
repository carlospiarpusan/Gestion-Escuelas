import { sql } from './_db.js';

export default async function handler(req, res) {
    try {
        // GET users
        if (req.method === 'GET') {
            const { school_id, role } = req.query;

            let users;
            if (school_id && role) {
                users = await sql`
                    SELECT u.id, CONCAT(u.nombre, ' ', COALESCE(u.apellido, '')) as full_name,
                           u.email, u.role, u.activo as active, u.fecha_registro as created_at,
                           e.nombre as "schoolName", u.escuela_id as school_id
                    FROM usuarios u
                    LEFT JOIN escuelas e ON u.escuela_id = e.id
                    WHERE u.escuela_id = ${school_id}::uuid AND u.role = ${role}
                    ORDER BY u.fecha_registro DESC
                `;
            } else if (school_id) {
                users = await sql`
                    SELECT u.id, CONCAT(u.nombre, ' ', COALESCE(u.apellido, '')) as full_name,
                           u.email, u.role, u.activo as active, u.fecha_registro as created_at,
                           e.nombre as "schoolName", u.escuela_id as school_id
                    FROM usuarios u
                    LEFT JOIN escuelas e ON u.escuela_id = e.id
                    WHERE u.escuela_id = ${school_id}::uuid
                    ORDER BY u.fecha_registro DESC
                `;
            } else if (role) {
                users = await sql`
                    SELECT u.id, CONCAT(u.nombre, ' ', COALESCE(u.apellido, '')) as full_name,
                           u.email, u.role, u.activo as active, u.fecha_registro as created_at,
                           e.nombre as "schoolName", u.escuela_id as school_id
                    FROM usuarios u
                    LEFT JOIN escuelas e ON u.escuela_id = e.id
                    WHERE u.role = ${role}
                    ORDER BY u.fecha_registro DESC
                `;
            } else {
                users = await sql`
                    SELECT u.id, CONCAT(u.nombre, ' ', COALESCE(u.apellido, '')) as full_name,
                           u.email, u.role, u.activo as active, u.fecha_registro as created_at,
                           e.nombre as "schoolName", u.escuela_id as school_id
                    FROM usuarios u
                    LEFT JOIN escuelas e ON u.escuela_id = e.id
                    ORDER BY u.fecha_registro DESC
                `;
            }

            return res.status(200).json(users);
        }

        // CREATE User
        if (req.method === 'POST') {
            const { school_id, full_name, email, password, role } = req.body;

            if (!full_name || !email || !password || !role) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            // Check if email exists
            const existing = await sql`SELECT id FROM usuarios WHERE email = ${email}`;
            if (existing.length > 0) {
                return res.status(409).json({ error: 'User with this email already exists' });
            }

            // Split full_name into nombre/apellido
            const parts = full_name.split(' ');
            const nombre = parts[0] || full_name;
            const apellido = parts.slice(1).join(' ') || '';

            const result = await sql`
                INSERT INTO usuarios (nombre, apellido, email, password, role, escuela_id, activo)
                VALUES (${nombre}, ${apellido}, ${email}, ${password}, ${role}, ${school_id || null}, true)
                RETURNING id, CONCAT(nombre, ' ', COALESCE(apellido, '')) as full_name, email, role, escuela_id as school_id
            `;

            return res.status(201).json(result[0]);
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
