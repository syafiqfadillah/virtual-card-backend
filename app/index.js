import express from "express";
import bodyParser from "body-parser";
import basicHandlerMiddleware from "./middlewares/errorHandlersMiddleware.js";
import loggingMiddleware from "./middlewares/loggingMiddleware.js";
import corsHandlerMiddleware from "./middlewares/corsHandlersMiddleware.js";
import employeeProfilesRoutes from "./routes/employeeProfilesRoute.js";

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

export default app;