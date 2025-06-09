import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    user: any;
    login : (userData: any) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children : React.ReactNode }> = ({children}) => {
    const [user, setUser] = useState<any>(null)
    const [userActive, setUserActive]  = useState<boolean>(true)
    
    console.log(user)

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if(storedUser){
            setUser(JSON.parse(storedUser))
            
        }
        setUserActive(false)
    }, [])



    const login = (userData: any) => {
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {!userActive && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) return null;
    const { user, login, logout } = context;
    return { user, login, logout };
}