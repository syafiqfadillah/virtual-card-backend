const express = require("express");
const bodyParser = require("body-parser");
const basicHandlerMiddleware = require("./middlewares/errorHandlersMiddleware");
const loggingMiddleware = require("./middlewares/loggingMiddleware.js");
const corsHandlerMiddleware = require("./middlewares/corsHandlersMiddleware.js");
const employeeProfilesRoutes = require("./routes/employeeProfilesRoute.js");

const app = express();

var parserConfig = bodyParser.urlencoded({ extended: true });

app.use(corsHandlerMiddleware())
app.use(loggingMiddleware());
app.use(parserConfig);
app.use(express.json());
// for payloadValidationMiddleware, it will appear first before 
// the express know the requested endpoint http method with the existing is mismatched,
// if the middleware implement in application-level, otherwise the mismatched error will appear first
app.use("/employee-profile", employeeProfilesRoutes);
app.use(basicHandlerMiddleware);

module.exports = app;