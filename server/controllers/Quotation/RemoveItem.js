const { handleApiResponse } = require('../../modules/responseHandler');
const { search, remove } = require('../../services/Quotation');
const { idSchema } = require('../../validators/Schemas');

// To Delete a Single Quote Details
const RemoveItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });

        const DeletedQuote = await search(id);

        if (!DeletedQuote) {
            return handleApiResponse(res, 404, `Quotation not found with id: ${id} ! Deletion unsuccessful`);
        }

        const DeletedQuoteRes = await remove(id);

        handleApiResponse(res, 200, 'Quote deleted successfully', {
            deleted: DeletedQuoteRes,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while deleting the Quote: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'Internal Server Error' });
    }
};

module.exports = RemoveItem;
