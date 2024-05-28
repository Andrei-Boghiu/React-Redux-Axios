import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react'
import { fetchNewItem, fetchUserLobby } from '../api/workService'
import { useAuthHeaders } from '../context/useAuthHeaders';
import Table from '../components/shared/Table';
import { Modal } from '../components/shared/Modal'

export default function Dashboard() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [workItems, setWorkItems] = useState([]);
	const headers = useAuthHeaders();
	const [lobbyUpdated, setLobbyUpdated] = useState(false);
	const [actionItemId, setItemToAction] = useState(undefined)

	const updateLobby = useCallback(async () => {
		try {
			const workItems = await fetchUserLobby(headers)
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
			const workItemsData = await fetchNewItem(headers)
			setWorkItems(workItemsData)
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

	const handleCompleteItem = async () => {
		try {
			// await updateItemComplete(workItemId)
			// updateLobby()
		} catch (error) {
			console.log(error)
			alert(`There was an error`)
		}
	}

	const WorkItemActions = ({ rowData }) => {
		const aux_id = rowData?.aux_id;

		return <>
			<button onClick={() => {
				setItemToAction(aux_id)
				setIsModalOpen(true)
			}} className='table-button'>Action</button>
		</>
	}

	WorkItemActions.propTypes = {
		rowData: PropTypes.object.isRequired
	}

	return (
		<>
			<div>
				{workItems?.length ? <Table rows={workItems} actions={[WorkItemActions]} title="Lobby" /> : <div>Lobby is empty...</div>}

				<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Action Work Item ${actionItemId}`}>
					<div className='flex-row'>
						<div className='box-button' onClick={handleCompleteItem}>
							<h4>Resolve Case</h4>
							<button>Resolved</button>
						</div>
						<div className='box-button' onClick={handleCompleteItem} >
							<h4>Send To Admin</h4>
							<button>Send</button>
						</div>
						<div className='box-button' onClick={handleCompleteItem} >
							<h4>Set Follow Up Date</h4>
							<input type="datetime-local" />
							<button>Set Follow Up</button>
						</div>
					</div>
				</Modal>

			</div>
			{workItems?.some(item => item.status === "Work in Progress") ? "" : <button onClick={handleGetWork}>Get Work</button>}
			<button onClick={handleGetWork}>Get Work</button>
		</>
	)
}


