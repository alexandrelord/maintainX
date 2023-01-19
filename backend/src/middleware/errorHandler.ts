import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions/HttpException';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof HttpException) {
		return res.status(err.status).send(err.message);
	}

	return res.status(500).json({ message: 'Something went wrong' });
};

export default errorHandler;
