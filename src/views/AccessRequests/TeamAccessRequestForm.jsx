import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthHeaders } from '../../context/useAuthHeaders'
import { fetchAvailableTeamsToJoin, requestTeamAccess } from '../../api/teamsService'
import { useAuth } from '../../context/useAuth'

const TeamAccessRequestForm = () => {
	const navigate = useNavigate()
	const headers = useAuthHeaders()
	const { userEmail } = useAuth()

	const [availableTeams, setAvailableTeams] = useState([])
	const [dataReceived, setDataReceived] = useState(false)
	const [teamId, setTeamId] = useState(null)
	const [teamDescription, setTeamDescription] = useState(null)
	const [enableSubmit, setEnableSubmit] = useState(false)

	useEffect(() => {
		console.log('useEffect -> request team access')
		fetchAvailableTeamsToJoin(headers)
			.then((teams) => {
				setAvailableTeams(teams)
				setDataReceived(true)
			})
			.catch((error) => {
				const errMessage = error?.response?.data?.message
				console.error('Error fetching available teams:', error.response ? error.response.data : 'Server error')

				if (errMessage) {
					alert(`Error: ${errMessage}`)
				} else {
					alert('Error fetching the required data.')
				}
			})
	}, [headers])

	const handleTeamChange = (teamId) => {
		setTeamId(teamId)
		const selectedTeam = availableTeams.find((team) => team.id === Number(teamId))
		setEnableSubmit(!!selectedTeam)
		setTeamDescription(selectedTeam?.description)
	}

	const handleRequestTeamAccess = async (event) => {
		event.preventDefault()
		try {
			const response = await requestTeamAccess(headers, teamId)
			const resMessage = response?.data?.message

			if (resMessage) {
				alert(resMessage)
			} else {
				alert('Request successful! An admin will have to approve your request.')
			}

			navigate('/')
		} catch (error) {
			console.error('Request failed:', error.response ? error.response.data : 'Server error')
			alert('Failed to request access, please check your inputs and try again.')
		}
	}

	return (
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
					disabled={!enableSubmit}
					className={!dataReceived || !enableSubmit ? 'disabled' : ''}
					type='submit'
				>
					Submit
				</button>
			</form>
		</div>
	)
}

export default TeamAccessRequestForm
