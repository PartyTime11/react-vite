import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Catalogue_comp.css';

const Catalogue_comp = () => {
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

    const handleAddToBasket = (product) => {
        const productToAdd = {
            id: product.id,
            name: product.name,
            cost: product.cost,
            sizes: product.sizes,
            image_url: product.image_url || ''
        };

        updateCart([...cart, productToAdd]);
    };

    return (
        <div className="catalogue-container-cat">
            {products.map((product) => (
                <div key={product.id} className="rectangle">
                    {product.image_url && (
                        <img 
                            src={product.image_url} 
                            alt={product.name} 
                            className="img"
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
                            className='img-basket_cat' 
                            alt="Add to cart"
                            onClick={() => handleAddToBasket(product)}
                            style={{ cursor: 'pointer' }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default Catalogue_comp;