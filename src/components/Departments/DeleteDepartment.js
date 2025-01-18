import React, { useState } from 'react';
import axios from 'axios';

const DeleteDepartment = ({ departmentId, departmentName, onDeleteSuccess }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteClick = () => {
        setShowConfirm(true);
    };

    const confirmDelete = async () => {
        setIsDeleting(true);
        try {
            const response = await axios.delete(`http://localhost:8082/api/departments/delete/${departmentId}`);
            if (response.status === 204) {
                alert(`Department "${departmentName}" deleted successfully!`);
                onDeleteSuccess(); // Notify parent component to refresh the department list
            }
        } catch (error) {
            alert("Failed to delete department. Please try again.");
            console.error('Error deleting department:', error);
        } finally {
            setShowConfirm(false);
            setIsDeleting(false);
        }
    };

    const cancelDelete = () => {
        setShowConfirm(false);
    };

    return (
        <div>
            <button
                style={{
                    backgroundColor: '#ff4d4d',
                    color: '#fff',
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
                onClick={handleDeleteClick}
                disabled={isDeleting}
            >
                {isDeleting ? 'Deleting...' : 'Delete'}
            </button>

            {/* Confirmation Modal */}
            {showConfirm && (
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
                            Are you sure you want to delete the department{' '}
                            <strong>{departmentName}</strong>?
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
                                onClick={confirmDelete}
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
                                onClick={cancelDelete}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteDepartment;
