import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { UserContext } from '../interface/User'

const userContext = createContext({});

export default function useUserContext(): UserContext {
    return useContext(userContext);
}



export const UserProvider = ({ children }: any) => {
    const [authUser, setAuthUser] = useState({
        isAuthenticated: null, // set to null to indicate loading of user becuase at initial load, user is null
        uid: "",
        email: "",
    } as any);
    const [user, setUser] = useState({
        isAuthenticated: false,
        uid: "",
        email: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [hasError, setHasError] = useState(error ? error !== "" : false);
    useEffect(() => {
        return auth.onAuthStateChanged((uuser: any) => {
            if (uuser) {
                const Uuser = {
                    isAuthenticated: !!uuser, 
                    uid: uuser.uid,
                    email: uuser.email
                }
                setAuthUser(Uuser);
            } else {
                const Uuser = {
                    isAuthenticated: false, 
                    uid: "",
                    email: "",
                }
                setAuthUser(Uuser);
            }
           
        });
    }, []);
    
   
    const context: UserContext = {
        authUser,
        loading,
        error,
        hasError,
    };

    return <userContext.Provider value={context} >{children}</userContext.Provider>;
};
