const { Company } = require('../../models');
const { ObjectId } = require('mongodb');

const DeleteOurCompany = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await Company.findByIdAndDelete(filter);

        return result;
    } catch (error) {
        throw new Error(`Error occurred while deleting OurCompany: ${error.message}`);
    }
};

module.exports = DeleteOurCompany;
