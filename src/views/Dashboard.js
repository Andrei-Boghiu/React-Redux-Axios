import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import WorkItemsTable from '../components/shared/WorkItemsTable'

function Dashboard() {
	const [workItems, setWorkItems] = useState([])
	const { logout, userRole, userEmail, userId } = useAuth()

	useEffect(() => {
		fetchWorkItems()
	}, [])

	const fetchWorkItems = async () => {
		try {
			const response = await axios.get('http://localhost:3001/api/work/get-user-items', {
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

	const handleGetWork = async () => {
		try {
			const response = await axios.get('http://localhost:3001/api/work/assign-new-item', {
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

	const handleCompleteItem = async (workItemId) => {
		try {
			// const response =
			await axios.patch(
				'http://localhost:3001/api/work/set-completed',
				{
					workItemId,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			)

			fetchWorkItems()

			// console.log(response)
		} catch (error) {
			console.log(error)
			alert(`There was an error`)
		}
	}

	const handleUnassigned = async (workItemId) => {
		try {
			// const response =
			await axios.patch(
				'http://localhost:3001/api/work/set-unassigned',
				{
					workItemId,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			)

			fetchWorkItems()

			// console.log(response)
		} catch (error) {
			console.log(error)
			alert(`There was an error`)
		}
	}

	return (
		<div>
			<h1>Dashboard</h1>
			<p>Welcome to your dashboard!</p>
			<p>Email: {userEmail}</p>
			<p>Role: {userRole}</p>
			<p>Id: {userId}</p>
			<hr />
			{userRole === 'admin' || userRole === 'manager' ? (
				<div>
					<h2>Admin Actions</h2>
					<div>
						<Link to='/user-management'>User Management</Link>
						<Link to='/work-items-management'>Work Items Management</Link>
						<Link to='/statistics-dashboard'>Statistics Dashboard</Link>
					</div>
					<hr />
				</div>
			) : null}

			<div>
				<h2>In Progress Work Items</h2>

				<WorkItemsTable workItems={workItems} handleComplete={handleCompleteItem} handleUnassigned={handleUnassigned} />
			</div>
			<button onClick={handleGetWork}>Get Work</button>
			<button onClick={logout}>Logout</button>
		</div>
	)
}

export default Dashboard
