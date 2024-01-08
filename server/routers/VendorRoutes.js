const express = require("express");
const router = express.Router();
const { getAllVendors, getSingleVendor, postSingleVendor, deleteSingleVendor, updateSingleVendor} = require("../controllers/VendorController");

// Middleware to parse JSON bodies
router.use(express.json());

// To get All Vendors list
router.route("/Vendors").get(getAllVendors);

// To get Single Vendor Details
router.route("/Vendors/:id").get(getSingleVendor);

// To Add a Vendor to Vendors list
router.route("/Vendors/add-Vendor").post(postSingleVendor);

// To Delete Single Vendor Details
router.route("/Vendors/:id").delete(deleteSingleVendor);

// To Update a Single Vendor Details
router.route("/Vendors/:id").put(updateSingleVendor);

module.exports = router;