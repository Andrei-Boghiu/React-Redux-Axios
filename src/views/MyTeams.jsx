import { useEffect, useState } from 'react'
import { getMyTeams } from '../api/teamsService'
import { useAuthHeaders } from '../context/useAuthHeaders'
import Table from '../components/shared/Table'
import LoadingTable from '../components/Loaders/LoadingTable'

export default function MyTeams() {
	const [tableRows, setRows] = useState([])
	const [loading, setLoading] = useState(false)

	const headers = useAuthHeaders()
	useEffect(() => {
		setLoading(true)
		getMyTeams(headers)
			.then((teams) => {
				setRows(teams)
			})
			.catch((error) => {
				console.error(error)
				alert('Error fetching teams data')
			})
			.finally(() => {
				setLoading(false)
			})
	}, [headers])

	return (
		<div>
			<h3>My Teams</h3>
			{loading ?
				<LoadingTable />
				: <>
					{tableRows?.length > 0 ? <Table rows={tableRows} /> : <p>You are not a member in any team...</p>}
				</>
			}
		</div>
	)
}
