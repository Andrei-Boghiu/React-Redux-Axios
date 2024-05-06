import React from 'react'

const WorkItemsTable = ({ workItems, handleComplete, handleUnassigned }) => {
	const getTableHeaders = () => {
		if (workItems.length === 0) return null
		return Object.keys(workItems[0]).map((key) => <th key={key}>{key}</th>)
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
				{workItems.map((item) => (
					<tr key={item.id}>
						{Object.values(item).map((value, index) => (
							<td key={index}>{value}</td>
						))}
						<td>
							<button onClick={() => handleComplete(item.id)}>Completed</button>
							<button onClick={() => handleUnassigned(item.id)}>Unassign</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default WorkItemsTable
