import { useReducer } from 'react';
import { fetchAction, fetchState } from '../types/types';

const useFetchReducer = <T>(initialData: T) => {
    const initialState = {
        data: initialData,
        isLoading: false,
        isError: false
    };

    const fetchReducer = (state: fetchState<T>, action: fetchAction<T>): fetchState<T> => {
        switch (action.type) {
            case 'FETCH_INIT':
                return { ...state, isLoading: true, isError: false };
            case 'FETCH_SUCCESS':
                return { ...state, isLoading: false, isError: false, data: action.payload };
            case 'FETCH_FAILURE':
                return { ...state, isLoading: false, isError: true };
            default:
                throw new Error('Invalid action type');
        }
    };

    return useReducer(fetchReducer, initialState);
};

export default useFetchReducer;

// userReducer() is usually preferable to useState() when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one.

// useReducer() also lets you optimize performance for components that trigger deep updates because you can pass dispatch down instead of callbacks.

// useReducer(reducerFunction, initialState)

// reducerFunction: (state, action) => newState
// initialState: any
