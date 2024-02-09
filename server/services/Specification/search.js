const { Specification } = require('../../models');
const { ObjectId } = require('mongodb');
const SingleSpecification = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await Specification.findOne(filter).populate('sub_product').exec();

        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single Specification: ${error.message}`);
    }
};

module.exports = SingleSpecification;
