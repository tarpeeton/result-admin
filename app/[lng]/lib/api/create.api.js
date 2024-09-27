// api/createReview.js
import axios from 'axios'

export const createReview = async reviewData => {
	try {
		const response = await axios.post(
			'http://213.230.91.55:8190/api/review',
			reviewData,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
		return response.data
	} catch (error) {
		console.error('Error creating review:', error)
		throw error
	}
}

export const createService = async serviceData => {
	try {
		const response = await axios.post(
			'http://213.230.91.55:8190/api/service',
			serviceData,
			{
				headers: {
					'Content-Type': 'multipart/form-data', // Important for FormData
				},
			}
		)
		return response.data
	} catch (error) {
		console.error('Error creating service:', error)
		throw error
	}
}
export const createCase = async serviceData => {
	try {
		const response = await axios.post(
			'http://213.230.91.55:8190/api/case',
			serviceData,
			{
				headers: {
					'Content-Type': 'multipart/form-data', // Important for FormData
				},
			}
		)
		return response.data
	} catch (error) {
		console.error('Error creating service:', error)
		throw error
	}
}
export const createPartner = async formData => {
	try {
		const response = await axios.post(
			// 'http://213.230.91.55:8190/api/partner/create',
			'http://13.61.1.182:8190/api/partner/create',
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data', // Important for FormData
				},
			}
		)
		return response.data
	} catch (error) {
		console.error('Error creating service:', error)
		throw error
	}
}
export const createProject = async formData => {
	try {
		const response = await axios.post(
			'http://213.230.91.55:8190/api/project',
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data', // Important for FormData
				},
			}
		)
		return response.data
	} catch (error) {
		console.error('Error creating service:', error)
		throw error
	}
}
export const createMembers = async formData => {
	try {
		const response = await axios.post(
			'http://13.61.1.182:8190/api/team',
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data', // Important for FormData
				},
			}
		)
		return response.data
	} catch (error) {
		console.error('Error creating service:', error)
		throw error
	}
}


export const createImage = async formData => {
	try {
		const response = await axios.post(
			'http://213.230.91.55:8190/api/photo', // URL from your screenshot
			formData,
			
		)
		return response.data
	} catch (error) {
		console.error('Error uploading images:', error)
		throw error
	}
}

// BLOG CREATE
export const createBlog = async (formData) => {
	try {
	  const response = await axios.post(
		'http://213.230.91.55:8190/api/blog',
		formData,
		{
		  headers: {
			"Content-Type": "multipart/form-data", // Explicitly setting Content-Type
		  },
		}
	  );
	  return response.data;
	} catch (error) {
	  console.error("Error uploading blog:", error);
	  throw error;
	}
  };
