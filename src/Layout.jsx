import React from 'react'
import { useLocation } from 'react-router-dom'
import { NavBar } from './components/NavBar/NavBar'

const Layout = ({ children }) => {
	const location = useLocation()

	const getTitle = (pathname) => {
		switch (pathname) {
			case '/login':
				return 'Login'
			case '/register':
				return 'Register'
			case '/dashboard':
				return 'Dashboard'
			case '/statistics-dashboard':
				return 'Statistics'
			case '/user-management':
				return 'User Management'
			case '/work-items-management':
				return 'Work Items Management'
			default:
				return 'Home'
		}
	}

	return (
		<div>
			<NavBar title={getTitle(location.pathname)} />
			<div className='main-content'>{children}</div>
		</div>
	)
}

export default Layout
