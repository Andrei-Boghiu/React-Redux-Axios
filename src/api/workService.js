import { API_BASE_URL, get, post, patch } from './config'

export const fetchAssignNewItem = async (headers) => {
	return await get(`${API_BASE_URL}/api/work/assign-new-item`, headers)
}

export const getUserWorkItems = async (headers) => {
	return await get(`${API_BASE_URL}/api/work/lobby`, headers)
}

export const updateItemComplete = async (headers, workItemId) => {
	return await patch(`${API_BASE_URL}/api/work/set-completed`, { workItemId }, headers)
}

export const updateItemUnassign = async (headers, workItemId) => {
	return await patch(`${API_BASE_URL}/api/work/set-unassigned`, { workItemId }, headers)
}

export const insertWorkItems = async (headers, data) => {
	return await post(`${API_BASE_URL}/api/work/admin/add-items`, data, headers)
}
