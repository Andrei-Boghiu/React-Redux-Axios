import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import './navBar.css'
import homeIcon from '../../assets/icon-home.svg'

export const NavBar = ({ title }) => {
	const { logout, userRole, userEmail, isAuthenticated, isAdmin } = useAuth()

	return (
		<div className='navigation'>
			<div className='nav-header'>
				<Link to='/' className='nav-icon-link'>
					<img src={homeIcon} alt='Home Icon' className='nav-icon' />
				</Link>
				<h2>{title}</h2>
			</div>

			<div className='nav-list'>
				{isAuthenticated ? (
					title === 'Home' ? (
						<div className='nav-content'>
							<Link className='nav-button' to='/dashboard'>
								Go to Dashboard
							</Link>
							<button className='nav-button' onClick={logout}>
								Logout
							</button>
						</div>
					) : (
						<div className='nav-content'>
							<div className='nav-info'>
								<p>{userEmail.split('@')[0]}</p>
								{isAdmin && <p>({userRole})</p>}
							</div>
							<button className='nav-button' onClick={logout}>
								Logout
							</button>
						</div>
					)
				) : (
					<div className='nav-content'>
						{title === 'Login' ? (
							<Link className='nav-button' to='/register'>
								Register
							</Link>
						) : title === 'Register' ? (
							<Link className='nav-button' to='/login'>
								Login
							</Link>
						) : (
							<>
								<Link className='nav-button' to='/login'>
									Login
								</Link>
								<Link className='nav-button' to='/register'>
									Register
								</Link>
							</>
						)}
					</div>
				)}
			</div>
		</div>
	)
}
