import React from 'react'
import { useAuth } from '../context/AuthContext'

// import { Link } from 'react-router-dom'

function Home() {
	const { isAuthenticated, firstName } = useAuth()
	return (
		<div>
			{isAuthenticated ?
				<h1>Welcome, {firstName}</h1> :
				<h1>Welcome</h1>
			}
			<p>This is the best place to manage your tasks efficiently and effectively.</p>
		</div>
	)
}

export default Home
