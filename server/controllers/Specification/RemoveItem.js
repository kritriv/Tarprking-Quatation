const { handleApiResponse } = require('../../modules/responseHandler');
const { search, remove } = require('../../services/Specification');
const { idSchema } = require('../../validators/Schemas');

// To Delete a Single Specification Details
const RemoveItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const Specification = await search(id);

        if (!Specification) {
            return handleApiResponse(res, 404, `Specification not found with id: ${id} ! Deletion unsuccessful`);
        }

        const SpecificationRes = await remove(id);

        const formattedSpecification = {
            id: SpecificationRes._id,
            sub_product: SpecificationRes.sub_product ? SpecificationRes.sub_product.name : null,
        };

        handleApiResponse(res, 200, 'Specification deleted successfully', {
            deleted: formattedSpecification,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while deleting the Category: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'Internal Server Error' });
    }
};

module.exports = RemoveItem;
