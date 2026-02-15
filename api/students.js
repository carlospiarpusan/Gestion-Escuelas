import { sql } from './_db.js';

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const { school_id } = req.query;

            // Join usuarios + student_details + pagos to get full student data
            // Ordered from oldest to newest registration
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
                    ORDER BY COALESCE(sd.registration_date, u.fecha_registro) ASC
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
                    ORDER BY COALESCE(sd.registration_date, u.fecha_registro) ASC
                `;
            }

            return res.status(200).json(students);
        }

        if (req.method === 'POST') {
            const {
                cedula, name, email, phone, address,
                category, courseValue, contractNumber,
                initialPayment, paymentMethod,
                tramitadorId, tramitadorFee,
                schoolId
            } = req.body;

            // Split name into nombre + apellido
            const parts = (name || '').trim().split(/\s+/);
            const nombre = parts[0] || '';
            const apellido = parts.slice(1).join(' ') || '';

            // 1. Insert into usuarios
            const userResult = await sql`
                INSERT INTO usuarios (email, password, nombre, apellido, role, telefono, direccion, escuela_id, activo)
                VALUES (
                    ${email || `${cedula}@alumno.local`},
                    ${cedula},
                    ${nombre},
                    ${apellido},
                    'alumno',
                    ${phone || null},
                    ${address || null},
                    ${schoolId || null},
                    true
                )
                RETURNING id
            `;

            const userId = userResult[0].id;

            // 2. Insert into student_details
            await sql`
                INSERT INTO student_details (user_id, cedula, license_category, course_value, contract_number, tramitador_id, tramitador_fee, registration_date)
                VALUES (
                    ${userId},
                    ${cedula},
                    ${category},
                    ${parseFloat(courseValue) || 0},
                    ${contractNumber || null},
                    ${tramitadorId || null},
                    ${parseFloat(tramitadorFee) || 0},
                    NOW()
                )
            `;

            // 3. Insert initial payment if provided
            const paymentAmount = parseFloat(initialPayment);
            if (paymentAmount > 0) {
                // Map frontend values to DB check constraint values
                const methodMap = { 'Efectivo': 'efectivo', 'Tarjeta': 'tarjeta', 'Nequi': 'transferencia', 'Sistecredito': 'transferencia' };
                const dbMethod = methodMap[paymentMethod] || 'efectivo';

                await sql`
                    INSERT INTO pagos (alumno_id, escuela_id, monto, concepto, metodo_pago, estado, fecha)
                    VALUES (
                        ${userId},
                        ${schoolId || null},
                        ${paymentAmount},
                        'Abono inicial - Matrícula',
                        ${dbMethod},
                        'pagado',
                        NOW()
                    )
                `;
            }

            return res.status(201).json({ id: userId, message: 'Estudiante registrado exitosamente' });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
