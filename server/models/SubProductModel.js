const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autopopulate = require('mongoose-autopopulate');
const { transformToJSON } = require('../utils/mongooseUtils');

const SubProductSchema = new Schema(
    {
        sub_product_status: {
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
        product_HSN: {
            type: String,
            unique: true,
            validate: {
                validator: async function (value) {
                    const existingProduct = await this.constructor.findOne({ product_HSN: value });
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
        
        sub_product_name: {
            type: String,
        },
        sub_product_description: {
            type: String,
        },
        sub_product_img: {
            type: String,
        },
        product_category: {
            type: mongoose.Schema.ObjectId,
            ref: 'ProductCategory',
            required: true, 
            autopopulate: { select: '_id category_name category_description -createdby' },
        },
        main_product: {
            type: mongoose.Schema.ObjectId,
            ref: 'Product',
            required: true,
            autopopulate: true,
        },
        sub_product_price: {
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
        manufacturing_time: {
            delivery_time: {
                type: String,
            },
            installation_time: {
                type: String,
            },
        },
        product_specification: {
            type: mongoose.Schema.ObjectId,
            ref: 'ProductSpecification',
            // required: true,
            autopopulate: true,
        },
    },
    { timestamps: true },
);

SubProductSchema.plugin(autopopulate);
transformToJSON(SubProductSchema, 'SubProductId');
const SubProduct = mongoose.model('SubProduct', SubProductSchema);
module.exports = SubProduct;
