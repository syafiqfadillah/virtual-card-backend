const fs = require("fs");

function formatDate(date, separator = '') {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join(separator);
}

function saveFile(filename, binary) {
    const path = `../../uploads/${filename}`;

    if (!fs.existsSync(path)) {
        const saveFile = fs.writeFileSync(path, binary, "binary");

        return saveFile;
    }
}

module.exports = { formatDate, saveFile }