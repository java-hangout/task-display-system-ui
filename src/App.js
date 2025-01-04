import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Add Navigate to the import
import AuthProvider from './context/AuthContext';
import ApiProvider from './context/ApiContext';
import Login from './components/Auth/Login';
import TaskList from './components/Tasks/TaskList';

const App = () => {
    return (
        <AuthProvider>
            <ApiProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" />} /> {/* Default redirection */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/tasks" element={<TaskList />} />
                    </Routes>
                </Router>
            </ApiProvider>
        </AuthProvider>
    );
};

console.log('App component rendered');
export default App;
