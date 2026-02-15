import { Response } from 'express';
import pool from '../config/database';
import { AuthRequest } from '../middleware/auth';

export const getAllEscuelas = async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM escuelas ORDER BY fecha_creacion DESC'
    );
    
    res.json(result.rows.map(e => ({
      ...e,
      fechaCreacion: e.fecha_creacion,
    })));
  } catch (error) {
    console.error('Error obteniendo escuelas:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const createEscuela = async (req: AuthRequest, res: Response) => {
  try {
    const { nombre, direccion, telefono, email, cif, activo } = req.body;

    const result = await pool.query(
      `INSERT INTO escuelas (nombre, direccion, telefono, email, cif, activo)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [nombre, direccion, telefono, email, cif, activo ?? true]
    );

    res.status(201).json({
      ...result.rows[0],
      fechaCreacion: result.rows[0].fecha_creacion,
    });
  } catch (error: any) {
    console.error('Error creando escuela:', error);
    if (error.code === '23505') {
      return res.status(400).json({ error: 'El CIF ya existe' });
    }
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const updateEscuela = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, direccion, telefono, email, cif, activo } = req.body;

    const result = await pool.query(
      `UPDATE escuelas 
       SET nombre = $1, direccion = $2, telefono = $3, email = $4, cif = $5, activo = $6
       WHERE id = $7
       RETURNING *`,
      [nombre, direccion, telefono, email, cif, activo, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Escuela no encontrada' });
    }

    res.json({
      ...result.rows[0],
      fechaCreacion: result.rows[0].fecha_creacion,
    });
  } catch (error) {
    console.error('Error actualizando escuela:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const deleteEscuela = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM escuelas WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Escuela no encontrada' });
    }

    res.json({ message: 'Escuela eliminada' });
  } catch (error) {
    console.error('Error eliminando escuela:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
