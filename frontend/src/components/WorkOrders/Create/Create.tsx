import { useEffect, useState } from 'react';
import useFetchReducer from '../../../hooks/useFetchReducer';
import { apiCall } from '../../../services/apiCall';
import { User } from '../../../types/types';
import Select from 'react-select';
import styles from './Create.module.css';

const Create = () => {
    const [users, dispatchUsers] = useFetchReducer<User[]>([]);
    const [name, setName] = useState<string>('');
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            dispatchUsers({ type: 'FETCH_INIT' });
            try {
                const response = await handleFetchData('users');
                dispatchUsers({ type: 'FETCH_SUCCESS', payload: response });
            } catch (error) {
                dispatchUsers({ type: 'FETCH_FAILURE' });
            }
        };

        fetchUsers();
    }, []);

    const handleFetchData = async (endpoint: string) => {
        const response = await apiCall.get(endpoint);
        return response.data;
    };

    const handleAddUser = (selectedOptions: any) => {
        const selectedUserIds = selectedOptions.map((option: any) => option.value);
        setSelectedUserIds(selectedUserIds);
    };

    const handleSubmitWorkOrder = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const workOrder = { name, users: selectedUserIds };
        if (name) {
            try {
                await apiCall.post('workorders/new', workOrder);
                setName('');
                setSelectedUserIds([]);
            } catch (error) {
                dispatchUsers({ type: 'FETCH_FAILURE' });
            }
        }
    };

    const options = users.data.map((user: User) => {
        return { value: user.id, label: user.name };
    });

    return (
        <div className="container">
            <h1>New Work Order</h1>
            <div className={styles.card}>
                {users.isError && <div>Something went wrong ...</div>}
                {users.isLoading ? (
                    <div>Loading ...</div>
                ) : (
                    <form onSubmit={handleSubmitWorkOrder}>
                        <div className={styles.taskContainer}>
                            <label htmlFor="name">Task</label>
                            <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Drive Pickle Rick to therapy" required />
                        </div>
                        <div className={styles.usersContainer}>
                            <label htmlFor="user">Assign Users</label>
                            <Select
                                options={options}
                                isMulti
                                onChange={handleAddUser}
                                styles={{
                                    control: () => controlStyles()
                                }}
                                theme={(theme: any) => ({
                                    ...theme,
                                    borderRadius: 8,
                                    colors: {
                                        ...theme.colors,
                                        primary25: 'blue',
                                        neutral0: 'rgb(75 85 99)'
                                    }
                                })}
                            />
                        </div>
                        <div className={styles.buttonContainer}>
                            <button>
                                <span>Submit</span>
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

function controlStyles() {
    return {
        backgroundColor: 'rgb(75 85 99)',
        border: '1px solid rgb(107 114 128)',
        borderRadius: '8px',
        color: 'white',
        display: 'flex',
        width: '400px',
        padding: '0 8px',
        fontSize: '18px',
        marginTop: '0.25rem'
    };
}

export default Create;
