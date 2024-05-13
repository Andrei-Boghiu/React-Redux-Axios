import React, { useEffect, useState } from 'react'
import { getMyTeams } from '../api/teamsService'
import { useAuthHeaders } from '../context/useAuthHeaders'
import Table from '../components/shared/Table'
import LoadingTable from '../components/Loaders/LoadingTable'

const TeamUserActionBtn = ({ rowData }) => {
    const isApproved = rowData.approved;

    const handleClick = () => {
        console.log(rowData);


    }

    return (
        <button className='table-button' onClick={handleClick}>
            {isApproved ? 'Remove' : 'Approve'}
        </button>);
}


export default function MyTeams() {
    const [tableRows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);

    const actions = [TeamUserActionBtn]

    const headers = useAuthHeaders();
    useEffect(() => {
        setLoading(true)
        getMyTeams(headers).then(res => {
            console.log(res)
            setRows(res.data.teams)

        }).catch(error => {
            console.error(error);
            alert('Error fetching teams data');
        }).finally(() => {
            setLoading(false)
        })
    }, [headers]);

    return (
        <div>
            <h3>My Teams</h3>
            {loading ?
                <LoadingTable />
                : <Table rows={tableRows} actions={actions} />
            }
        </div>
    )
}