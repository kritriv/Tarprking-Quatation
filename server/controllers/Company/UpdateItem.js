const { handleApiResponse } = require('../../modules/responseHandler');
const { update } = require('../../services/Company');
const { idSchema } = require('../../validators/Schemas');
// To Update a Single OurCompany Details
const UpdateItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });

        const updateOurCompanyData = req.body;
        const OurCompany = await update(id, updateOurCompanyData);

        if (!OurCompany) {
            return handleApiResponse(res, 404, `Company info not found with id: ${id} ! Updation unsuccessful`);
        }
        const formattedOurCompany = {
            id: OurCompany._id,
            status: OurCompany.status,
            name: OurCompany.name,
            emails: OurCompany.emails,
            websites: OurCompany.websites,
            phones: OurCompany.phones,
            cin_no: OurCompany.cin_no,
            tan_no: OurCompany.tan_no,
            pan_no: OurCompany.pan_no,
            gst_no: OurCompany.gst_no,
            address: OurCompany.address,
            bank_details: OurCompany.bank_details,
        };
        handleApiResponse(res, 200, 'Company Info updated successfully', {
            data: formattedOurCompany,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Provide valid Id' : `An error occurred while updating the Company Info: ${error.message}`;
        if (errorMessage === 'Provide valid Id') {
            handleApiResponse(res, 400, errorMessage, { error: 'Internal Server Error' });
        } else {
            if (error.message.includes('E11000 duplicate key error')) {
                handleApiResponse(res, 500, 'Company must be unique', { error: error.message });
            } else {
                handleApiResponse(res, 500, errorMessage, { error: 'Internal Server Error' });
            }
        }
    }
};

module.exports = UpdateItem;
