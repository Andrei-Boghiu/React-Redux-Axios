import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import './navBar.css'
import brand from '../../brand.json'
import NavButton from './NavButton'
import DefaultNavigation from './DefaultNavigation'
import { specialTeams } from './config'

export const NavBar = () => {
	const { logout, username, isAuthenticated, teams, teamId, changeTeam, userRoleName } = useAuth()
	const [selectedTeam, setSelectedTeam] = useState(null)
	const specialTeam = specialTeams.find((team) => team.teamId === teamId);
	const approvedInATeam = teams?.some((team) => team.approved)
	const navigate = useNavigate()

	useEffect(() => {
		if (isAuthenticated && teams?.length > 0 && approvedInATeam) {
			const lastTeamId = window.localStorage.getItem('lastSelectedTeamId')
			if (lastTeamId) {
				const selectedTeamData = teams.find((team) => team.team_id === Number(lastTeamId))

				if (selectedTeamData) {
					setSelectedTeam(selectedTeamData)
					changeTeam(lastTeamId)
				} else {
					setSelectedTeam(teams[0])
					changeTeam(teams[0].teamId)
				}
			} else {
				setSelectedTeam(teams[0])
				changeTeam(teams[0].teamId)
			}
		}
	}, [teams, changeTeam, isAuthenticated, approvedInATeam])

	const handleTeamChange = (teamId) => {
		const selectedTeamData = teams?.find((team) => team.team_id === Number(teamId))
		if (selectedTeamData) {
			setSelectedTeam(selectedTeamData)
			changeTeam(teamId)
			navigate('/')
		}
	}

	return (
		<div className='navigation'>
			<div className='nav-header'>
				<div className='nav-title'>
					<h2>{brand.title}</h2>
				</div>
				<div className='nav-routes'>
					<NavButton to='/'>Home</NavButton>
					{teams?.length > 0 && approvedInATeam &&
						(specialTeam ? (
							specialTeam.navigation.map((navBtn) => (
								<NavButton
									key={navBtn.btnId}
									to={navBtn.navigateTo}
								>
									{navBtn.btnName}
								</NavButton>
							))
						) : (
							<DefaultNavigation />
						))}
				</div>
			</div>

			<div className='nav-account-actions'>
				{isAuthenticated ? (
					<div className='nav-content'>
						<div className='nav-info'>
							<p>{username}</p>
							{selectedTeam && <p>{`(${userRoleName})`}</p>}
						</div>
						{approvedInATeam ? (
							teams?.length === 1 ? (
								<span className={`nav-button btn-outline ${teams[0].approved ? '' : 'disabled'}`}>{teams[0].team_name}</span>
							) : (
								<select
									className='nav-team-selector'
									onChange={(e) => handleTeamChange(e.target.value)}
									value={selectedTeam ? selectedTeam.team_id : ''}
								>
									{teams?.map((team) => (
										<option
											key={team.team_id}
											value={team.team_id}
											className='nav-team-option'
											disabled={!team.approved}
										>
											{team.team_name}
										</option>
									))}
								</select>
							)
						) : (
							<NavButton to='/request-team-access'>Request Team Access</NavButton>
						)}
						<Link
							className='nav-button btn-outline'
							onClick={logout}
						>
							Logout
						</Link>
					</div>
				) : (
					<div className='nav-content'>
						<NavButton to='/login'>Login</NavButton>
						<NavButton to='/register'>Register</NavButton>
					</div>
				)}
			</div>
		</div>
	)
}
