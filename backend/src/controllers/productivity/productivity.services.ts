import sql from '../../db';
import { HttpException } from '../../exceptions/HttpException';

export const queryInactiveUsers = async () => {
	const response = await sql('SELECT * FROM users WHERE id NOT IN (SELECT user_id FROM work_order_assignees WHERE work_order_id IN (SELECT id FROM work_orders WHERE status = "OPEN"))');

	if (!response.length) {
		throw new HttpException(404, 'No users found');
	}
	return response;
};

//** Backtracking SQL Logic */
/*
    Simple Language: 
    Match work_order ids from tables(work_orders and work_order_assignees) where work_orders.status = "OPEN"

    SQL Query: 
    SELECT * FROM work_order_assignees INNER JOIN work_orders ON work_orders.id = work_order_assignees.work_order_id WHERE work_orders.status = "OPEN"

    Result1:
    [
        {
            "work_order_id": 2,
            "user_id": 3,
            "id": 2,
            "name": "Clean Cat Morty's litterbox",
            "status": "OPEN"
        },
        ...
    ]

    Then:
    Simple Language:
    Select all user ids ( they are the users assigned to a work_order ) from Result1

    SQL Query:
    SELECT work_order_assignees.user_id FROM Result1
    
    Result2:
    [
        {
            "user_id": 3,
        },
        ...
    ]

    Then:
    Simple Language:
    Select all users where the id is not in Result2
    ( the users who are not assigned to any work_order or any open work_order )

    SQL Query:
    SELECT * FROM users WHERE users.id NOT IN Result2
*/
