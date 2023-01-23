import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useFetchReducer from '../../hooks/useFetchReducer';
import { apiCall } from '../../services/apiCall';
import { WorkOrder } from '../../types/types';
import styles from './Detail.module.css';

const Detail = () => {
    const [workOrder, dispatchWorkOrder] = useFetchReducer<WorkOrder | null>(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchWorkOrderDetail = async () => {
            dispatchWorkOrder({ type: 'FETCH_INIT' });
            const workOrder = await handleFetchData(`workorders/${id}`);
            dispatchWorkOrder({ type: 'FETCH_SUCCESS', payload: workOrder });
        };
        fetchWorkOrderDetail();
    }, []);

    const handleFetchData = async (endpoint: string) => {
        const response = await apiCall.get(endpoint);
        return response.data;
    };
    return (
        <div className={styles.container}>
            <div>
                <h1>Work Order Detail</h1>
                {workOrder.isError && <div>Something went wrong ...</div>}
                {workOrder.isLoading ? (
                    <div>Loading ...</div>
                ) : (
                    <div>
                        <div>
                            <p>
                                <strong>ID:</strong> {workOrder.data?.id}
                            </p>
                            <p>
                                <strong>Name:</strong> {workOrder.data?.name}
                            </p>
                            <p>
                                <strong>Status:</strong> {workOrder.data?.status}
                            </p>
                        </div>
                    </div>
                )}
            </div>
            <div>
                <Link to="/workorders">
                    <button>Back</button>
                </Link>
            </div>
        </div>
    );
};

export default Detail;
