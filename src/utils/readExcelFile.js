import Excel from 'exceljs';

export default function readExcelFile(file) {
    return new Promise((resolve, reject) => {
        try {
            const wb = new Excel.Workbook();
            const reader = new FileReader();
            const data = [];

            reader.readAsArrayBuffer(file);
            reader.onload = () => {
                const buffer = reader.result;
                wb.xlsx.load(buffer).then(workbook => {
                    workbook.eachSheet((sheet) => {
                        // Read the first row as headers
                        const headers = sheet.getRow(1).values.map(header => header && header.toString().toLowerCase());

                        // Iterate over the remaining rows as data
                        sheet.eachRow((row, rowNumber) => {
                            if (rowNumber > 1) {
                                const rowData = row.values;
                                const obj = {};
                                rowData.forEach((value, index) => {
                                    obj[headers[index]] = value instanceof Date ? value.toISOString() : value;
                                });
                                data.push(obj);
                            }
                        });

                        resolve({ headers, data });
                    });
                });
            };
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

