import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const ProtectedRoutes: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const {user}:any = useAuth() as {user: any}

    if(!user) {
        return <Navigate to="/login" />
    }

    return <>{children}</>
}

export default ProtectedRoutes