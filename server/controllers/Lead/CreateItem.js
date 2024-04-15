const { handleApiResponse } = require('../../modules/responseHandler');
const { create } = require('../../services/Lead');
// To Add a Lead to Leads list
const CreateItem = async (req, res) => {
    const data = req.body;
    try {
        const Lead = await create(data);

        handleApiResponse(res, 201, 'Lead added successfully', {
            data: Lead,
        });
    } catch (error) {
        const duplicateFieldMatches = error.message.match(/[a-zA-Z_]+(?= already exists)/g);
        if (duplicateFieldMatches && duplicateFieldMatches.length > 0) {
            const duplicateFields = duplicateFieldMatches.map((field) => field.replace('Lead_', ''));
            const errorMessage = `Lead with ${duplicateFields.join(', ')} is already exist.`;
            handleApiResponse(res, 400, errorMessage, { error: 'An error occurred while adding the Lead' });
        } else {
            handleApiResponse(res, error.status || 500, error.message || 'Internal server error');
        }
    }
};

module.exports = CreateItem;
