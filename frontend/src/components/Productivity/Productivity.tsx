import { useEffect } from 'react';
import useFetchReducer from '../../hooks/useFetchReducer';
import { apiCall } from '../../services/apiCall';
import { User } from '../../types/types';
import List from '../List/List';

const Productivity = () => {
    const [inactiveUsers, dispatchInactiveUsers] = useFetchReducer<User[]>([]);

    useEffect(() => {
        const fetchInactiveUsers = async () => {
            dispatchInactiveUsers({ type: 'FETCH_INIT' });
            try {
                const inactiveUsers = await handleFetchData('productivity');
                dispatchInactiveUsers({ type: 'FETCH_SUCCESS', payload: inactiveUsers });
            } catch (error) {
                dispatchInactiveUsers({ type: 'FETCH_FAILURE' });
            }
        };
        fetchInactiveUsers();
    }, []);

    const handleFetchData = async (endpoint: string) => {
        const response = await apiCall.get(endpoint);
        return response.data;
    };

    return (
        <div className="container">
            <h1>Inactive Users</h1>
            {inactiveUsers.isError && <div>Something went wrong ...</div>}
            {inactiveUsers.isLoading ? (
                <div>Loading ...</div>
            ) : (
                <div>
                    <List
                        list={inactiveUsers.data}
                        render={(user: User) => (
                            <tr key={user.id}>
                                <th>{user.id}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                        )}
                    />
                </div>
            )}
        </div>
    );
};

export default Productivity;
