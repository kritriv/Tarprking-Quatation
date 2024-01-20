const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    },
    { timestamps: true },
);

const ProductCategory = mongoose.model('ProductCategory', ProductCategorySchema);
module.exports = ProductCategory;
