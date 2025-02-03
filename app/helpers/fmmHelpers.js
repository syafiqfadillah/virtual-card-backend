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

function createFilename(prefix, unique, ext) {
    const encode = btoa(unique);
    const filename = `${prefix}-${encode}.${ext}`;

    return filename;
}

async function saveFile(folder, filename, bufferCallback) {
    const path = `./uploads/${folder}/${filename}`;

    if (!fs.existsSync(path)) {
        try {
            const buffer = await bufferCallback();

            await fs.promises.appendFile(path, Buffer.from(buffer));
        } catch (error) {
            return null;
        }
    } 

    return filename;
}

module.exports = { formatDate, createFilename, saveFile };