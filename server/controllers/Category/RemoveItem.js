const { handleApiResponse } = require('../../modules/responseHandler');
const { search, remove } = require('../../services/Category');
const { idSchema } = require('../../validators/Schemas');

// To Delete a Single ProductCategory Details
const RemoveItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const DeletedCategory = await search(id);

        if (!DeletedCategory) {
            return handleApiResponse(res, 404, 'Category not found, deletion unsuccessful');
        }
        const DeletedCategoryRes = await remove(id);

        const formattedDeletedCategory = {
            id: DeletedCategoryRes._id,
            name: DeletedCategoryRes.name,
            description: DeletedCategoryRes.description,
        };

        handleApiResponse(res, 200, 'Category deleted successfully', {
            deleted: formattedDeletedCategory,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while deleting the Category: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'Internal Server Error' });
    }
};

module.exports = RemoveItem;
