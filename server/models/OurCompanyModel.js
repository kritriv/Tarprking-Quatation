const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { transformToJSON } = require('../utils/mongooseUtils');

const OurCompanySchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            validate: {
                async validator(value) {
                    try {
                        const existingProduct = await this.constructor.findOne({ name: value });
                        return !existingProduct || existingProduct._id.equals(this._id);
                    } catch (error) {
                        throw new Error('Error occurred while validating Company uniqueness');
                    }
                },
                message: 'Company with this name already exists',
            },
        },
        emails: {
            type: [String],
        },
        websites: {
            type: [String],
        },
        phones: {
            type: [String],
        },
        cin_no: String,
        tan_no: String,
        pan_no: String,
        gst_no: String,
        address: {
            office: String,
            factory: String,
        },
        bank_details: {
            bank_name: String,
            account_no: String,
            ifsc: String,
            branch: String,
        },
    },
    { timestamps: true },
);

transformToJSON(OurCompanySchema, 'id');
const OurCompany = mongoose.model('OurCompany', OurCompanySchema);

module.exports = OurCompany;
