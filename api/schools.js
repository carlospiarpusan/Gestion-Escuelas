import { sql } from './_db.js';

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const schools = await sql`
        SELECT s.*, 
        (SELECT COUNT(*) FROM users u WHERE u.school_id = s.id AND u.role = 'student') as students
        FROM schools s
        ORDER BY s.created_at DESC
      `;
            // Map DB fields to frontend expected fields if necessary (but frontend expects same names mostly)
            return res.status(200).json(schools);
        }

        if (req.method === 'POST') {
            const { name, plan, active, address, phone } = req.body;
            // Simple slug: name + random 4 chars to ensure uniqueness roughly
            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(1000 + Math.random() * 9000);

            const result = await sql`
        INSERT INTO schools (name, slug, plan_type, active, address, phone)
        VALUES (${name}, ${slug}, ${plan}, ${active}, ${address}, ${phone})
        RETURNING *
      `;

            return res.status(201).json(result[0]);
        }

        // Handle DELETE
        if (req.method === 'DELETE') {
            const { id } = req.query;
            if (!id) return res.status(400).json({ error: 'ID is required' });

            await sql`DELETE FROM schools WHERE id = ${id}`;
            return res.status(200).json({ message: 'School deleted' });
        }

        // Handle PUT (Edit)
        if (req.method === 'PUT') {
            const { id, name, plan, active, address, phone } = req.body;

            const result = await sql`
            UPDATE schools 
            SET name = ${name}, plan_type = ${plan}, active = ${active}, 
                address = ${address}, phone = ${phone}, updated_at = NOW()
            WHERE id = ${id}
            RETURNING *
        `;
            return res.status(200).json(result[0]);
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
