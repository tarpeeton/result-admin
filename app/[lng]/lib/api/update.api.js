import axios from 'axios';

// Update Banner Information (Title, Description)
export const updateBannerInfo = async (jsonData) => {
	console.log(jsonData , "API JSON DATA")
  try {
    const res = await axios.put('http://213.230.91.55:8190/api/case', jsonData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

// Update Banner Image (Background or Main Image)
export const updateBannerImage = async (id, image) => {
  try {
    const formData = new FormData();
    formData.append('new-photo', image);

    const res = await axios.put(`http://213.230.91.55:8190/api/photo/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
