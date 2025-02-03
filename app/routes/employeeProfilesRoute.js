const express = require("express");
const employeeProfilesController = require("../controllers/employeeProfilesController.js");
const payloadValidationMiddleware = require("../middlewares/payloadValidationMiddleware.js");

const router = express.Router();
const controller = employeeProfilesController();

// i think the mismatched http method error should appear first that the payload validation.
// so, i set it at router-level middleware 
router.get("/all", payloadValidationMiddleware, controller.getAll);
router.get("/view", payloadValidationMiddleware, controller.getOne);
router.get("/get-qr/:name", payloadValidationMiddleware, controller.getQrCode);
router.get("/download-file", payloadValidationMiddleware, controller.downloadFile);
router.post("/create", payloadValidationMiddleware, controller.createProfile);

module.exports = router;