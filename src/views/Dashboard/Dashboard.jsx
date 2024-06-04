import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react'
import { fetchNewItem, fetchUserLobby, updateStatus } from '../../api/workService'
import { useAuthHeaders } from '../../context/useAuthHeaders';
import Table from '../../components/shared/Table';
import { Modal } from '../../components/shared/Modal';

export default function Dashboard() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [workItems, setWorkItems] = useState([]);
	const headers = useAuthHeaders();
	const [lobbyUpdated, setLobbyUpdated] = useState(false);
	const [actionItemId, setItemToAction] = useState(undefined);
	const [selectStatus, setNewStatus] = useState('')
	const [selectResolution, setNewResolution] = useState('');
	const [followUpDate, setFollowUpDate] = useState('');
	const [annotation, setAnnotation] = useState();
	const [releaseItemReason, setReleaseInfo] = useState('');
	const [modalLoading, setModalLoading] = useState(false)

	const updateLobby = useCallback(async () => {
		try {
			const workItems = await fetchUserLobby(headers)
			setWorkItems(workItems)
		} catch (error) {
			console.error('Error fetching work items', error)
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
	const updateStatusHandler = async (config) => {
		try {
			console.log(config)
			setModalLoading(true)
			await updateStatus(headers, config);
			console.log("try -> done")

		} catch (error) {
			console.error(error)
			console.log("catch -> done")
		} finally {
			updateLobby()
			setIsModalOpen(false)
			setAnnotation('')
			setFollowUpDate(null)
			setNewStatus('')
			setNewResolution('')
			setReleaseInfo('')
			setModalLoading(false)
			console.log("finally -> done")
		}
	}

	const actionsMap = {
		"resolved_successful": {
			name: "Successful",
			value: "resolved_successful",
			status: "Resolved",
			resolution: "Successful",
			api: updateStatusHandler
		},
		"resolved_failure": {
			name: "Out of Scope",
			value: "resolved_failure",
			status: "Resolved",
			resolution: "Out of Scope",
			api: updateStatusHandler,
			additional: {
				annotation: true
			}
		},
		"pending_sideline": {
			name: "Sideline",
			value: "pending_sideline",
			status: "Pending",
			resolution: "Sideline",
			api: updateStatusHandler,
			additional: {
				annotation: true
			}
		},
		"pending_followUp": {
			name: "Follow Up",
			value: "pending_followUp",
			status: "Pending",
			resolution: "Follow Up",
			api: updateStatusHandler,
			additional: {
				date_time: true
			}
		},
		"release_item": {
			name: "Release Item",
			value: "release_item",
			status: "Unassigned",
			resolution: "",
			api: updateStatusHandler,
			additional: {
				release_reason: true
			}
		}
	};

	const handleStatusChange = (event) => {
		const newValue = event.target.value;
		setNewStatus(newValue);
		setNewResolution('');
		setAnnotation('')
	};

	const handleResolutionChange = (event) => {
		const newValue = event.target.value;
		setNewResolution(newValue);
		setAnnotation('')
	};

	const ResolutionSelect = ({ selectedVal, stateHandler, stateValue }) => {
		if (!selectedVal) {
			return <select value={stateValue} onChange={stateHandler} />;
		}

		const resolutions = Object.values(actionsMap).filter(action => action.value.startsWith(selectedVal));

		return (
			<select value={stateValue} onChange={stateHandler} required>
				<option value="">Select an option</option>
				{resolutions.map((option) => (
					<option key={option.value} value={option.value}>
						{option.name}
					</option>
				))}
			</select>
		);
	};

	ResolutionSelect.propTypes = {
		selectedVal: PropTypes.string.isRequired,
		stateHandler: PropTypes.func.isRequired,
		stateValue: PropTypes.string.isRequired
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			const selectedAction = actionsMap[selectResolution];
			const IncludesAnnotation = selectedAction.additional?.annotation
			const IncludesFollowUp = selectedAction.additional?.date_time
			const releaseInfo = selectedAction.additional?.release_reason

			const config = {
				status: selectedAction.status,
				resolution: selectedAction.resolution,
				aux_id: actionItemId
			}
			if (IncludesAnnotation) {
				config["annotation"] = annotation;
			}

			if (IncludesFollowUp) {
				config["follow_up_date"] = new Date(followUpDate).toISOString();
			}

			if (releaseInfo) {
				config["additional_info"] = releaseItemReason;
			}

			selectedAction.api(config);
		} catch (error) {
			console.error(error)
		} finally {
			setAnnotation('')
		}
	}

	return (
		<>
			<div>
				{workItems?.length ? <Table rows={workItems} actions={[WorkItemActions]} title="Lobby" /> : <div>Lobby is empty...</div>}

				<Modal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					title={`Action Work Item ${actionItemId || 'N/A'}`}
				>
					<div className=''>
						<form onSubmit={handleSubmit}>
							{modalLoading && <p>Loading...</p>}
							<label>
								Status:
								<select value={selectStatus} onChange={handleStatusChange} required>
									<option value="">Select an option</option>
									<option value="resolved">Resolved</option>
									<option value="pending">Pending</option>
									<option value="release">Release</option>
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

							{selectResolution && actionsMap[selectResolution]?.additional?.annotation && (
								<label>
									Annotation:
									<input type="text" required value={annotation} onChange={e => setAnnotation(e.target.value)} />
								</label>
							)}

							{selectResolution && actionsMap[selectResolution]?.additional?.date_time && (
								<label>
									Date and Time:
									<input type="datetime-local" required value={followUpDate} onChange={(e) => setFollowUpDate(e.target.value)} />
								</label>
							)}

							{selectResolution && actionsMap[selectResolution]?.additional?.release_reason && (
								<label>
									Release reason:
									<input type="text" required value={releaseItemReason} onChange={(e) => setReleaseInfo(e.target.value)} />
								</label>
							)}

							<button disabled={modalLoading} className={`${modalLoading ? 'disabled' : ''}`} type="submit">{modalLoading ? "Loading..." : "Submit"}</button>
						</form>
					</div>
				</Modal>
			</div>
			<button onClick={handleGetWork}>Get Work</button>
		</>
	)
}