import { sql } from './_db.js';

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const schools = await sql`
                SELECT e.id, e.nombre as name, e.direccion as address, e.telefono as phone,
                       e.email, e.cif as nit, e.activo as active, e.fecha_creacion as created_at,
                       (SELECT COUNT(*)::int FROM usuarios u WHERE u.escuela_id = e.id AND u.role = 'student') as students
                FROM escuelas e
                ORDER BY e.fecha_creacion DESC
            `;
            return res.status(200).json(schools);
        }

        if (req.method === 'POST') {
            const { name, plan, active, address, phone, nit, email } = req.body;

            const result = await sql`
                INSERT INTO escuelas (nombre, direccion, telefono, email, cif, activo)
                VALUES (${name}, ${address || ''}, ${phone || ''}, ${email || ''}, ${nit || ''}, ${active !== false})
                RETURNING id, nombre as name, direccion as address, telefono as phone, email, cif as nit, activo as active
            `;

            return res.status(201).json(result[0]);
        }

        if (req.method === 'PUT') {
            const { id, name, plan, active, address, phone, nit, email } = req.body;

            const result = await sql`
                UPDATE escuelas 
                SET nombre = ${name}, direccion = ${address || ''}, telefono = ${phone || ''},
                    email = ${email || ''}, cif = ${nit || ''}, activo = ${active !== false}
                WHERE id = ${id}
                RETURNING id, nombre as name, direccion as address, telefono as phone, email, cif as nit, activo as active
            `;
            return res.status(200).json(result[0]);
        }

        if (req.method === 'DELETE') {
            const { id } = req.query;
            if (!id) return res.status(400).json({ error: 'ID is required' });

            await sql`DELETE FROM escuelas WHERE id = ${id}`;
            return res.status(200).json({ message: 'School deleted' });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
