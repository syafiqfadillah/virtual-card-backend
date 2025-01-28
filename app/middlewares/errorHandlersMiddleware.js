function basicHandlerMiddleware(err, _req, res, _next) {
    const response = err.response || {};
    const statusCode = response.status || err.status || 500;
    const message = response.statusText || err.message || 'Internal Server Error';
    const bodyRes = {
        status: "error",
        message,
        status_code: statusCode
    };

    res.status(statusCode).json(bodyRes);
}

module.exports = basicHandlerMiddleware;
