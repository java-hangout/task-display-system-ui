import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get('http://localhost:8082/api/departments/fetch/all');
                setDepartments(response.data); // Set the fetched departments
                setLoading(false); // Set loading to false after the data is fetched
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchDepartments();
    }, []); // Run only once when the component mounts

    const renderUsers = (userIds) => {
        // Ensure userIds is an array, even if it's null or undefined
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

    if (loading) {
        return <div>Loading departments...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <div style={{ width: '100%', maxWidth: '1200px' }}>
                <h2 style={{ textAlign: 'center' }}>Department List</h2>
                {departments.length === 0 ? (
                    <p>No departments available.</p>
                ) : (
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default DepartmentList;
