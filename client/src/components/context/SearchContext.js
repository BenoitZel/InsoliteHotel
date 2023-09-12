import { createContext, useReducer } from "react";

//INITIAL STATE SET TO UNDEFINED
const INITIAL_STATE = {
    city: undefined,
    date: [],
    options: {
        adutt: undefined,
        children: undefined,
        room: undefined,
    },
};

//CREATECONTEXT REACT FONCTION
export const SearchContext = createContext(INITIAL_STATE)

//SWITCH ACTION DEPENDING OF DEMANDE
const SearchReducer = (state, action) => {
    switch (action.type) {
        case "NEW_SEARCH":
            return action.payload
        case "RESET_SEARCH":
            return INITIAL_STATE
        default:
            return state;
    }
};

//USEREDUCER REACT HOOK TAKE THE CONTEXT AVILABLE FOR ALL COMPONENTS
export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

    //RETURN THE VALUE TO ALL COMPONENT WITH USECONTEXT IN
    return (
        <SearchContext.Provider
            value={{
                city: state.city,
                dates: state.dates,
                options: state.options,
                dispatch
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};