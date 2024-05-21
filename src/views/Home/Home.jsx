import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import brand from '../../brand.json'
import { Link } from 'react-router-dom'
import { checkUserTeams } from '../../api/teamsService'
import { useAuthHeaders } from '../../context/useAuthHeaders'
import Table from '../../components/shared/Table'
import cloneObjKeys from '../../utils/cloneObjKeys'
import './Home.css'

export default function Home() {
	const { isAuthenticated, firstName, userRoleAuthority, teams, setTeams } = useAuth()
	const headers = useAuthHeaders()
	const [awaitingApprovalTeams, setAwaitingApprovalTeams] = useState([])
	const [checkTeamsCalled, setCheckTeamsCalled] = useState(false)

	const keysToKeep = ['id', 'team_name', 'team_description', 'role_name', 'team_owned_by']

	useEffect(() => {
		if (teams) {
			const awaitingApprovalTeams = teams.filter((team) => !team.approved)
			setAwaitingApprovalTeams(awaitingApprovalTeams)
		}
	}, [])

	useEffect(() => {
		const fetchTeams = async () => {
			if (awaitingApprovalTeams.length > 0 && !checkTeamsCalled) {
				setCheckTeamsCalled(true)
				try {
					const teams = await checkUserTeams(headers);
					setTeams(teams);
					console.log(teams)
					// ! Make a call to also check if there are any awaiting approval for new team requests
				} catch (error) {
					console.error('Error while updating the teams:', error)
					alert('Error while updating the teams...')
				}
			}
		}

		fetchTeams()
	}, [])

	const day = new Date().getDay()
	const randomFunnyMessage = brand.welcome_back_message[day]

	const awaitingApprovalTeamsData = cloneObjKeys({
		originalData: awaitingApprovalTeams,
		keysToKeep,
		consoleLogSteps: false,
	})

	return (
		<div>
			{isAuthenticated ? (
				<>
					<h1 className='text-center'>Welcome, {firstName}</h1>
					<p className='text-center'>{randomFunnyMessage || "Let's dive back into productivity"}</p>
				</>
			) : (
				<>
					<h1 className='text-center'>Welcome to {brand.title}</h1>
					<p className='text-center'>{brand.subtitle}</p>
				</>
			)}

			<div className='flex-wrap'>
				{!isAuthenticated && (
					<>
						<div className='action-box'>
							<h3>Already a Member?</h3>
							<p>Dive back into your workspace by logging into your account.</p>
							<Link
								className='btn-primary'
								to='/login'
							>
								Login
							</Link>
						</div>
						<div className='action-box'>
							<h3>Just Getting Started?</h3>
							<p>Create an account to unlock features like joining a team or creating a workspace for your team.</p>
							<Link
								className='btn-primary'
								to='/register'
							>
								Register
							</Link>
						</div>
					</>
				)}

				<div className='action-box'>
					<h3>Need Access to a Team?</h3>
					<p>Start collaborating with your peers by Requesting Access to an existing team.</p>
					{isAuthenticated ? (
						<Link
							className='btn-primary'
							to='/request-team-access'
						>
							Request Team Access
						</Link>
					) : (
						<span className='btn-primary disabled'>Login to unlock</span>
					)}
				</div>

				<div className='action-box'>
					<h3>Need to Create a Team?</h3>
					<p>Create your own team space, invite members, and start managing your work items.</p>
					{isAuthenticated ? (
						teams?.some(team => team.approved) && userRoleAuthority <= 3 ? (
							<Link
								className='btn-primary'
								to='/create-new-team'
							>
								Create a Team
							</Link>
						) : (
							<Link
								className='btn-link underline'
								to='/request-team-access'
							>
								Request Access to Create a Team
							</Link>
						)
					) : (
						<span className='btn-primary disabled'>Login to unlock</span>
					)}
				</div>

				{isAuthenticated && teams?.length > 0 && (
					<div className='action-box'>
						<h3>Need Details About A Team?</h3>
						<p>See more details about the teams you are a member of by going to the 'My Teams' page.</p>
						<div className='button-box-details'>
							<Link
								className='btn-primary'
								to='/my-teams'
							>
								My Teams
							</Link>
							<p>Waiting approval for 2 teams</p>
						</div>
						{/* // * Here Add info of how many approvals the user is awaiting for and so on*/}
					</div>
				)}

				{awaitingApprovalTeams.length > 0 && (
					// ! Deprecate this table, instead use the table from /my-teams
					<Table
						rows={awaitingApprovalTeamsData}
						title={'Awaiting Approval'}
					/>
				)}
			</div>
		</div>
	)
}
