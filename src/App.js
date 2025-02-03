// src/App.js

import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import ITDashboard from './components/ITDashboard/ITDashboard';
import ITDeptSpecificDashboard from './components/ITDashboard/ITDeptSpecificDashboard'; // Import the new department-specific component
import BusinessunitSpecificDashboard from './components/ITDashboard/BusinessunitSpecificDashboard';
const App = () => {
    const { authState } = useContext(AuthContext); // Access context

    return (
        <Router>
            <Routes>
                {/* Public route for IT Dashboard */}
                <Route path="/dashboard" element={<ITDashboard />} />
                
                {/* Department-specific dashboard route */}
                <Route path="/dashboard/:departmentName" element={<ITDeptSpecificDashboard />} />

                <Route path="/bu/dashboard/:businessUnitName" element={<BusinessunitSpecificDashboard />} />
                
                {/* Static route for login or authenticated dashboard */}
                <Route
                    path="/"
                    element={authState?.token ? <Dashboard /> : <Login />}
                />

                {/* Catch-all route */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
