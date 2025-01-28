const { PrismaClient } = require("@prisma/client");
const baseRepo = require("../frameworks/baseRepo.js");

const prisma = new PrismaClient();
const model = prisma.employeeProfiles;

function employeeProfilesRepo() {
    const repo = baseRepo(model);

    return Object.assign({ }, repo);
}

module.exports = employeeProfilesRepo;