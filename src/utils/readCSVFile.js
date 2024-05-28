export default function readCSVFile(file) {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();
            const data = [];

            reader.readAsText(file);
            reader.onload = () => {
                const csvData = reader.result;
                const rows = csvData.split('\n');

                // Read the first row as headers
                const headers = rows[0].split(',').map(header => header.trim().toLowerCase());

                // Iterate over the remaining rows as data
                for (let i = 1; i < rows.length; i++) {
                    const rowData = rows[i].split(',');
                    if (rowData.length === headers.length) {
                        const obj = {};
                        rowData.forEach((value, index) => {
                            obj[headers[index]] = value.trim();
                        });
                        data.push(obj);
                    }
                }

                resolve({ headers, data });
            };
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}