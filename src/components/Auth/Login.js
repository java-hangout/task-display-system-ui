import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const Login = () => {
    const { login } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        role: 'ROLE_USER', // Default to 'ROLE_USER' or provide a dropdown or field to change this
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
    const [loginError, setLoginError] = useState(''); // State to track login error message
    const navigate = useNavigate(); // Initialize the navigate function

    const handleLogin = async () => {
        console.log("Logging in with credentials:", credentials); // Log credentials for debugging
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();
            console.log("API Response:", data); // Log the response from the server

            if (data.token) {
                console.log('Token received:', data.token); // Log the received token
                login(data.token); // Save the token in the AuthContext
                setIsLoggedIn(true); // Update the login status
                setLoginError(''); // Clear any previous login errors
            } else {
                console.error('Login failed: No token received', data); // Handle error if no token is returned
                setLoginError('Oops! It looks like the username or password you entered is incorrect. Please check your credentials and try again.');
            }
        } catch (error) {
            console.error('Login failed:', error); // Log any error encountered
            setLoginError('Oops! It looks like the username or password you entered is incorrect. Please check your credentials and try again.');
        }
    };

    return (
        <div>
            {isLoggedIn ? (
                // Show success message and link after login
                <div>
                    <p>Login successful!</p>
                    <a href="/tasks">Click here to view your tasks</a>
                </div>
            ) : (
                // Show login form if not logged in
                <div>
                    <h1>Login</h1>
                    <input
                        type="text"
                        placeholder="Username"
                        value={credentials.username}
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    />
                    <button onClick={handleLogin}>Login</button>
                    {loginError && <p style={{ color: 'red' }}>{loginError}</p>} {/* Show error message */}
                </div>
            )}
        </div>
    );
};

export default Login;
