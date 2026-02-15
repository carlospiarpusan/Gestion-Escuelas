import express from 'express';
import { getAllPagos, createPago, updatePago } from '../controllers/pagosController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateToken, getAllPagos);
router.post('/', authenticateToken, createPago);
router.put('/:id', authenticateToken, updatePago);

export default router;
