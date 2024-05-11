import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import './navBar.css'
import brand from '../../brand.json'
import NavButton from './NavButton'

export const NavBar = () => {
	const { logout, username, isAuthenticated, teams, changeTeam, userRoleName, userRoleAuthority } = useAuth();
	const [selectedTeam, setSelectedTeam] = useState(null);

	useEffect(() => {
		console.log('use effect navBar')
		if (isAuthenticated && teams.length > 0) {
			console.log('Checking last team used...')
			const lastTeamId = window.localStorage.getItem('lastSelectedTeamId');
			if (lastTeamId) {
				const selectedTeamData = teams.find((team) => team.team_id === Number(lastTeamId));
				if (selectedTeamData) {
					console.log('Last team found...')
					console.log(selectedTeam)
					setSelectedTeam(selectedTeamData);
					changeTeam(lastTeamId);
				}
			}
		}
	}, [teams, changeTeam, selectedTeam, isAuthenticated]);

	const handleTeamChange = (teamId) => {
		const selectedTeamData = teams.find((team) => team.team_id === Number(teamId));
		if (selectedTeamData) {
			setSelectedTeam(selectedTeamData);
			changeTeam(teamId);
		}
	};

	return (
		<div className='navigation'>
			<div className='nav-header'>
				<div className='nav-title'>
					<h2>{brand.title}</h2>
				</div>
				<div className='nav-routes'>
					<NavButton to='/'>
						Home
					</NavButton>

					{
						teams?.length > 0 &&
						<>
							<NavButton to='/dashboard'>
								Dashboard
							</NavButton>
							{
								<>
									{
										userRoleAuthority <= 3 && <NavButton to='/team-management'>
											Team Management
										</NavButton>
									}

									{
										userRoleAuthority <= 1 && <NavButton to='/users-management'>
											Users Management
										</NavButton>
									}

									{
										userRoleAuthority <= 4 && <>
											<NavButton to='/work-items-management'>
												Work Items Management
											</NavButton>

											<NavButton to='/statistics-dashboard'>
												Statistics Dashboard
											</NavButton>
										</>
									}
								</>
							}
						</>
					}
				</div>
			</div>

			<div className='nav-account-actions'>
				{isAuthenticated ? (
					<div className='nav-content'>
						<div className='nav-info'>
							<p>{username}</p>
							{<p>{selectedTeam && `(${userRoleName})`}</p>}
						</div>
						{
							teams.length > 0
								? <>
									{teams.length === 1
										? <span className='nav-button btn-outline'>{teams[0].team_name}</span>
										: <select
											className='nav-team-selector'
											onChange={e => handleTeamChange(e.target.value)}
											value={selectedTeam ? selectedTeam.team_id : ''}
										>
											{teams.map(team =>
												<option key={team.team_id}
													value={team.team_id}
													className='nav-team-option'
												>
													{team.team_name}
												</option>
											)}
										</select>}
								</>
								: <p>Looks like your not part of a team yet..</p>
						}
						<Link className='nav-button btn-outline' onClick={logout}>
							Logout
						</Link>
					</div>
				) : (
					<div className='nav-content'>
						<NavButton to='/login'>
							Login
						</NavButton>
						<NavButton to='/register'>
							Register
						</NavButton>
					</div>
				)}
			</div>
		</div>
	)
}
