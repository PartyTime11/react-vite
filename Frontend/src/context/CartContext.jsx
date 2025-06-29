import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user, isAuthenticated } = useAuth();
    const [cart, setCart] = useState([]);

    const getCartKey = () => `basket_${user?.id}`;

    useEffect(() => {
        if (isAuthenticated && user?.id) {
            const key = getCartKey();
            const savedCart = JSON.parse(localStorage.getItem(key)) || [];
            setCart(savedCart);
            console.log('Current user ID:', user?.id);
            console.log('Cart storage key:', getCartKey());
            console.log('Cart contents:', JSON.parse(localStorage.getItem(getCartKey())) || []);
        } else {
            setCart([]);
        }
    }, [user?.id, isAuthenticated]);

    const updateCart = (newCart) => {
        if (!isAuthenticated) return;
        
        const key = getCartKey();
        localStorage.setItem(key, JSON.stringify(newCart));
        setCart(newCart);
        window.dispatchEvent(new Event('basketUpdated'));
    };

    return (
        <CartContext.Provider value={{ cart, updateCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    return context;
};

export default CartContext;