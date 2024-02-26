const { handleApiResponse } = require('../../modules/responseHandler');
const { create } = require('../../services/Company');

// To Add a OurCompany to OurCompany list
const CreateItem = async (req, res) => {
    try {
        const OurCompany = await create(req.body);

        const formattedOurCompany = {
            id: OurCompany._id,
            status: OurCompany.status,
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

        handleApiResponse(res, 201, 'Company Info added successfully', {
            data: formattedOurCompany,
        });
    } catch (error) {
        const duplicateFieldMatches = error.message.match(/[a-zA-Z_]+(?= already exists)/g);
        if (duplicateFieldMatches && duplicateFieldMatches.length > 0) {
            const duplicateFields = duplicateFieldMatches.map((field) => field.replace('company', ''));
            const errorMessage = `Company with ${duplicateFields.join(', ')} already exists.`;
            handleApiResponse(res, 400, errorMessage, { error: error.message });
        } else {
            handleApiResponse(res, 500, 'An error occurred while adding the Company Info', { error: error.message });
        }
    }
};

module.exports = CreateItem;
