import axios from 'axios';

// Update member information
export const editMember = async (jsonData) => {
  try {
    const res = await axios.put(`http://213.230.91.55:8190/api/team`, jsonData); // Pass jsonData directly
    return res.data;
  } catch (error) {
    // Handle the error
    throw new Error(error.response ? error.response.data.message : error.message); // Provide more detailed error message
  }
};
export const editImage = async (id ,photoData) => {
  try {
    const res = await axios.put(`http://213.230.91.55:8190/api/photo/${id}`, photoData); // Pass jsonData directly
    return res.data;
  } catch (error) {
    // Handle the error
    throw new Error(error.response ? error.response.data.message : error.message); // Provide more detailed error message
  }
};
