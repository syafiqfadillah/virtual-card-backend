import express from "express";
import employeeProfilesController from "../controllers/employeeProfilesController.js";
import payloadValidationMiddleware from "../middlewares/payloadValidationMiddleware.js";

const router = express.Router();
const controller = employeeProfilesController();

// i think the mismatched http method error should appear first that the payload validation.
// so, i set it at router-level middleware 
router.get("/all", payloadValidationMiddleware, controller.getAll);
router.get("/view", payloadValidationMiddleware, controller.getOne);
router.post("/create", payloadValidationMiddleware, controller.create);

export default router;