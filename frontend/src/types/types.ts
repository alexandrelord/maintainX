export type WorkOrder = {
    id: number;
    name: string;
    status: string;
};

export type WorkOrders = Array<WorkOrder>;

export type fetchState<T> = {
    data: T;
    isLoading: boolean;
    isError: boolean;
};

export type fetchAction<T> = { type: 'FETCH_INIT' } | { type: 'FETCH_SUCCESS'; payload: T } | { type: 'FETCH_FAILURE' };
