import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/reset-sent');
    };

    return (
        <div style={{ padding: '50px' }}>
            <h1>Forgot Password</h1>
            <form onSubmit={handleSubmit}>
                <label>Email: </label>
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <button type="submit" style={{ marginLeft: '10px' }}>Submit</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
