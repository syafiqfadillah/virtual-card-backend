import { createLogger, transports, format } from "winston";
import { formatDate } from "../helpers/fmmHelpers.js";

const currentDate = formatDate(new Date(), "");
const pathLogs = "./app/logs";

function generalLogger() {
    return createLogger({
        transports: [
            new transports.File({
                filename: `${pathLogs}/general/log${currentDate}.log`
            })
        ],
        format: format.combine(
            format.json(),
            format.timestamp(),
            format.prettyPrint()
        ),
        statusLevels: true
    });
}

export default generalLogger;