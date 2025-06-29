import { useState } from 'react';
import Button from '../Button/Button';
import './Order_form.css';

const Order_form = ({ basketItems, onOrderSuccess }) => {
    const [formData, setFormData] = useState({
        city: '',
        street: '',
        apartment: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const token = localStorage.getItem('accessToken');
        const totalAmount = basketItems.reduce(
            (sum, item) => sum + parseFloat(item.cost), 0
        );

        const orderData = {
            items: basketItems.map(item => ({
                product_id: item.id,
                name: item.name,
                price: parseFloat(item.cost),
                size: item.sizes?.split(',')[0]?.trim() || 'M'
            })),
            shipping_address: formData,
            total_amount: totalAmount.toFixed(2)
        };

        await fetch('http://localhost:8000/api/orders/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        onOrderSuccess();
        setIsLoading(false);
    };

    return (
        <div className="order-form-container">
            <h2 className="order-form-title">Checkout</h2>
            
            <form onSubmit={handleSubmit} className="order-form">
                <div className="form-group">
                    <label className="form-label">City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Street</label>
                    <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Apartment</label>
                    <input
                        type="text"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="form-input"
                    />
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    size="big"
                    color={isLoading ? 'disabled' : 'primary'}
                    className="submit-button"
                >
                    {isLoading ? 'Processing...' : 'Place Order'}
                </Button>
            </form>
        </div>
    );
};

export default Order_form;