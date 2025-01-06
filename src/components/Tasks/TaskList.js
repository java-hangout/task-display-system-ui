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
                console.error('username found in local storage',username);
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
        <div>
            {/* Show Task List if no task is being updated */}
            {!isUpdating && (
                <>
                    <h2>Task List</h2>
                    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                        <thead>
                            <tr style={{ border: '1px solid black' }}>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Task ID</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Title</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Description</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Status</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Priority</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Due Date</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Comments</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task) => (
                                <tr key={task.id} style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{task.id}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{task.title}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{task.description}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{task.status}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{task.priority}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{formatDate(task.dueDate)}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{task.comments}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>
                                        <button onClick={() => handleUpdateClick(task)}>Update</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

            {/* Show Task Update form if isUpdating is true */}
            {isUpdating && selectedTask && (
                <TaskUpdate task={selectedTask} onClose={handleCloseUpdate} />
            )}
        </div>
    );
};

export default TaskList;
