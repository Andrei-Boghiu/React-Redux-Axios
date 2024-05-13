import axios from "axios"
import { API_BASE_URL } from "./config"

export const getAllUsers = async (headers) => {
	return await axios.get(`${API_BASE_URL}/api/users/get-all-users`, {
		headers: headers,
	})
}

export const getUserProfile = async (headers) => {
	return await axios.get(`${API_BASE_URL}/api/users/user-profile`, {
		headers: headers,
	})
}

export const updateUserRole = async (userId) => {
	// [...]
}
