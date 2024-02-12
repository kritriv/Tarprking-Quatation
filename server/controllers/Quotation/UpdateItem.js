const { handleApiResponse } = require('../../modules/responseHandler');
const { update } = require('../../services/Quotation');
const { idSchema } = require('../../validators/Schemas');

// To Update a Single Quote Details
const UpdateItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });

        const updatedQuote = await update(id, req.body);

        if (!updatedQuote) {
            return res.status(404).json({ message: 'Quote not found, update unsuccessful' });
        }

        handleApiResponse(res, 200, 'Quote updated successfully', {
            data: updatedQuote,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Provide valid Id' : `An error occurred while updating the single Quote: ${error.message}`;
        if (errorMessage === 'Provide valid Id') {
            handleApiResponse(res, 400, errorMessage, { error: 'Internal Server Error' });
        } else {
            if (error.message.includes('E11000 duplicate key error')) {
                handleApiResponse(res, 500, 'Quote Name must be unique', { error: error.message });
            } else if (error.message.includes('Client not found')) {
                handleApiResponse(res, 404, 'Client not found', { error: error.message });
            } else if (error.message.includes('Created by User not found')) {
                handleApiResponse(res, 404, 'Created by User not found', { error: error.message });
            } else if (error.message.includes('Product not found')) {
                handleApiResponse(res, 404, 'Product not found', { error: error.message });
            } else {
                handleApiResponse(res, 500, errorMessage, { error: 'Internal Server Error' });
            }
        }
    }
};

module.exports = UpdateItem;
