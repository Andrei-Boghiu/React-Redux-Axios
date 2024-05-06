export const API_BASE_URL = 'http://localhost:3001'

export const getHeaders = () => {
	const token = localStorage.getItem('token')
	return {
		Authorization: token ? `Bearer ${token}` : '',
	}
}
