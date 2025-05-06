import { createContext, useState, useContext } from 'react';

// ✅ This creates the "shared global object"
const AuthContext = createContext();

// ✅ This provides the shared state
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // ✅ Auth logic lives here → reusable, swappable
    const login = (username, password) => {
        if (username === 'admin' && password === 'password') {
            setIsLoggedIn(true);
            return true;
        }
        return false;
    };

    const logout = () => setIsLoggedIn(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// ✅ Hook → so anywhere in app can call `useAuth()`
export const useAuth = () => useContext(AuthContext);
