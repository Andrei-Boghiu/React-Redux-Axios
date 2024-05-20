import { API_BASE_URL, get, post } from './config'

export const fetchAvailableTeamsToJoin = async (headers) => {
	return await get(`${API_BASE_URL}/api/teams/available-to-join`, headers)
}

export const requestTeamAccess = async (headers, teamId) => {
	return await post(`${API_BASE_URL}/api/teams/request-access`, { teamId }, headers)
}

export const requestCreateNewTeam = async (headers, { teamName, teamDescription }) => {
	return await post(`${API_BASE_URL}/api/teams/request-create-new-team`, { teamName, teamDescription }, headers)
}

export const checkUserTeams = async (headers) => {
	return await get(`${API_BASE_URL}/api/teams/check-user-teams`, headers)
}

export const getAllTeams = async (headers) => {
	return await get(`${API_BASE_URL}/api/teams/all-teams`, headers)
}

export const getMyTeams = async (headers) => {
	return await get(`${API_BASE_URL}/api/teams/my-teams`, headers)
}

export const getMyTeam = async (headers, teamId) => {
	return await post(`${API_BASE_URL}/api/teams/my-team`, { teamId }, headers)
}

export const getAdminsMembers = async (headers) => {
	return await get(`${API_BASE_URL}/api/teams/admin-members`, headers)
}

export const approveNewMember = async (headers, newUserId, teamId = undefined) => {
	return await post(`${API_BASE_URL}/api/teams/approve-new-member`, { newUserId, teamId }, headers)
}

export const approveNewTeam = async (headers, teamId) => {
	return await post(`${API_BASE_URL}/api/teams/approve-new-team`, { teamId }, headers)
}
