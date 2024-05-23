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
                        sheet.eachRow((row) => data.push(row.values))

                        const result = data.slice(1).map(row => {
                            const obj = {};
                            row.forEach((value, index) => {
                                obj[data[0][index]] = value instanceof Date ? value.toISOString() : value;
                            });
                            return obj;
                        });

                        const headers = Object.keys(result[0]).map(item => item.toLowerCase());

                        resolve({ headers, data });
                    })
                })
            }
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}
