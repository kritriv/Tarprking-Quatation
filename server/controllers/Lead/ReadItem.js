const { handleApiResponse } = require('../../modules/responseHandler');
const { search } = require('../../services/Lead');
const { idSchema } = require('../../validators/Schemas');

// To get Single Lead Details
const ReadItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const Lead = await search(id);

        if (!Lead) {
            return handleApiResponse(res, 404, `Lead not found with id: ${id}`);
        }

        handleApiResponse(res, 200, 'Lead details fetched successfully', {
            data: Lead,
            nbHits: 1,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while fetching the single Lead: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'Internal Server Error' });
    }
};

module.exports = ReadItem;
