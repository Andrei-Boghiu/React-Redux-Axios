import React, { useCallback, useEffect, useState } from 'react'
import { approveNewMember, getMyTeam } from '../api/teamsService'
import { useAuthHeaders } from '../context/useAuthHeaders'
import Table from '../components/shared/Table'
import LoadingTable from '../components/Loaders/LoadingTable'
import { useAuth } from '../context/AuthContext';

export default function TeamManagement() {
	const headers = useAuthHeaders();
	const { teamId } = useAuth();
	const [activeMembers, setActiveMembers] = useState([]);
	const [awaitingApproval, setAwaitingApproval] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleFetchData = useCallback(() => {
		setLoading(true)
		getMyTeam(headers, teamId).then(res => {
			const members = res.data.members
			const approved = members.filter(member => member.approved === true)
			const awaitingApproval = members.filter(member => member.approved === false)

			setActiveMembers(approved);
			setAwaitingApproval(awaitingApproval);

		}).catch(error => {
			console.error(error);
			alert('Error fetching teams data');
		}).finally(() => {
			setLoading(false)
		})
	}, [headers, teamId])

	const ApproveMember = ({ rowData }) => {
		const headers = useAuthHeaders();
		const newMemberId = rowData.id;
		const [btnLoading, setBtnLoading] = useState(false);

		return (
			<button disabled={btnLoading} className={`${btnLoading ? 'disabled' : ''} table-button`} onClick={async () => {
				try {
					setBtnLoading(true)
					console.log({ headers, newMemberId });
					const response = await approveNewMember(headers, newMemberId)
					const resMessage = response?.data?.message;

					if (resMessage) {
						alert(resMessage);
					} else {
						alert('Success!')
					}

					handleFetchData()

				} catch (error) {
					alert(error);
					console.error(error)
				} finally {
					setBtnLoading(false)
				}
			}}>
				{btnLoading ? 'Loading' : 'Approve'}
			</button>
		)
	}

	useEffect(() => {
		handleFetchData()
	}, [handleFetchData]);

	return (
		<div>
			<h3>Team Management</h3>

			{loading ?
				<LoadingTable />
				: <>
					{awaitingApproval && <Table rows={awaitingApproval} title='Awaiting approval' actions={[ApproveMember]} />}
					{activeMembers && <Table rows={activeMembers} title='Active members' />}

				</>
			}
		</div>
	)
}
