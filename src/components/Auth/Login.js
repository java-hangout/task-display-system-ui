import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Login.css'; // Import external CSS

const Login = () => {
    const { login } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...credentials, role: 'ROLE_USER' }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Login error response:', errorData);
                setError(errorData.message || 'Invalid username or password');
                return;
            }

            const data = await response.json();

            if (data.token) {
                login(data.token);
            } else {
                setError('Login failed. Token not received.');
            }
        } catch (err) {
            console.error('Error during login:', err);
            setError('Failed to login. Please try again later.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2 className="login-header">Task Display System Login</h2>
                {error && <div className="error-message">{error}</div>}
                <div className="input-group">
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Username"
                        value={credentials.username}
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    />
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        className="input-field"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    />
                </div>
                <button className="login-button" onClick={handleLogin}>
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
