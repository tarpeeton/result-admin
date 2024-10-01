import axios from 'axios';
import { BASE_URL } from '../../components/constants/ApiUrl';



// Update member information
export const editMember = async (jsonData) => {
  try {
    const res = await axios.put(`${BASE_URL}/api/team`, jsonData); // Pass jsonData directly
    return res.data;
  } catch (error) {
    // Handle the error
    throw new Error(error.response ? error.response.data.message : error.message); // Provide more detailed error message
  }
};
export const editImage = async (id ,photoData) => {
  try {
    const res = await axios.put(`${BASE_URL}/api/photo/${id}`, photoData); // Pass jsonData directly
    return res.data;
  } catch (error) {
    // Handle the error
    throw new Error(error.response ? error.response.data.message : error.message); // Provide more detailed error message
  }
};


export const updateBlog = async (jsonData) => {
  try {
    const res = await axios.put(
      `${BASE_URL}/api/blog`, 
      JSON.stringify(jsonData),  // Convert the JSON object to a string
      {
        headers: {
          'Content-Type': 'application/json',  // Specify that the content is JSON
        },
      }
    );
    return res.data;
  } catch (error) {
    // Handle the error
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};
