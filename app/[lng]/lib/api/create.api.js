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
    throw error; // Handle error accordingly
  }
};
