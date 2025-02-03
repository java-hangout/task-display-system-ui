import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateDepartment = ({ onClose }) => {
    const [departmentDetails, setDepartmentDetails] = useState({
        departmentName: '',
        description: '',
        businessUnitId: '', // Business Unit ID added
        parentDeptFlag: false,
        parentDepartmentId: '',
    });

    const [errorMessages, setErrorMessages] = useState({
        departmentName: '',
        description: '',
        businessUnitId: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

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

    const handleParentDeptFlagChange = (e) => {
        const { checked } = e.target;
        setDepartmentDetails((prevDetails) => ({
            ...prevDetails,
            parentDeptFlag: checked,
            parentDepartmentId: checked ? '' : prevDetails.parentDepartmentId, // Reset parentDepartmentId if parentDeptFlag is true
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
        if (!departmentDetails.businessUnitId) {
            errors.businessUnitId = 'Business Unit ID is required';
            isValid = false;
        }
        if (!departmentDetails.parentDeptFlag && !departmentDetails.parentDepartmentId) {
            errors.parentDepartmentId = 'Parent Department ID is required';
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
                'http://localhost:8082/api/departments/create',
                {
                    departmentName: departmentDetails.departmentName,
                    description: departmentDetails.description,
                    businessUnitId: departmentDetails.businessUnitId,
                    parentDepartmentId: departmentDetails.parentDeptFlag ? '' : departmentDetails.parentDepartmentId,
                    userIds: [],
                    subDepartmentIds: [],
                    parentDeptFlag: departmentDetails.parentDeptFlag,
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
            console.log('Department created successfully:', response.data);
            setSuccessMessage(`Department created successfully! ID: ${response.data.id}`);
            setErrorMessage('');
            setDepartmentDetails({
                departmentName: '',
                description: '',
                businessUnitId: '',
                parentDeptFlag: false,
                parentDepartmentId: '',
            });
        } catch (error) {
            console.error('Error creating department:', error);
            setErrorMessage('Failed to create department. Please try again.');
            setSuccessMessage('');
        }
    };

    const handleCancel = () => {
        navigate('/departments');
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{
                maxWidth: '1000px',
                margin: '0 auto',
                backgroundColor: '#fff',
                padding: '40px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Department</h2>
                {successMessage && <div style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>}
                {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

{/* Department Name */}
<div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
    <label style={{ fontWeight: 'bold', width: '250px' }}>Department Name:</label>
    <input
        type="text"
        name="departmentName"
        value={departmentDetails.departmentName}
        onChange={handleInputChange}
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '600px' }}  // Reduced width
    />
    {errorMessages.departmentName && <div style={{ color: 'red', fontSize: '12px', marginLeft: '10px' }}>{errorMessages.departmentName}</div>}
</div>

{/* Description */}
<div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
    <label style={{ fontWeight: 'bold', width: '250px' }}>Description:</label>
    <textarea
        name="description"
        value={departmentDetails.description}
        onChange={handleInputChange}
        rows="3"
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '600px' }}  // Reduced width
    />
    {errorMessages.description && <div style={{ color: 'red', fontSize: '12px', marginLeft: '10px' }}>{errorMessages.description}</div>}
</div>

{/* Business Unit ID */}
<div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
    <label style={{ fontWeight: 'bold', width: '250px' }}>Business Unit ID:</label>
    <input
        type="text"
        name="businessUnitId"
        value={departmentDetails.businessUnitId}
        onChange={handleInputChange}
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '600px' }}  // Reduced width
    />
    {errorMessages.businessUnitId && <div style={{ color: 'red', fontSize: '12px', marginLeft: '10px' }}>{errorMessages.businessUnitId}</div>}
</div>

{/* Parent Department Flag */}
<div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
    <label style={{ fontWeight: 'bold', width: '250px' }}>Is this a parent department?</label>
    <input
        type="checkbox"
        name="parentDeptFlag"
        checked={departmentDetails.parentDeptFlag}
        onChange={handleParentDeptFlagChange}
        style={{ marginLeft: '10px' }}
    />
    {errorMessages.parentDeptFlag && <div style={{ color: 'red', fontSize: '12px', marginLeft: '10px' }}>{errorMessages.parentDeptFlag}</div>}
</div>

{/* Parent Department ID (conditional display) */}
{!departmentDetails.parentDeptFlag && (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <label style={{ fontWeight: 'bold', width: '250px' }}>Parent Department ID:</label>
        <input
            type="text"
            name="parentDepartmentId"
            value={departmentDetails.parentDepartmentId}
            onChange={handleInputChange}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '600px' }}  // Reduced width
        />
        {errorMessages.parentDepartmentId && <div style={{ color: 'red', fontSize: '12px', marginLeft: '10px' }}>{errorMessages.parentDepartmentId}</div>}
    </div>
)}




                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
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

export default CreateDepartment;
