import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useEffect } from "react";
import "./Basket_bar.css";

const Basket_bar = () => {
    const { isAuthenticated, user } = useAuth();
    const { cart } = useCart();

    useEffect(() => {
        console.log('Basket_bar auth state:', isAuthenticated, user);
        console.log('Basket_bar cart:', cart);
    }, [isAuthenticated, user, cart]);

    return (
        <div className="basket-bar">
            <div className="navbar-brand">
                <Link to="/">
                    <img src="/Logo.png" alt="Logo" />
                </Link>
            </div>

            <div className="basket-content">
                {isAuthenticated && (
                    <Link to="/auth/basket" className="cart-link">
                        <img src="/Basket.png" className="img-basket" alt="Cart" />
                        {cart.length > 0 && (
                            <span className="cart-counter">{cart.length}</span>
                        )}
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Basket_bar;