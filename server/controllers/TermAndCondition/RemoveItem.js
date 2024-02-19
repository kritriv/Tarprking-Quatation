const { handleApiResponse } = require('../../modules/responseHandler');
const { search, remove } = require('../../services/TermAndCondition');
const { idSchema } = require('../../validators/Schemas');

// To Delete a Single TermAndCondition Details
const RemoveItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const TermAndCondition = await search(id);

        if (!TermAndCondition) {
            return handleApiResponse(res, 404, `Term & Condition not found with id: ${id} ! Deletion unsuccessful`);
        }

        const TermAndConditionRes = await remove(id);

        const formattedTermAndCondition = {
            id: TermAndConditionRes._id,
            sub_product: TermAndConditionRes.sub_product ? TermAndConditionRes.sub_product.name : null,
        };

        handleApiResponse(res, 200, 'Term And Condition deleted successfully', {
            deleted: formattedTermAndCondition,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while deleting the Term And Condition: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'Internal Server Error' });
    }
};

module.exports = RemoveItem;
