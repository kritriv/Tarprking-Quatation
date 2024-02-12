const { revokeAccessToken, blacklistedTokens } = require('../../utils/AccessTokenCheck');
const { handleApiResponse } = require('../../modules/responseHandler');

const logout = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        // Validate and extract token
        const token = authHeader?.split(' ')[1];
        if (!token) {
            return handleApiResponse(res, 401, 'Invalid or missing access token.');
        }

        // Check if the token is blacklisted
        if (blacklistedTokens.has(token)) {
            return handleApiResponse(res, 401, 'You are already logged out.');
        }

        if (token) {
            await revokeAccessToken(token);
            res.clearCookie('accessToken');
        }

        if (typeof window !== 'undefined') {
            if (localStorage) {
                localStorage.removeItem('user');
            }
            if (sessionStorage) {
                sessionStorage.removeItem('user');
            }
        }
        handleApiResponse(res, 200, 'Logout successful.');
    } catch (error) {
        handleApiResponse(res, 500, 'Internal Server Error');
    }
};

module.exports = logout;
