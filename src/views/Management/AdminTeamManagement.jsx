import React, { useCallback, useEffect, useState } from 'react'
import { approveNewMember, getAdminsMembers } from '../../api/teamsService'
import { useAuthHeaders } from '../../context/useAuthHeaders'
import Table from '../../components/shared/Table'
import LoadingTable from '../../components/Loaders/LoadingTable'

export default function AdminTeamManagement() {
	const headers = useAuthHeaders()
	const [activeMembers, setActiveMembers] = useState([])
	const [awaitingApproval, setAwaitingApproval] = useState([])
	const [loading, setLoading] = useState(false)

	const handleFetchData = useCallback(() => {
		setLoading(true)
		getAdminsMembers(headers, 1914)
			.then((members) => {
				const approved = members?.filter((member) => member.approved === true)
				const awaitingApproval = members?.filter((member) => member.approved === false)

				setActiveMembers(approved)
				setAwaitingApproval(awaitingApproval)
			})
			.catch((error) => {
				console.error(error)
				alert('Error fetching teams data')
			})
			.finally(() => {
				setLoading(false)
			})
	}, [headers])

	const ApproveMember = ({ rowData }) => {
		const headers = useAuthHeaders()
		const newMemberId = rowData.uid
		const teamId = rowData.tid
		const [btnLoading, setBtnLoading] = useState(false)

		return (
			<button
				disabled={btnLoading}
				className={`${btnLoading ? 'disabled' : ''} table-button`}
				onClick={async () => {
					try {
						setBtnLoading(true)
						const response = await approveNewMember(headers, newMemberId, teamId)
						const resMessage = response?.message

						if (resMessage) {
							alert(resMessage)
						} else {
							alert('Success!')
						}

						handleFetchData()
					} catch (error) {
						alert(error)
						console.error(error)
					} finally {
						setBtnLoading(false)
					}
				}}
			>
				{btnLoading ? 'Loading' : 'Approve'}
			</button>
		)
	}

	useEffect(() => {
		handleFetchData()
	}, [handleFetchData])

	return (
		<div>
			<h3>Team Management</h3>

			{loading ? (
				<LoadingTable />
			) : (
				<>
					{awaitingApproval && (
						<Table
							rows={awaitingApproval}
							title='Awaiting approval'
							actions={[ApproveMember]}
						/>
					)}
					{activeMembers && (
						<Table
							rows={activeMembers}
							title='Active members'
						/>
					)}
				</>
			)}
		</div>
	)
}
