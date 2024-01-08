const Vendor = require("../models/VendorModel");
const { ObjectId } = require('mongodb');
const {ViewVendor, AddVendor, SingleVendor, DeleteVendor} = require('../services/VendorService');

// To get All Vendors List
const getAllVendors = async (req, res) => {
    try {
        const {  vendor_status, vendor_username, vendor_name, email, contact_no, gender,company_name, company_GST_no, sort, select } = req.query;
        const queryObject = {};

        // ======= Filters Queries =======

        if (vendor_status !== undefined) {
            queryObject.Vendor_status = (Vendor_status.toLowerCase() === 'true');
        }
        if (vendor_username) {
            queryObject.vendor_username = { $regex: new RegExp(vendor_username, 'i') };
        }
        if (vendor_name) {
            queryObject.vendor_name = { $regex: new RegExp(vendor_name, 'i') };
        }
        if (email) {
            queryObject.email = { $regex: new RegExp(email, 'i') };
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

        let apiData =  Vendor.find(queryObject);
        // let apiData =  ViewVendor(queryObject);

        // ======== Short , Select ======

        if (sort) {
            let sortFix = sort.replace(",", " ");
            apiData = apiData.sort(sortFix);
        }
        if (select) {
            let selectFix = select.split(",").join(" ");
            apiData = apiData.select(selectFix);
        }

        // ===== Pagination and limits ====

        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 5;

        let skip = (page - 1) * limit;
        apiData = apiData.skip(skip).limit(limit);

        const Vendors = await apiData;
        res.status(200).json({ Vendors, nbHits: Vendors.length });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching Vendors', error: error.message });
    }
}

// To get Single Vendor Details
const getSingleVendor = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await SingleVendor(id);
        res.send(result);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching the single Vendor', error: error.message });
    }
}

// To Delete a Single Vendor Details
const deleteSingleVendor = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await DeleteVendor(id);
        res.send(result);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the single Vendor', error: error.message });
    }
}

// To Add a Vendor to Vendors list
const postSingleVendor = async (req, res) => {
    const data = req.body;
    try {
      const savedVendor = await AddVendor(data);
      res.status(201).send(savedVendor);
    } catch (error) {
      console.error('Error creating and saving Vendor:', error);
      res.status(500).send({ error: 'Error creating and saving Vendor.' });
    }
  };

// To Update a Single Vendor Details
const updateSingleVendor = async (req, res) => {
    try {
        const id = req.params.id;
        const updateVendorData = req.body;
        const filter = { _id: new ObjectId(id) };

        const updateDoc = {
            $set: {
                ...updateVendorData
            },
        };

        const options = { upsert: true };

        const result = await Vendor.updateOne(filter, updateDoc, options);
        res.send(result);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the single Vendor', error: error.message });
    }
}

module.exports = { getAllVendors, getSingleVendor, postSingleVendor, deleteSingleVendor, updateSingleVendor};