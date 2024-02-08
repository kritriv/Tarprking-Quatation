const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
const { transformToJSON } = require('../utils/mongooseUtils');
const Schema = mongoose.Schema;

const quoteSchema = new Schema({
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
        type: mongoose.Schema.ObjectId,
        ref: 'SubProduct',
        required: true,
        autopopulate: true,
    },
    quote_price: {
        quantity: {
            type: Number,
        },

        item_sub_total: {
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
        },
        discount: {
            type: Number,
            default: 0,
        },
        total_price: {
            type: Number,
        },
    },
    remark: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        enum: ['pending', 'sent', 'accepted', 'cancelled', 'on hold'],
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
});

quoteSchema.plugin(autopopulate);
transformToJSON(quoteSchema, 'id');
const Quote = mongoose.model('Quote', quoteSchema);
module.exports = Quote;
