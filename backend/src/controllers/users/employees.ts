import { Request, Response, NextFunction } from 'express';
import { queryUsers } from './users.services';

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await queryUsers();
		res.status(200).json({ data: users });
	} catch (error) {
		next(error);
	}
};

export { getUsers };
