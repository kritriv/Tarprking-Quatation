// Your routes file
const express = require('express');
const router = express.Router();
const { getAllVendors, getSingleVendor, postSingleVendor, deleteSingleVendor, updateSingleVendor } = require('../controllers/VendorController');

const vendorSchema = require('../validators/Schemas/Vendorvalidate');
const validate = require('../validators/validate');

// Middleware to parse JSON bodies
router.use(express.json());

// To get All Vendors list
router.get('/Vendors', getAllVendors);

// To get Single Vendor Details
router.get('/Vendors/:id', getSingleVendor);

// To Add a Vendor to Vendors list
router.post('/Vendors/add-Vendor', validate(vendorSchema), postSingleVendor);

// To Delete Single Vendor Details
router.delete('/Vendors/:id', deleteSingleVendor);

// To Update a Single Vendor Details
router.put('/Vendors/:id',  validate(vendorSchema), updateSingleVendor);

module.exports = router;
