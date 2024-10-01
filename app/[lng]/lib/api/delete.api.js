import axios from 'axios'
import { BASE_URL } from '../../components/constants/ApiUrl'




// GET ALL REVIEWS
export const deleteMember = async id => {
	try {
		const res = await axios.delete(`${BASE_URL}/api/team/${id}`)

		return res.data
	} catch (error) {
		// Throw an error if the request fails
		throw new Error(error)
	}
}
export const deleteImage = async id => {
	try {
		const res = await axios.delete(`${BASE_URL}/api/photo/${id}`)

		return res.data
	} catch (error) {
		// Throw an error if the request fails
		throw new Error(error)
	}
}
export const deleteCase = async id => {
	try {
		const res = await axios.delete(`${BASE_URL}/api/case/${id}`)

		return res.data
	} catch (error) {
		// Throw an error if the request fails
		throw new Error(error)
	}
}
