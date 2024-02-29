import { createContext, useState } from "react";

export const MainContext = createContext();
export const resultsPerPageContext = createContext();

export const ContextValue = ({children}) => {
    const [user , setUser] = useState(null);

    const value ={
        user,
        setUser
    }

    return (
        <MainContext.Provider value={value}>
            {children}
        </MainContext.Provider>
    )
};
