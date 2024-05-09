import React, { useEffect, useState } from 'react'
import UsersTable from '../components/shared/UsersTable'
import { getAllUsers } from '../api/userService';

function UserManagement() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getAllUsers().then(res => setUsers(res.data))
	}, [])

	return (
		<div>

			<div>
				<h3>Requested Access</h3>
				[Nothing yet...]
			</div>
			<div>
				<h3>All Users</h3>
				{users.length > 0 && <UsersTable userList={users} />}

			</div>
		</div>
	)
}

export default UserManagement
