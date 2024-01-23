const User = require('../models/UserModel');
const { hashPassword, comparePassword } = require('../modules/password');
const { checkRole } = require('../utils/CheckRole');
const { generateAccessToken } = require('../modules/jwt.service');

const register = async (req, res) => {
    try {
        const { username, email, role, password } = req.body;

        if (!username || !email || !password || !role) {
            return res.status(200).json({
                success: false,
                message: 'All fields are required.',
            });
        }
        // check user already exist..
        const usernameCheck = await User.findOne({ username }).lean();
        if (usernameCheck) {
            return res.status(409).json({
                success: false,
                message: 'Username already exist.',
            });
        }
        const user = await User.findOne({ email }).lean();
        if (user) {
            return res.status(409).json({
                success: false,
                message: 'Email already exist.',
            });
        }

        //check role...
        if (!checkRole(role)) {
            return res.status(201).json({
                success: false,
                message: 'Unkown role providing.',
            });
        }
        //hash password ...
        req.body.password = await hashPassword(password);
        console.log(hashPassword(password));

        const newUser = new User(req.body);
        const savedUser = await newUser.save();

        //generate access token..
        const accessToken = await generateAccessToken(savedUser._id, savedUser.role);

        return res.status(201).json({
            success: true,
            message: 'Successfully registered.',
            accessToken: accessToken,
            data: savedUser,
        });
    } catch (error) {
        console.log('error', error);
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal server error',
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(200).json({
                success: false,
                message: 'All fields are required.',
            });
        }
        //check user exist
        const user = await User.findOne({ email }).lean();

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }
        // check user password..
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials.',
            });
        }
        //generate access token..
        const accessToken = await generateAccessToken(user._id, user.role);
        return res.status(200).cookie('access_token', accessToken, { httpOnly: true }).json({
            success: true,
            userId: user._id,
            userRole: user.role,
            message: 'Login successfully.',
            accessToken: accessToken,
        });
        
    } catch (error) {
        console.log('error', error);
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal server error',
        });
    }
};

const signout = (req, res) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json({ message: 'Signout success!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { login, register, signout };
