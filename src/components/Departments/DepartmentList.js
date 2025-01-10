import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DepartmentUpdate from './UpdateDepartment'; // Assuming you have the UpdateDepartment component

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

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
    }, []); // Run once on component mount

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
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map((department) => (
                                <tr key={department.id}>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>
                                        {department.id}
                                    </td>
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
                                        <button onClick={() => handleUpdateClick(department)} >Update</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {isUpdating && selectedDepartment && (
                    <DepartmentUpdate department={selectedDepartment} onClose={handleCloseUpdate} />
                )}
            </div>
        </div>
    );
};

export default DepartmentList;
