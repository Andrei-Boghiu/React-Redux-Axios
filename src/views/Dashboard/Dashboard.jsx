import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react'
import { fetchNewItem, fetchUserLobby } from '../../api/workService'
import { useAuthHeaders } from '../../context/useAuthHeaders';
import Table from '../../components/shared/Table';
import { Modal } from '../../components/shared/Modal';

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
		}
	}, [headers])

	useEffect(() => {
		console.log(`useEffect -> Dashboard`);

		if (!lobbyUpdated) {
			updateLobby();
			setLobbyUpdated(true);
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

	// ACTIONS ON WORK ITEM
	const resolveItem = async (e) => {
		e.preventDefault();
		try {
			const config = { newStatus: "Resolved", aux_id: actionItemId }
			console.log("resolveItem", config)
			//await updateStatus(headers, config);
			setIsModalOpen(false)

		} catch (error) {
			console.error(error)
		} finally {
			// updateLobby()
		}
	}

	const releaseItem = async (e) => {
		e.preventDefault();
		try {
			const config = { newStatus: "Unassigned", aux_id: actionItemId }
			console.log("releaseItem", config)

			//await updateStatus(headers, config);
			setIsModalOpen(false)

		} catch (error) {
			console.error(error)
		} finally {
			// updateLobby()
		}
	}

	const outOfScopeItem = async (e) => {
		e.preventDefault()
		try {
			const config = { newStatus: "Resolved", aux_id: actionItemId }
			console.log("outOfScopeItem", config)

			//await updateStatus(headers, config);
			setIsModalOpen(false)

		} catch (error) {
			console.error(error)
		} finally {
			// updateLobby()
		}
	}

	const temporarySideline = async (e) => {
		e.preventDefault()
		try {
			const config = { newStatus: "Resolved", aux_id: actionItemId }

			//await updateStatus(headers, config);
			setIsModalOpen(false)

		} catch (error) {
			console.error(error)
		} finally {
			// updateLobby()
		}
	}

	const undeterminedSideline = async (e) => {
		e.preventDefault()
		try {
			const config = { newStatus: "Resolved", aux_id: actionItemId }

			//await updateStatus(headers, config);
			setIsModalOpen(false)

		} catch (error) {
			console.error(error)
		} finally {
			// updateLobby()
		}
	}

	const [selectStatus, setNewStatus] = useState('')
	const [selectResolution, setNewResolution] = useState('')
	// const [additionalInfo, setAdditionalInfo] = useState('')

	const actionsMap = {
		"resolved_successful": {
			name: "Successful",
			value: "Successful",
			api: resolveItem
		},
		"resolved_failure": {
			name: "Failure",
			value: "Failure",
			api: releaseItem
		},
		"unresolved_oos": {
			name: "Out of Scope",
			value: "Out of Scope",
			api: outOfScopeItem,
			additional: {
				annotation: true
			}
		},
		"pending_sideline": {
			name: "Sideline",
			value: "Sideline",
			api: undeterminedSideline,
			additional: {
				annotation: true
			}
		},
		"pending_followUp": {
			name: "Follow Up",
			value: "Follow Up",
			api: temporarySideline,
			additional: {
				date_time: true
			}
		}
	};

	const handleStatusChange = (event) => {
		const newValue = event.target.value;
		setNewStatus(newValue);
		console.log("status", newValue);
	};

	const handleResolutionChange = (event) => {
		const newValue = event.target.value;
		setNewResolution(newValue);
		console.log("resolution", newValue);
	};

	const ResolutionSelect = ({ selectedVal, stateHandler, stateValue }) => {
		if (!selectedVal) {
			return <select value={stateValue} onChange={stateHandler} />;
		}

		const resolution = actionsMap[selectedVal];
		const keys = Object.keys(resolution);

		return (
			<select value={stateValue} onChange={stateHandler}>
				<option value="">Select an option</option>
				{keys.map((option) => {
					const data = resolution[option];
					return (
						<option key={data.value} value={data.value}>
							{data.name}
						</option>
					);
				})}
			</select>
		);
	};

	return (
		<>
			<div>
				{workItems?.length ? <Table rows={workItems} actions={[WorkItemActions]} title="Lobby" /> : <div>Lobby is empty...</div>}

				<Modal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					title={`Action Work Item ${actionItemId || 'N/A'}`}
				>
					<div className='grid-container'>
						<form>
							<label>
								Status:
								<select value={selectStatus} onChange={handleStatusChange} required>
									<option value="">Select an option</option>
									<option value="resolved">Resolved</option>
									<option value="unresolved">Unresolved</option>
									<option value="pending">Pending</option>
								</select>
							</label>

							{selectStatus &&
								<label>
									Resolution:
									<ResolutionSelect
										stateHandler={handleResolutionChange}
										stateValue={selectResolution}
										selectedVal={selectStatus}
									/>
								</label>
							}
						</form>
					</div>
				</Modal>
			</div>
			<button onClick={handleGetWork}>Get Work</button>
		</>
	)
}