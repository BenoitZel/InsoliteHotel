import { createContext, useEffect, useReducer } from "react";

//INITIAL STATE SET TO NULL
const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
};

//CREATECONTEXT REACT FONCTION
export const AuthContext = createContext(INITIAL_STATE);

//SWITCH ACTION DEPENDING OF DEMANDE
const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: null,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                loading: false,
                error: null,
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload,
            };
        case "LOGOUT":
            return {
                user: null,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
};

//USEREDUCER REACT HOOK TAKE THE CONTEXT AVILABLE FOR ALL COMPONENTS
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    //SET USER INFOS INTO LOCAL STORAGE 
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    //RETURN THE VALUE TO ALL COMPONENT WITH USECONTEXT IN
    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                loading: state.loading,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
