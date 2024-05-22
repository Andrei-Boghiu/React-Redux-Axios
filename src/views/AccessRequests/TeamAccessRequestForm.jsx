import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthHeaders } from '../../context/useAuthHeaders'
import { fetchAvailableTeamsToJoin, requestTeamAccess, getUpdatedTeamsInfo } from '../../api/teamsService'
import { useAuth } from '../../context/useAuth'
import Spinner from '../../components/Loaders/Spinner'

const TeamAccessRequestForm = () => {
	const navigate = useNavigate();
	const headers = useAuthHeaders();
	const { userEmail, setTeams } = useAuth();

	const [availableTeams, setAvailableTeams] = useState([])
	const [dataReceived, setDataReceived] = useState(false)
	const [teamId, setTeamId] = useState(null)
	const [teamDescription, setTeamDescription] = useState(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		console.log('useEffect -> request team access')

		async function fetchAvailableTeams() {
			try {
				setLoading(true);

				const teams = await fetchAvailableTeamsToJoin(headers);
				setAvailableTeams(teams)
				setDataReceived(true)

			} catch (error) {
				console.error('Error fetching available teams to join:', error.response ? error.response.data : 'Server error')
				const errMessage = error?.response?.data?.message

				if (errMessage) {
					alert(`Error: ${errMessage}`)
				} else {
					alert('Error fetching the required data.')
				}
			} finally {
				setLoading(false);
			}
		}

		fetchAvailableTeams()

	}, [headers])

	const handleTeamChange = (teamId) => {
		setTeamId(teamId)
		const selectedTeam = availableTeams.find((team) => team.id === Number(teamId))
		setTeamDescription(selectedTeam?.description)
	}

	const handleRequestTeamAccess = async (event) => {
		event.preventDefault()
		try {
			console.log(teamId)
			if (!teamId || teamId === "Select a team") {
				alert("Please select a team fist.");
				return;
			}

			const response = await requestTeamAccess(headers, teamId)
			const resMessage = response?.data?.message

			if (resMessage) {
				alert(resMessage)
			} else {
				alert('Request successful! An admin will have to approve your request.')
			}

			setLoading(true);
			const updatedTeams = await getUpdatedTeamsInfo(headers);
			setTeams(updatedTeams);

			setLoading(false);
			navigate('/');

		} catch (error) {
			console.error('Request failed:', error.response ? error.response.data : 'Server error')
			alert('Failed to request access, please check your inputs and try again.')
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			{loading ? <Spinner /> :
				<div className='form-container'>
					<h2>Request Access to a Team</h2>
					<form onSubmit={handleRequestTeamAccess}>
						<div>
							<label>Email:</label>
							<input
								type='email'
								value={userEmail || ''}
								required
								autoComplete='true'
								disabled
							/>
						</div>
						<div>
							<label>Team:</label>
							<select
								onChange={(e) => handleTeamChange(e.target.value)}
								disabled={!dataReceived}
							>
								<option value={null}>Select a team</option>
								{availableTeams.map((team) => (
									<option
										value={team.id}
										key={team.id}
									>
										{team.name}
									</option>
								))}
							</select>
						</div>

						{teamDescription && (
							<div>
								<label className='small'>Team Description:</label>
								<p className='small'>{teamDescription}</p>
							</div>
						)}
						<button
							disabled={!dataReceived}
							className={!dataReceived ? 'disabled' : ""}
							type='submit'
						>
							{dataReceived ? "Submit" : "Loading..."}
						</button>
					</form>
				</div>
			}
		</>
	)
}

export default TeamAccessRequestForm
