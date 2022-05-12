import { addUser, createUserAuth, logInUserAuth } from "./firebase";

export const signUpUser = (data: {
    email: string;
    password: string;
    prodsID: string
}, onSuccess: (user: any) => void, onError: (error: string) => void): void => {
    createUserAuth(data.email, data.password, (userData: any) => {
        const { uid } = userData.user
        addUser(uid, { email: data.email, prodsID: data.prodsID }, (data: any) => onSuccess(data), (error: any) => onError(error))
    }, (error: any) => onError(error))
}

export const logInUser = (email: string, password: string, onSuccess: (user: any) => void, onError: (error: string) => void): void => {
    logInUserAuth(email, password, (userData: any) => {
        onSuccess(userData)
    }, (error: any) => onError(error))
}


export const setErrorCodeMessage = (code: string) => {
    switch (code) {
        case "auth/user-not-found":
            return {
                message: "No user with provided credentials exist"
            }
        case "auth/wrong-password":
            return {
                message: "Invalid password"
            }
        default:
            return {
                message: "Internal error"
            }
    }
}