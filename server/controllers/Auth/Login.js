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
        const AccessToken = await generateAccessToken(user._id, user.role);
        const formattedUser = { id: user._id, name: user.name, username: user.username, email: user.email, role: user.role, accessToken: AccessToken };
        return handleApiResponse(res, 200, 'Login successfully.', { data: formattedUser });
    } catch (error) {
        handleApiResponse(res, 500, 'Internal Server Error');
    }
};

module.exports = login;
