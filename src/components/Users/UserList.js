import React, { useState, useEffect } from 'react';

const UserList = () => {
    const [users, setUsers] = useState([]); // State to hold the list of users
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch user data from the backend
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8081/api/users/fetch/all');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }

                const data = await response.json();
                setUsers(data); // Set the users data to the state
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                setError(error.message); // Set error message if fetch fails
                setLoading(false); // Set loading to false even if an error occurs
            }
        };

        fetchUsers(); // Call the function to fetch users
    }, []); // Empty dependency array means this effect runs once when the component mounts

    if (loading) {
        return <p>Loading users...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <div style={{ width: '100%', maxWidth: '1200px' }}>
                <h2 style={{ textAlign: 'center' }}>User List</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Username</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>First Name</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Last Name</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Role</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.id}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.userName}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.emailId}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.firstName}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.lastName}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.role}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;
