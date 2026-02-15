import { sql } from './_db.js';

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const { school_id } = req.query;

            let students;
            if (school_id) {
                students = await sql`
                    SELECT u.id, CONCAT(u.nombre, ' ', COALESCE(u.apellido, '')) as name,
                           u.email, u.telefono as phone, u.direccion as address,
                           u.fecha_registro as registered, u.activo as active,
                           u.escuela_id as school_id
                    FROM usuarios u
                    WHERE u.role = 'student' AND u.escuela_id = ${school_id}::uuid
                    ORDER BY u.fecha_registro DESC
                `;
            } else {
                students = await sql`
                    SELECT u.id, CONCAT(u.nombre, ' ', COALESCE(u.apellido, '')) as name,
                           u.email, u.telefono as phone, u.direccion as address,
                           u.fecha_registro as registered, u.activo as active,
                           u.escuela_id as school_id
                    FROM usuarios u
                    WHERE u.role = 'student'
                    ORDER BY u.fecha_registro DESC
                `;
            }

            return res.status(200).json(students);
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
