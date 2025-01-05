// src/App.js
import React, { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => {
    const { authState } = useContext(AuthContext); // Access context

    return <>{authState?.token ? <Dashboard /> : <Login />}</>;
};

export default App;
