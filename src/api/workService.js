import axios from 'axios'
import { getHeaders } from './config'
import { API_BASE_URL } from './config'

export const fetchAssignNewItem = async () => {
	return await axios.get(`${API_BASE_URL}/api/work/assign-new-item`, { headers: getHeaders() })
}

export const getUserWorkItems = async () => {
	return await axios.get(`${API_BASE_URL}/api/work/get-user-items`, { headers: getHeaders() })
}

export const updateItemComplete = async (workItemId) => {
	return await axios.patch(`${API_BASE_URL}/api/work/set-completed`, { workItemId }, { headers: getHeaders() })
}

export const updateItemUnassign = async (workItemId) => {
	return await axios.patch(`${API_BASE_URL}/api/work/set-unassigned`, { workItemId }, { headers: getHeaders() })
}

export const insertWorkItems = async (data) => {
	return await axios.post(`${API_BASE_URL}/api/work/admin/add-items`, data, { headers: getHeaders() })
}