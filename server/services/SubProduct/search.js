const { SubProduct } = require('../../models');
const { ObjectId } = require('mongodb');
const SingleSubProduct = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await SubProduct.findOne(filter)
            .populate('product')
            .populate({
                path: 'category',
            })
            .exec();

        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single SubProduct: ${error.message}`);
    }
};

module.exports = SingleSubProduct;
