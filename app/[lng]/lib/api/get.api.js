import axios from 'axios'
import { BASE_URL } from '../../components/constants/ApiUrl'

// GET ALL REVIEWS
export const getReviewsAll = async () => {
	try {
		const res = await axios.get(`${BASE_URL}/api/review`, {
			// Set the Accept-Language header to the language of the reviews
			headers: {
				'Accept-Language': '-', // Use wildcard to request all languages
			},
		})

		return res.data
	} catch (error) {
		// Throw an error if the request fails
		throw new Error(error)
	}
}
export const getAllBlogs = async lng => {
	try {
		const res = await axios.get(`${BASE_URL}/api/blog/all`, {
			// Set the Accept-Language header to the language of the reviews
			headers: {
				'Accept-Language': `${lng}`, // Use wildcard to request all languages
			},
		})

		return res.data
	} catch (error) {
		// Throw an error if the request fails
		throw new Error(error)
	}
}

export const getBlogWithSlug = async slug => {
	try {
		const res = await axios
			.get(`${BASE_URL}/api/blog/${slug}`, {
				headers: {
					'Accept-Language': '-', // Use wildcard to request all languages
				},
			})
			.catch(error => {
				console.error('Error for fetching blogsx', error)
			})

		return res.data
	} catch (error) {
		// Throw an error if the request fails
		throw new Error(error.message || 'Failed to fetch blog data')
	}
}

export const getMainBanner = async lng => {
	// Return fake data for testing
	return {
		message: 'Test message',
		data: {
			title: 'Медицинский маркетинг IT решения',
			subtitle: 'Привлекаем клиентов для медицинского бизнеса',
			background: {
				id: 1,
				url: 'https://ucarecdn.com/ff86fa38-8ed3-4294-883c-8ec965cfd6f3/-/preview/1000x357/',
			},
			photo: {
				id: 2,
				url: 'https://ucarecdn.com/8ae2ac1e-8134-4659-8e98-0e9183c06409/-/preview/360x247/',
			},
		},
	}
}

// GET ALL MEMBERS

export const getAllMembers = async lng => {
	try {
		const res = await axios.get(`${BASE_URL}/api/team/all`, {
			// Set the Accept-Language header to the language of the reviews
			headers: {
				'Accept-Language': '-',
			},
		})

		return res.data.data
	} catch (error) {
		// Throw an error if the request fails
		console.log(error.message)
	}
}
export const getSingleMember = async memberID => {
	try {
		const res = await axios.get(`${BASE_URL}/api/team/${memberID}`, {
			headers: {
				'Accept-Language': '-', // Set the supported language
			},
		})
		return res.data.data
	} catch (error) {
		// Log the error message
		console.log(error.message)
		return null
	}
}
export const getSingleCase = async ID => {
	try {
		const res = await axios.get(`${BASE_URL}/api/case/${ID}`, {
			headers: {
				'Accept-Language': '-', // Set the supported language
			},
		})
		return res.data.data
	} catch (error) {
		// Log the error message
		console.log(error.message)
		return null
	}
}
export const getAllCases = async (typeID, lng) => {
	try {
		const res = await axios.get(`${BASE_URL}/api/case/all`, {
			headers: {
				'Accept-Language': lng, // Set the supported language
			},
			params: typeID ? { 'type-id': typeID } : {}, // Only pass typeID if it's not null
		})
		return res.data.data
	} catch (error) {
		// Log the error message
		console.log(error.message)
		return null
	}
}
