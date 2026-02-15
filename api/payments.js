import { sql } from './_db.js';

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const { alumnoId, amount, paymentMethod, concepto, schoolId } = req.body;

            if (!alumnoId || !amount) {
                return res.status(400).json({ error: 'alumnoId y amount son requeridos' });
            }

            // Map frontend values to DB check constraint values
            const methodMap = {
                'Efectivo': 'efectivo',
                'Transferencia': 'transferencia',
                'Tarjeta': 'tarjeta',
                'Sistecredito': 'transferencia'
            };
            const dbMethod = methodMap[paymentMethod] || 'efectivo';

            const result = await sql`
                INSERT INTO pagos (alumno_id, escuela_id, monto, concepto, metodo_pago, estado, fecha)
                VALUES (
                    ${alumnoId},
                    ${schoolId || null},
                    ${parseFloat(amount)},
                    ${concepto || 'Abono'},
                    ${dbMethod},
                    'pagado',
                    NOW()
                )
                RETURNING id, monto, metodo_pago, fecha
            `;

            return res.status(201).json(result[0]);
        }

        if (req.method === 'GET') {
            const { alumnoId } = req.query;
            if (!alumnoId) {
                return res.status(400).json({ error: 'alumnoId es requerido' });
            }

            const payments = await sql`
                SELECT id, monto, concepto, metodo_pago, estado, fecha
                FROM pagos
                WHERE alumno_id = ${alumnoId}
                ORDER BY fecha DESC
            `;

            return res.status(200).json(payments);
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('Payments API Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
