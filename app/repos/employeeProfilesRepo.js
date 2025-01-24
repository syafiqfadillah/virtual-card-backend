import { PrismaClient } from "@prisma/client";
import baseRepo from "../frameworks/baseRepo.js";

const prisma = new PrismaClient();
const model = prisma.employeeProfiles;


function employeeProfilesRepo() {
    const repo = baseRepo(model);

    return Object.assign({ }, repo);
}

export default employeeProfilesRepo;