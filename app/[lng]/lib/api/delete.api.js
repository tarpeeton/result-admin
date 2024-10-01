import axios from 'axios'

// GET ALL REVIEWS
export const deleteMember = async id => {
	try {
		const res = await axios.delete(`http://213.230.91.55:8190/api/team/${id}`)

		return res.data
	} catch (error) {
		// Throw an error if the request fails
		throw new Error(error)
	}
}
export const deleteImage = async id => {
	try {
		const res = await axios.delete(`http://213.230.91.55:8190/api/photo/${id}`)

		return res.data
	} catch (error) {
		// Throw an error if the request fails
		throw new Error(error)
	}
}
export const deleteCase = async id => {
	try {
		const res = await axios.delete(`http://213.230.91.55:8190/api/case/${id}`)

		return res.data
	} catch (error) {
		// Throw an error if the request fails
		throw new Error(error)
	}
}


