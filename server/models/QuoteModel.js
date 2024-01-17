const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quoteSchema = new Schema({
    removed: {
        type: Boolean,
        default: false,
    },
    createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    client: {
        type: mongoose.Schema.ObjectId,
        ref: 'Vendor',
        required: true,
        // autopopulate: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    expiredDate: {
        type: Date,
        required: true,
    },
    items: [{ type: mongoose.Schema.ObjectId, ref: 'Product', required: true }],

    credit: {
        type: Number,
        default: 0,
    },
    discount: {
        type: Number,
        default: 0,
    },
    note: {
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

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;
