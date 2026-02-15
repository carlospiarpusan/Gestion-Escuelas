import express from 'express';
import { getAllResultados, createResultado } from '../controllers/examenesController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateToken, getAllResultados);
router.post('/', authenticateToken, createResultado);

export default router;
