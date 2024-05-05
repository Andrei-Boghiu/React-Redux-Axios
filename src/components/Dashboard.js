import React from 'react'
import { useAuth } from '../context/AuthContext'

function Dashboard() {
	const { logout } = useAuth()

	return (
		<div>
			<h1>Dashboard</h1>
			<p>Welcome to your dashboard!</p>
			<button onClick={logout}>Logout</button>
		</div>
	)
}

export default Dashboard
