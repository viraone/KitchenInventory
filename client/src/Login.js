import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = login(username, password);
        if (success) {
            navigate('/inventory');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div style={{ padding: '50px' }}>
            <h1>Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username: </label>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <button type="submit" style={{ marginTop: '10px' }}>Login</button>
                <button
                    type="button"
                    style={{ marginLeft: '10px' }}
                    onClick={() => navigate('/forgot-password')}
                >
                    Forgot Password?
                </button>

            </form>
        </div>
    );
};

export default Login;
