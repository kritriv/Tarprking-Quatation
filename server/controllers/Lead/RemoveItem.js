const { handleApiResponse } = require('../../modules/responseHandler');
const { search, remove } = require('../../services/Lead');
const { idSchema } = require('../../validators/Schemas');

// To Delete a Single Lead Details
const RemoveItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const Lead = await search(id);

        if (!Lead) {
            return handleApiResponse(res, 404, `Lead not found with id: ${id} ! Deletion unsuccessful`);
        }
        const LeadRes = await remove(id);

        const formattedLead = {
            id: LeadRes._id,
            username: LeadRes.username,
            createdby: LeadRes.createdby.username,
            name: LeadRes.name,
            email: LeadRes.email,
            phone: LeadRes.phone,
            company: LeadRes.company,
            gst: LeadRes.gst,
        };

        handleApiResponse(res, 200, 'Lead deleted successfully', {
            deleted: formattedLead,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while deleting the single Lead: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'Internal Server Error' });
    }
};

module.exports = RemoveItem;
