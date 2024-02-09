const { Product } = require('../../models');
const { ObjectId } = require('mongodb');

const SingleProduct = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await Product.findOne(filter)
            .populate('category')
            .populate({
                path: 'sub_products',
            })
            .exec();

        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single product: ${error.message}`);
    }
};

module.exports = SingleProduct;
