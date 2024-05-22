import { useCallback, useEffect, useState } from 'react'
import WorkItemsTable from '../components/shared/WorkItemsTable'
import { fetchAssignNewItem, getUserWorkItems, updateItemComplete, updateItemUnassign } from '../api/workService'
import { useAuthHeaders } from '../context/useAuthHeaders';

export default function Dashboard() {
	const [workItems, setWorkItems] = useState([]);
	const headers = useAuthHeaders();
	const [lobbyUpdated, setLobbyUpdated] = useState(false)

	const updateLobby = useCallback(async () => {
		try {
			const workItems = await getUserWorkItems(headers)
			setWorkItems(workItems)
		} catch (error) {
			console.error('Error fetching work items', error)
			// alert('Error fetching lobby')
		} finally {
			setLobbyUpdated(true)
		}
	}, [headers])

	useEffect(() => {
		console.log(`useEffect -> Dashboard`);

		if (!lobbyUpdated) {
			updateLobby()
		}
	}, [updateLobby, lobbyUpdated])

	const handleGetWork = async () => {
		try {
			const response = await fetchAssignNewItem()
			setWorkItems(response.data)
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


