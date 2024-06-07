import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react'
import { fetchNewItem, fetchUserLobby, updateStatus } from '../../api/workService'
import { useAuthHeaders } from '../../context/useAuthHeaders';
import Table from '../../components/shared/Table';
import { Modal } from '../../components/shared/Modal';
import { workItemsActions } from './workItemsActions';

export default function Dashboard() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [workItems, setWorkItems] = useState([]);
	const headers = useAuthHeaders();
	const [lobbyUpdated, setLobbyUpdated] = useState(false);
	const [actionItemId, setItemToAction] = useState('');

	// action on work item
	const [selectedAction, setSelectedAction] = useState('');
	const [selectedActionData, setSelectedActionData] = useState('');

	const [followUpDate, setFollowUpDate] = useState('');
	const [annotation, setAnnotation] = useState('');

	// useState loaders
	const [modalLoading, setModalLoading] = useState(false);
	const [getWorkLoading, setGetWorkLoading] = useState(false);

	const resetValues = () => {
		setIsModalOpen(false)
		setAnnotation('')
		setFollowUpDate('')
		setSelectedAction('')
		setModalLoading(false)
	}

	const updateLobby = useCallback(async () => {
		try {
			const workItems = await fetchUserLobby(headers)
			setWorkItems(workItems)
		} catch (error) {
			console.error('Error fetching work items', error)
		}
	}, [headers])


	useEffect(() => {
		const newActionDetails = workItemsActions.find(item => item.id == selectedAction)
		setSelectedActionData(newActionDetails)
	}, [selectedAction]);

	useEffect(() => {
		console.log(`useEffect -> Dashboard`);

		if (!lobbyUpdated) {
			updateLobby();
			setLobbyUpdated(true);
		}
	}, [updateLobby, lobbyUpdated])

	const handleGetWork = async () => {
		setGetWorkLoading(true)
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
		} finally {
			setGetWorkLoading(false)
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const annotationCheck = selectedActionData.annotation.mandatory && !annotation
			const followUpCheck = selectedActionData.followUpDate.mandatory && !followUpDate

			if (annotationCheck || followUpCheck || !selectedActionData || !actionItemId) {
				alert("Please complete all relevant fields")
				return;
			}

			setModalLoading(true);

			const config = {
				aux_id: actionItemId,
				status: selectedActionData.status,
				resolution: selectedActionData.resolution,
			}

			if (annotation) {
				config['annotation'] = annotation
			}

			if (followUpDate) {
				config['follow_up_date'] = followUpDate
			}

			await updateStatus(headers, config);

		} catch (error) {
			console.error(error)
		} finally {
			updateLobby()
			resetValues()
			console.log("finally -> done")
		}
	}

	return (
		<>
			<div>
				{workItems?.length ? <Table rows={workItems} actions={[WorkItemActions]} title="Lobby" /> : <div>Lobby is empty...</div>}

				<Modal
					isOpen={isModalOpen}
					onClose={() => {
						resetValues()
					}}
					title={`Action Work Item ${actionItemId || 'N/A'}`}
				>
					<div className='work-item-actions-box'>
						<form onSubmit={handleSubmit}>
							{modalLoading && <p>Loading...</p>}
							<label>
								Status:
								<select value={selectedAction} onChange={(e) => setSelectedAction(e.target.value)} required>
									<option value="">Select an option</option>
									{workItemsActions.map(action =>
										<option value={action.id} key={action.id}>{action.name}</option>
									)}
								</select>
							</label>

							{selectedActionData ? selectedActionData.annotation.allowed &&
								<label>
									Annotation:  {selectedActionData.annotation.mandatory && <span className='red'>(Required)</span>}
									<input
										type='text'
										value={annotation}
										onChange={(e) => setAnnotation(e.target.value)}
										required={selectedActionData.annotation.mandatory}
									/>
								</label>
								: null
							}

							{selectedActionData ? selectedActionData.followUpDate.allowed &&
								<label>
									Follow Up Date: {selectedActionData.followUpDate.mandatory && <span className='red'>(Required)</span>} <br />
									<input
										type='datetime-local'
										value={followUpDate}
										onChange={(e) => setFollowUpDate(e.target.value)}
										required={selectedActionData.followUpDate.mandatory}
									/>
								</label>
								: null
							}

							<button disabled={modalLoading} className={`${modalLoading ? 'disabled' : ''}`} type="submit">{modalLoading ? "Loading..." : "Submit"}</button>
						</form>
					</div>
				</Modal>
			</div>
			<button className={`${getWorkLoading ? 'disabled' : ''}`} disabled={getWorkLoading} onClick={handleGetWork}> {getWorkLoading ? 'Loading...' : 'Get Work'}</button>
		</>
	)
}