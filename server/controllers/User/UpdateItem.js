const { handleApiResponse } = require('../../modules/responseHandler');
const { update } = require('../../services/User');
const { idSchema } = require('../../validators/Schemas');
// To Update a Single User Details
const UpdateItem = async (req, res) => {
    try {
        const id = req.params.id;
        const updateUserData = req.body;
        await idSchema.parseAsync({ _id: id });
        const updatedUser = await update(id, updateUserData);

        if (!updatedUser) {
            return handleApiResponse(res, 400, 'User not found, update unsuccessful');
        }
        const formattedUpdatedUser = {
            id: updatedUser._id,
            name: updatedUser.name,
            username: updatedUser.username,
            email: updatedUser.email,
            password: updatedUser.password,
            role: updatedUser.role,
        };
        handleApiResponse(res, 200, 'User updated successfully', {
            data: formattedUpdatedUser,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Provide valid Id' : `An error occurred while updating the single User: ${error.message}`;
        if (errorMessage === 'Provide valid Id') {
            handleApiResponse(res, 400, errorMessage, { error: error.issues[0].message });
        } else {
            if (error.message.includes('E11000 duplicate key error')) {
                handleApiResponse(res, 500, 'Username & Email must be unique', { error: error.message });
            } else {
                handleApiResponse(res, 500, errorMessage, { error: error.message });
            }
        }
    }
};

module.exports = UpdateItem;
