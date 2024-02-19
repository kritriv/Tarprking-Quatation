const { handleApiResponse } = require('../../modules/responseHandler');
const { search, remove } = require('../../services/Company');
const { idSchema } = require('../../validators/Schemas');
// To Delete a Single OurCompany Details
const RemoveItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const OurCompany = await search(id);

        if (!OurCompany) {
            return handleApiResponse(res, 404, `Company info not found with id: ${id} ! Deletion unsuccessful`);
        }

        const OurCompanyRes = await remove(id);

        const formattedOurCompany = {
            id: OurCompanyRes._id,
            name: OurCompanyRes.name,
        };
        handleApiResponse(res, 200, 'Company Info deleted successfully', {
            deleted: formattedOurCompany,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while deleting the Category: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'Internal Server Error' });
    }
};


module.exports = 
    RemoveItem;
