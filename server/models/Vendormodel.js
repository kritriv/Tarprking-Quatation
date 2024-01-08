const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the vendor
const VendorSchema = new Schema(
  {
    vendor_status: {
      type: Boolean,
      default: true
    },
    vendor_username: {
      type: String,
      unique: true
    },
    vendor_name: {
      type: String,
    },
    email: {
      type: String,
    },
    contact_no: {
      type: String,
    },
    gender: {
      type: String,
    },
    age: {
      type: Number,
    },
    company_name: {
      type: String,
    },
    company_GST_no: {
      type: String,
    },
    vendor_address: {
      street: {
        type: String,
      },
      City: {
        type: String,
      },
      State: {
        type: String,
      },
      pincode: {
        type: Number,
      },
      country: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const Vendor = mongoose.model("Vendor", VendorSchema);

module.exports = Vendor;
