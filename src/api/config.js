export const API_BASE_URL = 'http://localhost:3001'

export const getHeaders = (userRoleAuthority) => {
	const token = localStorage.getItem('token')
	return {
		Authorization: token ? `Bearer ${token}` : '',
		'Role_Authority_Level': userRoleAuthority || 9999
	}
}
