const { handleApiResponse } = require('../../modules/responseHandler');
const { search } = require('../../services/Quotation');
const { idSchema } = require('../../validators/Schemas');

// To get Single Quote Details
const ReadItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const Quote = await search(id);

        if (!Quote) {
            return handleApiResponse(res, 404, `Quotation not found with id: ${id}`);
        }

        handleApiResponse(res, 200, 'Quote  details fetched successfully', {
            data: Quote,
            nbHits: 1,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while fetching the Quote: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'An error occurred while fetching the Quote' });
    }
};

module.exports = ReadItem;
