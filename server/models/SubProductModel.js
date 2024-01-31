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
        HSN_no: {
            type: String,
            unique: true,
            validate: {
                validator: async function (value) {
                    const existingProduct = await this.constructor.findOne({ HSN_no: value });
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
            autopopulate: { select: '_id category_name category_description -createdby' },
        },
        product: {
            type: mongoose.Schema.ObjectId,
            ref: 'Product',
            required: true,
            autopopulate: { select: '_id product_name' },
        },
        price: {
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
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
        specifications: {
            type: mongoose.Schema.ObjectId,
            ref: 'ProductSpecification',
            autopopulate: true,
        },
    },
    { timestamps: true },
);

SubProductSchema.plugin(autopopulate);
transformToJSON(SubProductSchema, 'SubProductId');
const SubProduct = mongoose.model('SubProduct', SubProductSchema);
module.exports = SubProduct;
