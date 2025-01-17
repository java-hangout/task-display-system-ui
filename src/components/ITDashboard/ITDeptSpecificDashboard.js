import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ITDeptSpecificDashboard.css";
import oneSavingBankLogo from './oneSavingBankLogo.png';

const ITDeptSpecificDashboard = () => {
    const { departmentName } = useParams();
    const [taskData, setTaskData] = useState([]);
    const [isNoTasksAvailable, setIsNoTasksAvailable] = useState(false);
    const [rewards, setRewards] = useState([]);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [currentRewardIndex, setCurrentRewardIndex] = useState(0);

    // Fetch task data
    const fetchTaskData = () => {
        fetch("http://localhost:8083/api/tasks/fetch/all")
            .then((response) => response.json())
            .then((data) => {
                const departmentTaskCounts = {};

                data.forEach((task) => {
                    const { departmentName: deptName, status, title, dueDate } = task;
                    const isOverdue = dueDate && new Date(dueDate) < new Date();

                    if (!departmentTaskCounts[deptName]) {
                        departmentTaskCounts[deptName] = {
                            done: 0,
                            inDevelopment: 0,
                            toDo: 0,
                            titles: [],
                        };
                    }

                    if (status === "Done") {
                        departmentTaskCounts[deptName].done += 1;
                    } else if (status === "In-Development") {
                        departmentTaskCounts[deptName].inDevelopment += 1;
                        departmentTaskCounts[deptName].titles.push({ title, isOverdue });
                    } else if (status === "To-Do") {
                        departmentTaskCounts[deptName].toDo += 1;
                    }
                });

                const filteredData = departmentTaskCounts[departmentName]
                    ? { [departmentName]: departmentTaskCounts[departmentName] }
                    : {};

                const taskEntries = Object.entries(filteredData);
                setTaskData(taskEntries);

                const tasksInProgress = taskEntries.flatMap(([_, counts]) => counts.titles);
                setIsNoTasksAvailable(tasksInProgress.length === 0);
            })
            .catch((error) => console.error("Error fetching tasks:", error));
    };

    // Fetch rewards data
    const fetchRewards = () => {
        fetch(`http://localhost:8081/api/rewards/fetch/department/${departmentName}`)
            .then((response) => response.json())
            .then((data) => {
                setRewards(data);
            })
            .catch((error) => console.error("Error fetching rewards:", error));
    };

    useEffect(() => {
        fetchTaskData();
        fetchRewards();
    }, [departmentName]);

    // Automatically scroll through tasks
    useEffect(() => {
        if (!isNoTasksAvailable && taskData.length > 0) {
            const taskScrollInterval = setInterval(() => {
                setCurrentTaskIndex((prevIndex) => {
                    const totalTasks = taskData.flatMap(
                        ([_, counts]) => counts.titles
                    ).length;
                    return (prevIndex + 1) % totalTasks;
                });
            }, 5000); // 5 seconds interval to scroll through tasks

            return () => clearInterval(taskScrollInterval);
        }
    }, [taskData, isNoTasksAvailable]);

    // Automatically scroll through rewards
    useEffect(() => {
        if (rewards.length > 0) {
            const rewardScrollInterval = setInterval(() => {
                setCurrentRewardIndex((prevIndex) => {
                    const newIndex = (prevIndex + 1) % rewards.length;
                    return newIndex;
                });
            }, 5000); // 5 seconds interval for rewards

            return () => clearInterval(rewardScrollInterval);
        }
    }, [rewards]);

    return (
        <div className="department-dashboard-container">
            <header className="dashboard-header">
                <div className="dashboard-title">{departmentName} Task Dashboard</div>
            </header>

            <main className="main-content">
                <div className="content-wrapper">
                    <div className="dashboard-flex">
                        {/* Task Table Section */}
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
                                                            className={`active ${counts.titles[currentTaskIndex % counts.titles.length].isOverdue
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

                        {/* Rewards Section */}
                        <div className="rewards-section">
                            <div className="rewards-left">
                                <h3 className="rewards-heading">Rewards & Recognitions</h3>
                                {rewards.length > 0 ? (
                                    <div className="reward-item show">
                                        <div className="reward-card">
                                            <table className="reward-details-table">
                                                <tbody>
                                                    <tr>
                                                        <td><button className="info-button">Name:</button></td>
                                                        <td><button className="info-button"><strong>{rewards[currentRewardIndex].userName}</strong></button></td>
                                                    </tr>
                                                    <tr>
                                                        <td><button className="info-button">Reward Type:</button></td>
                                                        <td><button className="info-button"><strong>{rewards[currentRewardIndex].rewardType}</strong></button></td>
                                                    </tr>
                                                    <tr>
                                                        <td><button className="info-button">Reason:</button></td>
                                                        <td><button className="info-button"><strong>{rewards[currentRewardIndex].reason}</strong></button></td>
                                                    </tr>
                                                    <tr>
                                                        <td><button className="info-button">Rewarded By:</button></td>
                                                        <td><button className="info-button">{rewards[currentRewardIndex].rewardedBy}</button></td>
                                                    </tr>
                                                    <tr>
                                                        <td><button className="info-button">Date:</button></td>
                                                        <td><button className="info-button">{rewards[currentRewardIndex].rewardDate}</button></td>
                                                    </tr>
                                                    <tr>
                                                        <td><button className="info-button">Tags:</button></td>
                                                        <td>
                                                            {rewards[currentRewardIndex].tags.length > 0 ? (
                                                                rewards[currentRewardIndex].tags.map((tag, index) => (
                                                                    <button className="tag-button" key={index}>{tag}</button>
                                                                ))
                                                            ) : (
                                                                <span>No tags available</span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="no-rewards">No rewards found for this department.</div>
                                )}
                            </div>

                            {/* Certificate Image */}
                            <div className="certificate-image">
                                <img src={oneSavingBankLogo}  alt="Certificate Logo" className="reward-logo" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="dashboard-footer">
                <p>© 2025 OSB Group. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default ITDeptSpecificDashboard;
