import { sql } from './_db.js';

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const { category } = req.query;
            let questions;
            if (category) {
                questions = await sql`SELECT * FROM questions WHERE category = ${category} AND is_active = true ORDER BY created_at DESC`;
            } else {
                questions = await sql`SELECT * FROM questions WHERE is_active = true ORDER BY created_at DESC`;
            }
            return res.status(200).json(questions);
        }

        if (req.method === 'POST') {
            const data = req.body;

            if (Array.isArray(data)) {
                // Bulk insert
                const results = [];
                for (const q of data) {
                    const { category, question_text, option_a, option_b, option_c, option_d, correct_option } = q;
                    const result = await sql`
                        INSERT INTO questions (category, question_text, option_a, option_b, option_c, option_d, correct_option)
                        VALUES (${category}, ${question_text}, ${option_a}, ${option_b}, ${option_c}, ${option_d}, ${correct_option})
                        RETURNING *
                    `;
                    results.push(result[0]);
                }
                return res.status(201).json({ message: `Successfully imported ${results.length} questions`, data: results });
            } else {
                // Single insert
                const { category, question_text, option_a, option_b, option_c, option_d, correct_option } = data;
                const result = await sql`
                    INSERT INTO questions (category, question_text, option_a, option_b, option_c, option_d, correct_option)
                    VALUES (${category}, ${question_text}, ${option_a}, ${option_b}, ${option_c}, ${option_d}, ${correct_option})
                    RETURNING *
                `;
                return res.status(201).json(result[0]);
            }
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
