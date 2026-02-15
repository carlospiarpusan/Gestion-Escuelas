import { Response } from 'express';
import pool from '../config/database';
import { AuthRequest } from '../middleware/auth';

export const getAllPagos = async (req: AuthRequest, res: Response) => {
  try {
    let query = 'SELECT * FROM pagos';
    const params: any[] = [];

    if (req.user?.role === 'alumno') {
      query += ' WHERE alumno_id = $1';
      params.push(req.user.id);
    } else if (req.user?.escuelaId && req.user.role !== 'super_admin') {
      query += ' WHERE escuela_id = $1';
      params.push(req.user.escuelaId);
    }

    query += ' ORDER BY fecha DESC';
    const result = await pool.query(query, params);
    
    res.json(result.rows.map(p => ({
      ...p,
      alumnoId: p.alumno_id,
      escuelaId: p.escuela_id,
      metodoPago: p.metodo_pago,
      monto: parseFloat(p.monto),
    })));
  } catch (error) {
    console.error('Error obteniendo pagos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const createPago = async (req: AuthRequest, res: Response) => {
  try {
    const { alumnoId, escuelaId, monto, concepto, metodoPago } = req.body;

    const result = await pool.query(
      `INSERT INTO pagos (alumno_id, escuela_id, monto, concepto, metodo_pago)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [alumnoId, escuelaId, monto, concepto, metodoPago]
    );

    res.status(201).json({
      ...result.rows[0],
      alumnoId: result.rows[0].alumno_id,
      escuelaId: result.rows[0].escuela_id,
      metodoPago: result.rows[0].metodo_pago,
      monto: parseFloat(result.rows[0].monto),
    });
  } catch (error) {
    console.error('Error creando pago:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const updatePago = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const result = await pool.query(
      'UPDATE pagos SET estado = $1 WHERE id = $2 RETURNING *',
      [estado, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pago no encontrado' });
    }

    res.json({
      ...result.rows[0],
      alumnoId: result.rows[0].alumno_id,
      escuelaId: result.rows[0].escuela_id,
      metodoPago: result.rows[0].metodo_pago,
      monto: parseFloat(result.rows[0].monto),
    });
  } catch (error) {
    console.error('Error actualizando pago:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
