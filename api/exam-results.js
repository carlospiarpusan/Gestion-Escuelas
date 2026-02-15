import { sql } from './_db.js';

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const { school_id, student_id } = req.query;

            let results;
            if (school_id && student_id) {
                results = await sql`
                    SELECT r.id, r.puntuacion as score, r.aprobado as passed,
                           r.fecha as date, r.preguntas, r.respuestas, r.tiempo_total,
                           CONCAT(u.nombre, ' ', COALESCE(u.apellido, '')) as student,
                           e.nombre as school
                    FROM resultados_examen r
                    LEFT JOIN usuarios u ON r.alumno_id = u.id
                    LEFT JOIN escuelas e ON r.escuela_id = e.id
                    WHERE r.escuela_id = ${school_id}::uuid AND r.alumno_id = ${student_id}::uuid
                    ORDER BY r.fecha DESC
                `;
            } else if (school_id) {
                results = await sql`
                    SELECT r.id, r.puntuacion as score, r.aprobado as passed,
                           r.fecha as date, r.preguntas, r.respuestas, r.tiempo_total,
                           CONCAT(u.nombre, ' ', COALESCE(u.apellido, '')) as student,
                           e.nombre as school
                    FROM resultados_examen r
                    LEFT JOIN usuarios u ON r.alumno_id = u.id
                    LEFT JOIN escuelas e ON r.escuela_id = e.id
                    WHERE r.escuela_id = ${school_id}::uuid
                    ORDER BY r.fecha DESC
                `;
            } else if (student_id) {
                results = await sql`
                    SELECT r.id, r.puntuacion as score, r.aprobado as passed,
                           r.fecha as date, r.preguntas, r.respuestas, r.tiempo_total,
                           CONCAT(u.nombre, ' ', COALESCE(u.apellido, '')) as student,
                           e.nombre as school
                    FROM resultados_examen r
                    LEFT JOIN usuarios u ON r.alumno_id = u.id
                    LEFT JOIN escuelas e ON r.escuela_id = e.id
                    WHERE r.alumno_id = ${student_id}::uuid
                    ORDER BY r.fecha DESC
                `;
            } else {
                results = await sql`
                    SELECT r.id, r.puntuacion as score, r.aprobado as passed,
                           r.fecha as date, r.preguntas, r.respuestas, r.tiempo_total,
                           CONCAT(u.nombre, ' ', COALESCE(u.apellido, '')) as student,
                           e.nombre as school
                    FROM resultados_examen r
                    LEFT JOIN usuarios u ON r.alumno_id = u.id
                    LEFT JOIN escuelas e ON r.escuela_id = e.id
                    ORDER BY r.fecha DESC
                `;
            }

            return res.status(200).json(results);
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
