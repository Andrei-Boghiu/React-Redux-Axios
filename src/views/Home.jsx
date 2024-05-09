import React from 'react'
import { useAuth } from '../context/AuthContext'
import brand from '../brand.json'
import { Link } from 'react-router-dom'

function Home() {
	// const random = Math.floor(Math.random() * brand.welcome_back_message.length);
	const day = new Date().getDay();
	const randomFunnyMessage = brand.welcome_back_message[day];
	const { isAuthenticated, firstName, userRoleAuthority } = useAuth();

	return (
		<div>
			{isAuthenticated ?
				<>
					<h1 className='text-center'>Welcome, {firstName}</h1>
					<p className='text-center'>{randomFunnyMessage ? randomFunnyMessage : 'Let\'s dive back into productivity'}</p>
				</>
				: <>
					<h1 className='text-center'>Welcome to {brand.title}</h1>
					<p className='text-center'>{brand.subtitle}</p>
				</>
			}

			<div className='flex-wrap'>
				{!isAuthenticated &&
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
				}

				<div className='action-box'>
					<h3>Need Access to a Team?</h3>
					<p>Start collaborating with your peers by Requesting Access to an existing team.</p>

					{isAuthenticated ?
						<Link className='btn-primary' to='/request-team-access' >
							Request Team Access
						</Link>
						: <span className='btn-primary disabled'>Login to unlock</span>
					}

				</div>

				<div className='action-box'>
					<h3>Need to Create a Team?</h3>
					<p>Create your own team space, invite members, and start managing your work items.</p>

					{isAuthenticated ?
						userRoleAuthority <= 3 ?
							<Link className='btn-primary' to='/create-team' >
								Create a Team
							</Link>
							: <Link className='btn-link' to='/request-access'>Request Access to Create a Team</Link>
						: <span className='btn-primary disabled'>Login to unlock</span>
					}
				</div>
			</div>
		</div>
	)
}

export default Home;
