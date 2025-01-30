const baseController = require("../frameworks/baseController.js");
const employeeProfilesService = require("../services/employeeProfilesService.js");

const service = employeeProfilesService();

async function createProfile(req, res, next) {
    try {
        const newItem = await service.createProfile(req.body);
        res.status(201).json({
            success: true,
            data: newItem
        })
    } catch (error) {
        next(error);
    }
}

async function getQrCode(req, res, next) {
    const options = {
        root: "./uploads",
        dotfiles: "deny",
        headers: {
            "Cache-Control": "max=3600"
        }
    };
    const filename = req.params.name;

    try {
        res.sendFile(filename, options);
    } catch (error) {
        next(error);
    }
}

async function downloadQrCode(req, res, next) {
    const options = {
        root: "./uploads",
        headers: {
            "Content-Disposition": "attachment;",
            "Content-Type": "image/*"
        }
    };
    const filename = req.params.name;

    try {
        res.sendFile(filename, options);
    } catch (error) {
        next(error);
    }
}

function employeeProfilesController() {
    const controller = baseController(service);

    return Object.assign({ createProfile, getQrCode, downloadQrCode }, controller);
}

module.exports = employeeProfilesController;