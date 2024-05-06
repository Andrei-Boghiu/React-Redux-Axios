import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import axios from 'axios'

function WorkItemsManagement() {
	const [file, setFile] = useState(null)
	const requiredHeaders = ['title', 'description']

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

	const verifyAndUploadData = (data) => {
		if (data.length === 0) {
			alert('The file is empty.')
			return
		}
		// Check if the necessary headers are present
		const dataHeaders = Object.keys(data[0])
		const areRequiredHeadersPresent = requiredHeaders.every((header) => dataHeaders.includes(header))

		if (!areRequiredHeadersPresent) {
			alert('The file does not contain the necessary headers. Please check the file and try again.')
			return
		}

		// Data is verified, log it and proceed with upload
		console.log('Verified data:', data)

		axios
			.post('http://localhost:3001/api/work/admin/add-items', data, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})
			.then((response) => {
				alert('Data uploaded successfully!')
			})
			.catch((error) => {
				console.error('Failed to upload data:', error)
				alert('Error uploading data.')
			})
	}

	const downloadTemplate = () => {
		const wb = XLSX.utils.book_new()
		const ws_name = 'Template'
		const data = [requiredHeaders]

		const ws = XLSX.utils.aoa_to_sheet(data)

		XLSX.utils.book_append_sheet(wb, ws, ws_name)

		XLSX.writeFile(wb, 'Template.xlsx')
	}

	return (
		<div>
			<h1>Work Items Management</h1>
			<div>
				<h3>Upload Work Items</h3>
				<input type='file' onChange={handleFileChange} />
				<button onClick={handleFileUpload}>Upload Data</button>
				<button onClick={downloadTemplate}>Download Template</button>

				{/* Components or sections for adding, modifying, deleting work items */}
				{/* Components or sections for viewing statistics about work items */}
			</div>
		</div>
	)
}

export default WorkItemsManagement
