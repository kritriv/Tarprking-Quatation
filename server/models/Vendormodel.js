const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VendorSchema = new Schema(
    {
        vendor_status: {
            type: Boolean,
            default: true,
        },
        vendor_username: {
            type: String,
            unique: true,
            validate: {
                async validator(value) {
                    try {
                        const existingVendor = await this.constructor.findOne({ vendor_username: value });
                        return !existingVendor || existingVendor._id.equals(this._id);
                    } catch (error) {
                        throw new Error('Error occurred while validating username uniqueness');
                    }
                },
                message: 'Vendor with this Username already exists',
            },
        },
        vendor_name: {
            type: String,
        },
        vendor_email: {
            type: String,
        },
        contact_no: {
            type: String,
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other'],
        },
        age: {
            type: Number,
        },
        site_address: {
            type: String,
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
    { timestamps: true },
);

const Vendor = mongoose.model('Vendor', VendorSchema);

module.exports = Vendor;
