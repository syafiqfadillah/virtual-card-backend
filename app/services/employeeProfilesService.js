import baseService from "../frameworks/baseService.js";
import employeeProfilesRepo from "../repos/employeeProfilesRepo.js";

const repo = employeeProfilesRepo();

function employeeProfilesService() {
    const service = baseService(repo);

    return Object.assign({ }, service);
}

export default employeeProfilesService;