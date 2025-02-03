import React, { useState, useContext } from 'react'; 
import { AuthContext } from '../../context/AuthContext'; 
import TaskList from '../Tasks/TaskList'; 
import CreateTask from '../Tasks/CreateTask'; 
import UserList from '../Users/UserList'; // Import the UserList component
import DepartmentList from '../Departments/DepartmentList'; // Import the DepartmentList component
import CreateDepartment from '../Departments/CreateDepartment'; // Import the CreateDepartment component
import RegisterUser from '../Users/RegisterUser'; // Import the RegisterUser component
import CreateBusinessUnit from '../BusinessUnit/CreateBusinessUnit'; // Import the CreateBusinessUnit component

const Dashboard = () => {
    const { logout } = useContext(AuthContext);
    const [activePage, setActivePage] = useState('taskList'); // Tracks the active page ('taskList' or 'createTask')
    const [taskCreationResponse, setTaskCreationResponse] = useState(null); // Stores the task creation response
    const [isUserActivitiesOpen, setIsUserActivitiesOpen] = useState(true); // State for expanding/collapsing user activities
    const [isAdminActivitiesOpen, setIsAdminActivitiesOpen] = useState(true); // State for expanding/collapsing admin activities

    // Retrieve the logged-in username and role from localStorage
    const username = localStorage.getItem('username');
    const userRole = localStorage.getItem('role'); // Assuming the role is stored in localStorage

    // Function to handle closing CreateTask
    const handleCloseCreateTask = () => {
        setActivePage('taskList'); // Redirect back to TaskList
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
            {/* Header */}
            <header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#4A90E2', // Soft Blue background
                    padding: '20px 30px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    margin: '0',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    color: 'white',
                    borderBottom: '2px solid #1C2B4C', // Darker blue border for better contrast
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
                        {username ? `Hello, ${username.toUpperCase()}` : 'Welcome to the Task Display System'}
                    </h2>
                </div>
                <h1
                    style={{
                        margin: 0,
                        fontSize: '22px',
                        textAlign: 'center',
                        flexGrow: 1,
                        fontWeight: 'bold',
                        cursor: 'default',
                    }}
                >
                    Task Display System
                </h1>
                <button
                    onClick={logout}
                    style={{
                        backgroundColor: '#ff4d4f',
                        color: 'white',
                        padding: '12px 20px',
                        border: 'none',
                        borderRadius: '30px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'background-color 0.3s ease',
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#d44f4f'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#ff4d4f'}
                >
                    Logout
                </button>
            </header>

            {/* Main Content */}
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                {/* Menu Section */}
                <aside
                    style={{
                        width: '250px',
                        backgroundColor: '#F7F9FC', // Lighter background for menu for a cleaner look
                        padding: '20px',
                        borderRight: '2px solid #E0E7FF', // Soft border for better separation
                        position: 'fixed',
                        top: '80px',
                        bottom: '0',
                        left: '0',
                        overflowY: 'auto',
                        boxShadow: '2px 0px 8px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <h3 style={{ marginBottom: '20px', textAlign: 'center', color: '#333' }}>Menu</h3>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                        {/* User Activities */}
                        <div style={{ marginBottom: '30px' }}>
                            <h4
                                style={{
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    marginBottom: '10px',
                                    cursor: 'pointer',
                                    color: '#1E88E5', // Subtle color for header
                                    transition: 'color 0.3s',
                                }}
                                onClick={() => setIsUserActivitiesOpen(!isUserActivitiesOpen)}
                            >
                                User Activities
                                <span
                                    style={{
                                        float: 'right',
                                        transition: 'transform 0.3s',
                                        transform: isUserActivitiesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                    }}
                                >
                                    &#9660; {/* Down arrow symbol */}
                                </span>
                            </h4>
                            {isUserActivitiesOpen && (
                                <div style={{ marginTop: '10px' }}>
                                    <li style={{ marginBottom: '15px' }}>
                                        <button
                                            onClick={() => setActivePage('taskList')}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                backgroundColor: activePage === 'taskList' ? '#E3F2FD' : 'transparent',
                                                color: activePage === 'taskList' ? '#1E88E5' : '#555',
                                                padding: '12px 20px',
                                                border: 'none',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                width: '100%',
                                                textAlign: 'left',
                                                fontWeight: '500',
                                                transition: 'background-color 0.3s ease, color 0.3s ease',
                                            }}
                                        >
                                            <span style={{ marginRight: '15px' }}>📋</span>
                                            Task List
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => setActivePage('createTask')}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                backgroundColor: activePage === 'createTask' ? '#E3F2FD' : 'transparent',
                                                color: activePage === 'createTask' ? '#1E88E5' : '#555',
                                                padding: '12px 20px',
                                                border: 'none',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                width: '100%',
                                                textAlign: 'left',
                                                fontWeight: '500',
                                                transition: 'background-color 0.3s ease, color 0.3s ease',
                                            }}
                                        >
                                            <span style={{ marginRight: '15px' }}>➕</span>
                                            Create Task
                                        </button>
                                    </li>
                                </div>
                            )}
                        </div>

                        {/* Admin Activities */}
                        {(userRole === 'ADMIN' || userRole === 'SUPER ADMIN') && (
                            <div style={{ marginTop: '30px' }}>
                                <h4
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        marginBottom: '10px',
                                        cursor: 'pointer',
                                        color: '#1E88E5',
                                        transition: 'color 0.3s',
                                    }}
                                    onClick={() => setIsAdminActivitiesOpen(!isAdminActivitiesOpen)}
                                >
                                    Admin Activities
                                    <span
                                        style={{
                                            float: 'right',
                                            transition: 'transform 0.3s',
                                            transform: isAdminActivitiesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                        }}
                                    >
                                        &#9660; {/* Down arrow symbol */}
                                    </span>
                                </h4>
                                {isAdminActivitiesOpen && (
                                    <div style={{ marginTop: '10px' }}>
                                        <li>
                                            <button
                                                onClick={() => setActivePage('userList')}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    backgroundColor: activePage === 'userList' ? '#E3F2FD' : 'transparent',
                                                    color: activePage === 'userList' ? '#1E88E5' : '#555',
                                                    padding: '12px 20px',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    cursor: 'pointer',
                                                    width: '100%',
                                                    textAlign: 'left',
                                                    fontWeight: '500',
                                                    transition: 'background-color 0.3s ease, color 0.3s ease',
                                                }}
                                            >
                                                <span style={{ marginRight: '15px' }}>👥</span>
                                                User List
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => setActivePage('registerUser')}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    backgroundColor: activePage === 'registerUser' ? '#E3F2FD' : 'transparent',
                                                    color: activePage === 'registerUser' ? '#1E88E5' : '#555',
                                                    padding: '12px 20px',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    cursor: 'pointer',
                                                    width: '100%',
                                                    textAlign: 'left',
                                                    fontWeight: '500',
                                                    transition: 'background-color 0.3s ease, color 0.3s ease',
                                                }}
                                            >
                                                <span style={{ marginRight: '15px' }}>📝</span>
                                                Register User
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => setActivePage('createDepartment')} // Ensure CreateDepartment option is here
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    backgroundColor: activePage === 'createDepartment' ? '#E3F2FD' : 'transparent',
                                                    color: activePage === 'createDepartment' ? '#1E88E5' : '#555',
                                                    padding: '12px 20px',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    cursor: 'pointer',
                                                    width: '100%',
                                                    textAlign: 'left',
                                                    fontWeight: '500',
                                                    transition: 'background-color 0.3s ease, color 0.3s ease',
                                                }}
                                            >
                                                <span style={{ marginRight: '15px' }}>🏢</span>
                                                Create Department
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => setActivePage('departmentList')} // Ensure DepartmentList option is here
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    backgroundColor: activePage === 'departmentList' ? '#E3F2FD' : 'transparent',
                                                    color: activePage === 'departmentList' ? '#1E88E5' : '#555',
                                                    padding: '12px 20px',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    cursor: 'pointer',
                                                    width: '100%',
                                                    textAlign: 'left',
                                                    fontWeight: '500',
                                                    transition: 'background-color 0.3s ease, color 0.3s ease',
                                                }}
                                            >
                                                <span style={{ marginRight: '15px' }}>🏢</span>
                                                Department List
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => setActivePage('createBusinessUnit')} // Handle new page for CreateBusinessUnit
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    backgroundColor: activePage === 'createBusinessUnit' ? '#E3F2FD' : 'transparent',
                                                    color: activePage === 'createBusinessUnit' ? '#1E88E5' : '#555',
                                                    padding: '12px 20px',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    cursor: 'pointer',
                                                    width: '100%',
                                                    textAlign: 'left',
                                                    fontWeight: '500',
                                                    transition: 'background-color 0.3s ease, color 0.3s ease',
                                                }}
                                            >
                                                <span style={{ marginRight: '15px' }}>🏢</span>
                                                Create Business Unit
                                            </button>
                                        </li>
                                    </div>
                                )}
                            </div>
                        )}
                    </ul>
                </aside>

                {/* Main Section */}
                <main style={{ flex: 1, padding: '20px', marginLeft: '270px', overflowY: 'auto', marginTop: '80px' }}>
                    {activePage === 'taskList' && !taskCreationResponse && (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ width: '100%', maxWidth: '1200px' }}>
                                <div style={{ overflowX: 'auto' }}>
                                    <TaskList />
                                </div>
                            </div>
                        </div>
                    )}
                    {activePage === 'createTask' && !taskCreationResponse && (
                        <CreateTask onClose={handleCloseCreateTask} />
                    )}
                    {activePage === 'userList' && (
                        <UserList />
                    )}
                    {activePage === 'registerUser' && (
                        <RegisterUser />
                    )}
                    {activePage === 'departmentList' && (
                        <DepartmentList />
                    )}
                    {activePage === 'createDepartment' && (
                        <CreateDepartment />
                    )}
                    {activePage === 'createBusinessUnit' && ( // Handle new page for CreateBusinessUnit
                        <CreateBusinessUnit />
                    )}
                </main>
            </div>
<div>
            <footer className="dashboard-footer">
                <p>© 2025 OSB Group. All Rights Reserved.</p>
            </footer>
            </div>
        </div>
    );
};

export default Dashboard;
