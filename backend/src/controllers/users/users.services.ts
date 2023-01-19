import sql from '../../db';
import { HttpException } from '../../exceptions/HttpException';

export const queryUsers = async () => {
	const response = await sql('SELECT * FROM users');
	if (!response.length) {
		throw new HttpException(404, 'Users not found');
	}
	return response;
};
