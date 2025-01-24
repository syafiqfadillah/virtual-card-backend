import cors from "cors";

function corsHandlerMiddleware() {
    const originSetup = {
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200
    };
    const callCors = cors(originSetup);

    return callCors;
}

export default corsHandlerMiddleware;