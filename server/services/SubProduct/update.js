const { SubProduct } = require('../../models');
const { ObjectId } = require('mongodb');
const UpdateSubProduct = async (id, updateSubProductData) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await SubProduct.findByIdAndUpdate(filter, updateSubProductData, {
            new: true,
        });
        return result;
    } catch (error) {
        throw new Error(`Error occurred while updating SubProduct: ${error.message}`);
    }
};

module.exports = UpdateSubProduct;
