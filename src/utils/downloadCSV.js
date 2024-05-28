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