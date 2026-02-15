import { Response } from 'express';
import pool from '../config/database';
import { AuthRequest } from '../middleware/auth';

export const getAllResultados = async (req: AuthRequest, res: Response) => {
  try {
    let query = 'SELECT * FROM resultados_examen';
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
    
    res.json(result.rows.map(r => ({
      ...r,
      alumnoId: r.alumno_id,
      escuelaId: r.escuela_id,
      tiempoTotal: r.tiempo_total,
    })));
  } catch (error) {
    console.error('Error obteniendo resultados:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const createResultado = async (req: AuthRequest, res: Response) => {
  try {
    const { alumnoId, escuelaId, preguntas, respuestas, puntuacion, aprobado, tiempoTotal } = req.body;

    const result = await pool.query(
      `INSERT INTO resultados_examen (alumno_id, escuela_id, preguntas, respuestas, puntuacion, aprobado, tiempo_total)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [alumnoId, escuelaId, JSON.stringify(preguntas), JSON.stringify(respuestas), puntuacion, aprobado, tiempoTotal]
    );

    res.status(201).json({
      ...result.rows[0],
      alumnoId: result.rows[0].alumno_id,
      escuelaId: result.rows[0].escuela_id,
      tiempoTotal: result.rows[0].tiempo_total,
    });
  } catch (error) {
    console.error('Error creando resultado:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
