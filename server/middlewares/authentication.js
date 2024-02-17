const { User } = require('../models');
const { verifyAccessToken } = require('../modules/jwt.service');
const { blacklistedTokens } = require('../utils/AccessTokenCheck');
const { handleApiResponse } = require('../modules/responseHandler');
const dotenv = require('dotenv');
dotenv.config();

function authMiddleware(roles) {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return handleApiResponse(res, 401, 'Access denied : you are not granted permission');
            }
            const token = authHeader.split(' ')[1]; 

            // Check if the token is blacklisted
            if (blacklistedTokens.has(token)) {
                return handleApiResponse(res, 401, 'You already Logout!  Please log in again.');
            }

            try {
                const decoded = await verifyAccessToken(token);
                // Check user role and perform role-based access control
                const findUser = await User.findOne({ _id: decoded.userId }, { _id: 1, role: 1 }).lean();
                if (!findUser || !roles.includes(findUser.role)) {
                    return handleApiResponse(res, 403, `Access Denied! ${findUser.role} is not allowed.`);
                }

                req.user = findUser;
                next();
            } catch (error) {
                if (error.message === 'Token expired') {
                    return handleApiResponse(res, 401, 'Token expired.');
                } else if (error.message === 'Invalid token') {
                    return handleApiResponse(res, 401, 'Invalid token.');
                } else {
                    return handleApiResponse(res, 500, 'Error verifying access token');
                }
            }
        } catch (error) {
            return handleApiResponse(res, 500, 'Internal Server Error.', { error: error.message });
        }
    };
}

module.exports = { authMiddleware };
