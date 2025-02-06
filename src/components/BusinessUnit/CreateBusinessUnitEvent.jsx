import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for page navigation

const CreateBusinessUnitEvent = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [buDetails, setBuDetails] = useState({
        title: '',
        description: '',
        type: 'ACHIEVEMENT', // Default type can be any of ACHIEVEMENT, TOWNHALL, or CULTURAL_ACTIVITY
        eventActiveFlag: true,
        businessUnitName: '',
    });

    const [errorMessages, setErrorMessages] = useState({
        title: '',
        description: '',
        type: '',
        businessUnitName: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBuDetails((prevDetails) => ({
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
        Object.keys(buDetails).forEach((key) => {
            if (!buDetails[key] && key !== 'eventActiveFlag') { // eventActiveFlag is optional
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
                'http://localhost:8084/api/events/create', // Backend API endpoint for creating events
                {
                    title: buDetails.title,
                    description: buDetails.description,
                    type: buDetails.type,
                    eventActiveFlag: buDetails.eventActiveFlag,
                    businessUnitName: buDetails.businessUnitName,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Business unit created successfully:', response.data);
            setSuccessMessage('Business Unit created successfully!');
            setErrorMessage('');
            setBuDetails({
                title: '',
                description: '',
                type: 'ACHIEVEMENT',
                eventActiveFlag: true,
                businessUnitName: '',
            });
        } catch (error) {
            console.error('Error creating business unit:', error);
            setErrorMessage('Failed to create business unit. Please try again.');
            setSuccessMessage('');
        }
    };

    // Cancel function to reset the form or navigate to another page
    const handleCancel = () => {
        // You can navigate to another page, like the Events List page, or reset the form
        navigate('/events-list'); // Navigate to Events List page (adjust URL as needed)
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

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                    {[
                        { label: 'Title', name: 'title', type: 'text', value: buDetails.title },
                        { label: 'Description', name: 'description', type: 'text', value: buDetails.description },
                        { label: 'Business Unit Name', name: 'businessUnitName', type: 'text', value: buDetails.businessUnitName },
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

                    {/* Type Dropdown */}
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
                            Event Type:
                        </label>
                        <select
                            name="type"
                            value={buDetails.type}
                            onChange={handleInputChange}
                            style={{
                                flex: 1,
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        >
                            <option value="ACHIEVEMENT">ACHIEVEMENT</option>
                            <option value="TOWNHALL">TOWNHALL</option>
                            <option value="CULTURAL_ACTIVITY">CULTURAL ACTIVITY</option>
                        </select>
                    </div>

                    {/* Status Checkbox */}
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
                            Active:
                        </label>
                        <input
                            type="checkbox"
                            name="eventActiveFlag"
                            checked={buDetails.eventActiveFlag}
                            onChange={(e) => handleInputChange({ target: { name: 'eventActiveFlag', value: e.target.checked } })}
                            style={{
                                flex: 1,
                                padding: '8px',
                            }}
                        />
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
                            Create
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

export default CreateBusinessUnitEvent;
