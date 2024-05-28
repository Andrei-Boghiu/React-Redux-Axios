import ManageWorkItemsBox from '../../components/ManageWorkItemsBox/ManageWorkItemsBox';
import { newItemsAllocation, updateItemsAllocation, addUpdateItemsAllocation, removeItemsAllocation, adhocTaskAllocation } from '../../api/workService'

export default function WorkItemsManagement() {

	const acceptableHeaders = [
		"aux_id",
		"aux_tool",
		"aux_subject",
		"aux_status",
		"aux_queue",
		"aux_creation_date",
		"priority",
		"due_date",
		"follow_up_date"
	];

	const options = [
		{
			id: 1,
			title: "Upload Work Items",
			description: "Add new work items to allocation. Duplicates of `aux_id` will not be allowed",
			sendDataApi: newItemsAllocation,
			requiredHeaders: ["aux_id", "aux_tool"],
			allHeaders: acceptableHeaders,
			disabled: false
		},
		{
			id: 2,
			title: "Update Work Items",
			description: "Use the `aux_id` column to update existing work items from allocation. If the `aux_id` isn&apos;t found, it will skip it.",
			sendDataApi: updateItemsAllocation,
			requiredHeaders: ["aux_id"],
			allHeaders: acceptableHeaders,
			disabled: false
		},
		{
			id: 3,
			title: "Upload & Update Work Items",
			description: "Instances of &apos;aux_id&apos; already present in the allocation will be updated, and new ones will be added.",
			sendDataApi: addUpdateItemsAllocation,
			requiredHeaders: ["aux_id", "aux_tool"],
			allHeaders: acceptableHeaders,
			disabled: false
		},
		{
			id: 4,
			title: "Remove Work Items",
			description: "	Use the &apos;aux_id&apos; column to tag cases with the &apos;Removed&apos; status in order to be excluded from allocation unless updated later on.",
			sendDataApi: removeItemsAllocation,
			requiredHeaders: ["aux_id"],
			allHeaders: ["aux_id"],
			disabled: false
		},
		{
			id: 5,
			title: "Adhoc Work Items",
			description: "Allocate a set of tasks to users, having the possibility to pre-assign the task to a specific user. Ideal for daily or/and adhoc tasks.",
			sendDataApi: adhocTaskAllocation,
			requiredHeaders: ["aux_subject", "aux_status"],
			allHeaders: ["aux_subject", "aux_status", "aux_id", "priority", "due_date"],
			disabled: true
		},
		{
			id: 6,
			title: "Delete All Items from Team ${team_id}",
			description: "This will all the data from the team database! Will require admin approval!",
			sendDataApi: () => { console.log("he he") },
			requiredHeaders: ["aux_id", "priority"],
			allHeaders: ["aux_id", "priority"],
			disabled: true
		},
	]

	return (
		<div className='flex-wrap'>
			{
				options.map(option =>
					<ManageWorkItemsBox
						key={option.id}
						sendDataApi={option.sendDataApi}
						title={option.title}
						description={option.description}
						disabled={option.disabled}
						requiredHeaders={option.requiredHeaders}
						allHeaders={option.allHeaders} />
				)
			}
		</div>
	)
}