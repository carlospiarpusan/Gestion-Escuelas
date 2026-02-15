import express from 'express';
import { getAllEscuelas, createEscuela, updateEscuela, deleteEscuela } from '../controllers/escuelasController';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateToken, getAllEscuelas);
router.post('/', authenticateToken, requireRole('super_admin'), createEscuela);
router.put('/:id', authenticateToken, requireRole('super_admin'), updateEscuela);
router.delete('/:id', authenticateToken, requireRole('super_admin'), deleteEscuela);

export default router;
