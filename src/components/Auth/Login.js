import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Login.css'; // Import external CSS

const Login = () => {
    const { login } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            // Step 1: Fetch user details to get the role dynamically
            const userResponse = await fetch(`http://localhost:8081/api/users/fetch/username/${credentials.username}`);

            if (!userResponse.ok) {
                setError('Failed to fetch user details.');
                return;
            }

            const userData = await userResponse.json();
            const userRole = userData.role; // Extract the role

            // Store role in localStorage if it is not already there
            localStorage.setItem('role', userRole);

            // Step 2: Use the role for login request
            const loginResponse = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...credentials,
                    role: userRole, // Pass the dynamically fetched role
                }),
            });

            if (!loginResponse.ok) {
                const errorData = await loginResponse.json();
                console.error('Login error response:', errorData);
                setError(errorData.message || 'Invalid username or password');
                return;
            }

            const loginData = await loginResponse.json();

            if (loginData.token) {
                // Step 3: Store token and username in localStorage
                login(loginData.token);
                localStorage.setItem('username', credentials.username); // Store username in local storage
                localStorage.setItem('token', loginData.token); // Store token in localStorage
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
