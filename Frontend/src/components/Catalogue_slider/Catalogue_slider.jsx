import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import Button from '../Button/Button';
import './Catalogue_slider.css';

const Catalogue_slider = () => {
    const [products, setProducts] = useState([]);
    const { isAuthenticated } = useAuth();
    const { cart, updateCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:8000/api/products/');
            const data = await response.json();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    const right_click = () => {
        document.querySelector('.scroll-container').scrollLeft += 310;
    };

    const left_click = () => {
        document.querySelector('.scroll-container').scrollLeft -= 310;
    };

    const handleAddToBasket = (product) => {
        const productToAdd = {
            id: product.id,
            name: product.name,
            cost: product.cost,
            sizes: product.sizes,
            image_url: product.image_url
        };

        if (!cart.some(item => item.id === product.id)) {
            updateCart([...cart, productToAdd]);
            alert(`${product.name} добавлен в корзину!`);
        }
    };

    return (
        <div className="bar">
            <div className="button">
                <img
                    src="./Left_btn.png"
                    alt="Left"
                    className="cursor-pointer pozition-left"
                    style={{ width: "69px", height: "89px" }}
                    onClick={left_click}
                />
                <div className="scroll-container">
                    {products.slice(0, 7).map(product => (
                        <div key={product.id} className="rectangle-slider">
                            {product.image_url && (
                                <img 
                                    src={product.image_url} 
                                    alt={product.name} 
                                    className="img"
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                            )}
                            <h2 className="text text-size1">{product.name}</h2>
                            <div className="text text-size2">
                                <p>${product.cost}</p>
                                <p>Sizes: {product.sizes}</p>
                            </div>
                            {isAuthenticated && (
                                <img 
                                    src="/Basket_black.png" 
                                    className='img-basket-slider' 
                                    onClick={() => handleAddToBasket(product)}
                                    style={{ cursor: 'pointer' }}
                                />
                            )}
                        </div>
                    ))}
                </div>
                <img
                    src="./Right_btn.png"
                    alt="Right"
                    className="cursor-pointer pozition-right"
                    style={{ width: "69px", height: "89px" }}
                    onClick={right_click}
                />
            </div>
            <div className="text" style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                <Link to="/catalogue" style={{ textDecoration: 'none' }}>
                    <Button
                        size="big"
                        color="color-black"
                        text_color="text-color-black"
                        hover="light"
                    >
                        Go to Catalogue
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Catalogue_slider;