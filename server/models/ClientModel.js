const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema(
    {
        client_status: {
            type: Boolean,
            default: true,
        },
        client_username: {
            type: String,
            unique: true,
            validate: {
                async validator(value) {
                    try {
                        const existingClient = await this.constructor.findOne({ client_username: value });
                        return !existingClient || existingClient._id.equals(this._id);
                    } catch (error) {
                        throw new Error('Error occurred while validating username uniqueness');
                    }
                },
                message: 'Client with this Username already exists',
            },
        },
        client_name: {
            type: String,
        },
        client_email: {
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
        client_address: {
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

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;
