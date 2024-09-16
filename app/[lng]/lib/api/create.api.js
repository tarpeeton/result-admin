// api/createReview.js
import axios from 'axios';

export const createReview = async (reviewData) => {
	console.log(reviewData , "REDSKJSIJDFIDHFUsdf")
  try {
    const response = await axios.post('/api/review', reviewData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};




export const createService = async (serviceData) => {
  try {
    const response = await axios.post('https://result-me.uz/api/service', serviceData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Important for FormData
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
};


