const { handleApiResponse } = require('../../modules/responseHandler');
const { search, remove } = require('../../services/User');
const { idSchema } = require('../../validators/Schemas');
// To Delete a Single User Details
const RemoveItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const DeletedUser = await search(id);

        if (!DeletedUser) {
            return handleApiResponse(res, 404, `User not found with id: ${id} ! Deletion unsuccessful`);
        }
        const formattedDeletedUser = {
            name: DeletedUser.name,
            username: DeletedUser.username,
            email: DeletedUser.email,
        };

        const DeletedUserStatus = await remove(id);

        handleApiResponse(res, 200, 'User deleted successfully', {
            details: DeletedUserStatus,
            deleted: formattedDeletedUser,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while deleting the single User: ${error.message}`;
        console.log(errorMessage);
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'Internal Server Error' });
    }
};

module.exports = RemoveItem;
