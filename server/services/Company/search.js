const { Company } = require('../../models');
const { ObjectId } = require('mongodb');

const SingleOurCompany = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await Company.findOne(filter);

        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single OurCompany: ${error.message}`);
    }
};

module.exports = SingleOurCompany;
