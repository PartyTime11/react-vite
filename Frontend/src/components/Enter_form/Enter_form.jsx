import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import './Enter_form.css';
import { useAuth } from '../../context/AuthContext';

const Enter_form = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const response = await fetch('http://localhost:8000/api/auth/login/', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ phone, password })
        });

        const data = await response.json();
        
        if (data.access) {
            const userData = {
                id: data.user_id,
                phone: data.phone
            };
            login(data.access, userData);
            navigate('/');
        }

        setIsLoading(false);
    };

    return (
        <div className="enter-container">
            <div className="enter-card">
                <form onSubmit={handleLogin} className="enter-content">
                    <div className="enter-header">
                        <div className="enter-title">Log in</div>
                        <img src="/Registration.png" className='enter-img' alt="Login"/>
                    </div>
                    
                    <div className="enter-description">
                        <div className="enter-text">
                            Enter your account to access our products
                        </div>
                    </div>

                    <div className='divider-one'></div>
                    
                    <div className="enter-form">                        
                        <div className="enter-field">
                            <label className="field-label">Phone Number</label>
                            <input 
                                type="text" 
                                value={phone} 
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="89136725342" 
                                className="enter-input"
                                required
                            />
                        </div>

                        <div className='divider-two'></div>
            
                        <div className="enter-field">
                            <label className="field-label">Password</label>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password" 
                                className="enter-input"
                                required
                                minLength="8"
                            />
                        </div>
                    </div>
                    
                    <div className="enter-submit">
                        <Button
                            type="submit"
                            size="medium"
                            color="color-dark"
                            text_color="text-color-white"
                            hover="light"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Log in'}
                        </Button>
                    </div>

                    <div className="enter-footer">
                        <span>Don't have an account? </span>
                        <Link to="/auth/register" className="register-link">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Enter_form;