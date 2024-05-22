import { useEffect, useState } from 'react'
import { getMyTeams, getUpdatedTeamsInfo } from '../api/teamsService'
import { useAuthHeaders } from '../context/useAuthHeaders'
import Table from '../components/shared/Table'
import Spinner from '../components/Loaders/Spinner'
import { useAuth } from '../context/useAuth'

export default function MyTeams() {
	const [membershipsTable, setMemberships] = useState([])
	const [teamsTable, setTeams] = useState([])
	const [loading, setLoading] = useState(false)
	const [teamsUpdated, setTeamsUpdated] = useState(false)
	const { setTeams: updateTeams } = useAuth()

	const headers = useAuthHeaders();

	useEffect(() => {
		setLoading(true)

		getMyTeams(headers)
			.then((res) => {
				setMemberships(res?.memberships)
				setTeams(res?.teams)
			})
			.catch((error) => {
				console.error(error)
				alert('Error fetching teams data')
			})
			.finally(() => {
				setLoading(false)
			});

	}, [headers])

	useEffect(() => {
		if (!teamsUpdated) {
			getUpdatedTeamsInfo(headers)
				.then(teams => updateTeams(teams))
				.catch(err => console.error(`Error updating user teams`, err))
				.finally(() => setTeamsUpdated(true))
		}
	}, [headers, updateTeams, teamsUpdated])

	return (
		<>
			{loading ?
				<Spinner />
				: <>
					{membershipsTable?.length > 0 ? <Table rows={membershipsTable} title="Memberships" /> : <p>You are not a member in any team...</p>}
					{teamsTable?.length > 0 && <Table rows={teamsTable} title="Teams Awaiting Approval" />}
				</>
			}
		</>
	)
}
