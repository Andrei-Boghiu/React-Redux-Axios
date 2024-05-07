import axios from 'axios'
import { API_BASE_URL } from './config'
import { getHeaders } from './config'

export const loginRequest = async ({ email, password }) => {
	return await axios.post(`${API_BASE_URL}/api/users/login`, {
		email,
		password,
	})
}

export const requestRegister = async ({ email, firstName, lastName, password }) => {
	return await axios.post(`${API_BASE_URL}/api/users/register`, {
		email, firstName, lastName, password
	})
}

export const requestVerifyToken = async () => {
	return await axios.get(`${API_BASE_URL}/api/users/verify-token`, {
		headers: getHeaders(),
	})
}
