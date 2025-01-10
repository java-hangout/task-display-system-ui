import React, { useState } from 'react';
import axios from 'axios';

const UpdateDepartment = ({ department, onClose }) => {
    const [departmentData, setDepartmentData] = useState({ ...department });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDepartmentData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:8082/api/departments/update/${department.id}`,
                departmentData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Department updated successfully:', response.data);
            onClose(); // Close the form after successful update
        } catch (error) {
            console.error('Error updating department:', error);
        }
    };

    // Handle null or undefined userIds
    const userIds = Array.isArray(departmentData.userIds) ? departmentData.userIds : [];

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
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Update Department</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                    {/* Render Fields */}
                    {[ 
                        { label: 'Department ID', name: 'id', type: 'text', value: departmentData.id, readOnly: true },
                        { label: 'Department Name', name: 'departmentName', type: 'text', value: departmentData.departmentName },
                        { label: 'Description', name: 'description', type: 'textarea', value: departmentData.description },
                        // Removed Manager ID and User IDs fields from the form
                    ].map(({ label, name, type, value, readOnly }) => (
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
                            {type === 'textarea' ? (
                                <textarea
                                    name={name}
                                    value={value}
                                    onChange={handleInputChange}
                                    rows="3"
                                    style={{
                                        flex: 1,
                                        padding: '8px',
                                        borderRadius: '4px',
                                        border: '1px solid #ccc',
                                    }}
                                    readOnly={readOnly}
                                />
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

export default UpdateDepartment;
