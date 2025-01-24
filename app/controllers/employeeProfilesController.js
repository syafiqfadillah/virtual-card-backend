import baseController from "../frameworks/baseController.js";
import employeeProfilesService from "../services/employeeProfilesService.js";

const service = employeeProfilesService();

function employeeProfilesController() {
    const controller = baseController(service);

    return Object.assign({ }, controller);
}

export default employeeProfilesController;