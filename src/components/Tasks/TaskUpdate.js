import React, { useState } from 'react';
import axios from 'axios';

const TaskUpdate = ({ task, onClose }) => {
    const [taskData, setTaskData] = useState({ ...task });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:8083/api/tasks/update/${task.id}`,
                taskData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Task updated successfully:', response.data);
            onClose(); // Close the form after successful update
        } catch (error) {
            console.error('Error updating task:', error);
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
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Update Task</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                    {/* Render Fields */}
                    {[
                        { label: 'Task ID', name: 'id', type: 'text', value: taskData.id, readOnly: true },
                        { label: 'Title', name: 'title', type: 'text', value: taskData.title },
                        { label: 'Description', name: 'description', type: 'textarea', value: taskData.description },
                        { label: 'Status', name: 'status', type: 'select', value: taskData.status, options: ['To-Do', 'In-Development', 'Completed'] },
                        { label: 'Priority', name: 'priority', type: 'select', value: taskData.priority, options: ['Low', 'Medium', 'High'] },
                        { label: 'Due Date', name: 'dueDate', type: 'datetime-local', value: taskData.dueDate },
                        { label: 'Comments', name: 'comments', type: 'textarea', value: taskData.comments },
                    ].map(({ label, name, type, value, readOnly, options }) => (
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
                            Update Task
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

export default TaskUpdate;
