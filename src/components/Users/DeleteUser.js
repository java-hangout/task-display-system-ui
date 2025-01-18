import React from 'react';
import axios from 'axios';

const DeleteUser = ({ userId, onDeleteSuccess, onDeleteError }) => {
  // Function to handle the delete action
  const handleDelete = async () => {
    if (!userId) {
      console.error("User ID is not provided!");
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:8081/api/users/delete/${userId}`);
      if (response.status === 204) {
        console.log(`User with ID ${userId} deleted successfully.`);
        if (onDeleteSuccess) onDeleteSuccess(userId); // Trigger success callback
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      if (onDeleteError) onDeleteError(error); // Trigger error callback
    }
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        style={{
          backgroundColor: '#ff4d4d',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1rem',
        }}
      >
        Delete User
      </button>
    </div>
  );
};

export default DeleteUser;
