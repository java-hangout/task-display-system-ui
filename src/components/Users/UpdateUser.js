import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserUpdate = ({ user, onClose }) => {
    const [updatedUser, setUpdatedUser] = useState({ ...user });

    useEffect(() => {
        setUpdatedUser(user);
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser({ ...updatedUser, [name]: value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        console.log("Updated User:", updatedUser);  // Log the updated user state to check the values
        try {
            // Make sure that the user object is correctly structured and matches your API
            const response = await axios.put(
                `http://localhost:8081/api/users/update/${updatedUser.id}`,
                updatedUser,
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.log('User updated successfully:', response.data);  // Log the response from the server
            alert('User updated successfully!');
            onClose(); // Close the update form after saving
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Error updating user!');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Update User</h2>
                <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                    {/* Render Fields */}
                    {[
                        { label: 'User ID', name: 'id', type: 'text', value: updatedUser.id, readOnly: true },
                        { label: 'Username', name: 'userName', type: 'text', value: updatedUser.userName },
                        { label: 'Email', name: 'emailId', type: 'email', value: updatedUser.emailId },
                        { label: 'First Name', name: 'firstName', type: 'text', value: updatedUser.firstName },
                        { label: 'Last Name', name: 'lastName', type: 'text', value: updatedUser.lastName },
                        { label: 'Role', name: 'role', type: 'select', value: updatedUser.role, options: ['USER', 'ADMIN','SUPER ADMIN'] },
                        { label: 'Password', name: 'password', type: 'password', value: updatedUser.password },
                        { label: 'Department ID', name: 'departmentId', type: 'text', value: updatedUser.departmentId },
                    ].map(({ label, name, type, value, readOnly, options }) => (
                        <div key={name} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '10px',
                        }}>
                            <label style={{
                                flex: '0 0 150px',
                                fontWeight: 'bold',
                                textAlign: 'left',
                            }}>
                                {label}:
                            </label>
                            {type === 'select' ? (
                                <select
                                    name={name}
                                    value={value}
                                    onChange={handleInputChange}
                                    style={{
                                        flex: 1,
                                        padding: '8px',
                                        borderRadius: '4px',
                                        border: '1px solid #ccc',
                                    }}
                                >
                                    {options.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={type}
                                    name={name}
                                    value={value}
                                    onChange={handleInputChange}
                                    style={{
                                        flex: 1,
                                        padding: '8px',
                                        borderRadius: '4px',
                                        border: '1px solid #ccc',
                                    }}
                                    readOnly={readOnly}
                                />
                            )}
                        </div>
                    ))}

                    {/* Buttons */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '20px',
                    }}>
                        <button type="submit" style={{
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}>
                            Update
                        </button>
                        <button type="button" onClick={onClose} style={{
                            padding: '10px 20px',
                            backgroundColor: '#6c757d',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserUpdate;
