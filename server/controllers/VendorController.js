const { ViewVendor, AddVendor, SingleVendor, DeleteVendor, UpdateVendor } = require('../services/VendorService');

// To get All Vendors List
const getAllVendors = async (req, res) => {
    try {
        const { vendor_status, vendor_username, vendor_name, email, contact_no, gender, company_name, company_GST_no, sort, select, page, limit } = req.query;

        const Vendor = await ViewVendor({ vendor_status, vendor_username, vendor_name, email, contact_no, gender, company_name, company_GST_no, sort, select, page: Number(page) || 1, limit: Number(limit) || 5,
        });

        if (!Vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }
        res.status(200).json({
            status: 'success',
            message: 'Vendor details fetched successfully',
            data: Vendor,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while fetching the single Vendor',
            error: error.message,
        });
    }
};
// To get Single Vendor Details
const getSingleVendor = async (req, res) => {
    try {
        const id = req.params.id;
        const vendor = await SingleVendor(id);

        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }
        res.status(200).json({
            status: 'success',
            message: 'Vendor details fetched successfully',
            data: vendor,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while fetching the single Vendor',
            error: error.message,
        });
    }
};

// To Delete a Single Vendor Details
const deleteSingleVendor = async (req, res) => {
    try {
        const id = req.params.id;
        const vendor = await DeleteVendor(id);

        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found, deletion unsuccessful' });
        }
        res.status(200).json({
            status: 'success',
            message: 'Vendor deleted successfully',
            deletedVendor: vendor,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while deleting the single Vendor',
            error: error.message,
        });
    }
};

// To Add a Vendor to Vendors list
const postSingleVendor = async (req, res) => {
    const data = req.body;
    try {
        const savedVendor = await AddVendor(data);
        res.status(201).json({
            status: 'success',
            message: 'Vendor added successfully',
            savedVendor,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error creating and saving Vendor.' });
    }
};

// To Update a Single Vendor Details
const updateSingleVendor = async (req, res) => {
    try {
        const id = req.params.id;
        const updateVendorData = req.body;

        const updatedVendor = await UpdateVendor(id, updateVendorData);

        if (!updatedVendor) {
            return res.status(404).json({ message: 'Vendor not found, update unsuccessful' });
        }

        res.status(200).json({
            status: 'success',
            message: 'Vendor updated successfully',
            updatedVendor,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while updating the single Vendor',
            error: error.message,
        });
    }
};

module.exports = {
    getAllVendors,
    getSingleVendor,
    postSingleVendor,
    deleteSingleVendor,
    updateSingleVendor,
};
