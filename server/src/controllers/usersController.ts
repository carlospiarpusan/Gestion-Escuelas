import { Response } from 'express';
import pool from '../config/database';
import bcrypt from 'bcryptjs';
import { AuthRequest } from '../middleware/auth';

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    let query = 'SELECT id, email, nombre, apellido, role, escuela_id, telefono, direccion, fecha_registro, activo FROM usuarios';
    const params: any[] = [];

    if (req.user?.role !== 'super_admin' && req.user?.escuelaId) {
      query += ' WHERE escuela_id = $1';
      params.push(req.user.escuelaId);
    }

    query += ' ORDER BY fecha_registro DESC';

    const result = await pool.query(query, params);
    
    res.json(result.rows.map(u => ({
      ...u,
      escuelaId: u.escuela_id,
      fechaRegistro: u.fecha_registro,
    })));
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const createUser = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password, nombre, apellido, role, escuelaId, telefono, direccion, activo } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO usuarios (email, password, nombre, apellido, role, escuela_id, telefono, direccion, activo)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id, email, nombre, apellido, role, escuela_id, telefono, direccion, fecha_registro, activo`,
      [email, hashedPassword, nombre, apellido, role, escuelaId, telefono, direccion, activo ?? true]
    );

    res.status(201).json({
      ...result.rows[0],
      escuelaId: result.rows[0].escuela_id,
      fechaRegistro: result.rows[0].fecha_registro,
    });
  } catch (error: any) {
    console.error('Error creando usuario:', error);
    if (error.code === '23505') {
      return res.status(400).json({ error: 'El email ya existe' });
    }
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { email, password, nombre, apellido, role, escuelaId, telefono, direccion, activo } = req.body;

    let query = `UPDATE usuarios SET email = $1, nombre = $2, apellido = $3, role = $4, escuela_id = $5, telefono = $6, direccion = $7, activo = $8`;
    let params: any[] = [email, nombre, apellido, role, escuelaId, telefono, direccion, activo];

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query += `, password = $9 WHERE id = $10 RETURNING id, email, nombre, apellido, role, escuela_id, telefono, direccion, fecha_registro, activo`;
      params.push(hashedPassword, id);
    } else {
      query += ` WHERE id = $9 RETURNING id, email, nombre, apellido, role, escuela_id, telefono, direccion, fecha_registro, activo`;
      params.push(id);
    }

    const result = await pool.query(query, params);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({
      ...result.rows[0],
      escuelaId: result.rows[0].escuela_id,
      fechaRegistro: result.rows[0].fecha_registro,
    });
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM usuarios WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    console.error('Error eliminando usuario:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
