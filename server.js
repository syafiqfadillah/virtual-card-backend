const dotenv = require("dotenv");
const app = require("./app/index.js");
const generalLogger = require("./app/configs/loggerConfig.js");

dotenv.config();

const port = process.env.PORT;
const logger = generalLogger();

try {
    app.listen(port, () => {
        const message = `The Server listen to port : ${port}`;
        
        logger.info(message);
        console.log(message);
    })
} catch (exception) {
    logger.error(exception);
}