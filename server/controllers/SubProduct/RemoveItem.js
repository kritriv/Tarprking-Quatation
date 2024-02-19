const { handleApiResponse } = require('../../modules/responseHandler');
const { search, remove } = require('../../services/SubProduct');
const { idSchema } = require('../../validators/Schemas');

// To Delete a Single SubProduct Details
const RemoveItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const SubProduct = await search(id);

        if (!SubProduct) {
            return handleApiResponse(res, 404, `Sub Product not found with id: ${id} ! Deletion unsuccessful`);
        }

        const SubProductRes = await remove(id);

        const formattedSubProduct = {
            id: SubProductRes._id,
            status: SubProductRes.status,
            model: SubProductRes.model_no,
            hsn: SubProductRes.hsn,
            name: SubProductRes.name,
            description: SubProductRes.description,
        };

        handleApiResponse(res, 200, 'Sub Product deleted successfully', {
            deleted: formattedSubProduct,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while deleting the Category: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'Internal Server Error' });
    }
};
module.exports = RemoveItem;
