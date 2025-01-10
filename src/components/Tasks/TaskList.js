import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskUpdate from './TaskUpdate';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const username = localStorage.getItem('username'); // Retrieve the username dynamically
                if (!username) {
                    console.error('No username found in local storage');
                    return;
                }
                console.log('username found in local storage', username);
                const response = await axios.get(
                    `http://localhost:8083/api/tasks/assignedTo/${username}`
                );
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const handleUpdateClick = (task) => {
        setSelectedTask(task);
        setIsUpdating(true);
    };

    const handleCloseUpdate = () => {
        setIsUpdating(false);
        setSelectedTask(null);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Extract only the date part
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <div style={{ width: '100%', maxWidth: '1200px' }}>
                {/* Only show the "Task List" label if we're not in updating mode */}
                {!isUpdating && <h2 style={{ textAlign: 'center' }}>Task List</h2>}
                
                {!isUpdating && (
                    <table
                        style={{
                            borderCollapse: 'collapse',
                            width: '100%',
                            margin: '20px 0',
                            border: '1px solid #ddd',
                            textAlign: 'left',
                        }}
                    >
                        <thead>
                            <tr style={{ border: '1px solid black' }}>
                                <th style={{ border: '1px solid black', padding: '8px',textAlign: 'center' }}>Task ID</th>
                                <th style={{ border: '1px solid black', padding: '8px',textAlign: 'center' }}>Title</th>
                                <th style={{ border: '1px solid black', padding: '8px',textAlign: 'center' }}>Description</th>
                                <th
                                    style={{
                                        border: '1px solid black',
                                        padding: '8px',textAlign: 'center',
                                        width: '11%', // Increased width for Status
                                    }}
                                >
                                    Status
                                </th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Priority</th>
                                <th
                                    style={{
                                        border: '1px solid black',
                                        padding: '8px',textAlign: 'center',
                                        width: '9%', // Increased width for Due Date
                                    }}
                                >
                                    Due Date
                                </th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Comments</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task) => (
                                <tr key={task.id} style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>
                                        {task.id}
                                    </td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>
                                        {task.title}
                                    </td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>
                                        {task.description}
                                    </td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>
                                        {task.status}
                                    </td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>
                                        {task.priority}
                                    </td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>
                                        {formatDate(task.dueDate)}
                                    </td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>
                                        {task.comments}
                                    </td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>
                                        <button onClick={() => handleUpdateClick(task)}>Update</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {isUpdating && selectedTask && (
                    <TaskUpdate task={selectedTask} onClose={handleCloseUpdate} />
                )}
            </div>
        </div>
    );
};

export default TaskList;
