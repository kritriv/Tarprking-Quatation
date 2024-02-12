const { handleApiResponse } = require('../modules/responseHandler');
// const { ViewOurCompany, AddOurCompany, SingleOurCompany, DeleteOurCompany, UpdateOurCompany } = require('../services/OurCompanyService');
const { create, list, search, remove, update } = require('../services/Company');

const { idSchema } = require('../validators/Schemas');

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

// To Add a OurCompany to OurCompany list
const CreateItem = async (req, res) => {
    try {
        const OurCompany = await create(req.body);

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

// To Delete a Single OurCompany Details
const RemoveItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const OurCompany = await search(id);

        if (!OurCompany) {
            return handleApiResponse(res, 404, 'Company Info not found, deletion unsuccessful');
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

// To Update a Single OurCompany Details
const UpdateItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });

        const updateOurCompanyData = req.body;
        const OurCompany = await update(id, updateOurCompanyData);

        if (!OurCompany) {
            return handleApiResponse(res, 404, 'Company Info not found, update unsuccessful');
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

module.exports = {
    ListAll,
    CreateItem,
    ReadItem,
    RemoveItem,
    UpdateItem,
};
