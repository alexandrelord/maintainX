import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';

const dateFormat: Intl.DateTimeFormatOptions = {
	year: '2-digit',
	month: '2-digit',
	day: '2-digit',
	hour: '2-digit',
	minute: '2-digit',
};

const logger = (req: Request, res: Response, next: NextFunction) => {
	const date = new Date(Date.now()).toLocaleString('en-GB', dateFormat);
	const method = chalk.white(req.method);
	const url = chalk.white(req.url);
	const status = chalk.greenBright(res.statusCode);
	console.log(`${date} ${method} from ${url} ${status}`);
	next();
};

export default logger;
