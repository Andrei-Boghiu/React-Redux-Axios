import Excel from 'exceljs';
import { saveAs } from 'file-saver';

const convertToCSV = (data) => {
    const csvRows = [];

    for (const row of data) {
        csvRows.push(row.map(value => `"${value}"`).join(','));
    }

    return csvRows.join('\n');
};

export const downloadCSV = (data, name = null) => {
    const csvData = new Blob([convertToCSV(data)], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');

    link.href = URL.createObjectURL(csvData);

    link.download = name ? `${name}.csv` : 'data.csv';

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
};

export const downloadArrOfObjectsCSV = (data, fileName = 'data.csv') => {
    const keys = Object.keys(data[0]);

    const csvHeader = keys.join(',');

    const csvRows = data.map(obj => {
        return keys.map(key => {
            // Escape double quotes with double quotes
            const value = String(obj[key]).replace(/"/g, '""');
            return `"${value}"`;
        }).join(',');
    });

    const csvData = [csvHeader, ...csvRows].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);

    link.download = fileName;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
};

export const exportArrOfArrToXLSX = (data, fileName = 'data.xlsx') => {
    if (fileName.endsWith(".xlsx")) {
        throw new Error("Invalid Parameter: fileName should end with '.xlsx' extension.")
    }

    // data param should be an array of arrays.

    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    data.forEach((row) => {
        worksheet.addRow(row);
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
        const fileData = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(fileData, fileName);
    });
};

export const exportArrOfObjToXLSX = (data, fileName = 'data.xlsx') => {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    const keys = Object.keys(data[0]);

    worksheet.addRow(keys);

    data.forEach((obj) => {
        const row = keys.map((key) => obj[key]);
        worksheet.addRow(row);
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
        const fileData = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(fileData, fileName);
    });
};