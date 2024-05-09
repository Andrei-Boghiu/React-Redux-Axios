import React, { useEffect, useState } from 'react'
import WorkItemsTable from '../components/shared/WorkItemsTable'
import { fetchAssignNewItem, getUserWorkItems, updateItemComplete, updateItemUnassign } from '../api/workService'

function Dashboard() {
	const [workItems, setWorkItems] = useState([]);

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
			console.log(response.data)
			// updateLobby()
		} catch (error) {
			console.error('Error fetching work items', error)
			const errMessage = error.response.data
			if (errMessage) {
				alert(errMessage)
			} else {
				alert('Error fetching lobby')
			}
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
			<div>
				<h2>In Progress Work Items</h2>

				{workItems.length
					? <WorkItemsTable workItems={workItems} handleComplete={handleCompleteItem} handleUnassigned={handleUnassigned} />
					: <div>Lobby is empty...</div>}

			</div>
			<button onClick={handleGetWork}>Get Work</button>
		</div>
	)
}

export default Dashboard
