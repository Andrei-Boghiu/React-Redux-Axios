import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserProfile, sendRequestTeamAccess } from '../api/userService'

function RequestTeamAccess() {
	const [email, setEmail] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [dataReceived, setDataReceived] = useState(false)
	const [existingTeams, setExistingTeams] = useState([]) // TO REPLACE WITH API CALL
	const [teamId, setTeamId] = useState(null)
	const [teamDescription, setTeamDescription] = useState(null)
	const [enableSubmit, setEnableSubmit] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		getUserProfile().then(res => {
			console.log(res)
			setEmail(res.data.email)
			setFirstName(res.data.first_name)
			setLastName(res.data.last_name)
			setDataReceived(true)
		}).catch(err => {
			console.error(err)
			alert(`There was an error...`)
		})

		setExistingTeams([
			{ team_id: 1, team_name: "Development Team", "team_description": "The development team of this platform" },
			{ team_id: 2, team_name: "Admins Team", "team_description": "The admin team of this platform" },
			{ team_id: 3, team_name: "Work Allocators Team", "team_description": "The allocation team of this platform" },
			{ team_id: 4, team_name: "Managers Team", "team_description": "The manager team" }
		])
	}, [])

	useEffect(() => {
		console.log(enableSubmit)
	}, [enableSubmit])

	const handleTeamChange = (teamId) => {
		setTeamId(teamId)
		const selectedTeam = existingTeams.find(team => team.team_id === Number(teamId))
		setEnableSubmit(selectedTeam?.team_id === Number(teamId) ? true : false)
		setTeamDescription(selectedTeam?.team_description)
		console.log(teamId)
	}

	const handleRequestTeamAccess = async (event) => {
		event.preventDefault()
		try {
			const response = await sendRequestTeamAccess(teamId)

			console.log('Registration successful:', response.data)
			alert('Registration successful!')
			navigate('/login')
		} catch (error) {
			console.error('Registration failed:', error.response ? error.response.data : 'Server error')
			alert('Failed to register, please check your inputs and try again.')
		}
	}

	return (
		<div className='form-container'>
			<h2>Request Access</h2>
			<form onSubmit={handleRequestTeamAccess}>
				<div>
					<label>Email:</label>
					<input
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						autoComplete='true'
						disabled={email ? true : false}
					/>
				</div>
				<div>
					<label>First Name:</label>
					<input
						type='text'
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
						autoComplete='true'
						disabled={firstName ? true : false}
					/>
				</div>
				<div>
					<label>Last Name:</label>
					<input
						type='text'
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
						autoComplete='true'
						disabled={lastName ? true : false}
					/>
				</div>
				<div>
					<label>Team:</label>
					<select onChange={e => handleTeamChange(e.target.value)}>
						<option value={null}>Select a team</option>
						{existingTeams.length > 0 &&
							existingTeams.map(team =>
								<option value={team.team_id} key={team.team_id}>{team.team_name}</option>)
						}
					</select>
				</div>

				{teamDescription && <div>
					<label>Team Description:</label>
					<p>{teamDescription}</p>
				</div>}
				<button disabled={dataReceived ? false : enableSubmit ? false : true} className={`${!dataReceived ? 'disabled' : !enableSubmit ? 'disabled' : null}`} type='submit'>Register</button>
			</form>
		</div>
	)
}

export default RequestTeamAccess
