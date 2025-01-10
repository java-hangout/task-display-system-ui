import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2'; // Importing Bar chart component from Chart.js
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'; // Import necessary Chart.js components
import './ITDashboard.css'; // Import updated CSS

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ITDashboard = () => {
  const [taskData, setTaskData] = useState([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [isNoTasksAvailable, setIsNoTasksAvailable] = useState(false);
  const [showTable, setShowTable] = useState(true); // State to toggle between table and chart

  // Fetch task data
  const fetchTaskData = () => {
    fetch('http://localhost:8083/api/tasks/fetch/all')
      .then((response) => response.json())
      .then((data) => {
        const departmentTaskCounts = {};

        data.forEach((task) => {
          const { departmentName, status, title, dueDate } = task;
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
            departmentTaskCounts[departmentName].titles.push({ title, isOverdue });
          } else if (status === 'To-Do') {
            departmentTaskCounts[departmentName].toDo += 1;
          }
        });

        const taskEntries = Object.entries(departmentTaskCounts);
        setTaskData(taskEntries);

        const tasksInProgress = taskEntries.flatMap(([_, counts]) => counts.titles);
        setIsNoTasksAvailable(tasksInProgress.length === 0);
      })
      .catch((error) => console.error('Error fetching tasks:', error));
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchTaskData();

    // Refresh page every minute
    const refreshInterval = setInterval(() => {
      window.location.reload();
    }, 60000); // Refresh every minute

    return () => clearInterval(refreshInterval);
  }, []);

  // Change between table and chart every 30 seconds
  useEffect(() => {
    const pageSwitchInterval = setInterval(() => {
      setShowTable((prev) => !prev);
    }, 30000); // 30 seconds

    return () => clearInterval(pageSwitchInterval);
  }, []);

  // Handle task scroll in the table
  useEffect(() => {
    const taskScrollInterval = setInterval(() => {
      if (!isNoTasksAvailable && taskData.length > 0) {
        setCurrentTaskIndex((prevIndex) => {
          const totalTasks = taskData.flatMap(([_, counts]) => counts.titles).length;
          return (prevIndex + 1) % totalTasks;
        });
      }
    }, 5000); // Change task every 5 seconds

    return () => clearInterval(taskScrollInterval);
  }, [taskData, isNoTasksAvailable]);

  // Prepare chart data for Bar chart
  const chartData = {
    labels: taskData.map(([departmentName]) => departmentName),
    datasets: [
      {
        label: 'Done',
        data: taskData.map(([_, counts]) => counts.done),
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
        borderWidth: 1,
      },
      {
        label: 'In-Development',
        data: taskData.map(([_, counts]) => counts.inDevelopment),
        backgroundColor: '#FF9800',
        borderColor: '#FF9800',
        borderWidth: 1,
      },
      {
        label: 'To-Do',
        data: taskData.map(([_, counts]) => counts.toDo),
        backgroundColor: '#2196F3',
        borderColor: '#2196F3',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="dashboard-title">IT Task Dashboard</div>
      </header>

      <main className="main-content">
        <div className="content-wrapper">
          {/* Conditionally render table or chart */}
          {showTable ? (
            <div className="table-section">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Department Name</th>
                    <th className="done">Done</th>
                    <th className="inDevelopment">In-Development</th>
                    <th className="toDo">To-Do</th>
                    <th>In-Development Tasks</th>
                  </tr>
                </thead>
                <tbody>
                  {taskData.map(([departmentName, counts]) => (
                    <tr key={departmentName}>
                      <td>{departmentName}</td>
                      <td className="done">{counts.done}</td>
                      <td className="inDevelopment">{counts.inDevelopment}</td>
                      <td className="toDo">{counts.toDo}</td>
                      <td className="scrolling-column">
                        <div className="scrolling-content">
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
            </div>
          ) : (
            <div className="chart-section">
              <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
            </div>
          )}
        </div>
      </main>

      <footer className="dashboard-footer">
        <p>© 2025 OSB Group. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default ITDashboard;
