const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autopopulate = require('mongoose-autopopulate');
const { transformToJSON } = require('../utils/mongooseUtils');

const ProductCategorySchema = new Schema(
    {
        status: {
            type: Boolean,
            default: true,
        },
        createdby: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
            autopopulate: { select: '_id username' },
        },
        name: {
            type: String,
            unique: true,
            validate: {
                async validator(value) {
                    try {
                        const existingCategory = await this.constructor.findOne({ name: value });
                        return !existingCategory || existingCategory._id.equals(this._id);
                    } catch (error) {
                        throw new Error('Error occurred while validating Category uniqueness');
                    }
                },
                message: 'Category with this name already exists',
            },
        },
        description: {
            type: String,
        },
        products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    },
    { timestamps: true },
);

ProductCategorySchema.plugin(autopopulate);
transformToJSON(ProductCategorySchema, 'id');
const ProductCategory = mongoose.model('ProductCategory', ProductCategorySchema);
module.exports = ProductCategory;
