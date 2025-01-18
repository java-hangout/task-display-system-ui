import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DepartmentUpdate from './UpdateDepartment'; // Assuming you have the UpdateDepartment component

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [departmentToDelete, setDepartmentToDelete] = useState(null);

    const userRole = localStorage.getItem('role'); // Get the logged-in user's role from localStorage

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get('http://localhost:8082/api/departments/fetch/all');
                setDepartments(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    const renderUsers = (userIds) => {
        if (!Array.isArray(userIds) || userIds.length === 0) {
            return <span>No users assigned</span>;
        }
        return (
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {userIds.map((userId) => (
                    <li key={userId}>{userId}</li>
                ))}
            </ul>
        );
    };

    const handleUpdateClick = (department) => {
        setSelectedDepartment(department);
        setIsUpdating(true);
    };

    const handleCloseUpdate = () => {
        setIsUpdating(false);
        setSelectedDepartment(null);
    };

    const handleDeleteClick = (department) => {
        setDepartmentToDelete(department);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        if (!departmentToDelete) return;

        try {
            await axios.delete(`http://localhost:8082/api/departments/delete/${departmentToDelete.id}`);
            alert(`Department "${departmentToDelete.departmentName}" deleted successfully.`);
            setDepartments((prevDepartments) =>
                prevDepartments.filter((dept) => dept.id !== departmentToDelete.id)
            );
        } catch (error) {
            alert('Failed to delete department. Please try again.');
            console.error('Error deleting department:', error);
        } finally {
            setShowDeleteConfirm(false);
            setDepartmentToDelete(null);
        }
    };

    const cancelDelete = () => {
        setShowDeleteConfirm(false);
        setDepartmentToDelete(null);
    };

    if (loading) {
        return <div>Loading departments...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <div style={{ width: '100%', maxWidth: '1200px' }}>
                {!isUpdating && <h2 style={{ textAlign: 'center' }}>Department List</h2>}

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
                            <tr>
                                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                                    Department ID
                                </th>
                                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                                    Department Name
                                </th>
                                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                                    Description
                                </th>
                                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                                    Users
                                </th>
                                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                                    Update
                                </th>
                                {/* Show Delete button only for SUPERADMIN */}
                                {userRole === 'SUPER ADMIN' && (
                                    <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                                        Delete
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map((department) => (
                                <tr key={department.id}>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{department.id}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>
                                        {department.departmentName}
                                    </td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>
                                        {department.description}
                                    </td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>
                                        {renderUsers(department.userIds)}
                                    </td>
                                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                                        <button
                                            style={{
                                                backgroundColor: '#007bff',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                padding: '5px 10px',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => handleUpdateClick(department)}
                                        >
                                            Update
                                        </button>
                                    </td>
                                    {/* Conditionally render the Delete button */}
                                    {userRole === 'SUPER ADMIN' && (
                                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                                            <button
                                                style={{
                                                    backgroundColor: '#ff4d4d',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    padding: '5px 10px',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => handleDeleteClick(department)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {isUpdating && selectedDepartment && (
                    <DepartmentUpdate department={selectedDepartment} onClose={handleCloseUpdate} />
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && departmentToDelete && (
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
                                backgroundColor: 'white',
                                padding: '20px',
                                borderRadius: '8px',
                                textAlign: 'center',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <h3>Confirm Delete</h3>
                            <p>
                                Are you sure you want to delete the department{' '}
                                <strong>{departmentToDelete.departmentName}</strong>?
                            </p>
                            <div style={{ marginTop: '20px' }}>
                                <button
                                    style={{
                                        backgroundColor: '#ff4d4d',
                                        color: 'white',
                                        border: 'none',
                                        padding: '10px 20px',
                                        marginRight: '10px',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={confirmDelete}
                                >
                                    Yes
                                </button>
                                <button
                                    style={{
                                        backgroundColor: '#007bff',
                                        color: 'white',
                                        border: 'none',
                                        padding: '10px 20px',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={cancelDelete}
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

export default DepartmentList;
