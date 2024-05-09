import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import { insertWorkItems } from '../api/workService'

function WorkItemsManagement() {
	const [file, setFile] = useState(null)
	const requiredHeaders = ['title', 'description', 'team_id'];
	const templateHeaders = ['aux_id', 'title', 'description', 'team_id'];

	const handleFileChange = (event) => {
		setFile(event.target.files[0])
	}

	const handleFileUpload = () => {
		if (!file) {
			alert('Please select a file first!')
			return
		}
		const reader = new FileReader()
		reader.onload = (e) => {
			const data = new Uint8Array(e.target.result)
			const workbook = XLSX.read(data, { type: 'array' })
			const sheetName = workbook.SheetNames[0]
			const worksheet = workbook.Sheets[sheetName]
			const json = XLSX.utils.sheet_to_json(worksheet)
			verifyAndUploadData(json)
		}
		reader.readAsArrayBuffer(file)
	}

	const verifyAndUploadData = async (data) => {
		try {
			if (data.length === 0) {
				alert('The file is empty.')
				return
			}

			const dataHeaders = Object.keys(data[0])
			const areRequiredHeadersPresent = requiredHeaders.every((header) => dataHeaders.includes(header))

			if (!areRequiredHeadersPresent) {
				alert('The file does not contain the necessary headers. Please check the file and try again.')
				return
			}

			await insertWorkItems(data)
			alert('Data uploaded successfully!')

		} catch (error) {
			console.error('Failed to upload data:')
			console.error(error)
			const errMessage = error?.response?.data?.message
			const errDetails = error?.response?.data?.error?.detail
			if (errMessage && errDetails) {
				alert(`${errMessage}: ${errDetails}`)
			} else {
				alert('Error uploading data: unknown error')
			}
		}
	}

	const downloadTemplate = () => {
		const wb = XLSX.utils.book_new()
		const ws_name = 'Template'
		const data = [templateHeaders]
		const ws = XLSX.utils.aoa_to_sheet(data)
		XLSX.utils.book_append_sheet(wb, ws, ws_name)
		XLSX.writeFile(wb, 'Template.xlsx')
	}

	return (
		<div className='flex-wrap'>
			<div className='action-box'>
				<h3>Upload Work Items</h3>
				<p>Add new work items to allocation. Duplicates of <code>aux_id</code> will not be allowed</p>
				<input type='file' id='file-input' onChange={handleFileChange} />

				<div className='flex-row-gap'>
					<button onClick={handleFileUpload}>Upload Data</button>
					<button onClick={downloadTemplate}>Download Template</button>
				</div>

				{/* Components or sections for adding, modifying, deleting work items */}
				{/* Components or sections for viewing statistics about work items */}
			</div>
			<div className='action-box'>
				<h3>Update Work Items</h3>
				<p>Use the <code>aux_id</code> column to update existing work items from allocation. If the <code>aux_id</code> isn't found, it will skip it.</p>

				<input type='file' id='file-input' disabled={true} />

				<div className='flex-row-gap'>
					<button className='disabled' disabled={true}>
						Upload Data
					</button>
					<button className='disabled' disabled={true}>
						Download Template
					</button>
				</div>
			</div>
			<div className='action-box'>
				<h3>Upload & Update Work Items</h3>
				<p>Instances of <code>aux_id</code> that are already in the allocation will be updated if the <code>status</code> isn't 'WIP', and new ones will be added.</p>

				<input type='file' id='file-input' onChange={handleFileChange} />

				<div className='flex-row-gap'>
					<button onClick={handleFileUpload}>Upload Data</button>
					<button onClick={downloadTemplate}>Download Template</button>
				</div>

				{/* Components or sections for adding, modifying, deleting work items */}
				{/* Components or sections for viewing statistics about work items */}
			</div>
			<div className='action-box'>
				<h3>Remove Work Items</h3>
				<p>Use the <code>aux_id</code> column to tag cases with the 'Removed' status in order to be excluded from allocation unless updated later on.</p>

				<input type='file' id='file-input' disabled={true} />

				<div className='flex-row-gap'>
					<button className='disabled' disabled={true}>
						Upload Data
					</button>
					<button className='disabled' disabled={true}>
						Download Template
					</button>
				</div>
			</div>
			<div className='action-box'>
				<h3>Delete All Items from Team team_nr</h3>
				<button className='disabled' disabled={true}>
					Remove All
				</button>
			</div>
		</div>
	)
}

export default WorkItemsManagement
