import axios from 'axios'

export const API_BASE_URL = 'http://localhost:3001'

export const handleResponse = (response) => response.data

export const handleError = (error) => {
	if (error.response) {
		console.error('Server responded with a status other than 2xx:', error.response)
	} else if (error.request) {
		console.error('Request was made but no response received:', error.request)
	} else {
		console.error('Something happened in setting up the request:', error.message)
	}
	throw error
}

export const get = async (url, headers) => {
	try {
		const response = await axios.get(url, { headers })
		return handleResponse(response)
	} catch (error) {
		handleError(error)
	}
}

export const post = async (url, data, headers) => {
	try {
		const response = await axios.post(url, data, { headers })
		return handleResponse(response)
	} catch (error) {
		handleError(error)
	}
}

export const patch = async (url, data, headers) => {
	try {
		const response = await axios.patch(url, data, { headers })
		return handleResponse(response)
	} catch (error) {
		handleError(error)
	}
}
