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
    const fullPath = `${folder}/${filename}`;

    try {
        const vcf = await fs.createWriteStream(fullPath, { flags: "w" });

        vcf.write("BEGIN:VCARD\r\n");
        vcf.write("VERSION:3.0\r\n");
        vcf.write(`FN:${body.fullName}\r\n`);
        vcf.write(`TITLE:${body.jobTitle}\r\n`);
        vcf.write(`EMAIL;TYPE=work:${body.email}\r\n`);
        vcf.write(`TEL;TYPE=cell:${body.phoneNbr}\r\n`);
        vcf.write(`TEL;TYPE=work:${body.workPhoneNbr}\r\n`);
        vcf.write(`TEL;TYPE=fax:${body.faxNbr}\r\n`);
        vcf.write(`ORG:${body.company}\r\n`);
        vcf.write(`ADR:;;${body.address};;;;\r\n`);
        vcf.write("END:VCARD");
    } catch (error) {
        filename = null;
    }

    return filename;
}

async function createFiles(profile) {
    const qrFilename = await createQrCode(profile.id, profile.email);
    const vcfFilename = await createVcf(profile);
    const data = qrFilename && vcfFilename ? { qrFilename, vcfFilename } : {};

    return data;
}

async function updateBodyFiles(profile) {
    const files = await createFiles(profile);
    let response = null;

    if (files) {
        response = await repo.updateById(profile.id, files);
    }

    return response;
}

async function createProfile(rawBody) {
    const profile = await repo.add(rawBody);
    const response = await updateBodyFiles(profile);

    return response;
}

async function updateProfile(id, rawBody) {
    const profile = await repo.updateById(id, rawBody);
    const response = await updateBodyFiles(profile);

    return response;
}

function employeeProfilesService() {
    const service = baseService(repo);

    return Object.assign({ createProfile, updateProfile, createQrCode }, service);
}

module.exports = employeeProfilesService;