import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = (token) => {
        setIsLoggedIn(true);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", token.userId);
    };
    
    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
    };

    const register = (userInfo) => {
        
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
        setIsLoggedIn(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, register }}>
        {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
