import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import TaskList from '../Tasks/TaskList';
import CreateTask from '../Tasks/CreateTask';

const Dashboard = () => {
    const { logout } = useContext(AuthContext);
    const [activePage, setActivePage] = useState('taskList'); // Tracks the active page ('taskList' or 'createTask')
    const [taskCreationResponse, setTaskCreationResponse] = useState(null); // Stores the task creation response

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {/* Header */}
            <header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#f4f6f8',
                    padding: '10px 20px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    margin: '0', // Ensure there's no gap around the header
                    position: 'sticky',
                    top: 0,
                    zIndex: 1, // Keep header above the other content
                }}
            >
                <h1
                    style={{
                        margin: 0,
                        fontSize: '20px',
                        textAlign: 'center',
                        flexGrow: 1,
                        cursor: 'default', // Prevents the title from being clickable
                    }}
                >
                    Task Display System Dashboard
                </h1>
                <button
                    onClick={logout}
                    style={{
                        backgroundColor: '#ff4d4f',
                        color: 'white',
                        padding: '8px 16px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Logout
                </button>
            </header>

            {/* Main Content */}
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                {/* Menu Section */}
                <aside
                    style={{
                        width: '200px',
                        backgroundColor: '#f4f6f8',
                        padding: '20px',
                        borderRight: '1px solid #ccc',
                        position: 'fixed', // Keep the menu fixed on the left
                        top: '60px', // Align to the header with no gap
                        bottom: '0',
                        left: '0', // Align to the left side
                        overflowY: 'auto',
                        boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.1)', // Slight shadow for better visibility
                    }}
                >
                    <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Menu</h3>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '10px' }}>
                            <button
                                onClick={() => setActivePage('taskList')}
                                style={{
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    color: activePage === 'taskList' ? '#007bff' : '#000',
                                    textDecoration: activePage === 'taskList' ? 'underline' : 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                Task List
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActivePage('createTask')}
                                style={{
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    color: activePage === 'createTask' ? '#007bff' : '#000',
                                    textDecoration: activePage === 'createTask' ? 'underline' : 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                Create Task
                            </button>
                        </li>
                    </ul>
                </aside>

                {/* Main Section */}
                <main style={{ flex: 1, padding: '20px', marginLeft: '220px', overflowY: 'auto', marginTop: '60px' }}>
                    {/* Task list and create task will be dynamically displayed */}
                    {activePage === 'taskList' && !taskCreationResponse && <TaskList />}
                    {activePage === 'createTask' && (
                        <CreateTask
                            onTaskCreated={(response) => {
                                setTaskCreationResponse(response);
                                setActivePage('taskList'); // Redirect back to TaskList
                            }}
                        />
                    )}
                    {taskCreationResponse && (
                        <div
                            style={{
                                marginTop: '20px',
                                padding: '20px',
                                backgroundColor: '#e6f7ff',
                                border: '1px solid #91d5ff',
                                borderRadius: '4px',
                            }}
                        >
                            <h3>Task Created Successfully!</h3>
                            <pre>{JSON.stringify(taskCreationResponse, null, 2)}</pre>
                            <button
                                onClick={() => setTaskCreationResponse(null)}
                                style={{
                                    marginTop: '10px',
                                    padding: '10px 20px',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                Back to Task List
                            </button>
                        </div>
                    )}
                </main>
            </div>

            {/* Footer */}
            <footer
                style={{
                    textAlign: 'center',
                    backgroundColor: '#f4f6f8',
                    padding: '10px',
                    fontSize: '14px',
                    borderTop: '1px solid #ccc',
                    position: 'sticky',
                    bottom: 0,
                    zIndex: 1,
                }}
            >
                © 2025 OSB Group. All Rights Reserved.
            </footer>
        </div>
    );
};

export default Dashboard;
