const { handleApiResponse } = require('../../modules/responseHandler');
const { search } = require('../../services/Company');
const { idSchema } = require('../../validators/Schemas');
// To get Single OurCompany Details
const ReadItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const OurCompany = await search(id);

        if (!OurCompany) {
            return handleApiResponse(res, 404, 'Company Info not found');
        }
        const formattedOurCompany = {
            id: OurCompany._id,
            name: OurCompany.name,
            websites: OurCompany.websites,
            phones: OurCompany.phones,
            cin_no: OurCompany.cin_no,
            tan_no: OurCompany.tan_no,
            pan_no: OurCompany.pan_no,
            gst_no: OurCompany.gst_no,
            address: OurCompany.address,
            bank_details: OurCompany.bank_details,
        };
        handleApiResponse(res, 200, 'Company Info fetched successfully', {
            data: formattedOurCompany,
            nbHits: 1,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while fetching the Company: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'An error occurred while fetching the Company' });
    }
};

module.exports = ReadItem;
