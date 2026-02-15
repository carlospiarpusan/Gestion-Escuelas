import { Response } from 'express';
import pool from '../config/database';
import { AuthRequest } from '../middleware/auth';

export const getVehiculos = async (req: AuthRequest, res: Response) => {
    try {
        const { escuelaId } = req.user!;

        const result = await pool.query(
            'SELECT * FROM vehiculos WHERE escuela_id = $1 ORDER BY created_at DESC',
            [escuelaId]
        );

        res.json(result.rows.map(v => ({
            id: v.id,
            escuelaId: v.escuela_id,
            marca: v.marca,
            modelo: v.modelo,
            placa: v.placa,
            tipo: v.tipo,
            estado: v.estado,
            ultimoMantenimiento: v.ultimo_mantenimiento,
            proximoMantenimiento: v.proximo_mantenimiento,
            imagen: v.imagen,
            activo: v.activo,
        })));
    } catch (error) {
        console.error('Error obteniendo vehículos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

export const createVehiculo = async (req: AuthRequest, res: Response) => {
    try {
        const { escuelaId } = req.user!;
        const { marca, modelo, placa, tipo, estado, ultimoMantenimiento, proximoMantenimiento, imagen } = req.body;

        const result = await pool.query(
            `INSERT INTO vehiculos (
        escuela_id, marca, modelo, placa, tipo, estado, 
        ultimo_mantenimiento, proximo_mantenimiento, imagen
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
            [
                escuelaId, marca, modelo, placa, tipo, estado || 'activo',
                ultimoMantenimiento, proximoMantenimiento, imagen
            ]
        );

        const v = result.rows[0];
        res.status(201).json({
            id: v.id,
            escuelaId: v.escuela_id,
            marca: v.marca,
            modelo: v.modelo,
            placa: v.placa,
            tipo: v.tipo,
            estado: v.estado,
            ultimoMantenimiento: v.ultimo_mantenimiento,
            proximoMantenimiento: v.proximo_mantenimiento,
            imagen: v.imagen,
            activo: v.activo,
        });
    } catch (error) {
        console.error('Error creando vehículo:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

export const updateVehiculo = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { escuelaId } = req.user!;
        const { marca, modelo, placa, tipo, estado, ultimoMantenimiento, proximoMantenimiento, imagen, activo } = req.body;

        const result = await pool.query(
            `UPDATE vehiculos 
       SET marca = $1, modelo = $2, placa = $3, tipo = $4, estado = $5,
           ultimo_mantenimiento = $6, proximo_mantenimiento = $7, imagen = $8, activo = $9
       WHERE id = $10 AND escuela_id = $11
       RETURNING *`,
            [
                marca, modelo, placa, tipo, estado,
                ultimoMantenimiento, proximoMantenimiento, imagen, activo,
                id, escuelaId
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Vehículo no encontrado o no autorizado' });
        }

        const v = result.rows[0];
        res.json({
            id: v.id,
            escuelaId: v.escuela_id,
            marca: v.marca,
            modelo: v.modelo,
            placa: v.placa,
            tipo: v.tipo,
            estado: v.estado,
            ultimoMantenimiento: v.ultimo_mantenimiento,
            proximoMantenimiento: v.proximo_mantenimiento,
            imagen: v.imagen,
            activo: v.activo,
        });
    } catch (error) {
        console.error('Error actualizando vehículo:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

export const deleteVehiculo = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { escuelaId } = req.user!;

        const result = await pool.query(
            'DELETE FROM vehiculos WHERE id = $1 AND escuela_id = $2 RETURNING *',
            [id, escuelaId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Vehículo no encontrado o no autorizado' });
        }

        res.json({ message: 'Vehículo eliminado' });
    } catch (error) {
        console.error('Error eliminando vehículo:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};
