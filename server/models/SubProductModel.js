const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autopopulate = require('mongoose-autopopulate');
const { transformToJSON } = require('../utils/mongooseUtils');

const SubProductSchema = new Schema(
    {
        status: {
            type: Boolean,
            default: true,
        },
        model_no: {
            type: String,
            unique: true,
            validate: {
                validator: async function (value) {
                    const existingProduct = await this.constructor.findOne({ model_no: value });
                    return !existingProduct || existingProduct._id.equals(this._id);
                },
                message: 'Sub Product with this ModelNo already exists',
            },
        },
        hsn: {
            type: String,
            unique: true,
            validate: {
                validator: async function (value) {
                    const existingProduct = await this.constructor.findOne({ hsn: value });
                    return !existingProduct || existingProduct._id.equals(this._id);
                },
                message: 'Sub Product with this HSN already exists',
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
            unique: true,
            validate: {
                validator: async function (value) {
                    const existingProduct = await this.constructor.findOne({ name: value });
                    return !existingProduct || existingProduct._id.equals(this._id);
                },
                message: 'Sub Product with this Name already exists',
            },
        },
        description: {
            type: String,
        },
        image: {
            type: String,
        },
        category: {
            type: mongoose.Schema.ObjectId,
            ref: 'ProductCategory',
            required: true,
            autopopulate: { select: '_id name description -createdby' },
        },
        product: {
            type: mongoose.Schema.ObjectId,
            ref: 'Product',
            required: true,
            autopopulate: { select: '_id name' },
        },
        price: {
            basic_rate: {
                type: Number,
            },
            installation_charges: {
                type: Number,
            },
            subTotal: {
                type: Number,
                default: 0,
            },
        },
        timings: {
            delivery_time: {
                type: String,
            },
            installation_time: {
                type: String,
            },
        },
        specifications: { type: Schema.Types.ObjectId, ref: 'Specification' },
        tnc: { type: Schema.Types.ObjectId, ref: 'TermAndCondition' },
    },
    { timestamps: true },
);

SubProductSchema.pre('save', function (next) {
    this.price.subTotal = (this.price.basic_rate * this.price.installation_charges);
    next();
});

SubProductSchema.plugin(autopopulate);
transformToJSON(SubProductSchema, 'id');
const SubProduct = mongoose.model('SubProduct', SubProductSchema);
module.exports = SubProduct;
