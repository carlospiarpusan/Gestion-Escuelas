import { Response } from 'express';
import pool from '../config/database';
import { AuthRequest } from '../middleware/auth';

export const getAllRegistrosHoras = async (req: AuthRequest, res: Response) => {
  try {
    let query = 'SELECT * FROM registros_horas';
    const params: any[] = [];

    if (req.user?.role === 'instructor') {
      query += ' WHERE instructor_id = $1';
      params.push(req.user.id);
    } else if (req.user?.escuelaId && req.user.role !== 'super_admin') {
      query += ' WHERE escuela_id = $1';
      params.push(req.user.escuelaId);
    }

    query += ' ORDER BY fecha DESC';
    const result = await pool.query(query, params);
    
    res.json(result.rows.map(r => ({
      ...r,
      instructorId: r.instructor_id,
      escuelaId: r.escuela_id,
      horaInicio: r.hora_inicio,
      horaFin: r.hora_fin,
      totalHoras: parseFloat(r.total_horas),
      createdAt: r.created_at,
    })));
  } catch (error) {
    console.error('Error obteniendo registros:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const createRegistroHoras = async (req: AuthRequest, res: Response) => {
  try {
    const { instructorId, escuelaId, fecha, horaInicio, horaFin, totalHoras, descripcion } = req.body;

    const result = await pool.query(
      `INSERT INTO registros_horas (instructor_id, escuela_id, fecha, hora_inicio, hora_fin, total_horas, descripcion)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [instructorId, escuelaId, fecha, horaInicio, horaFin, totalHoras, descripcion]
    );

    res.status(201).json({
      ...result.rows[0],
      instructorId: result.rows[0].instructor_id,
      escuelaId: result.rows[0].escuela_id,
      horaInicio: result.rows[0].hora_inicio,
      horaFin: result.rows[0].hora_fin,
      totalHoras: parseFloat(result.rows[0].total_horas),
    });
  } catch (error) {
    console.error('Error creando registro:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const aprobarRegistro = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'UPDATE registros_horas SET aprobado = true WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    res.json({
      ...result.rows[0],
      instructorId: result.rows[0].instructor_id,
      escuelaId: result.rows[0].escuela_id,
      horaInicio: result.rows[0].hora_inicio,
      horaFin: result.rows[0].hora_fin,
      totalHoras: parseFloat(result.rows[0].total_horas),
    });
  } catch (error) {
    console.error('Error aprobando registro:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
