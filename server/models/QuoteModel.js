const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
const Schema = mongoose.Schema;

const quoteSchema = new Schema({
    removed: {
        type: Boolean,
        default: false,
    },
    quotenumber: {
        type: Number,
        required: true,
        unique: true,
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        autopopulate: true,
    },
    client: {
        type: mongoose.Schema.ObjectId,
        ref: 'Vendor',
        required: true,
        autopopulate: true,
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
            autopopulate: true,
        },
    ],

    credit: {
        type: Number,
        default: 0,
    },
    discount: {
        type: Number,
        default: 0,
    },
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
