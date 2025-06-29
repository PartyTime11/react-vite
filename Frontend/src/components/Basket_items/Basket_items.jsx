import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import Button from '../Button/Button';
import OrderForm from '../Order_form/Order_form';
import './Basket_items.css';

const Basket_items = () => {
    const { cart, updateCart } = useCart();
    const { isAuthenticated, user } = useAuth();
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);

    const removeFromBasket = (itemId) => {
        if (!isAuthenticated) return;
        const updatedCart = cart.filter(item => item.id !== itemId);
        updateCart(updatedCart);
    };

    const handleOrderSuccess = () => {
        updateCart([]);
        setIsOrderPlaced(true);
    };

    if (isOrderPlaced) {
        return (
            <div className="basket-container">
                <div className="order-success-message">
                    <h2>Thank you for your order!</h2>
                    <p>Your order has been placed successfully.</p>
                    <div className="order-success-button-container">
                        <Link to="/catalogue" style={{ textDecoration: "none" }}>
                            <Button
                                size="big"
                                color="color-black"
                                text_color="text-color-black"
                                hover="light"
                            >
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="basket-container">
            {cart.length > 0 ? (
                <>
                    {cart.map((item) => (
                        <div key={item.id} className="rectangle-basket">
                            {item.image_url && (
                                <img 
                                    src={item.image_url} 
                                    alt={item.name} 
                                    className="img"
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                            )}
                            <h2 className="text text-size1">{item.name}</h2>
                            <div className="text text-size2">
                                <p className="text text-size2">${item.cost}</p>
                                <p className="text text-size2">Size: {item.sizes}</p>
                            </div>
                            <div 
                                onClick={() => removeFromBasket(item.id)}
                                className="remove-item text text-size2"
                            >
                                Remove
                            </div>
                        </div>
                    ))}

                    <OrderForm 
                        basketItems={cart} 
                        user={user} 
                        onOrderSuccess={handleOrderSuccess} 
                    />
                </>
            ) : (
                <div className="text-center">
                    <p>Your basket is empty</p>
                    <div className="order-success-button-container">
                        <Link to="/catalogue" style={{ textDecoration: "none" }}>
                            <Button
                                size="big"
                                color="color-black"
                                text_color="text-color-black"
                                hover="light"
                            >
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Basket_items;