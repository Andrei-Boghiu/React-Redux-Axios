import PropTypes from 'prop-types';

export default function Table({ rows, actions = [], title = null }) {
	if (!rows || rows.length === 0) return null
	if (!rows[0].id) return null
	const areActions = actions.length > 0

	return (
		<table>
			{title && <caption>{title}</caption>}
			<thead>
				<tr key='table-thead'>
					{Object.keys(rows[0]).map((key, index) => (
						<th key={`header-${index}-${key}`}>{key}</th>
					))}
					{areActions && <th key='header-actions'>Actions</th>}
				</tr>
			</thead>
			<tbody>
				{rows.map((item) => (
					<tr key={item.id}>
						{Object.entries(item).map(([key, value]) => (
							<td key={`${item.id}-${key}`}>
								{typeof value === 'boolean'
									? value
										? 'True'
										: 'False'
									: value === null
										? '[ Null ]'
										: typeof value === 'object'
											? JSON.stringify(value)
											: value}
							</td>
						))}
						{areActions && (
							<td key={`${item.id}-actions`}>
								{actions.map((ActionComponent, actionId) => (
									<ActionComponent
										key={actionId}
										rowData={item}
									/>
								))}
							</td>
						)}
					</tr>
				))}
			</tbody>
		</table>
	)
}

Table.propTypes = {
	rows: PropTypes.array.isRequired,
	actions: PropTypes.array,
	title: PropTypes.string
}