const fs = require("fs");
const baseService = require("../frameworks/baseService.js");
const employeeProfilesRepo = require("../repos/employeeProfilesRepo.js");

const repo = employeeProfilesRepo();

async function createQrCode(id) {
    const getProfile = await repo.findById(id);
    const encode = btoa(`${getProfile.email}|${id}`);
    const filename = `qr-${encode}.png`;
    const path = `./uploads/${filename}`;

    if (!fs.existsSync(path)) {
        try {
            const createQr = await fetch(`https://api.qrserver.com/v1/create-qr-code?data=${encodeURIComponent(`http://172.16.250.46:3090/view?id=${id}`)}`, {
                headers: {
                    'Content-Type': 'application/octet-stream',
                },
                responseType: "arraybuffer"
            });
            const data = await createQr.arrayBuffer();

            await fs.promises.appendFile(path, Buffer.from(data));
        } catch (error) {
            return null;
        }
    } 

    return filename;
}

async function createProfile(body) {
    let response = null;
    const profile = await repo.add(body);
    const profileId = profile.id;
    const qrFilename = await createQrCode(profileId);

    if (qrFilename) {
        response = await repo.updateById(profileId, { qrFilename });
    }

    return response;
}

function employeeProfilesService() {
    const service = baseService(repo);

    return Object.assign({ createProfile }, service);
}

module.exports = employeeProfilesService;