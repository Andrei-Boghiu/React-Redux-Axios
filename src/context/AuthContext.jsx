import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { verifyTokenRequest } from '../api/authService'
import { handleError } from '../api/config'

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [authState, setAuthState] = useState({
		isAuthenticated: false,
		userId: null,
		username: '',
		userEmail: '',
		firstName: '',
		teams: [],
		userRoleName: null,
		userRoleAuthority: 9999,
		teamId: null,
	})

	const changeTeam = useCallback(
		(teamId) => {
			const newTeam = authState.teams?.find((team) => team.team_id === Number(teamId))
			if (newTeam) {
				const { role_name, role_authority, team_id, approved } = newTeam
				setAuthState((prevState) => ({
					...prevState,
					userRoleName: role_name,
					userRoleAuthority: approved ? role_authority : 9999,
					teamId: team_id,
				}))
				window.localStorage.setItem('lastSelectedTeamId', team_id)
			} else if (authState.teams?.length > 0) {
				const { role_name, role_authority, team_id } = authState.teams[0]
				setAuthState((prevState) => ({
					...prevState,
					userRoleName: role_name,
					userRoleAuthority: role_authority,
					teamId: team_id,
				}))
			}
		},
		[authState.teams]
	)

	const login = useCallback(({ token, id, username, email, firstName, teams }) => {
		if (!id || !username || !email || !firstName || !teams) {
			console.error('Missing data in login:', { token, id, username, email, firstName, teams })
			return
		}

		window.localStorage.setItem('token', token)
		const authority = teams?.length > 0 ? teams[0].role_authority : 9999
		setAuthState((prevState) => ({
			isAuthenticated: true,
			userId: id,
			username,
			userEmail: email,
			firstName,
			teams,
			userRoleName: teams?.length > 0 ? teams[0].role_name : null,
			userRoleAuthority: authority,
			teamId: teams?.length > 0 ? teams[0].team_id : null,
		}))

		const lastTeamId = window.localStorage.getItem('lastSelectedTeamId')
		if (lastTeamId) {
			const selectedTeamData = teams?.find((team) => team.team_id === Number(lastTeamId))
			if (selectedTeamData) {
				setAuthState((prevState) => ({
					...prevState,
					userRoleAuthority: selectedTeamData.role_authority,
				}))
			}
		}
	}, [])

	const logout = useCallback(() => {
		window.localStorage.removeItem('token')
		setAuthState({
			isAuthenticated: false,
			userId: null,
			username: '',
			userEmail: '',
			firstName: '',
			teams: [],
			userRoleName: null,
			userRoleAuthority: 9999,
			teamId: null,
		})
	}, [])

	const verifyToken = useCallback(async () => {
		try {
			const token = window.localStorage.getItem('token')
			if (token) {
				const response = await verifyTokenRequest({ Authorization: `Bearer ${token}` })
				const { id, username, email, firstName, teams } = response
				login({ token, id, username, email, firstName, teams })
			}
		} catch (error) {
			handleError(error)
			logout()
		}
	}, [login, logout])

	useEffect(() => {
		verifyToken()
	}, [verifyToken])

	return (
		<AuthContext.Provider
			value={{
				...authState,
				login,
				logout,
				changeTeam,
				setTeams: (teams) => setAuthState((prevState) => ({ ...prevState, teams })),
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
