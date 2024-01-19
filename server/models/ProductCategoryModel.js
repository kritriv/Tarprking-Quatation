const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductCategorySchema = new Schema(
    {
        category_name: {
            type: String,
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
