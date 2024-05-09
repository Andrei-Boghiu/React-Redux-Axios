import axios from "axios"
import { getHeaders, API_BASE_URL } from "./config"

export const getAllUsers = async () => {
	return await axios.get(`${API_BASE_URL}/api/users/get-all-users`, {
		headers: getHeaders(),
	})
}

export const getUserProfile = async () => {
	return await axios.get(`${API_BASE_URL}/api/users/get-user-profile`, {
		headers: getHeaders(),
	})
}

export const sendRequestTeamAccess = async (teamId) => {
	return await axios.patch(`${API_BASE_URL}/api/users/request-team-access`, { teamId }, { headers: getHeaders() })
}

export const updateUserRole = async (userId) => {
	// [...]
}
