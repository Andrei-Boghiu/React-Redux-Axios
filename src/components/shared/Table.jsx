import React from 'react'

export default function Table({ rows, actions }) {
    if (rows.length === 0) return null
    const areActions = actions?.length > 0

    return (
        <table>
            <thead>
                <tr key="table-thead">
                    {Object.keys(rows[0]).map((key, index) =>
                        <th key={`header-${index}-${key}`}>
                            {key}
                        </th>
                    )}

                    {areActions && <th key="header-actions">Actions</th>}
                </tr>
            </thead>
            <tbody>
                {rows.map((item) => (
                    <tr key={item.id}>
                        {Object.entries(item).map(([key, value]) => (
                            <td key={`${item.id}-${key}`}>
                                {typeof value === 'boolean' ? (value ? 'True' : 'False') : value === null ? '[ Null ]' : value}
                            </td>
                        ))}
                        {
                            areActions &&
                            <td key={`${item.id}-actions`}>
                                {
                                    actions.map((ActionComponent, actionId) => (
                                        <ActionComponent key={actionId} rowData={item} />
                                    ))
                                }
                            </td>
                        }
                    </tr>
                ))}
            </tbody>
        </table>
    )
}