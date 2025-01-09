import React, { useEffect, useState } from 'react';
import './ITDashboard.css'; // Import updated CSS

const ITDashboard = () => {
  const [taskData, setTaskData] = useState([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [isNoTasksAvailable, setIsNoTasksAvailable] = useState(false);

  // Function to fetch task data
  const fetchTaskData = () => {
    fetch('http://localhost:8083/api/tasks/fetch/all')
      .then((response) => response.json())
      .then((data) => {
        const departmentTaskCounts = {};

        // Initialize the task counts and task titles per department
        data.forEach((task) => {
          const { departmentName, status, title, dueDate } = task;

          // Ensure that 'dueDate' exists and is a valid date
          const isOverdue = dueDate && new Date(dueDate) < new Date();

          if (!departmentTaskCounts[departmentName]) {
            departmentTaskCounts[departmentName] = {
              done: 0,
              inDevelopment: 0,
              toDo: 0,
              titles: [],
            };
          }

          // Count tasks by status
          if (status === 'Done') {
            departmentTaskCounts[departmentName].done += 1;
          } else if (status === 'In-Development') {
            departmentTaskCounts[departmentName].inDevelopment += 1;
            // Add task title and its overdue status to titles array
            departmentTaskCounts[departmentName].titles.push({ title, isOverdue });
          } else if (status === 'To-Do') {
            departmentTaskCounts[departmentName].toDo += 1;
          }
        });

        const taskEntries = Object.entries(departmentTaskCounts);
        setTaskData(taskEntries);

        // Check if there are no tasks in "In-Development" across all departments
        const tasksInProgress = taskEntries.flatMap(([_, counts]) => counts.titles);
        setIsNoTasksAvailable(tasksInProgress.length === 0);
      })
      .catch((error) => console.error('Error fetching tasks:', error));
  };

  useEffect(() => {
    // Fetch task data when the component is mounted
    fetchTaskData();

    // Auto-refresh the page every 60 seconds (60000 ms)
    const refreshInterval = setInterval(() => {
      window.location.reload();
    }, 60000); // Refresh every minute

    // Clean up the refresh interval when the component unmounts
    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    // Only set the interval if there are tasks in progress
    const taskScrollInterval = setInterval(() => {
      if (!isNoTasksAvailable && taskData.length > 0) {
        setCurrentTaskIndex((prevIndex) => {
          // Loop over task titles continuously
          const totalTasks = taskData.flatMap(([_, counts]) => counts.titles).length;
          return (prevIndex + 1) % totalTasks;
        });
      }
    }, 5000); // Change task every 5 seconds

    // Clean up the task scroll interval
    return () => clearInterval(taskScrollInterval);
  }, [taskData, isNoTasksAvailable]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="dashboard-title">IT Task Dashboard</div>
      </header>

      <main className="main-content">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Department Name</th>
              <th className="done">Done</th>
              <th className="inDevelopment">In-Development</th>
              <th className="toDo">To-Do</th>
              <th>In-Development Task Title</th>
            </tr>
          </thead>
          <tbody>
            {taskData.map(([departmentName, counts], departmentIndex) => (
              <tr key={departmentName}>
                <td>{departmentName}</td>
                <td className="done">{counts.done}</td>
                <td className="inDevelopment">{counts.inDevelopment}</td>
                <td className="toDo">{counts.toDo}</td>
                <td className="scrolling-column">
                  <div className="scrolling-content">
                    {/* Check if the department has any tasks */}
                    {counts.titles.length > 0 ? (
                      <div
                        className={`active ${
                          counts.titles[currentTaskIndex % counts.titles.length].isOverdue
                            ? 'overdue'
                            : ''
                        }`}
                      >
                        {counts.titles[currentTaskIndex % counts.titles.length].title}
                      </div>
                    ) : (
                      <div className="no-task">No tasks in progress</div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <footer className="dashboard-footer">
        <p>© 2025 OSB Group. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default ITDashboard;
