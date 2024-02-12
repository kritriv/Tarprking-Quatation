const { handleApiResponse } = require('../../modules/responseHandler');
const { list } = require('../../services/Company');

// To get All OurCompany list
const ListAll = async (req, res) => {
    try {
        const OurCompanies = await list(req.query);
        if (!OurCompanies || OurCompanies.length === 0) {
            return handleApiResponse(res, 404, 'Company Info not found');
        }

        const formattedOurCompany = OurCompanies.map((OurCompany) => ({
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
        }));

        handleApiResponse(res, 200, 'Company Info fetched successfully', {
            data: formattedOurCompany,
            nbHits: OurCompanies.length,
        });
    } catch (error) {
        handleApiResponse(res, 500, 'An error occurred while fetching the Company Info', { error: error.message });
    }
};

module.exports = ListAll;
