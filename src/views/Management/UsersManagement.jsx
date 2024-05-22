import { useState, useEffect } from 'react'
import { getAllUsers } from '../../api/userService'
import { useAuthHeaders } from '../../context/useAuthHeaders'
import Table from '../../components/shared/Table'
import LoadingTable from '../../components/Loaders/LoadingTable'

export default function UsersManagement() {
	const [users, setUsers] = useState([])
	const [loading, setLoading] = useState(false)

	const headers = useAuthHeaders()

	useEffect(() => {
		console.log(`useEffect -> UsersManagement`)
		setLoading(true)
		getAllUsers(headers)
			.then((users) => setUsers(users))
			.catch((err) => {
				console.error(err)
				alert('There was an error while getting the users.')
			})
			.finally(() => setLoading(false))
	}, [headers])

	return (
		<div>
			<div>
				<h3>Requested Access</h3>
				[Nothing yet...]
			</div>
			<div>
				<h3>All Users</h3>
				{loading ? <LoadingTable /> : <Table rows={users} />}
			</div>
		</div>
	)
}
