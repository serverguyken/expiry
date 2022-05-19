export interface User {
    email: string;
    prodsID: string
}

export interface UserContext {
    authUser?: {
        uid: string;
        isAuthenticated: boolean | null;
    },
    user?: any,
    loading?: any,
    error?: string,
    hasError?: boolean,
}

export interface Product {
    id: string;
    name: string;
    expires: string
}