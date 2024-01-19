const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const { verifyAccessToken } = require('../modules/jwt.service');
const dotenv = require('dotenv');
dotenv.config();

function authMiddleware(roles) {
    return async (request, response, next) => {
        try {
            const authHeader = request.headers.authorization;

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return response.status(401).json({
                    success: false,
                    message: 'Access token missing or invalid format.',
                });
            }
            const token = authHeader.split(' ')[1];

            try {
                const decoded = await verifyAccessToken(token);

                // Check user role and perform role-based access control
                const findUser = await User.findOne({ _id: decoded.userId }, { _id: 1, role: 1 }).lean();

                if (!findUser || !roles.includes(findUser.role)) {
                    return response.status(403).json({
                        success: false,
                        reason: `${findUser.role} is not allowed for this Path.`,
                        message: 'Access Denied!',
                    });
                }

                request.user = findUser;
                next();
            } catch (error) {
                if (error.message === 'Token expired') {
                    return response.status(401).json({
                        success: false,
                        message: 'Token expired.',
                    });
                } else if (error.message === 'Invalid token') {
                    return response.status(401).json({
                        success: false,
                        message: 'Invalid token.',
                    });
                } else {
                    console.error('Error verifying access token:', error);
                    return response.status(500).json({
                        success: false,
                        message: 'Internal Server Error.',
                        error: error.message,
                    });
                }
            }
        } catch (error) {
            return response.status(500).json({
                success: false,
                message: 'Internal Server Error.',
                error: error.message,
            });
        }
    };
}

module.exports = { authMiddleware };
