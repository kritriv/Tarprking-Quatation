const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const JWT_Algo = process.env.JWT_Algo;

async function generateAccessToken(userId, role) {
    try {
        const secretCode = process.env.JWT_SECRET_TOKEN;
        const expirationTime = process.env.Access_Token_Expire;
        const payload = {
            userId,
            role,
        };
        return jwt.sign(payload, secretCode, { expiresIn: expirationTime, algorithm: JWT_Algo });
    } catch (error) {
        console.error('Error generating access token:', error);
        throw new Error('Failed to generate access token');
    }
}

async function verifyAccessToken(token) {
    try {
        const secretCode = process.env.JWT_SECRET_TOKEN;
        const decoded = await jwt.verify(token, secretCode, { algorithm: [JWT_Algo] });
        return decoded;
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            throw new Error('Token expired');
        } else if (err instanceof jwt.JsonWebTokenError) {
            throw new Error('Invalid token');
        } else {
            throw new Error('Failed to verify access token');
        }
    }
}

module.exports = { generateAccessToken, verifyAccessToken };
