import { API_BASE_URL, get } from './config'

export const fetchCountAvailableWorkItems = async (headers) => {
    return await get(`${API_BASE_URL}/api/stats/available-work-items-count`, headers)
}