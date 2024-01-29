const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autopopulate = require('mongoose-autopopulate');

const ProductSchema = new Schema(
    {
        product_status: {
            type: Boolean,
            default: true,
        },
        createdby: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
            autopopulate: { select: '_id role username email' },
        },
        product_name: {
            type: String,
            unique: true,
            validate: {
                async validator(value) {
                    try {
                        const existingProduct = await this.constructor.findOne({ product_name: value });
                        return !existingProduct || existingProduct._id.equals(this._id);
                    } catch (error) {
                        throw new Error('Error occurred while validating Category uniqueness');
                    }
                },
                message: 'Product with this name already exists',
            },
        },
        product_description: {
            type: String,
        },
        sub_products: [{ type: Schema.Types.ObjectId, ref: 'SubProduct' }],
    },

    { timestamps: true },
);

ProductSchema.plugin(autopopulate);

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
