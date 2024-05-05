import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

function Dashboard() {
	const [workItems, setWorkItems] = useState([])
	const { logout } = useAuth()

	useEffect(() => {
		const fetchWorkItems = async () => {
			try {
				const response = await axios.get('http://localhost:3001/api/work/in-progress', {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				setWorkItems(response.data)
			} catch (error) {
				console.error('Error fetching work items', error)
				alert('Error fetching lobby')
			}
		}

		fetchWorkItems()
	}, [])

	return (
		<div>
			<h1>Dashboard</h1>
			<p>Welcome to your dashboard!</p>
			<div>
				<h2>In Progress Work Items</h2>
				<ul>
					{workItems.map((item) => (
						<li key={item.id}>
							{item.title} - {item.description}
						</li>
					))}
				</ul>
			</div>
			<button onClick={logout}>Logout</button>
		</div>
	)
}

export default Dashboard
