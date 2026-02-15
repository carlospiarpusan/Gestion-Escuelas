import express from 'express';
import { getAllRegistrosHoras, createRegistroHoras, aprobarRegistro } from '../controllers/registrosController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateToken, getAllRegistrosHoras);
router.post('/', authenticateToken, createRegistroHoras);
router.put('/:id/aprobar', authenticateToken, aprobarRegistro);

export default router;
