import { useAuth } from './useAuth'
import { useMemo } from 'react'

export const useAuthHeaders = () => {
	const { userRoleAuthority, teamId } = useAuth()
	const token = useMemo(() => window.localStorage.getItem('token'), [])

	const headers = useMemo(
		() => ({
			Authorization: token ? `Bearer ${token}` : '',
			Authority_Level: userRoleAuthority,
			Team_Id: teamId,
		}),
		[token, userRoleAuthority, teamId]
	)

	return headers
}
