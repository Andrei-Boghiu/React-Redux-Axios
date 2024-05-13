import React, { useEffect, useState } from 'react'
import { getMyTeam } from '../api/teamsService'
import { useAuthHeaders } from '../context/useAuthHeaders'
import Table from '../components/shared/Table'
import LoadingTable from '../components/Loaders/LoadingTable'
import { useAuth } from '../context/AuthContext';

export default function TeamManagement() {
	const headers = useAuthHeaders();
	const { teamId } = useAuth();
	const [tableRows, setRows] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true)
		getMyTeam(headers, teamId).then(res => {
			console.log(res)
			setRows(res.data.teams)

		}).catch(error => {
			console.error(error);
			alert('Error fetching teams data');
		}).finally(() => {
			setLoading(false)
		})
	}, [headers, teamId]);

	return (
		<div>
			<h3>Team Management</h3>

			{loading ?
				<LoadingTable />
				: <Table rows={tableRows} />
			}
		</div>
	)
}
