import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Home() {
	const { isAuthenticated } = useAuth()

	return (
		<div>
			<h1>Welcome</h1>
			<p>This is the best place to manage your tasks efficiently and effectively.</p>
			{isAuthenticated ? (
				<Link to='/dashboard'>Go to Dashboard</Link>
			) : (
				<div>
					<Link to='/login'>Login</Link> | <Link to='/register'>Register</Link>
				</div>
			)}
		</div>
	)
}

export default Home
