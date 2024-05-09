import React from 'react'
import '../../assets/tables.css'

const UsersTable = ({ userList, handleApprove }) => {
    const getTableHeaders = () => {
        if (userList.length === 0) return null
        return Object.keys(userList[0]).map((key) => <th key={key}>{key}</th>)
    }

    return (
        <table>
            <thead>
                <tr>
                    {getTableHeaders()}
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {userList.map((item) => (
                    <tr key={item.id}>
                        {Object.values(item).map((value, index) => (
                            <td key={index}>{typeof value === 'boolean' ? value ? 'True' : 'False' : value}</td>
                        ))}
                        <td>
                            <button className='table-button' onClick={() => handleApprove(item.id)}>
                                Complete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default UsersTable
