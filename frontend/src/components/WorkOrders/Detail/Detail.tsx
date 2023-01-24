import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useFetchReducer from '../../../hooks/useFetchReducer';
import { apiCall } from '../../../services/apiCall';
import { WorkOrder } from '../../../types/types';
import styles from './Detail.module.css';

const Detail = () => {
    const [workOrder, dispatchWorkOrder] = useFetchReducer<WorkOrder>({} as WorkOrder);
    const { id } = useParams();

    useEffect(() => {
        const fetchWorkOrderDetail = async () => {
            dispatchWorkOrder({ type: 'FETCH_INIT' });
            try {
                const workOrder = await handleFetchData(`workorders/${id}`);
                dispatchWorkOrder({ type: 'FETCH_SUCCESS', payload: workOrder });
            } catch (error) {
                dispatchWorkOrder({ type: 'FETCH_FAILURE' });
            }
        };
        fetchWorkOrderDetail();
    }, []);

    const handleFetchData = async (endpoint: string) => {
        const response = await apiCall.get(endpoint);
        return response.data;
    };

    const handleUpdateWorkOrder = async () => {
        const status = workOrder.data.status === 'OPEN' ? 'CLOSED' : 'OPEN';
        const updatedWorkOrder = { ...workOrder.data, status };

        try {
            await apiCall.patch(`workorders/${id}`, updatedWorkOrder);
            dispatchWorkOrder({ type: 'FETCH_SUCCESS', payload: updatedWorkOrder });
        } catch (error) {
            dispatchWorkOrder({ type: 'FETCH_FAILURE' });
        }
    };

    return (
        <div className="container">
            <h1>Work Order</h1>
            {workOrder.isError && <div>Something went wrong ...</div>}
            {workOrder.isLoading ? (
                <div>Loading ...</div>
            ) : (
                <div className={styles.card}>
                    <div>
                        <div className={styles.avatar}>{workOrder.data.id}</div>
                        <h2>{workOrder.data.name}</h2>

                        <div className={styles.assignees}>
                            <h3>Assignees</h3>
                            <ul>
                                {workOrder.data.assignees && workOrder.data.assignees.length > 0 ? (
                                    workOrder.data.assignees.map((assignee) => (
                                        <li key={assignee.id}>
                                            <div className={styles.img}></div>
                                            <p className={styles.tooltip}>
                                                {assignee.name}

                                                <span className={styles.tooltiptext}>{assignee.email}</span>
                                            </p>
                                        </li>
                                    ))
                                ) : (
                                    <li>No assignees</li>
                                )}
                            </ul>
                        </div>
                        <div className={styles.status}>
                            <p>{workOrder.data.status === 'OPEN' ? <span className={styles.open}>{workOrder.data.status}</span> : <span className={styles.closed}>{workOrder.data.status}</span>}</p>
                            <button onClick={handleUpdateWorkOrder}>Update Status</button>
                        </div>
                    </div>
                </div>
            )}

            <div>
                <Link to="/workorders">
                    <button>Back</button>
                </Link>
            </div>
        </div>
    );
};

export default Detail;
