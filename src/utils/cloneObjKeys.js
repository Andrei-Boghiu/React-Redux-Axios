export default function cloneObjKeys({ originalData, keysToKeep, consoleLogSteps = false }) {
	if (consoleLogSteps) console.log({ originalData })
	if (consoleLogSteps) console.log({ keysToKeep })

	const clonedData = originalData?.map((obj) => {
		const clonedObj = {}
		keysToKeep?.forEach((key) => {
			clonedObj[key] = obj[key]
		})
		return clonedObj
	})

	if (consoleLogSteps) console.log({ clonedData })
	return clonedData
}

