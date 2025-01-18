import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserUpdate from './UpdateUser'; // Ensure you have the UserUpdate component

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [deletePrompt, setDeletePrompt] = useState({ show: false, user: null });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/users/fetch/all');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleUpdateClick = (user) => {
        setSelectedUser(user);
        setIsUpdating(true);
    };

    const handleDeleteClick = (user) => {
        setDeletePrompt({ show: true, user });
    };

    const confirmDelete = async (userId) => {
        try {
            const response = await axios.delete(`http://localhost:8081/api/users/delete/${userId}`);
            if (response.status === 204) {
                alert(`User deleted successfully!`);
                fetchUsers(); // Refresh the user list
            }
        } catch (error) {
            alert("Failed to delete user. Please try again.");
            console.error('Error deleting user:', error);
        } finally {
            setDeletePrompt({ show: false, user: null });
        }
    };

    const handleCloseUpdate = () => {
        setIsUpdating(false);
        setSelectedUser(null);
    };

    const handleCancelDelete = () => {
        setDeletePrompt({ show: false, user: null });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <div style={{ width: '100%', maxWidth: '1200px' }}>
                {!isUpdating && <h2 style={{ textAlign: 'center' }}>User List</h2>}

                {!isUpdating && (
                    <table
                        style={{
                            borderCollapse: 'collapse',
                            width: '100%',
                            margin: '20px 0',
                            border: '1px solid #ddd',
                            textAlign: 'left',
                        }}
                    >
                        <thead>
                            <tr style={{ border: '1px solid black' }}>
                                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>User ID</th>
                                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Username</th>
                                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Email</th>
                                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Role</th>
                                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Update</th>
                                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{user.id}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{user.userName}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{user.emailId}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{user.role}</td>
                                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                                        <button
                                            style={{
                                                backgroundColor: '#007bff',
                                                color: '#fff',
                                                padding: '5px 10px',
                                                border: 'none',
                                                borderRadius: '3px',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => handleUpdateClick(user)}
                                        >
                                            Update
                                        </button>
                                    </td>
                                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                                        <button
                                            style={{
                                                backgroundColor: '#ff4d4d',
                                                color: '#fff',
                                                padding: '5px 10px',
                                                border: 'none',
                                                borderRadius: '3px',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => handleDeleteClick(user)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {isUpdating && selectedUser && (
                    <UserUpdate user={selectedUser} onClose={handleCloseUpdate} />
                )}

                {/* Delete Confirmation Prompt */}
                {deletePrompt.show && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1000,
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: '#fff',
                                padding: '20px',
                                borderRadius: '8px',
                                textAlign: 'center',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <h3>Confirm Delete</h3>
                            <p>
                                Are you sure you want to delete user{' '}
                                <strong>
                                    {deletePrompt.user.userName} ({deletePrompt.user.emailId})
                                </strong>
                                ?
                            </p>
                            <div style={{ marginTop: '20px' }}>
                                <button
                                    style={{
                                        backgroundColor: '#ff4d4d',
                                        color: '#fff',
                                        padding: '10px 20px',
                                        margin: '0 10px',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => confirmDelete(deletePrompt.user.id)}
                                >
                                    Yes
                                </button>
                                <button
                                    style={{
                                        backgroundColor: '#007bff',
                                        color: '#fff',
                                        padding: '10px 20px',
                                        margin: '0 10px',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={handleCancelDelete}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserList;
