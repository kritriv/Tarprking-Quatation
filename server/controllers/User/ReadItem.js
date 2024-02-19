const { handleApiResponse } = require('../../modules/responseHandler');
const { search } = require('../../services/User');
const { idSchema } = require('../../validators/Schemas');

// To get Single User Details
const ReadItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const User = await search(id);

        if (!User) {
            return handleApiResponse(res, 400, `User not found with id: ${id}`);
        }
        const formattedUser = {
            id: User._id,
            name: User.name,
            username: User.username,
            email: User.email,
            password: User.password,
            role: User.role,
        };

        handleApiResponse(res, 200, 'User details fetched successfully', {
            data: formattedUser,
            nbHits: 1,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while fetching the single User: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'Internal Server Error' });
    }
};
module.exports = ReadItem;
