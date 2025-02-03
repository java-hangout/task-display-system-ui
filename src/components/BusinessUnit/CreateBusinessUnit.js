import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for page navigation

const CreateBusinessUnit = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [businessUnitDetails, setBusinessUnitDetails] = useState({
        businessUnitName: '',
        description: '',
        departmentIds: [],
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
    });

    const [errorMessages, setErrorMessages] = useState({
        businessUnitName: '',
        description: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBusinessUnitDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));

        // Clear error message for that field if user starts typing
        setErrorMessages((prevMessages) => ({
            ...prevMessages,
            [name]: value ? '' : 'This field is required',
        }));
    };

    // Validate fields before submission
    const validateFields = () => {
        let isValid = true;
        let errors = { ...errorMessages };

        // Validate fields
        Object.keys(businessUnitDetails).forEach((key) => {
            if (!businessUnitDetails[key] && key !== 'departmentIds') { // departmentIds can be empty
                errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
                isValid = false;
            }
        });

        setErrorMessages(errors);
        return isValid;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate fields before submitting
        if (!validateFields()) {
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8082/api/businessunits/create', // Backend API endpoint
                {
                    businessUnitName: businessUnitDetails.businessUnitName,
                    description: businessUnitDetails.description,
                    departmentIds: businessUnitDetails.departmentIds,
                    createdDate: businessUnitDetails.createdDate,
                    updatedDate: businessUnitDetails.updatedDate,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Business Unit created successfully:', response.data);
            setSuccessMessage('Business Unit created successfully!');
            setErrorMessage('');
            setBusinessUnitDetails({
                businessUnitName: '',
                description: '',
                departmentIds: [],
                createdDate: new Date().toISOString(),
                updatedDate: new Date().toISOString(),
            });
        } catch (error) {
            console.error('Error creating business unit:', error);
            setErrorMessage('Failed to create Business Unit. Please try again.');
            setSuccessMessage('');
        }
    };

    // Cancel function to reset the form or navigate to another page
    const handleCancel = () => {
        // You can navigate to another page, like the Business Unit List page
        navigate('/business-unit-list'); // Navigate to Business Unit List page (adjust URL as needed)
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
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Business Unit</h2>

                {successMessage && <div style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>}
                {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                    {[ 
                        { label: 'Business Unit Name', name: 'businessUnitName', type: 'text', value: businessUnitDetails.businessUnitName },
                        { label: 'Description', name: 'description', type: 'text', value: businessUnitDetails.description },
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
                            Create Business Unit
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

export default CreateBusinessUnit;
