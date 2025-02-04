import React, { useState } from 'react';
import axios from 'axios';

const UpdateBusinessUnit = ({ businessUnit, onClose }) => {
    const [businessUnitData, setBusinessUnitData] = useState({ ...businessUnit });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBusinessUnitData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:8082/api/business-units/update/${businessUnit.id}`,
                businessUnitData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Business Unit updated successfully:', response.data);
            onClose(); // Close the form after successful update
        } catch (error) {
            console.error('Error updating business unit:', error);
        }
    };

    // Handle null or undefined departmentIds
    const departmentIds = Array.isArray(businessUnitData.departmentIds)
        ? businessUnitData.departmentIds
        : [];

    return (
        <div style={{ padding: '20px' }}>
            <div
                style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    backgroundColor: '#fff',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Update Business Unit</h2>
                <form
                    onSubmit={handleSubmit}
                    style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}
                >
                    {/* Render Fields */}
                    {[
                        { label: 'Business Unit ID', name: 'id', type: 'text', value: businessUnitData.id, readOnly: true },
                        { label: 'Business Unit Name', name: 'businessUnitName', type: 'text', value: businessUnitData.businessUnitName },
                        { label: 'Description', name: 'description', type: 'textarea', value: businessUnitData.description },
                    ].map(({ label, name, type, value, readOnly }) => (
                        <div key={name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <label style={{ flex: '0 0 150px', fontWeight: 'bold', textAlign: 'left' }}>
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

                    {/* Department IDs Field */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <label style={{ flex: '0 0 150px', fontWeight: 'bold', textAlign: 'left' }}>Department IDs:</label>
                        <textarea
                            name="departmentIds"
                            value={departmentIds.join(', ')}
                            onChange={(e) => {
                                const newDepartmentIds = e.target.value.split(',').map((id) => id.trim());
                                setBusinessUnitData((prevState) => ({
                                    ...prevState,
                                    departmentIds: newDepartmentIds,
                                }));
                            }}
                            rows="3"
                            style={{
                                flex: 1,
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>

                    {/* Buttons */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '20px',
                        }}
                    >
                        <button
                            type="submit"
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#007bff',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#6c757d',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateBusinessUnit;
