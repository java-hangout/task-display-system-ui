import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import TaskList from '../Tasks/TaskList';
import CreateTask from '../Tasks/CreateTask';
import UserList from '../Users/UserList'; // Import the UserList component
import DepartmentList from '../Departments/DepartmentList'; // Import the DepartmentList component
import CreateDepartment from '../Departments/CreateDepartment'; // Import the CreateDepartment component
import RegisterUser from '../Users/RegisterUser'; // Import the RegisterUser component

const Dashboard = () => {
    const { logout } = useContext(AuthContext);
    const [activePage, setActivePage] = useState('taskList'); // Tracks the active page ('taskList' or 'createTask')
    const [taskCreationResponse, setTaskCreationResponse] = useState(null); // Stores the task creation response

    // Retrieve the logged-in username and role from localStorage
    const username = localStorage.getItem('username');
    const userRole = localStorage.getItem('role'); // Assuming the role is stored in localStorage

    // Function to handle closing CreateTask
    const handleCloseCreateTask = () => {
        setActivePage('taskList'); // Redirect back to TaskList
    };

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
                    margin: '0',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h2 style={{ margin: 0, fontSize: '16px' }}>
                        {username ? `Hello, ${username.toUpperCase()}` : 'Welcome to the Task Display System'}
                    </h2>
                </div>
                <h1
                    style={{
                        margin: 0,
                        fontSize: '20px',
                        textAlign: 'center',
                        flexGrow: 1,
                        cursor: 'default',
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
                        width: '220px',
                        backgroundColor: '#f4f6f8',
                        padding: '20px',
                        borderRight: '1px solid #ccc',
                        position: 'fixed',
                        top: '60px',
                        bottom: '0',
                        left: '0',
                        overflowY: 'auto',
                        boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Menu</h3>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                        <li style={{ marginBottom: '10px' }}>
                            <button
                                onClick={() => setActivePage('taskList')}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    backgroundColor: activePage === 'taskList' ? '#e6f7ff' : 'transparent',
                                    border: 'none',
                                    color: activePage === 'taskList' ? '#007bff' : '#000',
                                    textDecoration: 'none',
                                    padding: '10px 15px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    width: '100%',
                                    textAlign: 'left',
                                }}
                            >
                                <span style={{ marginRight: '10px' }}>📋</span>
                                Task List
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActivePage('createTask')}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    backgroundColor: activePage === 'createTask' ? '#e6f7ff' : 'transparent',
                                    border: 'none',
                                    color: activePage === 'createTask' ? '#007bff' : '#000',
                                    textDecoration: 'none',
                                    padding: '10px 15px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    width: '100%',
                                    textAlign: 'left',
                                }}
                            >
                                <span style={{ marginRight: '10px' }}>➕</span>
                                Create Task
                            </button>
                        </li>
                        {userRole === 'ADMIN' && ( // Conditionally render if the user is an admin
                            <>
                                <li>
                                    <button
                                        onClick={() => setActivePage('userList')}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            backgroundColor: activePage === 'userList' ? '#e6f7ff' : 'transparent',
                                            border: 'none',
                                            color: activePage === 'userList' ? '#007bff' : '#000',
                                            textDecoration: 'none',
                                            padding: '10px 15px',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            width: '100%',
                                            textAlign: 'left',
                                        }}
                                    >
                                        <span style={{ marginRight: '10px' }}>👥</span>
                                        User List
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => setActivePage('registerUser')}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            backgroundColor: activePage === 'registerUser' ? '#e6f7ff' : 'transparent',
                                            border: 'none',
                                            color: activePage === 'registerUser' ? '#007bff' : '#000',
                                            textDecoration: 'none',
                                            padding: '10px 15px',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            width: '100%',
                                            textAlign: 'left',
                                        }}
                                    >
                                        <span style={{ marginRight: '10px' }}>📝</span>
                                        Register User
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => setActivePage('departmentList')}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            backgroundColor: activePage === 'departmentList' ? '#e6f7ff' : 'transparent',
                                            border: 'none',
                                            color: activePage === 'departmentList' ? '#007bff' : '#000',
                                            textDecoration: 'none',
                                            padding: '10px 15px',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            width: '100%',
                                            textAlign: 'left',
                                        }}
                                    >
                                        <span style={{ marginRight: '10px' }}>🏢</span>
                                        Department List
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => setActivePage('createDepartment')}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            backgroundColor: activePage === 'createDepartment' ? '#e6f7ff' : 'transparent',
                                            border: 'none',
                                            color: activePage === 'createDepartment' ? '#007bff' : '#000',
                                            textDecoration: 'none',
                                            padding: '10px 15px',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            width: '100%',
                                            textAlign: 'left',
                                        }}
                                    >
                                        <span style={{ marginRight: '10px' }}>🏗️</span>
                                        Create Department
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </aside>

                {/* Main Section */}
                <main style={{ flex: 1, padding: '20px', marginLeft: '240px', overflowY: 'auto', marginTop: '60px' }}>
                    {activePage === 'taskList' && !taskCreationResponse && (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ width: '100%', maxWidth: '1200px' }}>
                                <div style={{ overflowX: 'auto' }}>
                                    <TaskList />
                                </div>
                            </div>
                        </div>
                    )}
                    {activePage === 'createTask' && (
                        <CreateTask
                            onTaskCreated={(response) => {
                                setTaskCreationResponse(response);
                                setActivePage('taskList'); // Redirect back to TaskList
                            }}
                            onClose={handleCloseCreateTask} // Pass the onClose prop
                        />
                    )}
                    {activePage === 'userList' && userRole === 'ADMIN' && ( // Show UserList page if user is an admin
                        <UserList />
                    )}
                    {activePage === 'registerUser' && userRole === 'ADMIN' && ( // Show RegisterUser page if user is an admin
                        <RegisterUser />
                    )}
                    {activePage === 'departmentList' && userRole === 'ADMIN' && ( // Show DepartmentList page if user is an admin
                        <DepartmentList />
                    )}
                    {activePage === 'createDepartment' && userRole === 'ADMIN' && ( // Show CreateDepartment if user is an admin
                        <CreateDepartment />
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
