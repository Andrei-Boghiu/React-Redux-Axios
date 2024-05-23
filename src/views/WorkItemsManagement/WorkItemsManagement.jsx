import ManageWorkItemsBox from '../../components/ManageWorkItemsBox/ManageWorkItemsBox';
import { insertWorkItems } from '../../api/workService';

export default function WorkItemsManagement() {

	const dummyFunc = (headers, data) => {
		console.log(headers, data)
	}

	const options = [
		{
			id: 1,
			title: "Upload Work Items",
			description: "Add new work items to allocation. Duplicates of `aux_id` will not be allowed",
			sendDataApi: insertWorkItems,
			requiredHeaders: ["aux_id", "aux_tool", "aux_subject", "priority",],
			allHeaders: ["aux_id", "priority"],
			disabled: false
		},
		{
			id: 2,
			title: "Update Work Items",
			description: "Use the `aux_id` column to update existing work items from allocation. If the `aux_id` isn&apos;t found, it will skip it.",
			sendDataApi: insertWorkItems,
			requiredHeaders: ["aux_id", "priority"],
			allHeaders: ["aux_id", "priority"],
			disabled: false
		},
		{
			id: 3,
			title: "Upload & Update Work Items",
			description: "Instances of &apos;aux_id&apos; already present in the allocation will be updated, and new ones will be added.",
			sendDataApi: insertWorkItems,
			requiredHeaders: ["aux_id", "priority"],
			allHeaders: ["aux_id", "priority"],
			disabled: false
		},
		{
			id: 4,
			title: "Remove Work Items",
			description: "	Use the &apos;aux_id&apos; column to tag cases with the &apos;Removed&apos; status in order to be excluded from allocation unless updated later on.",
			sendDataApi: dummyFunc,
			requiredHeaders: ["aux_id", "priority"],
			allHeaders: ["aux_id", "priority"],
			disabled: true
		},
		{
			id: 5,
			title: "Adhoc Work Items",
			description: "",
			sendDataApi: dummyFunc,
			requiredHeaders: ["aux_id", "priority"],
			allHeaders: ["aux_id", "priority"],
			disabled: true
		},
		{
			id: 6,
			title: "Delete All Items from Team team_nr",
			description: "This will all the data from the team database! Will require admin approval!",
			sendDataApi: insertWorkItems,
			requiredHeaders: ["aux_id", "priority"],
			allHeaders: ["aux_id", "priority"],
			disabled: true
		},
	]


	return (
		<div className='flex-wrap'>
			{/* Components or sections for adding, modifying, deleting work items */}
			{/* Components or sections for viewing statistics about work items */}

			{
				options.map(option =>
					<ManageWorkItemsBox
						key={option.id}
						sendDataApi={option.sendDataApi}
						title={option.title}
						description={option.description}
						disabled={option.disabled} />
				)
			}

		</div>
	)
}
