import { Router } from 'express';
import { getVehiculos, createVehiculo, updateVehiculo, deleteVehiculo } from '../controllers/vehiculosController';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);

router.get('/', requireRole('super_admin', 'admin', 'instructor', 'secretaria', 'supervisor'), getVehiculos);
router.post('/', requireRole('super_admin', 'admin'), createVehiculo);
router.put('/:id', requireRole('super_admin', 'admin'), updateVehiculo);
router.delete('/:id', requireRole('super_admin', 'admin'), deleteVehiculo);

export default router;
