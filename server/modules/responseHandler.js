const handleApiResponse = (res, status, message, data = null, error = null) => {
    const response = {
        success: status < 400 ? 'true' : 'false',
        message,
        ...data,
    };

    return res.status(status).json(response);
};

module.exports = { handleApiResponse };

// const { ValidationError } = require('zod');

// class APIError extends Error {
//     constructor(code, message, details) {
//         super(message);
//         this.code = code;
//         this.details = details;
//         Error.captureStackTrace(this);
//     }

//     static badRequest(details) {
//         return new APIError(400, 'Bad request', details);
//     }

//     static unauthorized(details) {
//         return new APIError(401, 'Unauthorized', details);
//     }

//     static notFound(details) {
//         return new APIError(404, 'Not found', details);
//     }

//     static forbidden(details) {
//         return new APIError(403, 'Forbidden', details);
//     }

//     static conflict(details) {
//         return new APIError(409, 'Conflict', details);
//     }

//     static unprocessableEntity(details) {
//         return new APIError(422, 'Unprocessable Entity', details);
//     }

//     static badGateway(details) {
//         return new APIError(502, 'Bad gateway', details);
//     }

//     static requestLimitExceed(details) {
//         return new APIError(429, 'Too many requests', details);
//     }

//     static internalServerError(details) {
//         return new APIError(500, 'Internal server error', details);
//     }
// }

// function handleApiResponse(res, status, message, data, error) {
//     const success = status < 400;

//     const response = {
//         success,
//         message: success ? message : 'An error occurred',
//         ...(data ? { data } : {}),
//         error: error
//             ? {
//                   reason: error.message || 'Unknown error',
//                   details: error.details || null,
//               }
//             : null,
//     };

//     return res.status(status).json(response);
// }

// const routeErrorHandler = (req, res) => {
//     return handleApiResponse(res, 404, 'Not found', null, null);
// };

// const apiErrorHandler = (err, req, res) => {
//     if (err instanceof APIError) {
//         return handleApiResponse(res, err.code, err.message, null, err);
//     }

//     return handleApiResponse(res, 500, 'Internal server error', null, {
//         message: 'Internal server error',
//     });
// };

// const sendDataResponse = (data, res) => {
//     handleApiResponse(res, 200, 'Success', data, null);
// };

// module.exports = {
//     APIError,
//     routeErrorHandler,
//     apiErrorHandler,
//     sendDataResponse,
//     handleApiResponse,
// };
