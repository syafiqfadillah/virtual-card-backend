const path = require('path');
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
        root: "./uploads/qrs",
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

function downloadFile(req, res, next) {
    const filename = req.query.name;
    const downloadType = req.query.type;
    const contentType = path.extname(filename) == ".png" ? "image/*" : "text/*";
    const options = {
        root: `./uploads/${downloadType}`,
        headers: {
            "Content-Disposition": `attachment; filename=${filename}`,
            "Content-Type": contentType
        }
    };

    try {
        res.sendFile(filename, options);
    } catch (error) {
        next(error);
    }
}

function employeeProfilesController() {
    const controller = baseController(service);

    return Object.assign({ createProfile, getQrCode, downloadFile }, controller);
}

module.exports = employeeProfilesController;