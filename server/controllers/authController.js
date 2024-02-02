const User = require('../models/UserModel');
const { hashPassword, comparePassword } = require('../modules/password');
const { revokeAccessToken, blacklistedTokens } = require('../utils/AccessTokenCheck');
const { generateAccessToken } = require('../modules/jwt.service');
const { handleApiResponse } = require('../modules/responseHandler');

const register = async (req, res) => {
    try {
        const { username, email, role, password } = req.body;

        // check user already exist..
        const usernameCheck = await User.findOne({ username }).lean();
        if (usernameCheck) {
            return handleApiResponse(res, 409, 'Username already exist.');
        }
        const user = await User.findOne({ email }).lean();
        if (user) {
            return handleApiResponse(res, 409, 'Email already exist.');
        }

        //hash password ...
        const hashedPassword = await hashPassword(password);

        const newUser = new User({
            username,
            email,
            role,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        const formattedUser = {
            id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            password: savedUser.password,
            role: savedUser.role,
        };

        //generate access token..
        const accessToken = await generateAccessToken(savedUser._id, savedUser.role);

        handleApiResponse(res, 201, 'Successfully registered.', { accessToken: accessToken, data: formattedUser });
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

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return handleApiResponse(res, 401, 'Access token missing or invalid format.');
        }
        const token = authHeader.split(' ')[1];

        // Check if the token is blacklisted
        if (blacklistedTokens.has(token)) {
            return handleApiResponse(res, 401, 'You already Logout!  Please log in again.');
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
        handleApiResponse(res, 200, 'Logout success!');
    } catch (error) {
        console.error(error);
        handleApiResponse(res, 500, 'Internal Server Error');
    }
};

module.exports = { login, register, logout };
