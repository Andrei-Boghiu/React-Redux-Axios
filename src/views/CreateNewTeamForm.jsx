import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthHeaders } from '../context/useAuthHeaders'
import { requestCreateNewTeam } from '../api/teamsService'
import { useAuth } from '../context/useAuth'

export default function CreateNewTeam() {
	const navigate = useNavigate()
	const headers = useAuthHeaders()
	const { userEmail } = useAuth()

	const [teamName, setTeamName] = useState('')
	const [teamDescription, setTeamDescription] = useState('')
	const [loading, setLoading] = useState(false)

	const handleCreateNewTeam = async (e) => {
		e.preventDefault()
		setLoading(true)
		try {
			const response = await requestCreateNewTeam(headers, { teamName, teamDescription })
			const resMessage = response?.data?.message

			if (resMessage) {
				alert(resMessage)
			} else {
				alert('Request to create a new team sent successfully!')
			}

			navigate('/')
		} catch (error) {
			console.error('Error creating new team:', error)
			alert('There was an error...')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='form-container'>
			<h2>Create a New Team</h2>
			<form onSubmit={handleCreateNewTeam}>
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
					<label>Team Name:</label>
					<input
						type='text'
						value={teamName}
						onChange={(e) => setTeamName(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Team Description:</label>
					<input
						type='text'
						value={teamDescription}
						onChange={(e) => setTeamDescription(e.target.value)}
						required
					/>
				</div>

				<button
					disabled={loading}
					className={loading ? 'disabled' : ''}
					type='submit'
				>
					{loading ? 'Loading...' : 'Submit'}
				</button>
			</form>
		</div>
	)
}
