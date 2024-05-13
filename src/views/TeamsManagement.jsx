import React, { useEffect, useState } from 'react'
import { getAllTeams } from '../api/teamsService'
import { useAuthHeaders } from '../context/useAuthHeaders'
import LoadingTable from '../components/Loaders/LoadingTable';
import Table from '../components/shared/Table';

export default function TeamsManagement() {
  const headers = useAuthHeaders();
  const [tableRows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    getAllTeams(headers).then(res => {
      console.log(res)
      setRows(res.data.teams)

    }).catch(error => {
      console.error(error);
      alert('Error fetching teams data');
    }).finally(() => {
      setLoading(false)
    })

  }, [headers])

  return (
    <div>
      <h4>Manage all teams</h4>

      {loading ?
        <LoadingTable />
        : <Table rows={tableRows} />
      }
    </div>
  )
}