const { handleApiResponse } = require('../../modules/responseHandler');
const { search, remove } = require('../../services/Product');
const { idSchema } = require('../../validators/Schemas');
// To Delete a Single Product Details
const RemoveItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });

        const DeletedProduct = await search(id);

        if (!DeletedProduct) {
            return handleApiResponse(res, 404, `Product not found with id: ${id} ! Deletion unsuccessful`);
        }

        const DeletedProductRes = await remove(id);

        const formattedProduct = {
            id: DeletedProductRes._id,
            name: DeletedProductRes.name,
            description: DeletedProductRes.description,
        };
        handleApiResponse(res, 200, 'Product deleted successfully', {
            deleted: formattedProduct,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while deleting the Product: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'Internal Server Error' });
    }
};

module.exports = RemoveItem;
