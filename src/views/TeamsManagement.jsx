import React, { useCallback, useEffect, useState } from 'react'
import { approveNewTeam, getAllTeams } from '../api/teamsService'
import { useAuthHeaders } from '../context/useAuthHeaders'
import LoadingTable from '../components/Loaders/LoadingTable';
import Table from '../components/shared/Table';

export default function TeamsManagement() {
  const headers = useAuthHeaders();
  const [activeTeams, setActiveTeams] = useState([])
  const [awaitingApproval, setAwaitingApproval] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchData = useCallback(() => {
    setLoading(true)
    getAllTeams(headers).then(res => {
      const teams = res.data.teams
      const approved = teams.filter(team => team.approved === true)
      const awaitingApproval = teams.filter(team => team.approved === false)

      setActiveTeams(approved);
      setAwaitingApproval(awaitingApproval);

    }).catch(error => {
      console.error(error);
      alert('Error fetching teams data');
    }).finally(() => {
      setLoading(false)
    })
  }, [headers])

  const ApproveTeam = ({ rowData }) => {
    const headers = useAuthHeaders();
    const teamId = rowData.id;

    const [btnLoading, setBtnLoading] = useState(false);

    return (
      <button disabled={btnLoading} className={`${btnLoading ? 'disabled' : ''} table-button`} onClick={async () => {
        try {
          setBtnLoading(true)
          console.log({ headers, teamId });
          const response = await approveNewTeam(headers, teamId)
          const resMessage = response?.data?.message;
          console.log(resMessage)
          console.log(response)

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
      <h3>Teams Management</h3>

      {loading ?
        <LoadingTable />
        : <>
          {awaitingApproval && <Table rows={awaitingApproval} title='Awaiting approval' actions={[ApproveTeam]} />}
          {activeTeams && <Table rows={activeTeams} title='Active teams' />}

        </>
      }
    </div>
  )
}