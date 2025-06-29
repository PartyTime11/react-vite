import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const userData = JSON.parse(localStorage.getItem('user'));
        if (token) {
            setIsAuthenticated(true);
            setUser(userData || {});
        }
    }, []);

    const login = (token, userData) => {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('user', JSON.stringify(userData || {}));
        setIsAuthenticated(true);
        setUser(userData || {});
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ 
            isAuthenticated,
            user,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};

export default AuthContext;