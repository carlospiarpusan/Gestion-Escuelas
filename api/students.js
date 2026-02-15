import { sql } from './_db.js';

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const { school_id } = req.query;

            // Join usuarios + student_details + pagos to get full student data
            let students;
            if (school_id) {
                students = await sql`
                    SELECT u.id,
                           CONCAT(u.nombre, ' ', COALESCE(u.apellido, '')) as name,
                           u.email, u.telefono as phone,
                           COALESCE(sd.cedula, '') as document,
                           COALESCE(sd.license_category, '') as category,
                           COALESCE(sd.course_value, 0)::numeric as "courseValue",
                           COALESCE(sd.contract_number, '') as "contractNumber",
                           COALESCE(
                               (SELECT SUM(p.monto) FROM pagos p WHERE p.alumno_id = u.id),
                               0
                           )::numeric as balance,
                           COALESCE(
                               (SELECT p.metodo_pago FROM pagos p WHERE p.alumno_id = u.id ORDER BY p.fecha DESC LIMIT 1),
                               ''
                           ) as "lastPaymentMethod",
                           TO_CHAR(COALESCE(sd.registration_date, u.fecha_registro), 'YYYY-MM-DD') as registered,
                           u.activo as active,
                           u.escuela_id as school_id
                    FROM usuarios u
                    LEFT JOIN student_details sd ON u.id = sd.user_id
                    WHERE u.role = 'alumno' AND u.escuela_id = ${school_id}::uuid
                    ORDER BY COALESCE(sd.registration_date, u.fecha_registro) DESC
                `;
            } else {
                students = await sql`
                    SELECT u.id,
                           CONCAT(u.nombre, ' ', COALESCE(u.apellido, '')) as name,
                           u.email, u.telefono as phone,
                           COALESCE(sd.cedula, '') as document,
                           COALESCE(sd.license_category, '') as category,
                           COALESCE(sd.course_value, 0)::numeric as "courseValue",
                           COALESCE(sd.contract_number, '') as "contractNumber",
                           COALESCE(
                               (SELECT SUM(p.monto) FROM pagos p WHERE p.alumno_id = u.id),
                               0
                           )::numeric as balance,
                           COALESCE(
                               (SELECT p.metodo_pago FROM pagos p WHERE p.alumno_id = u.id ORDER BY p.fecha DESC LIMIT 1),
                               ''
                           ) as "lastPaymentMethod",
                           TO_CHAR(COALESCE(sd.registration_date, u.fecha_registro), 'YYYY-MM-DD') as registered,
                           u.activo as active,
                           u.escuela_id as school_id
                    FROM usuarios u
                    LEFT JOIN student_details sd ON u.id = sd.user_id
                    WHERE u.role = 'alumno'
                    ORDER BY COALESCE(sd.registration_date, u.fecha_registro) DESC
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
