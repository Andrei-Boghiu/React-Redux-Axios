import { API_BASE_URL, get, post } from './config'

// Allocation
export const newItemsAllocation = async (headers, data) => {
	return await post(`${API_BASE_URL}/api/work/allocation/add-new-items`, data, headers)
}

export const updateItemsAllocation = async (headers, data) => {
	return await post(`${API_BASE_URL}/api/work/allocation/update-items`, data, headers)
}

export const addUpdateItemsAllocation = async (headers, data) => {
	return await post(`${API_BASE_URL}/api/work/allocation/add-update-items`, data, headers)
}

export const removeItemsAllocation = async (headers, data) => {
	return await post(`${API_BASE_URL}/api/work/allocation/remove-items`, data, headers)
}

export const adhocTaskAllocation = async (headers, data) => {
	return await post(`${API_BASE_URL}/api/work/allocation/add-adhoc-task`, data, headers)
}

// Distribution
export const fetchUserLobby = async (headers) => {
	return await get(`${API_BASE_URL}/api/work/distribution/user-lobby`, headers)
}

export const fetchNewItem = async (headers) => {
	return await get(`${API_BASE_URL}/api/work/distribution/get-item`, headers)
}

// Operations
export const transferItem = async (headers, workItemId) => {
	return await post(`${API_BASE_URL}/api/work/operations/transfer-item`, { workItemId }, headers)
}

export const updateStatus = async (headers, config) => {
	return await post(`${API_BASE_URL}/api/work/operations/update-status`, config, headers)
}