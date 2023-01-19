import sql from '../../db';
import { HttpException } from '../../exceptions/HttpException';

/**
 * @return {object} workOrders
 * @throws {StatusError} if no work orders are found
 *
 * This function queries the database for all work orders.
 */

export const queryWorkOrders = async (): Promise<object> => {
	// Get all work orders and order them by status (open, closed, other)
	const response = await sql('SELECT * FROM work_orders ORDER BY CASE WHEN status = "OPEN" THEN 1 WHEN status = "CLOSED" THEN 2 ELSE 3 END');

	if (!response.length) {
		throw new HttpException(404, 'Work orders not found.');
	}

	return response;
};

// ----------------------------------------------

/**
 * @param {number} id
 * @return {object} workOrder
 * @throws {StatusError} if no work order is found
 *
 * This function queries the database for a single work order.
 */

export const queryWorkOrder = async (id: number): Promise<object> => {
	const response = await sql(
		'SELECT work_orders.id AS workOrderId, work_orders.name AS workOrderName, work_orders.status AS workOrderStatus, users.id AS userId, users.name AS userName, users.email AS userEmail FROM work_orders LEFT JOIN work_order_assignees ON work_orders.id=work_order_assignees.work_order_id LEFT JOIN users ON work_order_assignees.user_id = users.id WHERE work_orders.id = ?',
		id,
	);

	if (!response.length) {
		throw new HttpException(404, 'Work order not found.');
	}

	if (!response[0].userId) {
		return {
			id: response[0].workOrderId,
			name: response[0].workOrderName,
			status: response[0].workOrderStatus,
			assignees: [],
		};
	}

	const assignees = response.map((row) => ({
		id: row.userId,
		name: row.userName,
		email: row.userEmail,
	}));

	return {
		id: response[0].workOrderId,
		name: response[0].workOrderName,
		status: response[0].workOrderStatus,
		assignees,
	};
};

// ----------------------------------------------

/**
 * @param {string} workOrderName
 * @param {number[]} assigneesId
 * @return {object} workOrder
 *
 * This function inserts a new work order into the database.
 */

export const insertWorkOrder = async (workOrderName: string, assigneesId: number[]): Promise<void> => {
	const response = await sql('INSERT INTO work_orders (name, status) VALUES (?, "OPEN") RETURNING *', workOrderName);

	// insert assignees into the work_order_assignees table
	if (assigneesId) {
		const workOrderId = response[0].id;
		insertWorkOrderAssignees(workOrderId, assigneesId);
	}
};

// ----------------------------------------------

/**
 * @param {number} workOrderId
 * @param {number[]} assigneesId
 *
 * This function inserts assignees into the work_order_assignees table.
 */

const insertWorkOrderAssignees = async (workOrderId: number, assigneesId: number[]): Promise<void> => {
	await sql('INSERT INTO work_order_assignees (work_order_id, user_id) VALUES ' + assigneesId.map((assigneeId: number) => `(${workOrderId}, ${assigneeId})`).join(','));
};

// ----------------------------------------------

/**
 * @param {number} id
 * @param {string} status
 * @return {object} workOrder
 *
 * This function updates the status of a work order.
 */

export const updateWorkOrderStatus = async (id: number, status: string): Promise<object> => {
	const response = await sql('UPDATE work_orders SET status = ? WHERE id = ? RETURNING *', status, id);
	return response;
};

// ----------------------------------------------

/**
 * Comments
 */

/** SQL CASE */
/*  CASE 
        WHEN condition1 THEN value1
        WHEN condition2 THEN value2
        ELSE value3
    END 
*/
/** SQL ORDER BY */
/*  ORDER BY ... ASC/DESC (default is ASC)
 */

// For getWorkOrders()
// The order of the work orders will be: open, closed, other
// 1,2,3 are sortable values.
// Basically saying to put the ACTIVE rows first (1), then the INACTIVE rows (2), then any rows that are neither (3) at the end.
