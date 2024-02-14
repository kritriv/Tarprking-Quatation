const { handleApiResponse } = require('../../modules/responseHandler');
const { create } = require('../../services/Quotation2');

// To Add a Quote to Quotes list
const CreateItem = async (req, res) => {
    try {
        const Quote = await create(req.body);

        handleApiResponse(res, 201, 'Quote added successfully', {
            data: Quote,
        });
    } catch (error) {
        const duplicateFieldMatches = error.message.match(/[a-zA-Z_]+(?= already exists)/g);
        if (duplicateFieldMatches && duplicateFieldMatches.length > 0) {
            const duplicateFields = duplicateFieldMatches.map((field) => field.replace('quote_', ''));
            const errorMessage = `Quote with ${duplicateFields.join(', ')} is already exists.`;
            handleApiResponse(res, 400, errorMessage, error);
        } else if (error.message.includes('Client not found')) {
            handleApiResponse(res, 404, 'Client not found', { error: error.message });
        } else if (error.message.includes('User not found')) {
            handleApiResponse(res, 404, 'User not found', { error: error.message });
        } else if (error.message.includes('Product not found')) {
            handleApiResponse(res, 404, 'Product not found', { error: error.message });
        } else {
            handleApiResponse(res, error.status || 500, error.message || 'Internal server error');
        }
    }
};

module.exports = CreateItem;
