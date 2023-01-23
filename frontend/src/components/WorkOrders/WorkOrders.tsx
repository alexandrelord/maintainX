import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkOrder } from '../../types/types';
import useFetchReducer from '../../hooks/useFetchReducer';
import { apiCall } from '../../services/apiCall';
import List from '../List/List';
import './WorkOrders.css';

const WorkOrders = () => {
    const [workOrders, dispatchWorkOrders] = useFetchReducer<WorkOrder[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWorkOrderList = async () => {
            dispatchWorkOrders({ type: 'FETCH_INIT' });
            try {
                const response = await handleFetchData('/workorders');
                dispatchWorkOrders({ type: 'FETCH_SUCCESS', payload: response });
            } catch (error) {
                dispatchWorkOrders({ type: 'FETCH_FAILURE' });
            }
        };
        fetchWorkOrderList();
    }, []);

    const handleFetchData = async (endpoint: string) => {
        const response = await apiCall.get(endpoint);
        return response.data;
    };

    const handleWorkOrderClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
        const id = e.currentTarget.firstChild?.textContent;
        navigate(`/workorders/${id}`);
    };

    return (
        <div className="container">
            <h1>Work Orders</h1>
            {workOrders.isError && <div>Something went wrong ...</div>}
            {workOrders.isLoading ? (
                <div>Loading ...</div>
            ) : (
                <List
                    list={workOrders.data}
                    render={(item) => {
                        return (
                            <tr onClick={handleWorkOrderClick}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.status}</td>
                            </tr>
                        );
                    }}
                />
            )}
        </div>
    );
};

export default WorkOrders;
