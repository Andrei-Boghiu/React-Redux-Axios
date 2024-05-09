import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import './navBar.css'
import brand from '../../brand.json'
import NavButton from './NavButton'

export const NavBar = ({ title }) => {
	const { logout, userRole, userEmail, isAuthenticated, admin } = useAuth()

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
						isAuthenticated &&
						<>
							<NavButton to='/dashboard'>
								Dashboard
							</NavButton>
							{
								admin &&
								<>
									<NavButton to='/user-management'>
										User Management
									</NavButton>
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
				</div>
			</div>

			<div className='nav-account-actions'>
				{isAuthenticated ? (
					<div className='nav-content'>
						<div className='nav-info'>
							<p>{userEmail.split('@')[0]}</p>
							{admin && <p>({userRole})</p>}
						</div>
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
