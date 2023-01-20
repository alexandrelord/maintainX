import { useEffect, useState } from 'react';
import { WorkOrder, WorkOrders } from '../../types/types';
import useFetchReducer from '../../hooks/useFetchReducer';
import { apiCall } from '../../services/apiCall';
import List from './List';
import './WorkOrderCmpt.css';

const WorkOrderCmpt = () => {
    const [workOrders, dispatchWorkOrders] = useFetchReducer<WorkOrders>([]);
    const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(null);

    useEffect(() => {
        const fetchWorkOrderList = async () => {
            dispatchWorkOrders({ type: 'FETCH_INIT' });
            const workOrders = await handleFetchData('workorders');
            dispatchWorkOrders({ type: 'FETCH_SUCCESS', payload: workOrders });
        };
        fetchWorkOrderList();
    }, []);

    const handleFetchData = async (endpoint: string) => {
        const response = await apiCall.get(endpoint);
        return response.data;
    };

    const handleWorkOrderClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
        const id = parseInt(e.currentTarget.children[0].textContent || '');
        const workOrder = workOrders.data.find((workOrder) => workOrder.id === id);
        console.log(workOrder);
        workOrder && setSelectedWorkOrder(workOrder);
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
                            <tr key={item.id} onClick={handleWorkOrderClick}>
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

export default WorkOrderCmpt;

{
    /*onClick={handleWorkOrderClick}*/
}
