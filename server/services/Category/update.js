const { ProductCategory } = require('../../models');
const { ObjectId } = require('mongodb');
const UpdateProductCategory = async (id, updateProductCategoryData) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await ProductCategory.findByIdAndUpdate(filter, updateProductCategoryData, {
            new: true,
        });
        return result;
    } catch (error) {
        throw new Error(`Error occurred while updating ProductCategory: ${error.message}`);
    }
};

module.exports = UpdateProductCategory;
