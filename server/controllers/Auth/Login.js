const { User } = require('../../models');
const { comparePassword } = require('../../modules/password');
const { generateAccessToken } = require('../../modules/jwt.service');
const { handleApiResponse } = require('../../modules/responseHandler');

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
        return handleApiResponse(res, 200, 'Login successfully.', { id: user._id, username: user.username, email: user.email, role: user.role, accessToken: accessToken });
    } catch (error) {
        handleApiResponse(res, 500, 'Internal Server Error');
    }
};

module.exports = login;
