import express from 'express';
import { getWorkOrders, showWorkOrder, createWorkOrder, updateWorkOrder } from '../controllers/work-orders/workOrders';

const router = express.Router();

router.get('/', getWorkOrders);
router.post('/new', createWorkOrder);
router.get('/:id', showWorkOrder);
router.patch('/:id', updateWorkOrder);

export = router;
