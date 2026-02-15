import { sql } from './_db.js';

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const { school_id } = req.query;

            const students = await sql`
        SELECT u.id, u.full_name as name, u.email, sd.cedula as document, 
               sd.license_category as category, sd.course_value as "courseValue",
               sd.registration_date as registered,
               COALESCE((SELECT SUM(amount) FROM payments WHERE student_id = u.id), 0) as balance
        FROM users u
        JOIN student_details sd ON u.id = sd.user_id
        WHERE u.role = 'student' ${school_id ? sql`AND u.school_id = ${school_id}` : sql``}
        ORDER BY sd.registration_date DESC
      `;
            return res.status(200).json(students);
        }

        // Add registration and payment logic if needed here

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
