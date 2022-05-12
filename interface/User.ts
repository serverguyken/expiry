export interface User {
    email: string;
    prodsID: string
}

export interface UserContext {
    authUser?: any,
    user?: any,
    loading?: any,
    error?: string,
    hasError?: boolean,
}