import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateBusinessUnit from './UpdateBusinessUnit'; // Assuming you have the UpdateDepartment component

const BusinessUnitList = () => {
    const [businessUnits, setBusinessUnits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedBusinessUnit, setSelectedBusinessUnit] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [businessUnitToDelete, setBusinessUnitToDelete] = useState(null);

    const userRole = localStorage.getItem('role'); // Get the logged-in user's role from localStorage

    useEffect(() => {
        const fetchBusinessUnits = async () => {
            try {
                const response = await axios.get('http://localhost:8082/api/business-units/fetch/all');
                setBusinessUnits(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchBusinessUnits();
    }, []);

    const renderDepartments = (departmentIds) => {
        if (!Array.isArray(departmentIds) || departmentIds.length === 0) {
            return <span>No departments listed</span>;
        }
        return (
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {departmentIds.map((deptId) => (
                    <li key={deptId}>{deptId}</li>
                ))}
            </ul>
        );
    };

    const handleUpdateClick = (businessUnit) => {
        setSelectedBusinessUnit(businessUnit);
        setIsUpdating(true);
    };

    const handleCloseUpdate = () => {
        setIsUpdating(false);
        setSelectedBusinessUnit(null);
    };

    const handleDeleteClick = (businessUnit) => {
        setBusinessUnitToDelete(businessUnit);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        if (!businessUnitToDelete) return;

        try {
            await axios.delete(`http://localhost:8082/api/business-units/delete/${businessUnitToDelete.id}`);
            alert(`Business Unit "${businessUnitToDelete.businessUnitName}" deleted successfully.`);
            setBusinessUnits((prevBusinessUnits) =>
                prevBusinessUnits.filter((unit) => unit.id !== businessUnitToDelete.id)
            );
        } catch (error) {
            alert('Failed to delete business unit. Please try again.');
            console.error('Error deleting business unit:', error);
        } finally {
            setShowDeleteConfirm(false);
            setBusinessUnitToDelete(null);
        }
    };

    const cancelDelete = () => {
        setShowDeleteConfirm(false);
        setBusinessUnitToDelete(null);
    };

    if (loading) {
        return <div>Loading business units...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <div style={{ width: '100%', maxWidth: '1200px' }}>
                {!isUpdating && <h2 style={{ textAlign: 'center' }}>Business Unit List</h2>}

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
                                    Business Unit ID
                                </th>
                                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                                    Business Unit Name
                                </th>
                                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                                    Description
                                </th>
                                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                                    Departments
                                </th>
                                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                                    Update
                                </th>
                                {userRole === 'SUPER ADMIN' && (
                                    <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                                        Delete
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {businessUnits.map((businessUnit) => (
                                <tr key={businessUnit.id}>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{businessUnit.id}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>
                                        {businessUnit.businessUnitName}
                                    </td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>
                                        {businessUnit.description}
                                    </td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>
                                        {renderDepartments(businessUnit.departmentIds)}
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
                                            onClick={() => handleUpdateClick(businessUnit)}
                                        >
                                            Update
                                        </button>
                                    </td>
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
                                                onClick={() => handleDeleteClick(businessUnit)}
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

                {isUpdating && selectedBusinessUnit && (
                    // The UpdateBusinessUnit component should be implemented similarly to the UpdateDepartment component.
                    <UpdateBusinessUnit businessUnit={selectedBusinessUnit} onClose={handleCloseUpdate} />
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && businessUnitToDelete && (
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
                                Are you sure you want to delete the business unit{' '}
                                <strong>{businessUnitToDelete.businessUnitName}</strong>?
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

export default BusinessUnitList;
