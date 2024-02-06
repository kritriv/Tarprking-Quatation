const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autopopulate = require('mongoose-autopopulate');
const { transformToJSON } = require('../utils/mongooseUtils');

const ProductSchema = new Schema(
    {
        status: {
            type: Boolean,
            default: true,
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
                async validator(value) {
                    try {
                        const existingProduct = await this.constructor.findOne({ name: value });
                        return !existingProduct || existingProduct._id.equals(this._id);
                    } catch (error) {
                        throw new Error('Error occurred while validating Product uniqueness');
                    }
                },
                message: 'Product with this name already exists',
            },
        },
        description: {
            type: String,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'ProductCategory',
            autopopulate: { select: '_id name' },
        },
        sub_products: [{ type: Schema.Types.ObjectId, ref: 'SubProduct' }],
    },

    { timestamps: true },
);

ProductSchema.plugin(autopopulate);
transformToJSON(ProductSchema, 'id');
const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
