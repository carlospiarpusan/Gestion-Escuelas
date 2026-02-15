import { sql } from './_db.js';

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const { school_id, student_id, limit } = req.query;

            let query = sql`
                SELECT 
                    er.id,
                    er.score,
                    er.total_questions,
                    er.passed,
                    er.mode,
                    er.exam_category as category,
                    er.completed_at as date,
                    u.full_name as student,
                    s.name as school
                FROM exam_results er
                JOIN users u ON er.student_id = u.id
                JOIN schools s ON er.school_id = s.id
                WHERE 1=1
            `;

            if (school_id) {
                query = sql`${query} AND er.school_id = ${school_id}`;
            }

            if (student_id) {
                query = sql`${query} AND er.student_id = ${student_id}`;
            }

            query = sql`${query} ORDER BY er.completed_at DESC`;

            if (limit) {
                query = sql`${query} LIMIT ${limit}`;
            }

            const results = await sql`${query}`;
            return res.status(200).json(results);
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
