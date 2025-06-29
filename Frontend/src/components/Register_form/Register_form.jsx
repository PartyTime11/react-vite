import { useState } from 'react';
import Button from '../Button/Button';
import './Register_form.css';

const Register_form = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        
        await fetch('http://localhost:8000/api/auth/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone: phone,
                password: password,
                first_name: name,
                last_name: lastName,
                username: phone
            })
        });

        window.location.href = '/auth/login';
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <div className="register-content">
                    <div className="register-header">
                        <div className="register-title">Registration</div>
                        <img src="/Registration.png" className='img-reg' alt="Registration"/>
                    </div>
                    
                    <div className="register-description">
                        <div className="register-text">
                            Create your personal account to make it easier to choose our products.
                        </div>
                    </div>

                    <div className='divider-one'></div>
                    
                    <form onSubmit={handleRegister} className="register-form">
                        <div className="form-field">
                            <label className="field-label">First Name</label>
                            <input 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter first name" 
                                className="form-input"
                            />
                        </div>

                        <div className='divider-two'></div>
                        
                        <div className="form-field">
                            <label className="field-label">Last Name</label>
                            <input 
                                type="text" 
                                value={lastName} 
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Enter last name" 
                                className="form-input"
                            />
                        </div>

                        <div className='divider-two'></div>
                        
                        <div className="form-field">
                            <label className="field-label">Phone Number</label>
                            <input 
                                type="text" 
                                value={phone} 
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="89136725342" 
                                className="form-input"
                                required
                            />
                        </div>

                        <div className='divider-two'></div>
                        
                        <div className="form-field">
                            <label className="field-label">Password</label>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password" 
                                className="form-input"
                                required
                                minLength="8"
                            />
                        </div>
                    
                        <div className="register-submit">
                            <Button
                                size="medium"
                                color="color-dark"
                                text_color="text-color-white"
                                hover="light"
                                type="submit"
                            >
                                Create Account
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register_form;