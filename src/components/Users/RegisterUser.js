import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for page navigation

const RegisterUser = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [userDetails, setUserDetails] = useState({
        userName: '',
        password: '',
        emailId: '',
        firstName: '',
        lastName: '',
        role: 'USER',
        status: 'ACTIVE',
        departmentId: ''
    });

    const [errorMessages, setErrorMessages] = useState({
        userName: '',
        password: '',
        emailId: '',
        firstName: '',
        lastName: '',
        role: '',
        status: '',
        departmentId: ''
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));

        // Clear error message for that field if user starts typing
        setErrorMessages((prevMessages) => ({
            ...prevMessages,
            [name]: value ? '' : 'This field is required',
        }));
    };

    const validateFields = () => {
        let isValid = true;
        let errors = { ...errorMessages };

        // Validate fields
        Object.keys(userDetails).forEach((key) => {
            if (!userDetails[key] && key !== 'role' && key !== 'status') { // role and status are optional
                errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
                isValid = false;
            }
        });

        setErrorMessages(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate fields before submitting
        if (!validateFields()) {
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8081/api/users/register', // Backend API endpoint
                {
                    userName: userDetails.userName,
                    password: userDetails.password,
                    emailId: userDetails.emailId,
                    firstName: userDetails.firstName,
                    lastName: userDetails.lastName,
                    role: userDetails.role,
                    status: userDetails.status,
                    departmentId: userDetails.departmentId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('User registered successfully:', response.data);
            setSuccessMessage('User registered successfully!');
            setErrorMessage('');
            setUserDetails({
                userName: '',
                password: '',
                emailId: '',
                firstName: '',
                lastName: '',
                role: 'USER',
                status: 'ACTIVE',
                departmentId: ''
            });
        } catch (error) {
            console.error('Error registering user:', error);
            setErrorMessage('Failed to register user. Please try again.');
            setSuccessMessage('');
        }
    };

    // Cancel function to reset the form or navigate to another page
    const handleCancel = () => {
        // You can navigate to another page, like the User List page, or reset the form
        navigate('/user-list'); // Navigate to User List page (adjust URL as needed)
        // Alternatively, you can reset the form:
        // setUserDetails({
        //     userName: '',
        //     password: '',
        //     emailId: '',
        //     firstName: '',
        //     lastName: '',
        //     role: 'USER',
        //     status: 'ACTIVE',
        //     departmentId: ''
        // });
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
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Register User</h2>

                {successMessage && <div style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>}
                {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                    {[ 
                        { label: 'User Name', name: 'userName', type: 'text', value: userDetails.userName },
                        { label: 'Password', name: 'password', type: 'password', value: userDetails.password },
                        { label: 'Email ID', name: 'emailId', type: 'email', value: userDetails.emailId },
                        { label: 'First Name', name: 'firstName', type: 'text', value: userDetails.firstName },
                        { label: 'Last Name', name: 'lastName', type: 'text', value: userDetails.lastName },
                        { label: 'Department ID', name: 'departmentId', type: 'text', value: userDetails.departmentId }
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
                            {errorMessages[name] && <div style={{ color: 'red', fontSize: '12px' }}>{errorMessages[name]}</div>}
                        </div>
                    ))}

                    {/* Role Dropdown */}
                    <div style={{
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
                            Role:
                        </label>
                        <select
                            name="role"
                            value={userDetails.role}
                            onChange={handleInputChange}
                            style={{
                                flex: 1,
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        >
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>

                    {/* Status Dropdown */}
                    <div style={{
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
                            Status:
                        </label>
                        <select
                            name="status"
                            value={userDetails.status}
                            onChange={handleInputChange}
                            style={{
                                flex: 1,
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        >
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                        </select>
                    </div>

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
                            Register User
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

export default RegisterUser;
