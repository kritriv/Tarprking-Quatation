const { ProductCategory } = require('../../models');
const { ObjectId } = require('mongodb');

const SingleProductCategory = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await ProductCategory.findOne(filter).populate('products').exec();
        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single ProductCategory: ${error.message}`);
    }
};

module.exports = SingleProductCategory;
