const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autopopulate = require('mongoose-autopopulate');

const ProductCategorySchema = new Schema(
    {
        category_name: {
            type: String,
            unique: true,
            validate: {
                async validator(value) {
                    try {
                        const existingCategory = await this.constructor.findOne({ category_name: value });
                        return !existingCategory || existingCategory._id.equals(this._id);
                    } catch (error) {
                        throw new Error('Error occurred while validating Category uniqueness');
                    }
                },
                message: 'Category with this name already exists',
            },
        },
        category_description: {
            type: String,
        },
        category_status: {
            type: Boolean,
            default: true,
        },
        createdby: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
            autopopulate: { select: '_id role username email' },
        },
    },
    { timestamps: true },
);

ProductCategorySchema.plugin(autopopulate);
const ProductCategory = mongoose.model('ProductCategory', ProductCategorySchema);
module.exports = ProductCategory;
