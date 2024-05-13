import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import brand from '../brand.json'
import { Link, useLocation } from 'react-router-dom'
import { checkUserTeams } from '../api/teamsService'
import { useAuthHeaders } from '../context/useAuthHeaders'
import Table from '../components/shared/Table'

export default function Home() {
	const { isAuthenticated, firstName, userRoleAuthority, teams, setTeams } = useAuth()
	const headers = useAuthHeaders();

	const location = useLocation();
	const previousPath = location.state?.from;
	const awaitingApproval = teams?.some(team => team.approved === false);
	const awaitingApprovalTeams = teams?.filter(team => team.approved === false);

	console.log("🚀 ~ file: Home.jsx:18 ~ Home ~ awaitingApprovalTeams:", awaitingApprovalTeams);

	// ! Make an API that will be called if any of the teams are awaiting for approval to get data
	// ! or use the existent API but use just a few columns
	// ! or improve the existent API with the needed columns and filter only the needed columns
	
	useEffect(() => {
		console.log('useEffect => Home');
		// console.log(`previousPath:`, previousPath)
		console.log(`awaitingApproval:`, awaitingApproval)

		if (previousPath === '/request-team-access' || awaitingApproval) {
			checkUserTeams(headers).then(res => {
				setTeams(res.data.teams)
				console.log(res.data)
			}).catch(error => {
				console.error(error);
				alert('Error while updating the teams...')
			})
		}

	}, [awaitingApproval, headers, setTeams, previousPath])

	// const random = Math.floor(Math.random() * brand.welcome_back_message.length);
	const day = new Date().getDay()
	const randomFunnyMessage = brand.welcome_back_message[day]

	return (
		<div>


			{
				awaitingApproval && <Table rows={awaitingApprovalTeams} />
			}

			{isAuthenticated ? (
				<>
					<h1 className='text-center'>Welcome, {firstName}</h1>
					<p className='text-center'>{randomFunnyMessage ? randomFunnyMessage : "Let's dive back into productivity"}</p>
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
							<Link className='btn-primary' to='/login'>
								Login
							</Link>
						</div>
						<div className='action-box'>
							<h3>Just Getting Started?</h3>
							<p>Create an account to unlock features like joining a team or creating a workspace for your team.</p>
							<Link className='btn-primary' to='/register'>
								Register
							</Link>
						</div>
					</>
				)}

				<div className='action-box'>
					<h3>Need Access to a Team?</h3>
					<p>Start collaborating with your peers by Requesting Access to an existing team.</p>

					{isAuthenticated ? (
						<Link className='btn-primary' to='/request-team-access'>
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
						teams?.length > 0 && userRoleAuthority <= 3 ? (
							<Link className='btn-primary' to='/create-team'>
								Create a Team
							</Link>
						) : (
							<Link className='btn-link underline' to='/request-team-access'>
								Request Access to Create a Team
							</Link>
						)
					) : (
						<span className='btn-primary disabled'>Login to unlock</span>
					)}
				</div>
			</div>
		</div>
	)
}