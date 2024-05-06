import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import WorkItemsTable from '../components/shared/WorkItemsTable'
import { fetchAssignNewItem, getUserWorkItems, updateItemComplete, updateItemUnassign } from '../api/workService'

function Dashboard() {
	const [workItems, setWorkItems] = useState([])
	const { isAdmin } = useAuth()

	useEffect(() => {
		updateLobby()
	}, [])

	const updateLobby = async () => {
		try {
			const response = await getUserWorkItems()
			setWorkItems(response.data)
		} catch (error) {
			console.error('Error fetching work items', error)
			alert('Error fetching lobby')
		}
	}

	const handleGetWork = async () => {
		try {
			const response = await fetchAssignNewItem()
			setWorkItems(response.data)
		} catch (error) {
			console.error('Error fetching work items', error)
			alert('Error fetching lobby')
		}
	}

	const handleCompleteItem = async (workItemId) => {
		try {
			await updateItemComplete(workItemId)
			updateLobby()
		} catch (error) {
			console.log(error)
			alert(`There was an error`)
		}
	}

	const handleUnassigned = async (workItemId) => {
		try {
			await updateItemUnassign(workItemId)
			updateLobby()
		} catch (error) {
			console.log(error)
			alert(`There was an error`)
		}
	}

	return (
		<div>
			{isAdmin ? (
				<div>
					<h2>Admin Actions</h2>
					<div>
						<Link className='admin-button' to='/user-management'>
							User Management
						</Link>
						<Link className='admin-button' to='/work-items-management'>
							Work Items Management
						</Link>
						<Link className='admin-button' to='/statistics-dashboard'>
							Statistics Dashboard
						</Link>
					</div>
					<hr />
				</div>
			) : null}

			<div>
				<h2>In Progress Work Items</h2>

				<WorkItemsTable workItems={workItems} handleComplete={handleCompleteItem} handleUnassigned={handleUnassigned} />
			</div>
			<button onClick={handleGetWork}>Get Work</button>
		</div>
	)
}

export default Dashboard
