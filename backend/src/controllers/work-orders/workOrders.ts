import { NextFunction, Request, Response } from 'express';
import { queryWorkOrders, queryWorkOrder, insertWorkOrder, updateWorkOrderStatus } from './workOrders.services';

export const getWorkOrders = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const workOrders = await queryWorkOrders();
		res.status(200).json({ data: workOrders });
	} catch (error) {
		next(error);
	}
};

export const showWorkOrder = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;

	try {
		const workOrder = await queryWorkOrder(Number(id));
		res.status(200).json({ data: workOrder });
	} catch (error) {
		next(error);
	}
};

export const createWorkOrder = async (req: Request, res: Response, next: NextFunction) => {
	const { name } = req.body;
	const { users } = req.body;

	try {
		await insertWorkOrder(name, users);

		res.status(201).json({ message: 'Work order created successfully.' });
	} catch (error) {
		next(error);
	}
};

export const updateWorkOrder = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;
	const { status } = req.body;
	try {
		const updated = updateWorkOrderStatus(Number(id), status);
		return res.status(200).json({ data: updated });
	} catch (error) {
		next(error);
	}
};
