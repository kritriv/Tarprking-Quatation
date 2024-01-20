const Vendor = require('../models/Vendormodel');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const ViewVendor = async ({id, vendor_status, vendor_username, vendor_name, vendor_email, contact_no, gender, company_name, company_GST_no, sort, select, page = 1, limit = 5 }) => {
    try {
        const queryObject = {};

        // ======= Filters Queries =======

        if (id) {
            queryObject._id = id;
        }

        if (vendor_status !== undefined) {
            queryObject.Vendor_status = vendor_status.toLowerCase() === 'true';
        }
        if (vendor_username) {
            queryObject.vendor_username = {
                $regex: new RegExp(vendor_username, 'i'),
            };
        }
        if (vendor_name) {
            queryObject.vendor_name = { $regex: new RegExp(vendor_name, 'i') };
        }
        if (vendor_email) {
            queryObject.vendor_email = { $regex: new RegExp(vendor_email, 'i') };
        }
        if (gender) {
            queryObject.gender = { $regex: new RegExp(gender, 'i') };
        }
        if (company_name) {
            queryObject.company_name = { $regex: new RegExp(company_name, 'i') };
        }
        if (company_GST_no) {
            queryObject.company_GST_no = { $regex: new RegExp(company_GST_no, 'i') };
        }
        if (contact_no) {
            queryObject.contact_no = contact_no;
        }

        let apiData = Vendor.find(queryObject);

        // ======== Short , Select ======

        if (sort) {
            let sortFix = sort.replace(',', ' ');
            apiData = apiData.sort(sortFix);
        }
        if (select) {
            let selectFix = select.split(',').join(' ');
            apiData = apiData.select(selectFix);
        }

        // ===== Pagination and limits ====

        const skip = (page - 1) * limit;
        apiData = apiData.skip(skip).limit(limit);

        const Vendors = await apiData;
        return Vendors;
    } catch (error) {
        throw new Error('An error occurred while fetching vendors: ' + error.message);
    }
};

const AddVendor = async (data) => {
    try {
        const result = await Vendor(data).save();
        return result;
    } catch (error) {
        throw new Error(`Error occurred while adding vendor: ${error.message}`);
    }
};

const SingleVendor = async (id) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ID format');
        }
        const filter = { _id: new ObjectId(id) };
        const result = await Vendor.findOne(filter);
        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single vendor: ${error.message}`);
    }
};

const DeleteVendor = async (id) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ID format');
        }
        const filter = { _id: new ObjectId(id) };
        const result = await Vendor.deleteOne(filter);
        return result;
    } catch (error) {
        throw new Error(`Error occurred while deleting vendor: ${error.message}`);
    }
};

const UpdateVendor = async (id, updateVendorData) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ID format');
        }

        const filter = { _id: id };
        const result = await Vendor.findByIdAndUpdate(filter, updateVendorData, {
            new: true,
        });
        return result;
    } catch (error) {
        throw new Error(`Error occurred while updating vendor: ${error.message}`);
    }
};

module.exports = {
    ViewVendor,
    AddVendor,
    SingleVendor,
    DeleteVendor,
    UpdateVendor,
};
