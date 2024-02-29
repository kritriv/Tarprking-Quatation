const { Product } = require('../../models');
const { ObjectId } = require('mongodb');
const UpdateProduct = async (id, updateProductData) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await Product.findByIdAndUpdate(filter, updateProductData, {
            new: true,
        });
        return result;
    } catch (error) {
        throw new Error(`Error occurred while updating Product: ${error.message}`);
    }
};

module.exports = UpdateProduct;
