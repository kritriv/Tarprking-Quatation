const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
const Schema = mongoose.Schema;

const quoteSchema = new Schema({
    removed: {
        type: Boolean,
        default: false,
    },
    quote_number: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: async function (value) {
                const existingQuote = await this.constructor.findOne({ quote_number: value });
                return !existingQuote || existingQuote._id.equals(this._id);
            },
            message: 'Quote with this Quote No. already exists',
        },
    },
    createdby: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        autopopulate: { select: '_id role username email' },
    },
    client: {
        type: mongoose.Schema.ObjectId,
        ref: 'Vendor',
        required: true,
        autopopulate: { select: '_id vendor_username vendor_name site_address contact_no vendor_email company_name company_GST_no vendor_address' },
    },
    year: {
        type: Number,
        required: true,
        default: new Date().getFullYear(),
    },
    date: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    expiredDate: {
        type: Date,
        required: true,
    },
    items: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Product',
            required: true,
            autopopulate: { select: '-product_status -createdby -createdAt -updatedAt -__v' },
        },
    ],
    quote_price: {
        taxRate: {
            type: Number,
            default: 0,
        },
        taxTotal: {
            type: Number,
            default: 0,
        },
        transport_charge: {
            type: Number,
            default: 0,
        },
        otherRate: {
            type: Number,
            default: 0,
        },
        total_price: {            // taxTotal + transport_charge + otherRate + item[subTotal]
            type: Number,
        },
    },
    // credit: {
    //     type: Number,
    //     default: 0,
    // },
    // discount: {
    //     type: Number,
    //     default: 0,
    // },
    remark: {
        type: String,
    },
    status: {
        type: String,
        enum: ['draft', 'pending', 'sent', 'accepted', 'declined', 'cancelled', 'on hold'],
        default: 'draft',
    },
    approved: {
        type: Boolean,
        default: false,
    },
    isExpired: {
        type: Boolean,
        default: false,
    },
    pdf: {
        type: String,
    },
    updated: {
        type: Date,
        default: Date.now,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

quoteSchema.plugin(autopopulate);
const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;
