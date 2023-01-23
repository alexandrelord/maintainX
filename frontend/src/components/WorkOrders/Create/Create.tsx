import { useEffect, useState } from 'react';
import useFetchReducer from '../../../hooks/useFetchReducer';
import { apiCall } from '../../../services/apiCall';
import { User } from '../../../types/types';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import styles from './Create.module.css';

type SelectOption = {
    value: string;
    label: string;
};

const Create = () => {
    const [users, dispatchUsers] = useFetchReducer<User[]>([]);
    const [name, setName] = useState<string>('');
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            dispatchUsers({ type: 'FETCH_INIT' });
            try {
                const response = await handleFetchData('/users');
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

    const handleAddUser = (selectedOptions: SelectOption[]) => {
        const selectedUserIds = selectedOptions.map((option: SelectOption) => option.value);
        setSelectedUserIds(selectedUserIds);
    };

    const handleSubmitWorkOrder = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const workOrder = { name, users: selectedUserIds };
        if (name) {
            try {
                await apiCall.post('/workorders/new', workOrder);
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
        <div className={styles.container}>
            <h1>Create Work Order</h1>
            {users.isError && <div>Something went wrong ...</div>}
            {users.isLoading ? (
                <div>Loading ...</div>
            ) : (
                <form onSubmit={handleSubmitWorkOrder}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="user">User</label>
                        <AnimatedMulti options={options} onChange={handleAddUser} />
                    </div>
                    <div>
                        <button>
                            <span>Submit</span>
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

const animatedComponents = makeAnimated();

const AnimatedMulti = (props: any) => <Select closeMenuOnSelect={false} components={animatedComponents} isMulti {...props} />;

export default Create;
