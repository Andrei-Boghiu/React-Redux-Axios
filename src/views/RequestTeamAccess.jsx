import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserProfile } from '../api/userService'
import { useAuthHeaders } from '../context/useAuthHeaders'
import { fetchAvailableTeamsToJoin, requestTeamAccess } from '../api/teamsService'

export default function RequestTeamAccess() {
	const navigate = useNavigate();
	const headers = useAuthHeaders();

	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [availableTeams, setAvailableTeams] = useState([]);

	const [dataReceived, setDataReceived] = useState(false);
	const [teamId, setTeamId] = useState(null);
	const [teamDescription, setTeamDescription] = useState(null);
	const [enableSubmit, setEnableSubmit] = useState(false);

	useEffect(() => {
		console.log(`useEffect -> request team access`);
		Promise.all([getUserProfile(headers), fetchAvailableTeamsToJoin(headers)])
			.then(([userProfileResponse, availableTeamsResponse]) => {

				// Set User Profile Data
				setEmail(userProfileResponse.data.email)
				setFirstName(userProfileResponse.data.first_name)
				setLastName(userProfileResponse.data.last_name)

				// Set Available Teams to join
				setAvailableTeams(availableTeamsResponse.data)

				setDataReceived(true)
			}).catch((error) => {
				const errMessage = error?.response?.data?.message
				console.error('Login failed:', error.response ? error.response.data : 'Server error');

				if (errMessage) {
					alert(`Error: ${errMessage}`)
				} else {
					alert('Error fetching the required data.');
				}
			});

	}, [headers])

	const handleTeamChange = (teamId) => {
		setTeamId(teamId)
		const selectedTeam = availableTeams.find((team) => team.id === Number(teamId))
		setEnableSubmit(selectedTeam?.id === Number(teamId) ? true : false)
		setTeamDescription(selectedTeam?.description)
	}

	const handleRequestTeamAccess = async (event) => {
		event.preventDefault();
		try {
			const response = await requestTeamAccess(headers, teamId);
			const resMessage = response?.data?.message;

			if (resMessage) {
				alert(resMessage)
			} else {
				alert('Request successful! An admin will have to approve your request.');
			}

			navigate('/', { state: { from: '/request-team-access' } });
		} catch (error) {
			console.error('Registration failed:', error.response ? error.response.data : 'Server error');
			alert('Failed to register, please check your inputs and try again.');
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
					<select onChange={(e) => handleTeamChange(e.target.value)} disabled={!dataReceived}>
						<option value={null}>Select a team</option>
						{availableTeams.length > 0 &&
							availableTeams.map((team) => (
								<option value={team.id} key={team.id}>
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
					disabled={dataReceived && !enableSubmit}
					className={`${!dataReceived ? 'disabled' : !enableSubmit ? 'disabled' : null}`}
					type='submit'
				>
					Submit
				</button>
			</form>
		</div>
	)
};

