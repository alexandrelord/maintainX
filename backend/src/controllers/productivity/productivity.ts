import { NextFunction, Request, Response } from 'express';
import { queryInactiveUsers } from './productivity.services';

export const getInactiveUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await queryInactiveUsers();

		return res.status(200).json({ data: users });
	} catch (error) {
		next(error);
	}
};
