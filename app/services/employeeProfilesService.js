const fs = require("fs");
const { saveFile, createFilename } = require("../helpers/fmmHelpers.js");
const baseService = require("../frameworks/baseService.js");
const employeeProfilesRepo = require("../repos/employeeProfilesRepo.js");

const repo = employeeProfilesRepo();

async function createQrCode(id, email) {
    const folder = "qrs";
    const filename = createFilename("qr", `${email}|${id}`, "png");
    const callFetch = async function() {
        const encodeUri = encodeURIComponent(`http://vcard.fajarmasmurni.com:3090/view?id=${id}`);
        const createQr = await fetch(`https://api.qrserver.com/v1/create-qr-code?data=${encodeUri}`, {
            headers: {
                'Content-Type': 'application/octet-stream',
            },
            responseType: "arraybuffer"
        });

        const data = await createQr.arrayBuffer();

        return data;
    }
    const response = await saveFile(folder, filename, callFetch);

    return response;
}

async function createVcf(body) {
    const folder = "./uploads/vcfs";
    let filename = createFilename("vcf", `${body.email}|${body.id}`, "vcf");

    try {
        const vcf = await fs.createWriteStream(`${folder}/${filename}`, { flags: "a" });

        vcf.write("BEGIN:VCARD\r\n");
        vcf.write("VERSION:3.0\r\n");
        vcf.write(`FN:${body.fullName}\r\n`);
        vcf.write(`TITLE:${body.jobTitle}\r\n`);
        vcf.write(`EMAIL;TYPE=work:${body.email}\r\n`);
        vcf.write(`TEL;TYPE=cell:${body.phoneNbr}\r\n`);
        vcf.write(`TEL;TYPE=work:${body.workPhoneNbr}\r\n`);
        vcf.write(`ORG:${body.company}\r\n`);
        vcf.write(`ADR:;;${body.address};;;;\r\n`);
        vcf.write("END:VCARD");
    } catch (error) {
        filename = null;
    }

    return filename;
}

async function createProfile(body) {
    let response = null;
    const profile = await repo.add(body);
    const profileId = profile.id;
    const qrFilename = await createQrCode(profileId, body.email);
    const vcfFilename = await createVcf(profile);

    if (qrFilename && vcfFilename) {
        response = await repo.updateById(profileId, { qrFilename, vcfFilename });
    }

    return response;
}

function employeeProfilesService() {
    const service = baseService(repo);

    return Object.assign({ createProfile, createQrCode }, service);
}

module.exports = employeeProfilesService;