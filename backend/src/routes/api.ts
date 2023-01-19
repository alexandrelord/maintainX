import Router from 'express';
import workOrderRoutes from './workOrders';

const router = Router();

router.use('/workorders', workOrderRoutes);

export default router;
