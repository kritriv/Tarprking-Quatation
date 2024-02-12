const { User } = require('../../models');
const { hashPassword } = require('../../modules/password');
const { generateAccessToken } = require('../../modules/jwt.service');
const { handleApiResponse } = require('../../modules/responseHandler');

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
module.exports = register;
