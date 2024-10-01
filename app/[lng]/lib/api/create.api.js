import axios from 'axios'
import { BASE_URL } from '../../components/constants/ApiUrl'


export const createReview = async reviewData => {
	try {
		const response = await axios.post(
			`${BASE_URL}/api/review`,
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
			`${BASE_URL}/api/service`,
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
			`${BASE_URL}/api/case`,
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
			`${BASE_URL}/api/partner/create`,
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
			`${BASE_URL}/api/project`,
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
			`${BASE_URL}/api/team`,
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
			`${BASE_URL}/api/photo`, // URL from your screenshot
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
		`${BASE_URL}/api/blog`,
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
