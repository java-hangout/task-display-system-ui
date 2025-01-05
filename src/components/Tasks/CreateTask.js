import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateTask = ({ onClose }) => {
    const [taskDetails, setTaskDetails] = useState({
        title: '',
        description: '',
        assignedToUserName: '',
        dueDate: '',
        status: 'Open',   // Default value
        priority: 'Low',  // Default value
        comments: '',
    });

    const [errorMessages, setErrorMessages] = useState({
        title: '',
        description: '',
        assignedToUserName: '',
        dueDate: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch logged-in username from local storage
    useEffect(() => {
        const username = localStorage.getItem('username'); // Assume username is stored during login
        setTaskDetails((prevDetails) => ({
            ...prevDetails,
            assignedToUserName: username || '', // Default to empty if no username found
        }));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskDetails((prevDetails) => ({
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
        if (!taskDetails.title) {
            errors.title = 'Title is required';
            isValid = false;
        }
        if (!taskDetails.description) {
            errors.description = 'Description is required';
            isValid = false;
        }
        if (!taskDetails.assignedToUserName) {
            errors.assignedToUserName = 'Assigned To is required';
            isValid = false;
        }
        if (!taskDetails.dueDate) {
            errors.dueDate = 'Due Date is required';
            isValid = false;
        }

        setErrorMessages(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform validation before submission
        if (!validateFields()) {
           // setErrorMessage('Please fill all required fields.');
            return;
        }

        const token = localStorage.getItem('token'); // Retrieve the token

        if (!token) {
            setErrorMessage('No token found. Please log in.');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8083/api/tasks/create',
                {
                    ...taskDetails,
                    createdDate: new Date().toISOString(),
                    updatedDate: new Date().toISOString(),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Task created successfully:', response.data);
            setSuccessMessage(`Task created successfully! ID: ${response.data.id}`);
            setErrorMessage('');
            setTaskDetails({
                title: '',
                description: '',
                assignedToUserName: taskDetails.assignedToUserName,
                dueDate: '',
                status: 'Open',  // Reset to default
                priority: 'Low', // Reset to default
                comments: '',
            });
        } catch (error) {
            console.error('Error creating task:', error);
            setErrorMessage('Failed to create task. Please try again.');
            setSuccessMessage('');
        }
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
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Task</h2>
                {successMessage && <div style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>}
                {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                    {[ 
                        { label: 'Title', name: 'title', type: 'text', value: taskDetails.title },
                        { label: 'Description', name: 'description', type: 'textarea', value: taskDetails.description },
                        { label: 'Assigned To', name: 'assignedToUserName', type: 'text', value: taskDetails.assignedToUserName },
                        { label: 'Due Date', name: 'dueDate', type: 'datetime-local', value: taskDetails.dueDate },
                        { label: 'Status', name: 'status', type: 'select', value: taskDetails.status, options: ['Open', 'In Progress', 'Completed'] },
                        { label: 'Priority', name: 'priority', type: 'select', value: taskDetails.priority, options: ['Low', 'Medium', 'High'] },
                        { label: 'Comments', name: 'comments', type: 'textarea', value: taskDetails.comments },
                    ].map(({ label, name, type, value, options }) => (
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
                            ) : type === 'select' ? (
                                <select
                                    name={name}
                                    value={value}
                                    onChange={handleInputChange}
                                    style={{
                                        flex: 1,
                                        padding: '8px',
                                        borderRadius: '4px',
                                        border: '1px solid #ccc',
                                    }}
                                >
                                    {options.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
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
                            Create Task
                        </button>
                        {onClose && (
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
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTask;
