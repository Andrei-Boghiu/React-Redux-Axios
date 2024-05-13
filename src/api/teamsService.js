import axios from "axios"
import { API_BASE_URL } from "./config"

export const fetchAvailableTeamsToJoin = async (headers) => {
	return await axios.get(`${API_BASE_URL}/api/teams/available-to-join`, {
		headers: headers,
	})
}

export const requestTeamAccess = async (headers, teamId) => {
	return await axios.post(`${API_BASE_URL}/api/teams/request-access`, { teamId }, { headers: headers })
}

export const checkUserTeams = async (headers) => {
	return await axios.get(`${API_BASE_URL}/api/teams/check-user-teams`, {
		headers: headers,
	})
}

export const getAllTeams = async (headers) => {
	return await axios.get(`${API_BASE_URL}/api/teams/all-teams`, {
		headers: headers,
	})
}

export const getMyTeams = async (headers) => {
	return await axios.get(`${API_BASE_URL}/api/teams/my-teams`, {
		headers: headers,
	})
}

export const getMyTeam = async (headers, teamId) => {
	return await axios.post(`${API_BASE_URL}/api/teams/my-team`, { teamId }, {
		headers: headers,
	})
}