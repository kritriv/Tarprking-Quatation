const { User } = require('../models');
const { hashPassword, comparePassword } = require('../modules/password');
const { revokeAccessToken, blacklistedTokens } = require('../utils/AccessTokenCheck');
const { generateAccessToken } = require('../modules/jwt.service');
const { handleApiResponse } = require('../modules/responseHandler');

const register = async (req, res) => {
    try {
        const { username, email, role, password } = req.body;

        const existingUser = await User.findOne({ $or: [{ username }, { email }] }).lean();
        if (existingUser) {
            return handleApiResponse(res, 409, 'Username or email already exists.');
        }

        const hashedPassword = await hashPassword(password);
        const newUser = new User({ username, email, role, password: hashedPassword });

        const savedUser = await newUser.save();
        const accessToken = await generateAccessToken(savedUser._id, savedUser.role);

        const formattedUser = { id: savedUser._id, username, email, role };

        handleApiResponse(res, 201, 'Successfully registered.', { accessToken, data: formattedUser });
    } catch (error) {
        handleApiResponse(res, 500, 'Internal Server Error');
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //check user exist
        const user = await User.findOne({ email }).lean();

        if (!user) {
            return handleApiResponse(res, 404, 'User not found.');
        }
        // check user password..
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return handleApiResponse(res, 401, 'Invalid credentials.');
        }
        //generate access token..
        const accessToken = await generateAccessToken(user._id, user.role);
        return handleApiResponse(res, 200, 'Login successfully.', { id: user._id, role: user.role, accessToken: accessToken });
    } catch (error) {
        handleApiResponse(res, 500, 'Internal Server Error');
    }
};

const logout = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        // Validate and extract token
        const token = authHeader?.split(' ')[1];
        console.log(token);
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
        console.error(error);
        handleApiResponse(res, 500, 'Internal Server Error');
    }
};

module.exports = { login, register, logout };
