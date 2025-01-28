const cors = require("cors");

function corsHandlerMiddleware() {
    const originSetup = {
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200
    };
    const callCors = cors(originSetup);

    return callCors;
}

module.exports = corsHandlerMiddleware;