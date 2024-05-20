import { API_BASE_URL, get, post } from './config'

export const loginRequest = async ({ email, password }) => {
	return await post(`${API_BASE_URL}/api/users/login`, { email, password })
}

export const registerRequest = async ({ email, firstName, lastName, password }) => {
	return await post(`${API_BASE_URL}/api/users/register`, { email, firstName, lastName, password })
}

export const verifyTokenRequest = async (headers) => {
	return await get(`${API_BASE_URL}/api/users/verify-token`, headers)
}
