import { Response } from 'express';
import pool from '../config/database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../middleware/auth';

export const login = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña requeridos' });
    }

    const result = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1 AND activo = true',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        escuelaId: user.escuela_id,
      },
      (process.env.JWT_SECRET as string) || 'secret',
      { expiresIn: (process.env.JWT_EXPIRES_IN as any) || '7d' }
    );

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      token,
      user: {
        ...userWithoutPassword,
        escuelaId: user.escuela_id,
        fechaRegistro: user.fecha_registro,
      },
    });
  } catch (error: any) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error en el servidor', details: error.message });
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT id, email, nombre, apellido, role, escuela_id, telefono, direccion, fecha_registro, activo FROM usuarios WHERE id = $1',
      [req.user?.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const user = result.rows[0];
    res.json({
      ...user,
      escuelaId: user.escuela_id,
      fechaRegistro: user.fecha_registro,
    });
  } catch (error) {
    console.error('Error en getMe:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
