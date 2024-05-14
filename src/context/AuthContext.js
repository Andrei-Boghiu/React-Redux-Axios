import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { requestVerifyToken } from '../api/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setAuthenticated] = useState(false);
	const [userId, setUserId] = useState(null);
	const [username, setUsername] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [teams, setTeams] = useState([]);

	const [userRoleName, setUserRoleName] = useState(null);
	const [userRoleAuthority, setRoleAuthority] = useState(null)
	const [teamId, setTeamId] = useState(null)

	const changeTeam = useCallback((teamId) => {
		const newTeam = teams.find((team) => team.team_id === Number(teamId));
		if (newTeam) {
			const approved = newTeam.approved;
			console.log(newTeam)
			setUserRoleName(newTeam.role_name);
			setRoleAuthority(approved ? newTeam.role_authority : 9999);
			setTeamId(newTeam.team_id)
			window.localStorage.setItem('lastSelectedTeamId', teamId);
		} else if (teams.length > 0) {
			setUserRoleName(teams[0].role_name);
			setRoleAuthority(teams[0].role_authority)
			setTeamId(teams[0].team_id)
		}

	}, [teams]);

	const login = useCallback(
		({ token, id, username, email, firstName, teams }) => {
			window.localStorage.setItem('token', token);
			setAuthenticated(true);
			setUserId(id);
			setUsername(username);
			setUserEmail(email);
			setFirstName(firstName);
			setTeams(teams);

		}, []);

	const logout = useCallback(() => {
		window.localStorage.removeItem('token');
		setAuthenticated(false);
		setUserId(null);
		setUsername(null);
		setUserEmail(null);
		setFirstName(null);
		setTeams(null);
	}, []);

	const verifyToken = useCallback(async () => {
		try {
			const token = window.localStorage.getItem('token');

			if (token) {
				const response = await requestVerifyToken();
				const { id, username, email, firstName, teams } = response.data.user;

				login({ token, id, username, email, firstName, teams });
			}
		} catch (error) {
			console.error('Token validation failed:', error);
			logout();
		}
	}, [login, logout]);

	useEffect(() => {
		console.log(`useEffect -> authContext`);
		verifyToken();
	}, [verifyToken, login, logout]);

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				login,
				logout,
				changeTeam,
				userId,
				teamId,
				username,
				userEmail,
				firstName,
				teams,
				setTeams,
				userRoleName,
				userRoleAuthority
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);