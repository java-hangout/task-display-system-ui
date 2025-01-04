import React, { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../context/ApiContext';

const TaskList = () => {
    const api = useContext(ApiContext);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await api.get('/api/tasks/fetch/all');
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            } finally {
                setLoading(false);
            }
        };

        if (api.defaults.headers['Authorization']) {
            fetchTasks();
        } else {
            console.log('No token found, please log in.');
        }
    }, [api]);

    return (
        <div>
            <h1>Task List</h1>
            {loading ? (
                <p>Loading tasks...</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <strong>{task.title}</strong> - {task.description} (Status: {task.status}, Priority: {task.priority})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
