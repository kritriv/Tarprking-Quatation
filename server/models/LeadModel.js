const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autopopulate = require('mongoose-autopopulate');
const { transformToJSON } = require('../utils/mongooseUtils');

const LeadSchema = new Schema({
    removed: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        default: 'company',
        enum: ['company', 'people'],
        required: true,
    },
    status: {
        type: String,
        default: 'new',
        enum: ['draft', 'new', 'innegotiate', 'won', 'lose', 'canceled', 'onhold', 'waiting'],
        required: true,
    },
    source: {
        type: String,
        default: 'other',
        enum: ['linkedin', 'website', 'socialmedia', 'ads', 'friends', 'sales', 'indiamart', 'other'],
        required: true,
    },
    createdby: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        autopopulate: { select: '_id username' },
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    interestedIn: { type: mongoose.Schema.ObjectId, ref: 'SubProduct', autopopulate: true },
});

LeadSchema.plugin(autopopulate);
transformToJSON(LeadSchema, 'id');
const Lead = mongoose.model('Lead', LeadSchema);
module.exports = Lead;
