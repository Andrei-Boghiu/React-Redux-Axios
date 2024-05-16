import { API_BASE_URL, get, post } from './config'

export const getAllUsers = async (headers) => {
	return await get(`${API_BASE_URL}/api/users/get-all-users`, headers)
}

export const getUserProfile = async (headers) => {
	return await get(`${API_BASE_URL}/api/users/user-profile`, headers)
}

export const updateUserRole = async (headers, userId, newRole) => {
	return await post(`${API_BASE_URL}/api/users/update-role`, { userId, newRole }, headers)
}
