import Router from 'express';
import workOrderRoutes from './workOrders';
import userRoutes from './users';

const router = Router();

router.use('/workorders', workOrderRoutes);
router.use('/users', userRoutes);

export default router;
