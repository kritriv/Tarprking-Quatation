const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autopopulate = require('mongoose-autopopulate');
const { transformToJSON } = require('../utils/mongooseUtils');

const ClientSchema = new Schema(
    {
        status: {
            type: Boolean,
            default: true,
        },
        username: {
            type: String,
            unique: true,
            validate: {
                async validator(value) {
                    try {
                        const existingClient = await this.constructor.findOne({ username: value });
                        return !existingClient || existingClient._id.equals(this._id);
                    } catch (error) {
                        throw new Error('Error occurred while validating username uniqueness');
                    }
                },
                message: 'Client with this Username already exists',
            },
        },
        createdby: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
            autopopulate: { select: '_id role username email' },
        },
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other'],
        },
        age: {
            type: Number,
        },
        company: {
            type: String,
        },
        gst: {
            type: String,
        },
        address: {
            site: {
                type: String,
            },
            street: {
                type: String,
            },
            city: {
                type: String,
            },
            state: {
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

ClientSchema.plugin(autopopulate);
transformToJSON(ClientSchema, 'id');
const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;
