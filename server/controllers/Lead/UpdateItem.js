const { handleApiResponse } = require('../../modules/responseHandler');
const { update } = require('../../services/Lead');
const { idSchema } = require('../../validators/Schemas');

// To Update a Single Lead Details
const UpdateItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });

        const updateLeadData = req.body;
        const Lead = await update(id, updateLeadData);

        if (!Lead) {
            return handleApiResponse(res, 404, `Lead not found with id: ${id} ! Updation unsuccessful`);
        }

        handleApiResponse(res, 200, 'Lead updated successfully', {
            data: Lead,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Provide valid Id' : `An error occurred while updating the single Lead: ${error.message}`;
        if (errorMessage === 'Provide valid Id') {
            handleApiResponse(res, 400, errorMessage, { error: 'Internal Server Error' });
        } else {
            if (error.message.includes('E11000 duplicate key error')) {
                handleApiResponse(res, 500, 'Lead Username must be unique', { error: error.message });
            } else {
                handleApiResponse(res, 500, errorMessage, { error: error.message });
            }
        }
    }
};

module.exports = UpdateItem;
