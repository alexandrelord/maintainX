import Router from 'express';
import workOrderRoutes from './workOrders';
import userRoutes from './users';
import productivityRoutes from './productivity';

const router = Router();

router.use('/workorders', workOrderRoutes);
router.use('/users', userRoutes);
router.use('/productivity', productivityRoutes);

export default router;
