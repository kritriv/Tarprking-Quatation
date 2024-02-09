const { Specification } = require('../../models');
const { ObjectId } = require('mongodb');
const UpdateSpecification = async (id, updateSpecificationData) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await Specification.findByIdAndUpdate(filter, updateSpecificationData, {
            new: true,
        });
        return result;
    } catch (error) {
        throw new Error(`Error occurred while updating Specification: ${error.message}`);
    }
};

module.exports = UpdateSpecification;
