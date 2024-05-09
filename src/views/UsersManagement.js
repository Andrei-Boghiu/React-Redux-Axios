import React, { useState, useEffect } from 'react'
import UsersTable from '../components/shared/UsersTable'
import { getAllUsers } from '../api/userService';
import { useAuthHeaders } from '../context/useAuthHeaders';

function UserManagement() {
	const [users, setUsers] = useState([]);
	const headers = useAuthHeaders()

	useEffect(() => {
		getAllUsers(headers)
			.then((res) => setUsers(res.data))
			.catch((err) => {
				console.error(err);
				alert('There was an error while getting the users.');
			});
	}, [headers]);

	return (
		<div>

			<div>
				<h3>Requested Access</h3>
				[Nothing yet...]
			</div>
			<div>
				<h3>All Users</h3>
				{users?.length > 0 && <UsersTable userList={users} />}

			</div>
		</div>
	)
}

export default UserManagement
