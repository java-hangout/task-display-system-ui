import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserUpdate from './UpdateUser'; // Ensure you have the UserUpdate component

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/users/fetch/all');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleUpdateClick = (user) => {
        setSelectedUser(user);
        setIsUpdating(true);
    };

    const handleCloseUpdate = () => {
        setIsUpdating(false);
        setSelectedUser(null);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <div style={{ width: '100%', maxWidth: '1200px' }}>
                {/* Only show the "User List" label if we're not in updating mode */}
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
                                <th style={{ border: '1px solid black', padding: '8px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{user.id}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{user.userName}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{user.emailId}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{user.role}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>
                                        <button onClick={() => handleUpdateClick(user)}>Update</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {isUpdating && selectedUser && (
                    <UserUpdate user={selectedUser} onClose={handleCloseUpdate} />
                )}
            </div>
        </div>
    );
};

export default UserList;
