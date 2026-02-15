import express from 'express';
import { getAllUsers, createUser, updateUser, deleteUser } from '../controllers/usersController';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateToken, getAllUsers);
router.post('/', authenticateToken, requireRole('super_admin', 'admin'), createUser);
router.put('/:id', authenticateToken, requireRole('super_admin', 'admin'), updateUser);
router.delete('/:id', authenticateToken, requireRole('super_admin', 'admin'), deleteUser);

export default router;
