type FetchData<T> = {
    endpoint: string;
    method: 'GET' | 'POST' | 'PATCH';
    data?: T;
};

const BASE_URL = 'http://localhost:4000/api/';

const fetcher = async <T>({ endpoint, method, data }: FetchData<T>) => {
    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: data ? JSON.stringify(data) : undefined
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
};

export const apiCall = {
    get: (endpoint: string) => fetcher({ endpoint, method: 'GET' }),
    post: <T>(endpoint: string, data: T) => fetcher<T>({ endpoint, method: 'POST', data }),
    patch: <T>(endpoint: string, data: T) => fetcher<T>({ endpoint, method: 'PATCH', data })
};
