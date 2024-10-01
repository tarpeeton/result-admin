import axios from 'axios'
import { BASE_URL } from '../../components/constants/ApiUrl'

// Update Banner Information (Title, Description)
export const updateBannerInfo = async jsonData => {
	try {
		const res = await axios.put(`${BASE_URL}/api/case`, jsonData, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		return res.data
	} catch (error) {
		throw new Error(error)
	}
}
export const updateQuestionUpdate = async jsonData => {
	try {
		const res = await axios.put(`${BASE_URL}/api/case`, jsonData, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		return res.data
	} catch (error) {
		throw new Error(error)
	}
}

// Update Banner Image (Background or Main Image)
export const updateBannerImage = async (id, image) => {
	try {
		const formData = new FormData()
		formData.append('new-photo', image)

		const res = await axios.put(`${BASE_URL}/api/photo/${id}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		return res.data
	} catch (error) {
		throw new Error(error)
	}
}
