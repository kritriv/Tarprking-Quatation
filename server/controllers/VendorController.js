const { handleApiResponse } = require('../modules/responseHandler');
const { ViewVendor, AddVendor, SingleVendor, DeleteVendor, UpdateVendor } = require('../services/VendorService');

const idSchema = require('../validators/Schemas/IdValidate');

// To get All Vendors List
const getAllVendors = async (req, res) => {
    try {
        const { id, vendor_status, vendor_username, vendor_name, email, contact_no, gender, company_name, company_GST_no, sort, select, page, limit } = req.query;

        const Vendor = await ViewVendor({
            id,
            vendor_status,
            vendor_username,
            vendor_name,
            email,
            contact_no,
            gender,
            company_name,
            company_GST_no,
            sort,
            select,
            page: Number(page) || 1,
            limit: Number(limit) || 5,
        });

        if (!Vendor || Vendor.length === 0) {
            return handleApiResponse(res, 404, 'Vendor Not found');
        }
        handleApiResponse(res, 200, 'Vendor details fetched successfully', {
            Vendors: Vendor,
            nbHits: Vendor.length,
        });
    } catch (error) {
        handleApiResponse(res, 500, 'An error occurred while fetching the single Vendor', { error: error.message });
    }
};

// To get Single Vendor Details
const getSingleVendor = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const vendor = await SingleVendor(id);

        if (!vendor) {
            return handleApiResponse(res, 404, 'Vendor not found');
        }

        handleApiResponse(res, 200, 'Vendor details fetched successfully', {
            Vendors: [vendor],
            nbHits: 1,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while fetching the single Vendor: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: error.issues[0].message });
    }
};

// To Delete a Single Vendor Details
const deleteSingleVendor = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const vendor = await DeleteVendor(id);

        if (!vendor || vendor.deletedCount === 0) {
            return handleApiResponse(res, 404, 'Vendor not found, deletion unsuccessful');
        }

        handleApiResponse(res, 200, 'Vendor deleted successfully', {
            deletedVendor: vendor,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while deleting the single Vendor: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: error.issues[0].message });
    }
};

// To Add a Vendor to Vendors list
const postSingleVendor = async (req, res) => {
    const data = req.body;
    try {
        const Vendor = await AddVendor(data);
        handleApiResponse(res, 201, 'Vendor added successfully', {
            Vendor,
        });
    } catch (error) {
        const duplicateFieldMatches = error.message.match(/[a-zA-Z_]+(?= already exists)/g);
        if (duplicateFieldMatches && duplicateFieldMatches.length > 0) {
            const duplicateFields = duplicateFieldMatches.map((field) => field.replace('vendor_', ''));
            const errorMessage = `Vendor with ${duplicateFields.join(', ')} is already exist.`;
            handleApiResponse(res, 400, 'An error occurred while adding the Vendor', { error: errorMessage });
        } else {
            handleApiResponse(res, error.status || 500, error.message || 'Internal server error');
        }
    }
};

// To Update a Single Vendor Details
const updateSingleVendor = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const updateVendorData = req.body;
        const updatedVendor = await UpdateVendor(id, updateVendorData);

        if (!updatedVendor) {
            return handleApiResponse(res, 404, 'Vendor not found, update unsuccessful');
        }

        handleApiResponse(res, 200, 'Vendor updated successfully', {
            updatedVendor,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while updating the single Vendor: ${error.message}`;

        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: error.issues[0].message });
    }
};

module.exports = {
    getAllVendors,
    getSingleVendor,
    postSingleVendor,
    deleteSingleVendor,
    updateSingleVendor,
};
