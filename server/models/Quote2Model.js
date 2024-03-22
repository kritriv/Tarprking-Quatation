const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
const { transformToJSON } = require('../utils/mongooseUtils');
const Schema = mongoose.Schema;

const quote2Schema = new Schema({
    refno: {
        type: String,
        required: true,
        unique: true,
        validate: {
            async validator(value) {
                try {
                    const existingQuote = await this.constructor.findOne({ refno: value });
                    return !existingQuote || existingQuote._id.equals(this._id);
                } catch (error) {
                    throw new Error('Error occurred while validating Quote uniqueness');
                }
            },
            message: 'Quote with this Refno already exists',
        },
    },
    createdby: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        autopopulate: { select: '_id  username ' },
    },
    client: {
        type: mongoose.Schema.ObjectId,
        ref: 'Client',
        required: true,
        autopopulate: true,
    },
    ourCompany: {
        type: mongoose.Schema.ObjectId,
        ref: 'OurCompany',
        required: true,
        autopopulate: { select: '-status -createdAt -updatedAt' },
    },
    year: {
        type: Number,
        default: new Date().getFullYear(),
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    expired_date: {
        type: Date,
    },
    subject: {
        type: String,
    },
    greeting: {
        type: String,
    },
    proposal_title: {
        type: String,
    },
    item: {
        type: String,
        required: true
    },
    tnc: {
        type: String,
        required: true
    },
    quote_price: {
        quantity: {
            type: Number,
            default: 1,
        },

        basic_rate: {
            type: Number,
        },
        installation_charges: {
            type: Number,
        },

        freight_cost: {
            type: Number,
            default: 0,
        },
        unloading_cost: {
            type: Number,
            default: 0,
        },
        transport_charge: {
            type: Number,
            default: 0,
        },
        tax_rate: {
            type: Number,
            default: 18,
        },
        taxtotal: {
            type: Number,
            default: 0,
        },
        discount: {
            type: Number,
            default: 0,
        },
        total_price: {
            type: Number,
            default: 0,
        },
    },
    remark: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        enum: ['pending', 'send', 'accepted', 'cancelled', 'on hold'],
        default: 'pending',
    },
    approved: {
        type: Boolean,
        default: false,
    },
    expired: {
        type: Boolean,
        default: false,
    },
    back_image: {
        type: String,
    },

},
    { timestamps: true },);

quote2Schema.plugin(autopopulate);
transformToJSON(quote2Schema, 'id');
const Quote2 = mongoose.model('Quote2', quote2Schema);
module.exports = Quote2;
