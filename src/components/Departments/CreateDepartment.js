import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Importing useNavigate hook

const CreateDepartment = ({ onClose }) => {
    const [departmentDetails, setDepartmentDetails] = useState({
        departmentName: '',
        description: '',
    });

    const [errorMessages, setErrorMessages] = useState({
        departmentName: '',
        description: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();  // Initializing the navigate hook

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDepartmentDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));

        // Clear error messages on field change
        setErrorMessages((prevMessages) => ({
            ...prevMessages,
            [name]: value ? '' : 'This field is required',
        }));
    };

    const validateFields = () => {
        let isValid = true;
        let errors = { ...errorMessages };

        // Field-level validation
        if (!departmentDetails.departmentName) {
            errors.departmentName = 'Department Name is required';
            isValid = false;
        }
        if (!departmentDetails.description) {
            errors.description = 'Description is required';
            isValid = false;
        }

        setErrorMessages(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform validation before submission
        if (!validateFields()) {
            return;
        }

        const token = localStorage.getItem('token'); // Retrieve the token

        if (!token) {
            setErrorMessage('No token found. Please log in.');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8083/api/departments/create', // Adjust API endpoint if needed
                {
                    departmentName: departmentDetails.departmentName,
                    description: departmentDetails.description,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Department created successfully:', response.data);
            setSuccessMessage(`Department created successfully! ID: ${response.data.id}`);
            setErrorMessage('');
            setDepartmentDetails({
                departmentName: '',
                description: '',
            });
        } catch (error) {
            console.error('Error creating department:', error);
            setErrorMessage('Failed to create department. Please try again.');
            setSuccessMessage('');
        }
    };

    const handleCancel = () => {
        // Navigate back to department list page (you can replace '/departments' with your actual list route)
        navigate('/departments'); 
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
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Department</h2>
                {successMessage && <div style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>}
                {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                    {[ 
                        { label: 'Department Name', name: 'departmentName', type: 'text', value: departmentDetails.departmentName },
                        { label: 'Description', name: 'description', type: 'textarea', value: departmentDetails.description },
                    ].map(({ label, name, type, value }) => (
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
                                />
                            )}
                            {errorMessages[name] && <div style={{ color: 'red', fontSize: '12px' }}>{errorMessages[name]}</div>}
                        </div>
                    ))}

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
                            Create Department
                        </button>
                        <button type="button" onClick={handleCancel} style={{
                            padding: '10px 20px',
                            backgroundColor: '#ff4d4f',
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

export default CreateDepartment;
